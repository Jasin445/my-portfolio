import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectListItem = ({ project, onViewDetails, className = '' }) => {
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
    <div className={`bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/20 transition-all duration-normal ${className}`}>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Project Image */}
        <div className="sm:w-48 sm:flex-shrink-0">
          <div className="relative h-32 sm:h-24 overflow-hidden rounded-lg">
            <Image
              src={project?.image}
              alt={project?.title}
              className="w-full h-full object-cover"
            />
            {project?.featured && (
              <div className="absolute top-2 right-2">
                <Icon name="Star" size={16} className="text-accent" />
              </div>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              {/* Title and Status */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-fast">
                  {project?.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project?.status)} ml-3 flex-shrink-0`}>
                  {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)?.replace('-', ' ')}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                {project?.description}
              </p>

              {/* Technology Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project?.technologies?.slice(0, 6)?.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                  >
                    <Icon name={getTechIcon(tech)} size={12} />
                    <span>{tech}</span>
                  </div>
                ))}
                {project?.technologies?.length > 6 && (
                  <div className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                    +{project?.technologies?.length - 6} more
                  </div>
                )}
              </div>

              {/* Project Meta */}
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{project?.completedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{project?.duration}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:ml-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(project)}
              >
                View Details
              </Button>
              
              <div className="flex gap-2">
                {project?.liveUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    onClick={() => window.open(project?.liveUrl, '_blank')}
                    className="flex-1 sm:flex-none"
                  >
                    Live
                  </Button>
                )}
                {project?.githubUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Github"
                    onClick={() => window.open(project?.githubUrl, '_blank')}
                    className="flex-1 sm:flex-none"
                  >
                    Code
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListItem;