import Link from "next/link";
import { ArrowLeft, SearchX, WandSparkles } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5 py-12 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg dark:bg-white dark:text-zinc-950">
          <WandSparkles size={24} />
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          <SearchX size={17} />
          404
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          This page went off-script.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-zinc-500 dark:text-zinc-400">
          The URL you entered does not point to a page in this workspace.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-blue-200"
        >
          <ArrowLeft size={16} />
          Back to translator
        </Link>
      </section>
    </main>
  );
}