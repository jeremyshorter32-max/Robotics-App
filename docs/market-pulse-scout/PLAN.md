# Market Pulse → Robotics Scout: saved plan

**Status:** build started 31 Oct 2026 on branch `scout-build`. Nothing is live until you say "make it live".
**Saved:** 31 Oct 2026, on branch `plan/market-pulse-scout`.
**To start:** say *"activate the Market Pulse scout plan"*. Work begins from this branch, starting with the decisions in section 9.

> **Update, 31 Oct 2026:** see **`FEATURE-MAP.md`**, which maps each CB Insights feature to a free, robotics-specific version. It sets the build order: free first, using the browser, GitHub, the Netlify Pro plan you already have, and your Claude plan. The paid on-site AI search in sections 6 and 8 becomes an optional later upgrade.

---

## Decision: Scout gets its own page (31 Oct 2026)

Scout is built as **its own page (`scout.html`)**, not added into the Pulse page. Pulse and Scout share a header with *Market Intelligence: Pulse | Scout* tabs, so to users they feel like one product.

- **Why separate:**
  - **Different jobs.** Pulse is for reading the news. Scout is a working tool for search, scoring and the pipeline.
  - **Different access.** Pulse stays open. Scout can sit behind a password later, because pipeline, notes and ratings will be confidential.
  - **Speed.** Each page loads only what it needs, which matters most on phones.
  - **Clean links** to individual providers and comparisons.
  - **Lower risk.** Scout is built without touching Pulse, which the bot updates every week.
- **How they connect:**
  - Vendor names in Pulse stories link to their Scout profiles, and Pulse's "New vendors" section gets **Score in Scout**.
  - Scout profiles show that provider's latest Pulse news.
  - Both read the same research data behind the scenes.
- **Rollback point** before the build: branch `rollback-before-scout` (main at a87384c).

## 1. What we want

We want to turn Market Pulse from a weekly news page into a scouting tool for robotics technology, in the spirit of CB Insights but built around Aldar's robotics strategy.

1. **Search on demand.** Type a need, such as *"façade cleaning for high-rise towers that copes with UAE heat and dust"*. An AI agent researches the market and returns a ranked shortlist of providers.
2. **Automatic scoring against our preset criteria.** Every provider gets an Aldar Fit Score, with a short reason and a source link behind each part.
3. **Matrices and side-by-side comparisons.** These make the decision quick and easy to defend in a paper to management.
4. **A rolling feed.** The news feed refreshes continuously instead of once a week, and it watches the providers we have saved.

## 2. What we already have to build on

Today's Market Pulse already does a smaller version of this. Most of it can be reused:

| Today (weekly) | Where | How it carries over |
|---|---|---|
| A GitHub job runs every Monday at 10:00 Abu Dhabi time, collects news and publishes `data/intel-feed.json` | `.github/workflows/market-intel.yml`, `intel/market_intel.py` | Becomes the rolling feed (section 5.4) |
| Claude researches the web in two stages. Every link must come from a page it actually opened, so made-up sources are dropped | `intel/research.py` | The same safeguard becomes the core of the Scout agent |
| **New vendors** scoring: funding, deployments, scale, partners and GCC, each 0–3, giving a total out of 15 and a verdict of Add, Watch or Ignore | `research.py` → `challenger_verdict` | Grows into the Aldar Fit Score (section 4) |
| **Category map:** readiness against relevance to Aldar, plus hype and substance | `research.py` | Becomes the Fit against Maturity matrix |
| **Vendor watch:** news about our own vendors and the companies that make their equipment | `intel/portfolio.py`, `intel/portfolio.json` | Becomes the Watchlist |
| Eight technology categories with search terms | `intel/config.json` | Become the strategy parameters |

## 3. What the market leaders do (benchmark)

| Tool | What is worth copying | Indicative price |
|---|---|---|
| **CB Insights** | The **Mosaic score** (0–1,000, combining Momentum, Market, Money and Management), a Commercial Maturity stage, **ESP matrices** (execution against market strength), AI scouting reports, ChatCBI, and a "team of agents" | Not published. Contracts are reported at about $40k–$100k a year |
| Harmonic | Fast discovery across a very wide set of companies, and alerts | About $10k per seat a year, with a 3-seat minimum |
| Tracxn / Dealroom / PitchBook | Funding, headcount and investor data, and landscape views | Dealroom from about €12.5k a year. PitchBook API about $70k+ a year. Tracxn on quote |
| StartUs Insights | Semantic search for narrow technology topics, and scouting reports | On quote |
| Crunchbase | The cheapest structured funding data | Pro $49 a month. The API is quoted separately |

**Takeaway:** these tools are broad databases priced for venture investors. Our need is narrower. We want a few dozen strong providers per category, judged by **our** criteria, with GCC readiness weighted heavily. An agent that researches live, plus our own scoring, covers that for a small fraction of the cost. A paid data feed stays optional, for funding and headcount figures only (Phase 3).

