# Wood N Work rebuild plan

2 November 2026. Sources: uploaded-folder-audit.md, wispr-reference.md, amul-reference.md, current user instructions and recovered business brief. Current user selects Gemini; root owns its backend/credential setup and editable knowledge file.

## Architecture and scope

Exactly six main pages follow the uploaded folder: Home `/`, Kitchens `/kitchens`, Custom Furniture `/custom-furniture`, Projects `/projects`, Our Story `/our-story`, Get in Touch `/get-in-touch`. Preserve corresponding `.html` paths as compatibility aliases and map prior `/about`, `/wardrobes`, `/contact` routes sensibly. No seventh public verification page. Keep source-folder unchanged; implement in current writable workspace. Retain dependency-free Node render interface and validated enquiry backend fields.

## Art direction and motion

Wispr's measured cream #FFFFEB, ink #1A1A1A, teal #034F46, lavender #F0D7FF and taupe #E4E4D0; EB Garamond display/italic with Figtree body (fallback fonts if unavailable). Floating framed nav, large centered editorial headlines, spacious 112–144px chapters, lavender outlined buttons, large rounded section shells, warm product imagery. Original Wood N Work content, no borrowed logos/copy/testimonials.

Home opens with compact centered brand statement and a genuinely immersive supplied-frame reveal. A 300vh section pins a near-full-screen kitchen canvas; headline is separate HTML and fades with scroll. Start frame000003 to skip black samples, reverse on scroll up, preserve bounded decoded cache and priority preloading. Preserve source resolution and label concept imagery. Reduced motion/noJS show final kitchen still with ordinary content flow. Subsequent chapters use revealed text, a sticky materials visual, concept-project cards and a quieter FAQ/CTA rhythm. Avoid blocking loaders and wheel interception.

## Page content

- **Home:** centered positioning + supplied frame reveal; three offering links (Kitchens, Custom Furniture, Projects); material-led story; concept-project preview; materials notes; labelled sample testimonials; CTA.
- **Kitchens:** substantial generated kitchen image; four illustrative layout ideas; material selection guide based on root's cited research; consultation preparation; kitchen enquiry CTA. Layouts/materials are ideas to discuss, not verified stock/service guarantees.
- **Custom Furniture:** wardrobes, media storage, architectural panelling and dining/bar inspiration; concise dimensions/storage/finish planning; labelled concept images; enquiry CTA. Do not assert unverified capabilities or heights.
- **Projects:** category filters and accessible case-study dialog covering concept brief, proposed woodwork solution and suggested materials. All fictional studies explicitly labelled Illustrative concept; no verified badges or fabricated client/site completion claims.
- **Our Story:** Wood N Work — By Siddham Bhandari, Nashik, custom-made furniture and timber/material background; three material/space/everyday principles; suggested conversation journey; no invented founder biography or operating age.
- **Get in Touch:** real phone/WhatsApp/Instagram links and validated enquiry fields name, requirement, locality, space, details, phone, optional email, timing, budget, consent. Keep actual backend persistence, accurate success reference and WhatsApp draft option.

## Persistent tools and chatbot

Shared fixed right-corner rail on all six routes: Instagram (user's full URL), WhatsApp `https://wa.me/919090999916`, phone `tel:+919090999916`, chatbot toggle. Accessible icon labels/tooltips, keyboard focus and safe-area offsets. Phone link opens the device dialler; never claim browser can force a completed call.

Chat dialog uses `POST /api/chat` body `{message,history}` and reply `{reply,mode}`. Keep conversation/open state in sessionStorage across ordinary page navigation. Keyboard Escape closes and returns focus, live-region messages, editable input, suggested questions, loading/error/retry states, no unsafe HTML from responses. Root supplies editable business knowledge and Gemini adapter. Clearly answer only supported business facts, distinguish concepts from real work and hand unknown questions to the business; never promise omniscience or fabricate specifications. Credentials remain server-side.

## Evidence and review

Indian sample testimonial names are allowed only beneath an obvious “Sample testimonials — illustrative, not customer reviews” label; no Google stars or real-customer claim. All generated images marked concept. Research-based material options link to authoritative manufacturer sources and do not imply Wood N Work dealerships. Root generates GPT images in ChatGPT only and owns final saved assets, backend, preview and QA. Frontend uses supplied image path `public/images/kitchen-concept.png`, existing frame stills and explicitly illustrative SVGs as needed.

Acceptance: six-page navigation/direct reload, four fixed functional destinations, frame advancement/reversal, mobile390px readability/nooverflow, functional filters/case dialog, form validation and persisted save, chatbot grounded answers/fallback/error/persistent history, accessible close/focus and reduced-motion styling. Final claim is a local review website; live Gemini requires later user's environment setup and automatic WhatsApp notification remains separately configured.
