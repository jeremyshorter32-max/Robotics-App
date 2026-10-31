# CB Insights features → Aldar Market Scout (free build)

**Status:** build started 31 Oct 2026 on branch `scout-build`. See the page decision in `PLAN.md`.
**Saved:** 31 Oct 2026, on branch `plan/market-pulse-scout`. It works alongside `PLAN.md`.
**Source:** the CB Insights platform diagnostic (audited 31 Oct 2026) you shared. It covers sections 3–14 of that file.
**Goal:** bring across as many CB Insights features as possible, tailored to Aldar's robotics strategy, without adding new running costs.

---

## 1. What "free" means here

| Tag | Meaning | Why it's free |
|---|---|---|
| 🟢 **Free** | Runs in the browser, or on GitHub and Netlify, which you already have. No AI involved | GitHub Actions is free for public repos. Your Netlify team is on **Pro**, so password protection and longer-running functions are already included |
| 🟡 **Free with your Claude plan** | AI research and scoring that **you** run, or **you** schedule, in Claude Code, for example "scout façade cleaning robots". Results are saved to the Scout and everyone can read them | Uses your Claude plan's usage limits. There is no separate API bill |
| 🔴 **Not free** | Colleagues starting AI searches themselves from the website, or CB Insights' own data | Needs pay-per-use API billing, or a data licence |

**Two points to know:**
- **Who can trigger research.** A Claude subscription is for your own use. Anything colleagues start themselves, such as a "search now" box they press, must go through a paid API key (🔴). The free design therefore has two speeds:
  1. **Instant search of everything already scouted**, open to everyone (🟢).
  2. A **"Request a scout" queue**. Colleagues submit a need, and **you** run it in Claude, or your scheduled task picks it up (🟡). Results take hours, not minutes.
- **The existing weekly Market Pulse job already uses a paid Claude API key.** The latest edition shows `generated_by: claude`. Its cost is small, but it is not zero. To make it free, move it to a Claude Code scheduled task on your plan (Phase 3).

---

## 2. Feature-by-feature verdict

### 2.1 AI assistant and one-click reports (CB Insights sections 3 and 11)

| CB Insights feature | Our version, tailored to robotics | Tag |
|---|---|---|
| **ChatCBI** (chat over the data) | **Ask the Scout in Claude.** A saved Claude Code skill that knows our strategy file, scouted providers, fleet map and Market Pulse feed. You ask, and it answers with sources. It is not a live chat box on the site, because that would be paid | 🟡 |
| **Magic Mode** (10 one-click deliverables) | **Eight Scout report templates**, each a fixed format that is saved to the site: | 🟡 |
| | 1. *Provider Deep Dive* (in place of Company Deep Dive) | |
| | 2. *Category Trend Report* (in place of Market Trend Report) | |
| | 3. *Vendor Face-off*, comparing a challenger with our current vendor (in place of Competitive Analysis) | |
| | 4. *SWOT* | |
| | 5. *Partner Assessment*: UAE integrators, distributors and service partners | |
| | 6. *Trial Proposal*: site, scope, KPIs, risks and cost (in place of Investment Memo) | |
| | 7. *Vendor Due Diligence*: safety, data, warranty, support and financial health (in place of M&A Target Analysis) | |
| | 8. *Category Deep Dive* (in place of Industry Deep Dive) | |
| | Dropped: Porter's Five Forces and pure company search, which add little for buying robots | |
| **Scouting Report Agent** | Provider Deep Dive, run on request or from the queue | 🟡 |
| **Competitive Intel Agent** | **Vendor Sentinel.** Weekly watch on our current vendors, the makers of their equipment, and their challengers. This already exists as Vendor watch and gets extended | 🟡 |
| **Market Research Agent** | Category Trend Report, run monthly for each of the 8 categories | 🟡 |
| **Company List Builder / Get AI recommendations** | **Find similar providers.** From a few example providers plus keywords, Claude proposes lookalikes, then scores them | 🟡 |
| **Team of Agents: Partner & New Business Finder** | **UAE Partner Finder.** Finds local integrators, distributors and maintenance partners for a provider without a GCC presence | 🟡 |
| **Team of Agents: Commercial Due Diligence** | Vendor Due Diligence template (above) | 🟡 |
| **Team of Agents: Shortlist Analyst** | Ranks a shortlist against the Aldar Fit Score and writes a recommendation | 🟡 |
| **Team of Agents: Deal Agent** | **Robotics funding and deals feed**, built from the daily news scan | 🟡 |
| **Team of Agents: Hiring Analyst** | **Hiring signal** from free public job boards (section 2.6) | 🟢 data, 🟡 summary |
| **Team of Agents: Earnings Analyst** | Only for the few listed makers, for example Hyundai (Boston Dynamics) or Symbotic, using free filings from the US SEC's EDGAR database. Low value, so leave it for later | 🟡 later |
| **Personal Briefing** | **Daily robotics briefing**, personalised to our fleet, watchlist and pipeline. Written by a scheduled task and shown at the top of the Scout | 🟡 |

