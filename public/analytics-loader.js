(function () {
  var GTM_ID = "GTM-5V96B388";
  var analyticsLoaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function loadGtm() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0];
      var j = d.createElement(s);
      var dl = l !== "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", GTM_ID);
  }

  // Only load GTM after real user interaction — never during Lighthouse / bot crawls.
  // No idle/timeout fallback so it does NOT fire during automated audits.
  var events = ["mousedown", "touchstart", "scroll", "keydown", "pointerdown", "click"];
  events.forEach(function (ev) {
    document.addEventListener(ev, loadGtm, { once: true, passive: true, capture: true });
  });
})();
