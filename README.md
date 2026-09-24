# Yogesh Raya — Product Design Portfolio

A narrow, responsive portfolio built with Next.js, React, TypeScript, Motion for React, and static Markdown. The home page follows the supplied [Figma frame](https://www.figma.com/design/WBxilPJIVmVdEMutum6eXp/Briz-Web?node-id=1351-6144), keeping Yogesh’s own content. Dark is the initial theme; saved Light/System choices still work. See [Figma implementation notes](docs/figma-implementation.md) for measurements, local assets, content differences, and the reference’s known low-contrast text.

## Development

```sh
npm install
npm run dev
npm run check
```

The app includes Home, Work and case studies, About, Craft and artwork details, and a Markdown Blog. Existing `/work/[slug]` and `/blog/[slug]` routes and home anchors are preserved.

## Content

- `content/site/`: typed profile, strengths, and verified experience records.
- `content/work/`: one Markdown file per project, with metadata and story together. The existing three public projects remain published; the previously unlisted story is an explicit draft.
- `content/blog/`: Markdown articles. The feedback article remains a draft.
- `content/craft/`: approved artwork can be added here; the collection is intentionally empty today.

All collections use `status: draft | published`. A single validated catalog supplies lists, details, home sections, metadata, static routes, and the sitemap. See [content authoring](docs/content-authoring.md) for required fields and examples.

```md
---
title: "Article title"
description: "A concise summary."
date: "2026-09-24"
status: "draft"
---

Article content.
```

## Deployment and discovery

Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin before a Vercel production build. Production builds fail if it is missing or invalid. Local and preview builds remain non-indexable. A configured origin can still provide canonical URLs in preview while those pages stay noindex.

Optional content is omitted or presented honestly: no invented email, resume link, portrait, visitor total, personal preferences, or Craft artwork. The initials avatar can be replaced through `aboutData.portrait`. A visitor counter should only be added when a real site-wide measurement source exists.

## Interactions and accessibility

- Dock with labeled destinations and active state; keyboard-accessible settings with focus return, Escape/outside dismissal, System/Light/Dark persistence, English and a Nepali availability label.
- Experience and strengths use buttons with expanded state and associated detail regions.
- Multi-image projects support bounded drag, buttons, announced slide position, stable image dimensions, and click suppression after a drag. Single images hide controls.
- Optional email control supports M, ignores editable fields and modified shortcuts, reports successful clipboard writes, and provides a mail fallback on failure.
- Motion respects reduced-motion preferences. Server-rendered primary text remains visible without JavaScript.

## Browser checks

```sh
npx playwright install chromium
npm run check
npm run test:figma
# Full portfolio regression suite:
npm run test:e2e
```

Checks cover desktop/mobile layouts, route navigation, light/dark contrast, theme persistence, settings focus, disclosures, draft/unknown-page 404s, readable server HTML, and dock clearance. Failure traces and browser reports go to ignored output folders.

See [architecture](docs/architecture.md), [the imported requirement brief](docs/portfolio-requirements.md), and [implementation notes](docs/implementation-notes.md) for structure, scope, and content-dependent states.
