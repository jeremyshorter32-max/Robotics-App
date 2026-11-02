/* Market Scout chat page.
   One question in, one scout brief out. The brief is built from:
     - Aldar's own deployments (fleet map data),
     - Aldar's robotics strategy (data/scout-strategy.js),
     - Scout's provider memory (data/scout-providers.js, scored by scout.js),
     - a live Google News scan (scout-web.js, through /api/scout-news),
     - Market Pulse news (data/intel-feed.js).
   Briefs can be saved in this browser, shared as a link, downloaded as PDF or Markdown. */
(function () {
  "use strict";

  var CORE = window.ScoutCore, WEB = window.ScoutWeb;
  if (!CORE || !WEB) return;
  var STRAT = CORE.strategy || {};
  var esc = CORE.esc;
  var CATS = (window.SCOUT_DATA && window.SCOUT_DATA.meta && window.SCOUT_DATA.meta.categories) || [];
  var CAT = {};
  CATS.forEach(function (c) { CAT[c.id] = c; });

  function $(id) { return document.getElementById(id); }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem("scout." + k)); localStorage.setItem("scout." + k, JSON.stringify(v)); } catch (e) { return null; } }
  function fmtDate(d) { var t = typeof d === "number" ? d : Date.parse(d); return t ? new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""; }
  function plural(n, a, b) { return n + " " + (n === 1 ? a : (b || a + "s")); }
  function listJoin(a) { a = a.filter(Boolean); if (a.length < 2) return a.join(""); return a.slice(0, -1).join(", ") + " and " + a[a.length - 1]; }
  function shortName(p) { return p.name.replace(/\s*\(.*\)\s*$/, ""); }
  function toast(msg) { var t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(function () { t.hidden = true; }, 2200); }

  /* ---------- ideas to try ---------- */
  var IDEAS = [
    ["Robotic painting for apartment interiors", "construction"],
    ["Façade cleaning for high-rise towers", "facade"],
    ["Night-time security patrol in communities", "security"],
    ["Autonomous delivery inside residential communities", "delivery"],
    ["Floor scrubbing robots for malls", "cleaning"],
    ["Drone inspection of building façades", "inspection"],
    ["Humanoid concierge for retail and hospitality", "humanoids"],
    ["Robots that use lifts and doors in our buildings", "physical_ai"]
  ];

  /* ---------- our deployments ---------- */
  var STATUS = { deployed: "Live", pilot: "Testing", planned: "Planned" };
  var FLEET = [];
  [["rc", window.FLEET_DATA], ["construction", window.CONSTRUCTION_DATA]].forEach(function (pair) {
    var D = pair[1];
    if (!D || !D.fleet) return;
    var assets = {}, seen = {};
    (D.assets || []).forEach(function (a) { assets[a.id] = a; });
    D.fleet.forEach(function (r) {
      var a = assets[r.asset_id] || {};
      FLEET.push({ layer: pair[0], id: r.id, vendor: r.vendor || "", model: r.model || "", use_case: r.use_case || "", type: r.robot_type || "",
        category: r.category || "", status: r.status, site: a.name || r.asset_id || "", update: r.update || "", desc: r.description || "",
        next: r.next_steps || "" });
    });
  });
  var TYPE_FOR = { cleaning: ["cleaning"], facade: ["facade"], inspection: ["inspection"], security: ["security"], delivery: ["delivery"],
    humanoids: ["engagement"], construction: ["painting", "plastering", "tiling", "levelling", "finishing"], physical_ai: [] };

  /* ---------- understand the question ---------- */
  var STOPW = /^(?:robots?|robotic|robotics|autonomous|solutions?|providers?|companies|vendors?|technology|technologies|systems?|for|the|and|with|that|our|in|of|to|a|an|on|at|inside|use|using|best|new)$/i;
  function understand(q, as) {
    var P = WEB.plan(q, as);
    var words = (q.toLowerCase().match(/[\p{L}\p{N}-]+/gu) || []).filter(function (w) { return w.length > 2 && !STOPW.test(w); });
    var stems = words.map(function (w) { return w.replace(/(ing|ed|es|s)$/, ""); }).filter(function (w) { return w.length > 2; });
    var named = CORE.providers.filter(function (p) {
      return [shortName(p)].concat(p.aliases || []).some(function (n) { return n && n.length > 2 && new RegExp("\\b" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(q); });
    });
    if (!as && P.term && P.term.avoid && new RegExp("\\b(?:" + P.term.avoid + ")\\b", "i").test(q)) P.term = null;
    var cat = P.term ? P.term.cat : null;
    if (!cat) {
      // fall back to category names and keywords
      if (named.length) cat = (named[0].categories || [])[0];
    }
    return { q: q, as: as || null, P: P, term: P.term, cat: cat, stems: stems, named: named, re: P.term ? new RegExp(P.term.match, "i") : null };
  }

  /* ---------- match the provider memory ---------- */
  function matchProviders(U) {
    var out = [];
    CORE.providers.forEach(function (p) {
      var rel = 0, cats = p.categories || [];
      if (U.named.indexOf(p) >= 0) rel += 100;
      if (U.cat) { if (cats[0] === U.cat) rel += 40; else if (cats.indexOf(U.cat) >= 0) rel += 25; }
      var text = [(p.use_cases || []).join(" "), (p.products || []).join(" "), p.what || ""].join(" ");
      if (U.re && U.re.test(text)) rel += 45;
      var hits = U.stems.filter(function (s) { return p._hay.indexOf(s) >= 0; }).length;
      rel += Math.min(30, hits * 10);
      var need = U.term ? 60 : (U.cat ? 40 : 30);
      if (U.term && !U.re.test(text) && U.named.indexOf(p) < 0) need = 75; // same category but a different use case
      if (rel >= need) out.push({ p: p, rel: rel });
    });
    out.sort(function (a, b) {
      var ka = a.p._knock.length ? 1 : 0, kb = b.p._knock.length ? 1 : 0;
      if (ka !== kb) return ka - kb;
      return (b.rel >= 100) - (a.rel >= 100) || b.p._fit - a.p._fit || b.rel - a.rel;
    });
    return out;
  }
  function matchFleet(U, provs) {
    var namedVendors = {};
    U.named.forEach(function (p) { (p.fleet_vendors || []).forEach(function (v) { namedVendors[v] = 1; }); });
    var types = U.cat ? TYPE_FOR[U.cat] || [] : [];
    var seen = {};
    return FLEET.filter(function (f) {
      var text = [f.use_case, f.type, f.model, f.desc, f.category].join(" ");
      var byVendor = Object.keys(namedVendors).some(function (v) { return f.vendor === v || f.vendor.indexOf(v + " +") === 0; });
      var hit;
      if (byVendor) hit = true;
      else if (U.term) hit = (types.length ? types.indexOf(f.type) >= 0 : true) && U.re.test([f.use_case, f.type, f.model].join(" ")) ||
        (!types.length && U.re.test(text)) || (U.cat === "physical_ai" && U.re.test(text));
      else if (U.cat) hit = types.indexOf(f.type) >= 0;
      else hit = U.stems.length > 0 && U.stems.filter(function (s) { return s.length > 3 && text.toLowerCase().indexOf(s) >= 0; }).length >= Math.min(2, U.stems.length);
      if (!hit) return false;
      var k = f.site + "|" + f.model + "|" + f.status;
      if (seen[k]) return false;
      return (seen[k] = true);
    }).sort(function (a, b) { var o = { deployed: 0, pilot: 1, planned: 2 }; return (o[a.status] || 3) - (o[b.status] || 3); });
  }
  function pulseNews(U, provs) {
    var F = window.INTEL_FEED;
    if (!F || !F.editions) return [];
    var res = [], seen = {};
    var names = provs.slice(0, 12).map(function (m) { return shortName(m.p); });
    F.editions.forEach(function (e) {
      (e.posts || []).forEach(function (p) {
        if (seen[p.url]) return;
        var t = [p.headline, p.summary, p.company].join(" ");
        var hit = (U.re && U.re.test(t)) || names.some(function (n) { return (p.headline || "").indexOf(n) >= 0; }) ||
          (!U.term && U.cat && p.category === U.cat);
        if (hit) { seen[p.url] = 1; res.push({ title: p.headline, link: p.url, source: p.source, published: p.published, edition: e.label }); }
      });
    });
    return res.slice(0, 6);
  }
  function strategyFit(U) {
    var pri = (STRAT.priority_use_cases || []).filter(function (x) { return x.category === U.cat; })[0];
    var named = null;
    if (pri && U.term) named = (pri.examples || []).filter(function (ex) {
      var e = ex.toLowerCase();
      return U.stems.some(function (s) { return s.length > 3 && e.indexOf(s) >= 0; });
    })[0] || null;
    return { pri: pri, named: named };
  }

  /* ---------- build the brief (data) ---------- */
  function build(q, web, as) {
    var U = understand(q, as);
    var provs = matchProviders(U);
    var fleet = matchFleet(U, provs);
    var live = provs.filter(function (m) { return !m.p._knock.length; });
    var shortlist = live.filter(function (m) { return m.p._verdict === "shortlist"; });
    var gccReady = live.filter(function (m) { return m.p.gcc && (m.p.gcc.level === "uae_deployments" || m.p.gcc.level === "local_office"); });
    return { q: q, U: U, provs: provs, live: live, shortlist: shortlist, gcc: gccReady, fleet: fleet, strat: strategyFit(U),
      pulse: pulseNews(U, provs), web: web || null, at: Date.now() };
  }

  /* ---------- the written read-out ---------- */
  function readout(B) {
    var out = [], U = B.U;
    if (U.named.length) {
      var np = U.named[0];
      out.push("You asked about <b>" + esc(shortName(np)) + "</b>. It is in Scout's memory with a Fit Score of <b>" + np._fit + "</b> (" + esc(CORE.verdicts[np._verdict].label) + ")" +
        (np._deployments && np._deployments.length ? " and is already working with Aldar" : "") + ". Open its profile below; the rest of this brief shows its area and its alternatives.");
    }
    var catLabel = U.cat && CAT[U.cat] ? lowerFirst(CAT[U.cat].label) : "this area";
    var n = { deployed: 0, pilot: 0, planned: 0 };
    B.fleet.forEach(function (f) { n[f.status] = (n[f.status] || 0) + 1; });
    var vend = uniqueVendors(B.fleet);
    if (B.fleet.length) {
      var parts = [];
      if (n.deployed) parts.push(n.deployed + " live");
      if (n.pilot) parts.push(n.pilot + " in testing");
      if (n.planned) parts.push(n.planned + " planned");
      var only = parts.length === 1 ? (n.deployed ? "all live" : n.pilot ? "all in testing" : "all planned") : listJoin(parts);
      out.push("Aldar already has <b>" + plural(B.fleet.length, "deployment") + "</b> in " + esc(catLabel) + " (" + (B.fleet.length === 1 ? only.replace(/^all /, "") : only) + ")" +
        (vend.length ? ", with " + esc(listJoin(vend.slice(0, 4))) : "") + ". Use them as the benchmark for anything new.");
    } else {
      out.push("Aldar has <b>no deployments in this area yet</b>, so this would be a first trial. Favour providers with proven, comparable sites and a local partner.");
    }
    if (B.live.length) {
      var top = B.live[0].p;
      out.push("Scout's memory holds <b>" + plural(B.live.length, "matching provider") + "</b>" + (B.shortlist.length ? ", " + B.shortlist.length + " on the shortlist" : ", none yet on the shortlist") +
        ". The best fit is <b>" + esc(shortName(top)) + "</b> (Fit " + top._fit + ", " + esc(CORE.matLabel(top).replace(/^\d · /, "").toLowerCase()) + ", " + esc(lowerFirst(CORE.gccLabel(top))) + ")" +
        (B.live[1] ? ", followed by " + esc(listJoin(B.live.slice(1, 3).map(function (m) { return shortName(m.p) + " (" + m.p._fit + ")"; }))) : "") + ".");
    } else {
      out.push("Scout's memory has <b>no researched providers</b> for this yet. The live market scan below is the starting point.");
    }
    if (B.web && B.web.companies) {
      var nc = B.web.companies.length;
      out.push(nc ? "The live news scan found <b>" + plural(nc, "company", "companies") + " not yet in Scout</b>" + (nc === 1 ? ": " : nc <= 3 ? ": " : ", including ") + esc(listJoin(B.web.companies.slice(0, 3).map(function (c) { return c.name; }))) + "." :
        "The live news scan found no new company names in recent headlines.");
    }
    if (B.strat.pri) {
      out.push(B.strat.named ? "This is a <b>named use case</b> in Aldar's robotics strategy (" + esc(B.strat.pri.label) + ": " + esc(B.strat.named) + ")." :
        "It sits in <b>" + esc(B.strat.pri.label) + "</b>, one of the eight focus areas in Aldar's robotics strategy.");
    } else {
      out.push("It is <b>not a named focus area</b> in the strategy, so treat it as exploratory and judge it on fit and proof.");
    }
    return out;
  }
  function lowerFirst(t) { return /^[A-Z][a-z]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t; }
  function uniqueVendors(fleet) {
    var s = {}, o = [];
    fleet.forEach(function (f) { var v = f.vendor.replace(/\s*\+\s*other$/, ""); if (v && !s[v]) { s[v] = 1; o.push(v); } });
    return o;
  }
  function nextSteps(B) {
    var s = [];
    var top = B.shortlist.slice(0, 3).map(function (m) { return shortName(m.p); });
    if (top.length) s.push("Invite " + listJoin(top) + " to demo against an Aldar brief, starting with " + top[0] + ".");
    else if (B.live.length) s.push("No provider clears the shortlist bar yet. Ask " + listJoin(B.live.slice(0, 2).map(function (m) { return shortName(m.p); })) + " for evidence of comparable deployments.");
    var bench = B.fleet.filter(function (f) { return f.status === "pilot" || f.status === "deployed"; })[0];
    if (bench) s.push("Use the " + (STATUS[bench.status] || "").toLowerCase() + " " + bench.site + " " + (bench.use_case || "trial").toLowerCase() + " (" + bench.vendor.replace(/\s*\+\s*other$/, "") + ") as the benchmark when comparing challengers.");
    if (B.web && B.web.companies && B.web.companies.length) s.push("Research the most relevant new companies from the market scan. Tick “To research” and send the list to Claude for full profiles and scores.");
    var weakGcc = B.shortlist.concat(B.live.slice(0, 3)).filter(function (m) { return !(m.p.gcc && (m.p.gcc.level === "uae_deployments" || m.p.gcc.level === "local_office")); });
    if (weakGcc.length) s.push("Before any trial, ask " + listJoin(uniqueArr(weakGcc.map(function (m) { return shortName(m.p); })).slice(0, 3)) + " for a UAE partner, heat and dust ratings and local support.");
    s.push("Save this brief and share the link with the robotics team for review.");
    return s;
  }
  function uniqueArr(a) { var s = {}; return a.filter(function (x) { if (s[x]) return false; s[x] = 1; return true; }); }

  /* ---------- render ---------- */
  function goodLooks() {
    var w = CORE.weights(), tot = w.reduce(function (a, b) { return a + b; }, 0) || 1;
    return (STRAT.pillars || []).map(function (pl, i) { return { pl: pl, w: Math.round(w[i] / tot * 100) }; })
      .sort(function (a, b) { return b.w - a.w; }).map(function (x) {
        var top = (/·\s*5\s+([^·]+)$/.exec(x.pl.guide || "") || [])[1] || x.pl.guide || "";
        return "<li><b>" + esc(x.pl.label) + "<small>" + x.w + "% of the score</small></b><span>" + esc(top.trim().replace(/^./, function (c) { return c.toUpperCase(); })) + "</span></li>";
      }).join("");
  }
  function provCard(m, i) {
    var p = m.p, pl = p.pillars || {};
    var best = null, worst = null;
    (STRAT.pillars || []).forEach(function (x) {
      var s = pl[x.id] || {};
      if (s.score == null) return;
      if (!best || s.score > best.s.score || (s.score === best.s.score && x.weight > best.x.weight)) best = { x: x, s: s };
      if (!worst || s.score < worst.s.score || (s.score === worst.s.score && x.weight > worst.x.weight)) worst = { x: x, s: s };
    });
    var flags = [];
    if (p._deployments && p._deployments.length) flags.push('<span class="flag f-ours">With Aldar</span>');
    if (p.gcc && p.gcc.level === "uae_deployments") flags.push('<span class="flag f-uae">In UAE</span>');
    if (p._knock.length) flags.push('<span class="flag f-ko">Knocked out</span>');
    (p.categories || []).slice(0, 1).forEach(function (c) { flags.push(CORE.catChip(c)); });
    return '<button type="button" class="pc' + (p._knock.length ? " ko" : "") + '" data-open="' + esc(p.id) + '">' +
      '<span class="rk">' + (i + 1) + "</span>" +
      '<span class="nm"><b>' + esc(shortName(p)) + '</b><span class="meta">' + esc([p.hq_country, CORE.matLabel(p), CORE.gccLabel(p)].filter(Boolean).join(" · ")) + "</span></span>" +
      '<span class="fitc">' + CORE.ring(p._fit, 50) + CORE.verdictPill(p) + "</span>" +
      '<span class="why">' + (best ? "<b>Strength:</b> " + esc(best.s.why || best.x.label) : "") + (worst && worst.x !== best.x ? '<br><b class="w">Watch:</b> ' + esc(worst.s.why || worst.x.label) : "") + "</span>" +
      '<span class="tags">' + flags.join("") + "</span></button>";
  }
  function miniMatrix(list) {
    list = list.filter(function (m) { return !m.p._knock.length; }).slice(0, 14);
    if (!list.length) return "";
    var W = 420, H = 270, m = { l: 34, r: 10, t: 10, b: 30 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var sp = (STRAT.quadrants && STRAT.quadrants.split) || { fit: 70, maturity: 3 };
    function x(v) { return m.l + ((v - 0.5) / 5) * iw; }
    function y(f) { return m.t + ih - (f / 100) * ih; }
    var xs = x(sp.maturity - 0.5), ys = y(sp.fit);
    var s = '<svg class="mini" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Fit against maturity for the matching providers">';
    s += '<rect class="q" x="' + xs + '" y="' + m.t + '" width="' + (m.l + iw - xs) + '" height="' + (ys - m.t) + '" fill="#E9F5EE"/>';
    s += '<rect class="q" x="' + m.l + '" y="' + m.t + '" width="' + (xs - m.l) + '" height="' + (ys - m.t) + '" fill="#EEF3FB"/>';
    s += '<rect class="q" x="' + xs + '" y="' + ys + '" width="' + (m.l + iw - xs) + '" height="' + (m.t + ih - ys) + '" fill="#FBF6EA"/>';
    s += '<rect class="q" x="' + m.l + '" y="' + ys + '" width="' + (xs - m.l) + '" height="' + (m.t + ih - ys) + '" fill="#F5F5F3"/>';
    var Q = STRAT.quadrants || {};
    [["tr", m.l + iw - 6, m.t + 13, "end"], ["tl", m.l + 6, m.t + 13, "start"], ["br", m.l + iw - 6, m.t + ih - 6, "end"], ["bl", m.l + 6, m.t + ih - 6, "start"]].forEach(function (a) {
      if (Q[a[0]]) s += '<text class="qlab" x="' + a[1] + '" y="' + a[2] + '" text-anchor="' + a[3] + '">' + esc(Q[a[0]].label.toUpperCase()) + "</text>";
    });
    [0, 50, 100].forEach(function (f) { s += '<text class="tick" x="' + (m.l - 6) + '" y="' + (y(f) + 3) + '" text-anchor="end">' + f + "</text>"; });
    [1, 2, 3, 4, 5].forEach(function (k) { s += '<text class="tick" x="' + x(k) + '" y="' + (H - 12) + '" text-anchor="middle">' + k + "</text>"; });
    s += '<text class="tick" x="' + (m.l + iw / 2) + '" y="' + (H - 1) + '" text-anchor="middle">Maturity →   ·   Fit ↑</text>';
    var placed = [];
    list.forEach(function (mm, i) {
      var p = mm.p, pl = p.pillars || {};
      var r0 = ((pl.readiness && pl.readiness.score) || 0) + ((pl.deployments && pl.deployments.score) || 0);
      var cx = x((p.maturity || 1) - 0.35 + (r0 / 10) * 0.7), cy = y(p._fit);
      for (var t = 0; t < 10 && placed.some(function (q) { return Math.abs(q[0] - cx) < 10 && Math.abs(q[1] - cy) < 10; }); t++) cy += (t % 2 ? -1 : 1) * (5 + t * 2);
      placed.push([cx, cy]);
      var c = CAT[(p.categories || [])[0]] || { color: "#769CD2" };
      s += '<g data-open="' + esc(p.id) + '"><title>' + esc(shortName(p) + " · Fit " + p._fit) + "</title>" +
        '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="6.5" fill="' + esc(c.color) + '" stroke="#fff" stroke-width="1.5"/>' +
        (i < 5 ? '<text class="dl" x="' + (cx + 9).toFixed(1) + '" y="' + (cy + 3.5).toFixed(1) + '">' + esc(shortName(p).slice(0, 18)) + "</text>" : "") + "</g>";
    });
    return s + "</svg>";
  }
  function webSection(B) {
    var W = B.web;
    if (!W) return '<div class="webwait"><div class="orb sm" aria-hidden="true" style="filter:saturate(.8)"><span></span></div>Scanning the market…</div>';
    if (W.error) return '<p class="empty">The live market scan did not answer (' + esc(W.error) + '). The Google searches below still work, and you can <button type="button" class="lnk" data-act="rescan">try the scan again</button>.</p>';
    var html = "";
    if (W.companies.length) {
      html += '<ul class="newco">' + W.companies.slice(0, 12).map(function (c) {
        return '<li><div class="cn"><b>' + esc(c.name) + "</b><small>" + plural(c.count, "article") + (c.latest ? " · latest " + esc(fmtDate(c.latest)) : "") + (c.gcc ? " · Gulf mention" : "") + "</small>" +
          '<a href="' + esc(c.link) + '" target="_blank" rel="noopener">' + esc(c.title) + "</a></div>" +
          '<div class="act"><a class="abtn" href="' + esc(WEB.google('"' + c.name + '" ' + B.q)) + '" target="_blank" rel="noopener">Google</a>' +
          '<button type="button" class="abtn" data-todo="' + esc(c.name) + '" data-todo-q="' + esc(B.q) + '" data-todo-link="' + esc(c.link) + '">+ To research</button></div></li>';
      }).join("") + "</ul>";
      if (W.companies.length > 12) html += '<p class="note">' + (W.companies.length - 12) + " more in the scan. Refine the question to narrow it down.</p>";
    } else {
      html += '<p class="empty">No new company names stood out in recent headlines. Try the Google searches below, or rephrase the question.</p>';
    }
    html += '<div class="todo" id="todoBar" hidden><span><b id="todoN"></b> on your research list</span><span class="grow"></span><button type="button" class="abtn" data-act="todo-copy">Copy as a request</button><button type="button" class="abtn" data-act="todo-mail">Email</button></div>';
    html += '<div class="digs"><span>Dig deeper on Google:</span>' + WEB.digLinks(B.U.P).map(function (l) { return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + "</a>"; }).join("") + "</div>";
    return html;
  }
  function signals(B) {
    var items = B.pulse.map(function (n) { return { t: n.title, l: n.link, s: n.source, d: n.published, tag: "Pulse" }; });
    if (B.web && B.web.articles) B.web.articles.slice(0, 8 - Math.min(items.length, 4)).forEach(function (a) { items.push({ t: a.title, l: a.link, s: a.source, d: a.published, tag: "News" }); });
    if (!items.length) return '<p class="empty">No recent signals found for this question.</p>';
    return '<ul class="sig">' + items.slice(0, 8).map(function (n) {
      return '<li><a href="' + esc(n.l) + '" target="_blank" rel="noopener"><span class="tagp">' + n.tag + "</span>" + esc(n.t) + "</a><small>" + esc([n.s, fmtDate(n.d)].filter(Boolean).join(" · ")) + "</small></li>";
    }).join("") + "</ul>";
  }
  function termLabel(t) { var c = CAT[t.cat]; return cap1(t.en[0]) + (c ? " · " + c.label : ""); }
  function cap1(x) { return x.charAt(0).toUpperCase() + x.slice(1); }
  function readAs(U) {
    var ranked = (U.P.ranked || []).map(function (r) { return r.t; });
    var cur = U.term ? U.term.id : "none";
    var opt = function (t) { return '<option value="' + esc(t.id) + '"' + (t.id === cur ? " selected" : "") + ">" + esc(cap1(t.en[0])) + "</option>"; };
    var groups = CATS.map(function (c) {
      var ts = WEB.terms.filter(function (t) { return t.cat === c.id && ranked.indexOf(t) < 0; });
      return ts.length ? '<optgroup label="' + esc(c.label) + '">' + ts.map(opt).join("") + "</optgroup>" : "";
    }).join("");
    return '<label class="btag asel" title="Not what you meant? Pick the right use case and Scout will re-scout">Read as' +
      '<select data-act="as" aria-label="Read this question as">' +
        (ranked.length ? '<optgroup label="Best matches for your words">' + ranked.map(opt).join("") + "</optgroup>" : "") + groups +
        '<optgroup label="Other"><option value="none"' + (cur === "none" ? " selected" : "") + ">Nothing specific (exploratory)</option></optgroup>" +
      '</select><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></label>';
  }
  function render(B) {
    var U = B.U, c = U.cat && CAT[U.cat];
    var saved = isSaved(B.q);
    var tags = [];
    if (c) tags.push('<span class="btag" style="--c:' + esc(c.color) + '"><i></i>' + esc(c.label) + "</span>");
    tags.push(readAs(U));
    if (B.strat.pri) tags.push('<span class="btag pri">' + (B.strat.named ? "Named strategy use case" : "Strategy focus area") + "</span>");
    var n = { deployed: 0, pilot: 0, planned: 0 };
    B.fleet.forEach(function (f) { n[f.status]++; });
    var html =
      '<header class="bhead"><div><div class="beyebrow"><span class="dot"></span>Scout brief · ' + esc(fmtDate(B.at)) + "</div>" +
        '<h1 id="bTitle"><q>' + esc(B.q) + "</q></h1>" +
        '<div class="btags">' + tags.join("") + "</div></div>" +
        '<div class="bacts">' +
          '<button type="button" class="bact" data-act="save" title="Save this brief" aria-label="Save this brief" aria-pressed="' + saved + '"><svg viewBox="0 0 24 24" width="13" height="13" fill="' + (saved ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg><span class="lbl">' + (saved ? "Saved" : "Save") + "</span></button>" +
          '<button type="button" class="bact" data-act="share" title="Share a link to this brief" aria-label="Share a link to this brief"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg><span class="lbl">Share</span></button>' +
          '<button type="button" class="bact" data-act="pdf" title="Download as PDF" aria-label="Download as PDF"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span class="lbl">PDF</span></button>' +
          '<button type="button" class="bact" data-act="md" title="Download as a text file" aria-label="Download as a text file"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/></svg><span class="lbl">Text</span></button>' +
          '<button type="button" class="bact primary" data-act="new" title="Start a new scout" aria-label="Start a new scout"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span class="lbl">New scout</span></button>' +
        "</div></header>" +
      '<div class="paper"><div class="bbody">' +
        '<section class="bcard"><h2>Scout’s read</h2><div class="read"><div class="txt">' + readout(B).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
          '<div class="tiles">' +
            '<div class="tile"><b>' + B.fleet.length + "</b><span>Aldar deployments" + (B.fleet.length ? " (" + n.deployed + " live, " + n.pilot + " testing, " + n.planned + " planned)" : "") + "</span></div>" +
            '<div class="tile"><b>' + B.live.length + "</b><span>Providers in memory</span></div>" +
            '<div class="tile gold"><b>' + B.shortlist.length + "</b><span>On the shortlist</span></div>" +
            '<div class="tile"><b id="tileNew">' + (B.web && B.web.companies ? B.web.companies.length : "…") + "</b><span>New in the market</span></div>" +
          "</div></div></section>" +
        '<section class="bcard half"><h2>Aldar experience <span class="n">' + B.fleet.length + "</span></h2>" +
          (B.fleet.length ? '<p class="sub">From the fleet map: what we have live, in testing or planned in this area.</p><div class="vend">' + uniqueVendors(B.fleet).map(function (v) { return "<span>" + esc(v) + "</span>"; }).join("") + "</div>" +
            '<ul class="deps">' + B.fleet.slice(0, 7).map(function (f) {
              var first = (f.update || f.desc || "").split("\n")[0].replace(/^[•\-\s]+/, "");
              return '<li><span class="st st-' + esc(f.status) + '">' + esc(STATUS[f.status] || f.status) + "</span><b>" + esc(f.site) + " · " + esc(f.vendor.replace(/\s*\+\s*other$/, "")) + "</b>" +
                "<small>" + esc([f.model, f.use_case].filter(Boolean).join(" · ")) + (first ? ". " + esc(first.length > 150 ? first.slice(0, 149) + "…" : first) : "") + "</small></li>";
            }).join("") + "</ul>" + (B.fleet.length > 7 ? '<p class="note">+' + (B.fleet.length - 7) + ' more on the <a href="index.html">fleet map</a>.</p>' : '<p class="note"><a href="index.html' + (B.fleet.every(function (f) { return f.layer === "construction"; }) ? "?map=construction" : "") + '">Open the fleet map</a></p>')
          : '<p class="empty">No Aldar deployments or trials in this area yet. This would be a first.</p>') + "</section>" +
        '<section class="bcard half strat"><h2>Strategy fit</h2>' +
          (B.strat.pri ? "<p>" + (B.strat.named ? '<span class="pill pri-yes">Named use case</span>' : '<span class="pill pri-yes">Focus area</span>') + "<b>" + esc(B.strat.pri.label) + "</b> is one of the eight focus areas in Aldar's robotics strategy" + (B.strat.named ? ", and <b>" + esc(B.strat.named) + "</b> is a named use case." : ".") + "</p>"
            : '<p><span class="pill pri-no">Exploratory</span>Not a named focus area in the strategy. Judge it on fit and proof.</p>') +
          "<p>Strategy context: " + esc(STRAT.strategy_summary || "") + "</p>" +
          '<p class="sub" style="margin:10px 0 0">What a strong provider looks like, by weight:</p><ul class="good">' + goodLooks() + "</ul></section>" +
        '<section class="bcard"><h2>Best-fit providers <span class="n">' + B.provs.length + "</span></h2>" +
          (B.provs.length ? '<p class="sub">From Scout’s provider memory, ranked by Aldar Fit Score. Open any provider for the full profile, scores and sources.</p>' +
            '<div class="read"><div class="pgrid2">' + B.provs.slice(0, 8).map(provCard).join("") + "</div><div>" + miniMatrix(B.provs) + "</div></div>" +
            (B.provs.length > 8 ? '<p class="note">' + (B.provs.length - 8) + ' more in the <a href="scout-library.html?q=' + encodeURIComponent(U.term ? U.term.en[0].split(" ")[0] : B.q) + '">provider memory</a>.</p>' : "")
          : '<p class="empty">Scout has not researched providers for this yet. Start from the live market scan below and add the strongest to your research list.</p>') + "</section>" +
        '<section class="bcard half"><h2>New in the market <span class="n" id="newN">' + (B.web && B.web.companies ? B.web.companies.length : "") + '</span></h2><p class="sub">Companies named in recent Google News headlines on this topic, not yet in Scout. Picked out automatically: check each one.</p><div id="webBox">' + webSection(B) + "</div></section>" +
        '<section class="bcard half"><h2>Market signals</h2><p class="sub">Recent news on this topic from Market Pulse and the live scan.</p><div id="sigBox">' + signals(B) + "</div></section>" +
        '<section class="bcard"><h2>Suggested next steps</h2><ol class="next">' + nextSteps(B).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></section>" +
        '<p class="method"><b>How this brief was made.</b> Aldar experience comes from the fleet map. Strategy fit and the Fit Score use the weights in Scout’s strategy settings. Providers come from Scout’s provider memory (' + CORE.providers.length + " researched profiles with sources). New companies come from a live scan of Google News over the last two years" + (B.web && B.web.checked ? ", run " + esc(fmtDate(B.web.checked)) : "") + ". Check material facts against the sources before a decision.</p>" +
      "</div></div>";
    $("brief").innerHTML = html;
    refreshTodo();
  }

  /* ---------- web scan snapshot (what we keep when a brief is saved) ---------- */
  function snapshot(r) {
    var A = r.A;
    return {
      checked: r.j.checked,
      total: (r.j.items || []).length,
      companies: A.companies.map(function (c) {
        var f = c.items[0];
        return { name: c.name, count: c.items.length, latest: c.latest, gcc: c.gcc, title: f.title, link: f.link };
      }),
      articles: A.latin.filter(function (it) { return it._rel; }).slice(0, 12).map(function (it) { return { title: it.title, link: it.link, source: it.source, published: it.published }; })
    };
  }

  /* ---------- running a scout ---------- */
  var current = null;
  var STEPS = [
    ["read", "Understanding the question"],
    ["fleet", "Reading Aldar’s deployments"],
    ["strategy", "Checking the robotics strategy"],
    ["memory", "Searching the provider memory"],
    ["web", "Scanning the market live"],
    ["write", "Writing the brief"]
  ];
  function stepHtml(state) {
    return STEPS.map(function (s) {
      var st = state[s[0]] || {};
      return '<li class="' + (st.cls || "") + '"><span class="ic"></span><span class="tx"><span>' + esc(s[1]) + "</span>" +
        (st.note ? " <small>" + esc(st.note) + "</small>" : "") +
        (st.doing ? '<em class="doing">' + esc(st.doing) + "</em>" : "") + "</span></li>";
    }).join("");
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function scout(q, opts) {
    opts = opts || {};
    q = String(q || "").replace(/\s+/g, " ").trim().slice(0, 200);
    if (q.length < 3) return;
    $("ask").value = "";
    autosize(); $("send").disabled = true;
    document.body.classList.remove("stage-home");
    document.body.classList.add("stage-run");
    $("home").hidden = true; $("brief").hidden = true; $("run").hidden = false;
    $("runQ").textContent = q;
    window.scrollTo({ top: 0 });
    setUrl(q, opts.as);
    var st = {};
    var draw = function () { $("steps").innerHTML = stepHtml(st); };
    var U = understand(q, opts.as);
    var B0 = build(q, null, opts.as);
    var webP = opts.web ? Promise.resolve({ snap: opts.web }) :
      WEB.fetchWeb(q, opts.as).then(function (r) { return { snap: snapshot(r) }; }).catch(function (e) { return { snap: { error: e.message || "no answer" } }; });
    var seq = Promise.resolve();
    var fast = !!opts.fast;
    var T = function (ms) { return wait(fast ? 60 : ms); };
    var nFleet = FLEET.length, nMem = CORE.providers.length;
    var reading = U.term ? termLabel(U.term) : "nothing specific, so this is exploratory";
    [["read", "Working out what is being scouted, and which focus area it belongs to…", "Read as: " + reading, 1300],
     ["fleet", "Looking through " + nFleet + " deployments and trials on the fleet map…", plural(B0.fleet.length, "deployment") + " in this area", 1300],
     ["strategy", "Matching it to the eight focus areas and named use cases in Aldar’s robotics strategy…", B0.strat.named ? "named use case: " + B0.strat.named : B0.strat.pri ? "focus area: " + B0.strat.pri.label : "not a named focus area", 1300],
     ["memory", "Comparing " + nMem + " researched providers and ranking them by Aldar Fit Score…", plural(B0.live.length, "matching provider"), 1300]].forEach(function (x) {
      seq = seq.then(function () { st[x[0]] = { cls: "on", doing: x[1] }; draw(); return T(x[3]); })
        .then(function () { st[x[0]] = { cls: "ok", note: x[2] }; draw(); return T(250); });
    });
    var t0;
    return seq.then(function () {
      t0 = Date.now();
      st.web = { cls: "on", doing: opts.web ? "Using the scan saved with this brief…" : "Running 10 Google News searches across English, UAE and Chinese editions, and picking out the companies named…" }; draw();
      return webP;
    }).then(function (res) {
      var left = Math.max(0, (fast ? 0 : 1800) - (Date.now() - t0));
      return wait(left).then(function () { return res; });
    }).then(function (res) {
      var snap = res.snap;
      st.web = snap.error ? { cls: "warn", note: "did not answer" } : { cls: "ok", note: plural(snap.total || 0, "article") + ", " + plural((snap.companies || []).length, "new company", "new companies") };
      st.write = { cls: "on", doing: "Pulling it together: Aldar experience, strategy fit, best-fit providers, new names and next steps…" }; draw();
      return T(1100).then(function () { return snap; });
    }).then(function (snap) {
      current = build(q, snap, opts.as);
      if (opts.at) current.at = opts.at;
      render(current);
      $("run").hidden = true; $("brief").hidden = false;
      document.body.classList.remove("stage-run");
      document.body.classList.add("stage-brief");
      remember(q);
      $("ask").placeholder = "Scout something else…";
    });
  }

  /* ---------- saved scouts and recents (this browser) ---------- */
  function savedList() { return store("briefs") || []; }
  function isSaved(q) { return savedList().some(function (b) { return b.q.toLowerCase() === q.toLowerCase(); }); }
  function toggleSave() {
    if (!current) return;
    var L = savedList();
    var i = L.findIndex(function (b) { return b.q.toLowerCase() === current.q.toLowerCase(); });
    if (i >= 0) { L.splice(i, 1); toast("Removed from saved scouts"); }
    else {
      L.unshift({ q: current.q, as: current.U.as, at: current.at, web: current.web && !current.web.error ? current.web : null, cat: current.U.cat });
      toast("Saved. Find it on the Scout home page");
    }
    store("briefs", L.slice(0, 30));
    var b = document.querySelector('[data-act="save"]');
    if (b) {
      var on = isSaved(current.q);
      b.setAttribute("aria-pressed", on);
      b.querySelector(".lbl").textContent = on ? "Saved" : "Save";
      b.querySelector("svg").setAttribute("fill", on ? "currentColor" : "none");
    }
  }
  function remember(q) {
    var r = store("recentScouts") || [];
    r = [q].concat(r.filter(function (x) { return x.toLowerCase() !== q.toLowerCase(); })).slice(0, 6);
    store("recentScouts", r);
  }
  function renderHome() {
    $("ideas").innerHTML = IDEAS.map(function (x) {
      var c = CAT[x[1]] || {};
      return '<button type="button" class="idea" data-idea="' + esc(x[0]) + '" style="--c:' + esc(c.color || "#769CD2") + '"><i></i>' + esc(x[0]) + "</button>";
    }).join("");
    var L = savedList(), R = (store("recentScouts") || []).filter(function (q) { return !L.some(function (b) { return b.q.toLowerCase() === q.toLowerCase(); }); });
    var items = L.map(function (b) { return { q: b.q, sub: "Saved " + fmtDate(b.at), saved: true }; }).concat(R.slice(0, 4).map(function (q) { return { q: q, sub: "Recent", saved: false }; }));
    $("savedWrap").hidden = !items.length;
    $("savedWrap").querySelector("h2").textContent = L.length ? "Your saved scouts" : "Recent scouts";
    $("saved").innerHTML = items.slice(0, 10).map(function (x) {
      return '<div class="svd" role="button" tabindex="0" data-open-brief="' + esc(x.q) + '">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="' + (x.saved ? "#F2C14E" : "none") + '" stroke="' + (x.saved ? "#F2C14E" : "rgba(255,255,255,.5)") + '" stroke-width="1.6" stroke-linejoin="round"><path d="' + (x.saved ? "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" : "M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z") + '"/></svg>' +
        "<b>" + esc(x.q) + "</b><small>" + esc(x.sub) + "</small>" +
        '<button type="button" class="rm" data-rm-brief="' + esc(x.q) + '" aria-label="Remove ' + esc(x.q) + '">×</button></div>';
    }).join("");
  }
  function openBrief(q) {
    var b = savedList().filter(function (x) { return x.q.toLowerCase() === q.toLowerCase(); })[0];
    if (b && b.web) return scout(b.q, { web: b.web, at: b.at, as: b.as, fast: true });
    return scout(q, { as: as0 && q === q0 ? as0 : null });
  }
  function goHome() {
    current = null;
    document.body.className = "stage-home";
    $("brief").hidden = true; $("run").hidden = true; $("home").hidden = false;
    $("ask").placeholder = homePlaceholder();
    setUrl(null);
    renderHome();
    window.scrollTo({ top: 0 });
    $("ask").focus();
  }

  /* ---------- share, download ---------- */
  function setUrl(q, as) {
    var u = new URLSearchParams();
    if (q) u.set("q", q);
    if (q && as) u.set("as", as);
    var s = u.toString();
    try { history.pushState({ q: q || null }, "", location.pathname + (s ? "?" + s : "")); } catch (e) {}
  }
  function share() {
    var url = location.origin + location.pathname + "?q=" + encodeURIComponent(current.q) + (current.U.as ? "&as=" + encodeURIComponent(current.U.as) : "");
    var done = function () { toast("Link copied. Anyone with it can open this scout"); };
    if (navigator.share && /Mobi|Android|iPhone|iPad/.test(navigator.userAgent)) {
      navigator.share({ title: "Market Scout: " + current.q, text: "Scout brief: " + current.q, url: url }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { prompt("Copy this link", url); });
    else prompt("Copy this link", url);
  }
  function markdown(B) {
    var L = [];
    var strip = function (h) { return h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">"); };
    L.push("# Scout brief: " + B.q, "", "Aldar Market Scout · " + fmtDate(B.at) + " · Read as: " + (B.U.term ? termLabel(B.U.term) : "nothing specific (exploratory)"), "");
    L.push("## Scout's read", "");
    readout(B).forEach(function (p) { L.push(strip(p), ""); });
    L.push("## Aldar experience", "");
    if (B.fleet.length) B.fleet.forEach(function (f) { L.push("- **" + (STATUS[f.status] || f.status) + "**: " + f.site + ", " + f.vendor + (f.model ? " (" + f.model + ")" : "")); });
    else L.push("- No deployments in this area yet.");
    L.push("", "## Strategy fit", "", B.strat.pri ? (B.strat.pri.label + (B.strat.named ? ": named use case \"" + B.strat.named + "\"" : ": focus area")) : "Not a named focus area (exploratory).", "");
    L.push("## Best-fit providers", "");
    if (B.provs.length) {
      L.push("| # | Provider | Fit | Verdict | Maturity | GCC |", "|---|---|---|---|---|---|");
      B.provs.slice(0, 12).forEach(function (m, i) { var p = m.p; L.push("| " + (i + 1) + " | " + shortName(p) + " | " + p._fit + " | " + CORE.verdicts[p._verdict].label + " | " + CORE.matLabel(p) + " | " + CORE.gccLabel(p) + " |"); });
    } else L.push("None in Scout's memory yet.");
    L.push("", "## New in the market", "");
    if (B.web && B.web.companies && B.web.companies.length) B.web.companies.slice(0, 15).forEach(function (c) { L.push("- **" + c.name + "**: " + c.title + " (" + c.link + ")"); });
    else L.push("- None found in recent headlines.");
    L.push("", "## Suggested next steps", "");
    nextSteps(B).forEach(function (s, i) { L.push((i + 1) + ". " + s); });
    L.push("", "---", "Open this scout: " + location.origin + location.pathname + "?q=" + encodeURIComponent(B.q));
    return L.join("\n");
  }
  function download(name, text, type) {
    var blob = new Blob([text], { type: type });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50); }

  /* ---------- research list bar ---------- */
  function refreshTodo() {
    var n = WEB.todo().length, bar = $("todoBar");
    if (bar) { bar.hidden = !n; $("todoN").textContent = plural(n, "company", "companies"); }
  }
  document.addEventListener("scout:todo", function () { setTimeout(refreshTodo, 0); });

  /* ---------- composer ---------- */
  function autosize() {
    var t = $("ask");
    t.style.height = "auto";
    t.style.height = Math.min(t.scrollHeight, 160) + "px";
    $("send").disabled = t.value.trim().length < 3;
  }
  $("ask").addEventListener("input", autosize);
  $("ask").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); if ($("ask").value.trim().length >= 3) scout($("ask").value); }
  });
  $("composer").addEventListener("submit", function (e) { e.preventDefault(); scout($("ask").value); });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-idea],[data-open-brief],[data-rm-brief],[data-act]");
    if (!t) return;
    if (t.hasAttribute("data-rm-brief")) {
      e.stopPropagation();
      var q = t.getAttribute("data-rm-brief");
      store("briefs", savedList().filter(function (b) { return b.q.toLowerCase() !== q.toLowerCase(); }));
      store("recentScouts", (store("recentScouts") || []).filter(function (x) { return x.toLowerCase() !== q.toLowerCase(); }));
      renderHome(); return;
    }
    if (t.hasAttribute("data-idea")) { scout(t.getAttribute("data-idea")); return; }
    if (t.hasAttribute("data-open-brief")) { openBrief(t.getAttribute("data-open-brief")); return; }
    var a = t.getAttribute("data-act");
    if (a === "new") goHome();
    else if (a === "save") toggleSave();
    else if (a === "share") share();
    else if (a === "pdf") window.print();
    else if (a === "md") download("scout-brief-" + slug(current.q) + ".md", markdown(current), "text/markdown;charset=utf-8");
    else if (a === "rescan") scout(current.q, { as: current.U.as });
    else if (a === "todo-copy") {
      var txt = WEB.todoText();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast("Research request copied"); }, function () { prompt("Copy this request", txt); });
      else prompt("Copy this request", txt);
    } else if (a === "todo-mail") location.href = "mailto:?subject=" + encodeURIComponent("Market Scout: providers to research") + "&body=" + encodeURIComponent(WEB.todoText());
  });
  document.addEventListener("change", function (e) {
    if (e.target.getAttribute && e.target.getAttribute("data-act") === "as" && current) scout(current.q, { as: e.target.value });
  });
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t.hasAttribute && t.hasAttribute("data-open-brief")) { e.preventDefault(); openBrief(t.getAttribute("data-open-brief")); }
  });
  window.addEventListener("popstate", function () {
    var u = new URLSearchParams(location.search), q = u.get("q");
    if (q) scout(q, { fast: true, as: u.get("as") }); else goHome();
  });

  /* ---------- start ---------- */
  function homePlaceholder() { return window.matchMedia("(max-width: 520px)").matches ? "e.g. Façade cleaning robots" : "e.g. Robotic painting for apartment interiors"; }
  $("ask").placeholder = homePlaceholder();
  renderHome();
  var q0 = new URLSearchParams(location.search).get("q");
  var as0 = new URLSearchParams(location.search).get("as");
  if (q0) openBrief(q0);
  else setTimeout(function () { try { $("ask").focus({ preventScroll: true }); } catch (e) {} }, 50);
})();
