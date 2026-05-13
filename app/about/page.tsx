import type { Metadata } from "next";
import { BackButton } from "@/components/back-button";

export const metadata: Metadata = {
  title: "关于",
  description: "博客与作者介绍页。",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <BackButton fallbackHref="/" />
      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">关于</h1>
        <p className="mt-4 text-sm leading-8 text-slate-700 dark:text-slate-300">
          这是一个 MDX 驱动的技术博客，目标是把写作、代码、部署统一在一个轻量工作流里。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">站点技术栈</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Next.js App Router</li>
            <li>MDX + Markdown</li>
            <li>Tailwind CSS</li>
            <li>Vercel 自动部署</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">内容方向</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>前端工程与架构实践</li>
            <li>写作与知识管理</li>
            <li>部署与自动化流程</li>
            <li>项目复盘与经验总结</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
