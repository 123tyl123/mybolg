import type { Metadata } from "next";
import { BackButton } from "@/components/back-button";
import { PostListClient } from "@/components/post-list-client";
import { getSearchablePosts, getTagCounts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "全部文章列表，支持标签筛选和关键词搜索。",
};

export default function BlogPage() {
  const posts = getSearchablePosts();
  const tags = getTagCounts();

  return (
    <div className="space-y-4">
      <BackButton fallbackHref="/" />
      <PostListClient posts={posts} tags={tags} heading="博客文章" />
    </div>
  );
}
