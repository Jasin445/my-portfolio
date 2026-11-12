import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Code2, ExternalLink, Github, Sparkles } from "lucide-react";
import Header from "../../../components/ui/Header";
import Footer from "../../../components/Footer";
import { mockProjects } from "../../../data";
import { createPageMetadata } from "../../../lib/seo";
import { getProjectImages, getProjectSlug } from "../../../lib/projects";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return mockProjects.map((project) => ({ id: getProjectSlug(project) }));
}

function findProject(id: string) {
  return mockProjects.find(
    (project) => getProjectSlug(project) === id || String(project.id) === id,
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = findProject(id);
  if (!project) return createPageMetadata({ title: "Project not found", description: "This project could not be found.", path: `/projects/${id}` });
  const projectImages = getProjectImages(project);
  return createPageMetadata({
    title: `${project.title} — Case Study`,
    description: project.description,
    path: `/projects/${getProjectSlug(project)}`,
    keywords: [project.title, ...project.technologies, "web development case study"],
    images: projectImages.map((image, index) => ({
      url: image.startsWith("/") ? image : `/${image}`,
      alt: `${project.title} project preview ${index + 1}`,
    })),
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = findProject(id);
  if (!project) notFound();

  if (/^\d+$/.test(id)) permanentRedirect(`/projects/${getProjectSlug(project)}`);

  const images = getProjectImages(project);


  const galleryCss = images
    .map(
      (_, i) =>
        `#project-gallery:has(#shot-${i}:checked) [data-shot="${i}"]{display:grid}` +
        `#project-gallery:has(#shot-${i}:checked) [data-thumb="${i}"]{border-color:rgb(165 243 252 / .9);opacity:1}` +
        `#project-gallery:has(#shot-${i}:focus-visible) [data-thumb="${i}"]{outline:2px solid rgb(165 243 252);outline-offset:2px}`,
    )
    .join("");

  const index = mockProjects.findIndex((item) => item.id === project.id);
  const previous = mockProjects[index - 1];
  const next = mockProjects[index + 1];
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.fullDescription || project.description,
    url: `https://jason-dagana.vercel.app/projects/${getProjectSlug(project)}`,
    image: images.map((image) =>
      new URL(image.startsWith("/") ? image : `/${image}`, "https://jason-dagana.vercel.app").toString(),
    ),
    creator: {
      "@type": "Person",
      name: "Jason Dagana",
      url: "https://jason-dagana.vercel.app/about-professional",
    },
    keywords: project.technologies.join(", "),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData).replace(/</g, "\\u003c") }}
      />
      <main className="portfolio-canvas relative isolate min-h-screen overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,149,255,0.16),transparent_68%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pt-32 sm:px-8 sm:pt-40">
          <Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-400 transition hover:text-cyan-100">
            <ArrowLeft size={15} className="transition group-hover:-translate-x-1" /> All projects
          </Link>

          <section className="relative mt-12 grid items-end gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1fr_auto] lg:pb-14">
            <div className="relative z-10">
              <p className="mb-5 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-200">
                <Sparkles size={13} /> Case study <span className="text-white/25">/</span> {String(index + 1).padStart(2, "0")}
              </p>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.075em] text-[#f5f2e9] sm:text-7xl lg:text-[6.5rem]">
                {project.title}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300/80 sm:text-lg sm:leading-8">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-[#07121b] transition hover:bg-white">Visit live site <ArrowUpRight size={16} /></a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/40"><Github size={16} /> Source <ExternalLink size={14} /></a>}
            </div>
          </section>

          {images.length > 0 && (
            <section id="project-gallery" className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#091117] shadow-[0_40px_120px_-55px_rgba(0,149,255,0.45)] sm:mt-12">
              <style dangerouslySetInnerHTML={{ __html: galleryCss }} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,149,255,0.13),transparent_60%)]" />

              {/* Hidden radio buttons hold the selected image. The first one is checked by default. */}
              {images.map((_, i) => (
                <input
                  key={`radio-${i}`}
                  type="radio"
                  name="project-gallery"
                  id={`shot-${i}`}
                  defaultChecked={i === 0}
                  className="sr-only"
                  aria-label={`Show ${project.title} view ${i + 1}`}
                />
              ))}

              {/* Large images: all are in the HTML, CSS shows only the selected one. */}
              {images.map((image, i) => (
                <div
                  key={`shot-${image}-${i}`}
                  data-shot={i}
                  className="relative hidden min-h-[320px] place-items-center p-5 sm:min-h-[500px] sm:p-10"
                >
                  <Image
                    src={image}
                    alt={`${project.title} preview ${i + 1}`}
                    width={1800}
                    height={1100}
                    sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1280px) calc(100vw - 4rem), 1200px"
                    priority={i === 0}
                    className="max-h-[68vh] w-full rounded-lg object-contain"
                  />
                  <span className="absolute bottom-4 left-4 border border-white/15 bg-[#081117]/80 px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-white/65 backdrop-blur">
                    Product view / {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}

              {/* Thumbnails: clicking one ticks its radio button. */}
              {images.length > 1 && (
                <div className="relative flex gap-3 overflow-x-auto border-t border-white/10 p-4">
                  {images.map((image, i) => (
                    <label
                      key={`thumb-${image}-${i}`}
                      htmlFor={`shot-${i}`}
                      data-thumb={i}
                      className="relative h-20 w-32 shrink-0 cursor-pointer overflow-hidden rounded border border-white/10 opacity-60 transition hover:opacity-100 sm:h-24 sm:w-40"
                    >
                      <Image src={image} alt={`${project.title} view ${i + 1}`} fill sizes="160px" className="object-cover" />
                    </label>
                  ))}
                </div>
              )}
            </section>
          )}

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
            <div className="space-y-14 sm:space-y-20">
              <section className="grid gap-5 sm:grid-cols-[150px_1fr]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-200">01 / Overview</p>
                <div><h2 className="mb-5 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">The brief, in context.</h2><p className="whitespace-pre-line text-sm leading-7 text-slate-300/75 sm:text-base sm:leading-8">{project.fullDescription || project.description}</p></div>
              </section>

              {project.architecture && <section className="grid gap-5 sm:grid-cols-[150px_1fr]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-200">02 / Approach</p>
                <div><h2 className="mb-5 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">A system built to work.</h2><p className="text-sm leading-7 text-slate-300/75 sm:text-base sm:leading-8">{project.architecture}</p></div>
              </section>}

              {!!project.keyFeatures?.length && <section className="grid gap-5 sm:grid-cols-[150px_1fr]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-200">03 / Highlights</p>
                <div><h2 className="mb-6 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">Details that matter.</h2><ul className="divide-y divide-white/10">{project.keyFeatures.map((feature, i) => <li key={feature} className="flex gap-4 py-4 text-sm leading-6 text-slate-300/80 sm:text-base"><span className="font-mono text-xs text-cyan-200/70">{String(i + 1).padStart(2, "0")}</span>{feature}</li>)}</ul></div>
              </section>}

              {!!project.challenges?.length && <section className="grid gap-5 sm:grid-cols-[150px_1fr]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-200">04 / Craft</p>
                <div><h2 className="mb-6 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">Making the hard parts clear.</h2><div className="space-y-4">{project.challenges.map((item, i) => <article key={item.problem} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-7"><p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-cyan-200">Challenge {String(i + 1).padStart(2, "0")}</p><h3 className="mb-4 text-lg font-medium leading-7 text-white">{item.problem}</h3><p className="flex gap-3 text-sm leading-7 text-slate-300/75"><Check size={16} className="mt-1 shrink-0 text-lime-300" />{item.solution}</p></article>)}</div></div>
              </section>}
            </div>

            <aside className="h-fit space-y-7 border-t border-white/10 pt-7 lg:sticky lg:top-28 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div><p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.17em] text-slate-500">Project notes</p><dl className="space-y-4 text-sm"><div><dt className="text-slate-500">Status</dt><dd className="mt-1 text-white">{project.status}</dd></div>{project.duration && <div><dt className="text-slate-500">Timeline</dt><dd className="mt-1 text-white">{project.duration}</dd></div>}{project.completedDate && <div><dt className="text-slate-500">Completed</dt><dd className="mt-1 text-white">{project.completedDate}</dd></div>}</dl></div>
              <div><p className="mb-3 flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.17em] text-slate-500"><Code2 size={13} /> Built with</p><div className="flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">{tech}</span>)}</div></div>
              <div className="border-t border-white/10 pt-5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-slate-500">Portfolio / Project {String(project.id).padStart(2, "0")}</div>
            </aside>
          </div>

          <nav className="mt-20 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            {previous ? <Link href={`/projects/${getProjectSlug(previous)}`} className="group rounded-2xl border border-white/10 p-5 transition hover:border-cyan-200/40"><span className="mb-3 block font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-500">← Previous project</span><span className="text-lg font-medium text-white transition group-hover:text-cyan-100">{previous.title}</span></Link> : <span />}
            {next && <Link href={`/projects/${getProjectSlug(next)}`} className="group rounded-2xl border border-white/10 p-5 text-left transition hover:border-cyan-200/40 sm:text-right"><span className="mb-3 block font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-500">Next project →</span><span className="text-lg font-medium text-white transition group-hover:text-cyan-100">{next.title}</span></Link>}
          </nav>
        </div>
      </main>
      <Footer lightweight />
    </>
  );
}