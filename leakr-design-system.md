# Leakr — Design System & Motion Spec

## 0. Design plan (brainstorm → critique → locked)

**Subject grounding:** Leakr's whole identity is water finding its way out — a "leak." Money leaking out of accounts through forgotten trials, and the product's job is to plug the leak. That's the one piece of material world this design should be built from: droplets, surface tension, trickles, seals — not generic fintech-dashboard or generic "AI startup" visuals.

**First pass, checked against the default patterns to avoid:** a warm cream + serif + terracotta page, a black + neon-accent page, or a hairline-broadsheet page would all fit "clean modern light site" instructions but none of them come from *this* subject. Revised toward a cool, aqueous palette instead of warm cream, and gave the display type actual "wet" character instead of a neutral grotesk — so the personality comes from the water metaphor, not from a trending template.

**Signature element (the one thing this page is remembered by):** a single continuous line — **"the Trickle"** — that runs down the spine of the page and draws itself in as you scroll, like water finding a path downward. It's the smooth-scroll backbone the brief asked for, and it's structurally meaningful (it literally traces the person's journey: install → detect → warn → cancel), not decoration.

---

## 1. Color

Cool and aqueous, not warm-cream. One saturated "signal" color carries all CTAs and money-numbers; one warm amber is reserved *only* for urgency (a trial about to charge) so it stays meaningful instead of decorative.

| Token | Hex | Use |
|---|---|---|
| `--mist` | `#F4FAFA` | Page background — pale, icy, slightly cool (not cream) |
| `--surface` | `#FFFFFF` | Card/panel fills, always with soft tint over `--mist`, never a hard white box |
| `--ink` | `#0E2230` | Primary text — deep blue-black, never pure black |
| `--slate` | `#5B7480` | Secondary text, captions, muted labels |
| `--teal` | `#0E6E68` | Primary brand signal — CTAs, links, money figures, the Trickle line |
| `--teal-soft` | `#BFE8E1` | Tint fills, hover backgrounds, chip backgrounds |
| `--amber` | `#E29B3E` | Reserved *only* for urgency: charge-date warnings, "trial ending" badges — never decorative |

Do not introduce a second accent hue. The discipline of one signal color + one urgency color is what keeps this from reading like a generic multi-gradient SaaS page.

---

## 2. Typography

Two roles, deliberately paired for contrast — a display face with real "wet ink" character, a body face that's quiet and legible, and a mono face reserved for anything that is literally data (prices, dates, license keys — the product already has a monospace-shaped artifact: `LEAKR-PRO-XXXX-XXXX`).

| Role | Face | Why |
|---|---|---|
| Display (H1/H2, hero numbers) | **Fraunces** (variable, optical size ~72–144, weight 380–600) | Its bulbous terminals and soft curves read as "droplet," not "startup deck" — justified by the subject, used with restraint (headlines only, never body copy) |
| Body | **IBM Plex Sans** (400/500) | Clean, humane, excellent at small sizes, tabular lining figures for anything numeric |
| Data/utility (prices, dates, license key format, badges) | **IBM Plex Mono** (400/500) | Ties directly to the real license-key format and charge-date figures — data literally looks like data |

**Type scale (desktop base 18px body):**

```
--fs-hero: clamp(2.8rem, 5vw + 1rem, 5.5rem)   Fraunces 420, -1% tracking
--fs-h2:   clamp(2rem, 3vw + 1rem, 3.2rem)     Fraunces 460
--fs-h3:   1.5rem                               Fraunces 500
--fs-body: 1.125rem                             Plex Sans 400, 1.6 line-height
--fs-small:0.9rem                               Plex Sans 400, --slate
--fs-data: 1rem                                 Plex Mono 500, tabular-nums
```

---

## 3. Spacing & grid — the anti-"boxy" rules

The brief's "not boxi boxi" note is a real constraint, not a vibe — here's what enforces it structurally:

- **No hard-bordered rectangles.** Cards never use a 1px solid border. Separation comes from a soft tinted background (`--teal-soft` at low opacity) or a blurred, colored "puddle" shadow — never a stroke.
- **Puddle shadow**, used in place of standard drop-shadow on every raised element:
  `box-shadow: 0 24px 48px -20px rgba(14,110,104,0.18), 0 4px 10px -4px rgba(14,34,48,0.06);`
  Wide, soft, colored toward teal — reads as a droplet's shadow on a wet surface, not a generic gray card shadow.
- **Radius scale is generous and asymmetric-friendly:** `--r-sm: 14px`, `--r-md: 24px`, `--r-lg: 40px`, plus one true `--r-full: 999px` for pills/buttons/badges. Nothing in the system uses a sharp 4–8px "default Bootstrap" radius.
- **Asymmetric section layout, not centered-column-of-boxes.** Alternate left/right weighting per section (text block offset against an image/UI shot, generous unequal margins) rather than every section being a centered 3-card grid. Reserve the even grid *only* for pricing (where symmetry is functionally useful for comparison).
- **8px base spacing unit**, scaling `8/16/24/40/64/96/144` — sections get large top/bottom padding (96–144px desktop) to deliver the "breathing space" the brief asked for. Never let two sections touch without at least 96px of separation.

---

## 4. The Trickle — signature scroll element

A single SVG path runs down the page's spine (desktop: fixed at ~6% from left edge; mobile: hidden or collapsed to a top progress bar — see §7).

- **Behavior:** the path's `stroke-dashoffset` is tied to scroll progress via a lightweight scroll listener (or `ScrollTimeline`/`animation-timeline: scroll()` where supported, with JS fallback) — it "draws" downward as the user scrolls, like water finding its way down the page.
- **Nodes:** at each major section anchor, a small filled droplet dot sits on the line. When that section enters view, the dot fills from outline → solid `--teal` with a soft 300ms ease.
- **Path shape:** not a straight vertical line — a gentle, slow-frequency wave (like the "weave" you asked for), amplitude small enough to feel ambient rather than busy.
- **Restraint:** this is the one bold move in the whole system. Everything else stays quiet around it, per the "spend your boldness in one place" principle.

---

## 5. Component specs

### 5.1 Buttons
- Primary CTA: `--r-full` pill, `--teal` fill, `--surface` text, puddle shadow.
- **Ripple on click** (not a generic scale/darken): a radial `::after` circle expands from the click point and fades — literally a water ripple, thematically justified, and it's a *micro*-interaction so it doesn't read as excessive.
- Ghost/secondary: transparent fill, `--teal` text + underline that grows from center on hover (200ms), no border box.

### 5.2 Cards (feature grid, FAQ, comparison rows)
- `--surface` background at 92% opacity over a `--teal-soft` tinted panel, `--r-lg` radius, puddle shadow, **no border**.
- Hover state: card doesn't just lift — it very slightly **scales (1.015)** and the puddle shadow spreads and softens further, mimicking a droplet about to detach from a surface. Duration 260ms, custom easing (§6).

### 5.3 Stat chips (problem-section numbers)
- Pill-shaped (`--r-full`), `--teal-soft` fill, big Plex Mono figure + small Plex Sans caption underneath — data reads as data, not as decorative typography.

### 5.4 Pricing cards
- The one place using a true symmetric 3-column grid, because comparison needs alignment.
- Middle (Pro) card gets a subtle `--teal-soft` background wash and a slightly larger radius/scale (1.03) to imply recommendation, no "MOST POPULAR" ribbon — let the visual weight say it instead of a badge.
- Price figure in Plex Mono, large, tabular.

### 5.5 Nav
- Transparent over hero, crossfades to a translucent frosted `--mist` bar (backdrop-blur 12px) at ~60px scroll — soft, not a hard color-snap.

### 5.6 FAQ accordion
- No boxed borders between items — each question separated only by a hairline in `--teal-soft` at 40% opacity, expand/collapse via height-auto grid-transition, chevron rotates 180° with the droplet-easing curve.

### 5.7 Badges (urgency: "charges in 2 days")
- Only component allowed to use `--amber`. Small pill, Plex Mono text, subtle pulse animation (opacity 1→0.85→1, 2.4s loop) — the *only* looping animation on the page, reserved for the one place urgency is real.

---

## 6. Motion system

**Custom easing — "droplet settle":** `cubic-bezier(0.22, 1, 0.36, 1)` for most reveals (a fast start, gentle overshoot-free settle — water finding rest, not a bouncy toy easing).

| Interaction | Duration | Easing |
|---|---|---|
| Scroll-reveal (fade + 16px translateY) | 500ms | droplet-settle |
| Card hover lift/scale | 260ms | droplet-settle |
| Button ripple | 500ms | ease-out, opacity 0.35→0 |
| Trickle line draw | tied to scroll position | linear (scroll-driven, not timed) |
| Nav background crossfade | 300ms | ease |
| Amber urgency pulse | 2400ms loop | ease-in-out |

**Reveal choreography:** sections reveal with a small stagger (80ms between siblings) as they cross ~75% viewport height — not a uniform "everything fades in identically" pattern. Stat chips in §3.3 stagger slightly faster (40ms) since there are more of them and a longer stagger would feel sluggish.

**Reduced motion:** respect `prefers-reduced-motion` — Trickle line renders fully drawn (static), ripple/pulse/stagger all disabled, only opacity crossfades remain.

---

## 7. Responsive behavior

- **Breakpoints:** 480 / 768 / 1024 / 1440.
- **Mobile (<768):** Trickle line collapses from a spine element into a thin horizontal progress bar fixed under the nav — same concept (path being drawn), adapted to a format that doesn't fight a single-column layout.
- **Asymmetric desktop sections** stack to single-column on mobile in a fixed order: headline → supporting visual → body copy.
- **Touch targets** ≥44px, pill buttons keep full radius at all sizes.
- **Puddle shadows soften/shrink ~30%** on mobile to avoid muddying a smaller viewport.

---

## 8. Accessibility floor

- Visible focus state: `--teal` 2px outline offset 3px on every interactive element (buttons, links, accordion headers) — never removed, only restyled.
- Color contrast: `--ink` on `--mist`/`--surface` and `--surface` on `--teal` both meet AA at body size.
- All motion gated by `prefers-reduced-motion` per §6.
- Amber urgency badges always paired with text ("charges in 2 days"), never color-only signaling.

---

## 9. What this locks in for the build phase

Tokens above (§1–2) become CSS custom properties at the root; §5 component rules become the actual component styles; §4/§6 become the scroll/motion implementation. Next step, when you're ready, is turning this into the actual HTML/CSS build — happy to start there.
