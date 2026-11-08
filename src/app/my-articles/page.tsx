import TechnicalBlog from "../../site-pages/my-articles";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Developer Articles & Notes",
  description:
    "Articles and practical notes from Jason Dagana on web development, software projects, React, TypeScript, and the decisions behind the code.",
  path: "/my-articles",
  keywords: [
    "web development articles",
    "React and TypeScript tutorials",
    "software engineering notes",
    "full-stack developer blog",
    "Jason Dagana Hashnode",
  ],
});

export default function ArticlesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Developer Articles & Notes — Jason Dagana",
    description:
      "Practical notes and lessons on web development, software projects, React, TypeScript, and the decisions behind the code.",
    url: "https://jason-dagana.vercel.app/my-articles",
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Jason Dagana",
      url: "https://jason-dagana.vercel.app/about-professional",
    },
    publisher: {
      "@type": "Organization",
      name: "Jason Dagana on Hashnode",
      url: "https://jasondee.hashnode.dev",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <TechnicalBlog />
    </>
  );
}