### 2.2 Markets → robotics categories (section 4)

| CB Insights feature | Our version | Tag |
|---|---|---|
| **Leaderboards** (industry and sub-industry, sortable) | **Category leaderboards.** Our 8 categories, each split into use cases (for example Construction → painting, layout, levelling). Sort by provider count, average Fit Score, median maturity, number with a GCC presence, funding raised in the last 12 months, and news momentum | 🟢 |
| **Index** (all markets, columns, bulk add, export) | **Use-case index.** Every use case in one table, with CSV download and "add to watchlist" | 🟢 |
| **Market report: Overview** | Category page: definition, why it matters to Aldar, and our current deployments in it, pulled from the fleet map | 🟢 |
| **ESP Ranking 2×2** (Execution × Market strength) | **Fit × Maturity matrix**, with quadrants renamed for decisions: **Deploy now** (high fit, high maturity), **Fast mover** (high fit, still maturing), **Proven elsewhere** (mature, lower fit), **Early bet** (low on both). Bubble size shows funding and a ring marks a GCC presence | 🟢 |
| **Scorecard** (side by side, filter, CSV) | **Scorecard.** Pillar scores for every provider in a category, with the leader in each row highlighted, "add all to watchlist", and CSV | 🟢 |
| **Charts** (trends, rankings, benchmarks, editable titles) | **Charts:** funding and deals over time, news momentum, hiring trend, providers by country, and maturity spread. Chart titles are editable so they drop straight into papers | 🟢 |
| **Download PDF** | **Print to PDF.** A print-friendly page layout, so no PDF service is needed | 🟢 |
| **Market watchlist** | Follow a category, which adds it to your briefing | 🟢 |

### 2.3 Research (section 5)

| CB Insights feature | Our version | Tag |
|---|---|---|
| Market maps, briefs, "State of" and "Future of" reports, top-company lists | **Scout Briefs:** a monthly *State of [category] in the GCC* report, a quarterly *Top 25 robotics providers for Aldar*, and category maps. Each brief is built once and kept as an archive on the site | 🟡 written, 🟢 hosted |
| Filter by industry, keyword search | Filter briefs by category, plus keyword search | 🟢 |

### 2.4 Search builder (section 6)

| CB Insights feature | Our version | Tag |
|---|---|---|
| **Search types** (Companies, Deals, People, Patents, News…) | Providers, Deals and funding, News, Patents, Briefs | 🟢 |
| **Filter builder** with *is any of / is none of / is all of* | The same three operators, searching everything already scouted, instantly in the browser | 🟢 |
| **Provider filters** | category · use case · asset type (community, mall, office, school, construction) · **operates in** (UAE, GCC or region, not just head office, which fixes a known CB Insights gap) · head office country · maturity 1–5 · Fit Score · verdict · knock-out flags · funding stage and last round date · has a UAE partner · heat and dust rating · certifications (for example ISO 13482) · business model (outright purchase or robot-as-a-service) · already in our fleet · pipeline stage | 🟢 |
| **Preset chips** (Leadership Signals, popular searches) | **Our presets:** *GCC-ready*, *Heat-rated*, *Deploy now*, *Challengers to our vendors*, *Recently funded*, *Hiring fast*, *Already trialled by Aldar* | 🟢 |
| **Ranking** | Results are **ranked by Fit Score**, not just filtered. CB Insights only filters | 🟢 |
| **Saved searches** | Saved in your browser, plus a **share link**: every search is captured in the web address | 🟢 |
| **Request a scout** (new: what to do when nothing matches) | A form saves the need to a queue. You run it in Claude, or the scheduled task does. Free on the Netlify plan you already have, within its form limits | 🟡 |
| People search, Leadership Signals, In Stealth | **Partial.** Each provider profile lists its key people from public pages. There is no people database or stealth tracking, because that data is proprietary | 🟡 partial, 🔴 rest |

