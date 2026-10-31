"""Build data/scout-providers.js for the Robotics Scout (scout.html).

The source of truth is intel/scout/providers.json: one object per provider, written by
research (Claude) and reviewed by people. This script checks every record, then writes
the browser file. Scores are not calculated here: the page calculates the Aldar Fit
Score from data/scout-strategy.js, so a change of weights never needs a rebuild.

Usage:  python intel/scout_build.py          (writes data/scout-providers.js)
        python intel/scout_build.py --check  (only checks; exits 1 on problems)
"""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "intel" / "scout" / "providers.json"
OUT = ROOT / "data" / "scout-providers.js"
CONFIG = ROOT / "intel" / "config.json"
FLEET_FILES = [ROOT / "data" / "fleet-data.js", ROOT / "data" / "construction-data.js"]

PILLARS = ["fit", "readiness", "deployments", "gcc", "commercial", "integration"]
GCC_LEVELS = {"none", "distributor", "gcc_customers", "local_office", "uae_deployments"}
MODELS = {"purchase", "raas", "service"}
LEVELS = {"low", "medium", "high"}
URL_RE = re.compile(r"^https?://[^\s\"'<>]+$")


def fleet_vendors() -> set[str]:
    found: set[str] = set()
    for f in FLEET_FILES:
        if f.exists():
            found.update(re.findall(r'"vendor":\s*"([^"]+)"', f.read_text(encoding="utf-8")))
    return found


def check(providers: list[dict], categories: set[str]) -> list[str]:
    problems: list[str] = []
    seen: set[str] = set()
    vendors = fleet_vendors()
    for i, p in enumerate(providers):
        where = f"{p.get('id') or '#' + str(i)}"
        if not p.get("id") or not re.match(r"^[a-z0-9-]+$", p["id"]):
            problems.append(f"{where}: id must be lower-case letters, digits and dashes")
        if p.get("id") in seen:
            problems.append(f"{where}: duplicate id")
        seen.add(p.get("id"))
        if not p.get("name"):
            problems.append(f"{where}: missing name")
        cats = p.get("categories") or []
        if not cats or any(c not in categories for c in cats):
            problems.append(f"{where}: categories must be from {sorted(categories)}")
        m = p.get("maturity")
        if m is not None and m not in (1, 2, 3, 4, 5):
            problems.append(f"{where}: maturity must be 1-5")
        level = (p.get("gcc") or {}).get("level")
        if level not in GCC_LEVELS:
            problems.append(f"{where}: gcc.level must be one of {sorted(GCC_LEVELS)}")
        for b in p.get("business_model") or []:
            if b not in MODELS:
                problems.append(f"{where}: unknown business_model {b!r}")
        for k in ("confidence", "viability_risk"):
            if p.get(k) not in LEVELS:
                problems.append(f"{where}: {k} must be low, medium or high")
        pil = p.get("pillars") or {}
        for k in PILLARS:
            s = (pil.get(k) or {}).get("score")
            if not isinstance(s, (int, float)) or not 0 <= s <= 5:
                problems.append(f"{where}: pillar {k} needs a score from 0 to 5")
        for s in p.get("sources") or []:
            if not URL_RE.match(s.get("url") or ""):
                problems.append(f"{where}: bad source url {s.get('url')!r}")
        if p.get("website") and not URL_RE.match(p["website"]):
            problems.append(f"{where}: bad website {p['website']!r}")
        for v in p.get("fleet_vendors") or []:
            if v not in vendors:
                problems.append(f"{where}: fleet vendor {v!r} is not in the fleet data")
    return problems


def main() -> int:
    providers = json.loads(SRC.read_text(encoding="utf-8"))
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    cats = [{k: c[k] for k in ("id", "label", "color", "ink")} for c in config["categories"]]
    problems = check(providers, {c["id"] for c in cats})
    if problems:
        print("Problems found:\n  " + "\n  ".join(problems), file=sys.stderr)
        return 1
    if "--check" in sys.argv:
        print(f"OK: {len(providers)} providers")
        return 0
    checked = max((p.get("checked") or "" for p in providers), default="") or date.today().isoformat()
    payload = {
        "meta": {
            "title": "Aldar Market Scout",
            "checked": date.fromisoformat(checked).strftime("%-d %b %Y"),
            "categories": cats,
            "count": len(providers),
        },
        "providers": providers,
    }
    OUT.write_text(
        "/* ALDAR ROBOTICS SCOUT: provider research. Built by intel/scout_build.py from\n"
        "   intel/scout/providers.json; edit that file, not this one. */\n"
        "window.SCOUT_DATA = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT.relative_to(ROOT)}: {len(providers)} providers")
    return 0


if __name__ == "__main__":
    sys.exit(main())
