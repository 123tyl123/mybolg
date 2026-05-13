# MDX 驱动博客（Next.js App Router）

这是一个基于 `Next.js + MDX + Tailwind CSS` 的博客模板，支持：

- `content/posts/*.mdx` 文章管理（frontmatter 自动解析）
- 首页 / 博客列表 / 文章详情三级路由
- 代码高亮（rehype-pretty-code）
- 标签功能 + 关键词搜索
- 暗黑模式（next-themes）
- 响应式布局与图片优化（next/image）
- GitHub + Vercel 自动部署

## 1. 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:3000` 预览，支持热更新。

## 2. 文章写作

文章放在 `content/posts`，文件名即 slug，例如：`my-first-post.mdx`。

frontmatter 约定：

```yaml
---
title: "文章标题"
date: "2026-05-13"
summary: "文章摘要"
tags:
  - Next.js
  - MDX
cover: "/images/cover.png"
draft: false
---
```

说明：

- `title`、`date`、`summary` 必填
- `date` 建议使用 ISO 格式：`YYYY-MM-DD`
- `tags` 可选，支持多个标签
- `draft: true` 的文章不会出现在列表中

## 3. 路由结构

- `/`：首页（最新文章 + 热门标签）
- `/blog`：博客列表（标签筛选 + 搜索）
- `/blog/[slug]`：文章详情页
- `/tags/[tag]`：标签聚合页
- `not-found`：404 页面

## 4. 常用命令

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## 5. GitHub + Vercel 自动部署

1. 新建 GitHub 仓库并推送代码：

```bash
git init
git add .
git commit -m "feat: init mdx blog"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. 登录 Vercel，Import 对应 GitHub 仓库。
3. 保持默认构建配置（Next.js 自动识别）。
4. 后续每次 `git push origin main`，Vercel 会自动 CI/CD。

## 6. 技术栈

- Framework: Next.js (App Router)
- Content: MDX + gray-matter
- Style: Tailwind CSS
- Theme: next-themes
- Highlight: rehype-pretty-code
- Deploy: Vercel
