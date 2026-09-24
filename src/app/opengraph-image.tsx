import { ImageResponse } from "next/og";

export const alt = "Corporate Translator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f8fafc",
          color: "#18181b",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
          * Corporate Translator
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#2563eb",
              display: "flex",
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Make it sound
          </div>
          <div
            style={{
              background: "linear-gradient(90deg, #2563eb, #7c3aed)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            corporate.
          </div>
          <div style={{ color: "#71717a", display: "flex", fontSize: 30 }}>
            Your accomplishments deserve more buzzwords.
          </div>
        </div>
        <div style={{ color: "#a1a1aa", display: "flex", fontSize: 24 }}>
          Professionally over-optimizing everything since today
        </div>
      </div>
    ),
    size
  );
}