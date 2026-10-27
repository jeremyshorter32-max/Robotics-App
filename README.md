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
| `intel/` | The weekly job: `market_intel.py` and its settings, `config.json`. |
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

## Market Pulse (weekly robotics intelligence)
`intel.html` is a short, social-feed style briefing for executives on what moved in robotics worldwide: trends, product launches, investments and deployments, sorted into categories that match the fleet. Each story has a two-line summary and a "why it matters for Aldar" line. Open it from the **Market pulse** button in the header (desktop) or the Menu tab (phone).

**How it updates.** Every Monday at 10:00 Abu Dhabi time a GitHub Action runs `intel/market_intel.py`. It collects the last 7 days of news from Google News searches and trade-press feeds, picks the most important stories, and commits the new edition to `data/`. Netlify then redeploys. If the run fails or GitHub delays it, it retries every hour through Tuesday afternoon; once the week's edition exists, the retries do nothing. The last 12 weeks stay available in the edition picker.

**Turn on AI summaries (recommended).** Add a repository secret named `ANTHROPIC_API_KEY` (GitHub: Settings → Secrets and variables → Actions → New repository secret). Claude then chooses the stories and writes the summaries, takeaways and "why it matters" lines. Without a key, the job still runs but uses a simple rule to pick stories and shows the original headlines.

**Change the categories or sources.** Edit `intel/config.json`: each category has a label, colours, `queries` (news searches) and `keywords` (used to sort stories). You can also change the number of stories, the model, and the trade-press feeds there.

**Run it by hand.** In GitHub: Actions → Robotics Market Pulse → Run workflow (tick "force" to rebuild this week). Locally: `pip install -r intel/requirements.txt`, then `python intel/market_intel.py` (`--dry-run` prints without saving, `--force` rebuilds this week).
