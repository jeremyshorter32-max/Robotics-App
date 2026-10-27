/* Key figures for the top-of-page metrics bar. Shared by the desktop and
   mobile layouts so both always show the same numbers.
   Which figures appear, their labels and order are set in
   data/fleet-data.js (meta.metrics). */
window.RR_SUMMARY = function (D) {
  var fleet = (D && D.fleet) || [], meta = (D && D.meta) || {};
  var assetById = {};
  (D.assets || []).forEach(function (a) { assetById[a.id] = a; });
  var rows = fleet.filter(function (f) { return assetById[f.asset_id]; });
  // An initiative can run at several sites (rows sharing an "init" key).
  var inits = {};
  rows.forEach(function (f) { var k = f.init || f.id; if (!inits[k]) inits[k] = f; });
  var initList = Object.keys(inits).map(function (k) { return inits[k]; });
  var uniq = function (list, fn) { var s = {}; list.forEach(function (x) { var v = fn(x); if (v) s[v] = 1; }); return Object.keys(s).length; };
  var byStatus = function (st) { return initList.filter(function (f) { return f.status === st; }).length; };
  var calc = {
    deployments: rows.length,
    initiatives: initList.length,
    assets: uniq(rows, function (f) { return f.asset_id; }),
    districts: uniq(rows, function (f) { return assetById[f.asset_id].district_id; }),
    launched: byStatus("deployed"),
    trialled: byStatus("pilot"),
    pending: byStatus("planned"),
    partners: uniq(rows, function (f) { return (f.vendor || "").trim().toLowerCase(); }),
    robot_types: uniq(rows, function (f) { return f.robot_type; }),
    units: rows.reduce(function (n, f) { return n + (isNaN(Number(f.units)) || f.units == null ? 0 : Number(f.units)); }, 0)
  };
  var hints = {
    deployments: "One initiative at one site. An initiative running at several sites counts once per site.",
    initiatives: "Unique robotics initiatives in the tracker.",
    assets: "Aldar assets with at least one initiative.",
    districts: "Districts with at least one initiative.",
    launched: "Initiatives launched and in operation.",
    trialled: "Initiatives tested or in trial.",
    pending: "Initiatives with testing pending.",
    partners: "Distinct technology vendors.",
    robot_types: "Robot categories in use.",
    units: "Robot count stated in the tracker."
  };
  var spec = Array.isArray(meta.metrics) ? meta.metrics : [];
  var items = spec.map(function (m) {
    var has = m.value != null && m.value !== "";
    var v = has ? m.value : calc[m.key];
    if (v == null) return null;
    return { label: m.label || m.key, value: String(v), hint: m.hint || hints[m.key] || "" };
  }).filter(Boolean);
  return { tagline: meta.tagline || "", items: items };
};