The pricing and feature details above come from third-party comparison sites and vendor pages. Check them directly before any purchase decision.

## 4. Aldar Fit Score (the preset parameters)

A draft lives in `docs/market-pulse-scout/scout-strategy.draft.json`. The idea is to edit one file to change the strategy.

**How a provider is scored**

1. **Knock-out checks first** (pass or fail). The provider:
   - is on a sanctions or restricted list (for example, a US entity list);
   - has no working product (only renders or a prototype);
   - cannot legally operate or be supported in the UAE.

   A provider that fails any check is shown greyed out with the reason. It is never silently hidden.
2. **Six pillars**, each scored 0–5 by the agent with written evidence and a source link:

| Pillar | Weight | What it looks at |
|---|---|---|
| Strategic fit | 25% | Matches a priority use case and asset type: communities, malls, offices, schools or construction sites |
| Technology readiness | 20% | Prototype, pilot, early commercial or at scale. Level of autonomy. Track record of uptime |
| Proven deployments | 20% | Number and size of live deployments, how comparable those sites are to ours, named reference customers |
| GCC readiness | 15% | Local office or partner, heat and dust ratings, Arabic support, UAE approvals (for example GCAA for drones), regional customers |
| Commercial strength | 10% | Funding, backers, revenue signals, headcount trend, risk of the company failing |
| Integration & safety | 10% | Links to building management and facility management systems (APIs), safety certificates (for example ISO 13482), cybersecurity, data kept in the UAE |

3. **Fit Score** = the weighted total, from 0 to 100, calculated by our own code rather than by the AI. Changing a weight re-ranks every list instantly, with no new research needed.
4. **Confidence** is High, Medium or Low, based on how much independent evidence backs the scores. This keeps a company with a polished website and no proof from ranking too high.
5. **Verdict:**
   - **Shortlist:** 70 or more, with Proven deployments of at least 3.
   - **Watch:** 50–69.
   - **Pass:** below 50.

   This replaces today's Add, Watch and Ignore.

## 5. What the user will see

### 5.1 Scout search (new tab on Market Pulse, desktop and phone)
- A search box, plus filters for category, region, minimum maturity and "must have a GCC presence".
- Results are honest about timing. A deep search takes about **3–8 minutes**, because the agent reads dozens of pages. The page shows live progress and keeps the result, so leaving and coming back is fine.
- A repeated or similar search returns the saved result instantly, with a "refresh" option.
- Output is a ranked table: provider, country, Fit Score, confidence, verdict, and a one-line reason.

### 5.2 Provider profile
For each provider: what they make, a short video or image if one is available, deployments and customers, funding, GCC presence, partners, risks, the score for each pillar with evidence, **a source link for every claim**, and the date it was last checked. Buttons: **Add to watchlist**, **Compare**, and **Propose a trial** (later, this creates a planned row on the fleet map).

### 5.3 Matrices and decision aids
- **Fit against Maturity 2×2**, our version of the CB Insights ESP matrix. Bubble size shows funding and colour shows category.
- **Comparison table** for 2–5 selected providers: pillars as rows, with the leader in each row highlighted.
- **Pillar heatmap** across a whole shortlist.
- **Category landscape:** every scored provider in a category, grouped by maturity.
- **Export** to PDF (a decision-paper layout) and CSV.

### 5.4 Rolling Market Pulse feed and watchlist
- The news feed refreshes **daily**, not weekly. Each refresh adds new stories, so the page always reflects the past 7 days.
- Saved providers are re-checked weekly. A change is flagged, for example new funding, a new GCC contract, layoffs or a product recall.
- Our current vendors keep their place, as they have today.

## 6. How it would be built

**Recommended: run it on Netlify, the site's existing host.**

```
Market Pulse page (intel.html)
   │  1. POST /api/scout   {query, filters, passcode}
   ▼
scout-start  (Netlify Function, returns at once)
   │  checks access and spend limit, writes a job record, starts ↓
   ▼
scout-run-background  (Netlify background function, up to 15 min)
   │  Stage 1  Claude Opus 5.5 + web search + web fetch → research notes
   │  Stage 2  Claude turns the notes into structured JSON
   │           (fixed format, so the page never breaks)
   │  Guard    drop any link the agent did not actually open (same rule as research.py)
   │  Score    our code applies the knock-outs and weights from the strategy file
   ▼
Netlify Blobs  (stores jobs, provider profiles, watchlist and feed)
   ▲
   │  2. the page checks GET /api/scout/<job id> every few seconds until it is ready
```

