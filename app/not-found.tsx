import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">页面不存在</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
        你访问的内容可能已被删除，或链接地址有误。
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600"
        >
          返回首页
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          查看博客
        </Link>
      </div>
    </section>
  );
}
