# Leakr — Landing Page Specification

**Purpose of this doc:** define *what* goes on the landing page and *why*, section by section — content, copy direction, and conversion logic. Visual design system, color, type, and animation implementation come in the next pass. Where relevant I've flagged things pulled from the Product & Business Review that should shape the copy, not just the look.

---

## 1. Positioning (the one thing every section should reinforce)

> **The only subscription tracker that auto-detects trials without ever asking for your bank account.**

Everything else — pricing, tone, visuals — supports this. Bank-linked competitors (Rocket Money, Monarch, YNAB) win on automation but lose on trust. Manual tools (Bobby, LowerMySubs) win on privacy but lose on automation. Leakr is the only one in the market review that has both. That gap *is* the landing page's whole argument.

**Secondary message:** it's arithmetic, not aspiration — one caught trial pays for a lifetime license several times over.

---

## 2. Target audience (for tone + imagery direction, not full personas)

| Segment | What they need to hear |
|---|---|
| Privacy-minded users | "No bank link. No account. Nothing leaves your device." — lead with this, not buried in an FAQ |
| Trial-hoppers (streaming, SaaS, AI tools) | Speed: "stops a charge before it happens," not after |
| Budget-conscious households | One honest number: "your real monthly spend" |
| Students / price-sensitive | Free tier + low one-time price, no subscription-to-track-your-subscriptions irony |

Keep copy conversational and a little wry — the product's own pitch ("a $12/month trial you forgot pays for Leakr many times over") is arithmetic-flavored humor. Lean into that instead of generic SaaS voice.

---

## 3. Section-by-section structure

### 3.1 Nav (sticky, minimal)
- Logo/wordmark (droplet mark from the doc — 💧 as a placeholder concept, refine in design system)
- Links: How it works · Pricing · Privacy · FAQ
- CTA button: **Add to Chrome — it's free**
- Nav should go transparent-over-hero then solidify on scroll (this is where "breathing space + subtle motion" starts)

### 3.2 Hero
- **Headline options** (pick one, A/B later):
  - "Stop paying for subscriptions you forgot to cancel."
  - "Free trials are easy to start. Leakr makes them impossible to forget."
- **Subhead:** one line reinforcing no-bank-link, on-device, free to start
- **Primary CTA:** Add to Chrome — it's free (large, single, unambiguous)
- **Secondary CTA:** ghost/text link — "See how it works" → scrolls to §3.4
- **Visual:** product shot of the popup dashboard (monthly bleed total + a trial countdown card) — not an abstract illustration. This is a utility product; showing the real UI builds trust immediately.
- **Trust microcopy under CTA:** "No account. No bank link. Nothing leaves your device." — this is the differentiator, so it earns hero real estate, not a footnote.

### 3.3 The problem (numbers section)
Short, scannable, high-contrast stat cards — not paragraphs. Use **only cited stats**, sourced from the doc's own reference list (`References` section of the Product Documentation), e.g.:
- ~$200+/yr average forgotten-subscription spend (CNET/YouGov, 2025)
- 70% have forgotten to cancel a free trial at least once (Self Financial, 2026)
- Real spend vs. perceived spend gap (C+R Research)

**Copy flag from the review:** the marketing doc's "$219/yr wasted" hero stat is currently unsourced footnote-only. The Product & Business Review explicitly calls this out as something that should be replaced with a cited figure (FR-7). Use the properly-attributed stats already sitting in the doc's own reference list instead — same emotional weight, no exposure.

### 3.4 How it works (3-step, visual, not text-heavy)
1. **Browse normally** — Leakr watches for trial/checkout signals as you shop
2. **Get warned before you're charged** — reminder a few days out, with the real charge date
3. **Cancel in one click** — direct link to the actual cancel page, not a support maze

Animation idea (flag for design pass): a light horizontal "flow" — three cards connected by a thin animated line/dash that draws itself on scroll, echoes the "weave" direction you mentioned.

### 3.5 Why on-device (privacy as feature, not footnote)
- Comparison table: Do nothing / Manual spreadsheet / Bank-linked apps / Leakr — pulled straight from the doc's §4.2 table. This table is a genuine asset, keep it close to verbatim in structure.
- One reassuring visual metaphor: data staying inside a browser/device outline, nothing arcing out to a cloud icon (literal, easy to render as a simple animated SVG later).

