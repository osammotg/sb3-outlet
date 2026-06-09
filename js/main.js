/* ============================================
   SB3 Outlet v2 - Shared JS
   Vanilla JS, no dependencies
   ============================================ */

(function () {
  'use strict';

  // --- Sticky nav shadow on scroll ---
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

  // --- Mobile menu ---
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isOpen);
      mobileMenu.classList.toggle('mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('mobile-menu--open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

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

  var langToggle = document.getElementById('lang-toggle');
  var langToggleMobile = document.getElementById('lang-toggle-mobile');

  if (langToggle) langToggle.addEventListener('click', toggleLang);
  if (langToggleMobile) {
    langToggleMobile.addEventListener('click', function () {
      toggleLang();
      if (burger) {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('mobile-menu--open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Product tab filtering ---
  var tabs = document.querySelectorAll('.products__tab, .filter-btn');
  var cards = document.querySelectorAll('.product-card');

  if (tabs.length && cards.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var filter = tab.getAttribute('data-tab') || tab.getAttribute('data-filter');
        var activeClass = tab.classList.contains('filter-btn') ? 'filter-btn--active' : 'products__tab--active';

        tabs.forEach(function (t) {
          t.classList.remove('products__tab--active');
          t.classList.remove('filter-btn--active');
        });
        tab.classList.add(activeClass);

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
  }

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

  // --- Contact form ---
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        var originalText = btn.innerHTML;
        btn.innerHTML = '<span class="fr">Message envoye !</span><span class="en">Message sent!</span>';
        btn.disabled = true;
        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });
  }

})();
