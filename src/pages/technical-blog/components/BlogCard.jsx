import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BlogCard = ({ article, featured = false, className = '' }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatReadTime = (minutes) => {
    return `${minutes} min read`;
  };

  const handleShare = (platform, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    const url = `${window.location?.origin}/technical-blog/${article?.slug}`;
    const text = `Check out this article: ${article?.title}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const cardClasses = featured
    ? 'group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-normal cursor-pointer'
    : 'group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-normal cursor-pointer';

  return (
    <article className={`${cardClasses} ${className}`}>
      <Link to={`/technical-blog/${article?.slug}`} className="block">
        {/* Article Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
          <Image
            src={article?.thumbnail}
            alt={article?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
              {article?.category}
            </span>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full backdrop-blur-sm flex items-center space-x-1">
                <Icon name="Star" size={12} />
                <span>Featured</span>
              </span>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="p-6">
          {/* Article Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(article?.publishedAt)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{formatReadTime(article?.readTime)}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{article?.views?.toLocaleString()}</span>
            </div>
          </div>

          {/* Article Title */}
          <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors duration-fast mb-3 line-clamp-2 ${
            featured ? 'text-xl' : 'text-lg'
          }`}>
            {article?.title}
          </h3>

          {/* Article Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {article?.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article?.tags?.slice(0, 3)?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {article?.tags?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{article?.tags?.length - 3} more
              </span>
            )}
          </div>

          {/* Article Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            {/* Author Info */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{article?.author}</p>
                <p className="text-xs text-muted-foreground">{article?.authorRole}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleShare('twitter', e)}
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
                aria-label="Share on Twitter"
              >
                <Icon name="Twitter" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleShare('linkedin', e)}
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
                aria-label="Share on LinkedIn"
              >
                <Icon name="Linkedin" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleShare('facebook', e)}
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
                aria-label="Share on Facebook"
              >
                <Icon name="Facebook" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;