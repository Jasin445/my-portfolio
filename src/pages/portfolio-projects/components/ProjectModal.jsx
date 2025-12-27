import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
      setActiveTab("overview");
      setIframeLoading(true); // Reset loading state when modal opens
    } else {
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

  // Reset loading state when project changes
  useEffect(() => {
    if (project?.liveUrl) {
      setIframeLoading(true);
    }
  }, [project?.liveUrl]);

  if (!isOpen || !project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project?.images?.length - 1 : prev - 1
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[90vh] mx-4 bg-background rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-foreground">
              {project?.title}
            </h2>
            {project?.featured && (
              <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Navigation Arrows */}
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

            <div className="w-px h-6 bg-border mx-2" />

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

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Image Gallery */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-64 lg:h-full">
              {project?.liveUrl ? (
                <>
                  {/* Loading Spinner */}
                  {iframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <p className="text-sm text-muted-foreground">Loading preview...</p>
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
                <Image
                  src={project?.images?.[currentImageIndex]}
                  alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              {project?.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-fast"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-fast"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {project?.images?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-fast ${
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
          </div>

          {/* Project Details */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-fast ${
                    activeTab === tab?.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project?.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Technology Stack
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {project?.technologies?.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
                        >
                          <Icon
                            name={getTechIcon(tech)}
                            size={16}
                            className="text-primary"
                          />
                          <span className="text-sm font-medium text-foreground">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Duration
                      </h4>
                      <p className="text-muted-foreground">
                        {project?.duration}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Completed
                      </h4>
                      <p className="text-muted-foreground">
                        {project?.completedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    {project?.liveUrl && (
                      <Button
                        variant="default"
                        iconName="ExternalLink"
                        iconPosition="left"
                        onClick={() => window.open(project?.liveUrl, "_blank")}
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
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Architecture
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {project?.architecture}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project?.keyFeatures?.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon
                            name="Check"
                            size={16}
                            className="text-success mt-0.5 flex-shrink-0"
                          />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project?.codeSnippet && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Code Example
                      </h3>
                      <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-foreground">
                          <code>{project?.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "challenges" && (
                <div className="space-y-6">
                  {project?.challenges?.map((challenge, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        <Icon
                          name="AlertCircle"
                          size={16}
                          className="text-warning mt-0.5 flex-shrink-0"
                        />
                        <h4 className="text-sm font-semibold text-foreground">
                          Challenge {index + 1}
                        </h4>
                      </div>
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {challenge?.problem}
                      </p>
                      <div className="flex items-start space-x-3">
                        <Icon
                          name="CheckCircle"
                          size={16}
                          className="text-success mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-1">
                            Solution
                          </h5>
                          <p className="text-muted-foreground leading-relaxed">
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
  );
};

export default ProjectModal;