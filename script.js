(function () {
  // Links like ./#pricing from another page: go there once the pictures have their size.
  if (location.hash.length > 1) {
    window.addEventListener("load", function () {
      var el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ block: "start" });
    });
  }

  // Copy the email address.
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var text = b.dataset.copy;
      var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1600); };
      try {
        navigator.clipboard.writeText(text).then(done, function () { select(b); });
      } catch (e) { select(b); }
    });
  });
  function select(b) {
    var code = b.parentNode.querySelector("code");
    var r = document.createRange(); r.selectNodeContents(code);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  // Top bar line once the page scrolls.
  var top = document.getElementById("top");
  window.addEventListener("scroll", function () { top.classList.toggle("scrolled", window.scrollY > 8); }, { passive: true });

  // Sections slide up a little as they come into view (always visible, only moved).
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove("low"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".rise").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight) { el.classList.add("low"); io.observe(el); }
    });
  }
})();
