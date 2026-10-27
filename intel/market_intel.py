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

# Checked in this order; the first match sets the story type. Contracts and deals
# count as deployments, not investments, so "capital disclosed" means funding only.
TYPE_PATTERNS = [
    ("investment", r"\braises?\b|\braised\b|\braising\b|funding round|\bfunding\b|series [a-f]\b|\bseed\b|pre-seed|valuation|\bipo\b|\bacquir|acquisition|venture fund|\bfund\b|invests? in|investment in|closes? .{0,30}round"),
    ("deployment", r"deploy|partner|pilot|trial|contract|\bdeal\b|\bmou\b|rollout|roll out|\bsigns?\b|\border\b|fleet|expands? to|goes live|commission|testing"),
    ("product", r"launch|unveil|introduc|debut|\breleases?\b|new robot|next-gen|announces? (the )?new|rolls out"),
]
MONEY = r"\$\s?(\d+(?:\.\d+)?)\s?(m|mn|million|bn|b|billion)\b"

# Market-size press releases and similar filler, dropped before curation.
NOISE_TITLE = r"\b(jumps|surges|soars|slumps|plunges|tumbles|rallies|skyrockets) (over |nearly |more than )?\d+(\.\d+)?%|(shares?|stock)\b.{0,30}\b(rise|rises|fall|falls|drop|drops|gain|gains|climb|climbs)\b|stock market|hk stock|stock movement|round-?up|recap|week in review|this week in|industry insights|newsletter|digest|robotic raises|video friday|surgical|surgery|surgeon|da vinci|hospital robot|medical robot|rehabilitation robot|exoskeleton|market (size|share|to reach|worth|heads|forecast|report|outlook|analysis|growth)|\bcagr\b|by 20[3-4]\d|research report|industry report|market is expected|stock (price|forecast)|shares (jump|fall|rise|surge)"
NOISE_SOURCES = {"openpr.com", "ein presswire", "einpresswire", "marketsandmarkets", "taiwannews", "barchart", "benzinga", "seeking alpha", "the globe and mail", "fool.com", "the motley fool", "insidermonkey"}
# When several outlets cover the same story, show the one from the best-known outlet.
TRUSTED_SOURCES = ["reuters", "bloomberg", "financial times", "the wall street journal", "techcrunch", "the robot report",
                   "ieee spectrum", "the national", "gulf news", "khaleej times", "arab news", "zawya", "siliconangle",
                   "forbes", "cnbc", "axios", "fortune", "the verge", "wired", "business insider", "geekwire",
                   "construction dive", "dronelife", "the next web", "nikkei asia", "south china morning post", "the information"]
