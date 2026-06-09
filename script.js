/* ============================================
   SB3 Outlet - Jack's Surfboards Inspired
   Vanilla JS, no dependencies
   ============================================ */

(function () {
  'use strict';

  // --- Sticky nav shadow on scroll ---
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, { passive: true });

  // --- Mobile menu ---
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobile-menu');

  burger.addEventListener('click', function () {
    var isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !isOpen);
    mobileMenu.classList.toggle('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // --- Language toggle ---
  var langKey = 'sb3-lang';

  function setLang(lang) {
    if (lang === 'en') {
      document.documentElement.classList.add('lang-en');
    } else {
      document.documentElement.classList.remove('lang-en');
    }
    try { localStorage.setItem(langKey, lang); } catch (e) {}
  }

  function toggleLang() {
    var isEn = document.documentElement.classList.contains('lang-en');
    setLang(isEn ? 'fr' : 'en');
  }

  try {
    var saved = localStorage.getItem(langKey);
    if (saved === 'en') setLang('en');
  } catch (e) {}

  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
  document.getElementById('lang-toggle-mobile').addEventListener('click', function () {
    toggleLang();
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });

  // --- Product tab filtering ---
  var tabs = document.querySelectorAll('.products__tab');
  var cards = document.querySelectorAll('.product-card');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filter = tab.getAttribute('data-tab');

      tabs.forEach(function (t) { t.classList.remove('products__tab--active'); });
      tab.classList.add('products__tab--active');

      cards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          var cats = card.getAttribute('data-category') || '';
          if (cats.indexOf(filter) !== -1) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  // --- Scroll reveal (Intersection Observer) ---
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

  // --- Video poster fallback ---
  var heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    heroVideo.addEventListener('error', function () {
      heroVideo.style.display = 'none';
    });
  }
})();
