import { mockProjects } from "../../data";
import { getProjectImages, getProjectSlug } from "../../lib/projects";

const siteUrl = "https://jason-dagana.vercel.app";

function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const pages = [
    {
      url: `${siteUrl}/`,
      images: [absoluteUrl("/assets/images/jason.webp")],
    },
    {
      url: `${siteUrl}/projects`,
      images: [...new Set(mockProjects.map((project) => project.image))].map(
        absoluteUrl,
      ),
    },
    {
      url: `${siteUrl}/about-professional`,
      images: [
        "/assets/images/Jason_main2.webp",
        "/assets/images/Jason_philosophy.png",
        "/assets/images/Jason_interest.png",
        "/assets/images/about-hero.png",
      ].map(absoluteUrl),
    },
    { url: `${siteUrl}/my-articles`, images: [] },
    { url: `${siteUrl}/contact-connect`, images: [] },
    ...mockProjects.map((project) => ({
      url: `${siteUrl}/projects/${getProjectSlug(project)}`,
      images: getProjectImages(project).map(absoluteUrl),
    })),
  ];

  const entries = pages
    .map(({ url, images }) => {
      const imageEntries = images
        .map((image) => `    <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`)
        .join("\n");
      return `  <url>\n    <loc>${escapeXml(url)}</loc>${imageEntries ? `\n${imageEntries}` : ""}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
