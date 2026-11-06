# Wood N Work — website implementation plan

Prepared 2 November 2026 by Agent 2, following Agent 1's `implementation-context.md` and the recovered meeting decisions. This plan defines the local review build; it does not turn proposed copy or illustrative visuals into verified business claims.

## Direction

Build a complete, elegant, light six-page enquiry website. The central experience is **Wood Grain Becomes a Kitchen**, driven by actual scrolling through the supplied 240 frames. Aim for an architectural editorial feel: white space, fine brown rules, large expressive serif headlines, concise sans-serif copy and substantial warm images. Avoid a dark global background, generic boxed feature grids, fake metrics and unnecessary content.

Proposed design tokens, not claimed existing brand hex values: white `#ffffff`, paper `#fbf9f5`, beige `#ece5d9`, warm brown `#654632`, ink `#332b25`, muted `#786d62`, line `#ded6cb`. Serif display can use locally available Georgia with optional nonblocking webfont enhancement; sans-serif system stack ensures dependable first paint. Rounded pills for small actions, largely square image panels, subtle image radii at most. All text comfortably readable; target AA contrast and 44px interaction targets.

Use a restrained typographic **WOOD N WORK / BY SIDDHAM BHANDARI** wordmark as a temporary text treatment, not an invented approved logo. Header: wordmark, page links, prominent 'Let's talk' action; collapse navigation to an accessible button/panel on mobile. Current page visibly indicated. Light footer with all six links, Nashik, phone and Instagram. Permanent direct phone action and a modest WhatsApp action; number configurable because WhatsApp availability has not been verified.

## Implementation

- Dependency-free Node server (`server.mjs`), vanilla HTML/CSS/JS, `package.json` scripts, assets in `public/`. All six routes must open directly and reload correctly: `/`, `/about`, `/kitchens`, `/wardrobes`, `/plywood-hardware`, `/contact`.
- Server renders or serves route-specific semantic content, titles, descriptions, active navigation and headings. Use normal links; no routing dependency needed. Keep shared templates reusable.
- Start with `npm start` at `http://localhost:3000` (or a clearly printed available port); root handles live preview handoff.
- Avoid remote media dependencies. Reuse actual supplied kitchen frames for kitchen/wood detail stills. For wardrobe/material visuals create refined original inline SVG or CSS architectural illustrations, clearly captioned 'Design concept' / 'Illustrative material study'. Do not label these as installed work, showroom photos or actual listed stock.
- Include source/build instructions and known integration limitations in README. Preserve all existing research.

## Home `/`

1. **Header and opening:** small eyebrow 'CUSTOM FURNITURE · NASHIK'; headline 'Made for your space.\nMade for your everyday.' Supporting copy 'Custom kitchens, wardrobes and furniture, shaped around the way you live.' Two actions: 'Explore our work' to the offering section (do not imply a Projects portfolio) and 'Share your requirement' to contact. Prefer 'Explore our spaces' for the final primary label. Keep opening text outside the footage as explicitly requested. A quiet scroll instruction 'Scroll to reveal' accompanies the stage.
2. **Pinned reveal:** wide framed canvas on white/beige page, 240-frame camera pullback. Desktop layout may place short introductory typography above, then let the visual dominate the sticky stage. Mobile preserves the central shutter and handle, using contain sizing or careful center crop and sufficient visual height. Accessible image fallback displays a representative final kitchen frame. Caption 'Kitchen design concept'. A delicate numbered progress rail or progress line communicates frame progress. During reveal, small external text can change between 'It starts with the material.' / 'Then, every detail.' / 'A kitchen, made around you.' without being the only means of understanding the business.
3. **Offering introduction:** eyebrow 'SPACES, THOUGHTFULLY CONSIDERED'; title 'A place for everything.\nA space that feels like you.' Two asymmetric image/editorial links for Kitchens and Wardrobes. One genuine supplied concept still for kitchen; bespoke wardrobe concept illustration. One concise sentence each and real page links.
4. **Material story:** beige split section with a wood-detail crop/material-layer illustration; title 'Good furniture starts beneath the surface.' Concise copy about timber/plywood background and discussing materials. Link 'Plywood & hardware'. Do not assert exact Mahavir corporate relationship or years.
5. **Enquiry preparation:** three short editorial numbered steps framed as what to share, not an unverified operational promise: 'Your space' (dimensions/locality), 'Your everyday' (how you use it), 'Your direction' (style/budget/timing). A subtle secondary line names custom beds, TV units, doors and office furniture, linking to Other Custom Furniture enquiry.
6. **Final invitation:** large serif 'Let's make room for your ideas.' Short text and 'Start a conversation' CTA. Light complete footer.

## About Us `/about`

Eyebrow 'WOOD N WORK · NASHIK'; heading 'An eye for design.\nA grounding in materials.' Identify Wood N Work — By Siddham Bhandari and custom-made kitchens, wardrobes and furniture in Nashik. Use wood-grain/detail still and a restrained materials composition. Explain 'Our story grows from a background in timber and plywood, brought into furniture made around individual spaces.' No numerical heritage age, dates, invented founder biography or workshop location. Small editorial pillars: material awareness, personal fit, everyday use. Link to material page and contact. Do not publicly present unresolved internal research notes as the brand story.

## Kitchens `/kitchens`