### 2.5 Provider profile (section 7)

| CB Insights tab | Our version | Tag |
|---|---|---|
| **Overview** | What they make, head office, founded, website, video or image | 🟡 |
| **Outlook: Commercial Maturity (1–5)** | The same five stages: **1 Emerging, 2 Validating, 3 Deploying, 4 Scaling, 5 Established**, with the evidence for each | 🟡 |
| **Outlook: Mosaic score** | **Aldar Fit Score (0–100)** and **Momentum (0–100)**. Momentum combines news volume trend, hiring, patents, funding recency and new deployments, all from free sources | 🟡 / 🟢 |
| **Outlook: Funding Window** | **Months since last round**, with a simple flag: *likely raising soon* (12–24 months since the last round). It is labelled as a rough guide, not a prediction | 🟢 |
| **Outlook: Exit Probability** | Replaced with **Vendor viability risk** (Low, Medium or High). What matters to Aldar is whether the provider will still be around to support the robots, not its exit | 🟡 |
| **Strategy Map** | **Partnerships and customers map:** deployments, partners, distributors and investors grouped by type, from press releases and case studies | 🟡 |
| **Network: Competitors (similarity %)** | **Alternatives:** the closest providers in our database, with a similarity percentage and how each differs | 🟡 |
| **Network: Investors / Relationships** | From press and public records | 🟡 |
| **Revenue datapoints with sources** | Only where public, always with a source. Shown as "not disclosed" otherwise | 🟡 partial |
| **Deals: Fundings** | Funding rounds from news, with source links | 🟡 |
| **Markets** | The categories and use cases the provider appears in | 🟢 |
| **Customer Sentiment** (buyer interviews) | **Aldar experience:** our own trial notes and status from the fleet map (live, testing, planned), with uptime and issues. Public case studies are added alongside. This is more valuable than CB Insights' version because it is first-hand | 🟢 |
| **People: Headcount and Job Openings** | **Open roles and hiring trend** from free public job boards (Greenhouse, Lever, Ashby, Workable) where the provider uses one. Key people come from the website. There is no headcount history | 🟢 / 🟡 |
| **News** | Already collected weekly. This becomes daily | 🟢 |
| *(new, robotics-specific)* | **Spec sheet:** operating temperature, IP rating, battery and runtime, payload, autonomy level, safety certificates, connectivity, data hosting, pricing model, and lead time | 🟡 |
| *(new)* | **Action buttons:** Add to watchlist · Compare · Request deep dive · **Propose a trial**, which drafts a *planned* row on the fleet map | 🟢 |

### 2.6 Watchlists and pipeline (section 8.1)

| CB Insights feature | Our version | Tag |
|---|---|---|
| **Watchlists** (table or grid, share, duplicate, download) | The same features. Shared lists are stored in the repo, so everyone sees the same list | 🟢 |
| **Pick-list column as a pipeline** | **Robotics pipeline stages:** Long-list → Screening → Demo → **Trial proposed → Trial live → Scaling**, plus On hold and Rejected. The trial stages match the fleet map statuses (planned, testing, live) | 🟢 |
| **Text notes column** | Notes for each provider | 🟢 |
| **ChatCBI Analysis columns** (AI per row) | **AI columns:** each runs one question across every provider on a list. Templates: *Core strengths*, *Risk flags*, *GCC readiness*, *Technical moat*, *Fit for [named Aldar site]*, *Vs our current vendor*. Run when you ask, or weekly | 🟡 |
| **Import list** | Paste a list of names or upload a CSV, then it is queued for scoring | 🟢 import, 🟡 scoring |
| **Get AI recommendations** | Find similar providers (section 2.1) | 🟡 |
| **Dashboard and Top news** for each watchlist | Latest news, funding and partnerships for the providers on a list, from the daily feed | 🟢 |
| **Strategy Maps and Charts** for each watchlist | Fit × Maturity matrix and pillar heatmap for that list | 🟢 |

