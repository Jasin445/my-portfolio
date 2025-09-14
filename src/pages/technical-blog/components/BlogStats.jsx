import React from 'react';
import Icon from '../../../components/AppIcon';

const BlogStats = ({ stats, className = '' }) => {
  const statItems = [
    {
      id: 'totalArticles',
      label: 'Total Articles',
      value: stats?.totalArticles,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'totalViews',
      label: 'Total Views',
      value: stats?.totalViews?.toLocaleString(),
      icon: 'Eye',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'avgReadTime',
      label: 'Avg. Read Time',
      value: `${stats?.avgReadTime} min`,
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'categories',
      label: 'Categories',
      value: stats?.categories,
      icon: 'Tag',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {statItems?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-fast"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={18} className={stat?.color} />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogStats;