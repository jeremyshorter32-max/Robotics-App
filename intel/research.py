"""Weekly research step: Claude searches and reads the web itself for three things the
news feed cannot give us.

  Viral watch   the week's most-watched robot videos, checked before leadership asks
  New vendors   challengers in our categories, scored on traction
  Category map  where each category sits on readiness against relevance to Aldar

It runs in two stages. First Claude researches with web search and web fetch and writes
notes; the script records every web address Claude actually opened or was shown. Then a
second call turns the notes into structured data, and any link that did not come from
the first stage is dropped, so the page never shows a made-up source.

Needs ANTHROPIC_API_KEY, and web search enabled for the organisation in the Claude
Console. If anything fails, the edition is published without these sections.
"""

from __future__ import annotations

import json
import os
import re
import sys

CHECKS = ["real", "autonomous", "corroborated", "deployed", "gcc"]
CRITERIA = ["funding", "deployments", "scale", "partners", "gcc"]


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def _norm(url: str) -> str:
    return re.sub(r"[#?].*$", "", url or "").rstrip("/").lower()


def _walk_urls(obj, found: set[str]) -> None:
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == "url" and isinstance(v, str) and v.startswith("http"):
                found.add(v)
            else:
                _walk_urls(v, found)
    elif isinstance(obj, list):
        for v in obj:
            _walk_urls(v, found)


def challenger_verdict(scores: dict) -> tuple[int, str]:
    """Add 14+ with at least 2 on deployments, Watch 8 to 13, Ignore below 8."""
    total = sum(scores.get(k, 0) for k in CRITERIA)
    if total >= 14 and scores.get("deployments", 0) >= 2:
        return total, "add"
    return total, "watch" if total >= 8 else "ignore"


def run_research(config: dict, portfolio_text: str, our_vendors: list[str], headlines: list[str],
                 previous: dict | None, window: tuple[str, str]) -> dict | None:
    settings = config.get("research", {})
    if not settings.get("enabled", True):
        log("Research step is switched off in config.json.")
        return None
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log("No ANTHROPIC_API_KEY set; skipping the research step (viral watch, new vendors, category map).")
        return None
    try:
        import anthropic
    except ImportError:
        log("The anthropic package is not installed; skipping the research step.")
        return None

    cats = "\n".join(f"- {c['id']}: {c['label']}" for c in config["categories"])
    prev = ""
    if previous:
        prev_ch = ", ".join(c["name"] for c in previous.get("challengers", []))
        if prev_ch:
            prev = f"\nChallengers already reported in recent weeks (update them only if there is news): {prev_ch}\n"
    brief = (
        f"You are the research analyst behind a weekly robotics briefing for {config['audience']}.\n"
        f"This week runs from {window[0]} to {window[1]}.\n\n"
        f"Our own robotics portfolio (vendors we work with, what they do for us and at what stage):\n{portfolio_text}\n\n"
        f"Robotics categories we track:\n{cats}\n\n"
        "Stories already in this week's news feed (do not repeat them as research findings):\n"
        + "\n".join(f"- {h}" for h in headlines[:30]) + "\n" + prev +
        "\nUse web search and web fetch to research three things, then write clear notes with the full URL of "
        "every source you rely on.\n\n"
        "1. VIRAL WATCH. Find up to three robot videos or posts that drew unusually large attention this week "
        "(X, YouTube, TikTok, Instagram, LinkedIn, Weibo). For each: platform, date, title, the reach figure as "
        "reported and who reported it (write 'Not verified' if no dated source gives a figure; never estimate), "
        "what the video shows, what is behind it (who made it, whether it was remote-controlled, staged or "
        "sped up, what the claims rest on), and a yes / no / unknown answer for: real footage, truly autonomous, "
        "independently corroborated, commercially deployed, fits GCC conditions (heat, dust, regulation). "
        "Then a verdict: hype (attention far ahead of evidence), watch, or real (real potential), the fit for "
        "Aldar (low, medium, high), the closest match in our portfolio, an action (act, watch, ignore), and one "
        "plain sentence an executive could say if asked about it. Say what the assessment is based on; you "
        "read pages and coverage, you do not watch videos.\n\n"
        "2. NEW VENDORS. Find up to four vendors, not already in our portfolio, with news in the last 30 days, "
        "that could compete with or replace a vendor we use, or open a category we track. Score each 0 to 4 "
        "on: funding, commercial deployments (named customers), scale (units or sites), credible partners, "
        "and a route to the GCC. Give one sentence on why it matters to us and one source.\n\n"
        "3. CATEGORY MAP. For each category we track, judge on a 0 to 100 scale: market readiness (evidence of "
        "commercial deployment at scale), relevance to Aldar's portfolio, hype (attention) and substance "
        "(verified evidence). One short reason each. These are judgements; say what they rest on.\n\n"
        "Rules: report only what sources say; date every claim; label vendor press releases as such; when "
        "unsure, say unknown. Keep searches focused; you have a limited number."
    )
    tools = [
        {"type": "web_search_20260209", "name": "web_search", "max_uses": settings.get("max_searches", 15)},
        {"type": "web_fetch_20260209", "name": "web_fetch", "max_uses": settings.get("max_fetches", 8)},
    ]
    client = anthropic.Anthropic(timeout=900)
    messages = [{"role": "user", "content": brief}]
    content: list = []
    log("Research step: Claude is searching the web…")
    try:
        for _ in range(6):  # the server pauses long tool runs; resume a few times at most
            response = client.beta.messages.create(
                model=config["model"], max_tokens=16000, tools=tools, messages=messages,
                betas=["server-side-fallback-2026-07-01"], fallbacks="default",
                output_config={"effort": settings.get("effort", "high")},
            )
            content.extend(response.content)
            if response.stop_reason != "pause_turn":
                break
            messages = [{"role": "user", "content": brief}, {"role": "assistant", "content": content}]
    except anthropic.APIConnectionError as exc:
        log(f"Research step could not reach the Claude API ({exc}); skipping it.")
        return None
    except anthropic.APIStatusError as exc:
        log(f"Research step: Claude API error {exc.status_code}: {exc.message}; skipping it.")
        return None
    if response.stop_reason == "refusal":
        log("Research step was declined; skipping it.")
        return None

    sources: set[str] = set()
    searches = 0
    for block in content:
        data = block.model_dump() if hasattr(block, "model_dump") else dict(block)
        if data.get("type") == "server_tool_use" and data.get("name") == "web_search":
            searches += 1
        if data.get("type") in ("web_search_tool_result", "web_fetch_tool_result", "text"):
            _walk_urls(data, sources)
    notes = "\n".join(getattr(b, "text", "") for b in content if getattr(b, "type", "") == "text").strip()
    if not notes:
        log("Research step returned no notes; skipping it.")
        return None
    log(f"  {searches} searches, {len(sources)} sources seen.")
    allowed = {_norm(u) for u in sources}

    result = _structure(client, anthropic, config, notes, sorted(sources))
    if result is None:
        return None
    return _validate(result, allowed, notes, our_vendors, config, searches, len(sources))


