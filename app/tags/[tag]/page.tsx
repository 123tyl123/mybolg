import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { PostListClient } from "@/components/post-list-client";
import { getPostsByTag, getSearchablePosts, getTagCounts } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  return getTagCounts().map((item) => ({ tag: item.tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `标签：${decodedTag}`,
    description: `查看标签 ${decodedTag} 下的全部文章。`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const tagPosts = getPostsByTag(decodedTag);

  if (tagPosts.length === 0) {
    notFound();
  }

  const posts = getSearchablePosts();
  const tags = getTagCounts();

  return (
    <div className="space-y-4">
      <BackButton fallbackHref="/blog" />
      <PostListClient posts={posts} tags={tags} heading={`标签：${decodedTag}`} initialTag={decodedTag} />
    </div>
  );
}
