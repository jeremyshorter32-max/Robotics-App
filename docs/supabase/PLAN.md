# Supabase for shared editing: research and plan

**Status:** research only. Nothing is built and the website is unchanged.
**Saved:** 16 Nov 2026, on branch `plan/supabase`.
**To start:** say *"start the Supabase build"* after the decisions in section 9.

---

## 1. The problem today

Every change to the site is a change to files in the GitHub repo. A deployment status, a new site, a video, a Scout provider or a contact detail all work this way:

| What | Where it lives now | Who changes it |
|---|---|---|
| Residential & Commercial deployments (55), sites (45), districts (8) | `data/fleet-data.js` | Claude, by committing to git |
| Construction trials (9), sites (8) | `data/construction-data.js` | Claude, by committing to git |
| Videos (22 clips, about 20 MB) | `assets/video/` | Claude, by committing to git |
| Scout providers (61) with contacts | `intel/scout/providers.json` → `data/scout-providers.js` | Claude, by committing to git |
| Scout weights and search terms | `data/scout-strategy.js` | Claude, by committing to git |
| Saved scouts, research list | Each person's own browser | Nobody else can see them |
| Market Pulse editions | `data/intel-feed.json` | The weekly bot, by committing to git |
| MCP endpoint for AI agents (`/mcp`, added 16 Nov) | Reads the published data files | — |

This causes five problems:
- **One way in.** Nobody can update the site without going through a Claude session and git.
- **Changes collide.** The Market Pulse bot, Scout work and the new MCP endpoint (built by another Claude session) all commit to `main`. Each release has to catch up with the others first.
- **No logins or roles.** There is no record of *who* changed a deployment, and no way to let the construction team edit only construction trials.
- **Everything is public.** Owner names, internal update notes and vendor contacts sit in public files on a public site and a public GitHub repo.
- **Team work stays private.** Saved scouts and the research list stay in each person's browser.

## 2. What Supabase adds

Supabase is a hosted Postgres database with built-in sign-in, permissions and file storage.

- **A shared database** instead of data files. Several people can edit at once, and every change is saved immediately.
- **Sign-in.** People can log in with an email link, or with their Microsoft (Aldar / Entra ID) account. Microsoft login works on every plan; SAML single sign-on needs the Pro plan.
- **Row Level Security (RLS).** Rules inside the database decide who can read or change each row. For example: anyone can read published deployments; only the construction team can edit construction trials; only signed-in staff can see owner names, notes and contacts.
- **An audit trail.** A change log records who changed what, when, and what it was before.
- **File storage** for videos and images, with the same permission rules.
- **An official Claude connector** (Supabase MCP, Feb 2026). Claude sessions, including the ones that build this site, can work with the database directly. Supabase advises pointing it at a development project rather than live data.

## 3. What would move into Supabase

| Table | From | Edited by |
|---|---|---|
| `deployments` | Both fleet data files (the R&C and Construction layers become one column) | Layer editors |
| `sites`, `districts` (outlines stored as GeoJSON) | Fleet data files | Admins |
| `media` (Storage bucket + table) | `assets/video/` | Layer editors |
| `providers`, `provider_contacts` | `intel/scout/providers.json` | Scout editors |
| `scout_settings` (weights, search terms) | `data/scout-strategy.js` | Admins |
| `saved_scouts`, `research_requests` | Browser only today | Any signed-in user. **Shared across the team.** |
| `change_log` | New | Written automatically by database triggers |
| `profiles` (name, role, layers) | New | Admins |

Market Pulse can stay as it is (the bot and git) at first, and move later.

## 4. How it would work

```
 Editors (sign in)                       Everyone with the link (no sign-in)
 admin.html: forms for deployments,      Fleet map · Pulse · Scout · /mcp
 sites, videos, providers, approvals            ▲
        │ write (RLS checks the role)          │ read published data
        ▼                                       │
 ┌──────────────── Supabase (Postgres) ────────┴──────────┐
 │ deployments · sites · media · providers · saved_scouts │
 │ research_requests · change_log (who, when, before/after)│
 └───────────────┬────────────────────────────────────────┘
                 │ on change (database webhook) + nightly
                 ▼
 Snapshot export → data/*.js in the repo → Netlify redeploys
 (fast static site, works even if Supabase is down, keeps /mcp working,
  and git history doubles as a backup)
```

- **Phase 1: the site keeps reading snapshot files.** Supabase becomes where people edit. A small job exports the published rows to the same `data/*.js` files the site uses now, so the fleet map, Pulse, Scout and `/mcp` keep working unchanged. This is the safest first step.
- **Later: live reads.** The pages read from Supabase directly, falling back to the snapshot, so updates appear instantly without a redeploy.
- **Drafts and approval (optional).** A deployment change can go *draft → review → published*, and only published rows reach the public map.
- **Keys.** The public "anon" key in the page is safe because RLS controls access. The powerful "service role" key lives only in Netlify and GitHub secrets, never in the repo.

