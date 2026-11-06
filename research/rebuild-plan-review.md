# Rebuild plan review

Reviewed 2 November 2026 against the current user request, the uploaded-folder audit and the independently measured Wispr Flow reference. Source reviewed: `research/rebuild-plan.md`.

**Assessment:** the plan covers the requested rebuild and can proceed. It uses the supplied folder's correct six-page architecture, changes the visual direction to the measured Wispr palette/type system, keeps the actual frame reveal, includes all four fixed tools, and makes chatbot knowledge editable. The following bounded additions should be carried into implementation and QA.

## Required implementation clarifications

1. **Keep sample status beside each item.** Put “Sample testimonial — not a customer review” on each fictional testimonial card, in addition to the section heading. Label each project card and its case-study dialog “Illustrative concept”. Generated images need visible concept captions where they could otherwise look like installed client work. Do not use verified badges, ratings presented as genuine or national #1 claims.
2. **Keep materials research distinct from Wood N Work inventory.** Manufacturer-backed descriptions are useful selection guidance; they do not establish that the business supplies a particular brand, grade, finish or hardware line. Case studies should call these “suggested materials”. The chatbot must receive this distinction as well as the visible website.
3. **Align backend category values with the new page structure.** Root owns server validation and the builder owns forms/category CTAs. Use the same allowed requirement strings and `/api/chat` contract on both sides so Custom Furniture and materials enquiry links cannot produce silent validation failures.
4. **Make knowledge editing concrete.** Document the exact knowledge-file path, expected format and when edits take effect. Adding business facts increases available knowledge, not the provider's fixed model context limit. Keep chat history bounded, ground answers in approved facts and use an honest contact handoff for missing pricing, warranties, address or project claims. Failed/unconfigured Gemini must display an accurate unavailable/fallback state rather than a simulated AI response.
5. **Use the fonts deliberately.** The reference's actual fonts are EB Garamond and Figtree. If supplied/generated assets do not include them, use a lawful font source or document a fallback; do not describe arbitrary serif/sans replacements as exact matching fonts. Keep 48px-ish mobile hero typography and readable 16px form controls.
6. **Treat the fixed rail and chat as a shared shell.** All six routes and compatibility aliases must have the same four destinations, position and accessible names. Test at 390px width with chat closed/open and the phone keyboard visible where possible. The chat panel must fit within the viewport and avoid covering its send/close controls. Guard sessionStorage JSON and cap retained messages. Restore focus after closing. A modal dialog needs focus containment; a nonmodal chat panel should not falsely claim to be modal.
7. **Preserve motion fallbacks and actual source quality.** Skip the two black samples; scrub the usable supplied sequence in both directions. Avoid whole-sequence decode memory growth, keep priority loading, and show a final still with normal page flow for reduced motion/no JavaScript. Preserve the source's 854×480 dimensions without claiming 4K. Respect reduced motion in the extra text/card animations as well.

## Review gates

- Exactly Home, Kitchens, Custom Furniture, Projects, Our Story and Get in Touch in main navigation.
- Actual local screenshot confirms the new cream/teal/lavender design rather than the previous brown/white styling.
- Every fixed contact href is correct; phone opens the dialler, WhatsApp opens the confirmed number, Instagram opens the provided profile, chat toggles functional UI.
- Project filters and case dialogs work with keyboard and touch; labels stay visible.
- Invalid enquiries show associated field errors; successful enquiries are truly persisted and retain a reference.
- Chat answers known business questions, refuses to invent unknown details, keeps history across page navigation, updates after knowledge-file edits and has an explicit failure state.

No frontend files were changed by this review. The review was sent to root and the frontend builder before their final implementation pass.
