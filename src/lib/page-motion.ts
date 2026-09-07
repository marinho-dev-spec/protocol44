/** Progressive enhancement: every entrance starts from visible server HTML. */
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

let mountedRoot: HTMLElement | null = null;
let disposePage: (() => void) | undefined;

function initializePageMotion() {
  if (mountedRoot === document.documentElement) return;
  disposePage?.();
  mountedRoot = document.documentElement;

  const lifecycle = new AbortController();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Map<Element, Animation>();
  let observer: IntersectionObserver | undefined;

  function cancelAnimation(element: Element) {
    animations.get(element)?.cancel();
    animations.delete(element);
  }

  function animate(
    element: Element,
    keyframes: Keyframe[],
    duration: number,
    delay = 0,
  ) {
    if (reducedMotion.matches || typeof element.animate !== 'function') return;
    cancelAnimation(element);
    const animation = element.animate(keyframes, {
      duration,
      delay,
      easing: EASE_OUT,
      // No persistent fill or inline hiding; CSS remains the resting state.
      fill: 'none',
      iterations: 1,
    });
    animations.set(element, animation);
    const release = () => {
      if (animations.get(element) === animation) animations.delete(element);
    };
    void animation.finished.then(release, release);
  }

  // Controls are initialized independently of motion and browser animation APIs.
  const story = document.querySelector<HTMLElement>('#example-story');
  if (story) {
    const panels = new Map(
      Array.from(story.querySelectorAll<HTMLElement>('[data-example-panel]'))
        .map((panel) => [panel.dataset.examplePanel ?? '', panel] as const),
    );
    const steps = Array.from(
      story.querySelectorAll<HTMLButtonElement>('button[data-example-step]'),
    ).filter((button) => panels.has(button.dataset.exampleStep ?? ''));

    for (const button of steps) {
      const index = button.dataset.exampleStep!;
      const panel = panels.get(index)!;
      button.type = 'button';
      button.id ||= `example-step-${index}`;
      panel.id ||= `example-panel-${index}`;
      button.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', button.id);
      if (!panel.hasAttribute('role')) panel.setAttribute('role', 'region');
    }

    let selectedIndex: string | undefined;
    const selectStep = (index: string, withFeedback: boolean) => {
      if (selectedIndex === index || !panels.has(index)) return;
      selectedIndex = index;

      for (const button of steps) {
        button.setAttribute('aria-pressed', String(button.dataset.exampleStep === index));
      }
      for (const [panelIndex, panel] of panels) {
        cancelAnimation(panel);
        panel.hidden = panelIndex !== index;
      }

      if (withFeedback) {
        // The new content is available immediately, including to assistive tech.
        animate(panels.get(index)!, [{ opacity: 0.76 }, { opacity: 1 }], 180);
      }
    };

    const initialStep = steps.find((button) => button.getAttribute('aria-pressed') === 'true')
      ?? steps[0];
    if (initialStep) selectStep(initialStep.dataset.exampleStep!, false);

    for (const button of steps) {
      // Native buttons already support Tab, Enter and Space without custom keys.
      button.addEventListener('click', () => selectStep(button.dataset.exampleStep!, true), {
        signal: lifecycle.signal,
      });
    }
  }

  function reveal(element: Element) {
    // Mark only meaningful groups. Default entrances use no spatial movement.
    const isText = element.getAttribute('data-motion') === 'text';
    animate(element, isText
      ? [{ opacity: 0.8, translate: '0 6px' }, { opacity: 1, translate: '0 0' }]
      : [{ opacity: 0.8 }, { opacity: 1 }], 320);
  }

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        // Consume before playing: scrolling backwards never repeats an entrance.
        observer?.unobserve(entry.target);
        reveal(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('[data-motion]')
      .forEach((element) => {
        // Hidden example panels have their own immediate interaction feedback.
        if (!element.closest('[hidden], [data-example-panel]')) observer?.observe(element);
      });
  }

  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    observer?.disconnect();
    for (const element of animations.keys()) cancelAnimation(element);
  }, { signal: lifecycle.signal });

  disposePage = () => {
    lifecycle.abort();
    observer?.disconnect();
    for (const element of animations.keys()) cancelAnimation(element);
    mountedRoot = null;
  };
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageMotion, { once: true });
  } else {
    initializePageMotion();
  }

  // Also safe if the Astro client router is added later; no duplicate listeners.
  document.addEventListener('astro:page-load', initializePageMotion);
  document.addEventListener('astro:before-swap', () => disposePage?.());
}

export {};
