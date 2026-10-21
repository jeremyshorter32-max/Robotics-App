# Robotics-App

Aldar Robotics Deployments: a mobile-first map and dashboard of robotic deployments across Abu Dhabi (Saadiyat, Yas, Al Maryah, Khalifa City and more).

## Files
- `index.html`: the whole app in one self-contained file (React and Leaflet, with assets bundled in).
- `netlify.toml`: Netlify settings. No build step; Netlify serves the repo root.

## Deploy on Netlify
1. In Netlify, choose **Add new site → Import an existing project → GitHub**.
2. Pick `jeremyshorter32-max/Robotics-App`, branch `main`.
3. Leave the build command empty and the publish directory as `.`, then deploy.

Each push to `main` redeploys the site automatically.

## Run locally
Open `index.html` in a browser, or run `npx serve .`.
