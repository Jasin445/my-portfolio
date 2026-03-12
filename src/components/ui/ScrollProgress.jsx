import { useState, useEffect, useRef } from 'react';

const ScrollProgress = ({ className = '', threshold = 100 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);
  const circumference = 2 * Math.PI * 20;

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

        // Direct DOM writes — no re-render
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset =
            `${circumference * (1 - progress)}`;
        }
        if (textRef.current) {
          textRef.current.textContent = `${Math.round(progress * 100)}%`;
        }

        setIsVisible(scrollTop > threshold);
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [threshold, circumference]);

  return (
    <div
      className={`fixed bottom-8 right-8 z-40 transition-[opacity,transform] duration-slow ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24" cy="24" r="20"
            stroke="currentColor" strokeWidth="3" fill="none"
            className="text-border"
          />
          <circle
            ref={circleRef}
            cx="24" cy="24" r="20"
            stroke="currentColor" strokeWidth="3" fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            className="text-primary"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span ref={textRef} className="text-xs font-medium text-muted-foreground">
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;