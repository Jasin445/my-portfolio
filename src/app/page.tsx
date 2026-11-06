import HomeLanding from "../site-pages/home-landing";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Full-Stack Developer & Web Designer",
  description:
    "I'm Jason Dagana, a full-stack developer building modern web applications with React, Next.js, TypeScript, Python, Node.js, Django and PostgreSQL. Explore my work and let's connect.",
  path: "/",
});

export default function HomePage() {
  return <HomeLanding />;
}
