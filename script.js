document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  links.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.closings').forEach(function (box) {
    var track = box.querySelector('.closings-grid');
    var buttons = box.querySelectorAll('.closings__btn');
    if (!track || !buttons.length) return;

    function update() {
      var max = track.scrollWidth - track.clientWidth - 1;
      buttons.forEach(function (btn) {
        btn.disabled = btn.dataset.dir === '-1' ? track.scrollLeft <= 0 : track.scrollLeft >= max;
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.scrollBy({ left: Number(btn.dataset.dir) * (track.clientWidth + gap), behavior: 'smooth' });
      });
    });

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
});

// GHL's quiz widget auto-scrolls the parent page on each step change, and
// that calculation sometimes overshoots past the quiz on mobile. Correct it
// shortly after, but only when the quiz has clearly scrolled just out of view.
window.addEventListener('message', function (e) {
  if (e.origin !== 'https://api.leadconnectorhq.com') return;
  if (typeof e.data !== 'string' || e.data.indexOf('[iFrameSizer]') !== 0) return;
  var quiz = document.getElementById('b3iVhvzXFEKZi1ceVLT3');
  if (!quiz) return;
  setTimeout(function () {
    var rect = quiz.getBoundingClientRect();
    if (rect.bottom < 150 && rect.bottom > -600) {
      quiz.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, 150);
});
