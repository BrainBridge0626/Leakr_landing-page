<script>
  import { onMount, onDestroy } from 'svelte';
  import { repel } from '$lib/actions/repel.js';

  export let initialData;
  export let index;
  export let getNextSubscription; // function to fetch a subscription not currently visible

  let current = { ...initialData };
  
  // Typing states
  let typedId = current.id;
  let typedName = current.name;
  let typedLabel = current.label;
  let typedStatus = current.status;
  let typedPrice = current.price;
  let logoOpacity = 1;
  let isCancelled = false;

  let timer;

  // Typewriter effect function
  async function transitionTo(next) {
    isCancelled = false;
    // 1. Fade out logo
    logoOpacity = 0;
    
    // 2. Backspace text
    while (
      typedId.length > 0 ||
      typedName.length > 0 ||
      typedLabel.length > 0 ||
      typedStatus.length > 0 ||
      typedPrice.length > 0
    ) {
      if (typedId.length > 0) typedId = typedId.slice(0, -1);
      if (typedName.length > 0) typedName = typedName.slice(0, -1);
      if (typedLabel.length > 0) typedLabel = typedLabel.slice(0, -1);
      if (typedStatus.length > 0) typedStatus = typedStatus.slice(0, -1);
      if (typedPrice.length > 0) typedPrice = typedPrice.slice(0, -1);
      await new Promise(r => setTimeout(r, 15));
    }

    // 3. Switch subscription data
    const preservedRotation = current.rotation;
    current = { ...next, rotation: preservedRotation };
    logoOpacity = 1;

    // 4. Type in new text
    const maxLen = Math.max(
      current.id.length,
      current.name.length,
      current.label.length,
      current.status.length,
      current.price.length
    );

    for (let i = 0; i < maxLen; i++) {
      if (i < current.id.length) typedId += current.id[i];
      if (i < current.name.length) typedName += current.name[i];
      if (i < current.label.length) typedLabel += current.label[i];
      if (i < current.status.length) typedStatus += current.status[i];
      if (i < current.price.length) typedPrice += current.price[i];
      await new Promise(r => setTimeout(r, 25));
    }
  }

  onMount(() => {
    // Staggered interval to cycle subscriptions
    const delay = 6000 + index * 2500;
    
    const cycle = async () => {
      const nextSub = getNextSubscription(current.name);
      if (nextSub) {
        await transitionTo(nextSub);
      }
      timer = setTimeout(cycle, 8000);
    };

    timer = setTimeout(cycle, delay);
  });

  onDestroy(() => {
    if (timer) clearTimeout(timer);
  });
</script>

