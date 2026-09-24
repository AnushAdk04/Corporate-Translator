import Link from "next/link";
import { ArrowLeft, ShieldCheck, WandSparkles } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "How Corporate Translator handles your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100 md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-blue-600 dark:text-zinc-300"
        >
          <ArrowLeft size={16} />
          Back to translator
        </Link>

        <header className="mt-12 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60">
              <WandSparkles size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">
              Corporate Translator
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-500 dark:text-zinc-400">
            A straightforward explanation of what happens when you use the
            translator.
          </p>
          <p className="mt-3 text-xs text-zinc-400">Last updated: September 24, 2026</p>
        </header>

        <div className="space-y-10 py-10 text-[15px] leading-7 text-zinc-600 dark:text-zinc-300">
          <section>
            <div className="mb-3 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              <ShieldCheck size={18} className="text-blue-600" />
              <h2 className="text-xl font-bold">The short version</h2>
            </div>
            <p>
              Corporate Translator does not require an account and does not
              intentionally store your translations in a database. Text you
              submit is sent to Groq so the translation can be generated, then
              returned to your browser.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Information you submit
            </h2>
            <p>
              The text in the translator and the selected intensity are sent
              to the server endpoint at <code>/api/translate</code>. The server
              forwards the request to Groq&apos;s API using the application&apos;s
              server-side API key. Do not submit confidential, personal, or
              regulated information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Shareable posts
            </h2>
            <p>
              When you choose Share, the input, intensity, and generated post
              are placed in the share URL. Anyone who receives that URL can
              read its contents. Sharing is optional; normal translation does
              not put the result in the address bar.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Browser storage and basic operations
            </h2>
            <p>
              The app stores only your light/dark theme preference in browser
              local storage. It does not use advertising cookies or analytics
              trackers. The server applies a short-term per-client request
              limit to protect the Groq quota. Hosting providers and API
              providers may retain operational logs under their own policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Third-party services
            </h2>
            <p>
              Translation generation uses Groq. The deployed app may also use
              Vercel for hosting, request delivery, and operational logs. Their
              current privacy policies govern the information they process as
              service providers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Changes and contact
            </h2>
            <p>
              This policy may change when the app&apos;s data practices change.
              For questions or removal requests concerning a deployed
              instance, contact the person or organization operating that
              instance.
            </p>
          </section>
        </div>

        <div className="border-t border-zinc-200 py-6 text-xs text-zinc-400 dark:border-zinc-800">
          This page describes the current implementation and is not legal advice.
        </div>
      </div>
    </main>
  );
}