- **Model:** Claude Opus 5.5 (`claude-opus-5-5`) with the current web search and web fetch tools (`web_search_20260209`, `web_fetch_20260209`). These filter results before reading them, which saves tokens.
- **Deep dives in parallel:** after the first shortlist, each top provider gets its own short research call, so the full job fits inside the 15-minute limit.
- **The feed moves off git:** daily updates go into Netlify Blobs and are served by a function. This means no daily commits to `main` and no daily redeploys, and the Market Pulse bot stops colliding with fleet-map changes.
- **Upgrade path:** **Claude Managed Agents**, where Anthropic hosts the agent and runs it on a schedule. We would move to this if searches regularly need more than 15 minutes, or if we want a team of agents (one per provider) and built-in scheduling for the watchlist. It is the same idea, with less of our own infrastructure.
- **Optional data feed (Phase 3):** Crunchbase, Dealroom or Tracxn, for verified funding and headcount, only if web evidence proves too thin.

## 7. Access, confidentiality and cost control (must decide first)

- **The website is public to anyone with the link, and the GitHub repo is public.** A search box that calls a paid AI service must not be open to everyone. Options:
  1. A shared passcode checked by the function, with a limit on searches per day. This is the simplest.
  2. Netlify password protection, or Netlify Identity logins for named users.
  3. Make the repo private and protect the whole Market Pulse page.
- **Strategy weights and scoring notes would be visible in a public repo.** If they are sensitive, keep the live copy in Netlify Blobs or environment settings rather than in git.
- **Spend cap:** a monthly limit enforced in code. The function refuses new searches once the limit is reached and shows a message.
- **API key:** `ANTHROPIC_API_KEY` is needed as a Netlify environment variable. It is also already optional for the GitHub job.

## 8. Rough running costs (estimates; check after the first 20 searches)

These use Opus 5.5 list prices: $4 per million input tokens, $20 per million output tokens, and $10 per 1,000 web searches.

| Activity | Assumption | Estimate |
|---|---|---|
| One scout search with deep dives | About 25 searches, 15 pages read, 300–500k tokens in, 30–50k out | **About $1.5–3.5 per search** |
| 100 searches a month | | About $150–350 a month |
| Watchlist re-check | 50 providers a week | About $40–100 a month |
| Daily feed | 30 runs | About $30–60 a month |

For comparison, CB Insights is reported at $40k–$100k a year. Costs can drop further by reusing saved results and using a cheaper model (Sonnet 5.5) for the deep dives, after checking that quality holds.

## 9. Decisions needed before building

1. **Access:** passcode, named logins, or a private repo (section 7)?
2. **Weights:** approve or adjust the six pillars and weights in section 4, and the knock-out list.
3. **Priority use cases:** confirm the list in the strategy file, including any categories to add, for example concierge and humanoid robots, parking, or landscaping.
4. **Monthly budget cap** for searches.
5. **Seed list:** any providers you already know you want profiled first.
6. **Data feed:** stay web-only for now (recommended), or budget for Crunchbase or Dealroom?

## 10. Build phases

| Phase | Delivers | Ready when |
|---|---|---|
| **0. Set-up** | Section 9 decided, API key in Netlify, access gate, spend cap | A test search works for an approved user only |
| **1. Scout MVP** | Search tab, ranked shortlist, provider profiles, Fit Score with sources, saved results | 10 test searches match the team's judgement on known vendors (Pudu, SINDAN, Analog and others) |
| **2. Decision tools** | Fit against Maturity matrix, comparison table, heatmap, PDF and CSV export, watchlist | A shortlist can be exported straight into a management paper |
| **3. Live feed and alerts** | Daily feed in Blobs, weekly watchlist checks, change alerts, optional data feed, "Propose a trial" linking to the fleet map | The weekly GitHub job is retired |

Each phase follows the usual routine: build on a branch, test at desktop and phone sizes, save a rollback point, then go live on your "make it live".

## Sources consulted
- CB Insights, Mosaic score: https://cbinsights.com/mosaic-score
- CB Insights January 2026 product launch: https://www.cbinsights.com/january-2026-product-launch/
- CB Insights review and pricing (ZoomInfo): https://pipeline.zoominfo.com/sales/cb-insights-review
- CB Insights alternatives (Multiples): https://multiples.vc/compare/cb-insights-alternatives
- Startup scouting platforms (Qubit Capital): https://qubit.capital/blog/startup-scouting-platforms
- Crunchbase API alternatives (Multiples): https://multiples.vc/compare/crunchbase-api-alternatives
- PitchBook API alternatives (Multiples): https://multiples.vc/compare/pitchbook-api-alternatives
- Dealroom pricing (Ellty): https://www.ellty.com/blog/dealroom-pricing
- Harmonic alternatives (Prospeo): https://prospeo.io/s/harmonic-alternatives
- Netlify background functions: https://docs.netlify.com/build/functions/background-functions/
- Netlify functions overview: https://docs.netlify.com/functions/build