<div use:repel={{ radius: 120, force: 35 }} class="transition-transform duration-300 ease-out relative z-10">
  <div 
    class="receipt-paper p-3 md:p-3.5 font-mono border border-black/5 shadow-md cursor-pointer {current.bgClass || ''}" 
    style="--rotation: {current.rotation}deg;"
    role="button"
    tabindex="0"
    onclick={() => (isCancelled = true)}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') isCancelled = true; }}
  >
    <!-- Header -->
    <div class="flex items-center justify-between pb-1.5 border-b border-dashed border-black/15">
      <span class="font-bold tracking-wider text-[10px] md:text-[11px] {current.idColor || 'text-slate-500'}">
        {typedId || '\u00A0'}
      </span>
      <div style="opacity: {logoOpacity}; transition: opacity 0.2s;" class="flex-shrink-0">
        <!-- Render Logo SVGs dynamically based on key -->
        {#if current.logoKey === 'adobe'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 22h5l3-7.5h4l3 7.5h5L12 2zm-1.2 10.5L12 9.5l1.2 3h-2.4z" fill="#FA0F00"/>
          </svg>
        {:else if current.logoKey === 'netflix'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <path d="M4 2v20h4V9.5l8 12.5h4V2h-4v12.5L8 2H4z" fill="#E50914"/>
          </svg>
        {:else if current.logoKey === 'chatgpt'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#10A37F"/>
            <path d="M12 7v10M7 12h10M8.5 8.5l7 7M8.5 15.5l7-7" stroke="#FFF" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        {:else if current.logoKey === 'disney'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#113CCF"/>
            <path d="M7 10c2-2 6-2 8 0m-9 3c3-3 7-3 10 0" stroke="#FFF" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        {:else if current.logoKey === 'spotify'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#1DB954"/>
            <path d="M16.5 8.5c-2.5-.5-5-.2-6.8 1m7.8 2.2c-2.8-.7-5.8-.4-7.8 1m6.8 2.4c-2.3-.6-4.8-.4-6.4.8" stroke="#FFF" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        {:else if current.logoKey === 'youtube'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000"/>
            <path d="M10 9l6 3-6 3V9z" fill="#FFF"/>
          </svg>
        {:else if current.logoKey === 'amazon'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FF9900"/>
            <path d="M7 14c3 2 7 2 10 0m-2 1l2-1-1-2" stroke="#FFF" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        {:else if current.logoKey === 'hulu'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#1CE783"/>
            <path d="M8 9v6m4-6v6m4-6v6" stroke="#000" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        {:else if current.logoKey === 'icloud'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#007AFF"/>
            <path d="M8 14a3 3 0 013-3 3.5 3.5 0 016.8 1 2.5 2.5 0 01-.8 5H8z" fill="#FFF"/>
          </svg>
        {:else if current.logoKey === 'apple-music'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FC3C44"/>
            <path d="M9 17V7l8-2v10M9 13a2.5 2.5 0 11-2.5-2.5H9v2.5m8-3.5A2.5 2.5 0 1114.5 7H17v3" stroke="#FFF" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        {:else if current.logoKey === 'dropbox'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <path d="M6 4l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM6 16l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zm-6-8l6-4 6 4-6 4-6-4z" fill="#0061FE"/>
          </svg>
        {:else if current.logoKey === 'slack'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#4A154B"/>
            <path d="M9 9a1.5 1.5 0 11-1.5-1.5H9V9zm0 2.5v3A1.5 1.5 0 017.5 16H6v-1.5a1.5 1.5 0 011.5-1.5h1.5zm6.5-3.5a1.5 1.5 0 111.5 1.5H15V8zm0 2.5v3A1.5 1.5 0 0113.5 16H12v-1.5a1.5 1.5 0 011.5-1.5h1.5z" fill="#FFF"/>
          </svg>
        {:else if current.logoKey === 'figma'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <path d="M8 5a3 3 0 113 3H8V5zm0 6a3 3 0 013 3v3a3 3 0 11-3-3v-3zm6-6a3 3 0 113 3h-3V5zm0 6a3 3 0 113 3H14v-3zm0 6a3 3 0 113 3H14v-3z" fill="#F24E1E"/>
          </svg>
        {:else if current.logoKey === 'github'}
          <svg class="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#24292F"/>
            <path d="M12 6a4 4 0 00-4 4c0 2.5 2 3.8 3 4.2v-1.2c-1.5.3-1.8-.6-1.8-.6a1.5 1.5 0 00-.6-.8c-.5-.3 0-.3 0-.3.6 0 1 .6 1 .6.5.9 1.4.6 1.8.5a1 1 0 01.3-.7c-1.2-.2-2.5-.6-2.5-2.8 0-.6.2-1.1.6-1.5a2 2 0 01.1-1.5s.5-.1 1.6.6a5 5 0 012.6 0c1-.7 1.6-.6 1.6-.6a2 2 0 01.1 1.5c.4.4.6.9.6 1.5 0 2.2-1.3 2.6-2.5 2.8.2.2.4.6.4 1.2v1.8c1-.4 3-1.7 3-4.2a4 4 0 00-4-4z" fill="#FFF"/>
          </svg>
        {/if}
      </div>
    </div>

    <!-- Content -->
    <div class="py-1.5 flex flex-col gap-0.5">
      <p class="m-0 font-bold uppercase text-[11px] md:text-xs truncate" style="color: var(--ink);">
        {typedName || '\u00A0'}
      </p>
      
      <div class="flex justify-between text-slate-500 text-[9px] md:text-[10px]">
        <span>{typedLabel || '\u00A0'}</span>
        <span class="font-bold {current.statusColor || 'text-slate-700'}">
          {typedStatus || '\u00A0'}
        </span>
      </div>
      
      <div class="flex justify-between border-t border-dashed border-black/10 pt-1 font-bold text-[10.5px] md:text-xs">
        <span>{current.priceLabel || 'TOTAL'}</span>
        <span class={current.priceColor || 'text-slate-800'}>{typedPrice || '\u00A0'}</span>
      </div>
    </div>

    <!-- Warning Stamp -->
    {#if current.logoKey === 'netflix' && typedId === 'WARNING'}
      <div class="absolute -bottom-1 -left-1 transform -rotate-12 px-1.5 py-0.5 border border-red-500 text-[7.5px] font-bold text-red-500 tracking-wider rounded bg-white shadow-xs">
        AUTO-PAY
      </div>
    {/if}

    <!-- Cancel Stamp -->
    {#if isCancelled}
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-stamp-down">
        <div class="w-12 h-12 rounded-full border-[3px] border-double border-red-500 bg-white/95 flex flex-col items-center justify-center shadow-md">
          <span class="font-data text-[8px] font-black text-red-500 tracking-wider leading-none">CANCEL</span>
          <div class="w-8 h-[1px] bg-red-400 my-0.5"></div>
          <span class="font-data text-[4px] font-extrabold text-red-500/85 tracking-widest leading-none">LEAKR</span>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .receipt-paper {
    font-size: 9.5px;
    --rotation-scale: 0.3;
    transform: rotate(calc(var(--rotation) * var(--rotation-scale)));
    transition: transform 200ms ease;
  }
  .receipt-paper:hover {
    transform: rotate(0deg) scale(1.05) !important;
    z-index: 30;
  }
  
  @media (max-width: 639px) {
    .receipt-paper {
      padding: 6px !important;
    }
    .receipt-paper * {
      font-size: 8px !important;
    }
    .receipt-paper svg {
      width: 10px !important;
      height: 10px !important;
    }
  }

  @media (min-width: 640px) {
    .receipt-paper {
      --rotation-scale: 0.6;
    }
  }

  @media (min-width: 768px) {
    .receipt-paper {
      font-size: 12px;
      --rotation-scale: 1;
    }
  }

  @keyframes stamp-down {
    0% {
      opacity: 0;
      transform: scale(2.5) rotate(-30deg);
    }
    70% {
      opacity: 1;
      transform: scale(0.9) rotate(-10deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(-12deg);
    }
  }

  .animate-stamp-down {
    animation: stamp-down 300ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }
</style>
