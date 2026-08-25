<script>
  import Card from '$lib/components/ui/Card.svelte';
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';
  import { Radar, Bell, Link2, Gauge, ShieldCheck, Eye } from '@lucide/svelte';

  const features = [
    { icon: Radar,       title: 'Auto-detect trials & subscriptions',   body: 'Leakr identifies trial sign-ups in real time using browser signals — no manual logging.' },
    { icon: Bell,        title: 'Charge-date reminders',                body: 'Get a heads-up days before you\'re charged, not after. With the exact date and amount.' },
    { icon: Link2,       title: 'One-click real cancel links',           body: 'Skips the support maze. Links go directly to the subscription cancel page for each service.' },
    { icon: Gauge,       title: 'Monthly bleed total dashboard',         body: 'See your true monthly spend from all tracked trials at a glance in the extension popup.' },
    { icon: ShieldCheck, title: 'Free tier, no signup required',         body: 'Track up to 5 trials, completely free, with no account and no email address required.' },
    { icon: Eye,         title: '100% Open Source & Audit-ready',        body: 'Runs locally in your extension client, allowing anyone to verify our privacy compliance.' },
  ];
</script>

<section id="features" class="section-pad px-6 relative overflow-hidden" style="background: var(--surface);">
  <!-- Subtle center orange light blob -->
  <div
    class="absolute pointer-events-none animate-pulse-scale"
    style="
      bottom: -10%;
      right: 15%;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,90,31,0.05) 0%, transparent 70%);
      filter: blur(40px);
    "
    aria-hidden="true"
  ></div>

  <div class="max-w-6xl mx-auto relative z-20">

    <!-- Top Part (Wireframe 2 Top Row: Header & Illustration) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
      <!-- Left Header -->
      <div class="col-span-1 lg:col-span-7">
        <RevealWrapper>
          <div class="text-left">
            <h2 class="mb-4 text-3xl md:text-4xl font-extrabold" style="color: var(--ink);">
              Everything <span class="text-gradient-orange font-bold">it does</span>
            </h2>
            <p class="text-base md:text-lg max-w-xl m-0 leading-relaxed" style="color: var(--slate);">
              A focused browser utility built to solve one specific problem: keeping your money in your pocket. No bloat, no trackers, no backends.
            </p>
          </div>
        </RevealWrapper>
      </div>

      <!-- Right Illustration Block: Orbital animation -->
      <div class="col-span-1 lg:col-span-5 relative orbit-illustration-wrapper">

        <!--
          GEOMETRY:
          • The logo anchor is at left:56px, top:50% (within this column).
          • Orbit center is 220px to the RIGHT of the logo = left:276px, top:50%.
          • Orbit radius = 220px.
          • Orbit ring left-edge = 276-220 = 56px = logo X  ✓
          • Orbit ring right-edge = 276+220 = 496px → clips off-screen  ✓
          • Cards start at top of orbit (arm pointing UP = -90°).
          • Cards reach logo position when arm is at 180° = 75% through orbit.
          • Card A has no delay; Card B has -5s delay (180° ahead).
        -->

        <!-- Logo anchor: the visual center around which everything is described -->
        <div class="absolute orbit-container" style="left: 45%; top: 50%; width: 0; height: 0; transform: translateY(-50%);">

          <!-- ─── Orbit rings (centered 300px to the right of the logo) ─── -->
          <!--
            Radius = 300px. Orbit center at x=logo+300.
            Right extreme = logo+600 → well off-screen.
            Top/bottom extremes = ±300px from logo center → clipped by section overflow-hidden.
            Only the left ~90° arc near the logo is ever visible.
          -->
          <!-- Primary dashed ring — the path cards travel on -->
          <div class="absolute rounded-full animate-spin-slow"
            style="
              width: 600px; height: 600px;
              border: 1.5px dashed rgba(255,90,31,0.28);
              top: var(--orbit-y); left: var(--orbit-x);
              transform: translate(-50%, -50%);
              animation-duration: 20s;
            "
            aria-hidden="true"
          ></div>
          <!-- Secondary inner ring (slower, opposite spin) -->
          <div class="absolute rounded-full animate-spin-slow"
            style="
              width: 440px; height: 440px;
              border: 1px dashed rgba(255,90,31,0.12);
              top: var(--orbit-y); left: var(--orbit-x);
              transform: translate(-50%, -50%);
              animation-direction: reverse;
              animation-duration: 14s;
            "
            aria-hidden="true"
          ></div>
          <!-- Small glow ring around logo -->
          <div class="absolute rounded-full animate-pulse-scale pointer-events-none"
            style="
              width: 130px; height: 130px;
              border: 1px solid rgba(255,90,31,0.18);
              top: 0; left: 0;
              transform: translate(-50%, -50%);
            "
            aria-hidden="true"
          ></div>

          <!-- ─── DETECTED label (above logo) ─── -->
          <div class="absolute pointer-events-none" style="top: -83px; left: 0; transform: translateX(-50%); white-space: nowrap;">
            <span class="font-data text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border"
              style="color: var(--teal); border-color: rgba(255,90,31,0.3); background: rgba(255,90,31,0.06); letter-spacing: 0.12em;">Detected</span>
          </div>

          <!-- ─── LOCAL SCAN label (below logo) ─── -->
          <div class="absolute pointer-events-none" style="top: 70px; left: 0; transform: translateX(-50%); white-space: nowrap;">
            <span class="font-data text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border"
              style="color: var(--teal); border-color: rgba(255,90,31,0.3); background: rgba(255,90,31,0.06); letter-spacing: 0.12em;">Local&nbsp;Scan</span>
          </div>

          <!-- ─── Leakr Logo (fixed, z-30, sits on top of orbiting cards) ─── -->
          <div class="absolute z-30 flex flex-col items-center pointer-events-none" style="top: 0; left: 0; transform: translate(-50%, -37px);">
            <div class="relative w-[74px] h-[74px] rounded-[18px] bg-white flex items-center justify-center animate-logo-click"
              style="border: 1.5px solid rgba(255,90,31,0.35); box-shadow: 0 8px 32px rgba(255,90,31,0.18), 0 0 0 8px rgba(255,90,31,0.06);">
              <!-- Scan beam -->
              <div class="absolute left-2 right-2 rounded-full animate-scan-beam"
                style="top: 50%; transform: translateY(-50%); height: 2px; background: linear-gradient(to right, rgba(255,90,31,0.2), rgba(255,90,31,0.85), rgba(255,90,31,0.2));">
              </div>
              <svg class="w-9 h-9 relative z-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C12 2 5.5 9.5 5.5 14.5C5.5 18.09 8.41 21 12 21C15.59 21 18.5 18.09 18.5 14.5C18.5 9.5 12 2 12 2Z" fill="var(--teal)"/>
              </svg>
            </div>
            <span class="font-data text-[7px] font-bold uppercase tracking-wider text-orange-500 mt-1.5 bg-white px-2 py-0.5 rounded-full border border-orange-200 shadow-sm">Leakr</span>
          </div>

          <!-- Floating "saved $[amount]" dynamic text indicators -->
          <div class="absolute z-40 font-data text-xs font-black saved-text-a pointer-events-none whitespace-nowrap">
            saved $15.49
          </div>
          <div class="absolute z-40 font-data text-xs font-black saved-text-b pointer-events-none whitespace-nowrap">
            saved $10.99
          </div>
          <div class="absolute z-40 font-data text-xs font-black saved-text-c pointer-events-none whitespace-nowrap">
            saved $54.99
          </div>
          <div class="absolute z-40 font-data text-xs font-black saved-text-d pointer-events-none whitespace-nowrap">
            saved $20.00
          </div>

          <!-- ─── Orbit Arm A (Netflix) — delay 0s ─── -->
          <div class="absolute orbit-arm-base orbit-arm-a"
            style="left: var(--orbit-x); top: var(--orbit-y); width: 300px; height: 0; transform-origin: 0px 0px; z-index: 10;"
          >
            <div class="absolute orbit-card-base orbit-card-a"
              style="left: 100%; top: 0; transform: translate(-50%, -50%);"
            >
                            <!-- Netflix Receipt -->
              <div class="orbit-card-inner receipt-paper relative flex flex-col p-2.5 font-mono text-[9px] md:text-[10px] bg-white border border-black/5 shadow-md"
                style="width: 144px;"
              >
                <div class="flex items-center justify-between pb-1 border-b border-dashed border-black/15">
                  <span class="font-bold tracking-wider text-orange-600 text-[8px]">WARNING</span>
                  <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style="background: #E50914;">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M5 3v18l7-10.8L19 21V3h-3v9.8L12 8 8 12.8V3H5z"/></svg>
                  </div>
                </div>
                <div class="py-1 flex flex-col gap-0.5 text-left">
                  <p class="m-0 font-bold uppercase text-[9.5px]" style="color: var(--ink);">Netflix</p>
                  <div class="flex justify-between text-slate-500 text-[8px]">
                    <span>RENEWS</span>
                    <span class="font-bold text-red-500">TOMORROW</span>
                  </div>
                  <div class="flex justify-between border-t border-dashed border-black/10 pt-1 font-bold text-[9px]">
                    <span>TOTAL</span>
                    <span class="text-red-500">$15.49</span>
                  </div>
                </div>
                <!-- Circular Canceled ink stamp inside card -->
                <div class="orbit-stamp orbit-stamp-a absolute inset-0 flex items-center justify-center pointer-events-none" style="opacity: 0; z-index: 20;">
                  <div class="w-12 h-12 rounded-full border-[3px] border-double border-red-500 bg-white/95 flex flex-col items-center justify-center shadow-md">
                    <span class="font-data text-[8px] font-black text-red-500 tracking-wider leading-none">CANCEL</span>
                    <div class="w-8 h-[1px] bg-red-400 my-0.5"></div>
                    <span class="font-data text-[4px] font-extrabold text-red-500/85 tracking-widest leading-none">LEAKR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ─── Orbit Arm B (Spotify) — delay -2.5s ─── -->
          <div class="absolute orbit-arm-base orbit-arm-b"
            style="left: var(--orbit-x); top: var(--orbit-y); width: 300px; height: 0; transform-origin: 0px 0px; z-index: 10;"
          >
            <div class="absolute orbit-card-base orbit-card-b"
              style="left: 100%; top: 0; transform: translate(-50%, -50%);"
            >
                            <!-- Spotify Receipt -->
              <div class="orbit-card-inner receipt-paper relative flex flex-col p-2.5 font-mono text-[9px] md:text-[10px] bg-white border border-black/5 shadow-md"
                style="width: 144px;"
              >
                <div class="flex items-center justify-between pb-1 border-b border-dashed border-black/15">
                  <span class="font-bold tracking-wider text-slate-500 text-[8px]">INV #3829</span>
                  <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style="background: #1DB954;">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="#1DB954"/>
                      <path d="M16.5 8.5c-2.5-.5-5-.2-6.8 1m7.8 2.2c-2.8-.7-5.8-.4-7.8 1m6.8 2.4c-2.3-.6-4.8-.4-6.4.8" stroke="#FFF" stroke-width="1.6" stroke-linecap="round"/>
                    </svg>
                  </div>
                </div>
                <div class="py-1 flex flex-col gap-0.5 text-left">
                  <p class="m-0 font-bold uppercase text-[9.5px]" style="color: var(--ink);">Spotify</p>
                  <div class="flex justify-between text-slate-500 text-[8px]">
                    <span>DUE IN</span>
                    <span>14 DAYS</span>
                  </div>
                  <div class="flex justify-between border-t border-dashed border-black/10 pt-1 font-bold text-[9px]">
                    <span>TOTAL</span>
                    <span>$10.99</span>
                  </div>
                </div>
                <!-- Circular Canceled ink stamp inside card -->
                <div class="orbit-stamp orbit-stamp-b absolute inset-0 flex items-center justify-center pointer-events-none" style="opacity: 0; z-index: 20;">
                  <div class="w-12 h-12 rounded-full border-[3px] border-double border-red-500 bg-white/95 flex flex-col items-center justify-center shadow-md">
                    <span class="font-data text-[8px] font-black text-red-500 tracking-wider leading-none">CANCEL</span>
                    <div class="w-8 h-[1px] bg-red-400 my-0.5"></div>
                    <span class="font-data text-[4px] font-extrabold text-red-500/85 tracking-widest leading-none">LEAKR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ─── Orbit Arm C (Adobe CC) — delay -5.0s ─── -->
          <div class="absolute orbit-arm-base orbit-arm-c"
            style="left: var(--orbit-x); top: var(--orbit-y); width: 300px; height: 0; transform-origin: 0px 0px; z-index: 10;"
          >
            <div class="absolute orbit-card-base orbit-card-c"
              style="left: 100%; top: 0; transform: translate(-50%, -50%);"
            >
                            <!-- Adobe CC Receipt -->
              <div class="orbit-card-inner receipt-paper relative flex flex-col p-2.5 font-mono text-[9px] md:text-[10px] bg-white border border-black/5 shadow-md"
                style="width: 144px;"
              >
                <div class="flex items-center justify-between pb-1 border-b border-dashed border-black/15">
                  <span class="font-bold tracking-wider text-slate-500 text-[8px]">INV #9482</span>
                  <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style="background: #FA0F00;">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 2L2 22h5l3-7.5h4l3 7.5h5L12 2z"/></svg>
                  </div>
                </div>
                <div class="py-1 flex flex-col gap-0.5 text-left">
                  <p class="m-0 font-bold uppercase text-[9.5px]" style="color: var(--ink);">Adobe CC</p>
                  <div class="flex justify-between text-slate-500 text-[8px]">
                    <span>DUE IN</span>
                    <span class="font-bold text-orange-500">2 DAYS</span>
                  </div>
                  <div class="flex justify-between border-t border-dashed border-black/10 pt-1 font-bold text-[9px]">
                    <span>TOTAL</span>
                    <span>$54.99</span>
                  </div>
                </div>
                <!-- Circular Canceled ink stamp inside card -->
                <div class="orbit-stamp orbit-stamp-c absolute inset-0 flex items-center justify-center pointer-events-none" style="opacity: 0; z-index: 20;">
                  <div class="w-12 h-12 rounded-full border-[3px] border-double border-red-500 bg-white/95 flex flex-col items-center justify-center shadow-md">
                    <span class="font-data text-[8px] font-black text-red-500 tracking-wider leading-none">CANCEL</span>
                    <div class="w-8 h-[1px] bg-red-400 my-0.5"></div>
                    <span class="font-data text-[4px] font-extrabold text-red-500/85 tracking-widest leading-none">LEAKR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ─── Orbit Arm D (ChatGPT) — delay -7.5s ─── -->
          <div class="absolute orbit-arm-base orbit-arm-d"
            style="left: var(--orbit-x); top: var(--orbit-y); width: 300px; height: 0; transform-origin: 0px 0px; z-index: 10;"
          >
            <div class="absolute orbit-card-base orbit-card-d"
              style="left: 100%; top: 0; transform: translate(-50%, -50%);"
            >
                            <!-- ChatGPT Receipt -->
              <div class="orbit-card-inner receipt-paper relative flex flex-col p-2.5 font-mono text-[9px] md:text-[10px] bg-white border border-black/5 shadow-md"
                style="width: 144px;"
              >
                <div class="flex items-center justify-between pb-1 border-b border-dashed border-black/15">
                  <span class="font-bold tracking-wider text-slate-500 text-[8px]">INV #8472</span>
                  <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style="background: #10A37F;">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 7v10M7 12h10" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>
                  </div>
                </div>
                <div class="py-1 flex flex-col gap-0.5 text-left">
                  <p class="m-0 font-bold uppercase text-[9.5px]" style="color: var(--ink);">ChatGPT</p>
                  <div class="flex justify-between text-slate-500 text-[8px]">
                    <span>DUE IN</span>
                    <span class="font-bold text-orange-500">6 DAYS</span>
                  </div>
                  <div class="flex justify-between border-t border-dashed border-black/10 pt-1 font-bold text-[9px]">
                    <span>TOTAL</span>
                    <span>$20.00</span>
                  </div>
                </div>
                <!-- Circular Canceled ink stamp inside card -->
                <div class="orbit-stamp orbit-stamp-d absolute inset-0 flex items-center justify-center pointer-events-none" style="opacity: 0; z-index: 20;">
                  <div class="w-12 h-12 rounded-full border-[3px] border-double border-red-500 bg-white/95 flex flex-col items-center justify-center shadow-md">
                    <span class="font-data text-[8px] font-black text-red-500 tracking-wider leading-none">CANCEL</span>
                    <div class="w-8 h-[1px] bg-red-400 my-0.5"></div>
                    <span class="font-data text-[4px] font-extrabold text-red-500/85 tracking-widest leading-none">LEAKR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div><!-- end logo anchor -->
      </div>
    </div>

    <!-- Bottom Part (Wireframe 2 Bottom: Staggered 4-Column Grid) -->
    <div class="flex flex-col gap-6">
      
      <!-- Row 1 (Desktop: 4 columns) -->
      <div class="features-grid-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Column 1: Info block label -->
        <RevealWrapper delay={0} class="features-info-block-wrapper">
          <div 
            class="features-info-block p-7 flex flex-col justify-between h-full rounded-[var(--r-md)] border border-dashed border-orange-500/30"
            style="background: rgba(255, 90, 31, 0.03);"
          >
            <div>
              <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style="background: var(--teal-soft); color: var(--teal);">
                01
              </div>
              <h4 class="font-data text-sm font-extrabold uppercase tracking-wider mt-4 mb-2" style="color: var(--ink);">Core Features</h4>
              <p class="text-xs leading-relaxed m-0" style="color: var(--slate);">
                The primary components that monitor trials and keep you informed.
              </p>
            </div>
            <div class="font-data text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-4">
              Real-time protection &rarr;
            </div>
          </div>
        </RevealWrapper>

        <!-- Column 2: Card 1 (Feature 1) -->
        <RevealWrapper delay={60} class="feature-card-wrapper">
          <Card class="feature-card p-7 flex flex-col gap-4 h-full bg-white border border-black/10 shadow-sm transition-transform hover:scale-[1.02]">
            <div class="w-11 h-11 rounded-full flex items-center justify-center" style="background: var(--teal-soft); border: 1.5px solid rgba(255, 90, 31, 0.25);">
              {#if true}
                {@const Icon = features[0].icon}
                <Icon size={20} color="var(--teal)" />
              {/if}
            </div>
            <div>
              <h3 class="mb-2 text-base font-bold" style="color: var(--ink);">{features[0].title}</h3>
              <p class="text-sm leading-relaxed m-0" style="color: var(--slate);">{features[0].body}</p>
            </div>
          </Card>
        </RevealWrapper>

        <!-- Column 3: Card 2 (Feature 2) -->
        <RevealWrapper delay={120} class="feature-card-wrapper">
          <Card class="feature-card p-7 flex flex-col gap-4 h-full bg-white border border-black/10 shadow-sm transition-transform hover:scale-[1.02]">
            <div class="w-11 h-11 rounded-full flex items-center justify-center" style="background: var(--teal-soft); border: 1.5px solid rgba(255, 90, 31, 0.25);">
              {#if true}
                {@const Icon = features[1].icon}
                <Icon size={20} color="var(--teal)" />
              {/if}
            </div>
            <div>
              <h3 class="mb-2 text-base font-bold" style="color: var(--ink);">{features[1].title}</h3>
              <p class="text-sm leading-relaxed m-0" style="color: var(--slate);">{features[1].body}</p>
            </div>
          </Card>
        </RevealWrapper>

        <!-- Column 4: Card 3 (Feature 3) -->
        <RevealWrapper delay={180} class="feature-card-wrapper">
          <Card class="feature-card p-7 flex flex-col gap-4 h-full bg-white border border-black/10 shadow-sm transition-transform hover:scale-[1.02]">
            <div class="w-11 h-11 rounded-full flex items-center justify-center" style="background: var(--teal-soft); border: 1.5px solid rgba(255, 90, 31, 0.25);">
              {#if true}
                {@const Icon = features[2].icon}
                <Icon size={20} color="var(--teal)" />
              {/if}
            </div>
            <div>
              <h3 class="mb-2 text-base font-bold" style="color: var(--ink);">{features[2].title}</h3>
              <p class="text-sm leading-relaxed m-0" style="color: var(--slate);">{features[2].body}</p>
            </div>
          </Card>
        </RevealWrapper>

      </div>

      <!-- Row 2 (Desktop: 4 columns, offset/staggered block) -->
      <div class="features-grid-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <!-- Column 1: Card 4 (Feature 4) -->
        <RevealWrapper delay={240} class="feature-card-wrapper">
          <Card class="feature-card p-7 flex flex-col gap-4 h-full bg-white border border-black/10 shadow-sm transition-transform hover:scale-[1.02]">
            <div class="w-11 h-11 rounded-full flex items-center justify-center" style="background: var(--teal-soft); border: 1.5px solid rgba(255, 90, 31, 0.25);">
              {#if true}
                {@const Icon = features[3].icon}
                <Icon size={20} color="var(--teal)" />
              {/if}
            </div>
            <div>
              <h3 class="mb-2 text-base font-bold" style="color: var(--ink);">{features[3].title}</h3>
              <p class="text-sm leading-relaxed m-0" style="color: var(--slate);">{features[3].body}</p>
            </div>
          </Card>
        </RevealWrapper>

        <!-- Column 2: Card 5 (Feature 5) -->
        <RevealWrapper delay={300} class="feature-card-wrapper">
          <Card class="feature-card p-7 flex flex-col gap-4 h-full bg-white border border-black/10 shadow-sm transition-transform hover:scale-[1.02]">
            <div class="w-11 h-11 rounded-full flex items-center justify-center" style="background: var(--teal-soft); border: 1.5px solid rgba(255, 90, 31, 0.25);">
              {#if true}
                {@const Icon = features[4].icon}
                <Icon size={20} color="var(--teal)" />
              {/if}
            </div>
            <div>
              <h3 class="mb-2 text-base font-bold" style="color: var(--ink);">{features[4].title}</h3>
              <p class="text-sm leading-relaxed m-0" style="color: var(--slate);">{features[4].body}</p>
            </div>
          </Card>
        </RevealWrapper>

        <!-- Column 3: Info block label -->
        <RevealWrapper delay={360} class="features-info-block-wrapper">
          <div 
            class="features-info-block p-7 flex flex-col justify-between h-full rounded-[var(--r-md)] border border-dashed border-orange-500/30"
            style="background: rgba(255, 90, 31, 0.03);"
          >
            <div>
              <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style="background: var(--teal-soft); color: var(--teal);">
                02
              </div>
              <h4 class="font-data text-sm font-extrabold uppercase tracking-wider mt-4 mb-2" style="color: var(--ink);">Audit & Trust</h4>
              <p class="text-xs leading-relaxed m-0" style="color: var(--slate);">
                Open source and built locally to guarantee data security.
              </p>
            </div>
            <div class="font-data text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-4">
              Local Sandbox &rarr;
            </div>
          </div>
        </RevealWrapper>

        <!-- Column 4: Card 6 (Feature 6) -->
        <RevealWrapper delay={420} class="feature-card-wrapper">
          <Card class="feature-card p-7 flex flex-col gap-4 h-full bg-white border border-black/10 shadow-sm transition-transform hover:scale-[1.02]">
            <div class="w-11 h-11 rounded-full flex items-center justify-center" style="background: var(--teal-soft); border: 1.5px solid rgba(255, 90, 31, 0.25);">
              {#if true}
                {@const Icon = features[5].icon}
                <Icon size={20} color="var(--teal)" />
              {/if}
            </div>
            <div>
              <h3 class="mb-2 text-base font-bold" style="color: var(--ink);">{features[5].title}</h3>
              <p class="text-sm leading-relaxed m-0" style="color: var(--slate);">{features[5].body}</p>
            </div>
          </Card>
        </RevealWrapper>

      </div>

    </div>

  </div>
</section>

<style>
  /* ── Scan beam on logo ─────────────────────────────────── */
  @keyframes scan-beam {
    0%, 100% { opacity: 0.3; transform: translateY(-50%) scaleX(0.6); }
    50%       { opacity: 1;   transform: translateY(-50%) scaleX(1); }
  }
  .animate-scan-beam { animation: scan-beam 1.4s ease-in-out infinite; }

  /* ── Orbit arm: rotates counter-clockwise ── */
  /*
    Radius = 300px. Orbit center is 300px to the RIGHT of the logo.
    Logo sits on the orbit at the LEFTMOST point (arm angle = 180° / -180°).

    Starting arm angle = -90° (pointing UP).
    Card starts at the TOP of the orbit.
    As it rotates counter-clockwise, it moves down to -180° (LEFT, at the logo) at 25% of the cycle.
    Then to -270° (DOWN) at 50%, -360° (RIGHT) at 75%, and -450° (UP) at 100%.
  */
  @keyframes orbit-arm-spin {
    from { transform: rotate(var(--spin-start)); }
    to   { transform: rotate(var(--spin-end)); }
  }

  /* ── Counter-spin: keeps card upright while arm rotates ── */
  @keyframes orbit-counter-spin {
    from { transform: translate(-50%, -50%) rotate(var(--counter-start)); }
    to   { transform: translate(-50%, -50%) rotate(var(--counter-end)); }
  }

  /* ── Card visibility fade (counter-clockwise) ──
    Cards are invisible when in the off-screen zone (bottom → right → top).
    They fade in as they approach the logo from above, stay visible through
    the Canceled stamp, then fade out as they head off-screen below.

    Visible window: strictly 11% to 37% of the 10 s cycle (26% duration) to prevent overlap with 4 cards.
      11% = card approaching from above/top-right
      17% = card fully visible as it approaches the logo
      25% = card AT logo (Canceled stamp shows)
      31% = card starts fading out as it heads below
      37% = card completely invisible
  */
  @keyframes orbit-card-fade {
    0%,  11%  { opacity: 0; }   /* hidden */
    17%       { opacity: 1; }   /* visible */
    31%       { opacity: 1; }   /* visible */
    37%, 100% { opacity: 0; }   /* hidden */
  }

  /* ── Canceled stamp: stamps down exactly at the 25% logo overlap mark and stays until it disappears ── */
  @keyframes orbit-show-stamp {
    0%,  24% {
      opacity: 0;
      transform: scale(2.2) rotate(-8deg);
    }
    25% {
      opacity: 1;
      transform: scale(1) rotate(-8deg); /* stamped! */
    }
    31% {
      opacity: 1;
      transform: scale(1) rotate(-8deg);
    }
    37%, 100% {
      opacity: 0;
      transform: scale(0.9) rotate(-8deg);
    }
  }

  /* ── Logo click press animation (4 clicks per 10s cycle) ────────────────── */
  /*
    Beat 1 (Card B passes logo): clicks at 0% / 100%
    Beat 2 (Card A passes logo): clicks at 25%
    Beat 3 (Card D passes logo): clicks at 50%
    Beat 4 (Card C passes logo): clicks at 75%
  */
  @keyframes logo-stamp-click {
    0%       { transform: scale(0.85); }
    2%, 23%  { transform: scale(1); }
    25%      { transform: scale(0.85); }
    27%, 48% { transform: scale(1); }
    50%      { transform: scale(0.85); }
    52%, 73% { transform: scale(1); }
    75%      { transform: scale(0.85); }
    77%, 98% { transform: scale(1); }
    100%     { transform: scale(0.85); }
  }
  .animate-logo-click {
    animation: logo-stamp-click 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
  }

  /* Shared arm/card base classes */
  .orbit-arm-base  { position: absolute; }
  .orbit-card-base { position: absolute; }

  /* Card A: delay 0s (reaches logo at 2.5s / 25%) */
  .orbit-arm-a   { animation: orbit-arm-spin    10s linear infinite; }
  .orbit-card-a  { animation: orbit-counter-spin 10s linear infinite,
                               orbit-card-fade    10s linear infinite; }
  .orbit-stamp-a { animation: orbit-show-stamp   10s linear infinite; }

  /* Card B: delay -2.5s (reaches logo at 0s / 100%) */
  .orbit-arm-b   { animation: orbit-arm-spin    10s linear infinite -2.5s; }
  .orbit-card-b  { animation: orbit-counter-spin 10s linear infinite -2.5s,
                               orbit-card-fade    10s linear infinite -2.5s; }
  .orbit-stamp-b { animation: orbit-show-stamp   10s linear infinite -2.5s; }

  /* Card C: delay -5.0s (reaches logo at 7.5s / 75%) */
  .orbit-arm-c   { animation: orbit-arm-spin    10s linear infinite -5s; }
  .orbit-card-c  { animation: orbit-counter-spin 10s linear infinite -5s,
                               orbit-card-fade    10s linear infinite -5s; }
  .orbit-stamp-c { animation: orbit-show-stamp   10s linear infinite -5s; }

  /* Card D: delay -7.5s (reaches logo at 5.0s / 50%) */
  .orbit-arm-d   { animation: orbit-arm-spin    10s linear infinite -7.5s; }
  .orbit-card-d  { animation: orbit-counter-spin 10s linear infinite -7.5s,
                               orbit-card-fade    10s linear infinite -7.5s; }
  .orbit-stamp-d { animation: orbit-show-stamp   10s linear infinite -7.5s; }

  /* Serrated paper edge for invoices */
  .receipt-paper {
    position: relative;
    background: #FFFFFF;
    border-radius: 4px 4px 0 0;
  }
  .receipt-paper::after {
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

  /* ── Floating saved amount texts ── */
  @keyframes float-saved-text {
    0%,  24% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.6);
    }
    25% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.15);
    }
    28% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    38% {
      opacity: 1;
      transform: translate(-50%, -60px) scale(1.05);
    }
    45%, 100% {
      opacity: 0;
      transform: translate(-50%, -90px) scale(0.85);
    }
  }

  .saved-text-a {
    top: 0; left: var(--saved-text-left);
    color: #10B981;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    animation: float-saved-text 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
  }
  .saved-text-b {
    top: 0; left: var(--saved-text-left);
    color: #10B981;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    animation: float-saved-text 10s cubic-bezier(0.25, 1, 0.5, 1) infinite -2.5s;
  }
  .saved-text-c {
    top: 0; left: var(--saved-text-left);
    color: #10B981;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    animation: float-saved-text 10s cubic-bezier(0.25, 1, 0.5, 1) infinite -5s;
  }
  .saved-text-d {
    top: 0; left: var(--saved-text-left);
    color: #10B981;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    animation: float-saved-text 10s cubic-bezier(0.25, 1, 0.5, 1) infinite -7.5s;
  }

  .orbit-container {
    --orbit-x: 300px;
    --orbit-y: 0px;
    --spin-start: -90deg;
    --spin-end: -450deg;
    --counter-start: 90deg;
    --counter-end: 450deg;
    --saved-text-left: 150px;
  }

  @media (max-width: 1023px) {
    .orbit-container {
      --orbit-x: 0px;
      --orbit-y: -300px;
      --spin-start: -180deg;
      --spin-end: -540deg;
      --counter-start: 180deg;
      --counter-end: 540deg;
      --saved-text-left: 0px;
    }
  }

  .orbit-illustration-wrapper {
    min-height: 240px;
  }
  @media (min-width: 1024px) {
    .orbit-illustration-wrapper {
      min-height: 420px;
    }
  }

  @media (max-width: 1023px) {
    .features-grid-row {
      display: flex !important;
      flex-direction: column !important;
      gap: 0px !important;
    }

    :global(.feature-card) {
      background: var(--surface) !important;
      border: none !important;
      border-bottom: 1.5px solid rgba(0, 0, 0, 0.06) !important;
      border-radius: 0px !important;
      box-shadow: none !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
      padding-top: 24px !important;
      padding-bottom: 24px !important;
      transform: none !important;
    }

    .features-info-block {
      background: transparent !important;
      border: none !important;
      border-bottom: 1.5px solid rgba(255, 90, 31, 0.15) !important;
      border-radius: 0px !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
      padding-top: 16px !important;
      padding-bottom: 16px !important;
    }

    :global(.features-info-block-wrapper) {
      position: sticky !important;
      top: 63px !important;
      z-index: 20 !important;
      order: -1 !important;
      background: var(--surface) !important;
      width: 100%;
      transform: none !important;
      opacity: 1 !important;
      transition: none !important;
    }

    :global(.feature-card-wrapper) {
      position: sticky !important;
      top: 142px !important;
      z-index: 10 !important;
      background: var(--surface) !important;
      width: 100%;
      transform: none !important;
      opacity: 1 !important;
      transition: none !important;
    }
  }
</style>
