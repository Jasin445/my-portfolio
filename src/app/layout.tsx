import "../styles/tailwind.css";
// @ts-ignore CSS side-effect imports may not have declarations in this TypeScript setup.
import "../styles/index.css";
import ClientShell from "./client-shell";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const siteUrl = "https://jason-dagana.vercel.app";
const socialImage = {
  url: "/assets/images/Jason_main2.webp",
  width: 1490,
  height: 886,
  alt: "Jason Dagana, full-stack developer and web designer",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Jason Dagana",
      description:
        "Portfolio of Jason Dagana, a full-stack developer building web applications and digital experiences.",
      inLanguage: "en-NG",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Jason Dagana",
      url: siteUrl,
      image: `${siteUrl}/assets/images/jason.webp`,
      jobTitle: "Full-Stack Developer and Web Designer",
      description:
        "Full-stack developer specializing in React, Next.js, TypeScript, Node.js, and PostgreSQL.",
      sameAs: [
        "https://github.com/Jasin445",
        "https://ng.linkedin.com/in/dagana-jason-73a470317",
        "https://x.com/DaganaJason",
      ],
      knowsAbout: [
        "Full-stack web development",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Web design",
      ],
      mainEntityOfPage: { "@id": `${siteUrl}/#website` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jason Dagana | Full-Stack Developer & Web Designer",
    template: "%s | Jason Dagana",
  },
  description:
    "Jason Dagana is a full-stack developer and web designer specializing in React, Next.js, TypeScript, Node.js, and PostgreSQL. Explore selected projects and get in touch.",
  applicationName: "Jason Dagana Portfolio",
  category: "technology",
  authors: [{ name: "Jason Dagana" }],
  creator: "Jason Dagana",
  publisher: "Jason Dagana",
  alternates: { canonical: "/" },
  verification: {
    google: "lZvAz-lpap2WR0I_fdOL8OxxBJydev3LR6up968F3wU",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Jason Dagana | Full-Stack Developer & Web Designer",
    description:
      "Explore the web applications, projects, and digital experiences built by full-stack developer Jason Dagana.",
    type: "website",
    url: siteUrl,
    siteName: "Jason Dagana",
    locale: "en_NG",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Dagana | Full-Stack Developer & Web Designer",
    description:
      "Explore the web applications, projects, and digital experiences built by full-stack developer Jason Dagana.",
    creator: "@DaganaJason",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientShell>{children}</ClientShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
