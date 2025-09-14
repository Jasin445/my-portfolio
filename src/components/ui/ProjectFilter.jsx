import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const ProjectFilter = ({ 
  onFilterChange, 
  onSearchChange, 
  activeFilters = [], 
  searchQuery = '',
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filterCategories = [
    {
      id: 'technology',
      label: 'Technology',
      options: [
        { value: 'react', label: 'React', count: 12 },
        { value: 'vue', label: 'Vue.js', count: 8 },
        { value: 'angular', label: 'Angular', count: 6 },
        { value: 'nodejs', label: 'Node.js', count: 10 },
        { value: 'python', label: 'Python', count: 7 },
        { value: 'typescript', label: 'TypeScript', count: 15 }
      ]
    },
    {
      id: 'type',
      label: 'Project Type',
      options: [
        { value: 'web-app', label: 'Web Application', count: 18 },
        { value: 'mobile-app', label: 'Mobile App', count: 9 },
        { value: 'api', label: 'API/Backend', count: 12 },
        { value: 'library', label: 'Library/Package', count: 5 },
        { value: 'website', label: 'Website', count: 14 }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'completed', label: 'Completed', count: 35 },
        { value: 'in-progress', label: 'In Progress', count: 8 },
        { value: 'archived', label: 'Archived', count: 12 }
      ]
    }
  ];

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange?.(localSearch);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearch, onSearchChange]);

  const handleFilterToggle = (categoryId, value) => {
    const filterId = `${categoryId}:${value}`;
    const newFilters = activeFilters?.includes(filterId)
      ? activeFilters?.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange?.([]);
    setLocalSearch('');
  };

  const isFilterActive = (categoryId, value) => {
    return activeFilters?.includes(`${categoryId}:${value}`);
  };

  const activeFilterCount = activeFilters?.length + (localSearch ? 1 : 0);

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filter Projects</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="transition-transform duration-fast"
            />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`transition-all duration-slow overflow-hidden ${
        isExpanded || window.innerWidth >= 1024 
          ? 'max-h-none opacity-100' :'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'
      }`}>
        <div className="p-4 space-y-6">
          {/* Search Input */}
          <div>
            <Input
              type="search"
              placeholder="Search projects..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e?.target?.value)}
              className="w-full"
              iconName="Search"
            />
          </div>

          {/* Filter Categories */}
          {filterCategories?.map((category) => (
            <div key={category?.id} className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">
                {category?.label}
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {category?.options?.map((option) => {
                  const isActive = isFilterActive(category?.id, option?.value);
                  
                  return (
                    <button
                      key={option?.value}
                      onClick={() => handleFilterToggle(category?.id, option?.value)}
                      className={`flex items-center justify-between p-3 rounded-md text-left transition-all duration-fast border ${
                        isActive
                          ? 'bg-primary/5 border-primary/20 text-primary' :'bg-background border-border hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {option?.label}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isActive
                          ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                      }`}>
                        {option?.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;