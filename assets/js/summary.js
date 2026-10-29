/* Key figures for the top-of-page metrics bar. Shared by the desktop and
   mobile layouts so both always show the same numbers.
   Which figures appear, their labels and order are set in
   data/fleet-data.js (meta.metrics).
   A deployment is one robot use case at one site (one row in fleet). */
window.RR_SUMMARY = function (D) {
  var meta = (D && D.meta) || {}, assetById = {};
  ((D && D.assets) || []).forEach(function (a) { assetById[a.id] = a; });
  var rows = ((D && D.fleet) || []).filter(function (f) { return assetById[f.asset_id]; });
  var uniq = function (fn) { var s = {}; rows.forEach(function (f) { var v = fn(f); if (v) s[v] = 1; }); return Object.keys(s).length; };
  var byStatus = function (st) { return rows.filter(function (f) { return f.status === st; }).length; };
  var calc = {
    deployments: rows.length,
    live: byStatus("deployed"),
    testing: byStatus("pilot"),
    planned: byStatus("planned"),
    assets: uniq(function (f) { return f.asset_id; }),
    districts: uniq(function (f) { return assetById[f.asset_id].district_id; }),
    partners: (function () { var s = {}; rows.forEach(function (f) { String(f.vendor || "").split("+").forEach(function (v) { v = v.trim().toLowerCase(); if (v && v !== "other" && v !== "tbc") s[v] = 1; }); }); return Object.keys(s).length; })(),
    robot_types: uniq(function (f) { return f.robot_type; }),
    units: rows.reduce(function (n, f) { return n + (f.units == null || isNaN(Number(f.units)) ? 0 : Number(f.units)); }, 0)
  };
  var hints = {
    deployments: "Robot use cases at Aldar sites. The same robot service at two sites counts as two deployments.",
    live: "Deployments launched and in operation.",
    testing: "Deployments tested or in testing.",
    planned: "Deployments with testing still to start.",
    assets: "Aldar assets with at least one deployment.",
    districts: "Districts with at least one deployment.",
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
