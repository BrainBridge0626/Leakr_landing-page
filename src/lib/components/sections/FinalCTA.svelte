<script>
  import Button from '$lib/components/ui/Button.svelte';
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';
  import { browserName } from '$lib/stores/browser.js';
</script>

<section id="final-cta" class="section-pad px-6 relative overflow-hidden">

  <!-- Silk / cloth watery background — pure CSS, zero JS -->
  <!-- SVG feTurbulence gives the morphing wave distortion like the reference -->
  <div class="liquid-bg" aria-hidden="true"></div>

  <!-- Soft vignette overlay so text stays legible -->
  <div class="absolute inset-0 pointer-events-none" style="
    background: radial-gradient(ellipse 80% 60% at 50% 50%,
      transparent 30%,
      rgba(253,241,232,0.55) 100%);
  "></div>

  <div class="relative z-10 max-w-2xl mx-auto text-center">
    <RevealWrapper>
      <h2 class="mb-5">Stop the leak. Keep your money.</h2>
      <p class="text-lg mb-10 max-w-lg mx-auto" style="color: var(--slate);">
        Takes 30 seconds to install. No account. No bank link. Nothing to lose.
      </p>

      <Button href="https://chrome.google.com/webstore" variant="primary" size="lg">
        Add to {$browserName} — it's free
      </Button>

      <div class="flex flex-wrap justify-center gap-5 mt-7">
        {#each ['No account', 'No bank link', 'Nothing leaves your device'] as item}
          <span class="flex items-center gap-1.5 font-data text-sm" style="color: var(--slate);">
            <span style="color: var(--teal);">✓</span>
            {item}
          </span>
        {/each}
      </div>
    </RevealWrapper>
  </div>

</section>

<style>
  /* ─── Silk / watery cloth background ─────────────────────────────────────
     Uses two layered gradients shifted by an SVG turbulence displacement
     filter. The filter itself is animated via CSS — no JS needed.
     GPU-composited: only opacity + filter properties animate.
  ─────────────────────────────────────────────────────────────────────────── */
  .liquid-bg {
    position: absolute;
    inset: -10%;          /* bleed past edges so distortion never shows gaps */
    z-index: 0;
    /* Our brand colours: warm orange & teal on the cream mist base */
    background:
      radial-gradient(ellipse 120% 80% at 20% 30%,
        rgba(255, 90, 31, 0.22) 0%,
        transparent 65%),
      radial-gradient(ellipse 100% 90% at 80% 70%,
        rgba(191, 232, 225, 0.35) 0%,
        transparent 60%),
      radial-gradient(ellipse 80% 60% at 55% 50%,
        rgba(255, 90, 31, 0.10) 0%,
        transparent 70%),
      var(--mist);
    filter: url(#silk-warp) blur(0px);
    animation: bg-drift 18s ease-in-out infinite alternate;
  }

  /* Gently shift the gradient centres — creates the flowing "cloth" motion */
  @keyframes bg-drift {
    0%   { background-position: 0% 0%; filter: url(#silk-warp) blur(0px); }
    33%  { background-position: 40% 20%; }
    66%  { background-position: 60% 80%; }
    100% { background-position: 100% 100%; filter: url(#silk-warp) blur(0px); }
  }
</style>

<!--
  Hidden SVG that defines the turbulence displacement filter.
  Placed inline so it's always available. The <animate> inside
  feTurbulence is what creates the slow morphing warp.
-->
<svg width="0" height="0" style="position:absolute;overflow:hidden;" aria-hidden="true">
  <defs>
    <filter id="silk-warp" color-interpolation-filters="sRGB"
            x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.008 0.012"
        numOctaves="3"
        seed="4"
        result="turb"
      >
        <!-- Animate baseFrequency to morph the wave pattern over time -->
        <animate
          attributeName="baseFrequency"
          values="0.008 0.012; 0.013 0.007; 0.006 0.015; 0.010 0.009; 0.008 0.012"
          dur="22s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </feTurbulence>
      <feDisplacementMap
        in="SourceGraphic"
        in2="turb"
        scale="55"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
</svg>
