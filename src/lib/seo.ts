import type { Metadata } from "next";

const siteName = "Jason Dagana";
const siteUrl = "https://jason-dagana.vercel.app";
const socialImage = {
  url: "/assets/images/Jason_main2.webp",
  width: 1490,
  height: 886,
  alt: "Jason Dagana, full-stack developer and web designer",
};

interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: Array<{ url: string; width?: number; height?: number; alt: string }>;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  images = [socialImage],
}: PageSeo): Metadata {
  const url = new URL(path, siteUrl).toString();
  const pageTitle =
    path === "/" ? `${title} | ${siteName}` : title;

  return {
    title: pageTitle,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "en_NG",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      creator: "@DaganaJason",
      images,
    },
  };
}
