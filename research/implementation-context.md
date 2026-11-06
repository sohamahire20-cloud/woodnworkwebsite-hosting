# Wood N Work — implementation context

Compiled 2 November 2026 from all three supplied research files, AGENTS.md, README.md, and the actual previous project chats. This is a source brief for planning and building; researched suggestions are not additional client instructions.

## Sources reviewed

- Prior chat **Research Woodnwork website plan**, ID `01a1959f-ccbd-76b2-aa88-a0170d733fc8`: all available turns, including the entire Hindi/English transcript pasted by the user and subsequent animation decisions.
- Prior chat **Start a conversation**, ID `01a1958a-cd9b-70d1-ad41-e65d73b677d0`: user established business in Nashik and this project context.
- `Wood-N-Work-Research-and-Six-Page-Website-Plan.md`, `Wood-N-Work-Instagram-Research.md`, `Wood-N-Work-Wider-Web-Research.md`.
- Current request explicitly authorizes creation now, three agents in sequence, supplied-frame scroll animation, and localhost preview. Prior research-only restriction belongs to the older request and does not restrict this build.

## Direct client meeting decisions

- Keep website minimal, basic and informative, without excessive information.
- Colors: **brown, beige, white**. Client explicitly said the overall background should remain **white**, and the website should not be very dark. No exact hex values were supplied; sensible matching colors are a design choice, not an existing brand specification.
- Opening must feature kitchen animation controlled by scrolling, with no embedded video. Exact earlier reference was transcribed as `keyboard.moduler.com` and remains unresolved; do not claim it has been identified or copied.
- Incorporate the Mahavir plywood/hardware display in this same website, not a separate site. Mention parent concern history in About Us. Approximate 35–40 years refers to parent concern, not age of current Wood N Work furniture brand. Exact name/relationship/date remain unclear.
- Get in Touch form: requirement, available space, details, phone, email, when required, budget. Save enquiries in backend AND notify the business through WhatsApp.
- Include Instagram and WhatsApp contact buttons.
- Projects and AI chatbot are **later phase**. For now one representative image per product/type, without invented completed projects.
- Client promised kitchen and wardrobe type lists, but no actual approved type list is present in recovered material.
- Client wants a consistent logo across channels, but approved new master logo is not available. Do not treat an invented mark as approved final logo.

## Later user animation decisions

After the meeting, the user explicitly chose the third responsive idea, **Wood Grain Becomes a Kitchen**: extreme close-up of wood, smooth camera pullback revealing shutter/handle then kitchen. Both laptop and phone must work well. Keep featured shutter/handle central, product visible, and site text/buttons outside generated footage. The supplied ZIP is now the chosen asset; use these actual frames and reverse naturally when scrolling upward. Root has extracted the 240 WebP frames into `public/frames`.

Source asset: `woodnwork_animation_frames_30fps.zip`, 240 sequential frames, 854×480, 30 FPS sampling, approximately 8.09 MiB. Original video was 24 FPS so some samples repeat. Preserve aspect ratio and sharpness; no claim of 4K. Label kitchen visual as design concept instead of a verified completed client project.

## Identity and usable facts

- Display identity: **Wood N Work — By Siddham Bhandari**. This is the observed Instagram identity and safest consistent display spelling. User also calls brand Woodnwork.
- Location: **Nashik, Maharashtra, India**.
- Phone: **+91 9090 9999 16**, normalized `+919090999916`; `tel:+919090999916`.
- Instagram: `https://www.instagram.com/woodnwork.in/`.
- No verified email, street address, hours, showroom readiness or map pin is present. Do not invent these.
- WhatsApp was explicitly requested in meeting, but the public phone's WhatsApp capability was not verified. Do not present a tested WhatsApp integration as complete. Keep destination configurable and describe pending business setup honestly in handoff.
- Own public copy advertises custom modular kitchens, wardrobes, beds, TV units, custom doors, complete home interiors and office furniture. Core launch focus is kitchens/wardrobes and plywood/hardware. This is consultation/enquiry, not ecommerce.
- Public positioning: bespoke, custom-made, built to order, factory direct. Material expertise is established as brand story; avoid independently audited ownership or savings implications.
- 35+ timber knowledge appears in Instagram; use only with parent attribution and approval. Safest initial copy omits numerical years.

## Agreed six-page architecture

Exactly six main pages: **Home `/`**, **About Us `/about`**, **Kitchens `/kitchens`**, **Wardrobes `/wardrobes`**, **Plywood & Hardware `/plywood-hardware`**, **Get in Touch `/contact`**. This is recovered research synthesis aligned with six-page request. No Projects, chatbot or checkout page.

Home: scrolling kitchen reveal; concise offering; Kitchens/Wardrobes; materials introduction; restrained explanation of customization/material knowledge; enquiry invitation. About: identity and material background without invented dates. Product pages: short useful custom-fit copy and enquiry CTA; do not invent specific offered layouts, finishes, brands, warranties or prices. Materials page: plywood/hardware enquiry, careful Mahavir context without exact legal claim. Contact: concise form and real phone/Instagram links.

## Lead behavior and implementation boundaries

Backend persistence and WhatsApp alerts are separate requirements. Browser WhatsApp link is not an automatic backend alert. Implement real local server persistence for review if feasible; do not show fake form success. Notification provider/account credentials were never supplied, so configure a server-side hook/queue explicitly and report automatic WhatsApp delivery pending actual business account configuration. No external messages are authorized as part of local preview testing.

Use labelled required inputs, inline validation retaining values, unique submission reference and honest saved state. Budget should be a free input or not-sure option because no ranges are approved. Email can be optional; name and project locality are sensible planner additions. No newsletter, account or file upload is requested.

## Visual and evidence guardrails

Warm white/ivory/beige, brown accents, plenty of whitespace, restrained display serif and readable sans serif fit existing research direction. Light overall site including footer is safest. Responsive nav, meaningful keyboard support, reduced motion/static hero fallback and lazy/concurrent controlled image loading are important. Avoid forced scroll or inaccessible animation-only information.

Do not invent testimonials, client names/logos, project counts, years operating, guaranteed savings, delivery guarantees, prices, warranty or independent awards. Do not use social follower numbers as trust statistics. At least one Instagram kitchen image had an AI label; social images are not verified installed work. Existing approved product photography has not been provided. Supplied frames are design concept imagery, not proven site photography.

## Unresolved inputs to document at handoff, without blocking local build

Final master logo; exact Mahavir name/relationship/history; kitchen and wardrobe approved types/images; physical address/hours/service area; email; verified WhatsApp routing and notification account; true service inclusions/warranty; domain access. No exact approved hex colors are missing from otherwise available records: only named palette was specified.
