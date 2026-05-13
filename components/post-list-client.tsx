"use client";

import { useMemo, useState } from "react";
import type { SearchablePost, TagCount } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

type PostListClientProps = {
  posts: SearchablePost[];
  tags: TagCount[];
  heading: string;
  initialTag?: string;
};

export function PostListClient({ posts, tags, heading, initialTag = "" }: PostListClientProps) {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState(initialTag);

  const filteredPosts = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return posts.filter((post) => {
      const hitKeyword =
        !lowerKeyword ||
        post.title.toLowerCase().includes(lowerKeyword) ||
        post.summary.toLowerCase().includes(lowerKeyword) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword)) ||
        post.searchableText.includes(lowerKeyword);

      const hitTag = !selectedTag || post.tags.includes(selectedTag);

      return hitKeyword && hitTag;
    });
  }, [keyword, posts, selectedTag]);

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{heading}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          共 {posts.length} 篇文章，当前展示 {filteredPosts.length} 篇。
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
          搜索文章
        </label>
        <input
          id="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="输入标题、摘要、标签或正文关键词"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-200 transition focus:border-sky-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:ring-sky-900"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedTag("")}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              selectedTag
                ? "border-slate-300 bg-white text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                : "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-300"
            }`}
          >
            全部标签
          </button>
          {tags.map((item) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => setSelectedTag(item.tag)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                selectedTag === item.tag
                  ? "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-300"
                  : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {item.tag} ({item.count})
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          没有匹配结果，请尝试更短关键词或切换标签。
        </p>
      )}
    </section>
  );
}
