# Portfolio requirement implementation — 2026-09-24

The Current Direction and acceptance checklist in `portfolio-requirements.md` govern this update. Its Linear appendix is historical reference, not the active visual specification. Existing Next.js, React, TypeScript and Markdown foundations remain in use; `motion/react` was already installed.

## Content decisions

The owner confirmed during this update that the existing project stories, research/results, and employment dates are verified. Those stories and dates remain published, with no added results or roles.

The placeholder email, generic GitHub/X destinations, and unrelated engineering illustrations on the property dashboard and Briz entries were removed from public presentation. Those projects use original typographic covers; their stories and routes remain intact. The collaborative document project retains its existing synchronization diagram with accurate alternative text.

Missing owner assets remain content-dependent: portrait (initials fallback), CV (action omitted), email (action omitted; supplied LinkedIn used for contact), alternate Nepali name (static English name), translated content (Nepali marked coming soon), and Craft artwork (honest empty state). Personal interests and current activity read “Not shared yet.” A visitor count is deliberately not rendered without a real measurement source.

## Section and page coverage

| Reference area                 | Implementation                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Utility header, cover, profile | Breadcrumb header, original dot cover, initials/avatar, identity and work action                                   |
| My Work                        | Stacked shared project cards, real Work collection and retained Markdown details                                   |
| Experience                     | Existing verified role history with expandable contributions                                                       |
| What I Do Best                 | Four shared numbered strengths, accessible tap/keyboard disclosures                                                |
| About Me                       | Home summary, principles, and full biography page                                                                  |
| Personal cards                 | Nepal clock, focus, languages, editable reading/activity states                                                    |
| Tools, philosophy, contact     | Full About page with the four supplied tools and LinkedIn action                                                   |
| Craft                          | Shared empty-state/collection, data-driven categories/counts/load-more, static detail template and related artwork |
| Writing                        | Existing published Markdown index and articles, authorship, dates and return links                                 |
| Footer                         | Nepal, supplied LinkedIn, current copyright; content clears the fixed dock                                         |
| Persistent controls            | Home/Work/About/Craft/Blog/Contact/Settings, theme persistence and language availability                           |
| SEO                            | Unique page metadata, optional production canonicals, draft-filtered sitemap and preview indexing protection       |

## Motion and UI decisions

| Before                                      | After                                               | Why                                                         |
| ------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| Fixed dark marketing tokens                 | Neutral system/light/dark surfaces                  | Follow the active brief with readable theme-specific colors |
| Work collection duplicated featured content | Shared full collection and retained detail URLs     | Keep the source consistent and navigation useful            |
| Static role entries                         | Accessible animated disclosures                     | Expose verified contributions without a long timeline wall  |
| Hidden-on-entry animation risk              | Visible HTML with progressive transform enhancement | Keep text readable if JavaScript or observers fail          |
| Placeholder contact destinations            | Supplied LinkedIn plus optional real email/CV       | Prevent dead or misleading actions                          |

Gallery and Craft behavior is implemented for real content when supplied; no fictional images are added solely to demonstrate those controls. The copy shortcut is mounted only when email exists. Reduced motion disables layout/large transforms, decorative loops are omitted, and navigation does not wait for exit animation.

## Remaining owner content

Supply a real portrait, resume file, email, approved project screenshots, and Craft pieces to fill the corresponding content slots. Configure the real production origin using `NEXT_PUBLIC_SITE_URL` before deployment. No domain was invented and no deployment was performed.

## Verification results

- `npm run build` passed with static pages and statically generated published article/case-study routes.
- `npm run typecheck` and `git diff --check` passed.
- All 10 Playwright checks passed. Every published page fit 320px, 390px, and 1440px viewports; the footer remained above the dock. Tested light/dark pages and settings passed axe WCAG A/AA scans.
- Settings persistence, system theme changes, Escape/outside dismissal, focus return, keyboard disclosure toggles, client-side dock navigation, reduced motion, draft/unknown 404 responses, and visible HTML without JavaScript were checked.
- Isolated component checks with temporary test data passed for multi-image gallery buttons, keyboard activation, bounded swipe and drag click suppression; clipboard success/denial and typing/modifier guards; and Craft filtering, actual category counts, load-more limits, and detail links. This test data was not added to public content.
- Production sitemap generation was checked with a reserved test origin: public pages were included and the feedback draft stayed excluded. The application still needs its real deployment origin.
- Desktop light/dark and mobile Home/About screenshots were visually reviewed. No physical-device touch verification was performed.

Development now uses `.next-dev` while production uses `.next`, preventing an already-running development server from overwriting files during a production build.
