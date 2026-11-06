# Wispr Flow reference review

Observed live homepage at https://wisprflow.ai/ on 2 November 2026. Reviewed the rendered desktop page from hero to footer, scroll transitions, mobile 390 × 844 hero, DOM layout/computed styles and current page text. These are reference findings, not Wood N Work business facts.

## Measured visual system

| Token | Actual observed value | Role |
| --- | --- | --- |
| Cream | `#FFFFEB` | Body, nav and light sections |
| Ink | `#1A1A1A` | Primary type and major dark section |
| Deep teal | `#034F46` | Announcement strip and immersive feature panel |
| Lavender | `#F0D7FF` | Primary buttons and small floating privacy control |
| Taupe | `#E4E4D0` | Tab backgrounds, quiet cards, footer product panels |
| Coral | `#FF6C4C` | Selected animated labels/illustrations |
| Orange | `#FFA946` | Accent card/badge |
| Pink | `#FFBCF2` | Accent illustration/card |

The display font is **EB Garamond**, regular 400, with italic emphasis within headings. The body/navigation font is **Figtree**, regular/medium sans serif. Desktop h1 is 96px, 91.2px line height (0.95), -2.88px letter spacing (-0.03em). Section headings range 48–75px, the largest closing headline is 120px. Mobile h1 becomes 48px/45.6px. The hero description is approximately 22px and CTA labels 16px. Font families were read from computed styles, not guessed visually.

At the observed 1280px viewport: main content has 40px horizontal gutters and a 1240px maximum container. The fixed floating navigation is centered, about 930px wide and 64px high, with a fine taupe border, 12px corners, cream background. It contains an internal pill-like product toggle, ordinary text navigation and a lavender primary action. Primary buttons have an approximately 1.6px ink outline, 8px corners, and 16px × 24px padding. This is a softly rectangular button system, not uniformly full pill CTAs.

## Actual section progression

1. Deep teal announcement strip, floating framed nav and centered cream hero: small uppercase eyebrow, oversized two-line serif headline with italic second line, compact centered description, lavender action and small supporting line.
2. Animated looping SVG text ribbons/voice waveform at the bottom of the hero. The hero uses semantic typography and graphic animation rather than a fullscreen photographic video background.
3. Charcoal trust strip with very large rounded top corners (about 80px) and horizontally repeated customer marks.
4. Deep teal rounded feature stage. A large centered serif headline/intro moves into an immersive pinned animated product demonstration. At scrollY around 2518 the `.section_fl-wrap` is fixed at top:0. The headline, visual and changing states remain in a viewport stage as scrolling progresses.
5. Cream "how it works" section presenting three progressive feature stages/tabs. Image/mockup states and text evolve, without turning the whole page into a uniform card grid.
6. Cream personalisation section: large central heading, then a left sticky visual with a right vertical stack of feature text. Active text is fully ink while nearby past/future text fades. The sticky visual uses subtle scaling and changes illustrative states. `.lang_card--wrap` is sticky at top:0 and 100vh high on desktop.
7. Short privacy/reassurance block.
8. Long charcoal case-study/testimonial deck. Large colorful rounded cards combine image, serif quotation and small attribution; cards translate and rotate into/out of focus around a pinned center stage. `.testiv2_wrap` is sticky at top:0, height:100vh. This is a clear scrolling chapter, not a static testimonial row.
9. Cream FAQ section, compact two-column question/answer composition on desktop.
10. Large visual closing CTA with oversized serif copy, then cream footer: two quiet product panels and organized link columns.

## Mobile observations

At 390px width, no horizontal overflow was observed. Hero stays centered, h1 reduces to 48px, body copy wraps to a small number of centered lines and lavender CTA stays comfortably wide. Nav becomes a compact framed row with logo, smaller action and hamburger; desktop links disappear. Announcement strip is compressed to one line. Main dark chapter top corners reduce visually, while oversized graphic material can intentionally crop inside its own section. The page keeps its palette and serif/sans contrast rather than adopting a different mobile aesthetic.

## Translate into Wood N Work

- Follow the supplied folder's six pages: **Home, Kitchens, Custom Furniture, Projects, Our Story, Get in Touch**. Wispr is the visual/motion reference, not an information architecture source.
- Adopt the measured cream/ink/teal/lavender system and EB Garamond/Figtree pairing. This user's new instruction supersedes the earlier all-white/brown-only decision.
- Use an original centered Wood N Work headline, one italic emphasis, concise positioning, a lavender enquiry CTA and floating framed six-page navigation. Do not copy Wispr copy, logo, customer marks or user testimonials.
- Integrate the supplied kitchen frames as the primary pinned scroll chapter: cream introductory hero → rounded teal/ink visual stage → frame pullback → following light chapter. Start at first usable wood-grain frame, never the original black lead-in samples.
- A sticky materials visual plus active planning copy can explain kitchen storage, material selection and hardware. Use progressive opacity and visual changes to tell one coherent story.
- Present projects as a colorful rounded concept-study deck. Show a persistent **Illustrative concept** label on fictional studies and their generated imagery. Sample testimonials with Indian names must have an equally clear **Sample testimonial — not a customer review** label until replaced.
- The four requested right-corner contact controls should form one consistent fixed rail on every route. A shared shell ensures identical position, accessible labels and keyboard use; safe-area offsets and a chat panel with a capped viewport height prevent mobile overlap.
- Use native scrolling and transform/opacity animation with `requestAnimationFrame`/IntersectionObserver, and remove long pinning when reduced motion is requested. Wispr's observed implementation is sophisticated; replicate its chapter rhythm and hierarchy without unnecessary giant scroll distances.

## Evidence

- Live page: https://wisprflow.ai/
- Current linked stylesheet: https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/css/flowsite-dev.webflow.shared.8992a9f67.min.css
- DOM computed-style findings and screenshots were taken directly in the reference page. Exact values above reflect the currently observed build and may change later.
