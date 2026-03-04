import React, { useState, useEffect, useRef } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProjectModal = ({
  project,
  isOpen,
  onClose,
  onNavigate,
  hasNext,
  hasPrev,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  const [dragY, setDragY] = useState(0);
  const dragStartY = useRef(null);

  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
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
      setIframeLoading(true);
      setDragY(0);
      dragStartY.current = null;
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
      setDragY(0);
      dragStartY.current = null;
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
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

  useEffect(() => {
    if (project?.liveUrl) {
      setIframeLoading(true);
    }
  }, [project?.liveUrl]);

  if (!isOpen || !project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project?.images?.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project?.images?.length - 1 : prev - 1,
    );
  };

  const getTechIcon = (tech) => {
    const techIcons = {
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

  const tabs = [
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

      <div className="fixed inset-0 z-50 flex items-end lg:items-center lg:justify-center lg:p-6 xl:p-8">
        {/* Backdrop */}
        <div
          className="modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Mobile: drawer from bottom — Desktop: centered dialog */}
        <div
          className={`
            modal-drawer lg:modal-dialog
            relative w-full bg-background shadow-2xl overflow-hidden flex flex-col
            rounded-t-2xl max-h-[82vh]
            lg:rounded-lg lg:max-w-6xl lg:max-h-[75vh]
          `}
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
            className="flex justify-center pt-3 pb-1 lg:hidden cursor-grab"
          >
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-border">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <h2 className="text-base sm:text-2xl font-semibold text-foreground truncate">
                {project?.title}
              </h2>
              {project?.featured && (
                <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20">
                  Featured
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("prev")}
                disabled={!hasPrev}
                className="w-8 h-8"
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("next")}
                disabled={!hasNext}
                className="w-8 h-8"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>

              <div className="w-px h-5 bg-border mx-1" />

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="w-8 h-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
            {/* Image / iframe panel — hidden on mobile & tablet, shown lg+ only */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-muted border-r border-border">
              {project?.liveUrl ? (
                <>
                  {iframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-9 h-9 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <p className="text-sm text-muted-foreground">
                          Loading preview...
                        </p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={project.liveUrl}
                    title={project?.title}
                    style={{ backgroundColor: "white" }}
                    className="w-full h-full"
                    loading="lazy"
                    sandbox="allow-scripts allow-forms allow-same-origin"
                    onLoad={() => setIframeLoading(false)}
                    onError={() => setIframeLoading(false)}
                  />
                </>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={project?.images?.[currentImageIndex]}
                    alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {project?.images?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <Icon name="ChevronLeft" size={18} />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <Icon name="ChevronRight" size={18} />
                      </button>

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {project?.images?.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Details panel — full width on mobile, half on lg */}
            <div className="flex-1 lg:w-1/2 flex flex-col overflow-hidden min-h-0">
              {/* Tabs */}
              <div className="flex-shrink-0 flex border-b border-border overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                      activeTab === tab?.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon name={tab?.icon} size={14} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab content — scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                {activeTab === "overview" && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                        Description
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {project?.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                        Technology Stack
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {project?.technologies?.map((tech, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2.5 bg-muted rounded-lg"
                          >
                            <Icon
                              name={getTechIcon(tech)}
                              size={15}
                              className="text-primary flex-shrink-0"
                            />
                            <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                          Duration
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {project?.duration || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                          Completed
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {project?.completedDate || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project?.liveUrl && (
                        <Button
                          variant="default"
                          iconName="ExternalLink"
                          iconPosition="left"
                          onClick={() =>
                            window.open(project?.liveUrl, "_blank")
                          }
                        >
                          Live Demo
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
                      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                        Architecture
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                        {project?.architecture}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {project?.keyFeatures?.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon
                              name="Check"
                              size={15}
                              className="text-success mt-0.5 flex-shrink-0"
                            />
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project?.codeSnippet && (
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                          Code Example
                        </h3>
                        <div className="bg-muted rounded-lg p-3 sm:p-4 overflow-x-auto">
                          <pre className="text-xs sm:text-sm text-foreground">
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
                        className="border border-border rounded-lg p-3 sm:p-4"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <Icon
                            name="AlertCircle"
                            size={15}
                            className="text-warning mt-0.5 flex-shrink-0"
                          />
                          <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                            Challenge {index + 1}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                          {challenge?.problem}
                        </p>
                        <div className="flex items-start gap-2">
                          <Icon
                            name="CheckCircle"
                            size={15}
                            className="text-success mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <h5 className="text-xs sm:text-sm font-medium text-foreground mb-1">
                              Solution
                            </h5>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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