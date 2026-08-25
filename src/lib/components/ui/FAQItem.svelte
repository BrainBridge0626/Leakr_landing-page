<script>
  import { ChevronDown } from "@lucide/svelte";

  let { question, answer, open = false } = $props();

  function toggle() {
    open = !open;
  }
</script>

<div class="border-0">
  <button
    class="w-full flex items-center justify-between py-5 text-left font-body font-medium gap-4 cursor-pointer bg-transparent"
    style="color: var(--ink);"
    aria-expanded={open}
    onclick={toggle}
  >
    <span class="text-[1.05rem] leading-snug">{question}</span>
    <span
      class="shrink-0 transition-transform duration-[260ms]"
      style="
        color: var(--teal);
        transform: rotate({open ? 180 : 0}deg);
        transition: transform 260ms var(--ease-droplet);
      "
    >
      <ChevronDown size={20} />
    </span>
  </button>

  <!-- Grid-row transition for smooth height animation -->
  <div
    class="grid overflow-hidden transition-all duration-[260ms]"
    style="
      grid-template-rows: {open ? '1fr' : '0fr'};
      transition: grid-template-rows 260ms var(--ease-droplet);
    "
    role="region"
    aria-hidden={!open}
  >
    <div class="min-h-0">
      <p
        class="pb-5 leading-relaxed text-[0.95rem]"
        style="color: var(--slate);"
      >
        {answer}
      </p>
    </div>
  </div>

  <!-- Hairline separator in teal-soft -->
  <div style="height: 1px; background: var(--teal-soft); opacity: 0.5;"></div>
</div>
