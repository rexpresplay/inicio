(function () {
  "use strict";

  /* ---- Número de WhatsApp: cámbialo por el real del negocio ---- */
  var WHATSAPP_NUMBER = "593000000000";

  /* ---- Año en el footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header: sombra/fondo al hacer scroll ---- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Menú móvil ---- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Revelado al hacer scroll ---- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Partículas de diamante en el hero (decorativas, CSS-driven) ---- */
  var particleHost = document.getElementById("heroParticles");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (particleHost && !reducedMotion) {
    var count = window.innerWidth < 700 ? 8 : 16;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "gem-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = (Math.random() * 6).toFixed(2) + "s";
      p.style.animationDuration = (7 + Math.random() * 5).toFixed(2) + "s";
      p.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
      var scale = 0.6 + Math.random() * 1.1;
      p.style.transform = "scale(" + scale.toFixed(2) + ")";
      particleHost.appendChild(p);
    }
  }

  /* ---- Botones "Comprar": arman un mensaje de WhatsApp con el paquete elegido ---- */
  document.querySelectorAll("[data-pack]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var pack = btn.getAttribute("data-pack");
      var msg = "Hola, quiero comprar el paquete: " + pack + ". Mi ID de jugador de Free Fire es: ";
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  });
})();
