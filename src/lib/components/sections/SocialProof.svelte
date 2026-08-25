<script>
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';
</script>

<!-- Social proof: regulatory tailwind strip (no fake testimonials) -->
<section id="social-proof" class="py-14 px-6 relative overflow-hidden" style="background: rgba(191,232,225,0.22);">
  <!-- Subtle official FTC seal background representing the legal right to cancel -->
  <div 
    class="absolute right-0 top-1/2 -translate-y-1/2 h-[120%] w-[320px] pointer-events-none select-none bg-no-repeat bg-right bg-contain z-0"
    style="
      background-image: url('/images/ftc_official_seal.jpg');
      mix-blend-mode: multiply;
      opacity: 0.07;
      mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);
      -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);
    "
  ></div>

  <div class="max-w-3xl mx-auto text-center relative z-10">

    <RevealWrapper>
      <p class="font-data text-xs mb-3 uppercase tracking-widest" style="color: var(--teal); opacity: 0.8;">Why now</p>
      <h2 class="text-2xl md:text-3xl mb-5">The FTC just made it a legal right to cancel in one click.</h2>
      <p class="font-body text-base max-w-xl mx-auto mb-0" style="color: var(--slate);">
        The FTC's Click-to-Cancel rule (effective 2025) requires companies to make cancellation
        as easy as signing up. Leakr finds the real cancel link for each service — 
        so you don't have to navigate a company's support maze to exercise that right.
      </p>
    </RevealWrapper>

    <!-- Chrome Web Store rating slot — swap in when live reviews exist -->
    <div id="cws-rating-slot" class="mt-8 hidden">
      <!-- Placeholder: replace with actual CWS review widget when installs exist -->
    </div>

  </div>
</section>
