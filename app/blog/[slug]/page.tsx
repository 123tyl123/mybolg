import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { MdxRenderer } from "@/lib/mdx";
import { formatDate } from "@/lib/format";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-4">
        <BackButton fallbackHref="/blog" />
      </div>
      <header className="mb-8 border-b border-slate-200 pb-8 dark:border-slate-800">
        <div className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/blog" className="hover:text-sky-700 dark:hover:text-sky-300">
            博客
          </Link>
          <span className="mx-2">/</span>
          <span>{post.slug}</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{post.title}</h1>
        <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">{post.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        {post.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:text-sky-300"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mdx-content">
        <MdxRenderer source={post.content} />
      </div>
    </article>
  );
}
