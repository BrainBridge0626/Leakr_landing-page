<script>
  import { onMount } from 'svelte';
  import StatChip from '$lib/components/ui/StatChip.svelte';
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';

  const stats = [
    { figure: '$200+',  caption: 'Average spent on forgotten\nsubscriptions per year',  source: 'CNET/YouGov, 2025' },
    { figure: '70%',    caption: 'Have forgotten to cancel\na free trial at least once', source: 'Self Financial, 2026' },
    { figure: '$12/mo', caption: 'Average cost of one\nforgotten trial',               source: 'C+R Research' },
  ];

  let containerElement;
  
  function handleScroll() {
    if (typeof window === 'undefined' || !containerElement) return;
    const items = containerElement.querySelectorAll('.problem-stat-wrapper');
    const isMobile = window.innerWidth < 768;

    items.forEach((item) => {
      const inner = item.querySelector('.stat-chip-container');
      if (!inner) return;

      if (!isMobile) {
        inner.style.transform = '';
        inner.style.opacity = '';
        return;
      }

      const rect = item.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;
      const itemCenter = rect.top + rect.height / 2;
      
      // Calculate normalized distance from viewport center (-1 to 1)
      let dist = (itemCenter - centerY) / centerY;
      dist = Math.max(-1.2, Math.min(1.2, dist));
      
      // 3D cylinder roll calculations
      const rotateX = dist * -28; // Max 28 degrees vertical tilt
      const translateY = dist * -16; // Parallax shift Y
      const scale = 1 - Math.min(0.15, Math.abs(dist) * 0.12);
      const opacity = 1 - Math.min(0.6, Math.abs(dist) * 0.5);
      
      inner.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        translate3d(0, ${translateY}px, 0)
        scale(${scale})
      `;
      inner.style.opacity = opacity;
      inner.style.transformOrigin = 'center center';
    });
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  });
</script>

<section id="problem" class="section-pad px-6 relative overflow-hidden" style="background: var(--mist);">
  <!-- Ambient background glowing blobs -->
  <div
    class="absolute pointer-events-none animate-pulse-scale"
    style="
      top: 10%;
      left: 10%;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,90,31,0.08) 0%, transparent 70%);
      filter: blur(45px);
    "
    aria-hidden="true"
  ></div>
  
  <div class="max-w-4xl mx-auto text-center relative z-20">

    <RevealWrapper>
      <h2 class="mb-6 leading-tight">Money doesn't disappear.<br><span class="text-gradient-orange font-bold">It leaks.</span></h2>
    </RevealWrapper>

    <RevealWrapper delay={80}>
      <p class="text-lg max-w-xl mx-auto mb-14" style="color: var(--slate);">
        Free trials are designed to be forgotten. The numbers make it
        uncomfortable — in the best possible way.
      </p>
    </RevealWrapper>

    <!-- Stat chips: centered column on mobile, row on desktop -->
    <div bind:this={containerElement} class="problem-stats-container">
      {#each stats as stat, i}
        <RevealWrapper delay={40 * (i + 1)} class="problem-stat-wrapper">
          <StatChip figure={stat.figure} caption={stat.caption} source={stat.source} />
        </RevealWrapper>
      {/each}
    </div>

  </div>
</section>

<style>
  .problem-stats-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 320px;
    margin: 0 auto;
    align-items: center;
  }

  :global(.problem-stat-wrapper) {
    width: 100%;
  }

  @media (min-width: 768px) {
    .problem-stats-container {
      flex-direction: row;
      justify-content: center;
      gap: 24px;
      max-width: none;
      align-items: stretch;
    }
    :global(.problem-stat-wrapper) {
      width: auto;
    }
  }
</style>
