(function () {
  var GTM_ID = "GTM-5V96B388";
  var analyticsLoaded = false;
  var dataLayer = (window.dataLayer = window.dataLayer || []);

  window.gtag =
    window.gtag ||
    function () {
      dataLayer.push(arguments);
    };

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

  function scheduleIdleLoad() {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadGtm, { timeout: 10000 });
      return;
    }

    window.setTimeout(loadGtm, 6000);
  }

  ["mousedown", "touchstart", "scroll", "keydown", "pointerdown"].forEach(function (eventName) {
    document.addEventListener(eventName, loadGtm, {
      once: true,
      passive: true,
      capture: true,
    });
  });

  scheduleIdleLoad();
})();
