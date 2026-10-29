"""Our own robotics portfolio, and how this week's news links to it.

Vendors, what they run for us, where and at what stage all come from the fleet map's
data (data/fleet-data.js), so Pulse and the map never disagree. intel/portfolio.json
only lists the names to look for in the news, including the maker of the equipment a
vendor uses for us (news about DJI matters because AirTech flies DJI drones).
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FLEET_JS = ROOT / "data" / "fleet-data.js"
PORTFOLIO_JSON = ROOT / "intel" / "portfolio.json"

# Fleet statuses, worded as on the fleet map.
STATUS_RANK = {"deployed": 0, "pilot": 1, "planned": 2}
STATUS_LABEL = {"deployed": "Launched", "pilot": "Trialled", "planned": "Pending"}

# Headline words that suggest a story is good or bad news for a vendor (used when
# Claude is not available to judge).
RISK_WORDS = (r"\bban(s|ned)?\b|blacklist|entity list|sanction|restrict|lawsuit|\bsues?\b|\bsued\b|probe|investigat|"
              r"recall|lay ?offs?|bankrupt|insolven|shut(s|ting)? down|\bhalt|suspend|hack|breach|vulnerab|"
              r"\bfined?\b|tariff|crash|injur|\bfail|delay|cease-and-desist|\bfcc\b|national security")
GOOD_WORDS = (r"\braise[sd]?\b|funding|launch|unveil|partner|expand|deploy|contract|\border|\bwins?\b|award|record|"
              r"milestone|approv|certif|series [a-f]\b")


def _read_fleet() -> dict:
    text = FLEET_JS.read_text(encoding="utf-8")
    start = text.index("{", text.index("window.FLEET_DATA"))
    end = text.rstrip().rstrip(";").rindex("}") + 1
    return json.loads(text[start:end])


def _compile(terms: list[dict]) -> list[tuple[re.Pattern, re.Pattern | None]]:
    out = []
    for t in terms:
        pattern = r"(?<![A-Za-z0-9])" + re.escape(t["term"]) + r"(?![A-Za-z0-9])"
        flags = re.I if t.get("any_case") else 0
        ctx = re.compile(t["context"], re.I) if t.get("context") else None
        out.append((re.compile(pattern, flags), ctx))
    return out


def load_portfolio() -> dict:
    """Vendors we work with, from the fleet map, with the names to look for in the news."""
    fleet = _read_fleet()
    cfg = json.loads(PORTFOLIO_JSON.read_text(encoding="utf-8"))
    sites = {a["id"]: a["name"] for a in fleet.get("assets", [])}
    types = {t["id"]: t["label"] for t in fleet.get("robot_types", [])}
    vendors: dict[str, dict] = {}
    for f in fleet["fleet"]:
        name = (f.get("vendor") or "").strip()
        if not name:
            continue
        v = vendors.setdefault(name, {"name": name, "entries": []})
        v["entries"].append({
            "use_case": f.get("use_case", ""),
            "model": f.get("model", ""),
            "site": sites.get(f.get("asset_id"), f.get("asset_id", "")),
            "status": f.get("status", "planned"),
            "robot_type": types.get(f.get("robot_type"), f.get("robot_type", "")),
        })
    out = []
    for name, v in vendors.items():
        rule = cfg["vendors"].get(name, {"terms": [{"term": name, "any_case": True}]})
        entries = sorted(v["entries"], key=lambda e: STATUS_RANK.get(e["status"], 3))
        best = entries[0]
        out.append({
            "name": name,
            "oem": rule.get("oem", ""),
            "status": best["status"],
            "status_label": STATUS_LABEL.get(best["status"], best["status"]),
            "use_cases": sorted({e["use_case"] for e in entries if e["use_case"]}),
            "models": sorted({e["model"] for e in entries if e["model"]}),
            "robot_types": sorted({e["robot_type"] for e in entries if e["robot_type"]}),
            "sites": list(dict.fromkeys(e["site"] for e in entries if e["site"])),
            "lead": best,
            "_entries": entries,
            "_terms": _compile(rule.get("terms", [])),
            "_oem_terms": _compile(rule.get("oem_terms", [])),
        })
    out.sort(key=lambda v: (STATUS_RANK.get(v["status"], 3), v["name"].lower()))
    return {"vendors": out, "queries": cfg.get("queries", []), "min_posts": cfg.get("min_posts", 6)}


def _hits(text: str, matchers) -> bool:
    for pattern, ctx in matchers:
        if pattern.search(text) and (ctx is None or ctx.search(text)):
            return True
    return False


def match(text: str, portfolio: dict) -> list[dict]:
    """Which of our vendors a story is about: directly, or through the maker of their equipment."""
    links = []
    for v in portfolio["vendors"]:
        if _hits(text, v["_terms"]):
            links.append({"vendor": v["name"], "via": "vendor"})
        elif v["_oem_terms"] and _hits(text, v["_oem_terms"]):
            links.append({"vendor": v["name"], "via": "oem", "oem": v["oem"]})
    return links


def link_items(items: list[dict], portfolio: dict) -> int:
    for item in items:
        item["portfolio"] = match(f"{item['title']} {item.get('snippet', '')}", portfolio)
    return sum(1 for i in items if i["portfolio"])


def describe(link: dict, portfolio: dict) -> dict:
    """What the page shows on a story card for one linked vendor."""
    v = next(x for x in portfolio["vendors"] if x["name"] == link["vendor"])
    lead = v["lead"]
    return {
        "vendor": v["name"],
        "via": link["via"],
        "oem": link.get("oem", v["oem"]),
        "status": v["status"],
        "status_label": v["status_label"],
        "use_case": lead["use_case"],
        "model": lead["model"],
        "site": lead["site"],
        "site_count": len(v["sites"]),
    }


def relink_posts(posts: list[dict], portfolio: dict) -> None:
    """Check headline and summary again once the article's own description is known."""
    for p in posts:
        found = match(f"{p['headline']} {p.get('summary', '')}", portfolio)
        have = {l["vendor"] for l in p.get("portfolio", [])}
        for link in found:
            if link["vendor"] not in have:
                p.setdefault("portfolio", []).append(describe(link, portfolio))


