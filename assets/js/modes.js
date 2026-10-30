/* Map layers: Residential & Commercial (blue) and Construction (green).
   Each layer has its own data file; the page swaps window.FLEET_DATA
   when the switch at the top is used. ?map=construction opens straight
   into the construction layer. */
(function () {
  var PALETTES = {
    rc: { m: "#769CD2", l: "#9DB9E0", xl: "#DCE7F6", ink: "#3F6FAE", deep: "#2F245C", rgb: "118,156,210" },
    construction: { m: "#5FB37F", l: "#8FD3A8", xl: "#D7F2E1", ink: "#2E8B57", deep: "#1E4D36", rgb: "95,179,127" }
  };
  window.RR_MODES = [
    { id: "rc", label: "Residential & Commercial", short: "Res & Comm" },
    { id: "construction", label: "Construction", short: "Construction" }
  ];
  window.RR_DATASETS = { rc: window.FLEET_DATA, construction: window.CONSTRUCTION_DATA };
  window.RR_applyAccent = function (mode) {
    var p = PALETTES[mode] || PALETTES.rc, s = document.documentElement.style;
    window.RR_ACC = p;
    if (mode === "rc") {
      ["--acc", "--acc2", "--acc3", "--accInk", "--accDeep", "--accRGB"].forEach(function (k) { s.removeProperty(k); });
      document.documentElement.removeAttribute("data-rr-mode");
    } else {
      s.setProperty("--acc", p.m); s.setProperty("--acc2", p.l); s.setProperty("--acc3", p.xl);
      s.setProperty("--accInk", p.ink); s.setProperty("--accDeep", p.deep); s.setProperty("--accRGB", p.rgb);
      document.documentElement.setAttribute("data-rr-mode", mode);
    }
  };
  var mode = "rc";
  try { var q = new URLSearchParams(location.search).get("map"); if (q && window.RR_DATASETS[q]) mode = q; } catch (e) {}
  window.RR_MODE = mode;
  if (mode !== "rc") window.FLEET_DATA = window.RR_DATASETS[mode];
  window.RR_applyAccent(mode);
})();
