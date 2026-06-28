import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold text-slate-950 dark:text-white">
          <FileText className="h-5 w-5 shrink-0 text-teal-700" />
          <span className="truncate">AI Resume Builder</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <a href="/#features" className="transition-colors hover:text-slate-950 dark:hover:text-white">功能</a>
          <a href="/#workflow" className="transition-colors hover:text-slate-950 dark:hover:text-white">流程</a>
          <Link href="/resume/demo" className="transition-colors hover:text-slate-950 dark:hover:text-white">示例</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" variant="outline">
            <Link href="/builder">创建简历</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
