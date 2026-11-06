# Amul scroll-animation reference

Inspected 2 November 2026 at https://amul-website.vercel.app/ using its rendered browser DOM, screenshots, loaded script URLs and same-origin stylesheet rules. This is a design reference, not a Wood N Work business source.

## Directly observed

- Full-browser hero: `.hero { height: 300vh }`, with `.canvas-container { position: sticky; top: 0; width: 100%; height: 100vh; overflow: hidden }`. At the observed 1280×720 viewport, the hero is 2160px tall and canvas backing is 1280×720.
- Initial frame is a softly textured pale-pink field with a large centered serif product title. The title is an independent absolute HTML overlay, not painted into the animation. Its opacity fades from 1 to approximately zero during the first screen of scroll.
- Scrolling continues within the pinned screen: animated milk ribbons/splash enter, then a central bottle is revealed, all occupying the full viewport. Native PageDown advances the visible sequence; the header stays fixed. This feels like a product reveal film rather than a normal image card.
- Navigation is fixed, translucent, blurred, approximately 81px high, with product wordmark, four anchor links and a pill CTA. It stays over the hero and subsequent content.
- After the 300vh hero, the page flows normally through Features (three cards), Ingredients (two-column visual and copy), Refreshment (strong accent-colored CTA), Where to Buy, and footer. Later sections use roughly 96px vertical padding and substantial spacing.
- Loaded scripts include GSAP 3.12.2, ScrollTrigger 3.12.2 and a public script.js. The visible DOM has canvas id `hero-canvas`; the main container is a DIV with id `main`, not a MAIN tag. Script implementation was not fetched successfully, so frame count, interpolation and preload strategy are not independently confirmed.
- Site shows an initial full-screen percentage loader before revealing content. It went from 4% to 100% during observation. Avoid copying this blocking behavior for Wood N Work.
- Main stylesheet has no mobile-specific or reduced-motion rules. Its title is 8vw and subtitle 1.5vw; those can become too small on phones. The supplied main stylesheet does not establish a mobile menu. Do not assume the reference is an accessibility/performance model.
- Observed visual palette is pink/rose (CSS variables primary #ff4d6d, secondary #ff758f, background #fff0f3, text #590d22). Display font is Playfair Display; main font Outfit with Inter supporting. User explicitly prioritizes Wispr palette/type, so these Amul colors/fonts should not override Wispr findings.

## Adaptation to Wood N Work

1. Use a genuinely full-bleed sticky landing stage in a roughly 300vh section. Begin with visible wood grain from the supplied sequence, smoothly pull back through shutter/handle, and finish with the kitchen.
2. Introduce a short centered or carefully positioned headline in separate HTML. Fade/translate it early so the cabinetry becomes the focus; avoid a separate tall introductory block before the stage.
3. Map native scroll progress to the supplied usable frames (skip the two initial black samples). Reverse naturally when scrolling upward. Smooth frame progress, redraw only when needed, and prioritize nearby frames rather than holding all decoded frames.
4. Keep navigation and the four requested right-corner contact/chat controls fixed above the stage, with safe insets and no overlapping active forms/chat panels.
5. Let the pinned stage release into normal content sections and use quieter reveals afterward. Preserve the supplied six-page architecture; Amul is a motion reference, not the information architecture.
6. Add responsive central cropping/contain behavior for the important shutter/handle, a static final kitchen fallback for reduced motion/no JavaScript, clear readable overlay contrast and no blocking all-assets loader.

## Access limitations

The page loaded and was visually inspected successfully in the connected browser. Standard web retrieval returned inaccessible/internal errors. Shell retrieval initially could not resolve the host in the sandbox; an escalated request later retrieved index.css successfully but the script.js request still failed DNS. A separate script.js browser navigation was blocked by the browser; no bypass was attempted. Findings above distinguish directly observed CSS/DOM from implementation recommendations.

