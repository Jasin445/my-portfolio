import AboutProfessional from "../../site-pages/about-professional";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Jason Dagana's experience, skills, and approach to full-stack development, React, TypeScript, and building useful digital products.",
  path: "/about-professional",
});

export default function AboutPage() {
  return <AboutProfessional />;
}
