import type { BlogFields, CraftFields, WorkFields } from "./schemas";

export type Collection = "work" | "blog" | "craft";
export type ContentRecord = WorkEntry | BlogEntry | CraftEntry;

export type WorkEntry = WorkFields & { slug: string; content: string };
export type WorkSummary = Omit<WorkEntry, "content" | "status">;
export type BlogEntry = BlogFields & { slug: string; content: string; readingTime: string };
export type BlogSummary = Omit<BlogEntry, "content" | "status">;
export type CraftEntry = CraftFields & { slug: string; content: string };
export type CraftSummary = Omit<CraftEntry, "content" | "status">;
