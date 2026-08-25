<script>
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Check } from '@lucide/svelte';

  let {
    tier,
    price,
    priceNote = '',
    features = [],
    ctaLabel,
    ctaHref = '#',
    highlight = false,
    comingSoon = false,
  } = $props();
</script>

<div
  class="relative flex flex-col rounded-[var(--r-lg)] p-8 transition-all duration-[260ms]"
  style="
    background: {highlight ? '#1C1916' : 'rgba(28, 25, 22, 0.6)'};
    border: {highlight ? '2px solid var(--teal)' : '1px solid rgba(255, 255, 255, 0.08)'};
    box-shadow: {highlight ? '0 14px 30px rgba(255, 90, 31, 0.1), 0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.2)'};
    transform: {highlight ? 'scale(1.05)' : 'scale(1)'};
    z-index: {highlight ? '10' : '1'};
  "
>
  {#if highlight}
    <div class="absolute top-5 right-5">
      <span
        class="inline-flex items-center font-data text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full text-white"
        style="background: var(--teal);"
      >
        Popular
      </span>
    </div>
  {:else if comingSoon}
    <div class="absolute top-5 right-5">
      <Badge text="Coming soon" variant="coming-soon" />
    </div>
  {/if}

  <!-- Tier name -->
  <p class="font-data text-sm font-bold uppercase tracking-wider mb-2" style="color: var(--teal);">{tier}</p>

  <!-- Price -->
  <div class="mb-1">
    <span class="font-data text-5xl font-medium" style="color: rgba(255, 255, 255, 0.95); font-variant-numeric: tabular-nums;">{price}</span>
  </div>
  {#if priceNote}
    <p class="font-body text-sm mb-6" style="color: rgba(255, 255, 255, 0.55);">{priceNote}</p>
  {:else}
    <div class="mb-6"></div>
  {/if}

  <!-- Feature list -->
  <ul class="flex flex-col gap-3 list-none m-0 p-0 mb-8 flex-1">
    {#each features as feature}
      <li class="flex items-start gap-2.5">
        <span class="shrink-0 mt-0.5" style="color: var(--teal);">
          <Check size={16} strokeWidth={2.5} />
        </span>
        <span class="font-body text-sm leading-snug" style="color: rgba(255, 255, 255, 0.65);">{feature}</span>
      </li>
    {/each}
  </ul>

  <!-- CTA -->
  <Button
    href={ctaHref}
    variant={highlight ? 'primary' : 'ghost'}
    size="md"
  >
    {ctaLabel}
  </Button>
</div>
