# TEMPORARY: open the deploy preview in a real browser and screenshot it. Removed before merge.
import json, traceback
from playwright.sync_api import sync_playwright
URL = "https://deploy-preview-9--roboticdeploymentsataldar.netlify.app/intel.html"
out = {}
try:
  with sync_playwright() as pw:
      b = pw.chromium.launch()
      for vp, w, h in (("desktop", 1440, 1000), ("mobile", 390, 860)):
          page = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
          errors = []
          page.on("pageerror", lambda e: errors.append(str(e)[:200]))
          page.goto(URL, wait_until="load", timeout=60000)
          page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(2500)
          page.evaluate("window.scrollTo(0, 0)"); page.wait_for_timeout(800)
          page.screenshot(path=f"tmp-check/{vp}-top.png")
          page.evaluate("window.scrollTo(0, document.querySelector('.feed').offsetTop - 70)"); page.wait_for_timeout(1500)
          page.screenshot(path=f"tmp-check/{vp}-feed.png")
          page.evaluate("window.scrollBy(0, %d)" % (h - 120)); page.wait_for_timeout(1500)
          page.screenshot(path=f"tmp-check/{vp}-feed2.png")
          out[vp] = page.evaluate("""() => ({posts: document.querySelectorAll('.post').length,
              imgs: document.querySelectorAll('.thumb img').length,
              loaded: [...document.querySelectorAll('.thumb img')].filter(i => i.naturalWidth > 0).length,
              overflow: document.documentElement.scrollWidth - innerWidth})""")
          out[vp]["errors"] = errors
          page.close()
      b.close()
except Exception:
    out["trace"] = traceback.format_exc()[-1500:]
json.dump(out, open("tmp-check/result.json", "w"), indent=1)
