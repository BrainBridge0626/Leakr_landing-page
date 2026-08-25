<script>
  import { onMount } from 'svelte';
  import { scrollY, pageHeight, trickleProgress, prefersReducedMotion } from '$lib/stores/scroll.js';

  // All 9 sections in page order
  const sections = [
    { id: 'hero',         label: 'Hero' },
    { id: 'problem',      label: 'Problem' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'privacy',      label: 'Privacy' },
    { id: 'features',     label: 'Features' },
    { id: 'social-proof', label: 'Social Proof' },
    { id: 'pricing',      label: 'Pricing' },
    { id: 'faq',          label: 'FAQ' },
    { id: 'final-cta',    label: 'Get Started' },
  ];

  // SVG virtual coordinate space
  const W   = 40;  // svg width
  const CX  = 20;  // centre x
  const VH  = 900; // virtual height units

  // Smoother, organic wiggle parameters
  const AMP  = 5.5;   // peak side-swing in px (reduced slightly for elegance)
  const FREQ = 0.022; // base frequency

  // Build the wiggly vine path from y=0 to y=VH
  function vinePath() {
    const steps = 300;
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * VH;
      // Multi-sine composite for a smooth, natural, organic line
      const x = CX
        + (AMP * 0.7) * Math.sin(y * FREQ * Math.PI * 2)
        + (AMP * 0.22) * Math.sin(y * FREQ * 2.2 * Math.PI * 2 + 0.8)
        + (AMP * 0.08) * Math.sin(y * FREQ * 4.5 * Math.PI * 2 + 2.1);
      d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  }

  const VINE_D = vinePath();

  // Given a fraction (0–1), find the x,y on the vine path in SVG units
  function vinePoint(frac) {
    const y = frac * VH;
    const x = CX
      + (AMP * 0.7) * Math.sin(y * FREQ * Math.PI * 2)
      + (AMP * 0.22) * Math.sin(y * FREQ * 2.2 * Math.PI * 2 + 0.8)
      + (AMP * 0.08) * Math.sin(y * FREQ * 4.5 * Math.PI * 2 + 2.1);
    return { x, y };
  }

  // State
  let activeSections  = $state(new Set());
  let reachedSections = $state(new Set());
  let poppingSection  = $state(null);
  let sectionFracs    = $state({});  // id → 0..1 position on page

  let svgEl = $state(null);
  let pathEl = $state(null);
  let totalLen = $state(1);

  onMount(() => {
    const measure = () => {
      const ph = document.documentElement.scrollHeight;
      const fracs = {};
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) fracs[id] = Math.min((el.getBoundingClientRect().top + window.scrollY) / ph, 0.99);
      });
      sectionFracs = fracs;
    };

    measure();
    window.addEventListener('resize', measure);

    // Cache path total length for dash-offset progress
    requestAnimationFrame(() => {
      if (pathEl) totalLen = pathEl.getTotalLength();
    });

    // IntersectionObserver for section active state
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          const id = e.target.id;
          if (e.isIntersecting) {
            activeSections = new Set([...activeSections, id]);
          } else {
            const s = new Set(activeSections);
            s.delete(id);
            activeSections = s;
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => { obs.disconnect(); window.removeEventListener('resize', measure); };
  });

  // Dash-offset tracks scroll progress & fills/unfills dots based on scroll position
  $effect(() => {
    if (pathEl && totalLen > 1) {
      const offset = totalLen * (1 - Math.min(Math.max($trickleProgress, 0), 1));
      pathEl.style.strokeDashoffset = offset;
    }

    const currentProgress = $trickleProgress;
    sections.forEach((sec, i) => {
      const frac = sectionFracs[sec.id] ?? (i / (sections.length - 1));
      // Give a tiny offset buffer to prevent premature unfilling when right at the border
      const passed = currentProgress >= (frac - 0.005);

      if (passed) {
        if (!reachedSections.has(sec.id)) {
          reachedSections = new Set([...reachedSections, sec.id]);
          poppingSection = sec.id;
          setTimeout(() => {
            if (poppingSection === sec.id) poppingSection = null;
          }, 700);
        }
      } else {
        if (reachedSections.has(sec.id)) {
          const next = new Set(reachedSections);
          next.delete(sec.id);
          reachedSections = next;
        }
      }
    });
  });

  // Droplet position on vine (fraction-based)
  let dropPt = $derived(vinePoint($trickleProgress));
