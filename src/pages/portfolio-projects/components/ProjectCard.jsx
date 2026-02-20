import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTechIcon = (tech) => {
    const techIcons = {
      'React': 'Code2',
      'Vue.js': 'Layers',
      'Angular': 'Triangle',
      'Node.js': 'Server',
      'Python': 'FileCode',
      'TypeScript': 'FileType',
      'JavaScript': 'Braces',
      'MongoDB': 'Database',
      'PostgreSQL': 'Database',
      'Express': 'Zap',
      'Next.js': 'ArrowRight',
      'Tailwind CSS': 'Palette'
    };
    return techIcons?.[tech] || 'Code';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'in-progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'archived':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div
      className={`group relative bg-[#2a363c]/80 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Persistent bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a363c]/90 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {project?.liveUrl && (
            <Button
              variant="secondary"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.liveUrl, '_blank');
              }}
            >
              Live Demo
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
                window.open(project?.githubUrl, '_blank');
              }}
            >
              Code
            </Button>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border backdrop-blur-sm tracking-wide ${getStatusColor(project?.status)}`}>
            {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)?.replace('-', ' ')}
          </span>
        </div>

        {/* Featured badge */}
        {project?.featured && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
              <Icon name="Star" size={10} />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-5">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300 leading-snug">
            {project?.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {project?.description}
          </p>
        </div>

        {/* Technology Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {project?.technologies?.slice(0, 4)?.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/8 rounded-md text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors duration-200"
              >
                <Icon name={getTechIcon(tech)} size={10} />
                <span>{tech}</span>
              </div>
            ))}
            {project?.technologies?.length > 4 && (
              <div className="px-2 py-1 bg-white/5 border border-white/8 rounded-md text-[11px] font-medium text-muted-foreground">
                +{project?.technologies?.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-4" />

        {/* Project Stats */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-4">
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
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(project)}
          className="group-hover:border-primary group-hover:text-primary transition-colors duration-300 rounded-xl text-xs"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;