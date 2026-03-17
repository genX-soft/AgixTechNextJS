(function () {
  var existing = document.querySelector('link[href="/deferred-styles.css"][rel="stylesheet"]');
  if (existing) return;

  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/deferred-styles.css";
  document.head.appendChild(link);
})();
