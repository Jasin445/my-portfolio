import ContactConnect from "../../site-pages/contact-connect";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Have a project or opportunity in mind? Contact Jason Dagana to discuss full-stack development, React and Next.js applications, or a collaboration.",
  path: "/contact-connect",
  keywords: [
    "contact Jason Dagana",
    "hire full-stack developer",
    "React developer",
    "web development collaboration",
  ],
});

export default function ContactPage() {
  return <ContactConnect />;
}
