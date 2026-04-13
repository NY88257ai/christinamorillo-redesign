/* ============================================================
   C:\hristina Morillo — main.js
   ============================================================ */
(function () {

  /* ── Theme & Font persistence ── */
  var currentTheme = localStorage.getItem('cm-theme') || 'terminal';
  var currentFont  = localStorage.getItem('cm-font')  || 'instrument';

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.querySelectorAll('[data-sw-theme]').forEach(function(b) {
      b.classList.toggle('active', b.dataset.swTheme === t);
    });
  }

  function applyFont(f) {
    document.documentElement.setAttribute('data-font', f);
    document.querySelectorAll('[data-sw-font]').forEach(function(b) {
      b.classList.toggle('active', b.dataset.swFont === f);
    });
  }

  function initSwitcher() {
    document.querySelectorAll('[data-sw-theme]').forEach(function(b) {
      b.addEventListener('click', function() {
        currentTheme = b.dataset.swTheme;
        localStorage.setItem('cm-theme', currentTheme);
        applyTheme(currentTheme);
      });
    });
    document.querySelectorAll('[data-sw-font]').forEach(function(b) {
      b.addEventListener('click', function() {
        currentFont = b.dataset.swFont;
        localStorage.setItem('cm-font', currentFont);
        applyFont(currentFont);
      });
    });
    applyTheme(currentTheme);
    applyFont(currentFont);
  }

  /* ── Live Clock (BSides SJ style) ── */
  function initClock() {
    var el = document.getElementById('siteClock');
    if (!el) return;
    function tick() {
      var now = new Date();
      var h = String(now.getHours()).padStart(2, '0');
      var m = String(now.getMinutes()).padStart(2, '0');
      var s = String(now.getSeconds()).padStart(2, '0');
      el.textContent = h + ':' + m + ':' + s;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── Scroll Fade ── */
  function initFade() {
    var targets = document.querySelectorAll('.blog-post, .part-card, .book, .podcast-grid, .dashed-card');
    targets.forEach(function(el) { el.classList.add('fade-up'); });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function(el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    targets.forEach(function(el) { obs.observe(el); });
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

  /* ── Subscribe ── */
  window.handleSubscribe = function(e) {
    e.preventDefault();
    var input = e.target.querySelector('input[type="email"]');
    var msg   = document.getElementById('subscribeMsg');
    if (input) input.value = '';
    if (msg) {
      msg.textContent = '> Connection established. You\'re on the list.';
      setTimeout(function() { msg.textContent = ''; }, 4000);
    }
  };

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function() {
    initSwitcher();
    initClock();
    initFade();
    initFilter();
  });

})();
