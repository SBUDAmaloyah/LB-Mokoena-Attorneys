document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuToggle");
  const side = document.getElementById("sidePanel");
  const overlay = document.getElementById("panelOverlay");

  if (menuBtn && side && overlay) {
    function openPanel() {
      side.classList.add("open");
      overlay.classList.add("show");
      menuBtn.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closePanel() {
      side.classList.remove("open");
      overlay.classList.remove("show");
      menuBtn.classList.remove("open");
      document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", () => {
      side.classList.contains("open") ? closePanel() : openPanel();
    });
    overlay.addEventListener("click", closePanel);
    document.getElementById("panelCloseBtn")?.addEventListener("click", closePanel);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePanel();
    });
  }

  // Nav highlight
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // BLOG dynamic content
  const blogGrid = document.getElementById("blogGrid");
  if (blogGrid) {
    const posts = JSON.parse(localStorage.getItem("lbm_posts") || "[]");
    const seed = posts.length
      ? posts
      : [
          {
            title: "Welcome to LB Mokoena Attorneys",
            date: "2025-10-05",
            summary: "We are a startup law firm offering practical legal solutions.",
            image: "assets/handshake.jpg",
          },
          {
            title: "Commercial Contracts 101",
            date: "2025-09-20",
            summary: "Key tips for startups drafting contracts.",
            image: "assets/courtroom.jpg",
          },
        ];

    seed.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card blog-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.title}" style="width:100%;border-radius:var(--radius);margin-bottom:10px;">
        <h3>${p.title}</h3>
        <div class="meta">${formatDate(p.date)}</div>
        <p class="muted">${p.summary}</p>
        <div style="margin-top:12px"><a class="cta" href="#">Read More</a></div>
      `;
      blogGrid.appendChild(card);
    });
  }

  function formatDate(d) {
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return d;
    }
  }

  // Year in footer
  document.getElementById("year")?.textContent = new Date().getFullYear();
});