### 3.6 Feature grid (what it actually does)
Four or five cards, icon + short line each:
- Auto-detect trials & subscriptions
- Charge-date reminders
- One-click real cancel links (name-drop a few recognizable logos: Netflix, Spotify, Adobe — only if you have rights/fair-use comfort for logo marks, otherwise use text list)
- Monthly "bleed" total dashboard
- Free tier, no signup required

### 3.7 Social proof / market context (optional, lightweight)
Given there's no user base yet, don't fake testimonials. Instead:
- A short "why now" strip referencing the regulatory tailwind (FTC click-to-cancel) — builds legitimacy without needing customer quotes.
- If/when real installs exist, swap this for actual review stars (Chrome Web Store rating) — leave a slot for it in the layout now.

### 3.8 Pricing
Three cards: Free / Pro / Family, matching the doc's structure exactly (Free $0, Pro $3/mo or $24 lifetime, Family $6/mo or $49 lifetime).

**Important flag from the Business Review — this affects copy, not just design:**
- The review states plainly that **the paid tiers are not currently enforceable** (client-side regex license check, no server) and that the **Family tier's sync/shared-dashboard doesn't exist yet** architecturally.
- Two honest options for this landing page, your call:
  1. **Ship Free-only for now**, with Pro/Family shown as "Coming soon" — avoids selling something that can't be delivered or enforced yet.
  2. **Keep pricing live** but be aware you're exposed to the bypass issue in FR-1/FR-2 until the backend ships — that's a product decision, not a design one, but the landing page shouldn't overpromise "shared household dashboard" if it isn't buildable yet.
- Either way, **don't advertise Family's "shared dashboard" as live** unless FR-4 is actually done — that's the one line in the current marketing draft most likely to become a support/refund complaint.
- Recommend: keep pricing card copy generic enough now ("Unlimited tracking," "Full cancel-link map") and hold "shared household dashboard" language until sync ships.

### 3.9 FAQ
Pull directly from "Good to know (honest limits)" in the Product Documentation — this section is already well-written and appropriately honest (heuristic detection, trial-length depends on plain-text mention, Chromium-only). Keep that candor; it's a trust signal, not a weakness to hide.

Suggested FAQ entries:
- Is my data really never sent anywhere?
- What happens if I miss a trial? (heuristic limits, honestly stated)
- Does this work on Firefox/Safari/mobile? (no — be upfront, this is listed as a real gap)
- How does the cancel-link list work?
- What happens to my data if I switch browsers? (current answer: it doesn't move — be honest per the review's finding on no sync)

### 3.10 Final CTA band
Full-width, calm section, single CTA repeated: **Add to Chrome — it's free.** No new information here — pure repetition for people who scrolled straight to the bottom.

### 3.11 Footer
- Logo, one-line tagline
- Links: Privacy policy, Terms, Install guide, Contact
- Small print: "Statistics cited from third-party consumer research; see sources." (matches the doc's own footnote practice — keep it, it's good practice)

---

## 4. Conversion logic (why this order)

1. Hero sells the differentiator in 5 seconds (no bank link).
2. Problem section makes it feel urgent and personal (real cited numbers).
3. How-it-works removes "how does this even work" doubt.
4. Privacy comparison table converts the privacy-conscious skeptic.
5. Feature grid is for people who want the checklist before deciding.
6. Pricing is placed *after* trust is built, not before.
7. FAQ mops up remaining objections honestly — this matters more than usual here because the product's whole pitch is trust.
8. Final CTA — last chance, zero new cognitive load.

---

## 5. Visual/motion direction (brief — full design system next pass)

- **Theme:** light, clean, generous whitespace ("breathing space" as you said) — not dense SaaS-dashboard energy.
- **Motion:** subtle only — fade/slide-in on scroll, a soft "weave" connecting line for the how-it-works section, gentle hover states on cards. Nothing that competes with the utility, honest tone of the product.
- **Imagery:** favor real product UI screenshots over abstract illustration — this product's credibility comes from being real and working, not from vibes.
- **Tone of iconography:** simple line icons, droplet motif tie-in from the "Leakr" name/logo.

---

## 6. Open questions before design system phase

1. Do we go Free-only live pricing, or keep Pro/Family listed as "coming soon" given the enforcement gap (§3.8)?
2. Do we have rights to show real service logos (Netflix, Spotify, etc.) in the cancel-link feature callout, or keep it text-only?
3. Any existing brand assets (logo file, color) already decided, or fully open for the design system pass?
