<script>
  import { ripple } from '$lib/actions/ripple.js';

  /**
   * @type {'primary' | 'ghost'}
   */
  let { variant = 'primary', size = 'md', href = null, onclick = null, children } = $props();

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const baseClasses = 'inline-flex items-center justify-center font-body font-medium transition-all duration-[260ms] cursor-pointer select-none relative overflow-hidden';

  const primaryClasses = 'bg-teal text-white rounded-full shadow-puddle hover:brightness-105 active:scale-[0.98]';
  const ghostClasses   = 'text-teal bg-transparent rounded-full border-0 underline-offset-4 hover:underline active:opacity-70';
</script>

{#if href}
  <a
    {href}
    class="{baseClasses} {sizeClasses[size]} {variant === 'primary' ? primaryClasses : ghostClasses}"
    use:ripple
  >
    {@render children?.()}
  </a>
{:else}
  <button
    class="{baseClasses} {sizeClasses[size]} {variant === 'primary' ? primaryClasses : ghostClasses}"
    use:ripple
    {onclick}
  >
    {@render children?.()}
  </button>
{/if}

<style>
  /* Custom shadow using CSS var since Tailwind v4 @theme registration */
  :global(.bg-teal) {
    background-color: var(--teal);
  }
  :global(.text-teal) {
    color: var(--teal);
  }
  :global(.shadow-puddle) {
    box-shadow: var(--shadow-puddle);
  }
</style>
