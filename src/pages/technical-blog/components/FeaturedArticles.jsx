import React from 'react';
import BlogCard from './BlogCard';
import Icon from '../../../components/AppIcon';

const FeaturedArticles = ({ articles = [], className = '' }) => {
  if (!articles?.length) return null;

  return (
    <section className={`mb-12 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Star" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Featured Articles</h2>
          <p className="text-muted-foreground">Handpicked content showcasing the latest insights and tutorials</p>
        </div>
      </div>
      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Featured Article */}
        <div className="lg:row-span-2">
          <BlogCard 
            article={articles?.[0]} 
            featured={true}
            className="h-full"
          />
        </div>

        {/* Secondary Featured Articles */}
        <div className="space-y-6">
          {articles?.slice(1, 3)?.map((article) => (
            <BlogCard 
              key={article?.id} 
              article={article}
              className="h-auto"
            />
          ))}
        </div>
      </div>
      {/* Featured Stats */}
      <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {articles?.reduce((sum, article) => sum + article?.views, 0)?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {Math.round(articles?.reduce((sum, article) => sum + article?.readTime, 0) / articles?.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Read Time (min)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {articles?.length}
            </div>
            <div className="text-sm text-muted-foreground">Featured Articles</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;