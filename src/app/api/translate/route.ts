import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
- Include a "key takeaway" when appropriate
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

💡 Key takeaway: Great products aren't built through massive changes alone.
They're built one detail at a time.

Grateful for the opportunity to learn, improve, and contribute.

#ContinuousImprovement #Learning #GrowthMindset #Engineering"
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = body.input;
    const intensity = body.intensity || "linkedin";

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Please provide something to translate." },
        { status: 400 }
      );
    }

    if (input.length > 2000) {
      return NextResponse.json(
        { error: "Keep your input under 2,000 characters." },
        { status: 400 }
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

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Translation error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