GENERIC_WORDS = {
    "robotics", "robotic", "robot", "robots", "startup", "startups", "million", "billion", "series", "funding", "raises",
    "raised", "the", "this", "that", "new", "with", "for", "and", "how", "why", "what", "from", "into", "after", "self-driving",
    "autonomous", "humanoid", "humanoids", "drone", "drones", "delivery", "security", "construction", "market", "physical",
    "tech", "technology", "launches", "unveils", "announces", "company", "group", "global", "world", "year", "week", "inc",
    "ltd", "deal", "round", "valuation", "seed", "report", "news", "first", "its", "will", "more", "than", "over", "about",
    "says", "said", "could", "can", "are", "has", "have", "be", "is", "to", "of", "in", "on", "at", "by", "as", "an", "a",
    "ai", "us", "u.s.", "uk", "china", "chinese", "dubai", "abu", "dhabi", "uae", "saudi", "robotaxi", "robotaxis",
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


def collect(config: dict) -> tuple[list[dict], int]:
    """Returns the distinct stories and how many relevant articles they came from."""
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
    # Keep only robotics-relevant stories, and drop market-size press releases.
    items = [i for i in items if re.search(r"robot|drone|autonom|humanoid|automat|self-driving|robotaxi|physical ai|cobot|\bamr\b", (i["title"] + " " + i["snippet"]).lower())]
    items = [i for i in items if not is_noise(i)]
    for item in items:
        enrich(item, config)
    raw = len(items)
    items = group_same_story(items)
    items.sort(key=lambda i: i["published"] or cutoff, reverse=True)
    log(f"Kept {raw} relevant stories from the last {days} days, about {len(items)} distinct events.")
    return items, raw


def is_noise(item: dict) -> bool:
    source = item["source"].lower()
    return bool(re.search(NOISE_TITLE, item["title"].lower())) or any(s in source for s in NOISE_SOURCES)


def enrich(item: dict, config: dict) -> None:
    text = f" {item['title']} {item['snippet']} ".lower()
    best, best_score = item.get("hint"), 0
    for cat in config["categories"]:
        score = sum(text.count(k.lower()) for k in cat["keywords"])
        if score > best_score:
            best, best_score = cat["id"], score
    item["category"] = best or "physical_ai"
    title = item["title"].lower()
    item["type"] = "trend"
    for t, pattern in TYPE_PATTERNS:
        if re.search(pattern, title):  # the headline is a more reliable guide than the snippet
            item["type"] = t
            break
    item["region"] = "Global"
    for region, pattern in REGION_PATTERNS:
        if re.search(pattern, text):
            item["region"] = region
            break
    item["amount_usd_m"] = None
    item["money"] = money_values(title)
    item["money_all"] = money_values(title, include_valuations=True)
    is_fund = re.search(r"\bfund\b|venture fund", title) and not re.search(r"\braise|\bfunding\b|series", title)
    if item["type"] in ("investment", "deployment") and item["money"] and not is_fund:
        item["amount_usd_m"] = item["money"][0]


def money_values(text: str, include_valuations: bool = False) -> list[float]:
    """Dollar figures in a headline. Valuations are left out unless asked for (they are not money raised)."""
    values = []
    for m in re.finditer(MONEY, text):
        before, after = text[max(0, m.start() - 18):m.start()], text[m.end():m.end() + 14]
        if not include_valuations and ("valuation" in after or "valued" in before or "valuation" in before):
            continue
        v = float(m.group(1))
        values.append(round(v * 1000 if m.group(2) in ("bn", "b", "billion") else v, 1))
    return values


COMMON_NAMES = {"nvidia", "nvidia-backed", "google", "alphabet", "amazon", "microsoft", "openai", "meta", "apple",
                "softbank", "tesla", "musk", "elon", "boston", "dynamics", "silicon", "valley", "california", "texas",
                "new", "york", "london", "europe", "india", "japan", "korea", "germany", "series", "a16z", "andreessen",
                # Words that are part of many company names, so on their own they say nothing.
                "intelligence", "artificial", "labs", "lab", "systems", "technologies", "technology", "dynamics",
                "industries", "motors", "automation", "robotics", "machines", "innovation", "innovations", "solutions",
                "ventures", "capital", "partners", "holdings", "international", "global", "group", "corp", "inc",
                "first", "world", "national", "university", "institute", "research", "science", "sciences", "general",
                "hong", "kong", "south", "north", "east", "west", "city", "state", "government", "ministry", "police",
                "army", "navy", "force", "air", "space", "data", "cloud", "smart", "future", "next", "open", "one"}


def name_words(title: str) -> set[str]:
    """Distinctive capitalised words in a headline, usually company names.

    Names that turn up across many unrelated stories (big backers, places) are ignored,
    otherwise "Nvidia-backed X" and "Nvidia-backed Y" would look like the same story.
    """
    words = re.findall(r"\b[A-Z][A-Za-z0-9&'’.-]{2,}\b", title)
    names = {re.sub(r"['’]s$", "", w.lower()).strip("'’.") for w in words}
    return names - GENERIC_WORDS - COMMON_NAMES


def word_set(title: str) -> set[str]:
    words = {w for w in re.findall(r"[a-z0-9]+", title.lower()) if len(w) >= 4} - GENERIC_WORDS
    return {w[:-1] if len(w) > 4 and w.endswith("s") else w for w in words}  # excavators ~ excavator


def same_story(a: dict, b: dict) -> bool:
    """Conservative test: grouping wrongly hides news, which is worse than a duplicate."""
    wa, wb = a["_words"], b["_words"]
    overlap = len(wa & wb) / max(1, len(wa | wb))
    shared_names = a["_names"] & b["_names"]
    if overlap >= 0.5:
        return True
    # Words other than the shared names, so "Agility deploys at GXO" and "Agility deploys at AGCO"
    # are not matched just because both say Agility.
    ca, cb = wa - a["_names"], wb - b["_names"]
    content = len(ca & cb) / max(1, len(ca | cb))
    if shared_names and (set(a["money_all"]) & set(b["money_all"]) or content >= 0.1):
        return True
    # Two funding stories naming the same (non-generic) company in one week.
    if shared_names and a["type"] == b["type"] == "investment":
        return True
    # Same headline dollar figure, same kind of story, same category: one event told two ways
    # (e.g. "Bedrock raises $600M" and "self-driving excavators dig up $600M").
    return (bool(a["money"]) and a["money"][:1] == b["money"][:1] and a["money"][0] >= 10
            and a["type"] == b["type"] and a["type"] in ("investment", "deployment")
            and a["category"] == b["category"] and overlap >= 0.25)


def source_rank(item: dict) -> int:
    source = item["source"].lower()
    for n, name in enumerate(TRUSTED_SOURCES):
        if name in source:
            return n
    return len(TRUSTED_SOURCES) + (0 if item["snippet"] else 1)


def group_same_story(items: list[dict]) -> list[dict]:
    """Merge stories that several outlets wrote about the same event.

    The best-known outlet's version is kept, and the number of outlets is kept
    as 'coverage', which is a useful signal of how big the story is.
    """
    # Each group forms around a lead story (best-known outlet first), and an article joins only
    # if it matches the lead or one of the first two members. That stops chains such as
    # A~B, B~C, C~D pulling unrelated stories into one group.
    for item in items:
        item["_words"], item["_names"] = word_set(item["title"]), name_words(item["title"])
    groups: list[list[dict]] = []
    for item in sorted(items, key=source_rank):
        for group in groups:
            if any(same_story(item, member) for member in group[:3]):
                group.append(item)
                break
        else:
            groups.append([item])
    # Second pass: small groups that match an early member of a bigger group join it.
    groups.sort(key=len, reverse=True)
    for small in sorted(groups, key=len):
        if len(small) > 2 or small not in groups:
            continue
        for big in groups:
            if big is small or len(big) < len(small):
                continue
            if any(same_story(small[0], member) for member in big[:5]):
                big.extend(small)
                groups.remove(small)
                break
    merged = []
    for group in groups:
        group.sort(key=source_rank)
        lead = {k: v for k, v in group[0].items() if not k.startswith("_")}
        sources = []
        for other in group:
            if other["source"] not in sources:
                sources.append(other["source"])
            if lead["amount_usd_m"] is None and other["amount_usd_m"] is not None and other["type"] == lead["type"]:
                lead["amount_usd_m"] = other["amount_usd_m"]
        dates = [o["published"] for o in group if o["published"]]
        lead["published"] = min(dates) if dates else None
        lead["coverage"] = len(sources)
        if len(group) > 40:
            log(f"  note: {len(group)} articles grouped under '{lead['title'][:60]}'")
        lead["also_covered_by"] = sources[1:4]
        merged.append(lead)
    return merged


def category_signals(items: list[dict], config: dict) -> dict:
    """How many distinct stories and funding deals each category had this week."""
    volume = {c["id"]: 0 for c in config["categories"]}
    deals = {c["id"]: 0 for c in config["categories"]}
    for i in items:
        if i["category"] in volume:
            volume[i["category"]] += 1
            if i["type"] == "investment":
                deals[i["category"]] += 1
    return {"volume": volume, "deals": deals}


def momentum(signals: dict, history: list[dict], config: dict) -> list[dict]:
    """Compare this week's story volume per category with the average of earlier weeks."""
    past = [e["signals"]["volume"] for e in history if e.get("signals")]
    rows = []
    for c in config["categories"]:
        cid = c["id"]
        now = signals["volume"].get(cid, 0)
        avg = round(sum(p.get(cid, 0) for p in past) / len(past), 1) if past else None
        change = round((now - avg) / avg * 100) if avg else None
        rows.append({"category": cid, "volume": now, "deals": signals["deals"].get(cid, 0), "avg_prev": avg, "change_pct": change})
    return rows


# --------------------------------------------------------------------------- curate

TREND_STATUSES = ["new", "rising", "steady", "cooling"]


def history_brief(history: list[dict], moves: list[dict], config: dict) -> str:
    """Text summary of earlier editions and this week's momentum, for Claude."""
    labels = {c["id"]: c["label"] for c in config["categories"]}
    lines = []
    if history:
        lines.append("Earlier editions (most recent first):")
        for e in history:
            lines.append(f"- {e['id']}: {e.get('headline', '')}")
            for t in e.get("takeaways", []):
                lines.append(f"    takeaway: {t}")
            for t in e.get("trend_watch", []):
                lines.append(f"    trend: {t['trend']} [{t['status']}]")
    else:
        lines.append("This is the first tracked week, so there is no history yet. Mark trends as new.")
    lines.append("\nNews volume by category this week (distinct stories, with average of earlier weeks):")
    for m in moves:
        avg = "no history" if m["avg_prev"] is None else f"avg {m['avg_prev']}, change {m['change_pct'] if m['change_pct'] is not None else 'n/a'}%"
        lines.append(f"- {labels[m['category']]}: {m['volume']} stories, {m['deals']} funding deals ({avg})")
    return "\n".join(lines)


def curate_with_claude(items: list[dict], config: dict, history: list[dict], moves: list[dict]) -> dict | None:
    """Ask Claude to pick and write up the stories and track trends. Returns None on any failure."""
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log("No ANTHROPIC_API_KEY set; using the rule-based picker.")
        return None
    try:
        import anthropic
    except ImportError:
        log("The anthropic package is not installed; using the rule-based picker.")
        return None

    candidates = sorted(items, key=lambda i: (-i.get("coverage", 1), source_rank(i)))[: config["max_candidates_for_ai"]]
    cat_ids = [c["id"] for c in config["categories"]]
    cat_lines = "\n".join(f"- {c['id']}: {c['label']}" for c in config["categories"])
    listing = "\n".join(
        f"[{n}] {i['title']} | source: {i['source']} | outlets covering it: {i.get('coverage', 1)}"
        f" | date: {i['published'].date() if i['published'] else 'unknown'}"
        f" | guess: {i['category']}/{i['type']}/{i['region']}" + (f" | snippet: {i['snippet']}" if i["snippet"] else "")
        for n, i in enumerate(candidates)
    )

    system = (
        "You are a market-intelligence analyst writing a weekly robotics briefing for "
        f"{config['audience']}.\n\n"
        "Your readers are busy executives. They want to know, in seconds, what moved in robotics "
        "this week worldwide: emerging trends, notable product launches, major investments, and real "
        "deployments, plus what each means for a property developer and operator. You write a new edition "
        "every week and keep a running view of the trends, so say how this week fits what came before.\n\n"
        f"Categories:\n{cat_lines}\n\n"
        "Rules:\n"
        "- Use only the numbered stories provided. Refer to each by its number in item_index. "
        "Never invent stories, companies, figures or dates.\n"
        "- State a figure (money, units, valuation) only when it appears in that story's title or snippet. "
        "amount_usd_m is the money raised (type investment) or the contract value (type deployment), in millions "
        "of US dollars, or null. Market-size forecasts and company spending plans are not investments.\n"
        "- type: investment = funding rounds, acquisitions, new funds; product = launches and new models; "
        "deployment = contracts, pilots, partnerships, rollouts; trend = policy, research, analysis and everything else.\n"
        "- Prefer significance over volume: large funding rounds, launches from major players, deployments at "
        "scale, regulation, and anything in the GCC. A story covered by many outlets is usually bigger. Skip "
        "opinion pieces, listicles, market-size press releases, stock-price stories and stories already "
        "covered by another item you picked.\n"
        "- Cover as many categories as the news supports, but do not pad a category with weak stories.\n"
        "- headline: at most 90 characters, plain and factual. summary: one or two sentences, at most 40 words. "
        "why_it_matters: one sentence, at most 25 words, on the implication for a real estate developer and "
        "operator running robots in communities, malls, offices and construction sites. Be concrete, avoid hype.\n"
        "- takeaways: the three most important patterns this week, one sentence each. Where it applies, say how "
        "this compares with earlier weeks.\n"
        "- trend_watch: three to five running themes in robotics that matter to this audience, carried over "
        "from earlier editions where they continue. status: new (first appeared this week), rising (more or "
        "bigger evidence than before), steady, or cooling (less evidence than before). evidence: at most 25 "
        "words, citing this week's stories or the volume figures.\n"
        "- edition_headline: the single most important development, at most 80 characters."
    )
    schema = {
        "type": "object",
        "properties": {
            "edition_headline": {"type": "string"},
            "takeaways": {"type": "array", "items": {"type": "string"}},
            "trend_watch": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "trend": {"type": "string"},
                        "status": {"type": "string", "enum": TREND_STATUSES},
                        "evidence": {"type": "string"},
                    },
                    "required": ["trend", "status", "evidence"],
                    "additionalProperties": False,
                },
            },
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
        "required": ["edition_headline", "takeaways", "trend_watch", "posts"],
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
                "content": (
                    f"{history_brief(history, moves, config)}\n\n"
                    f"Pick up to {config['max_posts']} stories for this week's briefing.\n\nStories:\n{listing}"
                ),
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
        posts.append(make_post(candidates[idx], p))
    if not posts:
        return None
    return {
        "generated_by": "claude",
        "headline": result["edition_headline"],
        "takeaways": result["takeaways"][:3],
        "trend_watch": result["trend_watch"][:5],
        "posts": posts,
    }


