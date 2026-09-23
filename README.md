# Linear Portfolio — Midnight Precision Instrument

A fast, content-first static personal portfolio engineered with Next.js 15, React 19, TypeScript, and Tailwind CSS v4, adhering strictly to Linear's midnight precision design system (`#08090a` dark substrate, `#0f1011` cards, `#23252a` hairline borders, and `#e4f222` electric accent).

## Four Core Sections

1. **About Me (`/#about`)**: Personal introduction, professional role, engineering philosophy/approach, "View Case Studies" button, and email contact link.
2. **Problem-Solving Case Studies (`/#case-studies`)**: Strongest projects with roles, problems, architecture diagrams, and links to full case studies.
3. **Experience (`/#experience`)**: Chronological work history with company, role, dates, concise responsibilities, and links to relevant case studies.
4. **Blog (`/#blog` & `/blog`)**: Latest published articles with dates, reading times, and a dedicated `/blog` archive.

## Static Markdown Blog Engine

Blog posts are authored as plain **`.md` files** in `content/blog/` with YAML frontmatter:

```markdown
---
title: "Designing clearer product flows"
description: "A practical approach to finding friction and making the next step obvious for users."
date: "2026-09-23"
draft: false
cover: "/images/blog/flow-diagram.svg"
coverAlt: "Step-by-step diagram showing simplification of branching user decisions"
---

## The problem
...
```

- **File Name = URL Slug**: `content/blog/designing-clearer-product-flows.md` maps directly to `/blog/designing-clearer-product-flows`.
- **Draft Support**: Posts with `draft: true` are excluded from builds, lists, and sitemaps.
- **Reading Time**: Calculated automatically during build time.
- **Rendering**: Parsed via `gray-matter` + `react-markdown` + `remark-gfm` with raw HTML disabled and a reading width of ~65–75 characters.

## Project Structure

```text
content/
├── blog/
│   ├── designing-clearer-product-flows.md
│   └── local-first-state-synchronization.md
└── case-studies/
    ├── sync-engine-crdt.md
    └── kernel-ai-workbench.md
public/
├── favicon.ico
└── images/
    ├── blog/
    └── case-studies/
src/
├── app/
│   ├── layout.tsx              # Root layout with Inter Variable font & sitemap
│   ├── page.tsx                # Homepage (About Me, Case Studies, Experience, Blog)
│   ├── sitemap.ts              # Dynamic sitemap for published content
│   ├── work/
│   │   ├── page.tsx            # Redirects to /#case-studies
│   │   └── [slug]/page.tsx     # Full 6-part problem-solving case study stories
│   └── blog/
│       ├── page.tsx            # Blog index (all published posts, newest first)
│       └── [slug]/page.tsx     # Article page (65-75ch width, Back to Blog)
├── components/
│   ├── ui/                     # Button, Card, Badge, Input, Logo
│   ├── sections/
│   │   ├── navbar.tsx          # Nav links to #about, #case-studies, #experience, /blog
│   │   ├── footer.tsx          # Small footer with email and social links
│   │   ├── about-section.tsx   # Text-led intro & approach
│   │   ├── case-studies-section.tsx # Case studies previews
│   │   ├── experience-section.tsx   # Chronological work history
│   │   └── latest-blog-section.tsx  # Latest articles with reading time
│   └── markdown-content.tsx    # Readable prose renderer with Linear styling
├── data/
│   ├── about.ts                # Personal intro, role, approach & contact details
│   ├── case-studies.ts         # Case study metadata (slug, title, role, problem, cover)
│   └── experience.ts           # Career history & deliverables
├── lib/
│   ├── content.ts              # Markdown parser, frontmatter validator & reader
│   └── utils.ts                # Class merging utility
└── styles/
    └── globals.css             # Tailwind v4 @theme, tokens, and CSS variables
```

## Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build & Test
```bash
npm run build
npm run start
```
