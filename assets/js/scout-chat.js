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
    ["Robots that use lifts and doors in our buildings", "physical_ai"],
    ["Knightscope", "security"]
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
    // Is this a company or a topic?
    var mode = "topic";
    var bestNamed = named.slice().sort(function (a, b) { return nameCoverage(q, b) - nameCoverage(q, a); })[0];
    if (as === "company") mode = bestNamed ? "provider" : "company";
    else if (as) mode = "topic";
    else if (bestNamed && nameCoverage(q, bestNamed) >= 0.6) mode = "provider";
    else if (!(P.ranked && P.ranked.length && P.ranked[0].pick) && looksLikeName(q)) mode = "company";
    if (mode === "provider") { named = [bestNamed]; cat = (bestNamed.categories || [])[0]; }
    return { q: q, as: as || null, mode: mode, P: P, term: P.term, cat: cat, stems: stems, named: named, re: P.term ? new RegExp(P.term.match, "i") : null };
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
    if (U.mode === "provider") return buildProvider(q, U, web);
    if (U.mode === "company") return buildCompany(q, U, web);
    var provs = matchProviders(U);
    var fleet = matchFleet(U, provs);
    var live = provs.filter(function (m) { return !m.p._knock.length; });
    var shortlist = live.filter(function (m) { return m.p._verdict === "shortlist"; });
    var gccReady = live.filter(function (m) { return m.p.gcc && (m.p.gcc.level === "uae_deployments" || m.p.gcc.level === "local_office"); });
    return { mode: "topic", q: q, U: U, provs: provs, live: live, shortlist: shortlist, gcc: gccReady, fleet: fleet, strat: strategyFit(U),
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
  function uniqueArr(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  /* ==========================================================
     Company and provider questions
     ========================================================== */
  var GENERIC_CO = /^(?:robotics?|robots?|robotic|company|co|inc|ltd|llc|corp|group|holdings|technologies|technology|tech|ai|systems?|the|for|in|of|and|with|to|about|on|at|a|an|is|are|who|what|tell|me|profile|vendor|provider|supplier)$/i;
  var CORP_SUFFIX = /\b(?:robotics|robot|robots|technologies|technology|tech|ai|labs|automation|dynamics|systems|inc|ltd|llc|gmbh|corp|group|bots|industries)\.?$/i;
  function nameCoverage(q, p) {
    var names = [shortName(p)].concat(p.aliases || []).filter(function (n) { return n && n.length > 2; });
    var rest = q;
    names.forEach(function (n) { rest = rest.replace(new RegExp("\\b" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "ig"), " "); });
    var all = (q.match(/[\p{L}\p{N}&.-]+/gu) || []).length || 1;
    var left = (rest.match(/[\p{L}\p{N}&.-]+/gu) || []).filter(function (w) { return !GENERIC_CO.test(w); }).length;
    return 1 - left / all;
  }
  function looksLikeName(q) {
    var t = q.trim().replace(/[?!.]+$/, "");
    var w = t.split(/\s+/);
    if (!t || w.length > 4) return false;
    if (w.some(function (x) { return /^(?:for|in|of|with|to|that|which|how|what|who|our|my|best|cheap|robots?)$/i.test(x); }) && !CORP_SUFFIX.test(t)) return false;
    if (w.length === 1 && t.length >= 3) return true;
    if (CORP_SUFFIX.test(t)) return true;
    var caps = w.filter(function (x) { return /^[\p{Lu}\p{N}]/u.test(x); }).length;
    return caps >= Math.ceil(w.length / 2) && /^[\p{Lu}]/u.test(t);
  }
  function catOf(id) { return CAT[id] || null; }
  // Our vendors in an area: providers whose fleet-map deployments include that robot type.
  function vendorsInCat(cat, exceptP) {
    var types = TYPE_FOR[cat] || [];
    var names = {};
    FLEET.forEach(function (f) { if (types.indexOf(f.type) >= 0) names[f.vendor.replace(/\s*\+\s*other$/, "")] = 1; });
    return CORE.providers.filter(function (o) {
      if (o === exceptP) return false;
      var fv = o.fleet_vendors || [];
      if (types.length) return fv.some(function (v) { return names[v]; });
      return o._deployments && o._deployments.length && (o.categories || []).indexOf(cat) >= 0;
    }).sort(function (a, b) { return b._fit - a._fit; });
  }
  function peersInCat(cat) {
    return CORE.providers.filter(function (o) { return !o._knock.length && (o.categories || [])[0] === cat; }).sort(function (a, b) { return b._fit - a._fit; });
  }
  function depCounts(list) {
    var n = { deployed: 0, pilot: 0, planned: 0 };
    list.forEach(function (d) { if (n[d.status] != null) n[d.status]++; });
    return n;
  }
  function depText(list) {
    var n = depCounts(list), parts = [];
    if (n.deployed) parts.push(n.deployed + " live");
    if (n.pilot) parts.push(n.pilot + " testing");
    if (n.planned) parts.push(n.planned + " planned");
    return parts.join(", ") || "none";
  }
  function pillarDiff(a, b) {
    var best = null, worst = null;
    (STRAT.pillars || []).forEach(function (pl) {
      var x = (a.pillars && a.pillars[pl.id] && a.pillars[pl.id].score) || 0, y = (b.pillars && b.pillars[pl.id] && b.pillars[pl.id].score) || 0;
      var d = x - y;
      if (!best || d > best.d) best = { pl: pl, d: d };
      if (!worst || d < worst.d) worst = { pl: pl, d: d };
    });
    return { best: best, worst: worst };
  }
  function buildProvider(q, U, web) {
    var p = U.named[0], cat = (p.categories || [])[0];
    var peers = peersInCat(cat);
    var rank = peers.indexOf(p) + 1;
    var ours = vendorsInCat(cat, p);
    var fleetArea = FLEET.filter(function (f) { return (TYPE_FOR[cat] || []).indexOf(f.type) >= 0; });
    var alts = peers.filter(function (o) { return o !== p; }).slice(0, 4);
    return { mode: "provider", q: q, U: U, p: p, cat: cat, peers: peers, rank: rank, ours: ours, fleet: fleetArea, alts: alts,
      pulse: pulseNews({ re: null, term: null, cat: null }, [{ p: p }]), web: web || null, at: Date.now() };
  }
  function buildCompany(q, U, web) {
    var name = q.trim().replace(/[?!.]+$/, "");
    var inferred = null, cat = null;
    if (web && web.inferred) { inferred = WEB.terms.filter(function (t) { return t.id === web.inferred; })[0] || null; cat = inferred ? inferred.cat : web.cat || null; }
    var ours = cat ? vendorsInCat(cat, null) : [];
    var peers = cat ? peersInCat(cat).slice(0, 5) : [];
    var fleetArea = cat ? FLEET.filter(function (f) { return (TYPE_FOR[cat] || []).indexOf(f.type) >= 0; }) : [];
    return { mode: "company", q: q, U: U, name: name, inferred: inferred, cat: cat, ours: ours, peers: peers, fleet: fleetArea, web: web || null, at: Date.now() };
  }

  /* ---------- live news about one company ---------- */
  function companySearches(name, p) {
    var n = '"' + name + '"', W = " when:2y";
    var alias = p && (p.aliases || []).filter(function (a) { return a && a.length > 3 && a.toLowerCase() !== name.toLowerCase(); })[0];
    var s = [["US", n + W], ["US", n + " robot OR robotics OR robots" + W], ["US", n + " raises OR funding OR investment OR acquires" + W],
      ["US", n + " partnership OR deploys OR customer OR contract OR launches" + W], ["AE", n + W], ["GB", n + W]];
    if (alias) s.push(["US", '"' + alias + '"' + W]);
    if (p && p.hq_country === "China") s.push(["ZH", n + W]);
    return s.slice(0, 10);
  }
  function fetchCompany(name, p) {
    var S = companySearches(name, p);
    var url = "/api/scout-news?" + S.map(function (s) { return "s=" + encodeURIComponent(s[0] + "|" + s[1]); }).join("&");
    var names = [name].concat(p ? [shortName(p)].concat(p.aliases || []) : []).filter(function (n) { return n && n.length > 2; });
    var re = new RegExp("\\b(" + names.map(function (n) { return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")\\b", "i");
    return fetch(url).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }).then(function (j) {
      var items = (j.items || []).filter(function (it) { return re.test(it.title); });
      var votes = {};
      items.forEach(function (it) {
        var r = WEB.rankTerms(it.title).filter(function (x) { return x.pick; })[0];
        if (r) votes[r.t.id] = (votes[r.t.id] || 0) + 1;
      });
      var bestId = Object.keys(votes).sort(function (a, b) { return votes[b] - votes[a]; })[0];
      var pick = bestId && votes[bestId] >= 2 ? { t: WEB.terms.filter(function (t) { return t.id === bestId; })[0] } : null;
      var gcc = new RegExp("\\b(" + ((STRAT.web_scout && STRAT.web_scout.gcc_words) || "UAE|Dubai|Saudi") + ")\\b", "i");
      return {
        mode: "company", checked: j.checked, total: items.length, inferred: pick ? pick.t.id : null,
        gccNews: items.filter(function (it) { return gcc.test(it.title); }).length,
        articles: items.slice(0, 14).map(function (it) { return { title: it.title, link: it.link, source: it.source, published: it.published }; }),
        companies: []
      };
    });
  }

  /* ---------- contact and outreach ---------- */
  function outreachText(name, areaLabel, p) {
    var prod = p && p.products && p.products.length ? p.products.slice(0, 3).join(", ") : "your solutions";
    return {
      subject: "Aldar Robotics: introduction and request for information",
      body: "Hello " + name + " team,\n\n" +
        "I am with the Robotics team at Aldar Properties in Abu Dhabi. We deploy robotics across our communities, malls, offices, schools and construction sites" +
        (areaLabel ? ", and we are reviewing providers for " + areaLabel.toLowerCase() : "") + ".\n\n" +
        "We would like to learn more about " + prod + ", in particular:\n" +
        "- live deployments at comparable sites, with references we could speak to\n" +
        "- presence and support in the UAE and GCC, and performance in heat and dust\n" +
        "- safety certification, integration (lifts, doors, BMS/FM systems) and data handling\n" +
        "- commercial models (purchase, robot-as-a-service or operated service)\n\n" +
        "Could you share a capability deck and suggest a time for an introductory call?\n\n" +
        "Kind regards,\n\nAldar Robotics team\n"
    };
  }
  function mailto(to, o) { return "mailto:" + (to || "") + "?subject=" + encodeURIComponent(o.subject) + "&body=" + encodeURIComponent(o.body); }
  function contactCard(name, p, areaLabel) {
    var c = (p && p.contact) || {};
    var site = c.website || (p && p.website) || null;
    var o = outreachText(name, areaLabel, p);
    var rows = [];
    var link = function (u, t) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(t || u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) + "</a>"; };
    if (site) rows.push(["Website", link(site)]);
    if (c.contact_page) rows.push(["Contact page", link(c.contact_page, "Contact form / page")]);
    if (c.email) rows.push(["Email", '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>"]);
    if (c.phone) rows.push(["Phone", '<a href="tel:' + esc(String(c.phone).replace(/[^\d+]/g, "")) + '">' + esc(c.phone) + "</a>"]);
    if (c.hq_address) rows.push(["Head office", esc(c.hq_address)]);
    if (c.linkedin) rows.push(["LinkedIn", link(c.linkedin, "Company page")]);
    var reg = (c.regional || []).filter(function (r) { return r && r.name; });
    var regHtml = reg.length ? '<div class="regional"><h3>Regional and GCC routes</h3>' + reg.map(function (r) {
      return '<div class="rg"><b>' + esc(r.name) + "</b>" + (r.role || r.region ? "<small>" + esc([r.role, r.region].filter(Boolean).join(" · ")) + "</small>" : "") +
        '<span class="rgl">' + [r.url ? link(r.url, "Website") : "", r.email ? '<a href="mailto:' + esc(r.email) + '">' + esc(r.email) + "</a>" : "", r.phone ? esc(r.phone) : ""].filter(Boolean).join(" · ") + "</span></div>";
    }).join("") + "</div>" : (p && p.partners && p.partners.length ? '<div class="regional"><h3>Known partners</h3><p>' + esc(p.partners.join(", ")) + "</p></div>" : "");
    var g = WEB.google;
    var finders = '<div class="digs"><span>Find more:</span>' +
      (site ? "" : '<a href="' + esc(g(name + " official website robotics")) + '" target="_blank" rel="noopener">Official website</a>') +
      '<a href="' + esc(g(name + " robotics contact sales email")) + '" target="_blank" rel="noopener">Sales contact</a>' +
      '<a href="' + esc(g(name + " UAE OR Dubai OR \"Abu Dhabi\" distributor OR partner")) + '" target="_blank" rel="noopener">UAE partner</a>' +
      '<a href="' + esc(g("site:linkedin.com/company " + name)) + '" target="_blank" rel="noopener">LinkedIn</a></div>';
    var mainTo = c.email || (reg.filter(function (r) { return r.email; })[0] || {}).email || "";
    return '<div class="contact">' +
      (rows.length ? '<dl class="cdl">' + rows.map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + r[1] + "</dd>"; }).join("") + "</dl>" :
        '<p class="empty">No contact details on file yet. Use the searches below, or add the company to the research list.</p>') +
      regHtml + (c.note ? '<p class="note">' + esc(c.note) + "</p>" : "") +
      '<div class="reach"><a class="rbtn primary" href="' + esc(mailto(mainTo, o)) + '">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg>' +
        (mainTo ? "Draft email to " + esc(mainTo) : "Draft an outreach email") + "</a>" +
        (c.contact_page ? '<a class="rbtn" href="' + esc(c.contact_page) + '" target="_blank" rel="noopener">Open contact form</a>' : "") +
        '<button type="button" class="rbtn" data-act="copy-outreach">Copy outreach note</button></div>' +
      finders + (c.sources && c.sources.length ? '<p class="note">Contact details from: ' + c.sources.slice(0, 3).map(function (u) { return link(u, host(u)); }).join(", ") + ". Public company contacts only; check before sending.</p>" : "") +
      "</div>";
  }
  function host(u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return u; } }

  /* ---------- provider brief ---------- */
  function compareTable(target, others, noYou) {
    var rows = [target].concat(others).slice(0, 6);
    var pls = STRAT.pillars || [];
    return '<div class="tscroll"><table class="cmpx"><thead><tr><th>Provider</th><th>Score</th><th>Verdict</th><th>Maturity</th><th>GCC presence</th>' +
      pls.map(function (pl) { return '<th class="pl" title="' + esc(pl.label) + '">' + esc(pl.label.split(" ")[0]) + "</th>"; }).join("") + "<th>With Aldar</th></tr></thead><tbody>" +
      rows.map(function (o) {
        return '<tr class="' + (o === target && !noYou ? "me" : "") + '"><td><button type="button" class="lnk" data-open="' + esc(o.id) + '">' + esc(shortName(o)) + "</button>" + (o === target && !noYou ? ' <span class="you">this provider</span>' : "") + "</td>" +
          '<td class="num"><b>' + o._fit + "</b></td><td>" + CORE.verdictPill(o) + "</td><td>" + esc(CORE.matLabel(o)) + "</td><td>" + esc(CORE.gccLabel(o)) + "</td>" +
          pls.map(function (pl) { var s = o.pillars && o.pillars[pl.id] ? o.pillars[pl.id].score : null; return '<td class="num">' + (s == null ? "–" : CORE.dots(s)) + "</td>"; }).join("") +
          "<td>" + (o._deployments && o._deployments.length ? esc(depText(o._deployments)) : "–") + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }
  function providerRead(B) {
    var p = B.p, c = catOf(B.cat), area = c ? lowerFirst(c.label) : "its area";
    var out = [];
    var mine = p._deployments && p._deployments.length;
    out.push("<b>" + esc(shortName(p)) + "</b> is in Scout's memory with an Aldar Fit Score of <b>" + p._fit + "</b> (" + esc(CORE.verdicts[p._verdict].label) + "). " +
      (B.rank ? "It ranks <b>#" + B.rank + " of " + B.peers.length + "</b> researched providers in " + esc(area) + "." : "") +
      (mine ? " It is <b>already working with Aldar</b> (" + esc(depText(p._deployments)) + ")." : " It is <b>not yet working with Aldar</b>."));
    var cmp = mine ? B.alts.slice(0, 3) : B.ours.slice(0, 3);
    if (cmp.length) {
      out.push((mine ? "Against the strongest challengers in " + esc(area) + ": " : "Compared with the vendors we already use in " + esc(area) + ": ") + cmp.map(function (o) {
        var d = p._fit - o._fit, pd = pillarDiff(p, o);
        var lead = d > 0 ? "<b>" + d + " points ahead of</b> " : d < 0 ? "<b>" + (-d) + " points behind</b> " : "level with ";
        var why = d >= 0 && pd.best.d > 0 ? " (stronger on " + esc(pd.best.pl.label.toLowerCase()) + ")" : d < 0 && pd.worst.d < 0 ? " (weaker on " + esc(pd.worst.pl.label.toLowerCase()) + ")" : "";
        return lead + esc(shortName(o)) + " (" + o._fit + ")" + why;
      }).join("; ") + ".");
    } else {
      out.push(mine ? "There are no other researched providers in " + esc(area) + " to compare against yet." : "Aldar has no current vendor in " + esc(area) + ", so " + esc(shortName(p)) + " would be compared against the strongest researched alternatives below.");
    }
    var pl = p.pillars || {}, strong = [], weak = [];
    (STRAT.pillars || []).forEach(function (x) { var s = pl[x.id] && pl[x.id].score; if (s >= 4) strong.push(x.label.toLowerCase()); if (s != null && s <= 2) weak.push(x.label.toLowerCase()); });
    out.push("As a candidate: " + (strong.length ? "strong on " + esc(listJoin(strong)) : "no standout strengths") + (weak.length ? "; weaker on " + esc(listJoin(weak)) : "") +
      ". Maturity: " + esc(CORE.matLabel(p).replace(/^\d · /, "")) + "; " + esc(lowerFirst(CORE.gccLabel(p))) + "; vendor viability risk " + esc(p.viability_risk || "unknown") + "." +
      (p._knock.length ? " <b>Note: it fails a knock-out check</b> (see the profile)." : ""));
    return out;
  }
  function providerNext(B) {
    var p = B.p, s = [];
    var mine = p._deployments && p._deployments.length;
    if (p._knock.length) s.push("Resolve the knock-out flag (" + p._knock.join(", ").replace(/_/g, " ") + ") with procurement and legal before any engagement.");
    if (mine) s.push("Review the results of our " + shortName(p) + " deployments before expanding; benchmark them against " + (B.alts[0] ? shortName(B.alts[0]) : "the strongest alternative") + ".");
    else s.push("Reach out using the contact routes above with the outreach note, and request a capability deck and references.");
    if (!(p.gcc && (p.gcc.level === "uae_deployments" || p.gcc.level === "local_office"))) s.push("Confirm a UAE partner, local support and heat and dust ratings before any trial.");
    if (B.ours[0] && !mine) s.push("Set up a side-by-side trial against " + shortName(B.ours[0]) + " (our current vendor) on the same site and KPIs.");
    if (p._verdict !== "shortlist") s.push("Ask for evidence that would lift its weakest scores, such as named references and certifications, before shortlisting.");
    s.push("Save this brief and share it with the robotics team.");
    return s;
  }
  function companyNews(W) {
    if (!W) return '<div class="webwait"><div class="orb sm" aria-hidden="true"><span></span></div>Scanning the news…</div>';
    if (W.error) return '<p class="empty">The live news scan did not answer (' + esc(W.error) + ").</p>";
    if (!W.articles || !W.articles.length) return '<p class="empty">No news headlines naming this company in the last two years.</p>';
    return '<ul class="sig">' + W.articles.slice(0, 10).map(function (n) {
      return '<li><a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.title) + "</a><small>" + esc([n.source, fmtDate(n.published)].filter(Boolean).join(" · ")) + "</small></li>";
    }).join("") + "</ul>";
  }
  function headActions(B, kicker) {
    var saved = isSaved(B.q);
    return '<div class="bacts">' +
      '<button type="button" class="bact" data-act="save" title="Save this brief" aria-label="Save this brief" aria-pressed="' + saved + '"><svg viewBox="0 0 24 24" width="13" height="13" fill="' + (saved ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg><span class="lbl">' + (saved ? "Saved" : "Save") + "</span></button>" +
      '<button type="button" class="bact" data-act="share" title="Share a link to this brief" aria-label="Share a link to this brief"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg><span class="lbl">Share</span></button>' +
      '<button type="button" class="bact" data-act="pdf" title="Download as PDF" aria-label="Download as PDF"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span class="lbl">PDF</span></button>' +
      '<button type="button" class="bact" data-act="md" title="Download as a text file" aria-label="Download as a text file"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/></svg><span class="lbl">Text</span></button>' +
      '<button type="button" class="bact primary" data-act="new" title="Start a new scout" aria-label="Start a new scout"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span class="lbl">New scout</span></button></div>';
  }
  function renderProvider(B) {
    var p = B.p, c = catOf(B.cat), U = B.U, mineP = !!(p._deployments && p._deployments.length);
    var tags = [];
    if (c) tags.push('<span class="btag" style="--c:' + esc(c.color) + '"><i></i>' + esc(c.label) + "</span>");
    tags.push(readAs(U));
    if (p._deployments && p._deployments.length) tags.push('<span class="btag pri">Working with Aldar</span>');
    var html =
      '<header class="bhead"><div><div class="beyebrow"><span class="dot"></span>Provider brief · ' + esc(fmtDate(B.at)) + "</div>" +
        '<h1 id="bTitle">' + esc(shortName(p)) + '<small class="bsub">' + esc([p.hq_country, p.founded ? "founded " + p.founded : null].filter(Boolean).join(" · ")) + "</small></h1>" +
        '<div class="btags">' + tags.join("") + "</div></div>" + headActions(B) + "</header>" +
      '<div class="paper"><div class="bbody">' +
        '<section class="bcard"><h2>Scout’s read</h2><div class="read"><div class="txt"><p>' + esc(p.what || "") + "</p>" + providerRead(B).map(function (x) { return "<p>" + x + "</p>"; }).join("") + "</div>" +
          '<div class="cand"><div class="cring">' + CORE.ring(p._fit, 96) + "<div>" + CORE.verdictPill(p) + "<small>Aldar Fit Score</small><small>Confidence: " + esc(cap1(p.confidence || "unknown")) + "</small></div></div>" +
            '<div class="tiles">' +
              '<div class="tile"><b>' + (B.rank ? "#" + B.rank : "–") + "</b><span>of " + B.peers.length + " in " + esc(c ? c.label : "area") + "</span></div>" +
              '<div class="tile"><b>' + (p.maturity || "–") + "</b><span>" + esc(((CORE.maturity[p.maturity] || {}).label) || "Maturity") + " (of 5)</span></div>" +
              '<div class="tile"><b>' + (p._deployments ? p._deployments.length : 0) + "</b><span>Aldar deployments</span></div>" +
              '<div class="tile gold"><b>' + esc(cap1(p.viability_risk || "–")) + "</b><span>Viability risk</span></div>" +
            '</div><button type="button" class="rbtn wide" data-open="' + esc(p.id) + '">Open the full profile and sources</button></div></div></section>' +
        '<section class="bcard"><h2>How it compares with our deployments</h2><p class="sub">' +
          (mineP ? esc(shortName(p)) + " is already an Aldar vendor in this area. Here it is against our other vendors there and the strongest challengers." :
            B.ours.length ? "This provider against the vendors Aldar already uses in " + esc(c ? lowerFirst(c.label) : "this area") + "." : "Aldar has no current vendor in this area; compared with the strongest researched alternatives.") + "</p>" +
          compareTable(p, mineP ? uniqueArr(B.ours.slice(0, 2).concat(B.alts.slice(0, 3))).slice(0, 5) : B.ours.length ? B.ours.slice(0, 4) : B.alts.slice(0, 4)) +
          (B.fleet.length ? '<p class="note">Aldar has ' + plural(B.fleet.length, "deployment") + " in " + esc(c ? lowerFirst(c.label) : "this area") + " (" + esc(depText(B.fleet)) + ") across " + esc(listJoin(uniqueVendors(B.fleet).slice(0, 5))) + '. <a href="index.html">Open the fleet map</a></p>' : "") + "</section>" +
        '<section class="bcard half"><h2>Contact and reach-out</h2><p class="sub">Public company contact routes, so the team can follow through.</p>' + contactCard(shortName(p), p, c ? c.label : "") + "</section>" +
        '<section class="bcard half"><h2>In the news</h2><p class="sub">Market Pulse and a live Google News scan for this company.</p><div id="sigBox">' +
          (B.pulse.length ? '<ul class="sig">' + B.pulse.map(function (n) { return '<li><a href="' + esc(n.link) + '" target="_blank" rel="noopener"><span class="tagp">Pulse</span>' + esc(n.title) + "</a><small>" + esc([n.source, fmtDate(n.published)].filter(Boolean).join(" · ")) + "</small></li>"; }).join("") + "</ul>" : "") +
          companyNews(B.web) + "</div></section>" +
        '<section class="bcard"><h2>Alternatives to consider <span class="n">' + B.alts.length + "</span></h2>" +
          (B.alts.length ? '<div class="pgrid2">' + B.alts.map(function (o, i) { return provCard({ p: o }, i); }).join("") + "</div>" : '<p class="empty">No other researched providers in this area yet.</p>') + "</section>" +
        '<section class="bcard"><h2>Suggested next steps</h2><ol class="next">' + providerNext(B).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></section>" +
        '<p class="method"><b>How this brief was made.</b> The provider’s scores come from Scout’s provider memory (researched profiles with sources, checked ' + esc(p.checked || "") + "). Comparisons use the Aldar Fit Score weights in Scout’s strategy settings and our deployments on the fleet map. News comes from Market Pulse and a live Google News scan. Contact details are public company contacts; check before sending.</p>" +
      "</div></div>";
    $("brief").innerHTML = html;
  }
  function renderCompany(B) {
    var U = B.U, c = catOf(B.cat), W = B.web || {};
    var tags = [];
    if (c) tags.push('<span class="btag" style="--c:' + esc(c.color) + '"><i></i>Likely ' + esc(c.label) + "</span>");
    tags.push(readAs(U));
    tags.push('<span class="btag">Not yet in Scout’s memory</span>');
    var read = [];
    read.push("<b>" + esc(B.name) + "</b> is not in Scout’s provider memory yet, so it has no Fit Score. Here is what the market says, and how it would be judged.");
    if (W.articles) read.push(W.total ? "The live news scan found <b>" + plural(W.total, "headline") + "</b> naming it in the last two years" + (W.gccNews ? ", " + W.gccNews + " mentioning the Gulf" : "") + "." : "The live news scan found <b>no headlines</b> naming it in the last two years. Check the spelling, or look it up with the searches below.");
    if (B.inferred) read.push("From the headlines it looks like a <b>" + esc(B.inferred.en[0]) + "</b> provider (" + esc(c ? c.label : "") + "). If that is wrong, change <b>Read as</b> above.");
    if (B.ours.length) read.push("In that area Aldar already works with " + esc(listJoin(B.ours.slice(0, 3).map(function (o) { return shortName(o) + " (Fit " + o._fit + ")"; }))) + ". Those are the bar it would need to beat.");
    read.push("To score it properly, add it to the research list: Claude will build a full profile with scores, sources and contacts.");
    var html =
      '<header class="bhead"><div><div class="beyebrow"><span class="dot"></span>Company lookup · ' + esc(fmtDate(B.at)) + "</div>" +
        '<h1 id="bTitle">' + esc(B.name) + "</h1>" + '<div class="btags">' + tags.join("") + "</div></div>" + headActions(B) + "</header>" +
      '<div class="paper"><div class="bbody">' +
        '<section class="bcard"><h2>Scout’s read</h2><div class="read"><div class="txt">' + read.map(function (x) { return "<p>" + x + "</p>"; }).join("") + "</div>" +
          '<div class="cand"><div class="tiles"><div class="tile"><b>' + (W.total || 0) + "</b><span>Headlines naming it</span></div>" +
          '<div class="tile"><b>' + (W.gccNews || 0) + "</b><span>Mention the Gulf</span></div>" +
          '<div class="tile"><b>' + B.fleet.length + "</b><span>Aldar deployments in this area</span></div>" +
          '<div class="tile gold"><b>–</b><span>Fit Score (research to add)</span></div></div>' +
          '<button type="button" class="rbtn wide primary" data-todo="' + esc(B.name) + '" data-todo-q="' + esc(B.q) + '">+ To research</button></div></div></section>' +
        '<section class="bcard half"><h2>In the news</h2><p class="sub">Live Google News headlines naming this company.</p>' + companyNews(W) + "</section>" +
        '<section class="bcard half"><h2>Contact and reach-out</h2><p class="sub">Not researched yet: find the official routes, then draft an approach.</p>' + contactCard(B.name, null, c ? c.label : "") + "</section>" +
        '<section class="bcard"><h2>How it would be judged</h2><p class="sub">Questions to answer before it can be compared with our vendors' + (B.ours.length ? " (" + esc(listJoin(B.ours.slice(0, 3).map(shortName))) + ")" : "") + ".</p>" +
          '<ul class="good">' + goodLooks() + "</ul>" +
          (function () {
            var bar = uniqueArr(B.ours.concat(B.peers)).slice(0, 5);
            return bar.length ? '<p class="sub" style="margin-top:14px">The bar in this area' + (B.ours.length ? " (our vendors first)" : "") + ":</p>" + compareTable(bar[0], bar.slice(1), true) : "";
          })() + "</section>" +
        '<section class="bcard"><h2>Suggested next steps</h2><ol class="next">' +
          ["Add " + B.name + " to the research list and send it to Claude for a full profile, scores and contacts.",
           "Visit its website and LinkedIn page (searches above) to confirm what it makes and where it operates.",
           B.ours[0] ? "If it looks relevant, compare it against " + shortName(B.ours[0]) + ", our current vendor in this area." : "If it looks relevant, ask for references at comparable sites and a UAE support route.",
           "Save this lookup to come back to it."].map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></section>" +
        '<p class="method"><b>How this lookup was made.</b> A live scan of Google News for the company name over the last two years; the likely area is read from the headlines. Aldar comparisons come from the fleet map and Scout’s provider memory.</p>' +
      "</div></div>";
    $("brief").innerHTML = html;
    refreshTodo();
  }

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
    var co = U.mode === "provider" || U.mode === "company";
    if (co) cur = "company";
    var coName = U.mode === "provider" ? shortName(U.named[0]) : U.q;
    return '<label class="btag asel" title="Not what you meant? Pick the right reading and Scout will re-scout">Read as' +
      '<select data-act="as" aria-label="Read this question as">' +
        '<optgroup label="A company"><option value="company"' + (co ? " selected" : "") + ">Company: " + esc(coName.length > 40 ? coName.slice(0, 39) + "…" : coName) + "</option></optgroup>" +
        (ranked.length ? '<optgroup label="Best matches for your words">' + ranked.map(opt).join("") + "</optgroup>" : "") + groups +
        '<optgroup label="Other"><option value="none"' + (cur === "none" ? " selected" : "") + ">Nothing specific (exploratory)</option></optgroup>" +
      '</select><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></label>';
  }
  function render(B) {
    if (B.mode === "provider") return renderProvider(B);
    if (B.mode === "company") return renderCompany(B);
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
    var coMode = U.mode === "provider" || U.mode === "company";
    var coName = U.mode === "provider" ? shortName(U.named[0]) : q.replace(/[?!.]+$/, "");
    var webP = opts.web ? Promise.resolve({ snap: opts.web }) :
      (coMode ? fetchCompany(coName, U.mode === "provider" ? U.named[0] : null).then(function (snap) { return { snap: snap }; }) :
      WEB.fetchWeb(q, opts.as).then(function (r) { return { snap: snapshot(r) }; })).catch(function (e) { return { snap: { error: e.message || "no answer" } }; });
    var seq = Promise.resolve();
    var fast = !!opts.fast;
    var T = function (ms) { return wait(fast ? 60 : ms); };
    var nFleet = FLEET.length, nMem = CORE.providers.length;
    var reading = U.mode === "provider" ? "company: " + coName + " (in Scout's memory)" : U.mode === "company" ? "company: " + coName + " (not yet in Scout's memory)" : U.term ? termLabel(U.term) : "nothing specific, so this is exploratory";
    var steps;
    if (coMode) {
      var pp = U.named[0];
      var area = pp ? catOf((pp.categories || [])[0]) : null;
      steps = [["read", "Working out whether this is a company or a technology area…", "Read as " + reading, 1300],
        ["fleet", "Looking through " + nFleet + " deployments for this company and its area…", pp ? (pp._deployments && pp._deployments.length ? plural(pp._deployments.length, "Aldar deployment") : "not yet deployed by Aldar") : "area to be read from the news", 1300],
        ["strategy", "Checking where it fits in Aldar’s robotics strategy…", area ? area.label : "to be read from the news", 1300],
        ["memory", pp ? "Ranking it against " + nMem + " researched providers and our current vendors…" : "Searching " + nMem + " researched providers for this name…", pp ? "Fit " + pp._fit + ", " + CORE.verdicts[pp._verdict].label.toLowerCase() : "not in memory yet", 1300]];
    } else {
      steps = [["read", "Working out what is being scouted, and which focus area it belongs to…", "Read as: " + reading, 1300],
        ["fleet", "Looking through " + nFleet + " deployments and trials on the fleet map…", plural(B0.fleet.length, "deployment") + " in this area", 1300],
        ["strategy", "Matching it to the eight focus areas and named use cases in Aldar’s robotics strategy…", B0.strat.named ? "named use case: " + B0.strat.named : B0.strat.pri ? "focus area: " + B0.strat.pri.label : "not a named focus area", 1300],
        ["memory", "Comparing " + nMem + " researched providers and ranking them by Aldar Fit Score…", plural(B0.live.length, "matching provider"), 1300]];
    }
    steps.forEach(function (x) {
      seq = seq.then(function () { st[x[0]] = { cls: "on", doing: x[1] }; draw(); return T(x[3]); })
        .then(function () { st[x[0]] = { cls: "ok", note: x[2] }; draw(); return T(250); });
    });
    var t0;
    return seq.then(function () {
      t0 = Date.now();
      st.web = { cls: "on", doing: opts.web ? "Using the scan saved with this brief…" : coMode ? "Searching Google News for headlines naming " + coName + "…" : "Running 10 Google News searches across English, UAE and Chinese editions, and picking out the companies named…" }; draw();
      return webP;
    }).then(function (res) {
      var left = Math.max(0, (fast ? 0 : 1800) - (Date.now() - t0));
      return wait(left).then(function () { return res; });
    }).then(function (res) {
      var snap = res.snap;
      st.web = snap.error ? { cls: "warn", note: "did not answer" } : coMode ? { cls: "ok", note: plural(snap.total || 0, "headline") + " naming it" } : { cls: "ok", note: plural(snap.total || 0, "article") + ", " + plural((snap.companies || []).length, "new company", "new companies") };
      st.write = { cls: "on", doing: coMode ? "Pulling it together: candidate strength, comparison with our vendors, contacts and next steps…" : "Pulling it together: Aldar experience, strategy fit, best-fit providers, new names and next steps…" }; draw();
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
      L.unshift({ q: current.q, as: current.U.as || (current.mode !== "topic" ? "company" : null), at: current.at, web: current.web && !current.web.error ? current.web : null, cat: current.U.cat });
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
    if (B.mode !== "topic") return markdownCo(B);
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
  function markdownCo(B) {
    var strip = function (h) { return h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">"); };
    var L = [], p = B.p, c = catOf(B.cat);
    var name = p ? shortName(p) : B.name;
    L.push("# " + (p ? "Provider brief" : "Company lookup") + ": " + name, "", "Aldar Market Scout · " + fmtDate(B.at) + (c ? " · " + c.label : ""), "");
    L.push("## Scout's read", "");
    if (p) { L.push(p.what || "", ""); providerRead(B).forEach(function (x) { L.push(strip(x), ""); }); }
    else L.push(B.name + " is not yet in Scout's provider memory." + (B.inferred ? " Likely area: " + B.inferred.en[0] + "." : ""), "");
    if (p) {
      L.push("## Compared with our vendors", "", "| Provider | Fit | Verdict | Maturity | GCC | With Aldar |", "|---|---|---|---|---|---|");
      [p].concat(B.ours.length ? B.ours.slice(0, 4) : B.alts.slice(0, 4)).forEach(function (o) { L.push("| " + shortName(o) + " | " + o._fit + " | " + CORE.verdicts[o._verdict].label + " | " + CORE.matLabel(o) + " | " + CORE.gccLabel(o) + " | " + (o._deployments && o._deployments.length ? depText(o._deployments) : "-") + " |"); });
      L.push("");
    }
    var ct = (p && p.contact) || {};
    L.push("## Contact", "");
    [["Website", ct.website || (p && p.website)], ["Contact page", ct.contact_page], ["Email", ct.email], ["Phone", ct.phone], ["Head office", ct.hq_address], ["LinkedIn", ct.linkedin]].forEach(function (r) { if (r[1]) L.push("- " + r[0] + ": " + r[1]); });
    (ct.regional || []).forEach(function (r) { L.push("- " + [r.role, r.region].filter(Boolean).join(", ") + ": " + r.name + (r.email ? ", " + r.email : "") + (r.phone ? ", " + r.phone : "") + (r.url ? ", " + r.url : "")); });
    if (!ct.email && !ct.phone && !ct.website && !(p && p.website)) L.push("- Not researched yet.");
    var o = outreachText(name, c ? c.label : "", p);
    L.push("", "## Outreach note", "", "Subject: " + o.subject, "", o.body);
    if (B.web && B.web.articles && B.web.articles.length) { L.push("## In the news", ""); B.web.articles.slice(0, 8).forEach(function (a) { L.push("- " + a.title + " (" + a.link + ")"); }); L.push(""); }
    L.push("## Suggested next steps", "");
    (p ? providerNext(B) : ["Add " + B.name + " to the research list for a full profile."]).forEach(function (x, i) { L.push((i + 1) + ". " + x); });
    L.push("", "---", "Open this brief: " + location.origin + location.pathname + "?q=" + encodeURIComponent(B.q) + (B.U.as ? "&as=" + encodeURIComponent(B.U.as) : ""));
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
    else if (a === "copy-outreach") {
      var pp = current.p, cc = catOf(current.cat);
      var o = outreachText(pp ? shortName(pp) : current.name, cc ? cc.label : "", pp);
      var txt = "Subject: " + o.subject + "\n\n" + o.body;
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast("Outreach note copied"); }, function () { prompt("Copy this note", txt); });
      else prompt("Copy this note", txt);
    }
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
