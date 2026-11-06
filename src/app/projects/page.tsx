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
});

export default function ProjectsPage() {
  return <PortfolioProjects />;
}
