import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CategoryTags = ({ 
  categories = [], 
  selectedCategory = '', 
  onCategorySelect,
  className = '' 
}) => {
  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? '' : category;
    onCategorySelect?.(newCategory);
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* All Categories Button */}
      <Button
        variant={selectedCategory === '' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleCategoryClick('')}
        className="transition-all duration-fast"
      >
        <Icon name="Grid3X3" size={14} className="mr-2" />
        All Categories
      </Button>
      {/* Category Buttons */}
      {categories?.map((category) => (
        <Button
          key={category?.value}
          variant={selectedCategory === category?.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleCategoryClick(category?.value)}
          className="transition-all duration-fast"
        >
          <Icon name={category?.icon || 'Tag'} size={14} className="mr-2" />
          {category?.label}
          <span className="ml-2 px-2 py-0.5 bg-current/10 text-current text-xs rounded-full">
            {category?.count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryTags;