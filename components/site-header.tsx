import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "@/components/nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Frost Notes
        </Link>
        <nav className="flex items-center gap-3">
          <NavLink href="/" label="首页" exact />
          <NavLink href="/blog" label="博客" aliases={["/tags"]} />
          <NavLink href="/projects" label="项目" />
          <NavLink href="/about" label="关于" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
