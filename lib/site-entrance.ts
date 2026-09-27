// Decide before first paint. Session storage keeps refreshes and subsequent
// visits in this tab quiet; unavailable storage simply skips the entrance.
export const siteEntranceScript = `(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (location.pathname !== '/' || (location.hash && location.hash !== '#main') ||
      performance.getEntriesByType('navigation')[0]?.type !== 'navigate' || motion.matches) return;
  try {
    if (sessionStorage.getItem('portfolio-entrance-seen')) return;
    sessionStorage.setItem('portfolio-entrance-seen', '1');
  } catch { return; }

  const root = document.documentElement;
  const inputs = ['pointerdown', 'touchstart', 'wheel', 'keydown'];
  root.dataset.entrance = 'playing';
  const timeout = window.setTimeout(finish, 1800);
  function finish() {
    delete root.dataset.entrance;
    window.clearTimeout(timeout);
    document.removeEventListener('animationend', onEnd);
    inputs.forEach(type => window.removeEventListener(type, finish, true));
    window.removeEventListener('pagehide', finish);
    motion.removeEventListener('change', finish);
  }
  function onEnd(event) {
    if (event.animationName === 'site-reveal') finish();
  }
  document.addEventListener('animationend', onEnd);
  inputs.forEach(type => window.addEventListener(type, finish, { capture: true, passive: true }));
  window.addEventListener('pagehide', finish, { once: true });
  motion.addEventListener('change', finish, { once: true });
})();`;
