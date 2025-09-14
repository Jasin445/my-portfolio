import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  className = '' 
}) => {
  const sortOptions = [
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'title', label: 'Title', icon: 'AlphabeticalSort' },
    { value: 'technology', label: 'Technology', icon: 'Code' },
    { value: 'status', label: 'Status', icon: 'Activity' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle order if same sort field
      onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New sort field, default to ascending
      onSortChange(newSortBy, 'asc');
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Sort Controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        <div className="flex items-center space-x-1">
          {sortOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={sortBy === option?.value ? 'default' : 'ghost'}
              size="sm"
              iconName={option?.icon}
              iconPosition="left"
              onClick={() => handleSortChange(option?.value)}
              className="text-xs"
            >
              {option?.label}
              {sortBy === option?.value && (
                <Icon 
                  name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                  size={12} 
                  className="ml-1"
                />
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* View Mode Toggle */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        {viewModes?.map((mode) => (
          <Button
            key={mode?.value}
            variant={viewMode === mode?.value ? 'default' : 'ghost'}
            size="sm"
            iconName={mode?.icon}
            onClick={() => onViewModeChange(mode?.value)}
            className="w-8 h-8 p-0"
            aria-label={mode?.label}
          />
        ))}
      </div>
    </div>
  );
};

export default SortControls;