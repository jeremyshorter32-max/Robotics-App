/* Aldar Robotics Scout.
   Reads window.SCOUT_DATA (providers), window.SCOUT_STRATEGY (weights and rules),
   window.FLEET_DATA / window.CONSTRUCTION_DATA (our own deployments) and
   window.INTEL_FEED (Market Pulse news). All scoring happens here, in the browser,
   so changing a weight re-ranks every provider without new research. */
(function () {
  "use strict";

  var DATA = window.SCOUT_DATA || { meta: {}, providers: [] };
  var STRAT = window.SCOUT_STRATEGY || {};
  var CATS = (DATA.meta && DATA.meta.categories) || [];
  var CAT = {};
  CATS.forEach(function (c) { CAT[c.id] = c; });
  var PILLARS = STRAT.pillars || [];
  var DEFAULT_W = PILLARS.map(function (p) { return p.weight; });
  var MAT = {};
  (STRAT.maturity_stages || []).forEach(function (m) { MAT[m.n] = m; });
  var GCC = {}, GCC_ORDER = {};
  (STRAT.gcc_levels || []).forEach(function (g, i) { GCC[g.id] = g; GCC_ORDER[g.id] = i; });
  var Q = STRAT.quadrants || {};
  var QUAD = {};
  ["tr", "tl", "br", "bl"].forEach(function (k) { if (Q[k]) QUAD[Q[k].id] = Q[k]; });
  var TODAY = new Date();
  var MAX_COMPARE = 5;

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function uniq(a) { var s = {}, o = []; a.forEach(function (x) { if (x != null && x !== "" && !s[x]) { s[x] = 1; o.push(x); } }); return o; }
  function cap(s) { s = String(s || ""); return s.charAt(0).toUpperCase() + s.slice(1); }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : null; }
  function host(u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return ""; } }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem("scout." + k)); localStorage.setItem("scout." + k, JSON.stringify(v)); } catch (e) { return null; } }

  /* ---------- our deployments (fleet map) ---------- */
  var STATUS = { deployed: "Live", pilot: "Testing", planned: "Planned" };
  var FLEET = [];
  [["rc", window.FLEET_DATA], ["construction", window.CONSTRUCTION_DATA]].forEach(function (pair) {
    var D = pair[1];
    if (!D || !D.fleet) return;
    var assets = {};
    (D.assets || []).forEach(function (a) { assets[a.id] = a; });
    D.fleet.forEach(function (r) {
      var a = assets[r.asset_id] || {};
      FLEET.push({ layer: pair[0], vendor: r.vendor || "", model: r.model || "", use_case: r.use_case || "",
        status: r.status, site: a.name || r.asset_id || "", update: r.update || "" });
    });
  });

  /* ---------- Market Pulse news ---------- */
  var NEWS = [];
  (function () {
    var F = window.INTEL_FEED;
    if (!F || !F.editions) return;
    var seen = {};
    F.editions.forEach(function (e) {
      (e.posts || []).forEach(function (p) {
        if (seen[p.url]) return;
        seen[p.url] = 1;
        NEWS.push({ headline: p.headline, company: p.company || "", url: p.url, source: p.source, published: p.published,
          text: [p.headline, p.company, p.summary].join(" ") });
      });
    });
  })();

  /* ---------- prepare providers ---------- */
  function monthsSince(ym) {
    var m = /^(\d{4})-(\d{1,2})/.exec(ym || "");
    if (!m) return null;
    return (TODAY.getFullYear() - +m[1]) * 12 + (TODAY.getMonth() + 1 - +m[2]);
  }
  function nameRe(names) {
    var parts = names.filter(function (n) { return n && n.length > 2; }).map(function (n) {
      return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    return parts.length ? new RegExp("\\b(" + parts.join("|") + ")\\b") : null;
  }

  var P = DATA.providers.map(function (p) {
    var names = uniq([p.name].concat(p.aliases || []));
    var fleetNames = p.fleet_vendors || [];
    var seenDep = {};
    var deployments = FLEET.filter(function (f) {
      if (!fleetNames.some(function (n) { return f.vendor === n || f.vendor.indexOf(n + " +") === 0; })) return false;
      var k = f.site + "|" + f.model + "|" + f.status;
      if (seenDep[k]) return false;
      return (seenDep[k] = true);
    });
    var re = nameRe(names);
    var news = re ? NEWS.filter(function (n) { return re.test(n.text); }) : [];
    var fund = p.funding || {};
    var since = monthsSince(fund.last_round_date);
    var o = Object.assign({}, p, {
      _names: names,
      _deployments: deployments,
      _news: news,
      _since: since,
      _raising: !fund.public && since != null && since >= 12 && since <= 24,
      _recent: since != null && since <= 18,
      _knock: ["sanctions", "no_product", "uae_blocked"].filter(function (k) { return p.knockouts && p.knockouts[k]; }),
      _hay: [p.name].concat(names, p.what, p.products || [], p.use_cases || [], p.customers || [], p.partners || [],
        p.hq_country, p.operates_in || [], (p.categories || []).map(function (c) { return CAT[c] ? CAT[c].label : c; }))
        .join(" ").toLowerCase()
    });
    return o;
  });
  var BYID = {};
  P.forEach(function (p) { BYID[p.id] = p; });

  /* ---------- scoring ---------- */
  function score(p, w) {
    var tot = 0, sum = 0;
    PILLARS.forEach(function (pl, i) {
      var s = p.pillars && p.pillars[pl.id] ? +p.pillars[pl.id].score || 0 : 0;
      tot += w[i]; sum += (s / 5) * w[i];
    });
    return tot ? Math.round((sum / tot) * 100) : 0;
  }
  function verdictOf(p) {
    if (p._knock.length) return "knocked";
    var v = STRAT.verdict || {};
    var sl = v.shortlist || { min_score: 70, min_pillar: { deployments: 3 } };
    var ok = p._fit >= sl.min_score;
    Object.keys(sl.min_pillar || {}).forEach(function (k) {
      if (!(p.pillars && p.pillars[k] && p.pillars[k].score >= sl.min_pillar[k])) ok = false;
    });
    if (ok) return "shortlist";
    if (p._fit >= ((v.watch && v.watch.min_score) || 50)) return "watch";
    return "pass";
  }
  function quadrantOf(p) {
    var sp = Q.split || { fit: 60, maturity: 3 };
    var hiF = p._fit >= sp.fit, hiM = (p.maturity || 0) >= sp.maturity;
    return (hiF ? (hiM ? Q.tr : Q.tl) : (hiM ? Q.br : Q.bl)).id;
  }
  var VERDICT = {
    shortlist: { label: "Shortlist", cls: "v-short" },
    watch: { label: "Watch", cls: "v-watch" },
    pass: { label: "Pass", cls: "v-pass" },
    knocked: { label: "Knocked out", cls: "v-knock" }
  };
  var KNOCK = {};
  (STRAT.knockouts || []).forEach(function (k) { KNOCK[k.id] = k.label; });

  /* ---------- state ---------- */
  var state = {
    view: "providers", q: "", filters: [], sort: "fit", minFit: 0, showKnocked: true,
    w: DEFAULT_W.slice(), compare: [], profile: null, preset: null
  };

  function rescore() {
    P.forEach(function (p) {
      p._fit = score(p, state.w);
      p._verdict = verdictOf(p);
      p._quad = quadrantOf(p);
    });
  }

  /* ---------- filter fields ---------- */
  var FIELDS = {
    category: { label: "Category", multi: true, get: function (p) { return p.categories || []; },
      opts: function () { return CATS.map(function (c) { return [c.id, c.label]; }); } },
    asset: { label: "Asset type", multi: true, get: function (p) { return p.asset_types || []; },
      opts: function () { return uniq([].concat.apply([], P.map(function (p) { return p.asset_types || []; }))).sort().map(function (x) { return [x, cap(x)]; }); } },
    operates: { label: "Operates in", multi: true, get: function (p) { return p.operates_in || []; },
      opts: function () { return uniq([].concat.apply([], P.map(function (p) { return p.operates_in || []; }))).sort().map(function (x) { return [x, x]; }); } },
    hq: { label: "Head office", get: function (p) { return [p.hq_country]; },
      opts: function () { return uniq(P.map(function (p) { return p.hq_country; })).sort().map(function (x) { return [x, x]; }); } },
    gcc: { label: "GCC presence", get: function (p) { return [p.gcc && p.gcc.level]; },
      opts: function () { return (STRAT.gcc_levels || []).map(function (g) { return [g.id, g.label]; }); } },
    maturity: { label: "Maturity", get: function (p) { return [String(p.maturity)]; },
      opts: function () { return (STRAT.maturity_stages || []).map(function (m) { return [String(m.n), m.n + " " + m.label]; }); } },
    verdict: { label: "Verdict", get: function (p) { return [p._verdict]; },
      opts: function () { return Object.keys(VERDICT).map(function (k) { return [k, VERDICT[k].label]; }); } },
    quadrant: { label: "Matrix quadrant", get: function (p) { return [p._quad]; },
      opts: function () { return Object.keys(QUAD).map(function (k) { return [k, QUAD[k].label]; }); } },
    model: { label: "Business model", multi: true, get: function (p) { return p.business_model || []; },
      opts: function () { return [["purchase", "Purchase"], ["raas", "Robot-as-a-service"], ["service", "Operated service"]]; } },
    confidence: { label: "Confidence", get: function (p) { return [p.confidence]; },
      opts: function () { return [["high", "High"], ["medium", "Medium"], ["low", "Low"]]; } },
    risk: { label: "Viability risk", get: function (p) { return [p.viability_risk]; },
      opts: function () { return [["low", "Low"], ["medium", "Medium"], ["high", "High"]]; } },
    fleet: { label: "Working with Aldar", get: function (p) { return [p._deployments.length ? "yes" : "no"]; },
      opts: function () { return [["yes", "Yes"], ["no", "No"]]; } },
    funding_recent: { label: "Raised in last 18 months", get: function (p) { return [p._recent ? "yes" : "no"]; },
      opts: function () { return [["yes", "Yes"], ["no", "No"]]; } }
  };
  var OPS = { any: "is any of", none: "is none of", all: "is all of" };

  function fleetCats() {
    return uniq([].concat.apply([], P.filter(function (p) { return p._deployments.length; }).map(function (p) { return (p.categories || []).slice(0, 1); })));
  }
  function matchFilter(p, f) {
    var F = FIELDS[f.field];
    if (!F || !f.values || !f.values.length) return true;
    var vals = f.values.indexOf("__fleet_categories__") >= 0 ? fleetCats() : f.values;
    var have = F.get(p).filter(function (x) { return x != null; }).map(String);
    var hit = vals.filter(function (v) { return have.indexOf(String(v)) >= 0; });
    if (f.op === "none") return hit.length === 0;
    if (f.op === "all") return hit.length === vals.length;
    return hit.length > 0;
  }
  function filtered() {
    var q = state.q.trim().toLowerCase();
    var words = q ? q.split(/\s+/) : [];
    var list = P.filter(function (p) {
      if (!state.showKnocked && p._knock.length) return false;
      if (p._fit < state.minFit) return false;
      for (var i = 0; i < words.length; i++) if (p._hay.indexOf(words[i]) < 0) return false;
      for (var j = 0; j < state.filters.length; j++) if (!matchFilter(p, state.filters[j])) return false;
      return true;
    });
    var s = state.sort;
    list.sort(function (a, b) {
      var ka = a._knock.length ? 1 : 0, kb = b._knock.length ? 1 : 0;
      if (ka !== kb) return ka - kb;
      if (s === "maturity") return (b.maturity || 0) - (a.maturity || 0) || b._fit - a._fit;
      if (s === "gcc") return (GCC_ORDER[b.gcc && b.gcc.level] || 0) - (GCC_ORDER[a.gcc && a.gcc.level] || 0) || b._fit - a._fit;
      if (s === "name") return a.name.localeCompare(b.name);
      return b._fit - a._fit || (b.maturity || 0) - (a.maturity || 0) || a.name.localeCompare(b.name);
    });
    return list;
  }

  /* ---------- URL state (every view can be shared as a link) ---------- */
  function writeUrl() {
    var u = new URLSearchParams();
    if (state.view !== "providers") u.set("view", state.view);
    if (state.q) u.set("q", state.q);
    if (state.filters.length) u.set("f", state.filters.map(function (f) { return f.field + "~" + f.op + "~" + f.values.join("|"); }).join(";"));
    if (state.sort !== "fit") u.set("sort", state.sort);
    if (state.minFit) u.set("min", state.minFit);
    if (!state.showKnocked) u.set("ko", "0");
    if (state.w.join() !== DEFAULT_W.join()) u.set("w", state.w.join("-"));
    if (state.compare.length) u.set("c", state.compare.join(","));
    if (state.profile) u.set("p", state.profile);
    var s = u.toString();
    try { history.replaceState(null, "", location.pathname + (s ? "?" + s : "")); } catch (e) {}
  }
  function readUrl() {
    var u = new URLSearchParams(location.search);
    if (u.get("view")) state.view = u.get("view");
    state.q = u.get("q") || "";
    state.filters = (u.get("f") || "").split(";").filter(Boolean).map(function (s) {
      var a = s.split("~");
      return { field: a[0], op: OPS[a[1]] ? a[1] : "any", values: (a[2] || "").split("|").filter(Boolean) };
    }).filter(function (f) { return FIELDS[f.field]; });
    if (u.get("sort")) state.sort = u.get("sort");
    state.minFit = +u.get("min") || 0;
    if (u.get("ko") === "0") state.showKnocked = false;
    var w = (u.get("w") || "").split("-").map(Number);
    if (w.length === DEFAULT_W.length && w.every(function (x) { return x >= 0; })) state.w = w;
    else { var sw = store("weights"); if (sw && sw.length === DEFAULT_W.length) state.w = sw; }
    state.compare = (u.get("c") || "").split(",").filter(function (id) { return BYID[id]; }).slice(0, MAX_COMPARE);
    state.profile = BYID[u.get("p")] ? u.get("p") : null;
  }

  /* ---------- small renderers ---------- */
  function catChip(id) {
    var c = CAT[id] || { label: id, color: "#999", ink: "#555" };
    return '<span class="cat" style="--c:' + esc(c.color) + ';--ci:' + esc(c.ink) + '"><i></i>' + esc(c.label) + "</span>";
  }
  function verdictPill(p) { var v = VERDICT[p._verdict]; return '<span class="vp ' + v.cls + '">' + v.label + "</span>"; }
  function gccLabel(p) { var g = GCC[p.gcc && p.gcc.level]; return g ? g.label : "Unknown"; }
  function matLabel(p) { var m = MAT[p.maturity]; return m ? p.maturity + " · " + m.label : "Unknown"; }
  function ring(v, size) {
    size = size || 46;
    var r = size / 2 - 4, c = 2 * Math.PI * r, d = c * Math.max(0, Math.min(100, v)) / 100;
    var col = v >= 70 ? "var(--good)" : v >= 50 ? "var(--mid)" : "var(--low)";
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '" aria-hidden="true">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--track)" stroke-width="4"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="4" stroke-dasharray="' + d.toFixed(1) + " " + c.toFixed(1) +
      '" transform="rotate(-90 ' + size / 2 + " " + size / 2 + ')" stroke-linecap="butt"/>' +
      '<text x="50%" y="50%" dy=".35em" text-anchor="middle" class="ring-n">' + v + "</text></svg>";
  }
  function dots(n) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += '<i class="' + (i <= n ? "on" : "") + '"></i>';
    return '<span class="dots" aria-label="' + n + ' of 5">' + s + "</span>";
  }

  /* ---------- hero ---------- */
  function renderHero() {
    var live = P.filter(function (p) { return !p._knock.length; });
    var n = function (f) { return live.filter(f).length; };
    var stats = [
      [P.length, "Providers scored", null],
      [n(function (p) { return p._verdict === "shortlist"; }), "Shortlist", "verdict~any~shortlist"],
      [n(function (p) { return p._quad === "deploy"; }), "Deploy now", "quadrant~any~deploy"],
      [n(function (p) { return p.gcc && (p.gcc.level === "uae_deployments" || p.gcc.level === "local_office"); }), "GCC-ready", "gcc~any~local_office|uae_deployments"],
      [P.filter(function (p) { return p._deployments.length; }).length, "Working with Aldar", "fleet~any~yes"]
    ];
    $("stats").innerHTML = stats.map(function (s) {
      return s[2] ? '<button class="stat" type="button" data-f="' + esc(s[2]) + '"><b>' + s[0] + "</b><span>" + s[1] + "</span></button>"
        : '<div class="stat"><b>' + s[0] + "</b><span>" + s[1] + "</span></div>";
    }).join("");
    $("asOf").textContent = DATA.meta && DATA.meta.checked ? "Research checked " + DATA.meta.checked : "";
  }

  /* ---------- view: providers ---------- */
  function renderPresets() {
    $("presets").innerHTML = (STRAT.presets || []).map(function (pr) {
      return '<button class="chip" type="button" data-preset="' + esc(pr.id) + '" aria-pressed="' + (state.preset === pr.id) + '">' + esc(pr.label) + "</button>";
    }).join("");
  }
  function renderFilters() {
    var html = state.filters.map(function (f, i) {
      var F = FIELDS[f.field];
      var opts = F.opts();
      if (f.values.indexOf("__fleet_categories__") >= 0) {
        f.values = fleetCats();
      }
      return '<div class="fb-row" data-i="' + i + '">' +
        '<label class="tsel"><span class="vh">Field</span><select data-k="field">' +
        Object.keys(FIELDS).map(function (k) { return '<option value="' + k + '"' + (k === f.field ? " selected" : "") + ">" + esc(FIELDS[k].label) + "</option>"; }).join("") +
        '</select><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></label>' +
        '<label class="tsel"><span class="vh">Operator</span><select data-k="op">' +
        Object.keys(OPS).map(function (k) { return '<option value="' + k + '"' + (k === f.op ? " selected" : "") + ">" + OPS[k] + "</option>"; }).join("") +
        '</select><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></label>' +
        '<div class="fb-vals">' + opts.map(function (o) {
          return '<button type="button" class="chip sm" data-v="' + esc(o[0]) + '" aria-pressed="' + (f.values.indexOf(o[0]) >= 0) + '">' + esc(o[1]) + "</button>";
        }).join("") + "</div>" +
        '<button type="button" class="x" data-rm="' + i + '" aria-label="Remove this filter">×</button></div>';
    }).join("");
    $("fbRows").innerHTML = html;
    $("fbClear").hidden = !state.filters.length && !state.q && !state.minFit;
  }
  function row(p, rank) {
    var inCmp = state.compare.indexOf(p.id) >= 0;
    var flags = [];
    if (p._deployments.length) flags.push('<span class="flag f-ours">With Aldar</span>');
    if (p.gcc && p.gcc.level === "uae_deployments") flags.push('<span class="flag f-uae">In UAE</span>');
    if (p._raising) flags.push('<span class="flag f-raise">Likely raising</span>');
    if (p._knock.length) flags.push('<span class="flag f-ko">' + esc(p._knock.map(function (k) { return { sanctions: "Restricted list", no_product: "No product", uae_blocked: "UAE blocked" }[k]; }).join(", ")) + "</span>");
    return '<li class="prow' + (p._knock.length ? " ko" : "") + '">' +
      '<span class="rank">' + rank + "</span>" +
      '<button class="pmain" type="button" data-open="' + esc(p.id) + '">' +
        '<span class="pname">' + esc(p.name) + '<span class="hq">' + esc(p.hq_country || "") + "</span></span>" +
        '<span class="pwhat">' + esc(p.what || "") + "</span>" +
        '<span class="pmeta">' + (p.categories || []).map(catChip).join("") + flags.join("") + "</span>" +
      "</button>" +
      '<span class="pcol mat"><small>Maturity</small>' + esc(matLabel(p)) + "</span>" +
      '<span class="pcol gccc"><small>GCC</small>' + esc(gccLabel(p)) + "</span>" +
      '<span class="pcol fit">' + ring(p._fit) + verdictPill(p) + "</span>" +
      '<label class="cmp" title="Add to compare"><input type="checkbox" data-cmp="' + esc(p.id) + '"' + (inCmp ? " checked" : "") +
        (!inCmp && state.compare.length >= MAX_COMPARE ? " disabled" : "") + '><span>Compare</span></label>' +
      "</li>";
  }
  function renderProviders() {
    var list = filtered();
    $("count").textContent = list.length + " of " + P.length + " providers";
    $("list").innerHTML = list.length ? list.map(function (p, i) { return row(p, i + 1); }).join("")
      : '<li class="empty">No providers match. Loosen a filter, or note the need for a new scout.</li>';
  }

  /* ---------- view: matrix ---------- */
  function renderMatrix() {
    var list = filtered().filter(function (p) { return !p._knock.length; });
    var W = 760, H = 520, m = { l: 54, r: 18, t: 18, b: 48 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var sp = Q.split || { fit: 60, maturity: 3 };
    function x(mat) { return m.l + ((mat - 0.5) / 5) * iw; }
    function y(fit) { return m.t + ih - (fit / 100) * ih; }
    var xs = x(sp.maturity - 0.5), ys = y(sp.fit);
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" class="mx" role="img" aria-label="Fit against maturity matrix">';
    s += '<rect x="' + xs + '" y="' + m.t + '" width="' + (m.l + iw - xs) + '" height="' + (ys - m.t) + '" class="q q-deploy"/>';
    s += '<rect x="' + m.l + '" y="' + m.t + '" width="' + (xs - m.l) + '" height="' + (ys - m.t) + '" class="q q-fast"/>';
    s += '<rect x="' + xs + '" y="' + ys + '" width="' + (m.l + iw - xs) + '" height="' + (m.t + ih - ys) + '" class="q q-proven"/>';
    s += '<rect x="' + m.l + '" y="' + ys + '" width="' + (xs - m.l) + '" height="' + (m.t + ih - ys) + '" class="q q-early"/>';
    [["tr", m.l + iw - 10, m.t + 20, "end"], ["tl", m.l + 10, m.t + 20, "start"], ["br", m.l + iw - 10, m.t + ih - 12, "end"], ["bl", m.l + 10, m.t + ih - 12, "start"]].forEach(function (a) {
      s += '<text x="' + a[1] + '" y="' + a[2] + '" text-anchor="' + a[3] + '" class="qlab">' + esc(Q[a[0]].label) + "</text>";
    });
    for (var f = 0; f <= 100; f += 20) s += '<text x="' + (m.l - 8) + '" y="' + (y(f) + 4) + '" text-anchor="end" class="tick">' + f + "</text>";
    for (var g = 1; g < 5; g++) s += '<line x1="' + x(g + 0.5) + '" x2="' + x(g + 0.5) + '" y1="' + m.t + '" y2="' + (m.t + ih) + '" class="grid"/>';
    for (var k = 1; k <= 5; k++) s += '<text x="' + x(k) + '" y="' + (m.t + ih + 18) + '" text-anchor="middle" class="tick">' + k + " " + esc((MAT[k] || {}).label || "") + "</text>";
    s += '<text x="' + (m.l + iw / 2) + '" y="' + (H - 6) + '" text-anchor="middle" class="axl">Maturity →</text>';
    s += '<text transform="translate(14 ' + (m.t + ih / 2) + ') rotate(-90)" text-anchor="middle" class="axl">Aldar Fit Score →</text>';
    // Position inside a maturity column comes from the evidence: readiness and deployments pillars.
    function mx(p) {
      var pl = p.pillars || {}, r = (pl.readiness && pl.readiness.score) || 0, d = (pl.deployments && pl.deployments.score) || 0;
      return (p.maturity || 1) - 0.38 + ((r + d) / 10) * 0.76;
    }
    var placed = [], labels = [], dotsSvg = "";
    var order = list.slice().sort(function (a, b) { return b._fit - a._fit; });
    order.forEach(function (p) {
      var cx = x(mx(p)), cy = y(p._fit);
      // nudge away from dots already placed so none hide each other
      for (var tries = 0; tries < 12; tries++) {
        var hit = placed.some(function (q) { return Math.abs(q.x - cx) < 9 && Math.abs(q.y - cy) < 9; });
        if (!hit) break;
        cy += (tries % 2 ? -1 : 1) * (6 + tries * 2);
      }
      var c = CAT[(p.categories || [])[0]] || { color: "#999", ink: "#555" };
      var r = 6 + Math.min(8, Math.sqrt((p.funding && p.funding.total_usd_m) || 0) / 4);
      placed.push({ x: cx, y: cy, r: r });
      var gcc = p.gcc && (p.gcc.level === "uae_deployments" || p.gcc.level === "local_office");
      dotsSvg += '<g class="dot" data-open="' + esc(p.id) + '" tabindex="0" role="button" aria-label="' + esc(p.name + ", fit " + p._fit + ", maturity " + (p.maturity || "unknown")) + '">' +
        "<title>" + esc(p.name + " · Fit " + p._fit + " · " + matLabel(p)) + "</title>" +
        (gcc ? '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + (r + 3.5).toFixed(1) + '" fill="none" stroke="var(--gold)" stroke-width="2"/>' : "") +
        '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + esc(c.color) + '" fill-opacity=".88" stroke="#fff" stroke-width="1.5"/></g>';
      labels.push({ p: p, x: cx, y: cy, r: r });
    });
    // Labels only where they fit; every dot still names itself on hover or tap.
    var boxes = [], labelSvg = "";
    labels.forEach(function (L) {
      var name = (L.p.short_name || L.p.name.replace(/\s*\(.*\)\s*$/, ""));
      if (name.length > 20) name = name.slice(0, 19) + "…";
      var w = name.length * 6.1 + 4, h = 13;
      var cands = [[L.x + L.r + 4, L.y + 4, "start"], [L.x - L.r - 4, L.y + 4, "end"], [L.x - w / 2, L.y - L.r - 5, "start"], [L.x - w / 2, L.y + L.r + 13, "start"]];
      for (var i = 0; i < cands.length; i++) {
        var cx0 = cands[i][2] === "end" ? cands[i][0] - w : cands[i][0], cy0 = cands[i][1] - 10;
        var bx = { x: cx0, y: cy0, w: w, h: h };
        if (bx.x < m.l + 2 || bx.x + bx.w > W - m.r || bx.y < m.t || bx.y + bx.h > m.t + ih) continue;
        var clash = boxes.some(function (o) { return bx.x < o.x + o.w && bx.x + bx.w > o.x && bx.y < o.y + o.h && bx.y + bx.h > o.y; }) ||
          placed.some(function (q) { return q.x + q.r > bx.x && q.x - q.r < bx.x + bx.w && q.y + q.r > bx.y && q.y - q.r < bx.y + bx.h; });
        if (clash) continue;
        boxes.push(bx);
        labelSvg += '<text x="' + cands[i][0].toFixed(1) + '" y="' + cands[i][1].toFixed(1) + '" text-anchor="' + cands[i][2] + '" class="dl">' + esc(name) + "</text>";
        break;
      }
    });
    s += dotsSvg + labelSvg;
    s += "</svg>";
    $("matrix").innerHTML = s;
    $("mxLegend").innerHTML = CATS.filter(function (c) { return list.some(function (p) { return (p.categories || [])[0] === c.id; }); })
      .map(function (c) { return '<span><i style="background:' + esc(c.color) + '"></i>' + esc(c.label) + "</span>"; }).join("") +
      '<span><i class="gring"></i>Gold ring: GCC-ready</span><span><i class="big"></i>Bigger: more funding</span>';
    $("mxCount").textContent = list.length + " providers shown (knocked-out providers are left off the matrix)";
    $("mxQuads").innerHTML = ["tr", "tl", "br", "bl"].map(function (k) {
      var qd = Q[k], inQ = list.filter(function (p) { return p._quad === qd.id; });
      return '<div class="qcard q-' + qd.id + '"><h3>' + esc(qd.label) + " <small>" + inQ.length + "</small></h3><p>" + esc(qd.note) + "</p>" +
        '<div class="qnames">' + inQ.slice(0, 8).map(function (p) { return '<button type="button" data-open="' + esc(p.id) + '">' + esc(p.name) + "</button>"; }).join("") +
        (inQ.length > 8 ? "<span>+" + (inQ.length - 8) + " more</span>" : "") + "</div></div>";
    }).join("");
  }

  /* ---------- view: categories (leaderboard) ---------- */
  function median(a) { if (!a.length) return null; a = a.slice().sort(function (x, y) { return x - y; }); var h = a.length >> 1; return a.length % 2 ? a[h] : (a[h - 1] + a[h]) / 2; }
  var catSort = "avg";
  function renderCategories() {
    var rows = CATS.map(function (c) {
      var ps = P.filter(function (p) { return (p.categories || []).indexOf(c.id) >= 0 && !p._knock.length; });
      var fits = ps.map(function (p) { return p._fit; });
      var top = ps.slice().sort(function (a, b) { return b._fit - a._fit; })[0];
      var ours = FLEET.filter(function (f) { return P.some(function (p) { return p._deployments.indexOf(f) >= 0 && (p.categories || [])[0] === c.id; }); });
      return { c: c, n: ps.length, avg: fits.length ? Math.round(fits.reduce(function (a, b) { return a + b; }, 0) / fits.length) : 0,
        best: top, short: ps.filter(function (p) { return p._verdict === "shortlist"; }).length,
        gcc: ps.filter(function (p) { return p.gcc && (p.gcc.level === "uae_deployments" || p.gcc.level === "local_office"); }).length,
        mat: median(ps.map(function (p) { return p.maturity || 0; })), ours: ours.length };
    });
    var key = { avg: "avg", n: "n", short: "short", gcc: "gcc", mat: "mat", ours: "ours" }[catSort] || "avg";
    rows.sort(function (a, b) { return (b[key] || 0) - (a[key] || 0); });
    var cols = [["n", "Providers"], ["avg", "Avg fit"], ["short", "Shortlist"], ["mat", "Median maturity"], ["gcc", "GCC-ready"], ["ours", "Our deployments"]];
    $("catTable").innerHTML = '<table class="lb"><thead><tr><th>Category</th>' + cols.map(function (c) {
      return '<th><button type="button" data-csort="' + c[0] + '" aria-pressed="' + (catSort === c[0]) + '">' + c[1] + "</button></th>";
    }).join("") + "<th>Top provider</th></tr></thead><tbody>" + rows.map(function (r) {
      return "<tr><td>" + '<button type="button" class="catlink" data-cat="' + esc(r.c.id) + '">' + catChip(r.c.id) + "</button></td>" +
        '<td class="num">' + r.n + '</td><td class="num"><span class="bar"><i style="width:' + r.avg + '%"></i></span>' + r.avg + "</td>" +
        '<td class="num">' + r.short + '</td><td class="num">' + (r.mat == null ? "–" : r.mat) + '</td><td class="num">' + r.gcc + '</td><td class="num">' + r.ours + "</td>" +
        "<td>" + (r.best ? '<button type="button" class="lnk" data-open="' + esc(r.best.id) + '">' + esc(r.best.name) + "</button> <small>" + r.best._fit + "</small>" : "–") + "</td></tr>";
    }).join("") + "</tbody></table>";
  }

  /* ---------- view: compare ---------- */
  function renderCompare() {
    var ps = state.compare.map(function (id) { return BYID[id]; }).filter(Boolean);
    if (ps.length < 2) {
      $("cmpBody").innerHTML = '<div class="empty big">Tick <b>Compare</b> on 2 to ' + MAX_COMPARE + " providers in the list, then come back here." +
        (ps.length ? "<br>Selected so far: " + ps.map(function (p) { return esc(p.name); }).join(", ") : "") + "</div>";
      return;
    }
    function best(vals, low) {
      var v = vals.filter(function (x) { return x != null; });
      if (!v.length) return null;
      return low ? Math.min.apply(null, v) : Math.max.apply(null, v);
    }
    var rows = [];
    function addRow(label, vals, fmt, opt) {
      opt = opt || {};
      var b = opt.num ? best(vals, opt.low) : null;
      rows.push("<tr><th>" + label + "</th>" + vals.map(function (v) {
        return '<td class="' + (b != null && v === b && vals.filter(function (x) { return x === b; }).length < vals.length ? "lead" : "") + '">' + fmt(v) + "</td>";
      }).join("") + "</tr>");
    }
    addRow("Aldar Fit Score", ps.map(function (p) { return p._fit; }), function (v) { return '<b class="big">' + v + "</b>"; }, { num: true });
    addRow("Verdict", ps.map(function (p) { return p; }), verdictPill);
    PILLARS.forEach(function (pl, i) {
      addRow(esc(pl.label) + ' <small>' + state.w[i] + "%</small>", ps.map(function (p) { return p.pillars && p.pillars[pl.id] ? p.pillars[pl.id].score : null; }),
        function (v) { return v == null ? "–" : dots(v) + " " + v; }, { num: true });
    });
    addRow("Maturity", ps.map(function (p) { return p.maturity || null; }), function (v) { return v ? v + " · " + esc((MAT[v] || {}).label) : "–"; }, { num: true });
    addRow("GCC presence", ps.map(function (p) { return GCC_ORDER[p.gcc && p.gcc.level]; }), function (v) {
      var g = (STRAT.gcc_levels || [])[v]; return g ? esc(g.label) : "–"; }, { num: true });
    addRow("Viability risk", ps.map(function (p) { return { low: 0, medium: 1, high: 2 }[p.viability_risk]; }), function (v) { return v == null ? "–" : ["Low", "Medium", "High"][v]; }, { num: true, low: true });
    addRow("Confidence", ps.map(function (p) { return p.confidence; }), function (v) { return esc(cap(v || "–")); });
    addRow("Funding", ps.map(function (p) {
      var f = p.funding || {};
      if (f.total_usd_m != null) return "$" + f.total_usd_m + "M raised";
      if (f.parent) return "Part of " + f.parent;
      if (f.public) return "Listed company";
      return "Not disclosed";
    }), esc);
    addRow("Business model", ps.map(function (p) { return (p.business_model || []).map(function (b) { return { purchase: "Purchase", raas: "RaaS", service: "Service" }[b] || b; }).join(", "); }), esc);
    addRow("Head office", ps.map(function (p) { return p.hq_country; }), esc);
    addRow("With Aldar", ps.map(function (p) { return p._deployments.length; }), function (v) { return v ? v + " deployment" + (v > 1 ? "s" : "") : "–"; });
    addRow("Main risks", ps.map(function (p) { return (p.risks || []).slice(0, 2).join(" · "); }), esc);
    $("cmpBody").innerHTML = '<div class="tscroll"><table class="cmpt"><thead><tr><th></th>' + ps.map(function (p) {
      return '<th><button type="button" class="lnk" data-open="' + esc(p.id) + '">' + esc(p.name) + "</button>" + '<div class="hq">' + (p.categories || []).slice(0, 1).map(catChip).join("") +
        '</div><button type="button" class="x sm" data-uncmp="' + esc(p.id) + '" aria-label="Remove ' + esc(p.name) + ' from compare">×</button></th>';
    }).join("") + "</tr></thead><tbody>" + rows.join("") + "</tbody></table></div>" +
      '<p class="note">Green marks the strongest provider on each row.</p>';
  }

  /* ---------- view: scoring (weights) ---------- */
  function renderScoring() {
    var tot = state.w.reduce(function (a, b) { return a + b; }, 0);
    $("wList").innerHTML = PILLARS.map(function (pl, i) {
      return '<div class="wrow"><div class="wl"><b>' + esc(pl.label) + "</b><small>" + esc(pl.guide) + "</small></div>" +
        '<input type="range" min="0" max="50" step="5" value="' + state.w[i] + '" data-w="' + i + '" aria-label="' + esc(pl.label) + ' weight">' +
        '<span class="wv">' + (tot ? Math.round(state.w[i] / tot * 100) : 0) + "%</span></div>";
    }).join("");
    $("wReset").hidden = state.w.join() === DEFAULT_W.join();
    $("koList").innerHTML = (STRAT.knockouts || []).map(function (k) { return "<li>" + esc(k.label) + "</li>"; }).join("");
    var v = STRAT.verdict || {};
    $("vRules").innerHTML = "<li><b>Shortlist:</b> Fit " + v.shortlist.min_score + "+ and Proven deployments at least " + v.shortlist.min_pillar.deployments + " of 5</li>" +
      "<li><b>Watch:</b> Fit " + v.watch.min_score + "–" + (v.shortlist.min_score - 1) + "</li><li><b>Pass:</b> Fit below " + v.watch.min_score + "</li>" +
      "<li><b>Knocked out:</b> fails a check above; still listed, greyed, with the reason</li>";
    $("mStages").innerHTML = (STRAT.maturity_stages || []).map(function (m) { return "<li><b>" + m.n + " " + esc(m.label) + ":</b> " + esc(m.note) + "</li>"; }).join("");
  }

  /* ---------- profile ---------- */
  function section(title, body) { return body ? '<section class="ps"><h3>' + title + "</h3>" + body + "</section>" : ""; }
  function list(a) { a = (a || []).filter(Boolean); return a.length ? "<ul>" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : ""; }
  function alternatives(p) {
    var main = (p.categories || [])[0];
    return P.filter(function (o) { return o !== p && (o.categories || []).indexOf(main) >= 0; }).map(function (o) {
      var a = (p.use_cases || []).map(function (s) { return s.toLowerCase(); }), b = (o.use_cases || []).map(function (s) { return s.toLowerCase(); });
      var words = function (arr) { return uniq(arr.join(" ").split(/\W+/).filter(function (w) { return w.length > 3; })); };
      var wa = words(a), wb = words(b);
      var inter = wa.filter(function (w) { return wb.indexOf(w) >= 0; }).length;
      var sharedCats = (o.categories || []).filter(function (c) { return (p.categories || []).indexOf(c) >= 0; }).length;
      var sim = Math.round(Math.min(100, 40 + sharedCats * 15 + (wa.length + wb.length ? (inter * 2 / (wa.length + wb.length)) * 60 : 0)));
      return { p: o, sim: sim };
    }).sort(function (x, y) { return y.sim - x.sim || y.p._fit - x.p._fit; }).slice(0, 5);
  }
  function openProfile(id, push) {
    var p = BYID[id];
    if (!p) return;
    state.profile = id;
    writeUrl();
    var fund = p.funding || {};
    var pill = PILLARS.map(function (pl, i) {
      var x = p.pillars && p.pillars[pl.id] || {};
      return '<div class="pill"><div class="pl"><b>' + esc(pl.label) + '</b><small>' + state.w[i] + "% weight</small></div>" +
        '<div class="pb"><span class="bar5"><i style="width:' + ((x.score || 0) * 20) + '%"></i></span><b>' + (x.score == null ? "–" : x.score) + "/5</b></div>" +
        '<p>' + esc(x.why || "") + "</p></div>";
    }).join("");
    var ours = p._deployments.length ? "<ul class=\"ours\">" + p._deployments.map(function (d) {
      var first = (d.update || "").split("\n")[0].replace(/^[•\-\s]+/, "");
      return '<li><span class="st st-' + esc(d.status) + '">' + (STATUS[d.status] || cap(d.status)) + "</span><b>" + esc(d.site) + "</b> · " + esc(d.model || d.use_case) +
        (first ? '<small>' + esc(first.length > 180 ? first.slice(0, 179) + "…" : first) + "</small>" : "") + "</li>";
    }).join("") + "</ul>" + '<p class="note"><a href="index.html' + (p._deployments.some(function (d) { return d.layer === "construction"; }) && !p._deployments.some(function (d) { return d.layer === "rc"; }) ? "?map=construction" : "") +
      '">Open the fleet map</a></p>' : '<p class="muted">Not yet trialled by Aldar.</p>';
    var stage = '<ol class="stages">' + (STRAT.maturity_stages || []).map(function (m) {
      return '<li class="' + (m.n === p.maturity ? "on" : m.n < p.maturity ? "past" : "") + '"><b>' + m.n + "</b><span>" + esc(m.label) + "</span></li>";
    }).join("") + "</ol>" + (p.maturity_note ? '<p class="muted">' + esc(p.maturity_note) + "</p>" : "");
    var fundTxt = [];
    if (fund.public) fundTxt.push("Listed company" + (fund.parent ? " (" + fund.parent + ")" : ""));
    else if (fund.parent) fundTxt.push("Part of " + fund.parent);
    if (fund.total_usd_m != null) fundTxt.push("Raised about $" + fund.total_usd_m + "M in total");
    if (fund.last_round) fundTxt.push("Last round: " + fund.last_round + (fund.last_round_date ? " (" + fund.last_round_date + ")" : ""));
    if (p._since != null && !fund.public) fundTxt.push(p._since + " months since the last round" + (p._raising ? ". Likely to raise again soon (rough guide, not a prediction)" : ""));
    if (fund.investors && fund.investors.length) fundTxt.push("Backers: " + fund.investors.join(", "));
    var specs = p.specs || {};
    var specRows = [["Operating temperature", specs.operating_temp], ["Ingress protection", specs.ip_rating], ["Runtime", specs.runtime],
      ["Certifications", (specs.certifications || []).join(", ")], ["Other", specs.other]].filter(function (r) { return r[1]; });
    var alts = alternatives(p);
    var news = p._news.slice(0, 5);
    var srcs = (p.sources || []).filter(function (s) { return safeUrl(s.url); });
    var html =
      '<div class="ph"><div class="ph-l"><div class="ph-cats">' + (p.categories || []).map(catChip).join("") + "</div>" +
        '<h2 id="pTitle">' + esc(p.name) + "</h2>" +
        '<p class="ph-sub">' + esc([p.hq_country, p.founded ? "founded " + p.founded : null].filter(Boolean).join(" · ")) +
        (safeUrl(p.website) ? ' · <a href="' + esc(p.website) + '" target="_blank" rel="noopener">' + esc(host(p.website)) + "</a>" : "") + "</p>" +
        '<p class="ph-what">' + esc(p.what || "") + "</p></div>" +
        '<div class="ph-r">' + ring(p._fit, 76) + "<div>" + verdictPill(p) + '<small>Aldar Fit Score</small><small>Confidence: ' + esc(cap(p.confidence || "unknown")) + "</small></div></div></div>" +
      (p._knock.length ? '<div class="kobox"><b>Knocked out:</b> ' + esc(p._knock.map(function (k) { return KNOCK[k] || k; }).join("; ")) +
        (p.knockouts && p.knockouts.note ? ". " + esc(p.knockouts.note) : "") + "</div>"
        : (p.knockouts && p.knockouts.note ? '<div class="kobox soft"><b>Note:</b> ' + esc(p.knockouts.note) + "</div>" : "")) +
      '<div class="pgrid"><div>' +
        section("Aldar experience", ours) +
        section("Score breakdown", '<div class="pills">' + pill + "</div>") +
        section("What they make", (p.products && p.products.length ? '<p><b>Products:</b> ' + esc(p.products.join(", ")) + "</p>" : "") +
          (p.use_cases && p.use_cases.length ? "<p><b>Use cases:</b> " + esc(p.use_cases.join(", ")) + "</p>" : "") +
          (p.asset_types && p.asset_types.length ? "<p><b>Suits:</b> " + esc(p.asset_types.join(", ")) + "</p>" : "")) +
        section("Spec sheet", specRows.length ? '<dl class="specs">' + specRows.map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl>" : "") +
        section("Deployments and customers", (p.deployments ? "<p>" + esc(p.deployments) + "</p>" : "") + (p.customers && p.customers.length ? "<p><b>Named customers:</b> " + esc(p.customers.join(", ")) + "</p>" : "")) +
        section("Risks", list(p.risks)) +
      "</div><div>" +
        section("Outlook", stage + '<p><b>Vendor viability risk:</b> ' + esc(cap(p.viability_risk || "unknown")) + "</p>") +
        section("GCC presence", "<p><b>" + esc(gccLabel(p)) + "</b>" + (p.gcc && p.gcc.note ? ". " + esc(p.gcc.note) : "") + "</p>" +
          (p.operates_in && p.operates_in.length ? '<p class="muted">Operates in: ' + esc(p.operates_in.join(", ")) + "</p>" : "")) +
        section("Partners", list(p.partners)) +
        section("Funding", list(fundTxt) + (p.business_model && p.business_model.length ? "<p><b>Sells as:</b> " + esc(p.business_model.map(function (b) { return { purchase: "Purchase", raas: "Robot-as-a-service / lease", service: "Operated service" }[b] || b; }).join(", ")) + "</p>" : "")) +
        section("Alternatives", alts.length ? '<ul class="alts">' + alts.map(function (a) {
          return '<li><button type="button" class="lnk" data-open="' + esc(a.p.id) + '">' + esc(a.p.name) + "</button><small>" + a.sim + "% similar · Fit " + a.p._fit + "</small></li>";
        }).join("") + "</ul>" : "") +
        section("In Market Pulse", news.length ? '<ul class="news">' + news.map(function (n) {
          return '<li><a href="' + esc(safeUrl(n.url) || "intel.html") + '" target="_blank" rel="noopener">' + esc(n.headline) + "</a><small>" + esc(n.source || "") + "</small></li>";
        }).join("") + "</ul>" : '<p class="muted">No mentions in recent Pulse editions.</p>') +
      "</div></div>" +
      section("Sources", srcs.length ? '<ol class="srcs">' + srcs.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label || host(s.url)) + "</a> <small>" + esc(host(s.url)) + "</small></li>";
      }).join("") + "</ol>" + '<p class="note">Research checked ' + esc(p.checked || (DATA.meta && DATA.meta.checked) || "") + ". Scores are AI-assisted research: check material facts against the sources.</p>" : "");
    $("pBody").innerHTML = html;
    var inCmp = state.compare.indexOf(p.id) >= 0;
    $("pCompare").textContent = inCmp ? "Remove from compare" : "Add to compare";
    $("pCompare").disabled = !inCmp && state.compare.length >= MAX_COMPARE;
    var ov = $("profile");
    if (ov.hidden) {
      ov.hidden = false;
      document.body.classList.add("modal-open");
      lastFocus = document.activeElement;
    }
    $("pScroll").scrollTop = 0;
    $("pClose").focus();
    addRecent(p.id);
  }
  var lastFocus = null;
  function closeProfile() {
    $("profile").hidden = true;
    document.body.classList.remove("modal-open");
    state.profile = null;
    writeUrl();
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }
  function addRecent(id) {
    var r = store("recent") || [];
    r = [id].concat(r.filter(function (x) { return x !== id; })).slice(0, 8);
    store("recent", r);
    renderRecent();
  }
  function renderRecent() {
    var r = (store("recent") || []).filter(function (id) { return BYID[id]; });
    $("recentWrap").hidden = !r.length;
    $("recent").innerHTML = r.map(function (id) { return '<button type="button" class="lnk" data-open="' + esc(id) + '">' + esc(BYID[id].name) + "</button>"; }).join("");
  }

  /* ---------- compare tray ---------- */
  function renderTray() {
    var n = state.compare.length;
    $("tray").hidden = !n || state.view === "compare";
    $("trayTxt").textContent = n + " selected to compare";
    $("trayGo").disabled = n < 2;
    $("tabCmpN").textContent = n ? n : "";
  }
  function toggleCompare(id) {
    var i = state.compare.indexOf(id);
    if (i >= 0) state.compare.splice(i, 1);
    else if (state.compare.length < MAX_COMPARE) state.compare.push(id);
    writeUrl();
    renderTray();
    if (state.view === "providers") renderProviders();
    if (state.view === "compare") renderCompare();
  }

  /* ---------- CSV ---------- */
  function csv() {
    var list = filtered();
    var head = ["Rank", "Provider", "Head office", "Categories", "Aldar Fit Score", "Verdict", "Quadrant", "Maturity", "GCC presence", "Confidence", "Viability risk",
      "With Aldar"].concat(PILLARS.map(function (p) { return p.label + " (0-5)"; })).concat(["Website", "What they make"]);
    var rows = list.map(function (p, i) {
      return [i + 1, p.name, p.hq_country, (p.categories || []).map(function (c) { return CAT[c] ? CAT[c].label : c; }).join("; "), p._fit, VERDICT[p._verdict].label,
        (QUAD[p._quad] || {}).label, matLabel(p), gccLabel(p), p.confidence, p.viability_risk, p._deployments.length ? "Yes" : "No"]
        .concat(PILLARS.map(function (pl) { return p.pillars && p.pillars[pl.id] ? p.pillars[pl.id].score : ""; })).concat([p.website, p.what]);
    });
    var text = [head].concat(rows).map(function (r) {
      return r.map(function (v) { v = String(v == null ? "" : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(",");
    }).join("\r\n");
    var blob = new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "aldar-robotics-scout-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function toast(msg) {
    var t = $("toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.hidden = true; }, 2200);
  }
  function copyLink() {
    var url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function () { toast("Link copied"); }, function () { prompt("Copy this link", url); });
    else prompt("Copy this link", url);
  }

  /* ---------- view switching ---------- */
  function render() {
    rescore();
    renderHero();
    ["providers", "matrix", "categories", "compare", "scoring"].forEach(function (v) {
      $("view-" + v).hidden = state.view !== v;
      var b = document.querySelector('[data-view="' + v + '"]');
      if (b) b.setAttribute("aria-selected", state.view === v);
    });
    $("tools").hidden = !(state.view === "providers" || state.view === "matrix");
    renderPresets();
    renderFilters();
    if (state.view === "providers") renderProviders();
    if (state.view === "matrix") renderMatrix();
    if (state.view === "categories") renderCategories();
    if (state.view === "compare") renderCompare();
    if (state.view === "scoring") renderScoring();
    $("q").value = state.q;
    $("sort").value = state.sort;
    $("minFit").value = String(state.minFit);
    $("showKo").checked = state.showKnocked;
    $("sortWrap").hidden = state.view !== "providers";
    $("wNote").hidden = state.w.join() === DEFAULT_W.join();
    renderTray();
    renderRecent();
    writeUrl();
  }
  function setView(v) { state.view = v; render(); window.scrollTo({ top: 0 }); }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, [data-open], a");
    if (!t) return;
    if (t.hasAttribute("data-open")) { openProfile(t.getAttribute("data-open")); return; }
    if (t.hasAttribute("data-view")) { setView(t.getAttribute("data-view")); return; }
    if (t.hasAttribute("data-preset")) {
      var id = t.getAttribute("data-preset");
      if (state.preset === id) { state.preset = null; state.filters = []; }
      else {
        var pr = (STRAT.presets || []).filter(function (x) { return x.id === id; })[0];
        state.preset = id;
        state.filters = JSON.parse(JSON.stringify(pr.filters));
      }
      render(); return;
    }
    if (t.hasAttribute("data-f")) {
      var a = t.getAttribute("data-f").split("~");
      state.filters = [{ field: a[0], op: a[1], values: a[2].split("|") }];
      state.preset = null; state.q = "";
      if (state.view !== "providers" && state.view !== "matrix") state.view = "providers";
      render(); $("tools").scrollIntoView({ behavior: "smooth", block: "start" }); return;
    }
    if (t.hasAttribute("data-v")) {
      var i = +t.closest(".fb-row").getAttribute("data-i"), v = t.getAttribute("data-v"), f = state.filters[i];
      var k = f.values.indexOf(v);
      if (k >= 0) f.values.splice(k, 1); else f.values.push(v);
      state.preset = null; render(); return;
    }
    if (t.hasAttribute("data-rm")) { state.filters.splice(+t.getAttribute("data-rm"), 1); state.preset = null; render(); return; }
    if (t.hasAttribute("data-cat")) {
      state.filters = [{ field: "category", op: "any", values: [t.getAttribute("data-cat")] }];
      state.preset = null; setView("providers"); return;
    }
    if (t.hasAttribute("data-csort")) { catSort = t.getAttribute("data-csort"); renderCategories(); return; }
    if (t.hasAttribute("data-uncmp")) { toggleCompare(t.getAttribute("data-uncmp")); return; }
    switch (t.id) {
      case "fbAdd":
        var used = state.filters.map(function (f) { return f.field; });
        var next = Object.keys(FIELDS).filter(function (k) { return used.indexOf(k) < 0; })[0] || "category";
        state.filters.push({ field: next, op: "any", values: [] }); state.preset = null; render(); return;
      case "fbClear": state.filters = []; state.q = ""; state.minFit = 0; state.preset = null; render(); return;
      case "csv": csv(); return;
      case "share": copyLink(); return;
      case "pClose": closeProfile(); return;
      case "pCompare": toggleCompare(state.profile); openProfile(state.profile); return;
      case "pLink": copyLink(); return;
      case "pPrint": document.body.classList.add("print-profile"); window.print(); setTimeout(function () { document.body.classList.remove("print-profile"); }, 500); return;
      case "trayGo": setView("compare"); return;
      case "trayClear": state.compare = []; render(); return;
      case "cmpPrint": window.print(); return;
      case "wReset": state.w = DEFAULT_W.slice(); store("weights", null); render(); return;
      case "wResetTop": state.w = DEFAULT_W.slice(); store("weights", null); render(); return;
    }
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.hasAttribute("data-cmp")) { toggleCompare(t.getAttribute("data-cmp")); return; }
    if (t.closest && t.closest(".fb-row")) {
      var i = +t.closest(".fb-row").getAttribute("data-i"), k = t.getAttribute("data-k");
      if (k === "field") { state.filters[i] = { field: t.value, op: state.filters[i].op, values: [] }; }
      if (k === "op") state.filters[i].op = t.value;
      state.preset = null; render(); return;
    }
    if (t.id === "sort") { state.sort = t.value; render(); }
    if (t.id === "minFit") { state.minFit = +t.value; state.preset = null; render(); }
    if (t.id === "showKo") { state.showKnocked = t.checked; render(); }
  });
  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.id === "q") {
      clearTimeout(state._qt);
      state._qt = setTimeout(function () {
        state.q = t.value; state.preset = null; rescore(); renderFilters(); renderPresets();
        if (state.view === "providers") renderProviders(); else if (state.view === "matrix") renderMatrix();
        writeUrl();
      }, 120);
    }
    if (t.hasAttribute("data-w")) {
      state.w[+t.getAttribute("data-w")] = +t.value;
      store("weights", state.w.join() === DEFAULT_W.join() ? null : state.w);
      rescore(); renderScoring(); renderHero(); $("wNote").hidden = state.w.join() === DEFAULT_W.join(); writeUrl();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("profile").hidden) { closeProfile(); return; }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("g.dot")) { e.preventDefault(); openProfile(e.target.getAttribute("data-open")); }
    if (e.key === "/" && document.activeElement === document.body) { e.preventDefault(); $("q").focus(); }
  });
  $("profile").addEventListener("click", function (e) { if (e.target === $("profile")) closeProfile(); });

  /* ---------- start ---------- */
  readUrl();
  render();
  if (state.profile) openProfile(state.profile);
})();
