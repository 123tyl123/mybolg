import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Frost Notes",
    template: "%s | Frost Notes",
  },
  description: "一个由 Next.js App Router + MDX 驱动的博客示例",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_5%_0%,rgba(125,160,190,0.2),transparent_38%),radial-gradient(circle_at_95%_25%,rgba(135,155,180,0.16),transparent_34%),linear-gradient(180deg,#f3f7fb_0%,#eef3f8_55%,#edf2f6_100%)] dark:bg-[radial-gradient(circle_at_15%_0%,rgba(89,127,161,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(67,93,121,0.25),transparent_40%),linear-gradient(180deg,#020817_0%,#020617_55%,#030712_100%)]" />
            <SiteHeader />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
