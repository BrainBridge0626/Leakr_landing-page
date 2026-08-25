<script>
  /**
   * @type {string} text - badge label
   * @type {'urgent' | 'info' | 'coming-soon'} variant
   */
  let { text, variant = 'info' } = $props();

  const styles = {
    urgent:      'animate-pulse-soft',
    info:        '',
    'coming-soon': '',
  };

  const bgColors = {
    urgent:      'var(--amber)',
    info:        'var(--teal-soft)',
    'coming-soon': 'var(--teal-soft)',
  };

  const textColors = {
    urgent:      'white',
    info:        'var(--teal)',
    'coming-soon': 'var(--slate)',
  };
</script>

<span
  class="inline-flex items-center font-data text-xs font-medium px-3 py-1 rounded-full {styles[variant]}"
  style="background: {bgColors[variant]}; color: {textColors[variant]};"
>
  {text}
</span>