def _structure(client, anthropic, config, notes: str, sources: list[str]) -> dict | None:
    cat_ids = [c["id"] for c in config["categories"]]
    yn = {"type": "string", "enum": ["yes", "no", "unknown"]}
    link = {"type": "object", "properties": {"label": {"type": "string"}, "url": {"type": "string"}},
            "required": ["label", "url"], "additionalProperties": False}
    schema = {
        "type": "object",
        "properties": {
            "viral": {"type": "array", "items": {"type": "object", "properties": {
                "platform": {"type": "string"}, "date": {"type": "string"}, "title": {"type": "string"},
                "category": {"type": "string", "enum": cat_ids},
                "views_reported": {"type": "string"}, "views_source": {"type": "string"},
                "what_shows": {"type": "string"}, "what_behind": {"type": "string"},
                "checks": {"type": "object", "properties": {k: yn for k in CHECKS},
                           "required": CHECKS, "additionalProperties": False},
                "verdict": {"type": "string", "enum": ["hype", "watch", "real"]},
                "fit": {"type": "string", "enum": ["Low", "Medium", "High"]},
                "portfolio_match": {"type": "string"},
                "action": {"type": "string", "enum": ["Act", "Watch", "Ignore"]},
                "leadership_line": {"type": "string"}, "assessed_from": {"type": "string"},
                "video_url": {"type": "string"}, "corroboration": {"type": "array", "items": link},
            }, "required": ["platform", "date", "title", "category", "views_reported", "views_source", "what_shows",
                            "what_behind", "checks", "verdict", "fit", "portfolio_match", "action",
                            "leadership_line", "assessed_from", "video_url", "corroboration"],
                "additionalProperties": False}},
            "challengers": {"type": "array", "items": {"type": "object", "properties": {
                "name": {"type": "string"}, "category": {"type": "string", "enum": cat_ids},
                "what": {"type": "string"},
                "scores": {"type": "object", "properties": {k: {"type": "integer"} for k in CRITERIA},
                           "required": CRITERIA, "additionalProperties": False},
                "why": {"type": "string"}, "source": link,
            }, "required": ["name", "category", "what", "scores", "why", "source"], "additionalProperties": False}},
            "matrix": {"type": "array", "items": {"type": "object", "properties": {
                "category": {"type": "string", "enum": cat_ids},
                "readiness": {"type": "integer"}, "relevance": {"type": "integer"},
                "hype": {"type": "integer"}, "substance": {"type": "integer"}, "reason": {"type": "string"},
            }, "required": ["category", "readiness", "relevance", "hype", "substance", "reason"],
                "additionalProperties": False}},
        },
        "required": ["viral", "challengers", "matrix"],
        "additionalProperties": False,
    }
    system = (
        "Turn the research notes into the structured fields requested, for an executive briefing. Use only what "
        "the notes say. Every URL must be copied exactly from the notes or the source list; if there is none, "
        "use an empty string (video_url) or leave the item out (corroboration). Keep text short and plain: "
        "what_shows and what_behind at most 45 words each, why and what at most 25 words, leadership_line one "
        "sentence of at most 35 words, reason at most 15 words. views_reported is a short figure such as "
        "'5.7M' or 'Not verified'. Scores for new vendors are integers 0 to 4; category map values 0 to 100."
    )
    try:
        response = client.beta.messages.create(
            model=config["model"], max_tokens=16000, system=system,
            betas=["server-side-fallback-2026-07-01"], fallbacks="default",
            output_config={"effort": "low", "format": {"type": "json_schema", "schema": schema}},
            messages=[{"role": "user", "content": f"Research notes:\n{notes}\n\nSources seen:\n" + "\n".join(sources)}],
        )
    except (anthropic.APIConnectionError, anthropic.APIStatusError) as exc:
        log(f"Research step: could not structure the notes ({exc}); skipping it.")
        return None
    if response.stop_reason in ("refusal", "max_tokens"):
        log(f"Research step: structuring stopped early ({response.stop_reason}); skipping it.")
        return None
    try:
        return json.loads(next(b.text for b in response.content if b.type == "text"))
    except (StopIteration, json.JSONDecodeError):
        log("Research step: unreadable structured output; skipping it.")
        return None


