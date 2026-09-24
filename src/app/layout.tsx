import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/components.css";
import "@/styles/home.css";
import "@/styles/site.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/site-footer";
import { PortfolioMotion } from "@/components/motion/portfolio-motion.client";
import { ThemeProvider } from "@/components/theme/theme-provider.client";
import { themeInitScript } from "@/components/theme/theme-init";
import { isPublicSite, siteDescription, siteName, siteUrl } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${siteName} | Product Designer in Nepal`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  robots: { index: isPublicSite, follow: isPublicSite },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <PortfolioMotion>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </PortfolioMotion>
        </ThemeProvider>
      </body>
    </html>
  );
}
