# Yogesh Raya | Portfolio Reference and Motion Brief

Updated: 2026-09-24

## Current Direction

Adapt the existing portfolio to closely follow **[baicheramy.com](https://baicheramy.com/)** across its sections, page types, hierarchy, and interaction patterns. Use **[Motion for React](https://motion.dev/docs/react)** for animations.

This request supersedes the earlier content-only restriction. Layout, section order, components, page templates, and animation changes are now in scope where needed to follow the new reference. Reuse existing code and content where practical. Keep the current Next.js, React, TypeScript, and Markdown foundation.

The portfolio remains Yogesh Raya's product-design portfolio. Preserve problem-solving case studies, client projects, website design, experience, and static Markdown blogs. Keep Framer services and agency positioning out of public copy. Motion is an implementation library and does not change that positioning.

This document is an implementation brief. The existing website source has not been inspected or modified in this conversation.

## Reference Review

Reviewed through public page extraction and desktop browser inspection. Exact source-code values, animation timings, and mobile behavior were not measured; numeric values below are proposed implementation targets.

| Reference page | Observed structure |
|----------------|--------------------|
| [Home](https://baicheramy.com/) | Utility header; patterned cover with overlapping portrait; name, role, introduction, email shortcut, work/CV actions; large project previews; expandable Experience; four numbered strengths; About summary; Craft grid; location/social footer; floating navigation and settings |
| [Projects](https://baicheramy.com/projects/) | Full project collection, image galleries, summaries, public links or private-project labels |
| [About](https://baicheramy.com/about/) | Biography; personal status cards; strengths; tools; philosophy; contact/CV actions |
| [Craft](https://baicheramy.com/craft/) | Category controls, image-led shots, dates, and incremental loading |
| [Shot detail](https://baicheramy.com/shot/chat-support/) | Large image, title, date, description, related shots, and return link |

The desktop presentation uses a narrow centered column, light surfaces, rounded containers, fine separators, and a compact floating dock. Project galleries expose arrows and pagination; settings includes theme and language controls. Scroll reveals were visible. These observations establish the reference; implementation choices and original Yogesh-specific copy follow below.

## Complete Section Mapping

Keep all main reference sections. Blog and detailed problem-solving case studies extend the reference to meet the earlier portfolio requirements.

| Order | Section | Yogesh's version |
|-------|---------|-----------------|
| 1 | Utility header | Current page/breadcrumb, Contact, CV |
| 2 | Profile hero | Original cover treatment, Yogesh's portrait, name, Product Designer role, Nepal-based introduction, work/CV links |
| 3 | My Work | Selected product case studies and client/website projects |
| 4 | Experience | Verified role history and expandable contribution summaries |
| 5 | What I Do Best | Four product-design strengths, using the original copy below |
| 6 | About Me | Short biography and three working principles |
| 7 | Craft | Interface details, website explorations, and small design studies |
| 8 | Writing | Latest Markdown articles; an addition for Yogesh |
| 9 | Footer | Nepal location, real contact/social links, copyright |
| Persistent | Navigation and settings | Home, Work, About, Craft, Blog, Contact, Settings |

### 1. Utility Header

Use compact navigation with a Home/breadcrumb destination and secondary contact/CV actions. Keep these less prominent than the profile content. Use Yogesh's supplied email and actual resume file. Until supplied, omit unavailable actions from production rather than linking to a placeholder or to the reference owner's files.

### 2. Profile Hero

Create an original restrained cover using CSS/SVG dots and small highlights. Use Yogesh's own portrait or a neutral initials placeholder in preview. Do not reuse the reference portrait, project artwork, personal details, or source assets.

**Name:** Yogesh Raya\
**Role:** Product Designer\
**Introduction:** I’m Yogesh, a product designer based in Nepal. I turn user problems into clear flows and thoughtful interfaces for digital products.\
**Actions:** View Work / Download CV\
**Email control:** Copy Email; optional keyboard shortcut M.

The reference's expanded-name interaction can be adapted to show a supplied Nepali spelling on click. Do not invent that spelling. If no alternate name is supplied, keep the name static and preserve the profile composition.

### 3. My Work

Present selected work as generous, image-first entries. Each entry needs a name, short problem or brief, role/contribution, category, and a clear destination. Use **Read Case Study** for a detailed problem-solving story and **View Project** for a concise showcase.

Gallery implementation requirements:

- Use approved project screenshots. Keep a stable image area while slides change.
- Support previous/next controls, a current-slide indicator, and horizontal swipe/drag.
- Keep gallery buttons outside the project link; do not nest buttons inside an anchor.
- Swiping must not open the project accidentally. Single-image entries omit gallery controls.
- Give keyboard users the same access as pointer users. Name every control and announce slide position.
- Show private/concept/shipped status only when accurate. No copied awards or fabricated results.

Prioritize case-study candidates with enough evidence to explain decisions. Client website work can be a concise showcase without an invented research story. The broader project evidence notes later in this file remain applicable.

### 4. Experience

Use expandable entries with organization, role, dates where verified, and a short contribution summary. A toggle opens the detail region and changes its chevron state. Implement a real button with `aria-expanded` and `aria-controls`.

Known owner-provided starting point: **Bytecare Technology · Product Designer**. Exact dates and other roles remain subject to the evidence notes below. Do not pad the timeline with invented positions merely to match the reference's entry count.

### 5. What I Do Best

Use four numbered entries. These are new draft statements for Yogesh:

**01 · Find the real problem**\
I start with what people need to do, where they get stuck, and the constraints behind the product.

**02 · Make the next step clear**\
I turn complex tasks into flows that help people understand what to do and what happens next.

**03 · Design beyond the happy path**\
I consider empty states, errors, permissions, and recovery alongside the main journey.

**04 · Connect decisions to delivery**\
I explain the reasoning behind the design and work through details with the people building it.

Details may expand on hover for pointer devices, but must also open through focus or tap. Make the controls discoverable on touch devices.

### 6. About Me

**Copy:** I care about the decisions behind the screen: what people need to do, where they get stuck, and how a design can help them move forward. My work focuses on understanding the problem, exploring practical solutions, and making the next step clear.

**Working principles:**

- Start with the user's task and the product's constraints.
- Explain decisions with evidence and clear reasoning.
- Keep improving after the first version ships.

**Action:** More About Me, linking to the full biography page.

### 7. Craft

Use this section for smaller design pieces rather than repeating full case studies. Keep names, dates if known, and short descriptions attached to the images. Potential subjects include onboarding states, dashboard components, search empty states, and responsive website sections, using only work the owner can share.

Use category labels such as **All**, **Product UI**, **Website Design**, and **Components**. Do not include a Framer category. Derive counts from real content and show only categories with entries. A gallery detail page provides context and related work.

### 8. Writing

Keep the static Markdown blog. Show the latest published posts with title, description, and date, followed by **All Articles**. Match the surrounding visual rhythm without turning this into another carousel.

Use the existing `.md` pipeline when available. Otherwise add minimal build-time Markdown parsing and static article generation. Drafts must be excluded from routes, lists, and sitemap. The existing feedback article remains `draft: true` until reviewed.

### 9. Footer

**Location:** Based in Nepal.\
**Copyright:** © [current year] Yogesh Raya.\
**Links:** Email and the verified LinkedIn profile; add other profiles only when supplied.

The reference includes a visitor count. Keep a provision for it, but render it only when backed by a real site-wide measurement. A local browser counter or invented number must not be presented as total visitors. A static portfolio does not need a backend solely for this decoration.

## Dedicated Pages

### Work Collection and Case Studies

The Work collection contains all approved product and website projects. Use the same data for featured previews and the collection. Allow a separate case-study detail template with overview, problem, evidence, constraints, decisions, solution, outcome, and learnings. Concise showcase pages explain the brief, contribution, and design rationale.

Preserve existing published routes where practical. Names such as Work or Projects can map to existing destinations; exact URL imitation is unnecessary. Avoid duplicate detail pages with identical text.

### Full About Page

Include every major content area from the reference, adapted to Yogesh:

1. **Biography:** Expand the About summary using verified career context.
2. **Personal cards:** Local time in Nepal (`Asia/Kathmandu`), current focus, languages, reading/interests, and current activity. Only English and Nepali are established here; do not assign fluency levels without confirmation. Book, game, music, and energy/fuel details are unknown. Keep those fields editable and show an honest “Not shared yet” state if retained; do not borrow the reference owner's preferences.
3. **Strengths:** Reuse the four entries above from a single content source.
4. **Tools:** Figma, Mixpanel, Microsoft Clarity, and Google Analytics, based on owner-provided context. Keep the tool list focused on product-design work.
5. **Design philosophy:** “I want people to spend less effort understanding the interface and more time doing what they came to do. Clear flows, useful feedback, and thoughtful details matter because they help people move forward.”
6. **Contact:** “Have a product problem worth solving? Let’s talk.” Include a real contact action and CV link when available.

Render the local-time widget on the client with a stable placeholder to avoid hydration mismatches. Update it without announcing every tick to screen readers. Keep personal widgets lightweight and secondary to the biography.

### Craft Collection and Detail

Include category filtering, real content counts, and a Load More control only when additional entries exist. Preserve readable titles and accessible card links. Each detail includes large artwork, title, date when known, short context, related entries, and Back to Craft. Use proper detail URLs so the content remains linkable.

### Blog Index and Article

Keep the Markdown requirements and editorial direction below. Use readable article typography, author/date metadata, contextual internal links, and Back to Blog. Add a Blog destination to the dock without making mobile navigation overflow.

## Visual Implementation Targets

These are proposed starting values, not measured source tokens:

- Content width: approximately 740px; 20px side padding on small screens.
- Main desktop section spacing: 56–80px; mobile: 40–56px.
- Inter as the main typeface; 16px body text with approximately 1.6 line height.
- Name: 36–44px desktop; 30–36px mobile. Section headings: 28–36px.
- Neutral page and card surfaces; soft 18–24px container radii; fine dividers.
- Support System, Light, and Dark themes. Follow the system by default and retain a user's explicit choice. Keep contrast readable in each theme.
- Main project entries stack vertically. Craft may use two columns when space permits and one on narrow screens.
- Dock sits above the bottom safe area. Reserve enough page-bottom space that it never covers content or focus targets. Show active state and accessible labels; use an overflow menu on narrow screens if needed.
- Settings appears anchored above the dock, closes on Escape/outside click, and returns focus to its trigger. Theme choices are functional. Offer English; show Nepali as unavailable until actual translated content exists. Do not include the reference's Arabic/French choices.
- Match desktop proportions first, then adapt responsively. Mobile behavior here is a proposed adaptation and still needs visual verification.

## Motion for React

Use the free `motion` package and imports from `motion/react`. Do not require Motion+ components or add GSAP. Keep motion components in small client-side wrappers while content remains statically rendered.

```bash
npm install motion
```

```tsx
"use client";

import { MotionConfig } from "motion/react";

export function PortfolioMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

### Animation Plan

All values are proposed tuning targets:

| Interaction | Behavior | Motion mechanism |
|-------------|----------|------------------|
| Hero entrance | Small upward settle, 0.4s, short stagger; keep identity text immediately readable | `motion` with `initial` / `animate` |
| Section entrance | Subtle 10px settle, once per section, about 0.35s | `whileInView` with `viewport={{ once: true }}` |
| Card feedback | Up to 3px lift; 0.99 pressed scale | `whileHover` / `whileTap` |
| Gallery | Bounded horizontal movement with deliberate snapping | `drag="x"`, constraints, motion values, controlled slide index |
| Experience / strengths | Smooth expansion and opacity; surrounding content shifts naturally | `AnimatePresence`, height animation, `layout` where appropriate |
| Navigation | Active background transitions between items | Shared `layoutId` scoped to dock |
| Settings / toast | Short fade and up to 6px shift | `AnimatePresence` with stable keys |
| Craft filtering | Items settle into new positions | `layout` plus keyed presence transitions |
| Decorative cover | Optional slow highlights, subtle and pauseable | Small isolated Motion elements |

Use a restrained spring starting around stiffness 280 and damping 30 for interactive movement. Tune by feel and actual performance. These values are not an extraction from the reference.

### Interaction and Accessibility Rules

- Respect `prefers-reduced-motion` through `MotionConfig` and `useReducedMotion`. Disable decorative loops, parallax, and large transforms; use instant changes or short fades.
- Keep primary text visible in server HTML. Do not ship entire sections with permanent `opacity: 0` if JavaScript or observers fail. Animate nonessential wrappers/decorations or use progressive enhancement.
- Swipe needs an equivalent arrow/button action. Use `touch-action: pan-y` for horizontal galleries so vertical scrolling still works. Suppress click navigation after a drag threshold.
- Set a brief copy-confirmation toast only after the clipboard write succeeds. Provide a mail link/manual fallback on failure. Ignore the M shortcut while typing in inputs, textareas, or editable content, and when modifier keys are pressed.
- Hover effects must not be the only way to discover content. All interactive elements need visible focus states and comfortable touch targets.
- Do not animate reading text character by character, force scroll positions, hijack scrolling, autoplay project galleries, or block route navigation while an animation finishes.
- Use stable item keys and test the actual Next.js route lifecycle before adding exit transitions. Do not promise cross-route shared-element behavior merely by wrapping the app in `AnimatePresence`.
- Optional cursor labels are decorative enhancements on fine pointers only. Keep the native cursor and ordinary links usable; disable on touch and reduced-motion devices.

Motion references: [Getting started](https://motion.dev/docs/react), [drag](https://motion.dev/docs/react-drag), [layout animation](https://motion.dev/docs/react-layout-animations), and [accessibility](https://motion.dev/docs/react-accessibility).

## Positioning and Portfolio Content

### Primary Identity

**Yogesh Raya | Product Designer**

Focus the portfolio on product design, UX problem solving, clear user flows, thoughtful interface design, and collaboration. Client projects and website design belong in Work as evidence of design craft.

Exclude Framer developer positioning, agency partnerships, white-label services, tool-led service pitches, five-day delivery promises, and design-plus-code sales messaging from all public copy, metadata, structured data, and blog topics. Do not copy the current LinkedIn headline as the portfolio headline.

### Portfolio Copy

**Name / role:** Yogesh Raya · Product Designer

**Hero H1:** Yogesh Raya

**Role:** Product Designer

**Supporting headline for About:** Making complex tasks feel simple.

**Introduction:** I’m Yogesh, a product designer based in Nepal. I turn user problems into clear flows and thoughtful interfaces for digital products.

**About Me:** I care about the decisions behind the screen: what people need to do, where they get stuck, and how a design can help them move forward. My work focuses on understanding the problem, exploring practical solutions, and making the next step clear.

**Primary hero action:** View Work

**Secondary hero action:** Download CV, when an actual CV file is supplied

**Case Studies introduction:** The problems, decisions, and trade-offs behind my product design work.

**Work introduction:** Selected client projects and website designs, with a focus on clarity, usability, and visual craft.

**Experience introduction:** Where I’ve contributed and the product challenges I’ve worked on.

**Blog introduction:** My thoughts on product design, useful feedback, and solving the right problems.

**Contact:** Have a product problem worth solving? Let’s talk.

Use the owner's real email when provided. Do not invent a contact address.

### Experience and Project Content: Evidence Rules

The full LinkedIn profile could not be opened during this review. Publicly indexed profile text describes user-friendly design and understanding user needs; public posts support clear interfaces and problem-focused design feedback. This is a partial review, not verification of the complete employment history.

Previously supplied owner context identifies **Product Designer at Bytecare Technology** and design work involving Briz, Karobar, TrackOn GPS, Solid GPS, and Internsathi. Treat these as owner-provided content candidates, not newly verified LinkedIn facts. Confirm exact employment dates, current status, individual contributions, publication permission, and project assets before publishing detailed entries. Do not infer employment at every product named.

Suggested content preparation:

| Candidate | Placement | What to document before publishing |
|-----------|-----------|------------------------------------|
| Briz | Product case study | One defined flow, the user problem, constraints, decisions, and evidence of the result |
| Karobar | Product case study or Work | Your contribution, the specific task addressed, and approved screens |
| TrackOn GPS / Solid GPS | Case study or Work, according to available evidence | Product interface versus website scope, ownership, and outcomes |
| Internsathi | Product case study or Work | The task or workflow you designed and its intended audience |
| Property management dashboard | Work | Publicly shared UI work; confirm concept/client status and ownership before labeling |
| Client website projects | Work | Client-approved project name, brief, your contribution, responsive screens, and live URL if available |

These are editorial candidates, not automatically generated case studies. Do not add incomplete entries or overwrite verified existing project content with speculative replacements. Keep unverified numbers and dates out of public copy.

### LinkedIn Review Notes and Sources

Reviewed on 2026-09-23. These notes are for the owner and implementer, not a section to render on the public portfolio.

- [Profile supplied by the owner](https://www.linkedin.com/in/yogeshraya01/): direct access blocked; only limited indexed text was available.
- [Property management dashboard post](https://www.linkedin.com/posts/yogeshraya01_ui-design-for-property-management-dashboard-activity-7322579093697273857-_yNi): publicly accessible post presenting UI work around clarity and easier property tasks.
- [Public LinkedIn page showing Yogesh's design-feedback post](https://www.linkedin.com/posts/prachi-ponda_ux-productdesign-designthinking-activity-7453365815736860672-fyDL): Yogesh's text appears in the “More Relevant Posts” section. It emphasizes giving designers the problem and feedback about what is failing. This is an indirect source for his post, not its original permalink. Do not attribute the host author's text or the reshared speaker's wording to Yogesh.

## SEO Plan

Write for relevant discovery and useful reading. SEO cannot guarantee indexing, quick rankings, or first-page placement. Treat the phrases below as editorial targets, not validated keyword-volume or difficulty research.

### Search Intent and Page Titles

| Page | Intended search theme | Draft title |
|------|-----------------------|-------------|
| Home | Yogesh Raya; product designer in Nepal; product design portfolio | Yogesh Raya &#124; Product Designer in Nepal |
| Case study | The actual product, task, and UX problem | [Project]: [Specific UX Problem] &#124; Yogesh Raya |
| Work index | Yogesh Raya design work; website design portfolio | Product & Website Design Work &#124; Yogesh Raya |
| Work detail | Project name and design scope | [Project] [Design Scope] &#124; Yogesh Raya |
| Blog index | Yogesh Raya product design writing | Product Design & UX Thoughts &#124; Yogesh Raya |
| Article | One specific reader question | [Specific Article Title] &#124; Yogesh Raya |

**Home meta description:** Explore Yogesh Raya’s product design portfolio: UX case studies, client projects, website designs, and practical thoughts on solving user problems.

Use natural language and concrete page topics. Do not add repeated location pages, “best designer” claims, keyword lists, or unsupported expertise labels.

### Content and Discovery

- Publish useful case studies with reasoning, original project visuals, and clear ownership. Explain decisions in HTML text rather than only inside screenshots.
- Link each showcase to its related case study and relevant articles using descriptive link text. Add links only when the destination exists and helps the reader.
- Credit Yogesh visibly as the blog author and link the byline to the About Me section. Cite external evidence; distinguish opinions from measured findings.
- Turn LinkedIn ideas into deeper articles with an example, trade-off, and practical takeaway. Do not mass-produce generic posts to fill a schedule.

### SEO Implementation

- Keep product design, UX problem solving, and Yogesh Raya consistent across headings, metadata, and article authorship.
- Generate unique titles, descriptions, social preview metadata, and canonical URLs for public pages. Preserve established URLs where possible; if a published route changes, add a permanent redirect.
- Keep important text in generated HTML and navigation as real links. Animation must not delay access to the content or leave it hidden when JavaScript fails.
- Include published pages in the sitemap; exclude drafts and prevent preview indexing. Unknown slugs return a proper not-found response.
- Use meaningful image alt text, compressed images, explicit image dimensions, and article author/date fields. Keep any structured-data values consistent with visible content.
- Use the existing SEO implementation where it works. Verify indexing and search performance through Search Console after deployment; a visual rebuild does not guarantee ranking improvements.

SEO sources: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [article structured data](https://developers.google.com/search/docs/appearance/structured-data/article), and [Next.js metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

## Blog Editorial Direction

Write in first person, with short paragraphs, clear examples, and a practical point of view. Use product design as the main topic. A website design article fits when it explains user intent, navigation, or a specific design decision.

### Starting Topics

| Article idea | Reader question | Source status |
|--------------|-----------------|---------------|
| How to Give Product Design Feedback That Helps | How do I give a designer useful feedback? | First draft supplied; expands the theme in Yogesh's publicly surfaced feedback post |
| What Should a Property Management Dashboard Show First? | How should dashboard information be prioritized? | Inspired by the public dashboard post; project-specific reasoning needs owner input |
| How I Decide What Belongs in an Onboarding Flow | Which steps should be required now versus later? | Proposed topic; add a real example and decisions before drafting as a personal account |
| Designing Search When Nothing Matches | What should an empty search result help someone do next? | Proposed topic; add an approved product example |

### LinkedIn-to-Blog Workflow

1. Save the original post URL and text when available. Treat comments, repost commentary, and original posts separately.
2. Identify one reader question and the opinion you want to explain.
3. Add new reasoning, an example, alternatives, and a useful takeaway. Label hypothetical examples clearly.
4. Add relevant screenshots only when they illustrate the point and can be shared.
5. Save as `.md` with metadata. Review personal claims, sources, and examples; keep `draft: true` until ready.
6. Keep the article unpublished until reviewed. Use the existing publishing workflow when ready. This brief does not instruct the implementer to publish a new article automatically.

The companion `better-product-design-feedback.md` is a new editorial draft inspired by the accessible feedback theme. Its brief template, onboarding example, feedback examples, and checklist are newly written expansions, not a transcript or verified account of client work. Replace its draft date with the actual publication date when publishing.

## Acceptance Checklist

- Every reference content area is mapped to an implemented section/page or a documented content-dependent state.
- Work, Experience, strengths, About, Craft, navigation, settings, and footer follow the new direction; Writing remains as the requested addition.
- Public content identifies Yogesh as a Product Designer without Framer/agency service positioning.
- Project images, personal details, resume, contact information, and outcomes belong to Yogesh and are accurate.
- Motion for React powers the specified interactions; reduced motion, keyboard use, touch galleries, and clipboard failure are handled.
- No copied visitor totals, awards, foreign-language biographies, client logos, or fabricated employment entries appear.
- Desktop and mobile views are visually reviewed, including dock overlap, expanded content, gallery controls, light/dark themes, and long titles.
- Markdown drafts stay unpublished. Metadata, internal links, published routes, and sitemap remain correct.
- Existing project code is reused where practical. Any published URL changes receive redirects.

## Appendix: Superseded Linear Visual Reference

Retained for history only. The new baicheramy.com reference takes priority over these old colors, sizes, radii, component rules, layout prompts, and CSS examples. Do not combine the old acid-lime marketing treatment with the new reference direction by default.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#08090a` | `--color-void` | Page canvas, full-bleed backgrounds — the default everything sits on |
| Carbon | `#0f1011` | `--color-carbon` | Card surfaces, nav bars — one step above canvas for contained content |
| Obsidian | `#161718` | `--color-obsidian` | Elevated surfaces, deeper card panels |
| Graphite | `#23252a` | `--color-graphite` | Subtle borders, dividers, ghost button outlines — low-contrast structural edges |
| Smoke | `#383b3f` | `--color-smoke` | Hairline borders at higher contrast than graphite — section separators |
| Ash | `#62666d` | `--color-ash` | Muted body text, inactive icons, secondary metadata |
| Fog | `#8a8f98` | `--color-fog` | Tertiary text, placeholder copy, icon fills |
| Mist | `#d0d6e0` | `--color-mist` | Secondary headings, button text on dark surfaces |
| Bone | `#e5e5e6` | `--color-bone` | Near-white surface fills, high-contrast button text |
| Paper | `#ffffff` | `--color-paper` | Primary headings, hero type, max-contrast emphasis text |
| Acid Lime | `#e4f222` | `--color-acid-lime` | Primary action buttons, active nav indicators — electric accent that breaks the monochrome system |
| Pulse Green | `#27a644` | `--color-pulse-green` | Green outline accent for tags, dividers, and focused UI edges. Use as a supporting accent, not as a status color |
| Coral Red | `#eb5757` | `--color-coral-red` | Red wash for highlight backgrounds, decorative bands, and soft emphasis behind content. Use as a supporting accent, not as a status color |
| Signal Teal | `#02b8cc` | `--color-signal-teal` | Decorative accent, informational icon fills |
| Iris Violet | `#6366f1` | `--color-iris-violet` | Tag/badge fills — soft chromatic punctuation on tags and labels |
| Lavender | `#8b5cf6` | `--color-lavender` | Secondary tag fills, category indicators |

## Tokens — Typography

### Inter Variable — Primary UI and heading typeface — used across nav, body, headings, buttons, cards · `--font-inter-variable`
- **Substitute:** Inter (variable), or system-ui as fallback
- **Weights:** 300, 400, 510, 590
- **Sizes:** 10, 11, 12, 13, 14, 15, 16, 17, 20, 24, 32, 48, 64, 72
- **Line height:** 1.0–2.75
- **Letter spacing:** -0.022em at 48–72px, -0.012em at 20–32px, -0.011em at 15px, -0.010em at 13–16px
- **OpenType features:** `"cv01" on, "ss03" on, "zero" on`
- **Role:** Primary UI and heading typeface — used across nav, body, headings, buttons, cards

### Berkeley Mono — Code-adjacent UI text — issue IDs (ENG-2703), keyboard shortcuts, monospaced metadata · `--font-berkeley-mono`
- **Substitute:** JetBrains Mono, IBM Plex Mono, or ui-monospace
- **Weights:** 400
- **Sizes:** 12, 14
- **Line height:** 1.40–1.71
- **Letter spacing:** -0.013em
- **OpenType features:** `"cv01" on, "ss03" on`
- **Role:** Code-adjacent UI text — issue IDs (ENG-2703), keyboard shortcuts, monospaced metadata

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | — | — | 13px | 1.2 | — | `--text-caption` |
| body-sm | — | — | 15px | 1.6 | -0.165px | `--text-body-sm` |
| body-lg | — | — | 20px | 1.33 | -0.24px | `--text-body-lg` |
| subheading | — | — | 24px | 1.33 | -0.288px | `--text-subheading` |
| heading-sm | — | — | 32px | 1.13 | -0.704px | `--text-heading-sm` |
| heading | — | — | 48px | 1 | -1.056px | `--text-heading` |
| heading-lg | — | — | 64px | 1 | -1.408px | `--text-heading-lg` |
| display | — | — | 72px | 1 | -1.584px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 56 | 56px | `--spacing-56` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 12px |
| pills | 9999px |
| small | 2px |
| badges | 4px |
| inputs | 6px |
| buttons | 6px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| sm | `rgba(0, 0, 0, 0.4) 0px 2px 4px 0px` | `--shadow-sm` |
| md | `rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset` | `--shadow-md` |
| subtle | `rgb(35, 37, 42) 0px 0px 0px 1px inset` | `--shadow-subtle` |
| subtle-2 | `rgba(0, 0, 0, 0.2) 0px 0px 0px 1px` | `--shadow-subtle-2` |
| subtle-3 | `rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) ...` | `--shadow-subtle-3` |
| xl | `rgba(8, 9, 10, 0.6) 0px 4px 32px 0px` | `--shadow-xl` |
| subtle-4 | `rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(255...` | `--shadow-subtle-4` |
| subtle-5 | `rgba(0, 0, 0, 0.1) 0px 0px 0px 2px` | `--shadow-subtle-5` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 8px

## Components

### Primary Action Button (Acid Lime)
**Role:** High-emphasis CTA — the one chromatic button in the system

Background #e4f222, text #08090a, border-radius 6px, padding 10px 16px, Inter 14px / weight 510, letter-spacing -0.011em. Sits as the sole filled chromatic element — every other button on the site is neutral.

### Nav Text Button
**Role:** Top navigation items

Transparent background, text #d0d6e0, padding 8px 12px, Inter 13px / weight 400. No border, no fill — pure typographic nav with underline on hover.

### Pill Button
**Role:** Tag chips, status pills, compact action triggers

Background rgba(255,255,255,0.05), text #d0d6e0, border-radius 9999px, padding 4px 12px, Inter 12–13px / weight 400.

### Ghost / Outline Button
**Role:** Secondary actions, less prominent CTAs

Transparent background, border 1px #23252a, text #d0d6e0, border-radius 6px, padding 8px 12px, Inter 13px / weight 400.

### Sign-up Button (Rounded Pill, Neutral)
**Role:** High-emphasis nav CTA

Background #ffffff, text #08090a, border-radius 9999px, padding 8px 16px, Inter 13px / weight 510. White pill against the dark nav bar — the second highest-contrast element after the acid-lime CTA.

### Card (Product Screenshot Frame)
**Role:** Large showcase surface for product UI screenshots

Background #0f1011, border-radius 12px, inset shadow rgb(35,37,42) 0 0 0 1px, padding 24px. Hairline inner border defines the card edge — no outer shadow, no glow.

### Card (Subtle)
**Role:** Small content cards, nested panels

Background rgba(255,255,255,0.02), border-radius 6px, shadow rgba(0,0,0,0.4) 0 2px 4px, padding 8px. Almost invisible — the card barely separates from the canvas.

### Text Input
**Role:** Form fields, search inputs

Background rgba(255,255,255,0.02), border 1px rgba(255,255,255,0.08), text #d0d6e0, border-radius 6px, padding 12px 14px, Inter 14px / weight 400. Focus ring: border brightens to #d0d6e0.

### Badge / Status Tag
**Role:** Issue status, category labels, inline metadata

Background rgba(255,255,255,0.05), text #8a8f98, border-radius 4px, padding 0px 6px, Inter 12px / weight 400. Color-coded variants use Pulse Green, Coral Red, Iris Violet, or Lavender fills.

### Logo Mark
**Role:** Brand identification in nav

Linear wordmark + geometric glyph, Inter 16px / weight 510, color #ffffff. Glyph rendered as inline SVG in white.

### Logo Bar (Customer Strip)
**Role:** Social proof — customer logos in a horizontal row

Neutral grey logos (Vercel, Cursor, Oscar, OpenAI, Coinbase, Cash App, Boom, Ramp) at #8a8f98–#d0d6e0, evenly spaced with 48–64px gaps, no card backgrounds.

### Hero Gradient Floor
**Role:** Atmospheric base under the product screenshot

Linear gradient from rgb(8,9,10) at 10% to rgb(208,214,224) at 100% — a subtle light wash that grounds the floating product UI against the void.

## Do's and Don'ts

### Do
- Use Inter Variable with font-feature-settings 'cv01' on, 'ss03' on, 'zero' on — these alternate glyphs define Linear's typographic identity
- Use #e4f222 exclusively for the single primary action per view — never for decoration, never for secondary buttons
- Set body text at 16px Inter weight 400 with line-height 1.5 — larger reading sizes (17px+ at weight 590) are reserved for body emphasis blocks
- Use letter-spacing -0.022em at 48px and above — tight tracking is non-negotiable for display type
- Set card radius to 12px, button radius to 6px, pill radius to 9999px — three radii is the entire radius vocabulary
- Use 0.5px hairline borders (#23252a or #383b3f) instead of shadows for surface separation — Linear's elevation comes from borders and subtle inner shadows
- Keep section gaps at 96px and element gaps at 8px — the 8/12/24/96 spacing ladder is the rhythm

### Don't
- Do not use bold weights (700+) — Linear's type scale caps at weight 590, the system deliberately avoids heavy display weights
- Do not use decorative gradients on buttons, cards, or text — gradients are reserved for the hero atmospheric floor only
- Do not introduce additional chromatic accent colors as actions — the acid-lime button is the only chromatic UI element
- Do not use large radii (16px+) on cards or panels — 12px is the max card radius in this system
- Do not use shadows to separate cards from the canvas — use hairline borders (#23252a) and inner inset shadows instead
- Do not use chromatic text colors for body copy — all body text sits in the #d0d6e0 / #8a8f98 / #62666d grey scale
- Do not use Berkeley Mono for headings or marketing copy — it is reserved for issue IDs, keyboard shortcuts, and technical metadata

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#08090a` | Page canvas — the default full-bleed background |
| 1 | Carbon | `#0f1011` | Card surfaces, product screenshot frames, nav containers |
| 2 | Obsidian | `#161718` | Elevated panels, deeper nested surfaces |
| 3 | Slate | `#23252a` | Interactive surface tint, ghost button fills, border-adjacent backgrounds |

## Elevation

Elevation in Linear's system is achieved almost entirely through hairline borders (0.5px #23252a or 1px inset #23252a) and subtle dark drop shadows (rgba(0,0,0,0.4) 0 2px 4px) rather than layered shadow stacks. The visual hierarchy comes from the surface-level progression (#08090a → #0f1011 → #161718 → #23252a) and border definition, not from ambient shadow. The acid-lime CTA button uses an inset shadow stack (0px 5px 2px / 0px 3px 2px / 0px 1px 1px) — the only place in the system where a real shadow is applied to a chrome element.

## Imagery

Linear's visual language is product-screenshot-first: the hero and section illustrations are real Linear app UI captured at full fidelity — issue cards, kanban boards, AI agent panels, command palettes — placed inside framed card containers with hairline borders. No stock photography, no lifestyle imagery, no abstract illustration. Logos appear as a customer strip in neutral grey (#8a8f98) at uniform size. Icons are minimal line-art SVGs in single-color grey scale. The hero screenshot floats on a subtle linear gradient (dark-to-light) that creates atmospheric depth without literal scenery. Every visual element is a functional artifact of the product itself.

## Layout

Layout is max-width contained at ~1200px, centered, with full-bleed dark backgrounds extending to viewport edges. The hero is a left-aligned oversized headline (64–72px) paired with a right-aligned link CTA, followed by a large product screenshot that bleeds beyond the max-width slightly. Section rhythm alternates between text-left/image-right 2-column compositions and full-width product showcase bands, separated by 96px vertical gaps. The customer logo strip is a single horizontal row. The page never uses 3-column card grids or masonry — information density stays low, with most sections using generous whitespace and a single focal point per screen. Navigation is a fixed top bar with left-aligned logo and right-aligned links, no sidebar, no mega-menu.

## Agent Prompt Guide

**Quick Color Reference:**
- text (primary heading): #ffffff
- text (body): #d0d6e0
- text (muted): #8a8f98
- background (canvas): #08090a
- background (card): #0f1011
- border (hairline): #23252a
- accent (CTA): #e4f222
- primary action: #e4f222 (filled action)

**3-5 Example Component Prompts:**

1. **Hero headline block:** Full-bleed #08090a canvas. Headline at 64px Inter Variable weight 510, color #ffffff, letter-spacing -0.022em, line-height 1.0. Subtext at 16px Inter weight 400, color #8a8f98. No button — secondary link text in #d0d6e0 with arrow glyph.

2. **Product screenshot card:** Background #0f1011, border-radius 12px, inset border 1px #23252a via box-shadow, padding 24px. Contains a simulated app UI at full opacity over the card surface. No outer drop shadow.

3. **Acid-lime primary action button:** Background #e4f222, text #08090a, border-radius 6px, padding 10px 16px, Inter 14px weight 510, letter-spacing -0.011em. Only one per view.

4. **Nav top bar:** Background #08090a (transparent over canvas), padding 16px horizontal, max-width 1200px centered. Logo wordmark #ffffff at 16px weight 510 left-aligned. Nav links #d0d6e0 at 13px weight 400, 8px gaps. Right-aligned white pill sign-up button: bg #ffffff, text #08090a, border-radius 9999px, padding 8px 16px.

5. **Status badge row:** Horizontal flex, 8px gap. Each badge: background rgba(255,255,255,0.05), text #8a8f98, border-radius 4px, padding 0px 6px, Inter 12px weight 400. Color-coded variants: #27a644 for success, #eb5757 for error, #6366f1 for tags.

## Type Scale Detail

Display: 72px / 510 / lh 1.0 / ls -0.022em
Hero: 64px / 510 / lh 1.0 / ls -0.022em
Section heading: 48px / 510 / lh 1.0 / ls -0.022em
Subheading: 32px / 400 / lh 1.13 / ls -0.022em
Heading: 24px / 400 / lh 1.33 / ls -0.012em
Body emphasis: 20px / 590 / lh 1.33 / ls -0.012em
Body large: 17px / 590 / lh 1.6 / ls default
Body: 16px / 400 / lh 1.5 / ls default
Body small: 15px / 400 / lh 1.6 / ls -0.011em
Caption: 13px / 400 / lh 1.2 / ls default
Label: 12px / 400 / lh 1.4 / ls default
Micro: 10px / 510 / lh 1.5 / ls default

## Similar Brands

- **Vercel** — Same dark-canvas-first approach with hairline borders, tight Inter typography, and product-screenshot-as-hero layout — both treat the product UI as the visual content rather than illustration
- **Cursor** — Identical midnight dark mode with acid-lime accent CTA, compact Inter type at 400–510 weights, and product-screenshot showcase cards at 12px radius
- **Raycast** — Shared dark precision-instrument aesthetic — compact spacing, 6px button radius, monochromatic chrome with a single functional accent color for active states

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-void: #08090a;
  --color-carbon: #0f1011;
  --color-obsidian: #161718;
  --color-graphite: #23252a;
  --color-smoke: #383b3f;
  --color-ash: #62666d;
  --color-fog: #8a8f98;
  --color-mist: #d0d6e0;
  --color-bone: #e5e5e6;
  --color-paper: #ffffff;
  --color-acid-lime: #e4f222;
  --color-pulse-green: #27a644;
  --color-coral-red: #eb5757;
  --color-signal-teal: #02b8cc;
  --color-iris-violet: #6366f1;
  --color-lavender: #8b5cf6;

  /* Typography — Font Families */
  --font-inter-variable: 'Inter Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-berkeley-mono: 'Berkeley Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.2;
  --text-body-sm: 15px;
  --leading-body-sm: 1.6;
  --tracking-body-sm: -0.165px;
  --text-body-lg: 20px;
  --leading-body-lg: 1.33;
  --tracking-body-lg: -0.24px;
  --text-subheading: 24px;
  --leading-subheading: 1.33;
  --tracking-subheading: -0.288px;
  --text-heading-sm: 32px;
  --leading-heading-sm: 1.13;
  --tracking-heading-sm: -0.704px;
  --text-heading: 48px;
  --leading-heading: 1;
  --tracking-heading: -1.056px;
  --text-heading-lg: 64px;
  --leading-heading-lg: 1;
  --tracking-heading-lg: -1.408px;
  --text-display: 72px;
  --leading-display: 1;
  --tracking-display: -1.584px;

  /* Typography — Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-w510: 510;
  --font-weight-w590: 590;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-128: 128px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 96px;
  --card-padding: 24px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-2xl-2: 22px;
  --radius-full: 400px;
  --radius-full-2: 9999px;

  /* Named Radii */
  --radius-cards: 12px;
  --radius-pills: 9999px;
  --radius-small: 2px;
  --radius-badges: 4px;
  --radius-inputs: 6px;
  --radius-buttons: 6px;

  /* Shadows */
  --shadow-sm: rgba(0, 0, 0, 0.4) 0px 2px 4px 0px;
  --shadow-md: rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset;
  --shadow-subtle: rgb(35, 37, 42) 0px 0px 0px 1px inset;
  --shadow-subtle-2: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;
  --shadow-subtle-3: rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px;
  --shadow-xl: rgba(8, 9, 10, 0.6) 0px 4px 32px 0px;
  --shadow-subtle-4: rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.04) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
  --shadow-subtle-5: rgba(0, 0, 0, 0.1) 0px 0px 0px 2px;

  /* Surfaces */
  --surface-void: #08090a;
  --surface-carbon: #0f1011;
  --surface-obsidian: #161718;
  --surface-slate: #23252a;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-void: #08090a;
  --color-carbon: #0f1011;
  --color-obsidian: #161718;
  --color-graphite: #23252a;
  --color-smoke: #383b3f;
  --color-ash: #62666d;
  --color-fog: #8a8f98;
  --color-mist: #d0d6e0;
  --color-bone: #e5e5e6;
  --color-paper: #ffffff;
  --color-acid-lime: #e4f222;
  --color-pulse-green: #27a644;
  --color-coral-red: #eb5757;
  --color-signal-teal: #02b8cc;
  --color-iris-violet: #6366f1;
  --color-lavender: #8b5cf6;

  /* Typography */
  --font-inter-variable: 'Inter Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-berkeley-mono: 'Berkeley Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.2;
  --text-body-sm: 15px;
  --leading-body-sm: 1.6;
  --tracking-body-sm: -0.165px;
  --text-body-lg: 20px;
  --leading-body-lg: 1.33;
  --tracking-body-lg: -0.24px;
  --text-subheading: 24px;
  --leading-subheading: 1.33;
  --tracking-subheading: -0.288px;
  --text-heading-sm: 32px;
  --leading-heading-sm: 1.13;
  --tracking-heading-sm: -0.704px;
  --text-heading: 48px;
  --leading-heading: 1;
  --tracking-heading: -1.056px;
  --text-heading-lg: 64px;
  --leading-heading-lg: 1;
  --tracking-heading-lg: -1.408px;
  --text-display: 72px;
  --leading-display: 1;
  --tracking-display: -1.584px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-128: 128px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-2xl-2: 22px;
  --radius-full: 400px;
  --radius-full-2: 9999px;

  /* Shadows */
  --shadow-sm: rgba(0, 0, 0, 0.4) 0px 2px 4px 0px;
  --shadow-md: rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset;
  --shadow-subtle: rgb(35, 37, 42) 0px 0px 0px 1px inset;
  --shadow-subtle-2: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;
  --shadow-subtle-3: rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px;
  --shadow-xl: rgba(8, 9, 10, 0.6) 0px 4px 32px 0px;
  --shadow-subtle-4: rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.04) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
  --shadow-subtle-5: rgba(0, 0, 0, 0.1) 0px 0px 0px 2px;
}
```