def _validate(result: dict, allowed: set[str], notes: str, our_vendors: list[str], config: dict,
              searches: int, n_sources: int) -> dict:
    """Keep only sourced, well-formed findings."""
    ok = lambda u: bool(u) and u.startswith("https://") and _norm(u) in allowed
    in_notes = lambda u: bool(u) and u.startswith("https://") and u in notes
    viral = []
    for v in result.get("viral", [])[:3]:
        v["corroboration"] = [c for c in v.get("corroboration", []) if ok(c.get("url", ""))][:4]
        if not (ok(v.get("video_url", "")) or in_notes(v.get("video_url", ""))):
            v["video_url"] = ""
        if not v["corroboration"]:
            v["checks"]["corroborated"] = "no" if v["checks"].get("corroborated") == "yes" else v["checks"].get("corroborated", "unknown")
        if v["corroboration"] or v["video_url"]:
            viral.append(v)
    ours = {n.lower() for n in our_vendors}
    challengers = []
    for c in result.get("challengers", [])[:4]:
        if c["name"].lower() in ours or not ok(c.get("source", {}).get("url", "")):
            continue
        c["scores"] = {k: max(0, min(4, int(c["scores"].get(k, 0)))) for k in CRITERIA}
        c["total"], c["verdict"] = challenger_verdict(c["scores"])
        challengers.append(c)
    challengers.sort(key=lambda c: -c["total"])
    seen, matrix = set(), []
    for m in result.get("matrix", []):
        if m["category"] in seen:
            continue
        seen.add(m["category"])
        for k in ("readiness", "relevance", "hype", "substance"):
            m[k] = max(0, min(100, int(m[k])))
        matrix.append(m)
    log(f"  Research kept {len(viral)} viral items, {len(challengers)} new vendors, {len(matrix)} categories.")
    return {"viral": viral, "challengers": challengers, "matrix": matrix,
            "research_meta": {"searches": searches, "sources": n_sources}}
