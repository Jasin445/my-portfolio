# Jason Dagana Portfolio

A portfolio site built with Next.js, React, and Tailwind CSS.

## Requirements

- Node.js 18.18 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

The local development server runs at `http://localhost:3000`.

## Routes

- `/` — Home
- `/projects` — Projects
- `/my-articles` — Articles
- `/contact-connect` — Contact
- `/about-professional` — About

Static files are served from `public/`; for example, `public/assets/logo.png`
is available at `/assets/logo.png`.

## Environment variables

Create a `.env.local` file in the project root and configure any services you
use:

```text
NEXT_PUBLIC_BACKEND_URL=
HASHNODE_PUBLICATION_HOST=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
```

`HASHNODE_PUBLICATION_HOST` accepts a Hashnode domain or full URL and defaults
to `jasondee.hashnode.dev`. Articles are loaded from the publication's public
RSS feed, so no Hashnode API key or Pro plan is needed. Existing deployments may
continue using `NEXT_PUBLIC_MY_HASHNODE_URL` until migrating to the server-only
host variable.

The remaining `NEXT_PUBLIC_*` variables are public client-side configuration
values. Existing Vite deployments should rename corresponding `VITE_*`
variables to `NEXT_PUBLIC_*`.

## Production

```bash
npm run build
npm start
```

Vercel detects the Next.js framework and deploys the app using its standard
Next.js build output.
