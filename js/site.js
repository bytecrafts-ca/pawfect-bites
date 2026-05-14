(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();

(function () {
  /**
   * Live site (e.g. GitHub Pages): large proof MP4s are often not in the repo.
   * Option A — Set your 11-character YouTube video id (from youtube.com/watch?v=…) so visitors get an embed.
   * Option B — Re-encode proof-dog.mp4 under ~95 MB, remove videos/*.mp4 from .gitignore, commit, and push.
   */
  var PROOF_YOUTUBE_ID = "";

  /** Optional: direct URL to an MP4 (CDN, etc.). If set, used instead of videos/proof-dog.mp4 when YouTube id is empty. */
  var PROOF_MP4_URL = "";

  var frame = document.querySelector(".proof__frame");
  var video = document.getElementById("proof-video");
  var youtubeHost = document.getElementById("proof-youtube-host");
  var pending = document.getElementById("proof-pending");
  if (!frame || !video || !youtubeHost) return;

  var id = (PROOF_YOUTUBE_ID || "").trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
    youtubeHost.hidden = false;
    video.hidden = true;
    youtubeHost.innerHTML =
      '<iframe class="proof__iframe" title="Video of a dog enjoying Pawfect Bites treats" width="560" height="315" src="https://www.youtube-nocookie.com/embed/' +
      id +
      '" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    return;
  }

  var mp4 = (PROOF_MP4_URL || "").trim();
  if (mp4) {
    var source = video.querySelector("source");
    if (source) source.src = mp4;
    video.load();
    return;
  }

  fetch("videos/proof-dog.mp4", { method: "HEAD", cache: "no-store" })
    .then(function (res) {
      if (res.ok) return;
      if (pending) pending.hidden = false;
      video.hidden = true;
    })
    .catch(function () {
      if (pending) pending.hidden = false;
      video.hidden = true;
    });
})();

(function () {
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
