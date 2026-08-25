<script>
  import { onMount } from 'svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';
  import { Eye, BellRing, MousePointerClick } from '@lucide/svelte';

  const steps = [
    {
      num: '01',
      icon: Eye,
      title: 'Browse normally',
      body: 'Leakr runs quietly in your browser, watching for trial sign-up pages and checkout signals as you shop — no input needed from you.',
    },
    {
      num: '02',
      icon: BellRing,
      title: 'Get warned before you\'re charged',
      body: 'A few days before your trial ends, Leakr shows the exact charge date and amount, right in your browser toolbar — before the money leaves.',
    },
    {
      num: '03',
      icon: MousePointerClick,
      title: 'Cancel in one click',
      body: 'Every alert links directly to the real cancel page for that service — not a support search or a help maze. One click, done.',
    },
  ];

  let howItWorksContainer;
  let scrollProgress = $state(0);

  function handleScroll() {
    if (typeof window === 'undefined' || !howItWorksContainer) return;
    const rect = howItWorksContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // The section starts entering viewport at rect.top = viewportHeight
    // It is fully scrolled past at rect.bottom = 0
    const totalRange = rect.height + viewportHeight;
    const currentPos = viewportHeight - rect.top;
    
    let progress = currentPos / totalRange;
    progress = Math.max(0, Math.min(1, progress));
    
    scrollProgress = progress;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial run
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  });
</script>

<section id="how-it-works" bind:this={howItWorksContainer} class="section-pad px-6 relative overflow-hidden" style="background: var(--surface);">
  <!-- Subtle top-left orange light blob -->
  <div
    class="absolute pointer-events-none animate-pulse-scale"
    style="
      top: -10%;
      left: -5%;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,90,31,0.06) 0%, transparent 70%);
      filter: blur(40px);
    "
    aria-hidden="true"
  ></div>

  <div class="max-w-5xl mx-auto relative z-20">

    <RevealWrapper>
      <div class="text-center mb-16">
        <h2 class="mb-4">How <span class="text-gradient-orange font-bold">it works</span></h2>
        <p class="text-lg max-w-lg mx-auto" style="color: var(--slate);">
          Three steps. No account. No configuration. It just works.
        </p>
      </div>
    </RevealWrapper>

    <div class="relative">
      <!-- Connected, flowing dashed line (Desktop: Horizontal) -->
      <div
        class="hidden md:block absolute top-14 left-0 right-0 pointer-events-none"
        aria-hidden="true"
        style="height: 20px; z-index: 0; transform: scaleX({Math.min(1, scrollProgress * 1.3)}); transform-origin: left center;"
      >
        <svg width="100%" height="20" style="overflow: visible;">
          <!-- Flowing dashed current -->
          <line x1="16%" y1="10" x2="84%" y2="10"
            stroke="var(--teal)"
            stroke-width="2.5"
            stroke-dasharray="8 6"
            class="flowing-line"
            style="opacity: 0.65; filter: drop-shadow(0 0 3px var(--teal));"
          />
        </svg>
      </div>

      <!-- Connected, flowing dashed line (Mobile: Vertical) -->
      <div
        class="block md:hidden absolute pointer-events-none"
        aria-hidden="true"
        style="top: 48px; bottom: 48px; left: 50%; width: 20px; transform: translateX(-50%) scaleY({Math.min(1, scrollProgress * 1.3)}); transform-origin: top center; z-index: 0;"
      >
        <svg class="w-full h-full" style="overflow: visible;">
          <line x1="10" y1="0" x2="10" y2="100%"
            stroke="var(--teal)"
            stroke-width="2.5"
            stroke-dasharray="8 6"
            class="flowing-line"
            style="opacity: 0.65; filter: drop-shadow(0 0 3px var(--teal));"
          />
        </svg>
      </div>

      <!-- Step cards -->
      <div class="grid md:grid-cols-3 gap-8">
        {#each steps as step, i}
          <RevealWrapper delay={80 * i}>
            <div class="relative h-full group step-card-container">
              <!-- Background Cogs (peeking out from behind the card) -->
              <svg class="gear-large absolute -bottom-10 -right-10 w-28 h-28 pointer-events-none select-none z-0" 
                style="transform: rotate({(i % 2 === 0 ? 1 : -1) * scrollProgress * 360}deg); transform-origin: center;"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg class="gear-small absolute bottom-12 -right-8 w-16 h-16 pointer-events-none select-none z-0" 
                style="transform: rotate({(i % 2 === 0 ? -1 : 1) * scrollProgress * 360}deg); transform-origin: center;"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>

              <!-- Step card content -->
              <Card class="p-7 flex flex-col gap-5 h-full relative z-10 bg-white">
                <!-- Step number + icon -->
                <div class="flex items-center justify-between">
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12"
                    style="background: var(--teal-soft); border: 1.5px solid rgba(255, 90, 31, 0.3);"
                  >
                    <svelte:component this={step.icon} size={22} color="var(--teal)" />
                  </div>
                  <span class="font-data text-sm font-bold" style="color: var(--teal);">{step.num}</span>
                </div>

                <div>
                  <h3 class="mb-2 text-xl font-bold" style="color: var(--ink);">{step.title}</h3>
                  <p class="text-sm leading-relaxed m-0" style="color: var(--slate);">{step.body}</p>
                </div>
              </Card>
            </div>
          </RevealWrapper>
        {/each}
      </div>
    </div>

  </div>
</section>

<style>
  @keyframes flow-dashed {
    to {
      stroke-dashoffset: -14;
    }
  }
  :global(.flowing-line) {
    animation: flow-dashed 0.8s linear infinite;
  }

  @keyframes spin-clockwise {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spin-counter-clockwise {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }

  .gear-large, .gear-small {
    transform-origin: center;
    color: rgba(255, 90, 31, 0.15);
    transition: color 0.3s ease;
  }

  :global(.step-card-container:hover .gear-large) {
    color: rgba(255, 90, 31, 0.45) !important;
    animation: spin-clockwise 15s linear infinite;
  }
  :global(.step-card-container:hover .gear-small) {
    color: rgba(255, 90, 31, 0.45) !important;
    animation: spin-counter-clockwise 8s linear infinite;
  }
</style>
