import React from 'react';
import BlogCard from './BlogCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BlogGrid = ({ 
  articles = [], 
  loading = false, 
  hasMore = false, 
  onLoadMore,
  className = '' 
}) => {
  if (loading && articles?.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Loading Skeleton */}
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted" />
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-4 bg-muted rounded w-16" />
              </div>
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded w-16" />
                <div className="h-6 bg-muted rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles?.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Articles Found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
        <Button variant="outline" onClick={() => window.location?.reload()}>
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {articles?.map((article) => (
          <BlogCard 
            key={article?.id} 
            article={article}
          />
        ))}
      </div>
      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={loading}
            loading={loading}
            className="min-w-32"
          >
            {loading ? 'Loading...' : 'Load More Articles'}
          </Button>
        </div>
      )}
      {/* Articles Count */}
      <div className="text-center mt-8 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {articles?.length} articles
          {hasMore && ' • More available'}
        </p>
      </div>
    </div>
  );
};

export default BlogGrid;