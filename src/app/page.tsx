"use client";

import { useState } from "react";

const examples = [
  "Fixed a typo in the README",
  "Had a meeting that could have been an email",
  "Finished my TODO list",
  "Made the button blue",
  "Deployed my app to Vercel",
];

export default function Home() {
  const [input, setInput] = useState("");
  const [intensity, setIntensity] = useState("linkedin");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function translate() {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");
    setCopied(false);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
          intensity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data.result);
    } catch (error) {
      setResult(
        error instanceof Error
          ? `Error: ${error.message}`
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function useExample(example: string) {
    setInput(example);
    setResult("");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm">
            ✨ Turning tiny tasks into major milestones
          </div>

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Corporate
            <span className="text-blue-600"> Translator</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-500 md:text-xl">
            Turn “I fixed a bug” into “I&apos;m excited to share a
            transformative learning experience.”
          </p>
        </header>

        {/* Main card */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Input */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-bold">What actually happened?</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Be honest. We&apos;ll handle the corporate spin.
                </p>
              </div>

              <span className="text-xs text-zinc-400">
                {input.length}/2000
              </span>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={2000}
              placeholder="e.g. Fixed a typo in the README..."
              className="h-52 w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Try an example
              </p>

              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <button
                    key={example}
                    onClick={() => useExample(example)}
                    className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold">Corporate intensity</h2>

            <p className="mt-1 text-sm text-zinc-400">
              How badly should we LinkedIn-ify this?
            </p>

            <div className="mt-6 space-y-3">
              <IntensityOption
                value="professional"
                current={intensity}
                onChange={setIntensity}
                emoji="💼"
                title="Professional"
                description="Polished, but still believable"
              />

              <IntensityOption
                value="linkedin"
                current={intensity}
                onChange={setIntensity}
                emoji="🚀"
                title="LinkedIn"
                description="Maximum inspirational energy"
              />

              <IntensityOption
                value="corporate"
                current={intensity}
                onChange={setIntensity}
                emoji="📈"
                title="Corporate Overload"
                description="Synergies. Alignment. Impact."
              />

              <IntensityOption
                value="unhinged"
                current={intensity}
                onChange={setIntensity}
                emoji="🔥"
                title="Absolutely Unhinged"
                description="This typo changed everything."
              />
            </div>

            <button
              onClick={translate}
              disabled={!input.trim() || loading}
              className="mt-8 w-full rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
            >
              {loading ? "Corporate-ifying..." : "Translate →"}
            </button>
          </div>
        </section>

        {/* Result */}
        {(result || loading) && (
          <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Translated
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Your LinkedIn masterpiece
                </h2>
              </div>

              {result && (
                <button
                  onClick={copyResult}
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-50"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              )}
            </div>

            {loading ? (
              <div className="space-y-3">
                <div className="h-4 animate-pulse rounded bg-zinc-100" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-100" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-100" />
                <div className="h-4 w-3/6 animate-pulse rounded bg-zinc-100" />
              </div>
            ) : (
              <div className="whitespace-pre-wrap rounded-2xl bg-zinc-50 p-6 text-[15px] leading-7 text-zinc-700">
                {result}
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-400">
          Built with questionable amounts of corporate enthusiasm.
        </footer>
      </div>
    </main>
  );
}

function IntensityOption({
  value,
  current,
  onChange,
  emoji,
  title,
  description,
}: {
  value: string;
  current: string;
  onChange: (value: string) => void;
  emoji: string;
  title: string;
  description: string;
}) {
  const selected = current === value;

  return (
    <button
      onClick={() => onChange(value)}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
          : "border-zinc-200 hover:border-zinc-300"
      }`}
    >
      <span className="text-2xl">{emoji}</span>

      <span className="flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block text-xs text-zinc-400">
          {description}
        </span>
      </span>

      <span
        className={`h-4 w-4 rounded-full border-2 ${
          selected
            ? "border-blue-600 bg-blue-600 ring-4 ring-blue-600/10"
            : "border-zinc-300"
        }`}
      />
    </button>
  );
}
