"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  exact?: boolean;
  aliases?: string[];
};

export function NavLink({ href, label, exact = false, aliases = [] }: NavLinkProps) {
  const pathname = usePathname();
  const candidates = [href, ...aliases];

  const isActive = exact
    ? candidates.some((item) => pathname === item)
    : candidates.some((item) => pathname === item || pathname.startsWith(`${item}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-full px-3 py-1.5 text-sm transition ${
        isActive
          ? "bg-sky-100 text-sky-800 ring-1 ring-sky-200 dark:bg-sky-900/40 dark:text-sky-200 dark:ring-sky-800"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
