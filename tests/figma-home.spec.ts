import { test, expect } from "@playwright/test";
import { statSync } from "node:fs";
import { join } from "node:path";
import { auditFigmaAccessibility } from "./figma-accessibility";

test("desktop frame matches Figma dimensions with Yogesh content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("heading", { name: "Yogesh Raya", exact: true }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText(
    /Ramy Baiche|Emplorium|Algeria|595th visitor/,
  );
  const banner = await page.locator(".profile-cover").boundingBox();
  expect(banner!.x).toBeCloseTo(353, 0);
  expect(banner!.y).toBeCloseTo(121.6, 0);
  expect(banner!.width).toBe(734);
  expect(banner!.height).toBe(286);
  const avatar = await page.locator(".profile-avatar").boundingBox();
  expect(avatar!.width).toBe(92);
  expect(avatar!.height).toBe(92);
  expect(avatar!.x).toBe(369);
  const surface = await page
    .locator("body")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(surface).toBe("rgb(17, 17, 17)");
  await expect(page.locator(".project-card-figma")).toHaveCount(3);
  const first = await page.locator(".project-card-figma").first().boundingBox();
  expect(first!.width).toBe(734);
  const preview = await page
    .locator(".project-title-cover")
    .first()
    .boundingBox();
  expect(preview!.width).toBe(722);
  expect(preview!.height).toBeCloseTo(406.13, 0);
  await page.screenshot({
    path: test.info().outputPath("desktop-dark.png"),
    fullPage: true,
    animations: "disabled",
  });
});

test("every Figma asset is local, loaded, and uses the intended geometry", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator(".about-spark").scrollIntoViewIfNeeded();
  const assets = await page
    .locator('img[src*="/images/figma/"]')
    .evaluateAll((images) =>
      images.map((element) => {
        const image = element as HTMLImageElement;
        const rect = image.getBoundingClientRect();
        return {
          path: image.getAttribute("src")!,
          loaded: image.complete && image.naturalWidth > 0,
          width: rect.width,
          height: rect.height,
          declaredWidth: Number(image.getAttribute("width")),
          declaredHeight: Number(image.getAttribute("height")),
        };
      }),
    );
  expect(assets.length).toBeGreaterThan(15);
  for (const asset of assets) {
    expect(asset.loaded, asset.path).toBe(true);
    expect(
      statSync(join(process.cwd(), "public", asset.path)).size,
      asset.path,
    ).toBeGreaterThan(0);
    expect(asset.width, asset.path).toBe(asset.declaredWidth);
    expect(asset.height, asset.path).toBe(asset.declaredHeight);
  }
  await expect(page.locator('img[src*="figma.com"]')).toHaveCount(0);
  const mask = await page
    .locator(".dock-fade")
    .evaluate((el) => getComputedStyle(el).maskImage);
  expect(mask).toContain("/images/figma/e32e1.svg");
  expect(
    statSync(join(process.cwd(), "public/images/figma/e32e1.svg")).size,
  ).toBeGreaterThan(0);
});

for (const width of [320, 390, 768]) {
  test(`home and dock remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    const dock = await nav.boundingBox();
    expect(dock!.x).toBeGreaterThanOrEqual(0);
    expect(dock!.x + dock!.width).toBeLessThanOrEqual(width);
    for (const label of ["Home", "Work", "About", "Craft", "Blog", "Contact"])
      await expect(
        nav.getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    const settings = await page.getByRole("dialog").boundingBox();
    expect(settings!.x).toBeGreaterThanOrEqual(0);
    expect(settings!.x + settings!.width).toBeLessThanOrEqual(width);
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Settings", exact: true }),
    ).toBeFocused();
    const experience = page.getByRole("button", {
      name: /Bytecare Technology/,
    });
    await experience.click();
    await expect(experience).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText("Leading product design for mobile", { exact: false }),
    ).toBeVisible();
    const strength = page.getByRole("button", {
      name: /Find the real problem/,
    });
    await strength.focus();
    await page.keyboard.press("Enter");
    await expect(strength).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText("I start with what people need to do", { exact: false }),
    ).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = await page.locator(".footer-bottom").boundingBox();
    expect(footer!.y + footer!.height).toBeLessThan(dock!.y);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: test.info().outputPath(`home-${width}.png`),
      fullPage: true,
      animations: "disabled",
    });
  });
}

test("settings persist, respect system preference, and disclose the supplied contrast limitation", async ({
  page,
}) => {
  await page.goto("/");
  const knownContrast = await auditFigmaAccessibility(page);
  expect(knownContrast.length).toBeGreaterThan(0);
  await test
    .info()
    .attach("figma-supplied-contrast-limitations", {
      body: JSON.stringify(knownContrast, null, 2),
      contentType: "application/json",
    });
  const settings = page.getByRole("button", { name: "Settings", exact: true });
  await settings.click();
  await page.getByRole("button", { name: "Light", exact: true }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  expect(await auditFigmaAccessibility(page)).toEqual([]);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await settings.click();
  await page.getByRole("button", { name: "System", exact: true }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgb(17, 17, 17)");
  await page.locator("h1").click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(settings).toBeFocused();
});

test("reduced motion and no-JavaScript home keep the content accessible", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: /Make the next step clear/ }).click();
  await expect(
    page.getByText("I turn complex tasks into flows", { exact: false }),
  ).toBeVisible();
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:3100/");
  await expect(
    staticPage.getByRole("heading", { name: "Yogesh Raya", exact: true }),
  ).toBeVisible();
  await expect(
    staticPage.getByRole("heading", { name: "My Work", exact: true }),
  ).toBeVisible();
  await expect(
    staticPage.getByText("I’m Yogesh, a product designer based in Nepal.", {
      exact: false,
    }),
  ).toBeVisible();
  await context.close();
});
