// src/lib/utils/trickle.js
// Trickle SVG path math utilities

/**
 * Build the SVG path data for a gentle vertical sine-wave
 * that runs from top to bottom of the given height.
 *
 * @param {number} height - total height in px
 * @param {number} amplitude - wave amplitude in px (default 12)
 * @param {number} wavelength - px per full wave cycle (default 600)
 * @param {number} cx - center x in SVG viewBox (default 24)
 * @returns {string} SVG path d attribute
 */
export function buildTricklePath(height, amplitude = 12, wavelength = 600, cx = 24) {
  const steps = Math.ceil(height / 4); // point every 4px
  const points = [];

  for (let i = 0; i <= steps; i++) {
    const y = (i / steps) * height;
    const x = cx + amplitude * Math.sin((2 * Math.PI * y) / wavelength);
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return points.join(' ');
}

/**
 * Get total SVG path length — must be called after the path element is in the DOM.
 * @param {SVGPathElement} pathEl
 * @returns {number}
 */
export function getPathLength(pathEl) {
  return pathEl.getTotalLength();
}

/**
 * Calculate strokeDashoffset to show 0→progress of the path.
 * @param {number} totalLength
 * @param {number} progress - 0 to 1
 * @returns {number}
 */
export function calcDashOffset(totalLength, progress) {
  return totalLength * (1 - Math.min(Math.max(progress, 0), 1));
}
