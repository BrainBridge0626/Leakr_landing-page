<script>
  import { onMount } from 'svelte';
  import PricingCard from '$lib/components/ui/PricingCard.svelte';
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';

  let containerElement;

  function handleScroll() {
    if (typeof window === 'undefined' || !containerElement) return;
    const viewportHeight = window.innerHeight;
    const rect = containerElement.getBoundingClientRect();
    
    // Find all transform wrappers inside the container dynamically
    const wrappers = containerElement.querySelectorAll('.pricing-card-transform-wrapper');
    if (wrappers.length === 0) return;
    
    // The container starts entering viewport when its top is at viewportHeight
    // It is fully in view when its top is at 80px (header offset)
    const startY = viewportHeight;
    const endY = 80;
    
    let t = 0;
    if (rect.top <= endY) {
      t = 1;
    } else if (rect.top >= startY) {
      t = 0;
    } else {
      t = 1 - (rect.top - endY) / (startY - endY);
    }
    
    wrappers.forEach((el, i) => {
      // Calculate rotation and translation X/Y based on progress t
      const rotate = (i - 1) * 8 * (1 - t);
      const x = (i - 1) * 24 * (1 - t);
      const y = Math.abs(i - 1) * 12 * (1 - t);
      
      el.style.setProperty('--fan-rotate', `${rotate}deg`);
      el.style.setProperty('--fan-x', `${x}px`);
      el.style.setProperty('--fan-y', `${y}px`);
    });
  }

  onMount(() => {
    requestAnimationFrame(() => {
      handleScroll();
    });
  });

  const plans = [
    {
      tier: 'Free',
      price: '$0',
      priceNote: 'Forever free, no card needed',
      features: [
        'Track up to 5 trials',
        'Basic charge-date reminders',
        'Monthly bleed total',
        'No account required',
        'Chromium browsers',
      ],
      ctaLabel: 'Get started free',
      ctaHref: 'https://chrome.google.com/webstore',
      highlight: false,
      comingSoon: false,
    },
    {
      tier: 'Pro',
      price: '$24',
      priceNote: 'One-time · or $3/mo',
      features: [
        'Unlimited trial tracking',
        'Full cancel-link map',
        'Priority charge reminders',
        'Export & history',
        'Everything in Free',
      ],
      ctaLabel: 'Upgrade to Pro',
      ctaHref: 'https://chrome.google.com/webstore',
      highlight: true,
      comingSoon: false,
    },
    {
      tier: 'Family',
      price: '$49',
      priceNote: 'One-time · or $6/mo',
      features: [
        'Up to 5 browser profiles',
        'Unlimited tracking per profile',
        'Full cancel-link map',
        'Everything in Pro',
      ],
      ctaLabel: 'Join the waitlist',
      ctaHref: '#',
      highlight: false,
      comingSoon: true,
    },
  ];
</script>

<svelte:window onscroll={handleScroll} onresize={handleScroll} />

<section id="pricing" class="section-pad px-6 dark-section" style="background: #141210;">
  <div class="max-w-5xl mx-auto">

    <RevealWrapper>
      <div class="text-center mb-14">
        <h2 class="mb-4" style="color: rgba(255,255,255,0.95);">Simple, honest pricing</h2>
        <p class="text-lg max-w-md mx-auto" style="color: rgba(255,255,255,0.65);">
          One caught trial pays for Leakr Pro many times over.
          Start free — upgrade when it makes sense.
        </p>
      </div>
    </RevealWrapper>

    <!-- Symmetric 3-col grid (the one place for symmetry) -->
    <div 
      bind:this={containerElement}
      class="pricing-cards-container grid md:grid-cols-3 gap-6 items-center"
    >
      {#each plans as plan, i}
        <RevealWrapper 
          delay={60 * i}
          class="pricing-sticky-card"
          style="--i: {i};"
        >
          <div class="pricing-card-transform-wrapper">
            <PricingCard
              tier={plan.tier}
              price={plan.price}
              priceNote={plan.priceNote}
              features={plan.features}
              ctaLabel={plan.ctaLabel}
              ctaHref={plan.ctaHref}
              highlight={plan.highlight}
              comingSoon={plan.comingSoon}
            />
          </div>
        </RevealWrapper>
      {/each}
    </div>

    <!-- Note about Family tier -->
    <RevealWrapper delay={200}>
      <p class="text-center font-body mt-8" style="color: rgba(255,255,255,0.45); font-size: var(--fs-small);">
        Family sync is in development — join the waitlist to be notified when it ships.
      </p>
    </RevealWrapper>

  </div>
</section>

<style>
  @media (max-width: 767px) {
    .pricing-cards-container {
      display: flex;
      flex-direction: column;
      gap: 0px !important;
    }

    :global(.pricing-sticky-card) {
      position: sticky !important;
      transform: none !important;
      opacity: 1 !important;
      transition: none !important;
      bottom: calc((2 - var(--i)) * 52px) !important;
      z-index: calc(10 + var(--i)) !important;
      margin-bottom: 20px;
      width: 100%;
    }

    :global(.pricing-sticky-card) > :global(div) {
      box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    }

    .pricing-card-transform-wrapper {
      transform: translate3d(var(--fan-x, 0px), var(--fan-y, 0px), 0px) rotate(var(--fan-rotate, 0deg));
      transform-origin: center bottom;
      will-change: transform;
    }
  }
</style>
