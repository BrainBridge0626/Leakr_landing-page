<script>
  import { HelpCircle } from '@lucide/svelte';
  import { browserName } from '$lib/stores/browser.js';
</script>

<!-- Layered Wavy Top Transition (Echoing water waves) -->
<div class="w-full overflow-hidden leading-[0] translate-y-[2px] relative select-none pointer-events-none" style="background: var(--mist);">
  <!-- Secondary background accent wave -->
  <svg viewBox="0 -15 1440 89" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-[101%] left-[-0.5%] h-[55px] md:h-[85px] absolute top-[-6px] opacity-15">
    <path d="M0,38 C240,80 480,80 720,38 C960,-4 1200,-4 1440,38 L1440,74 L0,74 Z" fill="var(--teal)"/>
  </svg>
  <!-- Primary surface wave -->
  <svg viewBox="0 -15 1440 89" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-[101%] left-[-0.5%] h-[55px] md:h-[85px] relative z-10">
    <path d="M0,32 C240,74 480,74 720,32 C960,-10 1200,-10 1440,32 L1440,74 L0,74 Z" fill="var(--surface)"/>
  </svg>
</div>

<footer class="mt-0 pb-16 px-6 relative z-20" style="background: var(--surface);">
  <div class="max-w-6xl mx-auto">
    
    <!-- Multi-Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-12" style="border-bottom: 1.5px solid rgba(255, 90, 31, 0.12);">
      
      <!-- Column 1: Brand & Store Links (takes 5 columns on desktop) -->
      <div class="col-span-1 md:col-span-5 flex flex-col gap-6">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <svg width="24" height="30" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 0 C14 0 0 14 0 22 C0 29.7 6.3 34 14 34 C21.7 34 28 29.7 28 22 C28 14 14 0 14 0Z" fill="var(--teal)"/>
            <circle cx="9" cy="24" r="2.5" fill="rgba(255,255,255,0.45)"/>
          </svg>
          <span class="font-display text-xl font-bold text-gradient-orange">Leakr</span>
        </div>
        
        <p class="font-body text-sm leading-relaxed max-w-sm m-0" style="color: var(--slate);">
          Stop paying for trials you forgot to cancel. Leakr auto-detects subscriptions on-device, keeping your money and your privacy locked.
        </p>

        <!-- Store Download Links (Highly Focused CTA with explicit color values to match contrast) -->
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Chrome Store Button -->
          <a
            href="https://chrome.google.com/webstore"
            class="flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group no-underline {$browserName === 'Firefox' ? 'border border-black/15 bg-white opacity-70' : 'shadow-puddle-sm'}"
            style="background: {$browserName === 'Firefox' ? 'white' : 'var(--teal)'}; color: {$browserName === 'Firefox' ? 'var(--ink)' : '#FFFFFF'};"
          >
            <!-- Official Chrome Icon -->
            <svg class="w-5 h-5 shrink-0 {$browserName === 'Firefox' ? 'text-zinc-500 group-hover:text-teal' : 'text-white'}" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z"/>
            </svg>
            <div class="text-left leading-tight">
              <div class="text-[9px] font-data m-0 uppercase tracking-wider font-medium" style="color: {$browserName === 'Firefox' ? 'var(--slate)' : 'rgba(255, 255, 255, 0.85)'};">
                {$browserName === 'Firefox' ? 'Chrome Extension' : 'Install Extension'}
              </div>
              <div class="text-xs font-body font-extrabold m-0">
                {$browserName === 'Firefox' ? 'Coming Soon' : `Add to ${$browserName}`}
              </div>
            </div>
          </a>

          <!-- Firefox Store Button -->
          <a
            href="#"
            class="flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group no-underline {$browserName === 'Firefox' ? 'shadow-puddle-sm' : 'border border-black/15 bg-white opacity-70'}"
            style="background: {$browserName === 'Firefox' ? 'var(--teal)' : 'white'}; color: {$browserName === 'Firefox' ? '#FFFFFF' : 'var(--ink)'};"
          >
            <!-- Official Firefox Icon -->
            <svg class="w-5 h-5 shrink-0 {$browserName === 'Firefox' ? 'text-white' : 'text-zinc-500 group-hover:text-teal'}" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477-.091-.147-.184-.292-.273-.446a3.545 3.545 0 01-.13-.24 2.118 2.118 0 01-.172-.46.03.03 0 00-.027-.03.038.038 0 00-.021 0l-.006.001a.037.037 0 00-.01.005L15.624 0c-2.585 1.515-3.657 4.168-3.932 5.856a6.197 6.197 0 00-2.305.587.297.297 0 00-.147.37c.057.162.24.24.396.17a5.622 5.622 0 012.008-.523l.067-.005a5.847 5.847 0 011.957.222l.095.03a5.816 5.816 0 01.616.228c.08.036.16.073.238.112l.107.055a5.835 5.835 0 01.368.211 5.953 5.953 0 012.034 2.104c-.62-.437-1.733-.868-2.803-.681 4.183 2.09 3.06 9.292-2.737 9.02a5.164 5.164 0 01-1.513-.292 4.42 4.42 0 01-.538-.232c-1.42-.735-2.593-2.121-2.74-3.806 0 0 .537-2 3.845-2 .357 0 1.38-.998 1.398-1.287-.005-.095-2.029-.9-2.817-1.677-.422-.416-.622-.616-.8-.767a3.47 3.47 0 00-.301-.227 5.388 5.388 0 01-.032-2.842c-1.195.544-2.124 1.403-2.8 2.163h-.006c-.46-.584-.428-2.51-.402-2.913-.006-.025-.343.176-.389.206-.406.29-.787.616-1.136.974-.397.403-.76.839-1.085 1.303a9.816 9.816 0 00-1.562 3.52c-.003.013-.11.487-.19 1.073-.013.09-.026.181-.037.272a7.8 7.8 0 00-.069.667l-.002.034-.023.387-.001.06C.386 18.795 5.593 24 12.016 24c5.752 0 10.527-4.176 11.463-9.661.02-.149.035-.298.052-.448.232-1.994-.025-4.09-.753-5.844z"/>
            </svg>
            <div class="text-left leading-tight">
              <div class="text-[9px] font-data m-0 uppercase tracking-wider font-medium" style="color: {$browserName === 'Firefox' ? 'rgba(255,255,255,0.85)' : 'var(--slate)'};">
                {$browserName === 'Firefox' ? 'Install Extension' : 'Firefox Add-ons'}
              </div>
              <div class="text-xs font-body font-bold m-0">
                {$browserName === 'Firefox' ? 'Add to Firefox' : 'Coming Soon'}
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Column 2: Product (takes 2 columns) -->
      <div class="col-span-1 sm:col-span-6 md:col-span-2 flex flex-col gap-4">
        <h4 class="font-data text-xs font-bold uppercase tracking-wider m-0" style="color: var(--teal);">Product</h4>
        <ul class="flex flex-col gap-3.5 list-none p-0 m-0 text-sm">
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="#how-it-works" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">How it works</a>
          </li>
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="#pricing" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Pricing Plans</a>
          </li>
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="/install" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Install Guide</a>
          </li>
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="#" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Release Notes</a>
          </li>
        </ul>
      </div>

      <!-- Column 3: Trust & Legal (takes 2 columns) -->
      <div class="col-span-1 sm:col-span-6 md:col-span-2 flex flex-col gap-4">
        <h4 class="font-data text-xs font-bold uppercase tracking-wider m-0" style="color: var(--teal);">Trust & Legal</h4>
        <ul class="flex flex-col gap-3.5 list-none p-0 m-0 text-sm">
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="/privacy" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Privacy Policy</a>
          </li>
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="/terms" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Terms of Service</a>
          </li>
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="#" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Security Policy</a>
          </li>
          <li class="flex items-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 animate-pulse" style="background: var(--teal);"></span>
            <a href="#" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Service Status</a>
          </li>
        </ul>
      </div>

      <!-- Column 4: Social & Community with icons (takes 3 columns) -->
      <div class="col-span-1 md:col-span-3 flex flex-col gap-4">
        <h4 class="font-data text-xs font-bold uppercase tracking-wider m-0" style="color: var(--teal);">Community</h4>
        <ul class="flex flex-col gap-3.5 list-none p-0 m-0 text-sm">
          <li class="flex items-center gap-3">
            <span class="w-5 h-5 flex items-center justify-center shrink-0" style="color: var(--teal);">
              <HelpCircle size={16} strokeWidth={2.2} />
            </span>
            <a href="/contact" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Contact Support</a>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-5 h-5 flex items-center justify-center shrink-0" style="color: var(--teal);">
              <!-- Pixel Perfect GitHub Icon -->
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </span>
            <a href="https://github.com" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">GitHub Repository</a>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-5 h-5 flex items-center justify-center shrink-0" style="color: var(--teal);">
              <!-- Pixel Perfect Twitter Icon -->
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M4 4l11.73 16h4.27L8.27 4z"/>
                <path d="M20 4l-6.77 6.77"/>
                <path d="M4 20l6.77-6.77"/>
              </svg>
            </span>
            <a href="https://twitter.com" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Twitter / X</a>
          </li>
          <li class="flex items-center gap-3">
            <span class="w-5 h-5 flex items-center justify-center shrink-0" style="color: var(--teal);">
              <!-- Pixel Perfect Discord Logo Icon -->
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c1.9-1.4,3.73-2.92,5.47-4.52a75.1,75.1,0,0,0,67,0c1.74,1.6,3.57,3.12,5.47,4.52a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.24,50.24,123.38,27.55,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.72,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96,53,91,65.69,84.69,65.69Z" />
              </svg>
            </span>
            <a href="https://discord.com" class="no-underline hover:underline transition-colors font-semibold" style="color: var(--slate);">Discord Server</a>
          </li>
        </ul>
      </div>

    </div>

    <!-- Bottom Copyright and Footnote -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8">
      <p class="font-body text-xs m-0" style="color: var(--slate); opacity: 0.85;">
        &copy; {new Date().getFullYear()} Leakr. All rights reserved. Built with on-device security.
      </p>
      <p class="font-body text-xs m-0 text-left md:text-right" style="color: var(--slate); opacity: 0.7;">
        Statistics cited from third-party consumer research; see sources.
      </p>
    </div>

  </div>
</footer>
