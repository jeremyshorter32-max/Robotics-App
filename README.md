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

## Deploy on Netlify
1. In Netlify: **Add new site → Import an existing project → GitHub**.
2. Pick `jeremyshorter32-max/Robotics-App`, branch `main`.
3. Leave the build command empty and the publish directory as `.`, then deploy.

Every push to `main` redeploys automatically.

## Run locally
`python3 -m http.server` in this folder, then open http://localhost:8000.
