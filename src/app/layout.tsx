import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { BlueprintProvider } from "@/context/blueprint-context";
import { CommandPalette } from "@/components/ui/command-palette";
import { BlueprintOverlay } from "@/components/ui/blueprint-overlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "Yogesh Raya | Product Designer in Nepal",
    template: "%s | Yogesh Raya",
  },
  description:
    "Explore Yogesh Raya’s product design portfolio: UX case studies, client projects, website designs, and practical thoughts on solving user problems.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Yogesh Raya | Product Designer in Nepal",
    description:
      "Explore Yogesh Raya’s product design portfolio: UX case studies, client projects, website designs, and practical thoughts on solving user problems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-void text-mist selection:bg-acid-lime/20 selection:text-paper font-sans flex flex-col antialiased">
        <BlueprintProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CommandPalette />
          <BlueprintOverlay />
        </BlueprintProvider>
      </body>
    </html>
  );
}
