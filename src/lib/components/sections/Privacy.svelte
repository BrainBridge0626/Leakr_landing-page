<script>
  import { onMount } from 'svelte';
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { Check, X, Minus, Lock, Eye, AlertTriangle, Radar, CreditCard, UserMinus, Link, Coins, Bell } from '@lucide/svelte';

  let tableWrapper;

  onMount(() => {
    if (tableWrapper) {
      requestAnimationFrame(() => {
        tableWrapper.scrollLeft = tableWrapper.scrollWidth;
      });
    }
  });

  const rows = [
    { label: 'Auto-detects trials',    icon: Radar,       nothing: false, manual: false, bankLinked: true,  leakr: true },
    { label: 'No bank link required',  icon: CreditCard,  nothing: true,  manual: true,  bankLinked: false, leakr: true },
    { label: 'No account needed',      icon: UserMinus,   nothing: true,  manual: true,  bankLinked: false, leakr: true },
    { label: 'Real cancel links',      icon: Link,        nothing: false, manual: false, bankLinked: 'partial', leakr: true },
    { label: 'Free to use',            icon: Coins,       nothing: true,  manual: true,  bankLinked: false, leakr: true },
    { label: 'Charge-date reminders',  icon: Bell,        nothing: false, manual: false, bankLinked: true,  leakr: true },
  ];

  const cols = ['Do nothing', 'Manual', 'Bank-linked', 'Leakr'];

  /**
   * @param {boolean | string} val
   * @param {boolean} isWhiteBg
   */
  function cellIcon(val, isWhiteBg = false) {
    if (val === true) {
      return { 
        component: Check,  
        color: isWhiteBg ? '#FFFFFF' : 'var(--teal)',  
        bg: isWhiteBg ? 'var(--teal)' : 'rgba(255, 90, 31, 0.15)' 
      };
    }
    if (val === 'partial') {
      return { 
        component: Minus,  
        color: 'var(--amber)', 
        bg: 'rgba(225, 29, 72, 0.15)' 
      };
    }
    return { 
      component: X,      
      color: '#C0C0C0',      
      bg: 'transparent' 
    };
  }
</script>

