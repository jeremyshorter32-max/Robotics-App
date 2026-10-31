/* Market Scout: "Scout the web" (free).
   Builds Google News searches from what the user typed, using the terms in
   SCOUT_STRATEGY.web_scout, fetches them through /api/scout-news (a small Netlify
   function), then pulls out the companies the headlines mention. Also offers
   ready-made Google searches in six languages, and a "to research" list that is
   kept in this browser. */
(function () {
  "use strict";
  var STRAT = window.SCOUT_STRATEGY || {};
  var WS = STRAT.web_scout || { terms: [] };
  var DATA = window.SCOUT_DATA || { providers: [] };
  var API = "/api/scout-news";

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem("scout." + k)); localStorage.setItem("scout." + k, JSON.stringify(v)); } catch (e) { return null; } }

  /* ---------- turn a typed need into searches ---------- */
  var FILLER = new RegExp("\\b(" + (WS.filler || "solutions?") + ")\\b", "gi");
  var GCC_RE = new RegExp("\\b(" + (WS.gcc_words || "UAE|Dubai|Saudi") + ")\\b", "i");
  function plan(text) {
    var raw = String(text || "").trim();
    var core = raw.replace(FILLER, " ").replace(/[^\p{L}\p{N}\s.&+-]/gu, " ").replace(/\s+/g, " ").trim() || raw;
    var term = null;
    (WS.terms || []).some(function (t) { if (new RegExp(t.match, "i").test(raw)) { term = t; return true; } return false; });
    var coreR = /robot|drone|autonom|humanoid|uav/i.test(core) ? core : core + " robot";
    var W = " when:2y";
    var s = [];
    s.push(["US", coreR + (term ? " " + term.ctx : "") + W]);
    if (term) s.push(["US", '"' + term.en[0] + '"' + W]);
    s.push(["US", coreR + " startup OR company OR maker OR manufacturer" + W]);
    s.push(["US", coreR + " raises OR funding OR investment OR Series" + W]);
    s.push(["US", coreR + " launches OR unveils OR introduces OR debuts" + W]);
    s.push(["US", coreR + " deploys OR pilot OR trial OR contract OR order" + W]);
    s.push(["AE", coreR + W]);
    s.push(["US", coreR + ' UAE OR Dubai OR "Abu Dhabi" OR Saudi OR Qatar' + W]);
    if (term && term.zh) s.push(["ZH", term.zh + W]);
    s.push(["GB", (term && term.en[1] ? term.en[1] : coreR) + W]);
    return { raw: raw, core: core, coreR: coreR, term: term, searches: s.slice(0, 10) };
  }

  /* ---------- Google links (open in a new tab) ---------- */
  function g(q, hl) { return "https://www.google.com/search?q=" + encodeURIComponent(q) + (hl ? "&hl=" + hl : ""); }
  function digLinks(P) {
    var c = P.coreR, t = P.term;
    var L = [
      ["Providers", g(c + " companies manufacturers")],
      ["In the Gulf", g(c + ' UAE OR Dubai OR "Abu Dhabi" OR Saudi')],
      ["Trade shows", g(c + ' exhibitor "Big 5" OR GITEX OR Bauma OR CONEXPO')],
      ["Funding", g(c + " startup raises funding")],
      ["Company pages", g("site:linkedin.com/company " + c)],
      ["Case studies", g(c + ' "case study" OR deployment OR customer')],
      ["Videos", "https://www.youtube.com/results?search_query=" + encodeURIComponent(c)],
      ["Patents", "https://patents.google.com/?q=" + encodeURIComponent('"' + (t ? t.en[0] : c) + '"') + "&after=priority:20220101"]
    ];
    var langs = [["zh", "Chinese", "zh-CN"], ["ja", "Japanese", "ja"], ["ko", "Korean", "ko"], ["de", "German", "de"], ["ar", "Arabic", "ar"]];
    langs.forEach(function (l) { if (t && t[l[0]]) L.push([l[1], g(t[l[0]], l[2])]); });
    return L;
  }

  /* ---------- companies mentioned in headlines ---------- */
  var VERBS = "launch(?:es|ed)?|unveil(?:s|ed)?|introduc(?:es|ed)|debut(?:s|ed)?|rais(?:es|ed)|secur(?:es|ed)|clos(?:es|ed)|land(?:s|ed)|bag(?:s|ged)|deploy(?:s|ed)?|roll(?:s|ed)? out|partner(?:s|ed)?|team(?:s|ed)? up|sign(?:s|ed)?|win(?:s)?|won|expand(?:s|ed)?|open(?:s|ed)|showcas(?:es|ed)|reveal(?:s|ed)|announc(?:es|ed)|releas(?:es|ed)|acquir(?:es|ed)|bring(?:s)?|test(?:s|ed)|trial(?:s|led)?|pilot(?:s|ed)?|develop(?:s|ed)|build(?:s)?|built|complet(?:es|ed)|receiv(?:es|ed)|get(?:s)?|select(?:s|ed)|adopt(?:s|ed)|demo(?:s|ed)?|demonstrat(?:es|ed)|introduc(?:es|ed)|enter(?:s|ed)|target(?:s|ed)|lead(?:s)?|eyes|aims|plans|wants|joins|hires|names|appoints|offers|delivers|ships|starts|begins|bets|invests|takes|teams|tops|hits|reaches|gets|becomes|is|has";
  // split only at top-level "|" so groups like launch(?:es|ed)? stay whole
  function topAlts(src) { var out = [], depth = 0, cur = ""; for (var i = 0; i < src.length; i++) { var c = src[i]; if (c === "(") depth++; if (c === ")") depth--; if (c === "|" && !depth) { out.push(cur); cur = ""; } else cur += c; } out.push(cur); return out; }
  var VERBS_ALL = topAlts(VERBS).map(function (v) { return v + "|" + v.charAt(0).toUpperCase() + v.slice(1); }).join("|");
  var TOK = "[\\p{Lu}\\p{N}][\\p{L}\\p{N}&.'’+-]*";
  var SUBJ = new RegExp("^(" + TOK + "(?:\\s+(?:and|&|de|of|the)?\\s*" + TOK + "){0,5}(?:\\s*\\([A-Z]{2,6}\\))?(?:\\s*,\\s*" + TOK + "(?:\\s+" + TOK + "){0,3})*(?:\\s+(?:and|&)\\s+" + TOK + "(?:\\s+" + TOK + "){0,3})?)\\s+(?:(?:to|To|will|Will|set to|Set To|has|Has|have)\\s+)?(?:" + VERBS_ALL + ")\\b", "u");
  var VERB_TAIL = new RegExp("\\s+(?:(?:to|To|will|Will|set to|Set To|has|Has|have)\\s+)?(?:" + VERBS_ALL + ")\\b.*$", "u");
  var NOUN = /\b(?:startup|start-up|company|maker|firm|developer|manufacturer|specialist|unicorn|provider|supplier|subsidiary|spinout|spin-off|partner|Startup|Company|Maker|Firm|Developer|Manufacturer)\s+(\p{Lu}[\p{L}\p{N}&.'’+-]*(?:\s+\p{Lu}[\p{L}\p{N}&.'’+-]*){0,3})/gu;
  var POSS = /\b(\p{Lu}[\p{L}\p{N}&.+-]*(?:\s+\p{Lu}[\p{L}\p{N}&.+-]*){0,3})['’]s\s+(?:new\s+|latest\s+|first\s+|AI\s+|autonomous\s+)*(?:robot|robots|robotic|drone|humanoid|machine|system|platform|bot|Robot|Robots)\b/gu;
  var BRAND = /\b(\p{Lu}[\p{L}\p{N}&+-]*(?:\s+\p{Lu}[\p{L}\p{N}&+-]*){0,1}\s+(?:Robotics|Technologies|Automation|Labs|Industries|Dynamics|Bots|Machines|Innovations|Robot Technology))\b/gu;
  var GENERIC = /^(?:robots?|robotics?|robotic|cleaning|security|patrol|smart|autonomous|window|printed|printing|powered|ai|two|three|four|five|groundbreaking|intelligent|advanced?|integrating|construction|design|friendly|single-wheel|one-wheeled|spherical|monowheel|restroom|dancing|deploy|use|thanks|to|physical|mission-ready|rapid|border|infrastructure|multi-storey|house|houses|homes?|bridge|low-carbon|port|enhance|makes?|history|with|rides|layer|while|commerce|seeking|humanoids?|ground|mission|master|guards?|super|cobots?|new|first|world's|largest|mobile|industrial|commercial|service|delivery|inspection|drone|drones|facade|façade|painting|spray|spraying|wall|floor|automated|automation|machine|machines|technology|technologies|solutions?|systems?|platform|fleet|units?|unit|model|series|version|edition|launch|multifunctional|engineering|finishing|drywall|concrete|3d|printer|printers?|world|global|future|next-gen|next|generation|of|for|the|and|in|on|at|by)$/i;
  var PLACE_TAIL = /\s(?:County|City|Police|Pradesh|Province|State|Ministry|Municipality|Council|Authority|University|College|School|Hospital|Airport|Government|Department|Region|District)$/;
  var STOP = new RegExp("^(?:" + [
    "The", "A", "An", "This", "That", "These", "How", "Why", "What", "When", "Where", "Who", "Watch", "Video", "Photos?", "Opinion", "Exclusive", "Update", "Breaking", "Report", "Study", "Analysis",
    "New", "Robots?", "Robotics?", "Robotic", "AI", "Humanoids?", "Drones?", "Startups?", "Companies", "Company", "Firms?", "Makers?", "Market", "Industry", "World", "Global", "Top", "Best", "First", "Next", "More", "Most",
    "China", "Chinese", "US", "U\\.S\\.", "USA", "America", "American", "UK", "Britain", "British", "Europe", "European", "EU", "Japan", "Japanese", "Korea", "Korean", "South Korea", "India", "Indian", "Germany", "German", "France", "French",
    "Singapore", "Australia", "Canada", "UAE", "Dubai", "Abu Dhabi", "Saudi", "Saudi Arabia", "Qatar", "Gulf", "GCC", "Middle East", "Israel", "Israeli", "Russia", "Russian", "Taiwan", "Hong Kong", "Beijing", "Shanghai", "Shenzhen",
    "Government", "Ministry", "City", "Council", "Police", "Army", "Navy", "Military", "Construction", "Builders?", "Contractors?", "Developers?", "Researchers?", "Scientists?", "Engineers?", "Workers?", "Students?", "University", "Schools?",
    "Abu", "LA", "Czech", "Angola", "Guadalajara", "Andhra", "Is", "Are", "Was", "Were", "Has", "Have", "Can", "Will", "Its", "His", "Her", "Their", "Sending", "Using", "Meet", "Inside", "From", "With", "After", "Before", "Behind", "North", "South", "East", "West", "Central", "Northern", "Southern", "Eastern", "Western", "KSA", "Business", "Booth",
    "Hangzhou", "Taipei", "Dublin", "Salem", "London", "Paris", "Berlin", "Tokyo", "Seoul", "Mumbai", "Chennai", "Bengaluru", "Riyadh", "Doha", "NEOM", "Venezuela", "Brazil", "Mexico", "Spain", "Italy", "Sweden", "Norway", "Finland", "Denmark", "Netherlands", "Switzerland", "Austria", "Poland", "Turkey", "Egypt", "Africa", "Asia", "Montgomery", "Montgomery Co", "Montgomery County", "County", "Co", "State", "Federal", "National", "FIFA", "FIFA World Cup", "World Cup", "Olympics", "Amazon", "Google", "Apple", "Meta", "Microsoft", "Nvidia", "Tesla", "OpenAI", "Dog", "Star", "Raise", "Spring", "Mind", "Extend", "Logic", "Architect", "Prison Service", "Army", "Starbucks", "Walmart", "Village", "Airways",
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "CES", "Here", "There", "It", "We", "You", "They", "He", "She", "Our", "Your", "Its"
  ].join("|") + ")$", "i");
  var LEAD = /^(?:(?:Video|Watch|Photos?|Exclusive|Breaking|Opinion|Update)[.:]\s*|(?:[A-Z][\w-]*['’]s\s+)|(?:[\w-]+-based\s+)|(?:(?:Tech|Robotics?|Construction|Chinese|US|UK|Japanese|Korean|German|Indian|Israeli|Swiss|Dutch|French|Emirati|Saudi|Singaporean)\s+(?:giant|firm|startup|start-up|company|maker|major|leader)\s+))+/i;
  var TAIL = /\s+(?:CEO|CTO|COO|Founder|Co-founder|Chief|Boss|Chairman|President|Executive|Summer|Winter|Black|Prime|Sale|Deal|Deals)\b.*$/;
  function clean(n) {
    n = String(n).replace(/[“”"]/g, "").trim();
    n = n.replace(LEAD, "");
    var poss = /^(.+?)['’]s\b/.exec(n);
    if (poss) n = poss[1];
    n = n.replace(TAIL, "").replace(/[.,:;]+$/, "").replace(/^(?:The|A|An)\s+/, "").trim();
    if (n.length < 3 || n.length > 48) return null;
    var words = n.split(/\s+/);
    while (words.length && /^(?:The|A|An|New|Watch|Video|How|Why|First|Next|More|Top)$/i.test(words[0])) words.shift();
    if (!words.length || STOP.test(words[0]) || words.some(function (w) { return /^(?:Is|Are|Was|Has|Sending|Using)$/.test(w); })) return null;
    n = words.join(" ");
    if (!n || STOP.test(n) || /^\d/.test(n) || n.length < 3 || PLACE_TAIL.test(" " + n)) return null;
    var ws = n.split(/\s+/), generic = ws.filter(function (w) { return GENERIC.test(w); }).length;
    if (generic * 2 > ws.length || generic === ws.length) return null;
    if (/^(?:[A-Z]{2,}\s?)+$/.test(n) && n.length <= 3) return null;
    return n;
  }
  function namesIn(title) {
    var out = [];
    var t = title.replace(/,?\s+(?:Inc|Ltd|LLC|Corp|Co|PLC|Pte|GmbH|AG|SA)\.?(?=[\s,])/g, "").replace(/^[A-Z ]{3,}\s*[|:]\s*/, "");
    var m = SUBJ.exec(t);
    if (m) {
      var subj = m[0].replace(VERB_TAIL, "").replace(/\s*\([A-Z]{2,6}\)/, "");
      subj.split(/\s*,\s*|\s+(?:and|&)\s+/).forEach(function (x) { var c = clean(x); if (c) out.push(c); });
    }
    [NOUN, POSS, BRAND].forEach(function (re) {
      var r; re.lastIndex = 0;
      while ((r = re.exec(t))) { var c = clean(r[1]); if (c) out.push(c); }
    });
    return out;
  }
  var KNOWN = DATA.providers.map(function (p) {
    var names = [p.name.replace(/\s*\(.*\)\s*$/, "")].concat(p.aliases || []).filter(function (n) { return n && n.length > 2; });
    return { p: p, re: new RegExp("\\b(" + names.map(function (n) { return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")\\b", "i") };
  });
  function known(name) {
    for (var i = 0; i < KNOWN.length; i++) if (KNOWN[i].re.test(name)) return KNOWN[i].p;
    return null;
  }
  var NONLATIN = /[؀-ۿ぀-ヿ㐀-鿿가-힯]/;
  var NOISE = /\b(?:deals?|sale|discount|\d+% off|prime day|black friday|cyber monday|reviews?|hands-on|buying guide|coupon|best .{0,40}(?:to buy|of 20\d\d|for 20\d\d)|vs\.?|market (?:size|share|report|worth|growth|forecast|outlook|analysis|to reach)|cagr|horoscope|gundam|super robot wars|action figure|collectible|lego|anime|cosplay)\b/i;
  var MACHINE = /robot|drone|autonom|automat|uav|3d.?print|humanoid|unmanned|self-driving|cobot/i;
  function topicTest(P) {
    var words = P.core.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 3 && !/robot|autonom/.test(w); })
      .map(function (w) { return w.replace(/(ing|ed|s)$/, ""); });
    var tre = P.term ? new RegExp(P.term.match, "i") : null;
    var avoid = P.term && P.term.avoid ? new RegExp("\\b(?:" + P.term.avoid + ")\\b", "i") : null;
    return function (title) {
      if (NOISE.test(title) || (avoid && avoid.test(title))) return false;
      var low = title.toLowerCase();
      var onTopic = (tre && tre.test(title)) || words.some(function (w) { return w.length > 2 && low.indexOf(w) >= 0; });
      return onTopic && MACHINE.test(title);
    };
  }
  function analyse(items, P) {
    var relevant = topicTest(P);
    var latin = [], other = [], cos = {}, inScout = {};
    items.forEach(function (it, i) {
      it._i = i;
      if (NONLATIN.test(it.title)) { other.push(it); return; }
      latin.push(it);
      it._rel = relevant(it.title);
      if (!it._rel) return;
      KNOWN.forEach(function (k) { if (k.re.test(it.title)) { (inScout[k.p.id] = inScout[k.p.id] || { p: k.p, items: [] }).items.push(it); } });
      uniqArr(namesIn(it.title)).forEach(function (n) {
        var kp = known(n);
        if (kp) return;
        var key = n.toLowerCase();
        var c = cos[key] = cos[key] || { name: n, items: [], gcc: false, latest: 0 };
        c.items.push(it);
        if (GCC_RE.test(it.title)) c.gcc = true;
        c.latest = Math.max(c.latest, Date.parse(it.published) || 0);
      });
    });
    // merge "Ecovacs" with "Ecovacs Winbot W2S" and the like: keep the shorter name
    var keys = Object.keys(cos).sort(function (a, b) { return a.length - b.length; });
    keys.forEach(function (k) {
      if (!cos[k]) return;
      keys.forEach(function (k2) {
        if (k2 !== k && cos[k2] && k2.indexOf(k + " ") === 0) {
          cos[k2].items.forEach(function (it) { if (cos[k].items.indexOf(it) < 0) cos[k].items.push(it); });
          cos[k].gcc = cos[k].gcc || cos[k2].gcc; cos[k].latest = Math.max(cos[k].latest, cos[k2].latest);
          delete cos[k2];
        }
      });
    });
    var list = Object.keys(cos).map(function (k) { return cos[k]; });
    list.sort(function (a, b) { return b.items.length - a.items.length || (b.gcc - a.gcc) || b.latest - a.latest; });
    var known_ = Object.keys(inScout).map(function (k) { return inScout[k]; }).sort(function (a, b) { return b.items.length - a.items.length; });
    return { latin: latin, other: other, companies: list, inScout: known_ };
  }
  function uniqArr(a) { var s = {}; return a.filter(function (x) { var k = x.toLowerCase(); if (s[k]) return false; s[k] = 1; return true; }); }

  /* ---------- to-research list (this browser) ---------- */
  function todo() { return store("todo") || []; }
  function setTodo(t) { store("todo", t); renderTodo(); }
  function inTodo(name) { return todo().some(function (x) { return x.name.toLowerCase() === name.toLowerCase(); }); }
  function toggleTodo(name, q, link) {
    var t = todo();
    var i = t.findIndex(function (x) { return x.name.toLowerCase() === name.toLowerCase(); });
    if (i >= 0) t.splice(i, 1); else t.push({ name: name, need: q, link: link || "", added: new Date().toISOString().slice(0, 10) });
    setTodo(t);
  }
  function renderTodo() {
    var t = todo();
    var box = $("wsTodo");
    if (!box) return;
    box.hidden = !t.length;
    $("wsTodoN").textContent = t.length;
    $("wsTodoList").innerHTML = t.map(function (x) {
      return "<li><b>" + esc(x.name) + "</b><small>" + esc(x.need ? "for “" + x.need + "”" : "") + "</small>" +
        '<button type="button" class="x sm2" data-todo-rm="' + esc(x.name) + '" aria-label="Remove ' + esc(x.name) + '">×</button></li>';
    }).join("");
    Array.prototype.forEach.call(document.querySelectorAll("[data-todo]"), function (b) {
      var on = inTodo(b.getAttribute("data-todo"));
      b.setAttribute("aria-pressed", on);
      b.textContent = on ? "✓ To research" : "+ To research";
    });
  }
  function todoText() {
    var t = todo();
    return "Please research these providers and add them to Market Scout:\n\n" + t.map(function (x, i) {
      return (i + 1) + ". " + x.name + (x.need ? " (found searching for: " + x.need + ")" : "") + (x.link ? "\n   " + x.link : "");
    }).join("\n") + "\n";
  }

  /* ---------- render ---------- */
  var last = null;
  function fmtDate(d) { var t = Date.parse(d); return t ? new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""; }
  function art(it) {
    return '<li><a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(it.title) + "</a><small>" + esc(it.source || "") + (it.published ? " · " + esc(fmtDate(it.published)) : "") + "</small></li>";
  }
  function renderPanel() {
    var q = ($("q").value || "").trim();
    var panel = $("ws");
    var view = new URLSearchParams(location.search).get("view") || "providers";
    panel.hidden = q.length < 3 || view !== "providers";
    if (panel.hidden) return;
    var P = plan(q);
    $("wsQ").textContent = q;
    $("wsTerm").textContent = P.term ? "Searching as: " + P.term.en[0] + " · " + (STRAT.web_scout && P.term.cat ? ((window.SCOUT_DATA.meta.categories || []).filter(function (c) { return c.id === P.term.cat; })[0] || {}).label || "" : "") : "";
    $("wsDig").innerHTML = digLinks(P).map(function (l) {
      return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + "</a>";
    }).join("");
    if (last && last.q !== q) { $("wsOut").innerHTML = ""; last = null; }
  }
  function run() {
    var q = ($("q").value || "").trim();
    if (q.length < 3) return;
    var P = plan(q);
    var btn = $("wsGo");
    btn.disabled = true;
    btn.textContent = "Searching Google News…";
    $("wsOut").innerHTML = '<div class="ws-wait">Running ' + P.searches.length + " Google News searches for “" + esc(q) + "”…</div>";
    var url = API + "?" + P.searches.map(function (s) { return "s=" + encodeURIComponent(s[0] + "|" + s[1]); }).join("&");
    var t0 = Date.now();
    fetch(url).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }).then(function (j) {
      var A = analyse(j.items || [], P);
      last = { q: q, j: j, A: A, ms: Date.now() - t0 };
      draw();
    }).catch(function (e) {
      $("wsOut").innerHTML = '<div class="ws-wait err">The live search did not work (' + esc(e.message) + "). Try again in a minute, or use the Google searches above.</div>";
    }).then(function () { btn.disabled = false; btn.textContent = "Search again"; });
  }
  function draw() {
    if (!last) return;
    var A = last.A, j = last.j, q = last.q;
    var failed = (j.searches || []).filter(function (s) { return s.error; }).length;
    var html = '<p class="ws-sum"><b>' + (j.items || []).length + " articles</b> from " + (j.searches || []).length + " Google News searches over the last two years" +
      (failed ? " (" + failed + " searches did not answer)" : "") + ". Companies are picked out of headlines automatically, so check each one before adding it.</p>";
    if (A.inScout.length) {
      html += '<h4>Already in Scout <small>' + A.inScout.length + "</small></h4><div class=\"ws-known\">" + A.inScout.map(function (k) {
        return '<button type="button" class="chip sm" data-open="' + esc(k.p.id) + '">' + esc(k.p.name.replace(/\s*\(.*\)\s*$/, "")) + ' <span class="n">' + k.items.length + "</span></button>";
      }).join("") + "</div>";
    }
    var cos = A.companies.slice(0, 40);
    html += "<h4>New companies spotted <small>" + A.companies.length + "</small></h4>";
    html += cos.length ? '<ul class="ws-cos">' + cos.map(function (c) {
      var first = c.items[0];
      return "<li><div class=\"ws-cn\"><b>" + esc(c.name) + "</b>" + (c.gcc ? '<span class="flag f-uae">Gulf mention</span>' : "") +
        "<small>" + c.items.length + " article" + (c.items.length > 1 ? "s" : "") + (c.latest ? " · latest " + esc(fmtDate(new Date(c.latest).toISOString())) : "") + "</small>" +
        '<a class="ws-ev" href="' + esc(first.link) + '" target="_blank" rel="noopener">' + esc(first.title) + "</a></div>" +
        '<div class="ws-act"><a class="abtn" href="' + esc(g('"' + c.name + '" ' + last.q)) + '" target="_blank" rel="noopener">Google</a>' +
        '<button type="button" class="abtn" data-todo="' + esc(c.name) + '" data-todo-link="' + esc(first.link) + '">+ To research</button></div></li>';
    }).join("") + "</ul>" : '<p class="muted">No company names stood out in the headlines. Try the articles below, or a different phrasing.</p>';
    var rel = A.latin.filter(function (it) { return it._rel; });
    var arts = rel.concat(A.latin.filter(function (it) { return !it._rel; })).slice(0, 25);
    html += '<details class="ws-arts"' + (cos.length ? "" : " open") + "><summary>Articles <small>" + rel.length + " on topic, " + A.latin.length + " in all</small></summary><ul class=\"ws-list\">" + arts.map(art).join("") + "</ul>" +
      (A.latin.length > 25 ? '<p class="muted">Showing the 25 most recent.</p>' : "") + "</details>";
    if (A.other.length) html += '<details class="ws-arts"><summary>Other-language news <small>' + A.other.length + "</small></summary><ul class=\"ws-list\">" + A.other.slice(0, 25).map(art).join("") + "</ul></details>";
    $("wsOut").innerHTML = html;
    renderTodo();
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    if (t.id === "wsGo") { run(); return; }
    if (t.hasAttribute("data-todo")) { toggleTodo(t.getAttribute("data-todo"), last ? last.q : $("q").value, t.getAttribute("data-todo-link")); return; }
    if (t.hasAttribute("data-todo-rm")) { toggleTodo(t.getAttribute("data-todo-rm")); return; }
    if (t.id === "wsCopy") {
      var txt = todoText();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { t.textContent = "Copied"; setTimeout(function () { t.textContent = "Copy as a request"; }, 1800); }, function () { prompt("Copy this request", txt); });
      else prompt("Copy this request", txt);
      return;
    }
    if (t.id === "wsMail") { location.href = "mailto:?subject=" + encodeURIComponent("Market Scout: providers to research") + "&body=" + encodeURIComponent(todoText()); return; }
    if (t.id === "wsClear") { if (confirm("Clear the to-research list?")) setTodo([]); return; }
  });
  document.addEventListener("input", function (e) { if (e.target.id === "q") renderPanel(); });
  document.addEventListener("click", function (e) { if (e.target.closest("[data-view],[data-preset],#fbClear")) setTimeout(renderPanel, 0); });
  document.addEventListener("keydown", function (e) { if (e.target.id === "q" && e.key === "Enter") { e.preventDefault(); if (($("q").value || "").trim().length >= 3) run(); } });

  window.ScoutWeb = { plan: plan, namesIn: namesIn, analyse: analyse };
  renderPanel();
  renderTodo();
  if (new URLSearchParams(location.search).get("web") === "1") run();
})();
