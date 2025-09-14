import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BlogFilter = ({ 
  onFilterChange, 
  onSearchChange, 
  activeFilters = [], 
  searchQuery = '',
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterCategories = [
    {
      id: 'category',
      label: 'Categories',
      options: [
        { value: 'react', label: 'React', count: 15 },
        { value: 'javascript', label: 'JavaScript', count: 12 },
        { value: 'typescript', label: 'TypeScript', count: 8 },
        { value: 'nodejs', label: 'Node.js', count: 10 },
        { value: 'web-development', label: 'Web Development', count: 18 },
        { value: 'performance', label: 'Performance', count: 6 },
        { value: 'testing', label: 'Testing', count: 7 },
        { value: 'devops', label: 'DevOps', count: 5 }
      ]
    },
    {
      id: 'type',
      label: 'Article Type',
      options: [
        { value: 'tutorial', label: 'Tutorial', count: 22 },
        { value: 'guide', label: 'Guide', count: 14 },
        { value: 'opinion', label: 'Opinion', count: 8 },
        { value: 'case-study', label: 'Case Study', count: 6 },
        { value: 'news', label: 'News & Updates', count: 12 }
      ]
    },
    {
      id: 'difficulty',
      label: 'Difficulty Level',
      options: [
        { value: 'beginner', label: 'Beginner', count: 18 },
        { value: 'intermediate', label: 'Intermediate', count: 25 },
        { value: 'advanced', label: 'Advanced', count: 12 }
      ]
    },
    {
      id: 'readTime',
      label: 'Reading Time',
      options: [
        { value: 'quick', label: 'Quick Read (< 5 min)', count: 16 },
        { value: 'medium', label: 'Medium (5-10 min)', count: 28 },
        { value: 'long', label: 'Long Read (> 10 min)', count: 11 }
      ]
    }
  ];

  const handleFilterToggle = (categoryId, value) => {
    const filterId = `${categoryId}:${value}`;
    const newFilters = activeFilters?.includes(filterId)
      ? activeFilters?.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange?.([]);
    onSearchChange?.('');
  };

  const isFilterActive = (categoryId, value) => {
    return activeFilters?.includes(`${categoryId}:${value}`);
  };

  const activeFilterCount = activeFilters?.length + (searchQuery ? 1 : 0);

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filter Articles</h3>
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
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Filter Categories */}
          {filterCategories?.map((category) => (
            <div key={category?.id} className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">
                {category?.label}
              </h4>
              
              <div className="space-y-2">
                {category?.options?.map((option) => {
                  const isActive = isFilterActive(category?.id, option?.value);
                  
                  return (
                    <button
                      key={option?.value}
                      onClick={() => handleFilterToggle(category?.id, option?.value)}
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left transition-all duration-fast border ${
                        isActive
                          ? 'bg-primary/5 border-primary/20 text-primary' :'bg-background border-transparent hover:bg-muted text-muted-foreground hover:text-foreground'
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

export default BlogFilter;