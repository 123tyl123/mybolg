import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getAllPostsMeta, getTagCounts } from "@/lib/posts";

export default function Home() {
  const latestPosts = getAllPostsMeta().slice(0, 6);
  const tags = getTagCounts().slice(0, 12);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white/85 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-10">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">MDX Driven Blog</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          用 Next.js + MDX 构建清爽、可扩展、可自动部署的博客
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">
          文章存放在 content/posts，支持前言配置、代码高亮、标签筛选、搜索、暗黑模式和响应式布局。
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm text-white transition hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600"
          >
            浏览全部文章
          </Link>
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
          >
            部署到 Vercel
          </a>
        </div>
      </section>

      {tags.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">热门标签</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((item) => (
              <Link
                key={item.tag}
                href={`/tags/${encodeURIComponent(item.tag)}`}
                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:text-sky-300"
              >
                {item.tag} ({item.count})
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">最新文章</h2>
          <Link href="/blog" className="text-sm text-sky-700 hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200">
            查看全部
          </Link>
        </div>
        <div className="grid gap-4">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href="/projects"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">项目页</h3>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">查看项目展示和案例入口。</p>
        </Link>
        <Link
          href="/about"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">关于页</h3>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">查看博客定位、技术栈与内容方向。</p>
        </Link>
      </section>
    </div>
  );
}
