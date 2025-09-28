import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScrollProgress from '../../components/ui/ScrollProgress';

import BlogFilter from './components/BlogFilter';
import FeaturedArticles from './components/FeaturedArticles';
import BlogGrid from './components/BlogGrid';
import BlogStats from './components/BlogStats';
import CategoryTags from './components/CategoryTags';
import NewsletterSignup from './components/NewsletterSignup';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GenericHeroSection from '../portfolio-projects/components/GenericHero';

const TechnicalBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedArticles, setDisplayedArticles] = useState([]);

  // Mock blog articles data
  const mockArticles = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript and Modern Patterns",
      slug: "scalable-react-typescript-patterns",
      excerpt: "Learn how to structure large-scale React applications using TypeScript, custom hooks, and advanced patterns for maintainable code that scales with your team.",
      content: `In this comprehensive guide, we'll explore the essential patterns and practices for building scalable React applications.\n\nWe'll cover component architecture, state management strategies, and TypeScript integration techniques that will help you create maintainable codebases.`,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      category: "React",
      tags: ["react", "typescript", "architecture", "scalability", "patterns"],
      author: "Alex Chen",
      authorRole: "Senior Frontend Engineer",
      publishedAt: "2024-12-10",
      readTime: 12,
      views: 2847,
      featured: true,
      difficulty: "intermediate"
    },
    {
      id: 2,
      title: "Mastering CSS Grid: Advanced Layout Techniques for Modern Web Design",
      slug: "css-grid-advanced-layouts",
      excerpt: "Discover advanced CSS Grid techniques that will transform your web layouts. From complex responsive designs to creative grid patterns.",
      content: `CSS Grid has revolutionized how we approach web layouts. In this article, we'll dive deep into advanced techniques.\n\nYou'll learn about grid areas, implicit grids, and how to create responsive layouts without media queries.`,
      thumbnail: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=800&h=400&fit=crop",
      category: "CSS",
      tags: ["css", "grid", "layout", "responsive", "design"],
      author: "Sarah Johnson",
      authorRole: "UI/UX Developer",
      publishedAt: "2024-12-08",
      readTime: 8,
      views: 1923,
      featured: true,
      difficulty: "intermediate"
    },
    {
      id: 3,
      title: "Node.js Performance Optimization: From Basics to Advanced Techniques",
      slug: "nodejs-performance-optimization",
      excerpt: "Comprehensive guide to optimizing Node.js applications for production. Learn about profiling, memory management, and scaling strategies.",
      content: `Performance is crucial for Node.js applications in production. This guide covers everything from basic optimizations to advanced techniques.\n\nWe'll explore profiling tools, memory leak detection, and clustering strategies for maximum performance.`,
      thumbnail: "https://images.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png?w=800&h=400&fit=crop",
      category: "Node.js",
      tags: ["nodejs", "performance", "optimization", "backend", "scaling"],
      author: "Michael Rodriguez",
      authorRole: "Backend Architect",
      publishedAt: "2024-12-06",
      readTime: 15,
      views: 3156,
      featured: true,
      difficulty: "advanced"
    },
    {
      id: 4,
      title: "JavaScript ES2024 Features: What\'s New and How to Use Them",
      slug: "javascript-es2024-features",
      excerpt: "Explore the latest JavaScript features in ES2024. From new array methods to improved async handling, stay up-to-date with modern JavaScript.",
      content: `JavaScript continues to evolve with ES2024 bringing exciting new features.\n\nThis article covers the most important additions including new array methods, improved error handling, and enhanced async capabilities.`,
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
      category: "JavaScript",
      tags: ["javascript", "es2024", "features", "modern", "syntax"],
      author: "Emily Davis",
      authorRole: "JavaScript Specialist",
      publishedAt: "2024-12-04",
      readTime: 6,
      views: 1654,
      featured: false,
      difficulty: "beginner"
    },
    {
      id: 5,
      title: "Testing React Components: A Complete Guide to Jest and Testing Library",
      slug: "react-testing-jest-testing-library",
      excerpt: "Master React component testing with Jest and React Testing Library. Learn best practices for unit tests, integration tests, and mocking.",
      content: `Testing is essential for maintaining reliable React applications.\n\nThis comprehensive guide covers everything from basic component tests to complex integration scenarios using Jest and React Testing Library.`,
      thumbnail: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=800&h=400&fit=crop",
      category: "Testing",
      tags: ["react", "testing", "jest", "testing-library", "quality"],
      author: "David Kim",
      authorRole: "QA Engineer",
      publishedAt: "2024-12-02",
      readTime: 10,
      views: 2234,
      featured: false,
      difficulty: "intermediate"
    },
    {
      id: 6,
      title: "Web Performance Optimization: Core Web Vitals and Beyond",
      slug: "web-performance-core-web-vitals",
      excerpt: "Improve your website's performance with Core Web Vitals optimization. Learn about LCP, FID, CLS, and advanced performance techniques.",
      content: `Web performance directly impacts user experience and SEO rankings.\n\nThis guide covers Core Web Vitals optimization, performance monitoring, and advanced techniques for lightning-fast websites.`,
      thumbnail: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png?w=800&h=400&fit=crop",category: "Performance",
      tags: ["performance", "web-vitals", "optimization", "seo", "ux"],
      author: "Lisa Wang",authorRole: "Performance Engineer",publishedAt: "2024-11-30",
      readTime: 9,
      views: 1876,
      featured: false,
      difficulty: "intermediate"
    },
    {
      id: 7,
      title: "Docker for Frontend Developers: Containerizing React Applications",slug: "docker-react-containerization",excerpt: "Learn how to containerize React applications with Docker. From development to production deployment, master Docker for frontend projects.",
      content: `Docker has become essential for modern development workflows.\n\nThis tutorial guides frontend developers through containerizing React applications, from local development to production deployment strategies.`,
      thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800&h=400&fit=crop",category: "DevOps",
      tags: ["docker", "react", "containerization", "deployment", "devops"],
      author: "James Wilson",authorRole: "DevOps Engineer",publishedAt: "2024-11-28",
      readTime: 11,
      views: 1543,
      featured: false,
      difficulty: "intermediate"
    },
    {
      id: 8,
      title: "GraphQL vs REST: Choosing the Right API Architecture for Your Project",slug: "graphql-vs-rest-api-architecture",excerpt: "Compare GraphQL and REST APIs to make informed architectural decisions. Understand the pros, cons, and use cases for each approach.",
      content: `Choosing between GraphQL and REST is a crucial architectural decision.\n\nThis comparison covers the strengths and weaknesses of each approach, helping you make the right choice for your specific project requirements.`,
      thumbnail: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=800&h=400&fit=crop",category: "API",
      tags: ["graphql", "rest", "api", "architecture", "backend"],
      author: "Rachel Green",authorRole: "API Architect",publishedAt: "2024-11-26",
      readTime: 7,
      views: 2098,
      featured: false,
      difficulty: "beginner"
    }
  ];

  // Mock categories data
  const categories = [
    { value: 'react', label: 'React', count: 15, icon: 'Component' },
    { value: 'javascript', label: 'JavaScript', count: 12, icon: 'Code' },
    { value: 'css', label: 'CSS', count: 8, icon: 'Palette' },
    { value: 'nodejs', label: 'Node.js', count: 10, icon: 'Server' },
    { value: 'testing', label: 'Testing', count: 6, icon: 'TestTube' },
    { value: 'performance', label: 'Performance', count: 7, icon: 'Zap' },
    { value: 'devops', label: 'DevOps', count: 5, icon: 'Settings' },
    { value: 'api', label: 'API', count: 9, icon: 'Link' }
  ];

  // Mock blog stats
  const blogStats = {
    totalArticles: 62,
    totalViews: 45230,
    avgReadTime: 9,
    categories: 8
  };

  // Filter articles based on search and filters
  const filteredArticles = mockArticles?.filter(article => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery?.toLowerCase();
      const matchesSearch = 
        article?.title?.toLowerCase()?.includes(searchLower) ||
        article?.excerpt?.toLowerCase()?.includes(searchLower) ||
        article?.tags?.some(tag => tag?.toLowerCase()?.includes(searchLower)) ||
        article?.category?.toLowerCase()?.includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory && article?.category?.toLowerCase() !== selectedCategory?.toLowerCase()) {
      return false;
    }

    // Active filters
    if (activeFilters?.length > 0) {
      return activeFilters?.every(filter => {
        const [filterType, filterValue] = filter?.split(':');
        
        switch (filterType) {
          case 'category':
            return article?.category?.toLowerCase() === filterValue?.toLowerCase();
          case 'type':
            return article?.tags?.includes(filterValue);
          case 'difficulty':
            return article?.difficulty === filterValue;
          case 'readTime':
            if (filterValue === 'quick') return article?.readTime < 5;
            if (filterValue === 'medium') return article?.readTime >= 5 && article?.readTime <= 10;
            if (filterValue === 'long') return article?.readTime > 10;
            return true;
          default:
            return true;
        }
      });
    }

    return true;
  });

  // Get featured articles
  const featuredArticles = mockArticles?.filter(article => article?.featured);

  // Initialize displayed articles
  useEffect(() => {
    setDisplayedArticles(filteredArticles?.slice(0, 6));
    setHasMore(filteredArticles?.length > 6);
  }, [filteredArticles]);

  // Load more articles
  const handleLoadMore = () => {
    setLoading(true);
    
    setTimeout(() => {
      const currentLength = displayedArticles?.length;
      const nextArticles = filteredArticles?.slice(currentLength, currentLength + 6);
      setDisplayedArticles(prev => [...prev, ...nextArticles]);
      setHasMore(currentLength + 6 < filteredArticles?.length);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Technical Blog - DevPortfolio Pro</title>
        <meta name="description" content="Explore technical articles, tutorials, and insights on modern web development, React, JavaScript, and more." />
        <meta name="keywords" content="technical blog, web development, React, JavaScript, tutorials, programming" />
        <meta property="og:title" content="Technical Blog - DevPortfolio Pro" />
        <meta property="og:description" content="Explore technical articles, tutorials, and insights on modern web development." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <ScrollProgress />
        <GenericHeroSection title={"Technical Blog"}/>
        <main className="pt-16">

          {/* Featured Articles Section */}
          <section className="py-16 lg:py-24">
            <div className="4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto px-6">
              <FeaturedArticles articles={featuredArticles} />
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="mx-auto px-6 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-80 space-y-8">
                  {/* Search & Filters */}
                  <BlogFilter
                    onFilterChange={setActiveFilters}
                    onSearchChange={setSearchQuery}
                    activeFilters={activeFilters}
                    searchQuery={searchQuery}
                  />

                  {/* Newsletter Signup */}
                  <NewsletterSignup />
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                  {/* Category Tags */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Browse by Category</h2>
                    <CategoryTags
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onCategorySelect={setSelectedCategory}
                    />
                  </div>

                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {searchQuery || selectedCategory || activeFilters?.length > 0 
                          ? 'Search Results' :'Latest Articles'
                        }
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {filteredArticles?.length} article{filteredArticles?.length !== 1 ? 's' : ''} found
                      </p>
                    </div>

                    {/* Sort Options */}
                    <div className="hidden sm:flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Latest
                        <Icon name="ChevronDown" size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Articles Grid */}
                  <BlogGrid
                    articles={displayedArticles}
                    loading={loading}
                    hasMore={hasMore}
                    onLoadMore={handleLoadMore}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 lg:p-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="PenTool" size={24} className="text-primary" />
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Have a Topic Suggestion?
                </h2>
                
                <p className="text-muted-foreground text-lg mb-8">
                  I'm always looking for new topics to write about. If you have a suggestion or would like to see a tutorial on a specific technology, let me know!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="min-w-40">
                    <Icon name="Mail" size={18} className="mr-2" />
                    Suggest a Topic
                  </Button>
                  
                  <Button variant="outline" size="lg" className="min-w-40">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Join Discussion
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TechnicalBlog;