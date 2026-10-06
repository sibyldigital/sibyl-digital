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

// Case study gallery lightbox.
// Any <img> inside a .gallery opens full-size on click / Enter.
// Optional data-full="..." points the lightbox at a larger file than the tile.
// Arrow keys step through the gallery, Escape closes.
(function () {
  var imgs = [].slice.call(document.querySelectorAll('.gallery img'));
  if (!imgs.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image viewer');
  box.innerHTML =
    '<span class="lightbox__count"></span>' +
    '<button class="lightbox__close" aria-label="Close">&times;</button>' +
    '<button class="lightbox__prev" aria-label="Previous image">&larr;</button>' +
    '<button class="lightbox__next" aria-label="Next image">&rarr;</button>' +
    '<figure class="lightbox__figure"><img class="lightbox__img" alt="" />' +
    '<figcaption class="lightbox__caption"></figcaption></figure>';
  document.body.appendChild(box);

  var view = box.querySelector('.lightbox__img');
  var caption = box.querySelector('.lightbox__caption');
  var count = box.querySelector('.lightbox__count');
  var prev = box.querySelector('.lightbox__prev');
  var next = box.querySelector('.lightbox__next');
  var current = 0;
  var opener = null;

  if (imgs.length < 2) { prev.hidden = true; next.hidden = true; }

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    var img = imgs[current];
    view.src = img.getAttribute('data-full') || img.currentSrc || img.src;
    view.alt = img.alt;
    caption.textContent = img.alt;
    // Full-page screenshots and other tall images scroll instead of shrinking to a sliver
    box.classList.toggle('lightbox--scroll', (img.naturalHeight || +img.getAttribute('height')) > (img.naturalWidth || +img.getAttribute('width')) * 1.6);
    box.querySelector('.lightbox__figure').scrollTop = 0;
    count.textContent = imgs.length > 1 ? (current + 1) + ' / ' + imgs.length : '';
  }
  function open(i) {
    opener = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    box.querySelector('.lightbox__close').focus();
  }
  function close() {
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    view.removeAttribute('src');
    if (opener) opener.focus();
  }

  imgs.forEach(function (img, i) {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.addEventListener('click', function () { open(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  box.querySelector('.lightbox__close').addEventListener('click', close);
  prev.addEventListener('click', function () { show(current - 1); });
  next.addEventListener('click', function () { show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') {
      // Keep focus inside the dialog
      var f = [].slice.call(box.querySelectorAll('button')).filter(function (b) { return !b.hidden; });
      var idx = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
})();
