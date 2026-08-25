<script>
  /**
   * @type {string} figure - large number/stat (e.g. "$200+")
   * @type {string} caption - explanatory text
   * @type {string} [source] - optional citation text
   */
  let { figure, caption, source = '' } = $props();
</script>

<div class="stat-chip-container">
  <!-- Stat Number -->
  <span class="stat-figure">
    {figure}
  </span>
  
  <!-- Caption text -->
  <span class="stat-caption">
    {caption}
  </span>
  
  <!-- Source citation -->
  {#if source}
    <span class="stat-source">
      {source}
    </span>
  {/if}
</div>

<style>
  .stat-chip-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    padding: 12px 0;
    transition: none;
    will-change: transform, opacity;
  }

  .stat-figure {
    font-family: var(--font-data);
    font-size: 3.5rem; /* Massive number on mobile viewports */
    font-weight: 800;
    line-height: 1.1;
    color: #E04D00;
    font-variant-numeric: tabular-nums;
    margin-bottom: 8px;
  }

  .stat-caption {
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--ink);
    max-width: 260px;
    margin: 0 auto;
  }

  .stat-source {
    font-family: var(--font-data);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--slate);
    margin-top: 6px;
  }

  @media (min-width: 768px) {
    .stat-chip-container {
      width: 280px;
      min-height: 200px;
      padding: 28px 32px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: var(--r-md);
      background: #FFFFFF;
      box-shadow: var(--shadow-puddle);
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .stat-chip-container:hover {
      transform: scale(1.03);
      box-shadow: var(--shadow-puddle-hover);
      border-color: rgba(255, 90, 31, 0.4);
    }

    .stat-figure {
      font-size: 2.25rem;
      margin-bottom: 12px;
    }

    .stat-caption {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: none;
      margin: 0;
    }
  }
</style>
