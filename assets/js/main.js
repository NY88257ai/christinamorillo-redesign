/* ============================================================
   C:\hristina Morillo — main.js
   ============================================================ */

(function () {

  /* ── Theme & Font Switcher ── */
  var THEMES = ['terminal', 'light', 'cream'];
  var FONTS  = ['instrument', 'dm', 'playfair'];

  var currentTheme = localStorage.getItem('cm-theme') || 'terminal';
  var currentFont  = localStorage.getItem('cm-font')  || 'instrument';

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.querySelectorAll('[data-sw-theme]').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.swTheme === t);
    });
  }

  function applyFont(f) {
    document.documentElement.setAttribute('data-font', f);
    document.querySelectorAll('[data-sw-font]').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.swFont === f);
    });
  }

  function setTheme(t) {
    currentTheme = t;
    localStorage.setItem('cm-theme', t);
    applyTheme(t);
  }

  function setFont(f) {
    currentFont = f;
    localStorage.setItem('cm-font', f);
    applyFont(f);
  }

  function initSwitcher() {
    document.querySelectorAll('[data-sw-theme]').forEach(function(btn) {
      btn.addEventListener('click', function() { setTheme(btn.dataset.swTheme); });
    });
    document.querySelectorAll('[data-sw-font]').forEach(function(btn) {
      btn.addEventListener('click', function() { setFont(btn.dataset.swFont); });
    });
    applyTheme(currentTheme);
    applyFont(currentFont);
  }

  /* ── Mobile Nav ── */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function() {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Scroll Fade-in ── */
  function initFade() {
    var targets = document.querySelectorAll('.stat, .post, .book, .part-card, .blog-item, .podcast-card, .blockquote');
    targets.forEach(function(el) { el.classList.add('fade-up'); });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function(el) { el.classList.add('visible'); });
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    targets.forEach(function(el) { obs.observe(el); });

    /* stagger stats */
    document.querySelectorAll('.stat').forEach(function(el, i) {
      el.style.transitionDelay = (i * 80) + 'ms';
    });
  }

  /* ── Blog Filter ── */
  function initFilter() {
    var btns  = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.blog-item');
    if (!btns.length) return;

    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var tag = btn.dataset.tag;
        btns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        items.forEach(function(item) {
          var tags = item.dataset.tags || '';
          item.classList.toggle('hidden', tag !== 'all' && !tags.includes(tag));
        });
      });
    });
  }

  /* ── Subscribe Form ── */
  window.handleSubscribe = function(e) {
    e.preventDefault();
    var input = e.target.querySelector('input[type="email"]');
    var msg   = document.getElementById('subscribeMsg');
    if (!input) return;
    if (msg) msg.textContent = "You're on the list.";
    input.value = '';
    if (msg) setTimeout(function() { msg.textContent = ''; }, 4000);
  };

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function() {
    initSwitcher();
    initNav();
    initFade();
    initFilter();
  });

})();
