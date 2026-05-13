export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 text-sm text-slate-600 sm:px-6 dark:text-slate-400">
        <p>MDX Blog on Next.js</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
