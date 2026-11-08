import AboutProfessional from "../../site-pages/about-professional";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Jason Dagana's experience, skills, and approach to full-stack development, React, TypeScript, and building useful digital products.",
  path: "/about-professional",
  keywords: [
    "Jason Dagana about",
    "full-stack developer biography",
    "web developer philosophy",
    "developer interests",
  ],
  images: [
    { url: "/assets/images/Jason_main2.webp", width: 1490, height: 886, alt: "Jason Dagana — developer profile" },
    { url: "/assets/images/Jason_philosophy.png", alt: "Jason Dagana's development philosophy" },
    { url: "/assets/images/Jason_interest.png", alt: "Jason Dagana's interests beyond code" },
  ],
});

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Jason Dagana",
    url: "https://jason-dagana.vercel.app/about-professional",
    mainEntity: {
      "@type": "Person",
      name: "Jason Dagana",
      jobTitle: "Full-Stack Developer and Web Designer",
      url: "https://jason-dagana.vercel.app",
      image: [
        "https://jason-dagana.vercel.app/assets/images/Jason_main2.webp",
        "https://jason-dagana.vercel.app/assets/images/Jason_philosophy.png",
        "https://jason-dagana.vercel.app/assets/images/Jason_interest.png",
      ],
      sameAs: [
        "https://github.com/Jasin445",
        "https://ng.linkedin.com/in/dagana-jason-73a470317",
        "https://x.com/DaganaJason",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <AboutProfessional />
    </>
  );
}
