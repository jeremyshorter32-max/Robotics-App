#!/usr/bin/env python3
"""Robotics Market Pulse: a weekly market-intelligence feed for the Aldar Robotics app.

What it does, once a week:
  1. Pulls the last 7 days of robotics news from Google News searches (one set per
     category in intel/config.json) and a few trade-press RSS feeds.
  2. Removes duplicates and sorts each story into a category and a type
     (investment, product, deployment, trend).
  3. If ANTHROPIC_API_KEY is set, Claude picks the stories that matter most to
     executives and writes a short summary plus a "why it matters" line for each.
     Without a key, a simple scoring rule picks the stories instead.
  4. Adds the new edition to data/intel-feed.json and data/intel-feed.js, which the
     page intel.html reads.

Run it:
  python intel/market_intel.py            # publish this week's edition (skips if it already exists)
  python intel/market_intel.py --force    # rebuild this week's edition anyway
  python intel/market_intel.py --dry-run  # print the result, write nothing

It exits with an error (and writes nothing) when no stories could be fetched, so a
scheduler that retries every hour will try again later.
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "intel" / "config.json"
FEED_JSON = ROOT / "data" / "intel-feed.json"
FEED_JS = ROOT / "data" / "intel-feed.js"

USER_AGENT = "Mozilla/5.0 (compatible; AldarRoboticsMarketPulse/1.0)"
POST_TYPES = ["investment", "product", "deployment", "trend"]
REGIONS = ["GCC", "North America", "Europe", "China", "Asia-Pacific", "Global"]

TYPE_PATTERNS = {
    "investment": r"\braises?\b|\braised\b|funding|series [a-f]\b|seed round|pre-seed|valuation|\bipo\b|acquir|acquisition|invest|backed|\$\s?\d+(\.\d+)?\s?(m|bn|b|million|billion)\b",
    "product": r"launch|unveil|introduc|debut|releases?\b|new robot|next-gen|announces? (the )?new|rolls out",
    "deployment": r"deploy|partner|pilot|trial|contract|\bmou\b|rollout|roll out|signs?\b|order|fleet|expands? to|goes live|commission",
}
REGION_PATTERNS = [
    ("GCC", r"\buae\b|abu dhabi|dubai|sharjah|ras al khaimah|saudi|riyadh|jeddah|neom|qatar|doha|kuwait|bahrain|oman|muscat|\bgcc\b|gulf|middle east"),
    ("China", r"china|chinese|shenzhen|beijing|shanghai|hangzhou|unitree|ubtech|agibot"),
    ("Asia-Pacific", r"japan|korea|singapore|india|australia|taiwan|seoul|tokyo"),
    ("Europe", r"\buk\b|britain|london|germany|france|netherlands|norway|sweden|swiss|switzerland|europe|spain|italy|denmark|finland"),
    ("North America", r"\bus\b|u\.s\.|america|canada|texas|california|silicon valley|new york|boston"),
]


# --------------------------------------------------------------------------- utils

def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def load_config() -> dict:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def clean_text(raw: str | None, limit: int = 400) -> str:
    text = html.unescape(re.sub(r"<[^>]+>", " ", raw or ""))
    text = re.sub(r"\s+", " ", text).strip()
    return text[:limit].rstrip() + ("…" if len(text) > limit else "")


def norm_key(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", title.lower())[:70]


def parse_date(value: str | None) -> datetime | None:
    if not value:
        return None
    value = value.strip()
    try:
        dt = parsedate_to_datetime(value)
    except (TypeError, ValueError):
        try:
            dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            return None
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


def fetch(url: str, timeout: int = 25) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml, application/xml, text/xml, */*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read()
    except Exception as exc:  # network errors are expected now and then; skip the source
        log(f"  ! could not fetch {url[:90]}: {exc}")
        return None


def google_news_url(query: str, days: int) -> str:
    q = urllib.parse.quote_plus(f"{query} when:{days}d")
    return f"https://news.google.com/rss/search?q={q}&hl=en-US&gl=US&ceid=US:en"


# --------------------------------------------------------------------------- collect

def parse_feed(data: bytes, default_source: str) -> list[dict]:
    try:
        root = ET.fromstring(data)
    except ET.ParseError:
        return []
    items = []
    atom = "{http://www.w3.org/2005/Atom}"
    for node in root.iter():
        tag = node.tag.split("}")[-1]
        if tag not in ("item", "entry"):
            continue

        def child(*names: str):
            # Elements without children are falsy, so compare with None explicitly.
            for name in names:
                for candidate in (node.find(name), node.find(atom + name)):
                    if candidate is not None:
                        return candidate
            return None

        title_el, link_el = child("title"), child("link")
        title = clean_text(title_el.text if title_el is not None else "", 300)
        link = ""
        if link_el is not None:
            link = (link_el.text or link_el.get("href") or "").strip()
        if not title or not link:
            continue
        source = default_source
        src_el = node.find("source")
        if src_el is not None and (src_el.text or "").strip():
            source = src_el.text.strip()
            # Google News appends " - Source" to titles.
            if title.endswith(" - " + source):
                title = title[: -len(" - " + source)].strip()
        date_el = child("pubDate", "published", "updated")
        desc_el = child("description", "summary")
        snippet = clean_text(desc_el.text if desc_el is not None else "", 400)
        if snippet.lower().startswith(title.lower()[:40]):
            snippet = ""  # Google News descriptions only repeat the title
        items.append({
            "title": title,
            "url": link,
            "source": source,
            "published": parse_date(date_el.text if date_el is not None else None),
            "snippet": snippet,
        })
    return items


def collect(config: dict) -> list[dict]:
    days = config["lookback_days"]
    jobs: list[tuple[str, str, str | None]] = []  # (url, source name, category hint)
    for cat in config["categories"]:
        for q in cat["queries"]:
            jobs.append((google_news_url(q, days), "Google News", cat["id"]))
    for q in config.get("general_queries", []):
        jobs.append((google_news_url(q, days), "Google News", None))
    for feed in config.get("feeds", []):
        jobs.append((feed["url"], feed["name"], None))

    log(f"Fetching {len(jobs)} sources…")

    def run(job):
        url, name, hint = job
        data = fetch(url)
        found = parse_feed(data, name) if data else []
        for item in found:
            item["hint"] = hint
        return found

    with ThreadPoolExecutor(max_workers=8) as pool:
        batches = list(pool.map(run, jobs))

    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    seen: dict[str, dict] = {}
    for batch in batches:
        for item in batch:
            if item["published"] and item["published"] < cutoff:
                continue
            key = norm_key(item["title"])
            if not key or key in seen:
                continue
            seen[key] = item
    items = list(seen.values())
    for item in items:
        enrich(item, config)
    # Keep only robotics-relevant stories.
    items = [i for i in items if re.search(r"robot|drone|autonom|humanoid|automat|self-driving|robotaxi|physical ai|cobot|\bamr\b", (i["title"] + " " + i["snippet"]).lower())]
    items.sort(key=lambda i: i["published"] or cutoff, reverse=True)
    log(f"Kept {len(items)} unique stories from the last {days} days.")
    return items


def enrich(item: dict, config: dict) -> None:
    text = f" {item['title']} {item['snippet']} ".lower()
    best, best_score = item.get("hint"), 0
    for cat in config["categories"]:
        score = sum(text.count(k.lower()) for k in cat["keywords"])
        if score > best_score:
            best, best_score = cat["id"], score
    item["category"] = best or "physical_ai"
    item["type"] = "trend"
    for t in ("investment", "product", "deployment"):
        if re.search(TYPE_PATTERNS[t], text):
            item["type"] = t
            break
    item["region"] = "Global"
    for region, pattern in REGION_PATTERNS:
        if re.search(pattern, text):
            item["region"] = region
            break
    m = re.search(r"\$\s?(\d+(?:\.\d+)?)\s?(m|million|bn|b|billion)\b", text)
    item["amount_usd_m"] = None
    if m:
        value = float(m.group(1))
        item["amount_usd_m"] = value * 1000 if m.group(2) in ("bn", "b", "billion") else value


# --------------------------------------------------------------------------- curate

def curate_with_claude(items: list[dict], config: dict) -> dict | None:
    """Ask Claude to pick and write up the stories. Returns None on any failure."""
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log("No ANTHROPIC_API_KEY set; using the rule-based picker.")
        return None
    try:
        import anthropic
    except ImportError:
        log("The anthropic package is not installed; using the rule-based picker.")
        return None

    candidates = items[: config["max_candidates_for_ai"]]
    cat_ids = [c["id"] for c in config["categories"]]
    cat_lines = "\n".join(f"- {c['id']}: {c['label']}" for c in config["categories"])
    listing = "\n".join(
        f"[{n}] {i['title']} | source: {i['source']} | date: {i['published'].date() if i['published'] else 'unknown'}"
        f" | guess: {i['category']}/{i['type']}/{i['region']}" + (f" | snippet: {i['snippet']}" if i["snippet"] else "")
        for n, i in enumerate(candidates)
    )

    system = (
        "You are a market-intelligence analyst writing a weekly robotics briefing for "
        f"{config['audience']}.\n\n"
        "Your readers are busy executives. They want to know, in seconds, what moved in robotics "
        "this week worldwide: emerging trends, notable product launches, major investments, and real "
        "deployments, plus what each means for a property developer and operator.\n\n"
        f"Categories:\n{cat_lines}\n\n"
        "Rules:\n"
        "- Use only the numbered stories provided. Refer to each by its number in item_index. "
        "Never invent stories, companies, figures or dates.\n"
        "- State a figure (money, units, valuation) only when it appears in that story's title or snippet. "
        "amount_usd_m is the disclosed amount in millions of US dollars, or null.\n"
        "- Prefer significance over volume: large funding rounds, launches from major players, "
        "deployments at scale, regulation, and anything in the GCC. Skip opinion pieces, listicles, "
        "market-size press releases and near-duplicates covering the same event.\n"
        "- Cover as many categories as the news supports, but do not pad a category with weak stories.\n"
        "- headline: at most 90 characters, plain and factual. summary: one or two sentences, at most 40 words. "
        "why_it_matters: one sentence, at most 25 words, on the implication for a real estate developer and "
        "operator running robots in communities, malls, offices and construction sites. Be concrete, avoid hype.\n"
        "- takeaways: the three most important patterns across this week's stories, one sentence each.\n"
        "- edition_headline: the single most important development, at most 80 characters."
    )
    schema = {
        "type": "object",
        "properties": {
            "edition_headline": {"type": "string"},
            "takeaways": {"type": "array", "items": {"type": "string"}},
            "posts": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "item_index": {"type": "integer"},
                        "category": {"type": "string", "enum": cat_ids},
                        "type": {"type": "string", "enum": POST_TYPES},
                        "region": {"type": "string", "enum": REGIONS},
                        "company": {"type": "string"},
                        "amount_usd_m": {"anyOf": [{"type": "number"}, {"type": "null"}]},
                        "headline": {"type": "string"},
                        "summary": {"type": "string"},
                        "why_it_matters": {"type": "string"},
                    },
                    "required": ["item_index", "category", "type", "region", "company", "amount_usd_m", "headline", "summary", "why_it_matters"],
                    "additionalProperties": False,
                },
            },
        },
        "required": ["edition_headline", "takeaways", "posts"],
        "additionalProperties": False,
    }

    client = anthropic.Anthropic()
    log(f"Asking Claude to curate {len(candidates)} stories…")
    try:
        response = client.beta.messages.create(
            model=config["model"],
            max_tokens=16000,
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",
            output_config={"effort": "medium", "format": {"type": "json_schema", "schema": schema}},
            system=system,
            messages=[{
                "role": "user",
                "content": f"Pick up to {config['max_posts']} stories for this week's briefing.\n\nStories:\n{listing}",
            }],
        )
    except anthropic.APIConnectionError as exc:
        log(f"Could not reach the Claude API ({exc}); using the rule-based picker.")
        return None
    except anthropic.APIStatusError as exc:
        log(f"Claude API error {exc.status_code}: {exc.message}; using the rule-based picker.")
        return None

    if response.stop_reason in ("refusal", "max_tokens"):
        log(f"Claude stopped early ({response.stop_reason}); using the rule-based picker.")
        return None
    text = next((b.text for b in response.content if b.type == "text"), "")
    try:
        result = json.loads(text)
    except json.JSONDecodeError:
        log("Claude returned unreadable JSON; using the rule-based picker.")
        return None

    posts, used = [], set()
    for p in result["posts"]:
        idx = p["item_index"]
        if not 0 <= idx < len(candidates) or idx in used:
            continue
        used.add(idx)
        src = candidates[idx]
        posts.append(make_post(src, p))
    if not posts:
        return None
    return {
        "generated_by": "claude",
        "headline": result["edition_headline"],
        "takeaways": result["takeaways"][:3],
        "posts": posts,
    }


def curate_with_rules(items: list[dict], config: dict) -> dict:
    """Fallback picker: favour funding with amounts, GCC news, launches, then recency."""
    weight = {"investment": 3, "deployment": 2, "product": 2, "trend": 1}

    def score(i):
        s = weight[i["type"]]
        if i["amount_usd_m"]:
            s += min(i["amount_usd_m"] / 100, 4)
        if i["region"] == "GCC":
            s += 2
        return s

    labels = {c["id"]: c["label"] for c in config["categories"]}
    per_cat: dict[str, int] = {}
    posts = []
    for i in sorted(items, key=score, reverse=True):
        if per_cat.get(i["category"], 0) >= 4:
            continue
        per_cat[i["category"]] = per_cat.get(i["category"], 0) + 1
        posts.append(make_post(i, {
            "headline": i["title"],
            "summary": i["snippet"],
            "why_it_matters": "",
            "company": "",
        }))
        if len(posts) >= config["max_posts"]:
            break

    inv = [p for p in posts if p["type"] == "investment"]
    total = sum(p["amount_usd_m"] or 0 for p in inv)
    busiest = max(per_cat, key=per_cat.get) if per_cat else None
    takeaways = []
    if inv:
        takeaways.append(f"{len(inv)} funding or deal {'story' if len(inv) == 1 else 'stories'} tracked" + (f", with about ${total:,.0f}M disclosed." if total else "."))
    if busiest:
        takeaways.append(f"Most activity this week: {labels.get(busiest, busiest)}.")
    gcc = [p for p in posts if p["region"] == "GCC"]
    if gcc:
        takeaways.append(f"{len(gcc)} {'story' if len(gcc) == 1 else 'stories'} from the GCC, led by: {gcc[0]['headline']}")
    return {
        "generated_by": "rules",
        "headline": posts[0]["headline"] if posts else "No major robotics news this week",
        "takeaways": takeaways,
        "posts": posts,
    }


def make_post(src: dict, ai: dict) -> dict:
    return {
        "id": norm_key(src["title"])[:40],
        "category": ai.get("category", src["category"]),
        "type": ai.get("type", src["type"]),
        "region": ai.get("region", src["region"]),
        "company": ai.get("company", ""),
        "amount_usd_m": ai.get("amount_usd_m", src["amount_usd_m"]),
        "headline": ai["headline"],
        "summary": ai["summary"],
        "why_it_matters": ai["why_it_matters"],
        "source": src["source"],
        "url": src["url"],
        "published": src["published"].strftime("%Y-%m-%d") if src["published"] else None,
    }


# --------------------------------------------------------------------------- write

def load_feed(config: dict) -> dict:
    if FEED_JSON.exists():
        feed = json.loads(FEED_JSON.read_text(encoding="utf-8"))
    else:
        feed = {"meta": {}, "editions": []}
    feed["meta"]["title"] = "Robotics Market Pulse"
    feed["meta"]["categories"] = [{k: c[k] for k in ("id", "label", "color", "ink")} for c in config["categories"]]
    return feed


def save_feed(feed: dict) -> None:
    body = json.dumps(feed, ensure_ascii=False, indent=1)
    FEED_JSON.write_text(body + "\n", encoding="utf-8")
    FEED_JS.write_text(
        "/* ROBOTICS MARKET PULSE. Written by intel/market_intel.py every Monday; do not edit by hand.\n"
        "   Same content as data/intel-feed.json, wrapped so intel.html also works when opened as a file. */\n"
        f"window.INTEL_FEED = {body};\n",
        encoding="utf-8",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--force", action="store_true", help="rebuild this week's edition even if it exists")
    parser.add_argument("--dry-run", action="store_true", help="print the edition instead of saving it")
    args = parser.parse_args()

    config = load_config()
    now = datetime.now(ZoneInfo(config["timezone"]))
    iso = now.isocalendar()
    edition_id = f"{iso.year}-W{iso.week:02d}"

    feed = load_feed(config)
    if not args.force and any(e["id"] == edition_id for e in feed["editions"]):
        log(f"Edition {edition_id} is already published. Nothing to do (use --force to rebuild).")
        return 0

    items = collect(config)
    if not items:
        log("No stories could be fetched. Nothing written; try again later.")
        return 1

    curated = curate_with_claude(items, config) or curate_with_rules(items, config)
    edition = {
        "id": edition_id,
        "label": f"Week {iso.week} · {now.strftime('%-d %b %Y')}",
        "published_at": now.isoformat(timespec="minutes"),
        "period": {
            "from": (now - timedelta(days=config["lookback_days"])).strftime("%Y-%m-%d"),
            "to": now.strftime("%Y-%m-%d"),
        },
        "stories_scanned": len(items),
        **curated,
    }

    if args.dry_run:
        print(json.dumps(edition, ensure_ascii=False, indent=1))
        return 0

    feed["editions"] = [e for e in feed["editions"] if e["id"] != edition_id]
    feed["editions"].insert(0, edition)
    feed["editions"] = feed["editions"][: config["max_editions_kept"]]
    feed["meta"]["updated_at"] = edition["published_at"]
    save_feed(feed)
    log(f"Published {edition_id}: {len(edition['posts'])} posts ({edition['generated_by']}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
