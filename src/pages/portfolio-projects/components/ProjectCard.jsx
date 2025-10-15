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
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'archived':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div 
      className={`group relative bg-[#2a363c]/80 border border-border rounded-lg overflow-hidden transition-all duration-normal hover:shadow-lg hover:border-primary/20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
        />
        
        {/* Overlay on Hover */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-3 transition-opacity duration-normal ${
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
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project?.status)}`}>
            {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)?.replace('-', ' ')}
          </span>
        </div>
      </div>
      {/* Project Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-fast">
            {project?.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project?.description}
          </p>
        </div>

        {/* Technology Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project?.technologies?.slice(0, 4)?.map((tech, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
              >
                <Icon name={getTechIcon(tech)} size={12} />
                <span>{tech}</span>
              </div>
            ))}
            {project?.technologies?.length > 4 && (
              <div className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                +{project?.technologies?.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{project?.completedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{project?.duration}</span>
            </div>
          </div>
          {project?.featured && (
            <div className="flex items-center space-x-1 text-accent">
              <Icon name="Star" size={12} />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(project)}
          className="group-hover:border-primary group-hover:text-primary"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;