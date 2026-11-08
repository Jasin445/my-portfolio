import HomeLanding from "../site-pages/home-landing";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Full-Stack Developer & Web Designer",
  description:
    "I'm Jason Dagana, a full-stack developer building modern web applications with React, Next.js, TypeScript, Python, Node.js, Django and PostgreSQL. Explore my work and let's connect.",
  path: "/",
  keywords: [
    "Jason Dagana",
    "full-stack developer portfolio",
    "React and Next.js developer",
    "TypeScript developer",
    "web designer Nigeria",
  ],
  images: [
    { url: "/assets/images/Jason_main2.webp", width: 1490, height: 886, alt: "Jason Dagana, full-stack developer and web designer" },
    { url: "/assets/images/nrc-preview.webp", alt: "Featured Nigerian Railway Corporation project" },
    { url: "/assets/images/newsbridge-preview.webp", alt: "Featured NewsBridge project" },
  ],
});

export default function HomePage() {
  return <HomeLanding />;
}
