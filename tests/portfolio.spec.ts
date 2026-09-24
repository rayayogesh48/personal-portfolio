import { test, expect } from "@playwright/test";
import { auditFigmaAccessibility } from "./figma-accessibility";

const publicRoutes = [
  "/",
  "/work",
  "/about",
  "/craft",
  "/blog",
  "/work/property-management-dashboard",
  "/work/briz-mobile-workflow",
  "/work/sync-engine-crdt",
  "/blog/designing-clearer-product-flows",
  "/blog/what-should-a-dashboard-show-first",
];

for (const width of [320, 390, 1440]) {
  test(`public pages are readable and fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of publicRoutes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
      const nav = page.getByRole("navigation", { name: "Main navigation" });
      const bounds = await nav.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = await page.locator(".footer-bottom").boundingBox();
      const dock = await nav.boundingBox();
      expect(footer!.y + footer!.height).toBeLessThan(dock!.y);
      await expect(
        page.locator(
          'a[href*="example.com"], a[href="https://github.com"], a[href="https://x.com"]',
        ),
      ).toHaveCount(0);
    }
    expect(errors).toEqual([]);
  });
}

test("theme persists, settings dismisses and restores keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  const settings = page.getByRole("button", { name: "Settings", exact: true });
  await settings.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Settings" })).toBeVisible();
  await page.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.keyboard.press("Escape");
  await expect(settings).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await settings.click();
  await expect(
    page.getByRole("button", { name: "Dark", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "System", exact: true }).click();
  await page.keyboard.press("Escape");
  await page.emulateMedia({ colorScheme: "light" });
  const light = await page
    .locator("body")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.emulateMedia({ colorScheme: "dark" });
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).not.toBe(light);
  await settings.click();
  await page.locator("h1").click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(settings).toBeFocused();
});

test("disclosures expose content by keyboard and dock navigates between pages", async ({
  page,
}) => {
  await page.goto("/");
  const experience = page.getByRole("button", { name: /Bytecare Technology/ });
  await experience.focus();
  await page.keyboard.press("Enter");
  await expect(experience).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("Leading product design for mobile and web applications", {
      exact: false,
    }),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(experience).toHaveAttribute("aria-expanded", "false");
  const strength = page.getByRole("button", { name: /Find the real problem/ });
  await strength.click();
  await expect(strength).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("I start with what people need to do", { exact: false }),
  ).toBeVisible();
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  for (const label of ["Work", "About", "Craft", "Blog", "Home"]) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(
      nav.getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(page.locator("h1")).toBeVisible();
  }
});

for (const theme of ["Light", "Dark"]) {
  test(`key pages have no unexpected accessibility findings in ${theme}`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await page.getByRole("button", { name: theme, exact: true }).click();
    await expect.poll(() => page.locator('a[href="#case-studies"]').evaluate((element) => getComputedStyle(element).backgroundColor))
      .toBe(theme === "Light" ? "rgb(244, 244, 241)" : "rgb(30, 30, 30)");
    await auditFigmaAccessibility(page);
    await page.keyboard.press("Escape");
    for (const route of [
      "/",
      "/about",
      "/work",
      "/craft",
      "/blog/designing-clearer-product-flows",
    ]) {
      await page.goto(route);
      await auditFigmaAccessibility(page);
    }
  });
}

test("drafts and unknown content return 404 and stay out of discovery", async ({
  request,
}) => {
  for (const route of [
    "/blog/better-product-design-feedback",
    "/blog/missing",
    "/work/missing",
    "/craft/missing",
  ]) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
  for (const route of ["/", "/blog", "/sitemap.xml"]) {
    expect(await (await request.get(route)).text()).not.toContain(
      "better-product-design-feedback",
    );
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("example.com");
});

test("primary content remains visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(
    page.getByRole("heading", { name: "Yogesh Raya", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "My Work", exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText("I’m Yogesh, a product designer based in Nepal.", {
      exact: false,
    }),
  ).toBeVisible();
  await context.close();
});

test("reduced motion and mobile settings preserve usable controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  await expect(page.locator(".local-time")).not.toHaveText("--:--");
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  const box = await page.getByRole("dialog").boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  await page.keyboard.press("Escape");
  const strength = page.getByRole("button", {
    name: /Design beyond the happy path/,
  });
  await strength.click();
  await expect(strength).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("I consider empty states", { exact: false }),
  ).toBeVisible();
});
