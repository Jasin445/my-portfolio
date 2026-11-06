import TechnicalBlog from "../../site-pages/my-articles";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Developer Articles & Notes",
  description:
    "Articles and practical notes from Jason Dagana on web development, software projects, React, TypeScript, and the decisions behind the code.",
  path: "/my-articles",
});

export default function ArticlesPage() {
  return <TechnicalBlog />;
}
