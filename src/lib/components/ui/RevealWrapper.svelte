<script>
  import { reveal } from '$lib/actions/reveal.js';

  let { delay = 0, threshold = 0.2, class: className = '', style = '', children } = $props();
</script>

<div use:reveal={{ delay, threshold }} class={className} style={style}>
  {@render children?.()}
</div>
