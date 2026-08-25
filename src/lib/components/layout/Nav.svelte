<script>
  import Button from '$lib/components/ui/Button.svelte';
  import { scrollY } from '$lib/stores/scroll.js';
  import { browserName } from '$lib/stores/browser.js';

  let frosted = $derived($scrollY > 60);
  let isOverDark = $state(false);

  // Mobile nav state
  let mobileOpen = $state(false);

  const links = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'Privacy',      href: '#privacy' },
    { label: 'FAQ',          href: '#faq' },
  ];

  function closeMobile() { mobileOpen = false; }

  // Check if header is overlapping any dark sections on scroll
  $effect(() => {
    const sy = $scrollY; // read scrollY to track scroll updates reactively
    if (typeof window === 'undefined') return;

    const darkSections = document.querySelectorAll('.dark-section');
    let over = false;
    const headerHeight = 80; // approximate height of nav header

    for (const el of darkSections) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= headerHeight && rect.bottom >= 0) {
        over = true;
        break;
      }
    }
    isOverDark = over;
  });
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-[300ms]"
  style="
    background: {frosted 
      ? (isOverDark ? 'rgba(20, 18, 16, 0.90)' : 'rgba(250, 246, 242, 0.88)') 
      : 'transparent'};
    backdrop-filter: {frosted ? 'blur(12px)' : 'none'};
    box-shadow: {frosted 
      ? (isOverDark ? '0 4px 20px rgba(0,0,0,0.25)' : 'var(--shadow-puddle-sm)') 
      : 'none'};
    border-bottom: {frosted && isOverDark ? '1px solid rgba(255,255,255,0.06)' : 'none'};
  "
>
  <nav class="max-w-6xl mx-auto px-6 flex md:grid md:grid-cols-3 items-center justify-between h-16 md:h-20">

    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 no-underline md:justify-self-start" aria-label="Leakr home">
      <!-- Droplet SVG mark -->
      <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 0 C14 0 0 14 0 22 C0 29.7 6.3 34 14 34 C21.7 34 28 29.7 28 22 C28 14 14 0 14 0Z" fill="var(--teal)"/>
        <circle cx="9" cy="24" r="2.5" fill="rgba(255,255,255,0.5)"/>
      </svg>
      <span 
        class="font-display text-xl font-[460] transition-colors duration-200" 
        style="color: {isOverDark ? 'rgba(255,255,255,0.95)' : 'var(--ink)'};"
      >
        Leakr
      </span>
    </a>

    <!-- Desktop links -->
    <ul class="hidden md:flex items-center gap-8 list-none m-0 p-0 md:justify-self-center">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="font-body text-sm font-medium no-underline transition-colors duration-200 hover:text-teal"
            style="color: {isOverDark ? 'rgba(255, 255, 255, 0.65)' : 'var(--slate)'};"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Desktop CTA -->
    <div class="hidden md:flex md:justify-self-end">
      <Button
        href="https://chrome.google.com/webstore"
        variant="primary"
        size="sm"
      >
        Add to {$browserName} — it's free
      </Button>
    </div>

    <!-- Mobile hamburger -->
    <button
      class="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-0 cursor-pointer"
      aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={mobileOpen}
      onclick={() => (mobileOpen = !mobileOpen)}
    >
      <span 
        class="block w-6 h-0.5 transition-all duration-200" 
        style="
          background: {isOverDark ? 'rgba(255,255,255,0.95)' : 'var(--ink)'};
          transform: {mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
        "
      ></span>
      <span 
        class="block w-6 h-0.5 transition-all duration-200" 
        style="
          background: {isOverDark ? 'rgba(255,255,255,0.95)' : 'var(--ink)'};
          opacity: {mobileOpen ? '0' : '1'};
        "
      ></span>
      <span 
        class="block w-6 h-0.5 transition-all duration-200" 
        style="
          background: {isOverDark ? 'rgba(255,255,255,0.95)' : 'var(--ink)'};
          transform: {mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'};
        "
      ></span>
    </button>
  </nav>

  <!-- Mobile nav dropdown -->
  <div
    class="md:hidden overflow-hidden transition-all duration-[300ms]"
    style="
      max-height: {mobileOpen ? '400px' : '0'};
      background: {isOverDark ? 'rgba(20, 18, 16, 0.96)' : 'rgba(250, 246, 242, 0.96)'};
      backdrop-filter: blur(12px);
      border-bottom: {mobileOpen && isOverDark ? '1px solid rgba(255,255,255,0.06)' : 'none'};
    "
  >
    <ul class="flex flex-col list-none m-0 p-0 px-6 pb-6 pt-2 gap-4">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="font-body text-base font-medium no-underline block py-2 transition-colors duration-200"
            style="color: {isOverDark ? 'rgba(255,255,255,0.85)' : 'var(--ink)'};"
            onclick={closeMobile}
          >
            {link.label}
          </a>
        </li>
      {/each}
      <li class="pt-2">
        <Button href="https://chrome.google.com/webstore" variant="primary" size="md">
          Add to {$browserName} — it's free
        </Button>
      </li>
    </ul>
  </div>
</header>
