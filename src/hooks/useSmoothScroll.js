import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    let scrollTimer = null;
    let isScrolling = false;

    const onScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        // Disable pointer events during scroll — stops hover recalcs on every frame
        document.body.style.pointerEvents = "none";
      }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
        document.body.style.pointerEvents = "";
      }, 150);
    };

    // Must be passive — tells the browser it can scroll immediately
    // without waiting to see if JS will call preventDefault()
    window.addEventListener("scroll",     onScrollStart, { passive: true });
    window.addEventListener("wheel",      onScrollStart, { passive: true });
    window.addEventListener("touchmove",  onScrollStart, { passive: true });
    window.addEventListener("touchstart", onScrollStart, { passive: true });

    return () => {
      window.removeEventListener("scroll",     onScrollStart);
      window.removeEventListener("wheel",      onScrollStart);
      window.removeEventListener("touchmove",  onScrollStart);
      window.removeEventListener("touchstart", onScrollStart);
      clearTimeout(scrollTimer);
      document.body.style.pointerEvents = "";
    };
  }, []);
}