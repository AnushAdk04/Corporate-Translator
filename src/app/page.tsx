"use client";

import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clipboard,
  Flame,
  Lightbulb,
  Share2,
  Rocket,
  Sparkles,
  TrendingUp,
  WandSparkles,
  Zap,
} from "lucide-react";

const examples = [
  {
    text: "Fixed a typo in the README",
    icon: "📝",
  },
  {
    text: "Had a meeting that could have been an email",
    icon: "📅",
  },
  {
    text: "Made the button blue",
    icon: "🔵",
  },
  {
    text: "Deployed my app to Vercel",
    icon: "🚀",
  },
  {
    text: "Finished my TODO list",
    icon: "✅",
  },
];

const intensityLevels = [
  {
    value: "professional",
    emoji: "💼",
    title: "Professional",
    description: "Polished, but still believable",
    level: 25,
    color: "bg-emerald-500",
    icon: BriefcaseBusiness,
  },
  {
    value: "linkedin",
    emoji: "🚀",
    title: "LinkedIn",
    description: "Maximum inspirational energy",
    level: 55,
    color: "bg-blue-500",
    icon: Share2,
  },
  {
    value: "corporate",
    emoji: "📈",
    title: "Corporate Overload",
    description: "Synergies. Alignment. Impact.",
    level: 80,
    color: "bg-violet-500",
    icon: TrendingUp,
  },
  {
    value: "unhinged",
    emoji: "🔥",
    title: "Absolutely Unhinged",
    description: "This typo changed everything.",
    level: 100,
    color: "bg-orange-500",
    icon: Flame,
  },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [intensity, setIntensity] = useState("linkedin");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function translate() {
    if (!input.trim() || loading) return;

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
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }


  }

  async function copyResult() {
    if (!result) return;

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

  const selectedLevel =
    intensityLevels.find((item) => item.value === intensity) ??
    intensityLevels[1];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fafafa] text-zinc-950">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        {/* Navbar */}
        <nav className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-lg">
              <WandSparkles size={18} />
            </div>

            <span className="font-bold tracking-tight">
              Corporate Translator
            </span>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm backdrop-blur md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Currently over-optimizing everything
          </div>
        </nav>

        {/* Hero */}
        <header className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles size={15} />
            Your accomplishments deserve more buzzwords
          </div>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">
            Make it sound
            <span className="block bg-linear-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
              corporate.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg md:text-xl">
            Turn everyday tasks into inspirational LinkedIn posts that sound
            like you just transformed an entire industry.
          </p>
        </header>

        {/* Main application */}
        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Input card */}
          <div className="group rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_20px_70px_-30px_rgba(0,0,0,0.18)] transition hover:shadow-[0_25px_80px_-30px_rgba(0,0,0,0.22)] md:p-7">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Lightbulb size={20} />
                </div>

                <div>
                  <h2 className="font-bold tracking-tight">
                    What actually happened?
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Give us the painfully honest version.
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-400">
                {input.length}/2000
              </span>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={2000}
              placeholder="I fixed a bug..."
              className="h-56 w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 text-sm leading-6 outline-none transition placeholder:text-zinc-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            <div className="mt-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Zap size={13} />
                Need inspiration?
              </div>

              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <button
                    key={example.text}
                    onClick={() => useExample(example.text)}
                    className="group/example rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-500 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span className="mr-1.5">{example.icon}</span>
                    {example.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_20px_70px_-30px_rgba(0,0,0,0.18)] md:p-7">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <TrendingUp size={20} />
              </div>

              <div>
                <h2 className="font-bold tracking-tight">
                  Corporate intensity
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  How aggressively should we spin this?
                </p>
              </div>
            </div>

            {/* Intensity meter */}
            <div className="mt-7 rounded-2xl bg-zinc-50 p-4">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-500">
                  Corporate Level
                </span>

                <span className="font-bold text-zinc-800">
                  {selectedLevel.level}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${selectedLevel.color}`}
                  style={{ width: `${selectedLevel.level}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] font-medium text-zinc-300">
                <span>REALITY</span>
                <span>SYNERGY</span>
                <span>🚀 IMPACT</span>
              </div>
            </div>

            {/* Options */}
            <div className="mt-5 space-y-2.5">
              {intensityLevels.map((level) => {
                const Icon = level.icon;
                const selected = intensity === level.value;

                return (
                  <button
                    key={level.value}
                    onClick={() => setIntensity(level.value)}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition duration-200 ${selected
                        ? "border-blue-400 bg-blue-50/70 shadow-sm"
                        : "border-zinc-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50"
                      }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${selected
                          ? "bg-white text-blue-600 shadow-sm"
                          : "bg-zinc-100 text-zinc-500"
                        }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {level.title}
                        </span>
                        <span className="text-sm">{level.emoji}</span>
                      </div>

                      <p className="mt-0.5 truncate text-xs text-zinc-400">
                        {level.description}
                      </p>
                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${selected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-zinc-200 bg-white"
                        }`}
                    >
                      {selected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Translate button */}
            <button
              onClick={translate}
              disabled={!input.trim() || loading}
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-4 text-sm font-bold text-white shadow-xl shadow-zinc-950/10 transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Corporate-ifying...
                </>
              ) : (
                <>
                  <Rocket size={17} />
                  Translate this
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </div>
        </section>

        {/* Result */}
        {(result || loading) && (
          <section className="mt-5 overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_20px_70px_-30px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between border-b border-zinc-100 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20">
                  <Sparkles size={19} />
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    Translation complete
                  </div>
                  <h2 className="mt-0.5 font-bold tracking-tight">
                    Your LinkedIn masterpiece
                  </h2>
                </div>
              </div>

              {result && !result.startsWith("Error:") && (
                <button
                  onClick={copyResult}
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3.5 py-2 text-xs font-semibold transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {copied ? <Check size={14} /> : <Clipboard size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            <div className="p-5 md:p-7">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 w-4/5 animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-4 w-full animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-4 w-5/6 animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-4 w-2/5 animate-pulse rounded-full bg-zinc-100" />
                </div>
              ) : (
                <div className="whitespace-pre-wrap rounded-2xl bg-linear-to-br from-zinc-50 to-blue-50/30 p-6 text-[15px] leading-7 text-zinc-700 md:p-8">
                  {result}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-14 flex flex-col items-center justify-center gap-2 text-center text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <span className="font-semibold text-zinc-500">questionable</span>
            <span>amounts of corporate enthusiasm.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-semibold text-zinc-500">Groq</span>
            <span>⚡</span>
          </div>
        </footer>
      </div>
    </main>


  );
}