import "server-only";
import { getBlog, getCraft, getWork, listBlog, listCraft, listWork } from "./catalog";
import { blogSummary, craftSummary, workSummary } from "./projections";

export function listPublishedWork() { return listWork().map(workSummary); }
export function getPublishedWork(slug: string) { return getWork(slug); }
export function listPublishedBlogPosts() { return listBlog().map(blogSummary); }
export function getPublishedBlogPost(slug: string) { return getBlog(slug); }
export function listPublishedCraft() { return listCraft().map(craftSummary); }
export function getPublishedCraft(slug: string) { return getCraft(slug); }
