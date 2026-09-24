# Figma implementation — Briz-Web / 1351:6144

Visual source: [Figma frame](https://www.figma.com/design/WBxilPJIVmVdEMutum6eXp/Briz-Web?node-id=1351-6144).

The owner explicitly chose **“Keep Yogesh Raya content; match the design.”** This frame now governs the home page's visual styling. The earlier brief remains the source for Yogesh's content, verified project stories, Markdown writing, and functional requirements.

## Implementation

The implementation uses the high-fidelity Figma design-context response, its screenshot, and locally downloaded individual assets. It does not use a screenshot of the whole page as the website.

The home page reuses the React sections, Motion wrappers, disclosure component, project gallery, Craft catalog, and Markdown article list. Styling is organized under `src/styles/` with home and site chrome files; project cards use a CSS Module. Shared header, footer, dock, and dark palette match the same frame. Existing detail-page templates and content remain intact.

| Figma specification | Implemented                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Desktop canvas      | `#111111`, dark by default; saved theme preferences still work                                   |
| Main content        | 782px outer maximum with 24px internal padding; 734px content at 1440px                          |
| Header              | Starts at x353/y32 at 1440px; 57.6px high                                                        |
| Banner              | Exact exported 734×286px decorative image; top at y121.6                                         |
| Avatar              | 92×92px with 6px page-colored border, 16px inset and 50px overlap                                |
| Identity            | 33.6px/36px bold name; 22.1px/32px role                                                          |
| Sections            | 48px padding and fine dividers; 35.3px bold headings                                             |
| Work cards          | 24px outer corners, 6px padding, 20px media corners, 722×406.13px media at desktop               |
| Captions            | 15.3px/24px title and 12.6px/22.75px summary                                                     |
| Experience          | Connected timeline, 36px organization markers, inline role and secondary metadata                |
| Strengths           | Numbered 72px rows; details remain keyboard/tap accessible                                       |
| About decoration    | Exact 220×220px star asset, offset 32px to the left                                              |
| Dock                | Original SVG icons, active label, 22px outer corners, 19.5px bottom offset, source gradient mask |

## Asset mapping

All assets are stored in `public/images/figma/`. The icons are rendered by `FigmaIcon` at the root dimensions supplied by Figma; their SVG contents are not rewritten.

| Layer / use                      | Local file                                         | Dimensions                           |
| -------------------------------- | -------------------------------------------------- | ------------------------------------ |
| Banner, 1351:6162                | `60451.png`                                        | 734×286                              |
| About star, 1351:6552            | `493a9.png`                                        | 220×220                              |
| Header Home                      | `223ce.svg`                                        | 16×16                                |
| Action arrow                     | `b8298.svg`                                        | 20×20                                |
| Download                         | `e699b.svg`                                        | 20×20                                |
| Gallery previous / next          | `51e2f.svg`, `9a9b7.svg`                           | 10×10                                |
| Work link                        | `00fc9.svg`                                        | 14×14                                |
| Updated work-card link           | `3906a.svg`                                        | 14×14                                |
| Experience chevron               | `b1be6.svg`                                        | 16×16                                |
| Footer location                  | `50ce6.svg`                                        | 14×14                                |
| Footer email / LinkedIn          | `139f8.svg`, `f260c.svg`                           | 16×16                                |
| Dock Home / Work / About / Craft | `296fd.svg`, `72087.svg`, `9bf09.svg`, `aa9f1.svg` | 18×18                                |
| Dock contact / settings          | `14c97.svg`, `6a19f.svg`                           | 18×18                                |
| Dock gradient mask               | `e32e1.svg`                                        | 1440×120 source, responsive CSS mask |

## Intentional content differences

- Yogesh's name, biography, three verified work entries, three verified experience entries, strengths, principles, and Nepal location remain in place. The reference owner's portrait, artwork, clients, awards, language, and visitor count are not presented as Yogesh's.
- Portrait, project screenshots, and Craft artwork still require owner assets. The current initials avatar, two typographic work covers, existing collaboration diagram, and honest Craft empty state remain. The empty collection already supports the reference's two-column card treatment when populated.
- CV/email controls remain conditional on real values. The supplied LinkedIn profile remains the contact destination. As a result, the missing email row makes the hero 46px shorter than the reference and later section positions follow the actual content length.
- Writing remains an additional home section and Blog remains a dock destination, as requested in the original brief. The additional dock item increases its desktop width. The active label is hidden below 380px so every destination still fits.
- Mobile behavior adapts the supplied desktop frame; no mobile Figma frame was supplied.

## Accessibility note

The supplied design uses `#606060` on `#111111` and `#1e1e1e` for secondary text and action labels. Those exact requested colors fall below WCAG AA text contrast. This is recorded as a known design limitation rather than silently claiming an accessibility pass or changing the requested colors. The tests permit only those exact colors in the specific source-design slots; other accessibility findings still fail. Focus outlines, semantic controls, reduced motion, keyboard navigation, and clipboard fallbacks remain functional.

## Verification

Run `npm run typecheck`, `npm run build`, and `npm run test:figma` for the requested screen. The Figma checks cover measured desktop layout, source-asset loading and geometry, 320/390/768px layouts, dock clearance, disclosure controls, settings persistence/focus, theme behavior, reduced motion, server HTML, and accessibility findings. Screenshots and contrast findings are saved to the ignored `test-results/` directory.

Only the requested home screen and its shared controls are visually verified against this Figma frame. Existing About, Work, Craft, and Blog detail layouts have no supplied replacement frames and are not represented as pixel-matched to Figma.

The work card was later updated from [Figma node 1352:6701](https://www.figma.com/design/WBxilPJIVmVdEMutum6eXp/Briz-Web?node-id=1352-6701). Its 734px card, 722×406px media, gradient, footer typography, and link icon now apply on Home and Work. The Emplorium cover was saved in `docs/figma-reference/` for design comparison, but it is not shown on Yogesh's unrelated projects. Current published work has at most one project image, so carousel controls appear when verified additional screenshots are added.

Verification result: TypeScript and the production build passed; all **7 Figma-specific Playwright checks** passed. Rendered desktop banner/header/avatar coordinates and every visible local asset's dimensions matched the extracted values. Desktop and mobile screenshots were reviewed. Additional isolated checks passed for the Figma gallery's buttons/swipe/drag-click suppression, clipboard success/failure/shortcut guards, and Craft filtering/load-more behavior. The documented source-design contrast findings are expected exceptions, not a claim of full WCAG AA compliance.
