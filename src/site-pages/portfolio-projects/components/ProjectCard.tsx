import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import type { Project } from "../../../types/project";
import type { AppIconName } from "../../../components/AppIcon";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  className?: string;
}

const ProjectCard = ({ project, onViewDetails, className = "" }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "in-progress":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "archived":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div
      className={`project-art-card group relative z-20 overflow-hidden rounded-[1.25rem] border border-white/10 transition duration-500 sm:hover:-translate-y-1.5 sm:hover:shadow-[0_26px_70px_-32px_rgba(45,133,209,0.32)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden border-b border-white/10 sm:h-60">
        <Image
          src={project?.image}
          alt={project?.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
        />

        {/* Persistent bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] via-[#07101d]/5 to-[#07101d]/20" />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 bg-[#06101f]/85 transition-opacity duration-300 ${
            isHovered ? "hidden sm:flex sm:opacity-100" : "opacity-0"
          }`}
        >
          {(project?.documentationUrl || project?.liveUrl) && (
            <Button
              variant="secondary"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.documentationUrl ?? project?.liveUrl, "_blank");
              }}
            >
              {project?.documentationUrl ? "Documentation" : "Live Demo"}
            </Button>
          )}
          {project?.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              iconName="Github"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.githubUrl, "_blank");
              }}
            >
              Code
            </Button>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span
            className={`border bg-[#09111e] px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.13em] ${getStatusColor(project?.status)}`}
          >
            {project?.status?.charAt(0)?.toUpperCase() +
              project?.status?.slice(1)?.replace("-", " ")}
          </span>
          {project?.featured ? (
            <span className="flex items-center gap-1.5 border border-accent/30 bg-[#09111e] px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent">
              <Icon name="Star" className="fill-accent" size={10} />
              Selected
            </span>
          ) : (
            <span className="border border-white/20 bg-[#09111e] px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/75">
              Project
            </span>
          )}
        </div>

        <div className="absolute inset-x-5 bottom-5">
          <p className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.17em] text-primary-soft/90">
            Digital product / Case study
          </p>
          <h3 className="max-w-[24ch] text-xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-2xl">
            {project?.title}
          </h3>
        </div>
      </div>

      {/* Project Content */}
      <div className="relative p-5 sm:p-6">
        <div className="mb-5">
          <p className="line-clamp-3 text-xs leading-6 text-slate-300/80 sm:text-sm">
            {project?.description}
          </p>
        </div>

        {/* Technology Stack */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5">
            {project?.technologies?.slice(0, 4)?.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[0.58rem] text-slate-300/75 transition-colors duration-200 hover:border-cyan-100/30 hover:text-cyan-100"
              >
                <Icon name={getTechIcon(tech)} size={10} />
                <span>{tech}</span>
              </div>
            ))}
            {project?.technologies?.length > 4 && (
              <div className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[0.58rem] text-slate-400">
                +{project?.technologies?.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        {/* Project Stats */}
        <div className="mb-4 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-slate-400">
          <div className="flex items-center gap-3">
            {project?.completedDate && (
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={11} />
                <span>{project?.completedDate}</span>
              </div>
            )}
            {project?.duration && (
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={11} />
                <span>{project?.duration}</span>
              </div>
            )}
          </div>
          <span className="text-slate-500">
            Build / {String(project?.id).padStart(2, "0")}
          </span>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(project)}
          className="hover:border-primary hover:text-primary transition-colors duration-300 rounded-xl text-xs"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
