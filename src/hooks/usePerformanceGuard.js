import { useEffect, useRef, useState } from "react";

function usePerformanceGuard() {
  const [lowPerfMode, setLowPerfMode] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Sync reduced-motion preference — also responds if user changes it live
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pause when tab is hidden
  useEffect(() => {
    const handleVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility, {
      passive: true,
    });
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // FPS monitor — 3 consecutive low readings before switching modes
  useEffect(() => {
    if (reducedMotion) {
      setLowPerfMode(true);
      return;
    }

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId;
    let strikes = 0;

    const measure = () => {
      frameCount++;
      const now = performance.now();

      if (now - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = now;

        if (fps < 30) {
          strikes++;
          if (strikes >= 3) setLowPerfMode(true);
        } else if (fps > 50) {
          strikes = 0;
          setLowPerfMode(false);
        }
      }

      rafId = requestAnimationFrame(measure);
    };

    rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const animationsActive = tabVisible && !lowPerfMode && !reducedMotion;

  return { animationsActive, lowPerfMode, tabVisible };
}

export default usePerformanceGuard;
