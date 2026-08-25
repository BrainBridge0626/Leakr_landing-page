<script>
  let { hover = true, class: extraClass = '', children } = $props();
</script>

<div
  class="
    bg-white rounded-[var(--r-lg)]
    border border-black/15 transition-all duration-[300ms]
    {hover ? 'hover:scale-[1.02] hover:[box-shadow:var(--shadow-puddle-hover)] hover:border-orange-glow' : ''}
    {extraClass}
  "
  style="box-shadow: var(--shadow-puddle);"
>
  {@render children?.()}
</div>

<style>
  :global(.hover\:border-orange-glow:hover) {
    border-color: rgba(255, 90, 31, 0.45) !important;
  }
</style>


