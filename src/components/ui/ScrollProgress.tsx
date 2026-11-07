"use client";

import { useEffect, useRef, useState } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 20;

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let wasVisible = false;
    let lastScrollTop = window.scrollY;
    let lastScrollTime = 0;
    let lastSplashTime = 0;
    let scrollCombo = 0;
    let pointerX = window.innerWidth * 0.5;
    const activeSplashes = new Set<HTMLElement>();

    const createSplash = (clientX: number, clientY: number, combo: number) => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        activeSplashes.size >= 3
      ) {
        return;
      }

      const world = document.querySelector<HTMLElement>(".portfolio-canvas");
      if (!world) return;

      const bounds = world.getBoundingClientRect();
      const splash = document.createElement("span");
      splash.className = "world-combo-splash";
      splash.dataset.combo = String(Math.min(combo, 5));
      splash.style.left = `${clientX - bounds.left}px`;
      splash.style.top = `${clientY - bounds.top}px`;
      world.appendChild(splash);
      activeSplashes.add(splash);

      const removeSplash = () => {
        splash.remove();
        activeSplashes.delete(splash);
      };
      splash.addEventListener("animationend", removeSplash, { once: true });
      window.setTimeout(removeSplash, 1100);
    };

    const updateProgress = () => {
      frameRef.current = null;
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      document.documentElement.style.setProperty(
        "--world-scroll-shift",
        `${progress * 190}px`,
      );

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = `${
          CIRCUMFERENCE * (1 - progress)
        }`;
      }
      if (textRef.current) {
        textRef.current.textContent = `${Math.round(progress * 100)}%`;
      }

      if (Math.abs(scrollTop - lastScrollTop) > 22) {
        const now = performance.now();
        scrollCombo =
          now - lastScrollTime < 360 ? Math.min(scrollCombo + 1, 5) : 1;
        if (scrollCombo >= 2 && now - lastSplashTime > 420) {
          createSplash(pointerX, window.innerHeight * 0.58, scrollCombo);
          lastSplashTime = now;
        }
        lastScrollTime = now;
        lastScrollTop = scrollTop;
      }

      const nextVisible = scrollTop > 100;
      if (nextVisible !== wasVisible) {
        wasVisible = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(updateProgress);
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      const horizontal = (event.clientX / window.innerWidth - 0.5) * 18;
      const vertical = (event.clientY / window.innerHeight - 0.5) * 10;
      document.documentElement.style.setProperty(
        "--world-pointer-x",
        `${horizontal}px`,
      );
      document.documentElement.style.setProperty(
        "--world-pointer-y",
        `${vertical}px`,
      );
    };
    const handleBackgroundClick = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      if (
        event.target instanceof Element &&
        event.target.closest("a, button, input, textarea, select, [role='dialog']")
      ) {
        return;
      }
      createSplash(event.clientX, event.clientY, 1);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handleBackgroundClick, {
      passive: true,
    });
    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handleBackgroundClick);
      activeSplashes.forEach((splash) => splash.remove());
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      document.documentElement.style.removeProperty("--world-scroll-shift");
      document.documentElement.style.removeProperty("--world-pointer-x");
      document.documentElement.style.removeProperty("--world-pointer-y");
    };
  }, []);

  return (
    <button
      type="button"
      className={`scroll-progress ${isVisible ? "scroll-progress--visible" : ""}`}
      tabIndex={isVisible ? 0 : -1}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Scroll to top"
      title="Return to top"
    >
      <svg className="scroll-progress-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="scroll-progress-track" cx="24" cy="24" r="20" />
        <circle
          ref={circleRef}
          className="scroll-progress-value"
          cx="24"
          cy="24"
          r="20"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <span ref={textRef} className="scroll-progress-label" aria-hidden="true">
        0%
      </span>
    </button>
  );
};

export default ScrollProgress;
