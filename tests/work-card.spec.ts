import { expect, test } from "@playwright/test";
import { statSync } from "node:fs";
import { join } from "node:path";

test("work cards use the Figma frame and preserve real project links", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const card = page.locator(".project-card").first();
  const media = card.locator(".project-title-cover");
  const box = await card.boundingBox();
  const mediaBox = await media.boundingBox();
  expect(box!.width).toBe(734);
  expect(mediaBox!.width).toBe(722);
  expect(mediaBox!.height).toBeCloseTo(406, 0);
  expect(await card.evaluate((node) => getComputedStyle(node).borderRadius)).toBe("24px");
  expect(await media.evaluate((node) => getComputedStyle(node).borderRadius)).toBe("20px");
  expect(await card.evaluate((node) => getComputedStyle(node).backgroundColor)).toBe("rgb(30, 30, 30)");

  const title = card.getByRole("link", { name: "Property Management Dashboard", exact: true });
  const summary = card.locator(".project-description > p");
  expect(await title.evaluate((node) => getComputedStyle(node.parentElement!).fontSize)).toBe("16px");
  expect(await summary.evaluate((node) => getComputedStyle(node).fontSize)).toBe("14px");
  const iconLink = card.getByRole("link", { name: "View Property Management Dashboard case study" });
  const icon = iconLink.locator("img");
  await expect(icon).toHaveAttribute("src", "/images/figma/3906a.svg");
  expect(statSync(join(process.cwd(), "public/images/figma/3906a.svg")).size).toBeGreaterThan(0);
  expect((await iconLink.boundingBox())!.width).toBe(28);
  expect((await icon.boundingBox())!.width).toBe(14);
  await expect(card.getByRole("button", { name: /image for/i })).toHaveCount(0);
  const imageCard = page.locator(".project-card").nth(2);
  const gallery = imageCard.getByRole("region", { name: "Real-Time Collaborative Document Canvas images" });
  await expect(gallery.locator('img[src="/images/case-studies/sync-engine.svg"]')).toBeVisible();
  await expect(gallery.getByRole("button", { name: /image for/i })).toHaveCount(0);
  expect(await gallery.evaluate((node) => Array.from(node.children).some((child) => getComputedStyle(child).backgroundImage.includes("linear-gradient")))).toBe(true);

  await iconLink.click();
  await expect(page).toHaveURL(/\/work\/property-management-dashboard$/);
  await page.goto("/work/sync-engine-crdt");
  const detailGallery = page.getByRole("region", { name: "Real-Time Collaborative Document Canvas images" });
  expect(await detailGallery.locator("img").evaluate((node) => getComputedStyle(node).objectFit)).toBe("contain");
  await page.goto("/work");
  await expect(page.locator(".project-card")).toHaveCount(3);
  expect((await page.locator(".project-card").first().boundingBox())!.width).toBe(740);
});

for (const width of [320, 390]) {
  test(`work cards fit ${width}px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const card = page.locator(".project-card").first();
    const box = await card.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(card.getByRole("link", { name: "Property Management Dashboard", exact: true })).toBeVisible();
  });
}
