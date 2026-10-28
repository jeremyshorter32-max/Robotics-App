# TEMPORARY diagnostic for Google News link decoding; removed before merge.
import json, sys, re, urllib.parse
sys.path.insert(0, "intel")
import market_intel as mi
feed = json.load(open("data/intel-feed.json"))
urls = [p["url"] for p in feed["editions"][0]["posts"] if "news.google.com" in p["url"]][:4]
out = []
for u in urls:
    gid = mi.google_article_id(u); r = {"url": u[:120]}
    for key, page_url in (("articles", f"https://news.google.com/articles/{gid}"), ("rss", f"https://news.google.com/rss/articles/{gid}")):
        try:
            req = mi.urllib.request.Request(page_url, headers={"User-Agent": mi.BROWSER_UA, "Accept-Language": "en-US,en;q=0.9"})
            with mi.urllib.request.urlopen(req, timeout=15) as resp:
                body = resp.read().decode("utf-8", "ignore"); r[key] = {"sg_pos": body.find("data-n-a-sg"), "status": resp.status, "final": resp.geturl()[:120], "len": len(body),
                    "sg": bool(re.search(r'data-n-a-sg="', body)), "ts": bool(re.search(r'data-n-a-ts="', body)), "attrs": re.findall(r'data-n-a-[a-z]+="[^"]{0,40}', body)[:6]}
        except Exception as exc:
            r[key] = {"error": repr(exc)[:300]}
    orig = mi.http_get
    def spy(url, **kw):
        res = orig(url, **kw)
        if "batchexecute" in url:
            r["batch"] = None if res is None else res[1][:600].decode("utf-8", "ignore")
        return res
    mi.http_get = spy
    try:
        r["resolved"] = mi.resolve_google_news(u)
    except Exception as exc:
        r["resolved_error"] = repr(exc)[:300]
    mi.http_get = orig
    out.append(r)
json.dump(out, open("data/intel-debug.json", "w"), indent=1)
