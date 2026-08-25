<script>
  import { onMount } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { Flame, ShieldCheck, UserCheck, Zap, Check } from '@lucide/svelte';
  import ReceiptCard from '$lib/components/ui/ReceiptCard.svelte';
  import { browserName } from '$lib/stores/browser.js';

  const subscriptionPool = [
    { id: 'INV #9482', idColor: 'text-slate-500', name: 'Adobe CC', label: 'DUE IN', status: '2 DAYS', statusColor: 'text-orange-500', price: '$54.99', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'adobe', rotation: -4.5 },
    { id: 'WARNING', idColor: 'text-orange-600', name: 'Netflix', label: 'RENEWS', status: 'TOMORROW', statusColor: 'text-red-500', price: '$15.49', priceColor: 'text-red-500', priceLabel: 'TOTAL', bgClass: '', logoKey: 'netflix', rotation: 3.5 },
    { id: 'INV #8472', idColor: 'text-slate-500', name: 'ChatGPT Plus', label: 'DUE IN', status: '6 DAYS', statusColor: 'text-orange-500', price: '$20.00', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'chatgpt', rotation: -2.5 },
    { id: 'BILL #2839', idColor: 'text-slate-500', name: 'Disney+', label: 'TRIAL', status: '3 DAYS', statusColor: 'text-orange-500', price: '$13.99', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'disney', rotation: 4.5 },
    { id: 'INV #3829', idColor: 'text-slate-500', name: 'Spotify', label: 'DUE IN', status: '14 DAYS', statusColor: 'text-slate-700', price: '$10.99', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'spotify', rotation: -3.5 },
    { id: 'SAVED', idColor: 'text-emerald-600', name: 'YouTube', label: 'ACTION', status: 'CANCELLED', statusColor: 'text-emerald-600', price: '$13.99', priceColor: 'text-emerald-600', priceLabel: 'SAVED', bgClass: 'bg-emerald-50/20', logoKey: 'youtube', rotation: 3.0 },
    { id: 'BILL #9012', idColor: 'text-slate-500', name: 'Amazon Prime', label: 'TRIAL', status: '2 DAYS', statusColor: 'text-orange-500', price: '$14.99', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'amazon', rotation: -4.5 },
    { id: 'UNUSED', idColor: 'text-orange-600', name: 'Hulu Stream', label: 'RENEWS', status: '5 DAYS', statusColor: 'text-red-500', price: '$17.99', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'hulu', rotation: 2.5 },
    { id: 'SAVED', idColor: 'text-emerald-600', name: 'iCloud+ 2TB', label: 'ACTION', status: 'CANCELLED', statusColor: 'text-emerald-600', price: '$9.99', priceColor: 'text-emerald-600', priceLabel: 'SAVED', bgClass: 'bg-emerald-50/20', logoKey: 'icloud', rotation: -3.5 },
    
    // Additional pool subscriptions to cycle in
    { id: 'INV #4820', idColor: 'text-slate-500', name: 'Apple Music', label: 'RENEWS', status: 'IN 3 DAYS', statusColor: 'text-orange-500', price: '$10.99', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'apple-music', rotation: 2.0 },
    { id: 'WARNING', idColor: 'text-orange-600', name: 'Dropbox', label: 'TRIAL', status: '1 DAY', statusColor: 'text-red-500', price: '$11.99', priceColor: 'text-red-500', priceLabel: 'TOTAL', bgClass: '', logoKey: 'dropbox', rotation: -3.0 },
    { id: 'BILL #1093', idColor: 'text-slate-500', name: 'Slack Pro', label: 'DUE IN', status: '8 DAYS', statusColor: 'text-slate-700', price: '$8.75', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'slack', rotation: 1.5 },
    { id: 'WARNING', idColor: 'text-orange-600', name: 'GitHub Copilot', label: 'RENEWS', status: 'TOMORROW', statusColor: 'text-red-500', price: '$10.00', priceColor: 'text-red-500', priceLabel: 'TOTAL', bgClass: '', logoKey: 'github', rotation: -4.0 },
    { id: 'INV #7729', idColor: 'text-slate-500', name: 'Figma Pro', label: 'DUE IN', status: '4 DAYS', statusColor: 'text-orange-500', price: '$15.00', priceColor: 'text-slate-800', priceLabel: 'TOTAL', bgClass: '', logoKey: 'figma', rotation: 3.5 }
  ];

  let activeNames = subscriptionPool.slice(0, 9).map(s => s.name);

  function getNextSubscription(currentName) {
    const available = subscriptionPool.filter(s => !activeNames.includes(s.name));
    if (available.length === 0) return null;
    
    const next = available[Math.floor(Math.random() * available.length)];
    activeNames = activeNames.map(name => name === currentName ? next.name : name);
    return next;
  }

  let heroContainer;
  let cardElementsCache = [];
  let assuranceCardElement;

  function handleScroll() {
    if (typeof window === 'undefined' || cardElementsCache.length === 0) return;
    const scrollY = window.scrollY;
    
    cardElementsCache.forEach((card, i) => {
      // Staggered wind flow settings for each card index
      const startScroll = i * 28; // tighter stagger for smoother flow
      const duration = 180; // slightly longer duration
      const endScroll = startScroll + duration;

      let p = 0;
      if (scrollY <= startScroll) {
        p = 0;
      } else if (scrollY >= endScroll) {
        p = 1;
      } else {
        p = (scrollY - startScroll) / duration;
      }

      if (p === 0) {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.pointerEvents = '';
        return;
      }

      // 1. Organic wind trajectories based on card index i
      // Vary the horizontal direction: blow to the right but with different side drafts
      const driftX = 180 + (i % 3) * 60 + Math.sin(i * 1.7) * 45; // custom X speed
      const tx = p * driftX;

      // Vary the vertical lift: blow upwards at different speeds
      const liftY = 320 + Math.floor(i / 3) * 50 + Math.cos(i * 2.3) * 60; // custom Y speed
      const ty = -p * liftY;

      // Vary the rotation: clockwise or counter-clockwise at different speeds
      const rotDir = (i % 2 === 0 ? 1 : -1);
      const rotSpeed = 24 + (i % 3) * 8 + Math.cos(i) * 10;
      const rotate = rotDir * p * rotSpeed;

      // 2. Delayed fade: only fade in the final 15% of the flight path
      const opacity = p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1;

      card.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rotate}deg)`;
      card.style.opacity = opacity;
      card.style.pointerEvents = p > 0.3 ? 'none' : ''; 
      card.style.willChange = 'transform, opacity';
    });

    // Reveal assurance card underneath as receipts fly off
    if (assuranceCardElement) {
      const startFade = 100;
      const endFade = 360;
      
      let ap = 0;
      if (scrollY <= startFade) {
        ap = 0;
      } else if (scrollY >= endFade) {
        ap = 1;
      } else {
        ap = (scrollY - startFade) / (endFade - startFade);
      }
      
      if (ap === 0) {
        assuranceCardElement.style.opacity = '0';
        assuranceCardElement.style.transform = 'translate3d(0, 20px, 0) scale(0.9)';
        assuranceCardElement.style.pointerEvents = 'none';
      } else {
        assuranceCardElement.style.opacity = ap.toString();
        assuranceCardElement.style.transform = `translate3d(0, ${(1 - ap) * 20}px, 0) scale(${0.9 + ap * 0.1})`;
        assuranceCardElement.style.pointerEvents = ap > 0.5 ? 'auto' : 'none';
      }
    }
  }

  function cacheCards() {
    if (!heroContainer) return;
    cardElementsCache = Array.from(heroContainer.querySelectorAll('.receipt-card-animate-wrapper'));
    assuranceCardElement = heroContainer.querySelector('.hero-assurance-card');
  }

  onMount(() => {
    cacheCards();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      cacheCards();
      handleScroll();
    });
    
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  });
</script>

<section id="hero" bind:this={heroContainer} class="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-28 pb-12 md:pt-36 md:pb-20" style="background: var(--mist);">
  <!-- Ambient rotating glowing blob top-right -->
  <div
    class="absolute pointer-events-none animate-spin-slow"
    style="
      top: -10%;
      right: -10%;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,90,31,0.14) 0%, rgba(253,241,232,0.08) 50%, transparent 70%);
      filter: blur(40px);
    "
    aria-hidden="true"
  ></div>

  <!-- Ambient pulsing glowing blob bottom-left -->
  <div
    class="absolute pointer-events-none animate-pulse-scale"
    style="
      bottom: -15%;
      left: -10%;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,90,31,0.08) 0%, transparent 70%);
      filter: blur(50px);
    "
    aria-hidden="true"
  ></div>

  <div class="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-20">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

      <!-- Left Text Block (7/12 width grid column for wide text fitting) -->
      <div class="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start justify-center py-2">

        <!-- Main Title (With 64px gap below) -->
        <h1 class="mb-14 leading-[1.15] text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-center lg:text-left" style="color: var(--ink);">
          <span class="inline-block md:whitespace-nowrap">Stop <span class="text-gradient-orange font-bold">leaking</span> money</span><br>
          <span class="inline-block md:whitespace-nowrap">on <span class="text-gradient-orange font-bold">subscriptions</span>.</span>
        </h1>

        <!-- Store CTA Buttons Group -->
        <div class="flex flex-wrap gap-4 items-center justify-center lg:justify-start mb-8">
          <Button href="https://chrome.google.com/webstore" variant="primary" size="md">
            Add to {$browserName} — It's Free
          </Button>
          <Button href="#how-it-works" variant="ghost" size="sm">
            See how it works →
          </Button>
        </div>

        <!-- Fine Print / Trust Microcopy -->
        <div class="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start">
          {#each ['Chrome & Brave compatible', 'Open source code', 'Zero tracking scripts'] as item}
            <span class="flex items-center gap-1.5 font-data text-xs" style="color: var(--slate);">
              <span class="inline-flex items-center justify-center w-4 h-4 rounded-full" style="background: var(--teal-soft); color: var(--teal); font-size: 9px;">✓</span>
              {item}
            </span>
          {/each}
        </div>
      </div>

      <!-- Right Visual Mockup Stack (Exact 512px Container 3x3 Grid) -->
      <div class="col-span-1 lg:col-span-5 flex justify-center lg:justify-end">
        <div class="relative w-full max-w-[512px] py-3">
          
          <!-- Ambient glow behind mockup -->
          <div
            class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center"
            aria-hidden="true"
          >
            <div
              style="
                width: 420px;
                height: 420px;
                background: radial-gradient(ellipse at center, rgba(255,90,31,0.14) 0%, transparent 75%);
                filter: blur(30px);
              "
            ></div>
          </div>

          <!-- Structured 3x3 Grid of 9 Subscription Paper Receipts inside 512px container -->
          <div class="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 w-full">
            {#each subscriptionPool.slice(0, 9) as initialSub, i}
              <div class="receipt-card-animate-wrapper">
                <ReceiptCard {initialSub} index={i} {getNextSubscription} initialData={initialSub} />
              </div>
            {/each}
          </div>

          <!-- Assuring safe text revealed behind the cards -->
          <div 
            class="hero-assurance-card absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-0 pointer-events-none"
            style="opacity: 0; transform: translate3d(0, 20px, 0) scale(0.9); will-change: transform, opacity;"
          >
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center border border-black/10 shadow-puddle mb-4 relative">
              <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C12 2 5.5 9.5 5.5 14.5C5.5 18.09 8.41 21 12 21C15.59 21 18.5 18.09 18.5 14.5C18.5 9.5 12 2 12 2Z" fill="var(--teal)"/>
              </svg>
            </div>
            <h3 class="text-lg md:text-xl font-bold font-display mb-1.5 text-gradient-orange">Stop the Leaks</h3>
            <p class="text-xs md:text-sm font-semibold max-w-[240px] leading-relaxed m-0" style="color: var(--ink);">
              Keep your hard-earned money.<br>
              <span class="text-orange-500 font-bold">No more forgotten trials.</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  /* Serrated paper edge for invoices */
  :global(.receipt-paper) {
    position: relative;
    background: #FFFFFF;
    border-radius: 4px 4px 0 0;
  }
  :global(.receipt-paper::after) {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 6px;
    background-image: 
      linear-gradient(135deg, #FFFFFF 3px, transparent 0), 
      linear-gradient(-135deg, #FFFFFF 3px, transparent 0);
    background-position: left bottom;
    background-size: 6px 6px;
    background-repeat: repeat-x;
  }

  /* Fluttering wind animation for paper sheets */
  :global(.animate-paper-1) {
    animation: paper-flutter-1 6s ease-in-out infinite alternate;
  }
  :global(.animate-paper-2) {
    animation: paper-flutter-2 7s ease-in-out infinite alternate;
  }
  :global(.animate-paper-3) {
    animation: paper-flutter-3 8s ease-in-out infinite alternate;
  }
  :global(.animate-paper-4) {
    animation: paper-flutter-4 6.5s ease-in-out infinite alternate;
  }
  :global(.animate-paper-5) {
    animation: paper-flutter-5 7.5s ease-in-out infinite alternate;
  }
  :global(.animate-paper-6) {
    animation: paper-flutter-6 8.5s ease-in-out infinite alternate;
  }

  @keyframes paper-flutter-1 {
    0%   { transform: translateY(0px) rotate(-8deg); }
    100% { transform: translateY(-8px) rotate(-5deg); }
  }
  @keyframes paper-flutter-2 {
    0%   { transform: translateY(0px) rotate(2deg); }
    100% { transform: translateY(-12px) rotate(5deg); }
  }
  @keyframes paper-flutter-3 {
    0%   { transform: translateY(0px) rotate(12deg); }
    100% { transform: translateY(-6px) rotate(14deg); }
  }
  @keyframes paper-flutter-4 {
    0%   { transform: translateY(0px) rotate(18deg); }
    100% { transform: translateY(-9px) rotate(20deg); }
  }
  @keyframes paper-flutter-5 {
    0%   { transform: translateY(0px) rotate(4deg); }
    100% { transform: translateY(-7px) rotate(6deg); }
  }
  @keyframes paper-flutter-6 {
    0%   { transform: translateY(0px) rotate(-12deg); }
    100% { transform: translateY(-11px) rotate(-9deg); }
  }
</style>

