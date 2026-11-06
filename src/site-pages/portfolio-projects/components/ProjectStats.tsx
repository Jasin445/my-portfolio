import React from 'react';
import Icon from '../../../components/AppIcon';
import type { Project } from "../../../types/project";
import type { AppIconName } from "../../../components/AppIcon";

interface ProjectStatsProps {
  projects: Project[];
  className?: string;
}

const ProjectStats = ({ projects, className = '' }: ProjectStatsProps) => {
  const stats = [
    {
      label: 'Total Projects',
      value: projects?.length,
      icon: 'FolderOpen' as AppIconName,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Completed',
      value: projects?.filter(p => p?.status === 'completed')?.length,
      icon: 'CheckCircle' as AppIconName,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'In Progress',
      value: projects?.filter(p => p?.status === 'in-progress')?.length,
      icon: 'Clock' as AppIconName,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Technologies',
      value: [...new Set(projects.flatMap(p => p.technologies))]?.length,
      icon: 'Code' as AppIconName,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-fast"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;