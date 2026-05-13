import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/back-button";

export const metadata: Metadata = {
  title: "项目",
  description: "项目展示页。",
};

const projects = [
  {
    name: "MDX Blog Starter",
    description: "基于 Next.js App Router 的 MDX 博客模板，支持标签、搜索和暗黑模式。",
    stack: ["Next.js", "MDX", "Tailwind CSS"],
    href: "/blog",
  },
  {
    name: "Content Pipeline",
    description: "frontmatter 解析、slug 生成、按日期排序与静态路由预渲染。",
    stack: ["TypeScript", "gray-matter"],
    href: "/blog/welcome-to-mdx",
  },
  {
    name: "Vercel CI/CD",
    description: "GitHub 提交触发自动构建部署，适配博客持续更新。",
    stack: ["GitHub", "Vercel"],
    href: "/blog/vercel-ci-cd-notes",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <BackButton fallbackHref="/" />
      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">项目</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
          这里先放当前站点相关项目示例，后续你可以替换成真实项目。
        </p>
      </section>

      <section className="grid gap-4">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{project.name}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href={project.href}
              className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-1.5 text-sm text-white transition hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600"
            >
              查看详情
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
