import { writable } from 'svelte/store';

export const browserName = writable('Chrome');

if (typeof window !== 'undefined') {
  const ua = window.navigator.userAgent.toLowerCase();
  let detected = 'Chrome';
  
  if (window.navigator.brave) {
    detected = 'Brave';
  } else if (ua.includes('edg/')) {
    detected = 'Edge';
  } else if (ua.includes('opr/') || ua.includes('opera')) {
    detected = 'Opera';
  } else if (ua.includes('firefox')) {
    detected = 'Firefox';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    detected = 'Safari';
  }
  
  browserName.set(detected);
}
