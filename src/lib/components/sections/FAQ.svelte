<script>
  import FAQItem from '$lib/components/ui/FAQItem.svelte';
  import RevealWrapper from '$lib/components/ui/RevealWrapper.svelte';

  const faqs = [
    {
      question: 'Is my data really never sent anywhere?',
      answer: 'Yes — completely. Leakr runs entirely in your browser using local storage. No data is transmitted to any server, no account is created, and nothing is shared with us or third parties. Your trial information lives only on your device.',
    },
    {
      question: 'What if Leakr misses a trial?',
      answer: 'Leakr uses heuristic detection — it looks for common patterns on trial sign-up pages. It works well for most major services but isn\'t perfect. If a site uses unusual checkout flows, or the trial length isn\'t mentioned in plain text on the page, Leakr may not catch it. We\'re honest about this: it\'s a best-effort tool, not a guarantee.',
    },
    {
      question: 'Does this work on Firefox, Safari, or mobile?',
      answer: 'Not currently. Leakr is a Chrome extension built for Chromium-based browsers (Chrome, Edge, Brave). Firefox, Safari, and mobile browsers are not supported at launch. This is a real gap we\'ve been upfront about.',
    },
    {
      question: 'How does the cancel-link list work?',
      answer: 'We maintain a curated map of direct cancel-page URLs for popular subscription services. When Leakr detects a trial, it matches it against this list to provide a one-click cancel link. If a service isn\'t in our map yet, you\'ll still get the reminder — just without the shortcut link.',
    },
    {
      question: 'What happens to my data if I switch browsers?',
      answer: 'Currently, your Leakr data doesn\'t move with you. It\'s stored locally in your browser\'s extension storage, so switching browsers or reinstalling means starting fresh. Cross-device sync is planned for a future update (it\'s part of what the Family tier will enable), but it doesn\'t exist yet.',
    },
  ];
</script>

<section id="faq" class="section-pad px-6" style="background: var(--surface);">
  <div class="max-w-2xl mx-auto">

    <RevealWrapper>
      <div class="text-center mb-14">
        <h2 class="mb-4">Good to know</h2>
        <p class="text-lg" style="color: var(--slate);">
          Honest answers to questions we get asked the most — including the awkward ones.
        </p>
      </div>
    </RevealWrapper>

    <RevealWrapper delay={60}>
      <div>
        <!-- Top hairline -->
        <div style="height: 1px; background: var(--teal-soft); opacity: 0.5;"></div>

        {#each faqs as faq}
          <FAQItem question={faq.question} answer={faq.answer} />
        {/each}
      </div>
    </RevealWrapper>

  </div>
</section>
