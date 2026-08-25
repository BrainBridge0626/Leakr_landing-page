// src/lib/actions/reveal.js
// Scroll-reveal via IntersectionObserver
// Usage: <div use:reveal={{ delay: 80 }}>

/**
 * @param {HTMLElement} node
 * @param {{ delay?: number, threshold?: number }} options
 */
export function reveal(node, { delay = 0, threshold = 0.2 } = {}) {
  node.classList.add('reveal-target');

  // Check reduced motion preference
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    // Skip animation entirely — just show the element
    node.classList.add('revealed');
    return {};
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => node.classList.add('revealed'), delay);
        } else {
          node.classList.add('revealed');
        }
        observer.unobserve(node);
      }
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
