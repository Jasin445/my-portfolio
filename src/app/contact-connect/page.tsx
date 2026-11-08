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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Jason Dagana",
    url: "https://jason-dagana.vercel.app/contact-connect",
    mainEntity: {
      "@type": "Person",
      name: "Jason Dagana",
      email: "mailto:daganajason72@gmail.com",
      telephone: "+2349013642811",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        addressCountry: "NG",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <ContactConnect />
    </>
  );
}
