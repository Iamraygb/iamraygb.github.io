(function () {
  // Header border on scroll
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Live Latent Ocean embed: only where framing is allowed (GitHub Pages / local preview)
  var embed = document.querySelector('.embed[data-src]');
  if (embed) {
    var h = location.hostname;
    if (/github\.io$/.test(h) || h === 'localhost' || h === '127.0.0.1') {
      var f = document.createElement('iframe');
      f.src = embed.getAttribute('data-src');
      f.title = 'Latent Ocean interactive prototype';
      f.loading = 'lazy';
      embed.insertBefore(f, embed.firstChild);
      var note = embed.querySelector('.embed-fallback p');
      if (note) note.textContent = 'Prefer a full window? Open Latent Ocean on its own page.';
    }
  }

  // Lightbox
  var lb = document.querySelector('.lightbox');
  var imgs = Array.prototype.slice.call(document.querySelectorAll('img[data-zoom]'));
  if (!lb || !imgs.length) return;
  var big = lb.querySelector('img'), cap = lb.querySelector('figcaption');
  var idx = 0, lastFocus = null;
  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    var el = imgs[idx];
    big.src = el.currentSrc || el.src; big.alt = el.alt;
    var fc = el.closest('figure') && el.closest('figure').querySelector('figcaption');
    cap.textContent = fc ? fc.textContent : el.alt;
  }
  function open(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; lb.querySelector('.lb-close').focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  imgs.forEach(function (el, i) {
    el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
    el.addEventListener('click', function () { open(i); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