def curate_with_rules(items: list[dict], config: dict, history: list[dict], moves: list[dict]) -> dict:
    """Fallback picker: favour widely covered stories, funding, GCC news and launches."""
    weight = {"investment": 3, "deployment": 2, "product": 2, "trend": 1}

    def score(i):
        s = weight[i["type"]] + min(i.get("coverage", 1) - 1, 5) * 0.8
        if i["type"] == "investment" and i["amount_usd_m"]:
            s += min(i["amount_usd_m"] / 150, 3)
        if i["region"] == "GCC":
            s += 2
        if i["source"].lower().startswith(tuple(TRUSTED_SOURCES)):
            s += 0.5
        return s

    labels = {c["id"]: c["label"] for c in config["categories"]}
    per_cat: dict[str, int] = {}
    posts = []
    for i in sorted(items, key=score, reverse=True):
        if per_cat.get(i["category"], 0) >= 4:
            continue
        per_cat[i["category"]] = per_cat.get(i["category"], 0) + 1
        posts.append(make_post(i, {"headline": i["title"], "summary": i["snippet"], "why_it_matters": "", "company": ""}))
        if len(posts) >= config["max_posts"]:
            break

    inv = [p for p in posts if p["type"] == "investment"]
    total = sum(p["amount_usd_m"] or 0 for p in inv)
    takeaways = []
    if inv:
        top = max(inv, key=lambda p: p["amount_usd_m"] or 0)
        takeaways.append(f"{len(inv)} funding {'story' if len(inv) == 1 else 'stories'} in the feed"
                         + (f", about ${total:,.0f}M disclosed; largest: {top['headline']}" if total else "."))
    ranked = sorted(moves, key=lambda m: m["volume"], reverse=True)
    if ranked and ranked[0]["volume"]:
        n = ranked[0]["volume"]
        takeaways.append(f"Most news this week: {labels[ranked[0]['category']]} ({n} distinct {'story' if n == 1 else 'stories'}).")
    gcc = [p for p in posts if p["region"] == "GCC"]
    if gcc:
        takeaways.append(f"{len(gcc)} {'story' if len(gcc) == 1 else 'stories'} from the GCC, led by: {gcc[0]['headline']}")

    # Trend watch from volume changes against earlier weeks: rising and cooling first.
    plural = lambda n, word: f"{n} {word if n == 1 else ('stories' if word == 'story' else word + 's')}"
    rows = []
    for m in moves:
        if not m["volume"] and not m["avg_prev"]:
            continue
        if m["avg_prev"] is None:
            status = "new"
            evidence = f"{plural(m['volume'], 'story')} and {plural(m['deals'], 'funding deal')} this week; first week tracked."
        else:
            c = m["change_pct"] if m["change_pct"] is not None else 100
            status = "rising" if c >= 25 else "cooling" if c <= -25 else "steady"
            evidence = f"{plural(m['volume'], 'story')} this week against a {m['avg_prev']:g} weekly average; {plural(m['deals'], 'funding deal')}."
        rows.append((["rising", "new", "cooling", "steady"].index(status), -m["volume"],
                     {"trend": f"News flow in {labels[m['category']]}", "status": status, "evidence": evidence}))
    trend_watch = [r[2] for r in sorted(rows, key=lambda r: r[:2])[:4]]
    return {
        "generated_by": "rules",
        "headline": posts[0]["headline"] if posts else "No major robotics news this week",
        "takeaways": takeaways,
        "trend_watch": trend_watch,
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
        "coverage": src.get("coverage", 1),
        "also_covered_by": src.get("also_covered_by", []),
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

    items, raw = collect(config)
    if not items:
        log("No stories could be fetched. Nothing written; try again later.")
        return 1

    # Earlier editions (up to 4 weeks) give the trend view its memory.
    history = [e for e in feed["editions"] if e["id"] != edition_id and e.get("generated_by") != "seed"][:4]
    signals = category_signals(items, config)
    moves = momentum(signals, history, config)
    curated = curate_with_claude(items, config, history, moves) or curate_with_rules(items, config, history, moves)
    edition = {
        "id": edition_id,
        "label": f"Week {iso.week} · {now.strftime('%-d %b %Y')}",
        "published_at": now.isoformat(timespec="minutes"),
        "period": {
            "from": (now - timedelta(days=config["lookback_days"])).strftime("%Y-%m-%d"),
            "to": now.strftime("%Y-%m-%d"),
        },
        "stories_scanned": raw,
        "distinct_events": len(items),
        "signals": signals,
        "momentum": moves,
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
