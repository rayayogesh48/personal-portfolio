export function clampImageIndex(index: number, total: number) {
  return Math.max(0, Math.min(index, total - 1));
}

export function wrapImageIndex(index: number, total: number) {
  return total > 0 ? ((index % total) + total) % total : 0;
}
