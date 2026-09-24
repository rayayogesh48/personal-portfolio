import { describe, expect, it } from "vitest";
import { clampImageIndex, wrapImageIndex } from "../src/components/media/carousel-index";

describe("carousel selection", () => {
  it("wraps consistently in both directions, including repeated navigation", () => {
    expect(wrapImageIndex(-1, 3)).toBe(2);
    expect(wrapImageIndex(3, 3)).toBe(0);
    expect(wrapImageIndex(7, 3)).toBe(1);
  });

  it("stays valid when images are shortened or empty", () => {
    expect(clampImageIndex(4, 2)).toBe(1);
    expect(clampImageIndex(4, 0)).toBe(0);
    expect(wrapImageIndex(2, 0)).toBe(0);
  });
});
