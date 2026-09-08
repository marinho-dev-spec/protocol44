/** Fit complete questions by reclaiming spacing, with a readable lower bound.
 * Never clip overflow: enlarged text, keyboards and disclosures remain scrollable. */
export function initializeQuizViewport(root: HTMLElement) {
  let frame = 0;
  function fit() {
    frame = 0;
    if (!root.classList.contains('q5-flow')) {
      delete root.dataset.density;
      return;
    }
    const header = document.querySelector<HTMLElement>('.header-surround')!;
    const footer = document.querySelector<HTMLElement>('.site-footer')!;
    const available = window.innerHeight - header.offsetHeight - footer.offsetHeight;
    for (const density of ['comfortable', 'compact', 'tight']) {
      root.dataset.density = density;
      if (root.scrollHeight <= available + 1) break;
    }
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(fit);
  };
  // Rendering and validation can alter the amount of visible text.
  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'open'] });
  window.addEventListener('resize', schedule);
  document.fonts.ready.then(schedule);
  schedule();
  return schedule;
}
