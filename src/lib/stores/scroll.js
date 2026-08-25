// src/lib/stores/scroll.js
// Global scroll state — read by Trickle and Nav
import { writable, derived } from 'svelte/store';

export const scrollY = writable(0);
export const pageHeight = writable(0);
export const prefersReducedMotion = writable(false);

/** 0–1 progress through the page */
export const trickleProgress = derived(
  [scrollY, pageHeight],
  ([$scrollY, $pageHeight]) => {
    const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const max = Math.max($pageHeight - viewportH, 1);
    return Math.min($scrollY / max, 1);
  }
);
