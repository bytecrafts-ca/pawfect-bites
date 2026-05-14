(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function inViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 1.02 && rect.bottom > -40;
  }

  var nodes = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!nodes.length) return;

  if (!window.IntersectionObserver) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
  );

  nodes.forEach(function (el) {
    if (inViewport(el)) {
      el.classList.add("is-visible");
    } else {
      io.observe(el);
    }
  });
})();
