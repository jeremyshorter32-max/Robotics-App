// Market Scout web search (free): fetches Google News RSS for the searches the
// Scout page builds, and returns the articles as JSON. Browsers can't read Google
// News directly (it blocks cross-site requests), so this small function does it.
// Only news.google.com is ever fetched, at most 10 searches per call.

const EDITIONS = {
  US: "hl=en-US&gl=US&ceid=US:en",
  GB: "hl=en-GB&gl=GB&ceid=GB:en",
  AE: "hl=en-AE&gl=AE&ceid=AE:en",
  SG: "hl=en-SG&gl=SG&ceid=SG:en",
  IN: "hl=en-IN&gl=IN&ceid=IN:en",
  AR: "hl=ar&gl=AE&ceid=AE:ar",
  ZH: "hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
  JA: "hl=ja&gl=JP&ceid=JP:ja",
  KO: "hl=ko&gl=KR&ceid=KR:ko",
  DE: "hl=de&gl=DE&ceid=DE:de",
};
const MAX_QUERIES = 10;
const MAX_LEN = 220;

function decode(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .trim();
}
function tag(xml, name) {
  const m = new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + name + ">").exec(xml);
  return m ? decode(m[1]) : "";
}

async function search(ed, q) {
  const url = "https://news.google.com/rss/search?q=" + encodeURIComponent(q) + "&" + EDITIONS[ed];
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AldarMarketScout/1.0)" },
    signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const xml = await res.text();
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) && items.length < 60) {
    const it = m[1];
    const source = tag(it, "source");
    let title = tag(it, "title");
    if (source && title.endsWith(" - " + source)) title = title.slice(0, -(source.length + 3));
    const link = tag(it, "link");
    if (!/^https:\/\/news\.google\.com\//.test(link)) continue;
    const sm = /<source url="([^"]+)"/.exec(it);
    items.push({ title, link, source, source_url: sm ? decode(sm[1]) : "", published: tag(it, "pubDate") });
  }
  return items;
}

export default async (req) => {
  const params = new URL(req.url).searchParams;
  const asked = params.getAll("s").slice(0, MAX_QUERIES).map((s) => {
    const i = s.indexOf("|");
    const ed = i > 0 ? s.slice(0, i) : "US";
    return { ed: EDITIONS[ed] ? ed : "US", q: (i > 0 ? s.slice(i + 1) : s).slice(0, MAX_LEN).trim() };
  }).filter((x) => x.q);
  if (!asked.length) return Response.json({ error: "No search given" }, { status: 400 });

  const settled = await Promise.allSettled(asked.map((a) => search(a.ed, a.q)));
  const seen = new Set();
  const items = [];
  const searches = [];
  settled.forEach((r, i) => {
    const a = asked[i];
    if (r.status !== "fulfilled") { searches.push({ ...a, found: 0, error: String(r.reason && r.reason.message || r.reason) }); return; }
    let n = 0;
    r.value.forEach((it) => {
      const key = it.title.toLowerCase().replace(/\W+/g, " ").trim();
      if (seen.has(key)) return;
      seen.add(key);
      items.push({ ...it, search: i });
      n++;
    });
    searches.push({ ...a, found: n });
  });
  items.sort((x, y) => (Date.parse(y.published) || 0) - (Date.parse(x.published) || 0));
  return Response.json(
    { checked: new Date().toISOString(), searches, items },
    { headers: { "Cache-Control": "public, max-age=600", "Netlify-CDN-Cache-Control": "public, durable, max-age=3600" } }
  );
};

export const config = { path: "/api/scout-news" };
