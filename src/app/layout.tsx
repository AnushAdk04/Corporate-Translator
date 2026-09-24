import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://corporate-translator.vercel.app"),
  title: {
    default: "Corporate Translator",
    template: "%s | Corporate Translator",
  },
  description:
    "Turn everyday tasks into inspirational LinkedIn posts with questionable amounts of corporate enthusiasm.",
  applicationName: "Corporate Translator",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Corporate Translator",
    description:
      "Transform the ordinary into professionally over-optimized LinkedIn energy.",
    type: "website",
    siteName: "Corporate Translator",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Translator",
    description:
      "Transform the ordinary into professionally over-optimized LinkedIn energy.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
