const raw = document.getElementById("reviews-data").textContent;
window.REVIEWS = JSON.parse(raw);


(function () {
    const data = Array.isArray(window.REVIEWS) ? window.REVIEWS : [];
    if (!data.length) return;
  
    let index = 0;
  
    // Elements
    const nameEl = document.getElementById("rv-name");
    const roleEl = document.getElementById("rv-role");
    const quoteEl = document.getElementById("rv-quote");
    const videoPanel = document.getElementById("rv-video-panel");
    const videoEl = document.getElementById("rv-video");
    const videoSrcEl = document.getElementById("rv-video-src");
    const prevBtn = document.querySelector(".rv-prev");
    const nextBtn = document.querySelector(".rv-next");
    const dotsWrap = document.querySelector(".rv-dots");
  
    // Helpers
    const escapeHtml = (s) =>
      String(s ?? "")
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
  
    function renderDots() {
      dotsWrap.innerHTML = "";
      data.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "rv-dot";
        b.type = "button";
        b.role = "tab";
        b.setAttribute("aria-label", `Show review ${i + 1}`);
        b.setAttribute("aria-selected", i === index ? "true" : "false");
        b.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(b);
      });
    }
  
    function updateDots() {
      dotsWrap.querySelectorAll(".rv-dot").forEach((d, i) =>
        d.setAttribute("aria-selected", i === index ? "true" : "false")
      );
    }
  
    function loadVideoFor(review) {
      // On mobile we hide the video panel with CSS. Still set src for desktop/tablet.
      if (!videoEl || !videoSrcEl) return;
      const src = review?.videoSrc || "";
      const poster = review?.poster || "";
      // Pause current video and swap source safely
      try { videoEl.pause(); } catch {}
      videoEl.removeAttribute("src");
      videoSrcEl.setAttribute("src", src);
      if (poster) videoEl.setAttribute("poster", poster); else videoEl.removeAttribute("poster");
      videoEl.load(); // ensure the new source is recognized
      // Autoplay muted if visible (desktop) and allowed
      if (getComputedStyle(videoPanel).display !== "none") {
        videoEl.muted = true;
        const playAttempt = videoEl.play();
        if (playAttempt && typeof playAttempt.catch === "function") {
          playAttempt.catch(() => { /* ignore autoplay block */ });
        }
      }
    }
  
    function render() {
      const r = data[index] || {};
      nameEl.textContent = escapeHtml(r.name || "Anonymous");
      roleEl.textContent = escapeHtml(r.role || "");
      quoteEl.textContent = escapeHtml(r.review || "");
      loadVideoFor(r);
      updateDots();
    }
  
    function goTo(i) {
      index = (i + data.length) % data.length;
      render();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
  
    // Events
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
  
    // Basic swipe on content area
    let startX = null;
    document.querySelector(".rv-content").addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    document.querySelector(".rv-content").addEventListener("touchend", (e) => {
      if (startX == null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      startX = null;
    });
  
    // Optional: auto-rotate (pause on hover)
    // let timer = setInterval(next, 6000);
    // [document.querySelector(".rv-content"), videoPanel].forEach(el => {
    //   if (!el) return;
    //   el.addEventListener("mouseenter", () => clearInterval(timer));
    //   el.addEventListener("mouseleave", () => (timer = setInterval(next, 6000)));
    // });
  
    // Init
    renderDots();
    render();
  })();
  