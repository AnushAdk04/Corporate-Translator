import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const MAX_TRACKED_CLIENTS = 10_000;
const requestLog = new Map<string, number[]>();

function getClientKey(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "anonymous"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const recentRequests = (requestLog.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
  );

  if (recentRequests.length >= RATE_LIMIT) {
    const retryAfter = Math.ceil(
      (RATE_WINDOW_MS - (now - recentRequests[0])) / 1000
    );
    requestLog.set(key, recentRequests);
    return { allowed: false, remaining: 0, retryAfter };
  }

  recentRequests.push(now);
  if (requestLog.size >= MAX_TRACKED_CLIENTS && !requestLog.has(key)) {
    const oldestKey = requestLog.keys().next().value;
    if (oldestKey) requestLog.delete(oldestKey);
  }
  requestLog.set(key, recentRequests);
  return {
    allowed: true,
    remaining: RATE_LIMIT - recentRequests.length,
    retryAfter: 0,
  };
}

const SYSTEM_PROMPT = `
You are Corporate Translator, a humorous AI that transforms ordinary
workplace accomplishments into exaggerated, polished LinkedIn-style posts.

Your job is NOT to invent major accomplishments.

Take the user's mundane, simple, or boring achievement and make it sound
absurdly meaningful, inspirational, professional, and LinkedIn-worthy.

Style:
- Enthusiastic
- Corporate
- Positive
- Slightly dramatic
- Inspirational
- Self-aware
- Occasionally ridiculous
- Use emojis naturally
- Use short paragraphs
- Never include a section or line labeled "Takeaway" or "Key takeaway"
- End with relevant hashtags
- Make the result genuinely entertaining

Important:
- Never claim the user accomplished something they did not mention.
- Do not invent companies, metrics, awards, promotions, people, customers,
  revenue, or business impact.
- Exaggerate the framing, not the facts.
- Preserve the core truth of what happened.
- The joke should come from corporate/LinkedIn language.

Example:

Input:
"fixed a typo in the README"

Output:
"🚀 Sometimes, meaningful progress starts with the smallest details.

Today, I had the opportunity to make a small but meaningful improvement
to one of our most important developer resources.

While correcting a simple documentation issue may seem minor, it reminded
me that impactful progress often comes from a continuous commitment to
improvement.

Grateful for the opportunity to learn, improve, and contribute.

#ContinuousImprovement #Learning #GrowthMindset #Engineering"
`;

function removeTakeaway(result: string) {
  return result
    .replace(/(?:^|\n)\s*(?:💡\s*)?(?:\*\*)?(?:Key\s+)?Takeaway(?:\*\*)?\s*:\s*[\s\S]*?(?=\n\s*\n|\n\s*#|$)/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json(
      { error: "Cross-origin requests are not allowed." },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  const rateLimit = checkRateLimit(getClientKey(request));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many translations. Please try again in a moment." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter),
          "X-RateLimit-Limit": String(RATE_LIMIT),
          "X-RateLimit-Remaining": "0",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) {
      return NextResponse.json(
        { error: "Request payload is too large." },
        { status: 413, headers: { "Cache-Control": "no-store" } }
      );
    }

    const body = await request.json();

    const input = body.input;
    const intensity = body.intensity || "linkedin";

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Please provide something to translate." },
        { status: 400 }
      );
    }

    if (input.length === 0 || input.length > 2000) {
      return NextResponse.json(
        { error: "Keep your input under 2,000 characters." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (typeof intensity !== "string") {
      return NextResponse.json(
        { error: "Please choose a valid intensity." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const intensityInstructions: Record<string, string> = {
      professional:
        "Keep it polished and professional. Minimal exaggeration.",
      linkedin:
        "Make it strongly LinkedIn-style with inspirational framing.",
      corporate:
        "Turn the corporate language up significantly. Use buzzwords and dramatic business framing.",
      unhinged:
        "Go fully ridiculous. Treat the mundane achievement like a historic professional milestone, while still remaining technically truthful.",
    };

    const instruction =
      intensityInstructions[intensity] || intensityInstructions.linkedin;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `
Translate this into a LinkedIn-style post.

Intensity:
${instruction}

What actually happened:
${input}
          `,
        },
      ],
      temperature: 0.9,
      max_completion_tokens: 800,
    });

    const result = completion.choices[0]?.message?.content;

    if (!result) {
      return NextResponse.json(
        { error: "The translator didn't return anything. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { result: removeTakeaway(result) },
      {
        headers: {
          "X-RateLimit-Limit": String(RATE_LIMIT),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Translation error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
