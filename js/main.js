// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });

  // Close the menu when a link is tapped
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Portfolio pillar filter.
// Cards carry data-pillars="business marketing systems" (any subset).
// Filter buttons carry data-filter="business|marketing|systems|all".
// Deep-linkable via ?pillar=business so home-page pillar links land filtered.
(function () {
  var bar = document.querySelector('.filter-bar');
  if (!bar) return;
  var cards = [].slice.call(document.querySelectorAll('.card[data-pillars]'));
  var buttons = [].slice.call(bar.querySelectorAll('.filter-btn'));
  var empty = document.querySelector('.filter-empty');

  function apply(pillar) {
    var shown = 0;
    cards.forEach(function (c) {
      var pillars = ' ' + (c.getAttribute('data-pillars') || '') + ' ';
      var show = pillar === 'all' || pillars.indexOf(' ' + pillar + ' ') > -1;
      c.classList.toggle('is-hidden', !show);
      if (show) shown++;
    });
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === pillar));
    });
    if (empty) empty.hidden = shown !== 0;
    if (window.history && history.replaceState) {
      var url = pillar === 'all' ? location.pathname : location.pathname + '?pillar=' + pillar;
      history.replaceState(null, '', url);
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
  });

  var params = new URLSearchParams(location.search);
  var initial = params.get('pillar') || 'all';
  if (!buttons.some(function (b) { return b.getAttribute('data-filter') === initial; })) initial = 'all';
  apply(initial);
})();

// Contact form: static-host friendly.
// GitHub Pages cannot process form POSTs. Until a form backend
// (Formspree, Basin, Netlify Forms, etc.) is wired in, submit opens
// the visitor's mail client with the details prefilled.
(function () {
  var form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var subject = encodeURIComponent(d.get('subject') || 'Website inquiry');
    var body = encodeURIComponent(
      'Name: ' + (d.get('first_name') || '') + ' ' + (d.get('last_name') || '') + '\n' +
      'Email: ' + (d.get('email') || '') + '\n' +
      'Phone: ' + (d.get('phone') || '') + '\n\n' +
      (d.get('message') || '')
    );
    window.location.href = 'mailto:sibyldigital@gmail.com?subject=' + subject + '&body=' + body;
  });
})();