### 2.7 Saved searches, feeds, alerts, briefing, activity, stories (sections 8.2–8.6)

| CB Insights feature | Our version | Tag |
|---|---|---|
| **Feeds:** Deals, Companies, News, Content | **Feeds:** Funding and deals · New providers (the existing "New vendors" section) · News (the existing feed) · Briefs | 🟢 shown, 🟡 written |
| **Email alerts, daily or weekly** | **Alerts as feeds and notifications.** Each watchlist and saved search gets an RSS feed, which Outlook can subscribe to (free). Your scheduled task can also send a **push notification to your phone** through the Claude app. Group email is left out, because it would need a paid mail service | 🟢 / 🟡 |
| **Personal briefing and recommendations** (reject or refresh) | Daily briefing (section 2.1) plus **Suggested providers**, with Dismiss. Dismissed suggestions are remembered | 🟡 |
| **Activity history** | "Recently viewed" in your browser | 🟢 |
| **Stories** (presentations) | **Decision packs:** pick providers, charts and a matrix, choose a template (*Trial proposal*, *Vendor comparison*, *Category brief*), then print to PDF in the Aldar style | 🟢 |
| SFTP data feeds | Not needed. All Scout data is open JSON in the repo, and Excel can import it | 🟢 |

### 2.8 Integrations (sections 9–10)

| CB Insights feature | Our version | Tag |
|---|---|---|
| Mobile app | The site already installs as a phone app. The Scout gets a phone layout like the fleet map | 🟢 |
| Chrome and Edge extensions ("analyse the site you're on") | **"Scout this site" bookmark.** One click on any company's website opens the request form already filled in | 🟢 |
| Excel / CSV | CSV export everywhere | 🟢 |
| MCP server (use the data inside Claude) | Claude reads the Scout data directly from the repo, which is how "Ask the Scout" works | 🟢 |
| Salesforce, Clay, Snowflake | Not needed | — |
| **The CB Insights MCP connector itself** | If Aldar already has a CB Insights seat, which the audit suggests, connecting it to **your own Claude** costs nothing extra. It would add Mosaic, funding windows and headcount to your research. **CB Insights data must not be republished on the Scout site**, because it is licensed. Use it to inform our own scores and notes only, and confirm the licence terms first | 🟡 if licensed |

### 2.9 Not brought across

| CB Insights feature | Reason |
|---|---|
| Mosaic score itself, analyst ratings, exit probability | Proprietary. We use our own Fit, Momentum and viability scores instead, plus an **Aldar team rating** (Optimistic, Neutral or Cautious, with the reasoning and what to watch) that the team sets by hand (🟢) |
| Cap tables, buyer interview transcripts, earnings transcripts, revenue per head | Licensed data, or not useful for buying robots |
| People database, "In Stealth", alumni spin-outs | Licensed people data |
| On-site instant AI search for colleagues | Needs pay-per-use API billing (`PLAN.md` section 8). It can be added later on top of the free version without rework |

---

## 3. Data sources

| Signal | Source | Cost |
|---|---|---|
| News, deals, launches | Google News RSS (already used), company press pages | Free |
| Provider facts, specs, deployments, partners | Company websites, press releases, case studies, trade press, read by Claude | Free with your plan |
| Hiring | Public job-board feeds (Greenhouse, Lever, Ashby, Workable) | Free |
| Patents | US patent search (PatentsView, needs a free key) and Google Patents | Free |
| Listed makers' filings | SEC EDGAR | Free |
| Company basics (founded, head office, parent) | Wikidata | Free |
| Videos | YouTube (free key) | Free |
| Aldar experience | Our own fleet map data (`data/fleet-data.js`, `data/construction-data.js`) | Free |

Every claim on the site keeps the existing rule from `intel/research.py`: a link only appears if Claude actually opened that page.

---

## 4. How the free version runs

