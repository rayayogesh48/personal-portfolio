import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  coverAlt?: string;
  draft: boolean;
  readingTime: string;
  content: string;
}

export interface CaseStudyContent {
  slug: string;
  content: string;
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function isValidISODate(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== "string") return false;
  const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoPattern.test(dateStr)) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

  const posts: BlogPost[] = [];

  for (const filename of files) {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Frontmatter validation
    if (!data.title || typeof data.title !== "string") {
      throw new Error(`Invalid frontmatter in "${filename}": missing or invalid 'title'.`);
    }

    if (!data.description || typeof data.description !== "string") {
      throw new Error(`Invalid frontmatter in "${filename}": missing or invalid 'description'.`);
    }

    // Normalizing date from matter (may parse as Date object or string)
    let dateStr = "";
    if (data.date instanceof Date) {
      dateStr = data.date.toISOString().split("T")[0];
    } else if (typeof data.date === "string") {
      dateStr = data.date;
    }

    if (!isValidISODate(dateStr)) {
      throw new Error(
        `Invalid frontmatter in "${filename}": 'date' must be a valid ISO format string (e.g. "2026-09-23"). Received: "${data.date}"`
      );
    }

    const draft = Boolean(data.draft);

    // Exclude drafts from public pages
    if (draft) {
      continue;
    }

    posts.push({
      slug,
      title: data.title,
      description: data.description,
      date: dateStr,
      cover: data.cover || undefined,
      coverAlt: data.coverAlt || undefined,
      draft,
      readingTime: calculateReadingTime(content),
      content,
    });
  }

  // Sort newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const draft = Boolean(data.draft);
  if (draft) {
    return null;
  }

  let dateStr = "";
  if (data.date instanceof Date) {
    dateStr = data.date.toISOString().split("T")[0];
  } else if (typeof data.date === "string") {
    dateStr = data.date;
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    date: dateStr,
    cover: data.cover || undefined,
    coverAlt: data.coverAlt || undefined,
    draft,
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getCaseStudyContent(slug: string): CaseStudyContent | null {
  const fullPath = path.join(CASE_STUDIES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  return {
    slug,
    content: fileContents,
  };
}

