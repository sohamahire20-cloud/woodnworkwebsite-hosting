# Wood N Work

Complete local website for the Nashik business, updated from the owner’s 5 November 2026 brief. Dependency-free Node.js server with server-rendered pages, responsive CSS and progressively enhanced JavaScript. No build or dependency installation is required.

## Run

Requires Node.js 22 or newer.

```powershell
npm start
```

Open http://127.0.0.1:3000. Set `PORT` to another available port if necessary. The default bind is `127.0.0.1`; production hosting normally needs `HOST=0.0.0.0` and the host-assigned `PORT`.

```powershell
npm run check
npm test
```

The test script starts isolated local servers, writes synthetic enquiries only under `.work/verify-*`, checks routes and assets, validates real persistence and error responses, and mocks the AI provider. It sends no WhatsApp messages or real AI requests. Windows may require approval for local listening sockets.

## Pages and preserved URLs

Main navigation: Home `/`, About Us `/about-us`, Products `/products`, and Get in Touch `/get-in-touch`. The catalog contains five collections and owner-supplied product references. Raw materials and finishes appear on Home and Products. Previous Projects, Plywood and Hardware, Kitchens and Custom Furniture URLs redirect to the catalog or its relevant section.

The business email is `woodnwork16@gmail.com`. The name and contact details in page metadata and the assistant match the public site.

## Design and assets

White canvas, walnut-brown text/actions, beige panels, generous spacing and editorial typography. Wispr Flow informed type hierarchy and page rhythm; Kiwo Modular informed the opening presentation. No reference-site code, branding or proprietary media is used. The same openly licensed font families observed on Wispr—EB Garamond and Figtree—are served locally from `public/fonts`, with their SIL Open Font License notices. System fonts remain as fallbacks.

The owner’s final copy direction is reflected across the pages: memorable, benefit-led headings, personal enquiry calls to action, and natural references to modular kitchens, wardrobes, doors, beds and office furniture in Nashik. Technical form status remains explicit and factual. Page-specific search titles/descriptions, social sharing metadata, confirmed LocalBusiness structured data, `robots.txt` and a four-page canonical `sitemap.xml` are included. No search ranking or indexing result is promised, and no discounts or unconfirmed offers are invented.

The supplied original `public/video/kitchen-opening.mp4`, its 240 source frames and the original ZIP remain in the local project workspace. The repository includes `public/video/kitchen-opening-six.mp4`, a silent, fast-start H.264 derivative containing the first six seconds at 1280×720, plus `public/video/kitchen-still.webp`. These optimized files are the ones used by the site. The source is the supplied kitchen reveal; no new assembly footage was invented. On mobile, a welcome and scroll link sit below the film. It plays once without overlay text or replay/skip controls, following the owner’s screenshot clarification. Only the navigation and persistent contact controls accompany the opening. Native scrolling always remains available; no forced transition or scroll lock is used for the film. On mobile the full frame is contained rather than cropping important cabinetry. Reduced-motion and data-saving preferences get the static still. No JavaScript or failed video also leaves the still and ordinary links usable.

The existing AI-generated kitchen/wardrobe images are labelled illustrative concepts. The interior concept uses a supplied film still. All scenarios, design solutions and material categories are explicitly illustrative; none are completed client projects. No customer reviews, generated customer names, fake ratings or supplier relationships are published. Supplier options need personal confirmation.

The fixed mobile contact dock occupies a reserved region outside the scrolling page, keeping form controls clear. The desktop rail sits in the reserved right gutter. Chat and project dialogs have accessible names, close controls, keyboard support and visible focus.

### Scroll motion

`public/motion.js` and `public/motion.css` provide the original, dependency-free scroll presentation. The homepage includes heading reveals, card entrances, image movement, a reading highlight and a material illustration that changes through three chapters. Scrolling remains native.


Without JavaScript, for reduced-motion preferences, or below 560px of usable viewport height, the story cards form an ordinary readable sequence. The six-second opening remains free of overlay text, replay buttons and other film controls, as requested. The full animation can be reviewed locally at `/#design-stories`.

## Enquiry save and WhatsApp draft

`POST /api/enquiries` accepts required name, Indian mobile phone, requirement and locality; dimensions, budget, timing, email and details are optional. Client/server validation, length/payload limits, same-origin checks and basic rate limiting apply. There is no privacy notice or consent checkbox.

