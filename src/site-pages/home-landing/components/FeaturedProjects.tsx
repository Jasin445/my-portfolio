import Link from "next/link";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { mockProjects } from "../../../data";
import { getProjectSlug } from "../../../lib/projects";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { RevealSection, TiltCard } from "../../../utils/animation.utils";
import usePerformanceGuard from "../../../hooks/usePerformanceGuard";

const DIRECTIONS = ["up", "down", "right", "left"] as const;

const FeaturedProjects = () => {
  const featuredProjects = useMemo(
    () => mockProjects?.filter((p) => p?.featured).slice(0, 4) ?? [],
    [],
  );

  const router = useRouter();

  const { animationsActive } = usePerformanceGuard();

  const handleOpenProject = (projectSlug: string) => router.push(`/projects/${projectSlug}`);

  return (
    <section
      id="featuredProjects"
      className="scroll-mt-14 relative h-full overflow-hidden py-20 sm:py-28"
    >
      <div className="relative mx-auto h-full w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        <RevealSection direction="up">
          <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-primary sm:text-[0.65rem] sm:tracking-[0.17em]">
                <Icon name="Code" size={14} />
                A few things I&apos;ve brought to life
              </p>
              <h2 className="text-4xl font-semibold leading-[0.9] tracking-[-0.075em] text-[#f5f2e9] sm:text-6xl">
                Selected <span className="text-cyan-100/55">work.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-400 sm:text-right">
              Digital products built around real problems, thoughtful details,
              and the people using them.
            </p>
          </div>
        </RevealSection>

        <div className="mb-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {featuredProjects.map((project, index) => {
            const direction = DIRECTIONS[index % DIRECTIONS.length];
            return (
              <RevealSection
                className="h-full"
                direction={direction}
                key={project?.id}
              >
                <TiltCard active={animationsActive}>
                  <article className="project-art-card group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/10 text-secondary shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)] transition duration-500 sm:hover:-translate-y-2 sm:hover:shadow-[0_36px_100px_-44px_rgba(45,133,209,0.28)]">
                    <div className="relative h-56 shrink-0 overflow-hidden border-b border-white/10 sm:h-72">
                      <Image
                        src={project?.image}
                        alt={`Screenshot of ${project?.title} project`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] via-[#07101d]/5 to-[#07101d]/15" />
                      <div className="absolute inset-0 bg-[#06101f]/15 transition-colors duration-500 group-hover:bg-transparent" />
                      <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-3 sm:p-5">
                        <span className="max-w-full border border-white/20 bg-[#06101f]/80 px-2 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-white/85 backdrop-blur-sm sm:px-3 sm:text-[0.58rem] sm:tracking-[0.15em]">
                          Selected work / {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex max-w-full items-center gap-2 border border-white/15 bg-[#06101f]/70 px-2 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.08em] text-white/80 backdrop-blur-sm sm:px-3 sm:text-[0.58rem] sm:tracking-[0.12em]">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {project?.status}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:gap-4 sm:p-7">
                        <div>
                          <p className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#7fcaff]">
                            Case study
                          </p>
                          <h3 className="line-clamp-2 max-w-[24ch] text-xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-3xl">
                            {project?.title}
                          </h3>
                        </div>
                        <button
                          type="button"
                          aria-label={`View details for ${project?.title}`}
                          onClick={() => handleOpenProject(getProjectSlug(project))}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-[#131b21] text-white transition duration-300 hover:rotate-45 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <ArrowUpRight size={19} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-7">
                      <div className="mb-5 flex items-start justify-between gap-5">
                        <p className="line-clamp-3 text-xs leading-6 text-slate-300/80 sm:text-sm">
                          {project?.description}
                        </p>
                      </div>

                      <div className="mb-6 flex flex-wrap gap-2">
                        {project?.technologies?.slice(0, 5)?.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[0.58rem] tracking-wide text-slate-300/75 transition duration-200 hover:border-[#0095ff]/40 hover:text-[#7fcaff]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                        <div className="flex w-full flex-wrap gap-1 sm:w-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="ArrowRight"
                            iconPosition="left"
                            className="!px-2 text-[0.68rem] !text-slate-200 hover:!text-primary sm:text-xs"
                            onClick={() => handleOpenProject(getProjectSlug(project))}
                          >
                            Open case file
                          </Button>

                          {project?.liveUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="ExternalLink"
                              iconPosition="left"
                              className="text-xs text-slate-300 opacity-80 hover:opacity-100 hover:text-[#7fcaff]"
                              onClick={() => window.open(project.liveUrl, "_blank")}
                            >
                              Live Demo
                            </Button>
                          )}
                        </div>

                        <span className="hidden font-mono text-[0.56rem] uppercase tracking-[0.16em] text-slate-500 sm:block">
                          Built with intent
                        </span>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </RevealSection>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" iconName="ArrowRight" iconPosition="right" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