def headline_signal(titles: list[str]) -> str:
    text = " ".join(titles).lower()
    risk, good = bool(re.search(RISK_WORDS, text)), bool(re.search(GOOD_WORDS, text))
    return "mixed" if risk and good else "risk" if risk else "positive" if good else "mention"


def vendor_watch(portfolio: dict, items: list[dict], posts: list[dict], ai_signals: dict | None = None) -> list[dict]:
    """One row per vendor we work with: status from the fleet map, plus this week's news."""
    ai_signals = ai_signals or {}
    rows = []
    for v in portfolio["vendors"]:
        name = v["name"]
        mentioned = [i for i in items if any(l["vendor"] == name for l in i.get("portfolio", []))]
        linked_posts = [p["id"] for p in posts if any(l["vendor"] == name for l in p.get("portfolio", []))]
        if name in ai_signals and (mentioned or linked_posts):
            signal, note, by = ai_signals[name]["signal"], ai_signals[name].get("note", ""), "claude"
        elif mentioned or linked_posts:
            signal, note, by = headline_signal([i["title"] for i in mentioned]), "", "headlines"
        else:
            signal, note, by = "none", "", ""
        rows.append({
            "vendor": name,
            "oem": v["oem"],
            "status": v["status"],
            "status_label": v["status_label"],
            "use_cases": v["use_cases"],
            "models": v["models"],
            "sites": v["sites"],
            "mentions": len(mentioned),
            "post_ids": linked_posts,
            "signal": signal,
            "note": note,
            "signal_by": by,
            # When none of the vendor's stories made the edition, point to the article that mentions it.
            "article": ({"title": mentioned[0]["title"], "url": mentioned[0]["url"], "source": mentioned[0]["source"]}
                        if mentioned and not linked_posts else None),
        })
    order = {"risk": 0, "mixed": 1, "positive": 2, "mention": 3, "none": 4}
    rows.sort(key=lambda r: (order[r["signal"]], -r["mentions"], STATUS_RANK.get(r["status"], 3)))
    return rows


def prompt_lines(portfolio: dict) -> str:
    """Our portfolio in a few lines for Claude, with each site's own stage."""
    lines = []
    for v in portfolio["vendors"]:
        oem = f" (equipment made by {v['oem']})" if v["oem"] else ""
        stages = {}
        for e in v["_entries"]:
            stages.setdefault(STATUS_LABEL.get(e["status"], e["status"]).lower(), []).append(f"{e['use_case']} at {e['site']}")
        where = "; ".join(f"{label}: {', '.join(dict.fromkeys(xs))}" for label, xs in stages.items())
        lines.append(f"- {v['name']}{oem}. {where}" + (f". Models: {', '.join(v['models'])}" if v["models"] else ""))
    return "\n".join(lines)
