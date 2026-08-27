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
  title: "Ezra Torres — Full Stack Developer",
  description:
    "Portfolio de Ezra Torres. Desarrollador Full Stack especializado en crear experiencias digitales modernas y de alto rendimiento.",
  keywords: ["Ezra Torres", "Full Stack Developer", "ezrap.dev", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Ezra Torres" }],
  openGraph: {
    title: "Ezra Torres — Full Stack Developer",
    description: "Portfolio personal de Ezra Torres — ezrap.dev",
    url: "https://ezrap.dev",
    siteName: "ezrap.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezra Torres — Full Stack Developer",
    description: "Portfolio personal de Ezra Torres — ezrap.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