## 5. Roles

| Role | Can do |
|---|---|
| Public (no sign-in) | See the published fleet map, Pulse and Scout, without internal notes, owners or contacts |
| Viewer (Aldar staff) | Also see owners, update notes, contacts and the team's saved scouts |
| Layer editor (R&C operations, Construction, Scout) | Add and edit records in their own area, and upload videos |
| Admin | Everything, including sites, districts, Scout weights and user roles |

## 6. Cost

| Plan | Price | Fit for us |
|---|---|---|
| Free | $0 | Enough room for our data (a few MB against a 500 MB limit), but **projects pause after a week without use** and there are no backups. Fine for a trial, not for the live site. |
| **Pro (recommended)** | **$25 a month base** (usage billed on top, which our size won't reach) | No pausing, daily backups, 8 GB database, Microsoft or SAML sign-in |
| Team | $599 a month | SOC 2 reports and priority support. Only needed if Aldar IT requires them |

Pricing comes from third-party 2026 guides; check supabase.com/pricing before buying. Netlify (Pro) and GitHub stay as they are.

## 7. Points for Aldar IT and InfoSec

- **Where the data is hosted.** I could not confirm that Supabase offers a UAE region. Each project lives in one region chosen at creation, and the data stays there. Ask IT whether this data (deployment tracker, vendor contacts and internal notes, with no personal customer data) may be hosted outside the UAE, for example in Europe or Mumbai. If it must stay in the UAE, the options are self-hosting Supabase on a UAE cloud (for example Azure UAE North) or a partner that runs Supabase on UAE servers. Both take more effort.
- **Sign-in with Aldar accounts** needs an Entra ID (Azure AD) app registration from IT.
- **Who owns the Supabase account.** Ideally Aldar, not a personal account, with at least two admins.

## 8. Alternatives considered

| Option | For | Against |
|---|---|---|
| **Supabase (recommended)** | Real logins, roles, audit trail and shared Scout data. Standard Postgres, easy to export. Claude connector | New service to run; hosting-region question |
| Git-based editor (Decap CMS) | Keeps everything in git, free | Every editor needs a GitHub account; still one file at a time; no private fields; no shared Scout data |
| Google Sheets or Airtable as the source | Very easy for non-technical editors | Weak permissions and audit; a sheet goes out of shape easily; hard to keep some fields private |

## 9. Decisions needed before building

1. **Hosting region.** IT's view on non-UAE hosting (section 7).
2. **Plan.** Pro at $25 a month (recommended), or Free for a trial only.
3. **Account owner.** Who creates the Supabase organisation and project (ideally an Aldar-owned account).
4. **Sign-in method.** Microsoft (Entra ID) via IT, or email sign-in links restricted to @aldar.com to start.
5. **Editors.** Who edits which area (R&C operations, Construction, Scout), and who the admins are.
6. **Approval.** Do deployment changes need approval before they appear on the public map?
7. **Private fields.** Confirm that owner names, update notes and contacts become visible to signed-in staff only.
8. **How I get access.** Connect the official Supabase connector to Claude, or give this session the project URL. Keys would go through a secure form, never the chat. This cloud environment will also need permission to reach the project's `*.supabase.co` address.

## 10. Build phases

| Phase | Delivers |
|---|---|
| **0. Set-up** | Section 9 decided; Supabase project; keys in Netlify and GitHub secrets |
| **1. Database and snapshot** | Tables, RLS rules and change log. Import all current data and videos. Snapshot export to `data/*.js`. The site looks and works exactly the same |
| **2. Editor page** | `admin.html` with sign-in and roles: add and edit deployments, sites and videos; drafts and approval; change history per record |
| **3. Shared Scout** | Team-wide saved scouts and research list; a provider and contact editor; Scout weights for admins |
| **4. Live and connected** | Pages read live (instant updates); `/mcp` reads Supabase; optionally Market Pulse moves into the database |

Each phase follows the usual routine: build on a branch, test at desktop and phone sizes, save a rollback point, then go live on "make it live".

## Sources
- Supabase pricing guides: https://makerkit.dev/blog/saas/supabase-pricing , https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/ , https://toolradar.com/tools/supabase/pricing
- Supabase data residency and region per project: https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq , https://supabase.com/docs/guides/security/gdpr-compliance
- UAE-hosted Supabase (partner): https://wz-it.com/en/managed-open-source/uae/supabase/
- Supabase Microsoft (Azure / Entra ID) sign-in: https://supabase.com/docs/guides/auth/social-login/auth-azure
- Supabase SAML single sign-on: https://supabase.com/docs/guides/auth/sso/auth-sso-saml
- Supabase official Claude connector and MCP: https://supabase.com/blog/supabase-is-now-an-official-claude-connector , https://supabase.com/docs/guides/ai-tools/mcp
