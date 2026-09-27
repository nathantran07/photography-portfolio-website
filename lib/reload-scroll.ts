// This runs in the document head, before the browser can restore an old anchor.
// Only a full reload uses the saved position; normal navigation stays native.
export const reloadScrollScript = `(() => {
  const key = 'portfolio-reload-position';
  const url = () => location.pathname + location.search + location.hash;
  let saved;
  try {
    saved = JSON.parse(sessionStorage.getItem(key) || 'null');
    sessionStorage.removeItem(key);
  } catch {}

  function savePosition() {
    const body = document.body;
    const locked = body?.style.position === 'fixed';
    const x = locked ? -(parseFloat(body.style.left) || 0) : window.scrollX;
    const y = locked ? -(parseFloat(body.style.top) || 0) : window.scrollY;
    try { sessionStorage.setItem(key, JSON.stringify({ url: url(), x, y })); } catch {}
  }
  window.addEventListener('pagehide', savePosition);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') savePosition();
  });

  if (performance.getEntriesByType('navigation')[0]?.type !== 'reload' ||
      saved?.url !== url() || !Number.isFinite(saved.x) || !Number.isFinite(saved.y)) return;

  const restoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  let finished = false;
  const inputs = ['pointerdown', 'touchstart', 'wheel', 'keydown'];

  function restorePosition() {
    if (!finished) window.scrollTo({ left: saved.x, top: saved.y, behavior: 'instant' });
  }
  function finish() {
    finished = true;
    history.scrollRestoration = restoration;
    document.removeEventListener('DOMContentLoaded', restorePosition);
    inputs.forEach(type => window.removeEventListener(type, finish, true));
  }
  // Stop restoring as soon as the visitor interacts, even on a slow connection.
  inputs.forEach(type => window.addEventListener(type, finish, { capture: true, passive: true }));
  document.addEventListener('DOMContentLoaded', restorePosition, { once: true });
  window.addEventListener('pageshow', () => {
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      restorePosition();
      finish();
    }));
  }, { once: true });
})();`;
