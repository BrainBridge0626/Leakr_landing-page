// src/lib/actions/ripple.js
// Water-ripple click effect on buttons
// Usage: <button use:ripple>

/**
 * @param {HTMLElement} node
 */
export function ripple(node) {
  /** @param {MouseEvent} e */
  function handleClick(e) {
    const rect = node.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.className = 'ripple-circle';
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top  = `${e.clientY - rect.top}px`;

    // Ensure relative positioning on the button
    const existing = getComputedStyle(node).position;
    if (existing === 'static') node.style.position = 'relative';
    node.style.overflow = 'hidden';

    node.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove(), { once: true });
  }

  node.addEventListener('click', handleClick);
  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    }
  };
}
