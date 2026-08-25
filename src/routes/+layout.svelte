<script>
  import '../app.css';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Trickle from '$lib/components/layout/Trickle.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import { scrollY, pageHeight, prefersReducedMotion } from '$lib/stores/scroll.js';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    // Reduced motion check (done once at root)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.set(mq.matches);
    const handler = (e) => prefersReducedMotion.set(e.matches);
    mq.addEventListener('change', handler);

    // Scroll listener — single listener for the whole page
    function onScroll() {
      scrollY.set(window.scrollY);
    }

    function onResize() {
      pageHeight.set(document.body.scrollHeight);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial values
    onScroll();
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', handler);
    };
  });
</script>

<Nav />
<Trickle />

<main>
  {@render children()}
</main>

<Footer />
