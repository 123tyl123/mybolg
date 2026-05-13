import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

type FrontmatterRaw = {
  title?: unknown;
  date?: unknown;
  summary?: unknown;
  tags?: unknown;
  cover?: unknown;
  draft?: unknown;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  cover?: string;
  draft: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingMinutes: number;
};

export type PostMeta = Omit<Post, "content">;

export type SearchablePost = PostMeta & {
  searchableText: string;
};

export type TagCount = {
  tag: string;
  count: number;
};

function normalizeTag(tag: string): string {
  return tag.trim().replace(/\s+/g, " ");
}

function parseFrontmatter(raw: FrontmatterRaw, slug: string): PostFrontmatter {
  if (typeof raw.title !== "string" || !raw.title.trim()) {
    throw new Error(`Missing "title" in ${slug}.mdx`);
  }

  if (typeof raw.date !== "string" || Number.isNaN(new Date(raw.date).getTime())) {
    throw new Error(`Invalid "date" in ${slug}.mdx. Use ISO date like 2026-05-13`);
  }

  if (typeof raw.summary !== "string" || !raw.summary.trim()) {
    throw new Error(`Missing "summary" in ${slug}.mdx`);
  }

  let tags: string[] = [];
  if (Array.isArray(raw.tags)) {
    tags = raw.tags.filter((item): item is string => typeof item === "string").map(normalizeTag);
  } else if (typeof raw.tags === "string") {
    tags = raw.tags.split(",").map(normalizeTag);
  }

  tags = Array.from(new Set(tags.filter(Boolean)));

  const cover = typeof raw.cover === "string" && raw.cover.trim() ? raw.cover : undefined;
  const draft = Boolean(raw.draft);

  return {
    title: raw.title.trim(),
    date: raw.date,
    summary: raw.summary.trim(),
    tags,
    cover,
    draft,
  };
}

function stripMdxForSearch(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-\n\r]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileRaw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileRaw);
  const frontmatter = parseFrontmatter(data as FrontmatterRaw, slug);
  const minutes = Math.max(1, Math.round(readingTime(content).minutes));

  return {
    slug,
    content,
    readingMinutes: minutes,
    ...frontmatter,
  };
}

function byDateDesc(a: { date: string }, b: { date: string }): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => Boolean(post))
    .filter((post) => !post.draft)
    .sort(byDateDesc);
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    summary: post.summary,
    tags: post.tags,
    cover: post.cover,
    draft: post.draft,
    readingMinutes: post.readingMinutes,
  }));
}

export function getSearchablePosts(): SearchablePost[] {
  return getAllPosts().map(({ content, ...meta }) => ({
    ...meta,
    searchableText: stripMdxForSearch(content).toLowerCase(),
  }));
}

export function getTagCounts(): TagCount[] {
  const countMap = new Map<string, number>();

  for (const post of getAllPostsMeta()) {
    for (const tag of post.tags) {
      countMap.set(tag, (countMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(countMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => (b.count === a.count ? a.tag.localeCompare(b.tag) : b.count - a.count));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) => post.tags.includes(tag));
}