Heading 'The heart of your home,\nmade around you.' Supplied final kitchen frame as a large labelled concept image. Short custom-kitchen introduction. Three concise planning topics ('Your layout', 'Your storage', 'Your finish') invite discussion rather than claim approved offered types/brands. Optional small selector/tabs can change planning guidance but must not invent products. Useful FAQ via native details: 'What should I share to get started?' → dimensions/photos if available, locality, needs; 'Can I discuss my material preferences?' → share them for discussion; 'How do I enquire?' → form or call. No warranty/timeline promises. CTA `/contact?requirement=Kitchen`.

## Wardrobes `/wardrobes`

Heading 'A calmer space\nstarts with considered storage.' Elegant architectural wardrobe concept illustration (labelled), brief made-to-order proposition. Planning guidance around available width/height, access around the unit, what the customer needs to store; avoid claiming hinged/sliding/walk-in range approved. A small interactive planning accordion or adjustable illustration is optional if it adds usefulness. CTA `/contact?requirement=Wardrobe`.

## Plywood & Hardware `/plywood-hardware`

Heading 'The foundation\nof a thoughtful finish.' Editorial plywood layer / handle / sample illustrations (labelled conceptual). Explain the materials background and allow plywood/hardware enquiries. Sections 'Plywood', 'Hardware', 'Materials for your space' describe enquiry topics without listing unverified grades, brands, stock or dealership claims. A discreet Mahavir mention can say 'Plywood & hardware enquiries, including the Mahavir display discussed with our team.' Prefer omit the exact relationship from customer-facing copy until confirmed; document pending final Mahavir display identity in README. No invented showroom address or hours. CTA `/contact?requirement=Plywood%20%26%20Hardware`.

## Get in Touch `/contact`

Heading 'Every good space\nstarts with a conversation.' Phone `tel:+919090999916`, display '+91 9090 9999 16', Nashik/Maharashtra and Instagram `https://www.instagram.com/woodnwork.in/`. No guessed email/address/map/hours.

Form fields: name (required), requirement (required: Kitchen, Wardrobe, Plywood & Hardware, Other Custom Furniture), project locality (required), available space (text, 'Need help measuring' allowed), details, phone (required validated), email (optional validated if present), desired timing (text/date preference), budget (text, no invented range brackets), data-use acknowledgement. All fields labelled, required status clear, errors associated with fields and focus moved appropriately. Preserve input on failures; disable duplicate submit while saving. Accept preselected query parameter from category CTAs.

`POST /api/enquiries`: validate again on server, enforce payload limit, save unique reference + timestamp + submitted details to nonpublic `data/enquiries.ndjson`; use a serialized append or atomic persistence. Do not serve `data/`, `.env`, research, node files or arbitrary filesystem paths through static handler. Apply basic request rate limiting and input length limits. Return success only after durable append. Customer copy 'Your enquiry has been saved. Reference …' must reflect actual save. Offer user-initiated 'Continue on WhatsApp' with prefilled information, opening a chat draft only after their click. Do not send external test messages.

Automatic WhatsApp alert is a distinct integration. Provide a documented server-side adapter/queue with notification status `pending_configuration` until approved provider credentials/recipient/templates exist. A draft link is not claimed as automatic delivery. Avoid integrating a guessed provider API version; a configurable hook is sufficient for this local review. Report this outstanding setup in handoff. A notification failure never discards a saved enquiry. Do not expose API credentials client-side or pretend live business delivery exists.

## Frame animation contract

- Assets `public/frames/frame_000001.webp` … `frame_000240.webp`, source 854×480. Use all 240 ordered frames; preserve aspect ratio. Do not upscale asset files or claim 4K.
- Home only: a long section roughly 300–400 viewport heights with a sticky visual stage. Map section scroll progress `0..1` to target frame `1..240`; scrolling up reverses naturally. Native scrolling remains normal; no wheel interception/forced smooth-scroll library.
- One `requestAnimationFrame` loop only while stage active or easing settles. Ease displayed progress toward target for smooth scrub, but immediately seek appropriate progress on restored scroll. Redraw only when frame or dimensions change.
- Canvas backing size responds to element size and caps devicePixelRatio (e.g. 1.5–2); ResizeObserver handles resizing/orientation. CSS keeps useful stage size on mobile. Fallback image and accessible name exist independently of canvas.
- Load first frame immediately; prioritize a sparse set of key frames and nearby frames, then background fill with a small concurrency limit. Start displaying as soon as first frame ready; never block the entire site until 8 MB downloaded. Draw nearest loaded frame while requested one is unavailable; redraw when it arrives. Handle image errors with fallback without unhandled promises.
- Avoid retaining 240 fully decoded bitmaps indefinitely on mobile: maintain bounded nearby decoded frames or use lazy Image references/bitmap cache with eviction. Source compressed frames total ~8 MB but decoded image memory is much larger.
- `prefers-reduced-motion: reduce`: display final still, remove excessive pinning scroll distance and reveal movement; content remains fully usable. If JS is unavailable, show still/normal semantic content and real links.
- Below-fold section reveals use IntersectionObserver and default-visible fallback. Respect reduced motion. Do not hide important text permanently while waiting for JS.

## Review acceptance

Root should verify six routes and direct loads, desktop/mobile widths, working mobile navigation, keyboard interactions, no horizontal overflow, canvas visibly changes with scroll and reverses upward, last frame/fallback/reduced motion, all CTA destinations, enquiry server validation + persistence (without sending external messages), no data-file leakage, source/frame 404 behavior, no console exceptions. Inspect the opening visual and page layouts in browser if tool available. Ensure unresolved business facts remain omitted or documented in README, not invented. Local preview must remain available for user review.
