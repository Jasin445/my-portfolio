import { useEffect, useState } from "react";
import type { RefObject } from "react";

export const useOnScreen = (
  ref: RefObject<Element | null>,
  threshold = 0.1,
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
};