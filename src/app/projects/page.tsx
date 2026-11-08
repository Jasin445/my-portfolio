import PortfolioProjects from "../../site-pages/portfolio-projects";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Web Development Projects",
  description:
    "Explore selected projects by Jason Dagana, including full-stack web applications, React and Next.js products, dashboards, and responsive websites.",
  path: "/projects",
  keywords: [
    "web development projects",
    "React projects",
    "Next.js portfolio",
    "full-stack applications",
  ],
  images: [
    { url: "/assets/images/nrc-preview.webp", alt: "NRC project preview" },
    { url: "/assets/images/newsbridge-preview.webp", alt: "NewsBridge project preview" },
    { url: "/assets/images/datatechub-preview.png", alt: "DataTechHub project preview" },
  ],
});

export default function ProjectsPage() {
  return <PortfolioProjects />;
}
