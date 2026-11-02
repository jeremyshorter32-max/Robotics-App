# Robotics-App

Aldar Robotics Deployments: a map and dashboard of robotic deployments across Abu Dhabi.

One website, two layouts:
- **Desktop (main):** `index.html`. Anyone opening the site gets this unless they're on a phone.
- **Mobile:** `mobile.html`. Phones (screens 760px wide or less) are sent here automatically.

Add `?view=desktop` to the address to force the desktop layout on a phone, or `?view=mobile` to force the mobile layout on a computer.

## Where things live
| Path | What it is |
|---|---|
| `data/fleet-data.js` | **The fleet data.** Both layouts read this one file, so edit data here only. |
| `index.html` | Desktop layout and logic (the main version). |
| `mobile.html` | Mobile layout and logic. |
| `assets/vendor/` | Leaflet (maps), React, and the page runtime. |
| `assets/fonts/`, `assets/img/` | Poppins font files, logo, map icons. |
| `netlify.toml` | Netlify settings (no build step). |
| `intel.html` | **Market Pulse**: weekly robotics market intelligence feed (works on desktop and phone). |
| `data/intel-feed.json`, `data/intel-feed.js` | Market Pulse editions. Written by the weekly job; don't edit by hand. |
| `scout.html` | **Market Scout**: chat-style scouting. Ask about a technology or problem and get a scout brief (desktop and phone). |
| `scout-library.html` | **Provider memory**: every provider Scout has researched, with filters, matrix, compare and scoring. |
| `intel/scout/providers.json` | Scout provider research, the source of truth. Run `python intel/scout_build.py` after editing. |
| `data/scout-providers.js` | Built from `providers.json` by `intel/scout_build.py`; don't edit by hand. |
| `data/scout-strategy.js` | Scout scoring settings: pillar weights, knock-outs, verdict rules, matrix split and quick searches. |
| `intel/` | The weekly job: `market_intel.py`, with `portfolio.py` (our vendors in the news) and `research.py` (Claude's web research), and their settings `config.json` and `portfolio.json`. |
| `.github/workflows/market-intel.yml` | Runs the weekly job on GitHub. |

## Deploy on Netlify
1. In Netlify: **Add new site → Import an existing project → GitHub**.
2. Pick `jeremyshorter32-max/Robotics-App`, branch `main`.
3. Leave the build command empty and the publish directory as `.`, then deploy.

Every push to `main` redeploys automatically.

## Run locally
`python3 -m http.server` in this folder, then open http://localhost:8000.

## Phone app (home screen)
The site installs like an app. On iPhone, open it in Safari, tap **Share → Add to Home Screen**. It gets the Aldar logo as its icon, is named "Aldar Robotics", and opens full screen without the browser bar.
Icons are in `assets/icons/`; app name and colours are in `manifest.webmanifest`.

## Market Scout (provider scouting)
`scout.html` sits next to Market Pulse; the two pages share a *Pulse | Scout* switch in the header.

**Scout is a chat-style search.** It opens on one question, *What should we scout today?* Type a technology, a problem or a focus area, for example *robotic painting for apartment interiors*. Scout then writes a **scout brief** from five sources:

- **Aldar experience:** our live, testing and planned deployments in that area, from the fleet map data.
- **Strategy fit:** whether it is a named use case or a focus area in Aldar's robotics strategy, and what a strong provider looks like by weight.
- **Best-fit providers:** matches from the provider memory, ranked by the **Aldar Fit Score**, with each one's main strength and the thing to watch. A mini Fit × Maturity matrix sits alongside, and any provider opens its full profile.
- **New in the market:** companies named in a live Google News scan (`netlify/functions/scout-news.mjs`), with one-click Google searches in six languages. **+ To research** builds a list to send to Claude for full profiles.
- **Market signals and next steps:** Market Pulse and news items, plus suggested actions.

**How Scout reads a question.** Every use case in `data/scout-strategy.js` (`web_scout.terms`) is scored against the question.
- Each *match* word (the subject, such as *delivery*, *façade* or *painting*) scores 3. Each *weak* word (the setting, such as *high-rise*, *tower* or *cleaning*) scores 1.
- The highest score wins. On a tie, the use case named first in the question wins.
- A use case needs at least one match word, or two weak words, to be chosen. Otherwise the scout is exploratory.
- The brief's **Read as** switch lets you correct the reading. Scout then re-scouts, and the choice is kept in the link (`&as=`).

Briefs can be **saved** (in this browser; they appear on the Scout home page), **shared** as a link (`scout.html?q=...` re-runs the scout), and **downloaded** as PDF (print) or a Markdown text file. Code: `assets/js/scout-chat.js` and `assets/css/scout-chat.css`.

**Provider memory** (`scout-library.html`) lists every researched provider. Scout draws on it for every brief. It has search, a filter builder with *is any of / is none of / is all of*, a Fit × Maturity matrix, a category leaderboard, compare (up to 5, print to PDF), CSV export and *How scoring works*, where you can try other weights.

- **Aldar Fit Score (0 to 100)** is worked out in the browser from six pillars scored 0 to 5 by research: strategic fit 25%, technology readiness 20%, proven deployments 20%, GCC readiness 15%, commercial strength 10%, integration and safety 10%. Knock-out checks run first. Verdicts: Shortlist (70+ with deployments at least 3), Watch (50 to 69), Pass (under 50).
- **Updating providers:** edit `intel/scout/providers.json`, or ask Claude to research and add providers, then run `python intel/scout_build.py`. It checks every record before writing `data/scout-providers.js`.
- **Changing the strategy:** edit `data/scout-strategy.js`, which holds the weights, knock-outs, verdict rules, quick searches and the `web_scout` search terms. Rankings update on the next page load.
- Plan and roadmap: `docs/market-pulse-scout/`.

## Market Pulse (weekly robotics intelligence)
`intel.html` is a short, social-feed style briefing for executives on what moved in robotics worldwide: trends, product launches, investments and deployments, sorted into categories that match the fleet. Each story has a two-line summary and a "why it matters for Aldar" line. Open it from the **Market pulse** button in the header (desktop) or the Menu tab (phone).

**How it updates.** Every Monday at 10:00 Abu Dhabi time a GitHub Action runs `intel/market_intel.py`. It collects the last 7 days of news from Google News searches and trade-press feeds, picks the most important stories, and commits the new edition to `data/`. Netlify then redeploys. If the run fails or GitHub delays it, it retries every hour through Tuesday afternoon; once the week's edition exists, the retries do nothing. The last 12 weeks stay available in the edition picker.

**Trend memory.** Each edition records how much news each category had and compares it with the previous four weeks. The **Trend radar** panel shows running themes (new, rising, steady or cooling) and each category's news volume against its recent average. With AI summaries on, Claude also reads the last four editions' takeaways and trends, so it carries themes forward week to week rather than starting fresh. Stories covered by several outlets are merged into one, with a "Covered by N outlets" tag.

**Turn on AI summaries (recommended).** Add a repository secret named `ANTHROPIC_API_KEY` (GitHub: Settings → Secrets and variables → Actions → New repository secret). Claude then chooses the stories and writes the summaries, takeaways and "why it matters" lines. Without a key, the job still runs but uses a simple rule to pick stories and shows the original headlines.

**Our portfolio.** Pulse reads our vendors, what they run for us, where and at what stage from `data/fleet-data.js` (the fleet map's data), so the two never disagree. Each week it also searches for news about those vendors and the makers of their equipment (Neolix for Cargo X / Noon, DJI for AirTech, Boston Dynamics for Analog). Stories about them get an "Our vendor" line, the **Our vendors** filter shows just those stories, and the **Our vendors this week** card marks each vendor as good news, risk or mixed. The names to look for are in `intel/portfolio.json`; add a vendor there when it joins the fleet with a name that differs from the fleet map.

**Research tabs (needs the API key).** With `ANTHROPIC_API_KEY` set, Claude also searches the web itself each week, and the page gains two tabs and a chart:
- **Viral watch:** the week's most-watched robot videos, each checked (real footage, autonomous, confirmed, deployed, fits GCC), with a verdict and a line for leadership.
- **New vendors:** challengers in our categories, scored 0–4 on funding, deployments, scale, partners and GCC route. 14+ with named deployments: consider adding; 8–13: watch; under 8: ignore.
- **Category map** (in the Trend radar): readiness against relevance for each category.

Only links Claude actually opened during its research are kept, so the page never shows a made-up source. This step uses web search, so web search must be enabled for the organisation in the Claude Console; settings (number of searches) are under `research` in `intel/config.json`. If it fails, the edition is published without it.

**Change the categories or sources.** Edit `intel/config.json`: each category has a label, colours, `queries` (news searches) and `keywords` (used to sort stories). You can also change the number of stories, the model, and the trade-press feeds there.

**Run it by hand.** In GitHub: Actions → Robotics Market Pulse → Run workflow (tick "force" to rebuild this week). Locally: `pip install -r intel/requirements.txt`, then `python intel/market_intel.py` (`--dry-run` prints without saving, `--force` rebuilds this week).

## Deployment videos
Footage appears on each deployment's card, in a full-screen player, and in the **Watch deployments** gallery (header on desktop, Menu tab on phones). The **Has video** filter shows only deployments with footage.

To add a video:
1. Put the web-ready file and a preview image in `assets/video/` (e.g. `07-analog-spot-01.mp4` and `.jpg`). Keep clips short, silent, H.264 MP4 with "faststart", about 1–2 MB each. Portrait and landscape both work; set `width` and `height` so the player takes the right shape.
2. In `data/fleet-data.js`, add it to that deployment's `videos` list:
   `{"src": "assets/video/<file>.mp4", "poster": "assets/video/<file>.jpg", "title": "Short caption", "duration": 12}`

## Map layers: Residential & Commercial and Construction
The switch at the top swaps between two layers, each with its own data:
- `data/fleet-data.js`: Residential & Commercial (blue).
- `data/construction-data.js`: Construction trials (green accents and map tint).

`assets/js/modes.js` holds the layer list and colours. Adding `?map=construction` to the address opens straight into the construction layer. Videos tagged `"section": "construction"` appear in the Construction tab of the Watch deployments gallery from either layer.
