import React, { useState, useEffect, useRef } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import type { Project } from "../../../types/project";
import type { AppIconName } from "../../../components/AppIcon";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "next" | "prev") => void;
  hasNext: boolean;
  hasPrev: boolean;
}

type ProjectTab = "overview" | "technical" | "challenges";

const ProjectModal = ({
  project,
  isOpen,
  onClose,
  onNavigate,
  hasNext,
  hasPrev,
}: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");

  const [dragY, setDragY] = useState(0);
  const dragStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dragStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleTouchEnd = () => {
    if (dragY > 80) {
      setDragY(0);
      dragStartY.current = null;
      onClose();
    } else {
      setDragY(0);
      dragStartY.current = null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
      setActiveTab("overview");
      setDragY(0);
      dragStartY.current = null;
    } else {
      setDragY(0);
      dragStartY.current = null;
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e?.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrev) onNavigate("prev");
          break;
        case "ArrowRight":
          if (hasNext) onNavigate("next");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasNext, hasPrev, onNavigate, onClose]);

  if (!isOpen || !project) return null;
  const projectImages = project.images?.length ? project.images : [project.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === projectImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectImages.length - 1 : prev - 1,
    );
  };

  const getTechIcon = (tech: string): AppIconName => {
    const techIcons: Record<string, AppIconName> = {
      React: "Code2",
      "Vue.js": "Layers",
      Angular: "Triangle",
      "Node.js": "Server",
      Python: "FileCode",
      TypeScript: "FileType",
      JavaScript: "Braces",
      MongoDB: "Database",
      PostgreSQL: "Database",
      Express: "Zap",
      "Next.js": "ArrowRight",
      "Tailwind CSS": "Palette",
    };
    return techIcons?.[tech] || "Code";
  };

  const tabs: { id: ProjectTab; label: string; icon: AppIconName }[] = [
    { id: "overview", label: "Overview", icon: "Info" },
    { id: "technical", label: "Technical Details", icon: "Code" },
    { id: "challenges", label: "Challenges & Solutions", icon: "Lightbulb" },
  ];

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-backdrop {
          animation: fadeIn 0.2s ease forwards;
        }
        .modal-drawer {
          animation: slideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
        .modal-dialog {
          animation: scaleIn 0.25s ease forwards;
        }
      `}</style>

      <div className="fixed inset-0 z-60 flex items-end lg:items-center lg:justify-center lg:p-6 xl:p-8">
        {/* Backdrop */}
        <div
          className="modal-backdrop absolute inset-0 bg-[#05090d]/85 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Mobile: drawer from bottom — Desktop: centered dialog */}
        <div
          className={`
            modal-drawer lg:modal-dialog
            relative flex w-full flex-col overflow-hidden border border-white/10
            bg-[#111b22] text-slate-100 shadow-[0_35px_120px_-30px_rgba(0,0,0,0.9)]
            rounded-t-[1.5rem] max-h-[94vh]
            lg:rounded-[1.5rem] lg:max-w-7xl lg:max-h-[min(820px,88vh)]
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          style={{
            transform: `translateY(${dragY}px)`,
            transition: dragY === 0 ? "transform 0.3s ease" : "none",
          }}
        >
          {/* Drag handle — mobile only */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex cursor-grab justify-center pt-3 pb-2 lg:hidden"
          >
            <div className="h-1 w-10 rounded-full bg-white/25" />
          </div>

          {/* Header */}
          <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#131f27] px-4 py-3 sm:px-7 sm:py-5">
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
              <span className="hidden shrink-0 font-mono text-[0.6rem] uppercase leading-5 tracking-[0.2em] text-[#d7ff63] sm:block">
                Project<br />file
              </span>
              <span className="hidden h-9 w-px bg-white/10 sm:block" />
              <div className="min-w-0">
                <p className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.17em] text-[#0095ff]">
                  {project?.status || "Selected work"}
                </p>
                <h2 id="project-modal-title" className="truncate text-base font-semibold leading-tight tracking-[-0.03em] text-white sm:text-xl">
                  {project?.title}
                </h2>
              </div>
              {project?.featured && (
                <span className="hidden shrink-0 border border-[#d7ff63]/25 bg-[#d7ff63]/[0.08] px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#d7ff63] sm:block">
                  Featured
                </span>
              )}
            </div>

            <div className="ml-2 flex flex-shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("prev")}
                disabled={!hasPrev}
                aria-label="Previous project"
                className="h-9 w-9 border border-white/10 text-slate-300 hover:border-[#0095ff]/50 hover:text-white"
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("next")}
                disabled={!hasNext}
                aria-label="Next project"
                className="h-9 w-9 border border-white/10 text-slate-300 hover:border-[#0095ff]/50 hover:text-white"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>

              <div className="mx-1 h-5 w-px bg-white/10" />

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close project details"
                className="h-9 w-9 border border-white/10 text-slate-300 hover:border-[#d7ff63]/40 hover:text-white"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Body */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            {/* Project preview */}
            <div className="relative flex h-40 shrink-0 overflow-hidden border-b border-white/10 bg-[#091117] sm:h-56 lg:h-auto lg:w-[46%] lg:border-b-0 lg:border-r">
              <div className="relative h-full w-full">
                <Image
                  src={projectImages[currentImageIndex]}
                  alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-contain"
                />

                {projectImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous project image"
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/80"
                    >
                      <Icon name="ChevronLeft" size={18} />
                    </button>

                    <button
                      type="button"
                      aria-label="Next project image"
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/80"
                    >
                      <Icon name="ChevronRight" size={18} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {projectImages.map((_, index) => (
                        <button
                          type="button"
                          key={index}
                          aria-label={`Show project image ${index + 1}`}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? "bg-[#d7ff63]"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <span className="pointer-events-none absolute bottom-3 left-4 z-20 border border-white/15 bg-[#081117]/80 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm">
                Project visual
              </span>
            </div>

            {/* Case study details */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:w-[54%]">
              {/* Tabs */}
              <div className="flex flex-shrink-0 overflow-x-auto border-b border-white/10 bg-[#131f27]">
                {tabs?.map((tab) => (
                  <button
                    type="button"
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex flex-shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-[0.68rem] font-medium whitespace-nowrap transition-colors sm:px-5 sm:text-xs ${
                      activeTab === tab?.id
                        ? "border-[#0095ff] text-[#7fcaff]"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon name={tab?.icon} size={14} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab content — scrollable */}
              <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#0095ff]">
                        The brief
                      </p>
                      <h3 className="mb-3 text-xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-2xl">
                        Built to solve a real problem.
                      </h3>
                      <p className="whitespace-pre-line text-xs leading-6 text-slate-300 sm:text-sm sm:leading-7">
                        {project?.fullDescription || project?.description}
                      </p>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-white">
                          Built with
                        </h3>
                        <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-slate-500">
                          {project?.technologies?.length ?? 0} technologies
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {project?.technologies?.map((tech, index) => (
                          <div
                            key={index}
                            className="flex min-w-0 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] p-2.5"
                          >
                            <Icon
                              name={getTechIcon(tech)}
                              size={15}
                              className="flex-shrink-0 text-[#0095ff]"
                            />
                            <span className="truncate text-[0.65rem] font-medium text-slate-200 sm:text-xs">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-4">
                      {project?.duration && (
                        <div>
                          <h4 className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-slate-500">
                            Duration
                          </h4>
                          <p className="text-xs text-slate-200">{project.duration}</p>
                        </div>
                      )}
                      {project?.completedDate && (
                        <div>
                          <h4 className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-slate-500">
                            Completed
                          </h4>
                          <p className="text-xs text-slate-200">{project.completedDate}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {(project?.documentationUrl || project?.liveUrl) && (
                        <Button
                          variant="default"
                          iconName="ExternalLink"
                          iconPosition="left"
                          onClick={() =>
                            window.open(project?.documentationUrl ?? project?.liveUrl, "_blank")
                          }
                        >
                          {project?.documentationUrl ? "Documentation" : "Live Demo"}
                        </Button>
                      )}
                      {project?.githubUrl && (
                        <Button
                          variant="outline"
                          iconName="Github"
                          iconPosition="left"
                          onClick={() =>
                            window.open(project?.githubUrl, "_blank")
                          }
                        >
                          View Code
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "technical" && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-white sm:text-base">
                        Architecture
                      </h3>
                      <p className="mb-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        {project?.architecture || project?.fullDescription || project?.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-white sm:text-base">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {project?.keyFeatures?.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon
                              name="Check"
                              size={15}
                              className="mt-0.5 flex-shrink-0 text-[#d7ff63]"
                            />
                            <span className="text-xs text-slate-300 sm:text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project?.codeSnippet && (
                      <div className="mt-5">
                        <h3 className="mb-2 text-sm font-semibold text-white sm:text-base">
                          Code Example
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#091117] p-3 sm:p-4">
                          <pre className="text-xs text-slate-200 sm:text-sm">
                            <code>{project?.codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "challenges" && (
                  <div className="space-y-4">
                    {project?.challenges?.map((challenge, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
                      >
                        <div className="mb-2 flex items-start gap-2">
                          <Icon
                            name="AlertCircle"
                            size={15}
                            className="mt-0.5 flex-shrink-0 text-[#0095ff]"
                          />
                          <h4 className="text-xs font-semibold text-white sm:text-sm">
                            {String(index + 1).padStart(2, "0")} / The challenge
                          </h4>
                        </div>
                        <p className="mb-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
                          {challenge?.problem}
                        </p>
                        <div className="flex items-start gap-2">
                          <Icon
                            name="CheckCircle"
                            size={15}
                            className="mt-0.5 flex-shrink-0 text-[#d7ff63]"
                          />
                          <div>
                            <h5 className="mb-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#d7ff63]">
                              How I solved it
                            </h5>
                            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                              {challenge?.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;