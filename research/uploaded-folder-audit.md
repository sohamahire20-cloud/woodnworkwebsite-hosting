# Uploaded Woodnwork folder — source audit

Reviewed 2 November 2026. Source folder `C:/Users/User/Desktop/woodnwork` was read only. This records observations, not an implementation plan or verification of business claims found in the source.

## Files and structure

The supplied website is a dependency-free static HTML/CSS/JavaScript website. Its **six customer pages** are:

| Page | Source filename | Main content structure |
| --- | --- | --- |
| Home | `index.html` | Hero; three offer cards; timber/material story; selected projects; material cards; four-step journey; enquiry CTA |
| Kitchens | `kitchens.html` | Intro; parallel/island/L/U layout examples; carcass/facade materials; hardware; projects; consultation preparation |
| Custom Furniture | `custom-furniture.html` | Intro; wardrobes, media units, panelling, dining/bar examples; customization; projects; CTA |
| Projects | `projects.html` | Filterable six-card gallery; full case-study modal; brief, solution, materials, dimensions; CTA |
| Our Story | `our-story.html` | Timber background; factory-direct positioning; four-step process; pre-production checklist; CTA |
| Get in Touch | `get-in-touch.html` | Two-step enquiry; contact/location; FAQ |

`verification-guide.html` is an additional internal handover/review page rather than a customer-facing core route. There are three stylesheets (`main.css`, `components.css`, `responsive.css`), three scripts (`main.js`, `projects.js`, `enquiry.js`), two SVG logos, a README and a local PowerShell server. There is no npm application, server-side enquiry API, AI integration or frame-sequence hero in this folder.

The prior website built in the current workspace has a different six-route structure. The latest user specifically selects the uploaded folder's architecture, so its page names are the relevant architectural reference for the rebuild.

## Actual interactions

- Sticky header changes appearance after scrolling. Mobile navigation toggles, locks page scroll and closes with Escape or navigation.
- Project category filters change visible cards. The project modal displays records from the six-item `PROJECTS_DATA` array and updates an enquiry link with the project title.
- The contact form validates two steps, saves enquiries in browser localStorage, shows a staging summary, copies a formatted summary, and opens a WhatsApp draft after an outdated confirmation dialog. It does not send to a business backend.
- Repeated preflight banners and modals expose internal SSL, contact verification, photography and specification tasks on customer pages.
- `serve.ps1` serves the folder over HTTP on port 8080 and launches a browser. It was inspected but not executed during this audit.

## Visual system observed in source

The uploaded version uses dark walnut/brass/ivory, Playfair Display headings, Plus Jakarta Sans body, 1280px max-width, small square-ish buttons and a dark footer. The newest user explicitly replaces this palette/UI direction with Wispr Flow's, so these source tokens are reference history rather than current instructions.

The logo combines an interlocking rectangular joinery symbol and a serif WOOD N WORK wordmark. This is an available uploaded asset, without independent evidence that it is a final approved master logo.

## Assets

Six unique JPG subjects are present: kitchen hero, wardrobe, media credenza, timber workshop, U-shaped kitchen and bar cabinet. Each is duplicated under a simple filename and a timestamp filename. The unique images total approximately 4.7MB; copying both sets adds unnecessary size.

The kitchen and wardrobe files were visually inspected: polished architectural interiors with rich wood and warm lighting. Their appearance does not establish photographic provenance or completed Wood N Work installations. The current request asks for new images generated through ChatGPT's GPT image tool; root is managing that asset work.

## Claims requiring care

The source calls four locality-named examples “Verified Completed Project”, claims project logs/verified photography, and calls product types “confirmed”. No underlying project logs or owner verification are included. These labels are source text, not evidence. The two additional records already say concept studies.

Other unsupported source claims include exact millimetre manufacturing, factory ownership/equipment, named material standards as universal company policy, zero-joint edge banding, installation responsibilities, free consultation, outstation service and “zero visible sagging” at stated heights. General material facts must be separated from Wood N Work's actual specifications. Project briefs/solutions/material choices invented for this draft need visible **concept study** labelling. Sample testimonials with Indian names need visible **sample testimonial** labelling rather than a claim of authentic endorsement.

Public evidence and supplied meeting context establish the brand's custom furniture positioning, Nashik location, and material/timber background, but not all detailed claims in this uploaded prototype. The parent business's approximate history must not become the present furniture brand's operating age by assumption.

## New authoritative user updates

The current user confirms **9090999916** for WhatsApp and telephone. Normalize as `+919090999916` for call links and `919090999916` for WhatsApp. The supplied Instagram destination is `https://www.instagram.com/woodnwork.in?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw==`. Old prototype phone-confirmation restrictions are obsolete.

Projects and AI chatbot were deferred in the previous meeting, but the newest user explicitly requests both now. That request supersedes the earlier launch restriction. The chatbot should answer from available verified business knowledge and openly hand off unknown questions; the user wants to add more business information later. Credentials and live AI setup remain with the root agent.

The folder was left unchanged. Consolidated implementation planning is held pending root's credential-gate instruction and the two sibling reference audits.