Validated enquiries append to `data/enquiries.ndjson` through the existing serialised write queue, with a reference and timestamp. The server flushes the file before returning `201 {status:"saved",reference}`. `DATA_DIRECTORY` can select a private persistent directory; it must be outside `public`. Only approved assets under `public` are served. Enquiries, knowledge, research, server source and environment files cannot be read through the website. There is intentionally no unauthenticated lead-list endpoint. The owner can inspect the private file through authorised server/file access. On Linux newly created directories/files use owner-only permissions; apply appropriate Windows ACLs/hosting permissions as well.

On valid submission, the browser starts a background save and immediately opens a prefilled WhatsApp draft in the same tab. The WhatsApp handoff works independently of the server save. The visitor presses Send in WhatsApp.

**The visitor must press Send in WhatsApp. The website cannot verify sending or delivery.** Returning to the site does not imply the visitor sent anything. Opening WhatsApp uses its normal mobile-app/browser or desktop-web fallback. There is no automatic business messaging integration; obsolete webhook delivery code was removed. Old notification records are preserved but no longer used.

## Assistant

The existing server-side Gemini adapter is retained, with a useful local Business FAQ fallback. `/api/chat/status` identifies whether an AI key is configured, without claiming a working provider connection. Approved business questions are answered locally and labelled Business FAQ. Unknown business facts get an honest contact handoff. The AI service is only used for these explicitly allowed general planning questions:

- What should I consider when planning kitchen storage?
- What is the difference between plywood and veneer?
- How can I plan wardrobe storage?

The adapter substitutes a fixed general prompt for an allowed question. It never forwards arbitrary chat text, form fields, enquiry files or history. Enquiry-like input remains local. Conversations are kept in page memory only. Provider failures display an unavailable state.

Optional server environment: `GEMINI_API_KEY` and a model available to that account in `GEMINI_MODEL`. Keep secrets in Hostinger environment settings or a private ignored `.env.local`; never put them in `public`. The checked-in example defaults to `gemini-3.5-flash`; provider/model access must be verified before promising live AI. Without credentials, the site explicitly presents its limited Business FAQ mode. No live provider request was used in automated verification.

`knowledge/business.md` is the approved knowledge file, reloaded for each allowed AI request. Its facts were updated from the latest owner brief. Historical research and arbitrary new files do not automatically become chatbot ground truth. FAQ wording in `chat.mjs` must be updated alongside changed approved facts. Never put credentials or customer details into knowledge.

## Hostinger production setup

The existing Node architecture is retained. Hostinger’s current [Node deployment guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/) supports Node 22/custom servers on eligible Business/Unlimited and Cloud plans; a configured VPS is another option. The [Node limits guide](https://www.hostinger.com/support/hostinger-node-js-limits-for-web-and-cloud-plans/) describes the single-process hosting model. This app needs no background worker or inbound WebSocket.

The owner identifies the hosting plan as Unlimited. Hostinger's current documentation lists Business/Unlimited as Node.js-capable and supports custom servers using the Other application type. The hosting account and deployment have not yet been verified. Before launch:

1. Confirm a Node-capable plan and configure `npm start`, Node 22+, `HOST=0.0.0.0` and the assigned port. Upload application files and approved assets, excluding `.env.local`, `.work`, private enquiry data and logs from public distribution.
2. Configure a writable **persistent private** `DATA_DIRECTORY` outside public assets and disposable release directories. Confirm persistence across redeploy/restart, filesystem access restrictions and backups; the app must run as a single writer. If the plan cannot preserve private files, arrange durable storage before accepting production enquiries. Do not deploy this as static-only hosting.
3. Connect the owner’s domain, verify HTTPS, and choose www/non-www redirects. Canonical URLs currently use the supplied `https://www.woodnwork.in`. Deployment, DNS and HTTPS have not been performed here.
4. Set and verify Gemini credentials/model only if live AI is wanted. The FAQ fallback already works without them.
5. Supply genuine approved project photographs/reviews and any verified material/supplier information when ready. None are fabricated as launch filler. The owner-approved logo is already included.

Business email links open the visitor’s email application; this site does not send email. No successful WhatsApp message delivery or deployment is claimed.



`nAll six design briefs use the three headings requested by the owner: What the client wanted, Wood N Work solution, and Materials used for that. Copy explains the intended use, layout choices and example material roles in plain English. Gallery filtering has staggered transitions; detail views animate on opening and reveal their sections within the dialog scroll area. Reduced-motion visitors receive the same content without these transitions.
