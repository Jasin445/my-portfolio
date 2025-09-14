import React, { useState, useEffect } from 'react';

const ScrollProgress = ({ 
  className = '',
  showOnPages = ['/technical-blog', '/about-professional'],
  threshold = 100 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(Math.min(scrollPercent, 100));
      setIsVisible(scrollTop > threshold);
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateScrollProgress);
    };

    // Check if current page should show scroll progress
    const currentPath = window.location?.pathname;
    const shouldShow = showOnPages?.some(page => currentPath?.includes(page));
    
    if (shouldShow) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      calculateScrollProgress(); // Initial calculation
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, showOnPages]);

  // Don't render if not on specified pages
  const currentPath = window.location?.pathname;
  const shouldRender = showOnPages?.some(page => currentPath?.includes(page));
  
  if (!shouldRender) return null;

  return (
    <>
      {/* Progress Bar */}
      <div 
        className={`fixed top-16 left-0 right-0 h-1 bg-border/30 z-40 transition-opacity duration-slow ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      >
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-fast ease-out"
          style={{ 
            width: `${scrollProgress}%`,
            transform: `translateX(${scrollProgress < 100 ? '0' : '0'})` 
          }}
        />
      </div>

      {/* Circular Progress Indicator (Alternative) */}
      <div 
        className={`fixed bottom-8 right-8 z-40 transition-all duration-slow ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="relative w-12 h-12">
          {/* Background Circle */}
          <svg 
            className="w-12 h-12 transform -rotate-90" 
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-border"
            />
            {/* Progress Circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
              className="text-primary transition-all duration-fast ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;