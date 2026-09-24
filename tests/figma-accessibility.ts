import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// The requested Figma frame explicitly uses #606060 on #111/#1e1e1e.
// Track that known design limitation narrowly; never suppress other contrast failures.
export async function auditFigmaAccessibility(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const knownContrast: string[][] = [];
  for (const violation of result.violations) {
    if (violation.id !== "color-contrast") {
      expect(violation, "Unexpected accessibility issue").toBeUndefined();
      continue;
    }
    for (const node of violation.nodes) {
      const selector = node.target.join(" ");
      const expected = await page.locator(selector).evaluate((element) => {
        const color = getComputedStyle(element).color;
        return (
          color === "rgb(96, 96, 96)" &&
          Boolean(
            element.closest(
              ".utility-header, .footer, .figma-home .profile-role, .figma-home .profile-intro, .figma-home .figma-button, .figma-home .strength-number",
            ),
          )
        );
      });
      expect(expected, `Unapproved contrast issue: ${selector}`).toBe(true);
      knownContrast.push(node.target as string[]);
    }
  }
  return knownContrast;
}
