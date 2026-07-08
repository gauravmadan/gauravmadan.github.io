/* ================================================================
   Depth rail: marker descends with scroll; the readout interpolates
   depth between section tops, anchored to the TOP of the viewport.
   Depth = a section's data-depth exactly when that section's top
   reaches the top of the screen. Plus the mobile menu toggle.
   ================================================================ */

(function () {
  const marker = document.getElementById('depth-marker');
  const readout = document.getElementById('depth-readout');
  const rail = document.querySelector('.depth-rail');
  const panels = Array.from(document.querySelectorAll('.panel[data-depth]'));

  function breakpoints() {
    // (scroll position, depth) pairs; clamped so the deepest value
    // is reachable even when the last section is shorter than the viewport
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pts = panels.map(p => ({
      y: Math.min(p.offsetTop, maxScroll),
      d: parseFloat(p.dataset.depth)
    }));
    pts.sort((a, b) => a.y - b.y);
    return { pts, maxScroll };
  }

  function depthAt(scrollTop, pts) {
    if (pts.length === 0) return 0;
    if (scrollTop <= pts[0].y) return pts[0].d;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if (scrollTop >= a.y && scrollTop < b.y) {
        const t = (scrollTop - a.y) / Math.max(1, b.y - a.y);
        return a.d + t * (b.d - a.d);
      }
    }
    return pts[pts.length - 1].d;
  }

  function updateDepth() {
    if (!marker || !rail || panels.length === 0) return;

    const scrollTop = window.scrollY;
    const { pts, maxScroll } = breakpoints();

    // Marker travels the rail proportionally to total scroll
    const frac = Math.min(1, scrollTop / maxScroll);
    const railHeight = rail.clientHeight - 12;
    marker.style.top = (frac * railHeight) + 'px';

    readout.textContent = Math.round(depthAt(scrollTop, pts)) + ' m';
  }

  window.addEventListener('scroll', updateDepth, { passive: true });
  window.addEventListener('resize', updateDepth);
  window.addEventListener('load', updateDepth);
  updateDepth();

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();