<section id="privacy" class="section-pad px-6 dark-section" style="background: #141210;">
  <div class="max-w-5xl mx-auto">

    <!-- Wireframe 3 Layout Card (Your data never leaves your device.) -->
    <RevealWrapper>
      <div 
        class="border-0 md:border rounded-none md:rounded-[var(--r-md)] overflow-hidden mb-16 grid grid-cols-1 md:grid-cols-2 bg-transparent md:bg-[#1C1916]"
        style="border-color: rgba(255,255,255,0.08);"
      >
        <!-- Left Side: White visual — clean "data stays inside" infographic -->
        <div class="bg-white rounded-2xl md:rounded-none p-7 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-full">

          <div class="w-full max-w-[260px] flex flex-col gap-3">

            <!-- Browser window mockup -->
            <div class="rounded-xl border border-black/10 overflow-hidden shadow-sm">
              <!-- Browser title bar -->
              <div class="flex items-center gap-1.5 px-3 py-2.5 border-b" style="background: #f9f9f9; border-color: rgba(0,0,0,0.07);">
                <span class="w-2 h-2 rounded-full bg-red-400"></span>
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="flex-1 mx-2 px-2 py-0.5 rounded text-[8.5px] font-body font-bold text-center" style="background: white; color: rgba(0,0,0,0.4); border: 1px solid rgba(0,0,0,0.07);">Protected in your browser</span>
              </div>
              <!-- Data items inside browser -->
              <div class="p-3 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <!-- Netflix Logo -->
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 2v20h4V9.5l8 12.5h4V2h-4v12.5L8 2H4z" fill="#E50914"/>
                  </svg>
                  <span class="font-body text-[10px] font-bold" style="color: var(--ink);">Netflix Trial</span>
                  <span class="ml-auto font-data text-[9px] font-bold px-1.5 py-0.5 rounded" style="background: rgba(255,90,31,0.10); color: var(--teal);">2 days left</span>
                </div>
                <div class="flex items-center gap-2">
                  <!-- Adobe CC Logo -->
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 22h5l3-7.5h4l3 7.5h5L12 2zm-1.2 10.5L12 9.5l1.2 3h-2.4z" fill="#FA0F00"/>
                  </svg>
                  <span class="font-body text-[10px] font-bold" style="color: var(--ink);">Adobe Creative Cloud</span>
                  <span class="ml-auto font-data text-[9px] font-bold px-1.5 py-0.5 rounded" style="background: rgba(255,90,31,0.10); color: var(--teal);">$54.99/mo</span>
                </div>
                <div class="flex items-center gap-2">
                  <!-- Spotify Logo -->
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#1DB954"/>
                    <path d="M16.5 8.5c-2.5-.5-5-.2-6.8 1m7.8 2.2c-2.8-.7-5.8-.4-7.8 1m6.8 2.4c-2.3-.6-4.8-.4-6.4.8" stroke="#FFF" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                  <span class="font-body text-[10px] font-bold" style="color: var(--ink);">Spotify Premium</span>
                  <span class="ml-auto font-data text-[9px] font-bold px-1.5 py-0.5 rounded" style="background: rgba(34,197,94,0.10); color: #16a34a;">14 days</span>
                </div>
              </div>
            </div>

            <!-- Device boundary barrier -->
            <div class="flex items-center gap-2">
              <div class="flex-1 border-t border-dashed" style="border-color: rgba(255,90,31,0.30);"></div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-wider" style="background: rgba(255,90,31,0.06); border-color: rgba(255,90,31,0.25); color: var(--teal);">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                  <rect x="1" y="5" width="8" height="6" rx="1.5" fill="var(--teal)" opacity="0.7"/>
                  <path d="M3 5V3.5a2 2 0 014 0V5" stroke="var(--teal)" stroke-width="1.2" fill="none"/>
                </svg>
                Your Device
              </div>
              <div class="flex-1 border-t border-dashed" style="border-color: rgba(255,90,31,0.30);"></div>
            </div>

            <!-- Blocked external servers -->
            <div class="rounded-xl border border-dashed p-3 relative overflow-hidden" style="border-color: rgba(239,68,68,0.20); background: rgba(239,68,68,0.03);">
              <!-- Crosshatch overlay -->
              <div class="absolute inset-0 opacity-[0.06]" style="background-image: repeating-linear-gradient(45deg, #EF4444 0, #EF4444 1px, transparent 0, transparent 50%); background-size: 8px 8px;"></div>
              <div class="relative flex items-center gap-3">
                <!-- Cloud icon (grayed) -->
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
                  <path d="M22 9.5A5 5 0 0013.17 6 7 7 0 106 20h16a4 4 0 000-8l-.17-.5" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.18)" stroke-width="1.2"/>
                </svg>
                <div class="flex-1">
                  <p class="font-data text-[9px] font-bold uppercase tracking-wider m-0" style="color: rgba(0,0,0,0.35);">Cloud Databases</p>
                  <p class="font-data text-[8px] m-0 line-through" style="color: rgba(0,0,0,0.22);">tracking logs blocked</p>
                </div>
                <!-- Red X badge -->
                <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style="background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25);">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <line x1="2" y1="2" x2="8" y2="8" stroke="#EF4444" stroke-width="1.8" stroke-linecap="round"/>
                    <line x1="8" y1="2" x2="2" y2="8" stroke="#EF4444" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Bottom caption -->
            <p class="text-center m-0 font-data text-[9px] font-bold uppercase tracking-wider" style="color: rgba(0,0,0,0.25);">
              no banks · no tracking servers
            </p>

          </div>
        </div>

        <!-- Right Side: Content Block (Top Tag, Main Content, Bottom Action) -->
        <div class="px-0 py-8 md:p-12 flex flex-col justify-between h-full min-h-[300px]">

          <!-- Main Content -->
          <div class="my-auto">
            <h2 class="mb-4 text-2xl md:text-3xl font-extrabold" style="color: rgba(255,255,255,0.92);">
              Your data never leaves<br>your device.
            </h2>
            <p class="text-sm md:text-base leading-relaxed m-0" style="color: rgba(255,255,255,0.50); line-height: 1.65;">
              Bank-linked tracking apps demand full credentials and build profiles of your monthly purchases on remote databases. 
              Leakr does the entire job inside your local browser extension sandbox. No databases, no servers, and no third-party APIs.
            </p>
          </div>

          <!-- Bottom Action Badge/Link -->
          <div class="mt-6">
            <a 
              href="#privacy" 
              class="inline-flex items-center gap-2 font-data text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border transition-all no-underline"
              style="color: rgba(255,255,255,0.70); background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12);"
            >
              <Lock size={12} style="color: var(--teal);" />
              100% Privacy Guarantee &rarr;
            </a>
          </div>
        </div>
      </div>
    </RevealWrapper>

    <!-- Compare Section Header -->
    <RevealWrapper>
      <div class="text-center mb-10">
        <h3 class="font-data text-xs font-bold uppercase tracking-widest mb-2" style="color: rgba(255,255,255,0.35);">Detailed Comparison</h3>
        <h2 class="text-xl md:text-2xl font-bold" style="color: rgba(255,255,255,0.88);">How we compare to other approaches</h2>
      </div>
    </RevealWrapper>

    <!-- Comparison Table (Subtle details comparison below) -->
    <RevealWrapper>
      <div 
        bind:this={tableWrapper}
        class="overflow-x-auto rounded-none md:rounded-[var(--r-md)] border-0 md:border -mx-6 md:mx-0" 
        style="border-color: rgba(255,255,255,0.08);"
      >
        <table class="w-full" style="border-collapse: collapse; background: #1C1916; min-width: 580px;">
          <thead>
            <tr>
              <th class="sticky left-0 z-10 text-left font-body text-xs p-4 pb-3 bg-[#1C1916] first-col" style="color: rgba(255,255,255,0.35); font-weight: 600; border-right: 1.5px solid rgba(255,255,255,0.08);"></th>
              {#each cols as col, i}
                <th
                  class="text-center font-data text-xs font-bold uppercase tracking-wider p-4 pb-3"
                  style="
                    color: {i === 3 ? '#1C1916' : 'rgba(255,255,255,0.4)'};
                    background: {i === 3 ? 'white' : 'transparent'};
                  "
                >
                  {col}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each rows as row, ri}
              <tr>
                <td class="sticky left-0 z-10 font-body text-sm font-semibold p-4 bg-[#1C1916] first-col" style="color: rgba(255,255,255,0.75); border-top: 1px solid rgba(255,255,255,0.07); border-right: 1.5px solid rgba(255,255,255,0.08);">
                  <div class="flex items-center gap-2.5">
                    <span style="color: var(--teal); opacity: 0.85;" class="inline-flex">
                      <svelte:component this={row.icon} size={15} />
                    </span>
                    <span>{row.label}</span>
                  </div>
                </td>
                {#each [row.nothing, row.manual, row.bankLinked, row.leakr] as val, ci}
                  {@const cell = cellIcon(val, ci === 3)}
                  <td
                    class="text-center p-4"
                    style="
                      background: {ci === 3 ? 'white' : 'transparent'};
                      border-top: 1px solid {ci === 3 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'};
                    "
                  >
                    <span
                      class="inline-flex items-center justify-center w-6 h-6 rounded-full"
                      style="background: {cell.bg}; color: {cell.color};"
                    >
                      <svelte:component this={cell.component} size={13} strokeWidth={2.6} />
                    </span>
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </RevealWrapper>

  </div>
</section>

<style>
  /* Sticky first column layout sizing constraints on mobile */
  .first-col {
    width: 43vw !important;
    max-width: 43vw !important;
    padding: 8px 12px !important;
  }

  @media (max-width: 639px) {
    .first-col span {
      font-size: 11px !important;
      line-height: 1.25 !important;
    }
    .first-col :global(svg) {
      width: 13px !important;
      height: 13px !important;
    }
  }

  @media (min-width: 768px) {
    .first-col {
      width: 40% !important;
      max-width: none !important;
      padding: 16px !important;
    }
  }
</style>