</script>

<!-- Desktop only spine -->
<div
  class="hidden lg:block fixed z-30 pointer-events-none"
  style="left: 24px; top: 0; width: {W}px; height: 100vh;"
  aria-hidden="true"
>
  <svg
    bind:this={svgEl}
    width={W}
    viewBox="0 0 {W} {VH}"
    preserveAspectRatio="none"
    style="width: 100%; height: 100%;"
  >
    <!-- Ghost vine track (always shown, very faint) -->
    <path
      d={VINE_D}
      fill="none"
      stroke="var(--teal)"
      stroke-width="1.2"
      opacity="0.10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Drawn progress vine (fills as user scrolls) -->
    <path
      bind:this={pathEl}
      d={VINE_D}
      fill="none"
      stroke="var(--teal)"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.30"
      style="stroke-dasharray: {totalLen}; stroke-dashoffset: {totalLen};"
    />

    <!-- Glowing droplet riding the vine tip -->
    {#if !$prefersReducedMotion}
      <circle
        cx={dropPt.x}
        cy={dropPt.y}
        r="2.5"
        fill="var(--teal)"
        opacity="0.55"
        style="filter: drop-shadow(0 0 4px var(--teal));"
      />
    {/if}

    <!-- Section dots, placed at measured positions on the vine -->
    {#each sections as sec, i}
      {@const frac    = sectionFracs[sec.id] ?? (i / (sections.length - 1))}
      {@const pt      = vinePoint(frac)}
      {@const active  = activeSections.has(sec.id)}
      {@const reached = reachedSections.has(sec.id)}
      {@const popping = poppingSection === sec.id}

      <!-- Expanding ring burst on first reach -->
      {#if popping}
        <circle
          cx={pt.x} cy={pt.y}
          r="4"
          fill="none"
          stroke="var(--teal)"
          stroke-width="1.2"
          class="burst-ring"
          opacity="0.7"
        />
      {/if}

      <!-- Dot core -->
      <circle
        cx={pt.x}
        cy={pt.y}
        r={active ? 4.5 : reached ? 3.2 : 2.2}
        fill={reached ? 'var(--teal)' : 'none'}
        stroke="var(--teal)"
        stroke-width="1.4"
        opacity={reached ? 0.65 : 0.28}
        class={popping ? 'dot-bounce' : ''}
        style="transition: r 280ms cubic-bezier(0.34,1.56,0.64,1), opacity 280ms ease, fill 280ms ease;"
      />
    {/each}
  </svg>
</div>

<!-- Mobile: thin horizontal bar -->
<div
  class="lg:hidden fixed z-40 left-0 right-0"
  style="top: 64px; height: 2px; background: rgba(255,90,31,0.10);"
  aria-hidden="true"
>
  <div style="height:100%; background: var(--teal); width:{($trickleProgress*100).toFixed(1)}%; transition: width 50ms linear; opacity:0.40;"></div>
</div>

<style>
  @keyframes burst-out {
    0%   { r: 4px;  opacity: 0.7; }
    100% { r: 18px; opacity: 0; }
  }
  @keyframes dot-spring {
    0%   { transform: scale(1);   }
    35%  { transform: scale(2.0); }
    60%  { transform: scale(0.8); }
    80%  { transform: scale(1.15);}
    100% { transform: scale(1);   }
  }

  :global(.burst-ring) {
    transform-box: fill-box;
    transform-origin: center;
    animation: burst-out 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  :global(.dot-bounce) {
    transform-box: fill-box;
    transform-origin: center;
    animation: dot-spring 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
</style>
