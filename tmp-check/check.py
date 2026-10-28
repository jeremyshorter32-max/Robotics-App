# TEMPORARY: open the deploy preview in a real browser and record what the thumbnails do.
import json, sys
from playwright.sync_api import sync_playwright
URLS = {"preview": "https://deploy-preview-8--roboticdeploymentsataldar.netlify.app/intel.html",
        "live": "https://roboticdeploymentsataldar.netlify.app/intel.html"}
out = {}
with sync_playwright() as pw:
    b = pw.chromium.launch()
    for name, url in URLS.items():
        for vp, w, h in (("desktop", 1366, 1000), ("mobile", 390, 900)):
            page = b.new_page(viewport={"width": w, "height": h})
            failed, errors, imgreq = [], [], []
            page.on("requestfailed", lambda r: failed.append((r.url[:120], r.failure)))
            page.on("response", lambda r: imgreq.append((r.url[:120], r.status)) if r.request.resource_type == "image" and "netlify" not in r.url else None)
            page.on("pageerror", lambda e: errors.append(str(e)[:200]))
            page.goto(url, wait_until="networkidle", timeout=60000)
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(2500)
            page.evaluate("window.scrollTo(0, document.querySelector('.feed').offsetTop - 70)"); page.wait_for_timeout(2500)
            stats = page.evaluate("""() => ({
              posts: document.querySelectorAll('.post').length,
              thumbs: document.querySelectorAll('.thumb').length,
              hasImg: document.querySelectorAll('.thumb.has-img').length,
              imgs: [...document.querySelectorAll('.thumb img')].map(i => ({src: i.src.slice(0,90), w: i.naturalWidth, done: i.complete})),
              dataImages: (window.INTEL_FEED && window.INTEL_FEED.editions[0].posts.filter(p => p.image).length),
            })""")
            stats.update(failed=failed[:30], errors=errors, image_responses=imgreq[:30])
            out[f"{name}-{vp}"] = stats
            page.screenshot(path=f"tmp-check/{name}-{vp}.png")
            page.close()
    b.close()
json.dump(out, open("tmp-check/result.json", "w"), indent=1)