```
            ┌──────────── everyone with the link (or a password) ───────────┐
            │  Scout tab: instant search · matrices · scorecards · profiles │
            │  watchlists · briefs · decision packs · CSV / print-to-PDF    │
            │  (all in the browser, reading JSON files: 🟢)                 │
            └───────────────┬──────────────────────────────▲────────────────┘
          "Request a scout" │ form (free on our Netlify)   │ new JSON committed to
                            ▼                              │ the repo, so the site updates
   ┌──────────────────── your Claude plan (🟡) ───────────┴───────────────┐
   │ Scheduled Claude Code tasks (cloud):                                 │
   │   • daily: news, deals and new-provider scan, plus the briefing      │
   │   • weekly: watchlist re-check, AI columns, Vendor Sentinel          │
   │   • monthly: category trend reports and "State of" briefs            │
   │   • queue: picks up scout requests and runs Deep Dives and scoring   │
   │ On demand: you ask "scout X" or "deep dive Y" in Claude              │
   └──────────────────────────────────────────────────────────────────────┘
```

- **Scoring stays in code.** Claude scores each pillar 0–5 with evidence. The Fit Score, knock-outs, verdict and matrix positions are calculated from `scout-strategy.draft.json`, so changing a weight re-ranks everything instantly and for free.
- **Confidentiality, free with your Netlify Pro plan.** Pipeline stages, notes and team ratings are sensitive, and both the site and the GitHub repo are public today. Two free fixes:
  1. **Make the GitHub repo private.** This is free on GitHub, and Netlify keeps deploying from it.
  2. **Put the Scout on its own password-protected Netlify site.** Password protection is included in Pro. The fleet map stays open to anyone with the link, and the Scout is behind a password.

  Check that the Netlify Pro plan is not a trial that will end.
- **Fewer commits to `main`.** The daily tasks commit only data files, and only when something changed. They follow the same catch-up-and-retry routine the Market Pulse bot uses.

## 5. What you would need to do (one-off, all free)
1. Agree the weights, knock-outs and use cases in `scout-strategy.draft.json`.
2. Decide confidentiality: make the repo private, and/or a separate password-protected Scout site.
3. Let me set up the scheduled tasks under your Claude account. The cloud environment needs web access, as it had before.
4. Optional: a free PatentsView API key and a free YouTube API key.
5. Optional: if Aldar holds a CB Insights seat, connect its MCP connector to your Claude, for internal research only.

## 6. Build order (free version)

| Phase | What ships | Tag |
|---|---|---|
| **1. Scout foundation** | Scout tab (desktop and phone) · provider database and profile page · Fit Score in code · search builder with any/none/all operators and presets · ranked results · share links · first 40–60 providers scouted across our 8 categories · "Aldar experience" from the fleet map | 🟢 + 🟡 |
| **2. Decision tools** | Category leaderboards and use-case index · Fit × Maturity matrix · scorecards · charts · watchlists with pipeline stages and notes · decision packs (print to PDF) · CSV everywhere | 🟢 |
| **3. Always-on research** | Scheduled daily, weekly and monthly tasks · request queue · AI columns · Vendor Sentinel · daily briefing and suggestions · RSS alerts · hiring and patent signals · Market Pulse weekly job moved off the paid key | 🟡 |
| **4. Optional upgrades** | On-site instant AI search for colleagues (paid API) · CB Insights connector for internal research (if licensed) · group email alerts | 🔴 / 🟡 |

**Coverage:** section 2 maps 67 features. 63 of them can be built free (🟢 or 🟡), some only partly. Two of those are new robotics extras CB Insights doesn't have: the spec sheet and the trial buttons. Section 2.9 lists what is left out and why.

## Sources
- The CB Insights platform diagnostic you supplied (31 Oct 2026)
- Claude Code GitHub Action, subscription sign-in and individual-use caveat: https://github.com/anthropics/claude-code-action/issues/1281 , https://www.lowcode.agency/blog/claude-code-authentication-setup
- Netlify plans (password protection and background functions on Pro; form limits): https://netlify.com/pricing/ , https://netli.fyi/blog/netlify-pricing-and-limits
- PatentsView PatentSearch API (free key, 45 requests a minute): https://search.patentsview.org/docs/docs/Search%20API/SearchAPIReference , https://patentsview.org/data-in-action/support-legacy-api-end-february-2025-switch-patentsearch-api-now
