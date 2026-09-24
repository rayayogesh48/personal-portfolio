import type { Metadata } from "next";
import { siteName, siteUrl } from "@/config/site";

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  return {
    title,
    description,
    ...(siteUrl
      ? { alternates: { canonical: `${siteUrl}${pathname}` } }
      : {}),
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      type: "website",
      ...(siteUrl ? { url: `${siteUrl}${pathname}` } : {}),
    },
    twitter: { card: "summary", title: `${title} | ${siteName}`, description },
  };
}
