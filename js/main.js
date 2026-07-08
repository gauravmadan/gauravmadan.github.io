/* ================================================================
   Depth rail: the marker descends as you scroll, and the readout
   interpolates a "depth" between each section's data-depth value.
   Plus a small mobile menu toggle. No dependencies.
   ================================================================ */

(function () {
  const marker = document.getElementById('depth-marker');
  const readout = document.getElementById('depth-readout');
  const rail = document.querySelector('.depth-rail');
  const panels = Array.from(document.querySelectorAll('.panel[data-depth]'));

  function updateDepth() {
    if (!marker || !rail || panels.length === 0) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const frac = docHeight > 0 ? scrollTop / docHeight : 0;

    // Move the marker along the rail
    const railHeight = rail.clientHeight - 12;
    marker.style.top = (frac * railHeight) + 'px';

    // Interpolate depth between panels based on viewport centre
    const centre = scrollTop + window.innerHeight / 2;
    let depth = -500;

    for (let i = 0; i < panels.length; i++) {
      const p = panels[i];
      const top = p.offsetTop;
      const bottom = top + p.offsetHeight;
      const d = parseFloat(p.dataset.depth);

      if (centre >= top && centre < bottom) {
        const next = panels[i + 1];
        if (next) {
          const dNext = parseFloat(next.dataset.depth);
          const within = (centre - top) / (bottom - top);
          depth = d + within * (dNext - d);
        } else {
          depth = d;
        }
        break;
      }
      if (centre >= bottom) depth = d;
    }

    readout.textContent = Math.round(depth) + ' m';
  }

  window.addEventListener('scroll', updateDepth, { passive: true });
  window.addEventListener('resize', updateDepth);
  updateDepth();

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close menu after choosing a link
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
