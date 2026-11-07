import { useEffect, useRef, useState, useMemo } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right";

/* ─── Utilities ──────────────────────────────────────────────── */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const makePhaseStyle = (direction: RevealDirection) => {
  const hidden =
    {
      up: "translateY(180px) rotate(-16deg) scale(0.85) translateZ(0)",
      down: "translateY(-180px) rotate(4deg) scale(0.85) translateZ(0)",
      left: "translateX(80px) rotate(16deg) scale(0.85) translateZ(0)",
      right: "translateX(-80px) rotate(-16deg) scale(0.85) translateZ(0)",
    }[direction] ?? "translateY(80px) rotate(-16deg) scale(0.85) translateZ(0)";

  const reduced = prefersReducedMotion();

  return (phase: number): CSSProperties => {
    if (phase === 0)
      return {
        opacity: 0,
        transform: reduced ? "translateZ(0)" : hidden,
        willChange: "transform, opacity",
      };

    return {
      opacity: 1,
      transform: "translate(0) rotate(0deg) scale(1) translateZ(0)",
      transition:
        "transform 2.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "auto",
    };
  };
};

// ── RevealSection ─────────────────────────────────────────────────────────────
interface RevealSectionProps {
  children: ReactNode;
  index?: number;
  active?: boolean;
  direction?: RevealDirection;
  className?: string;
}

export const RevealSection = ({
  children,
  index = 0,
  active = true,
  direction = "up",
  className = "",
}: RevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [phase, setPhase] = useState(0);

  const style = useMemo(
    () => makePhaseStyle(direction)(phase),
    [direction, phase],
  );

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setPhase(1);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observerRef.current?.disconnect();
        timerRef.current = setTimeout(() => setPhase(1), index * 60);
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    observerRef.current.observe(el);

    return () => {
      observerRef.current?.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, active]);

  if (!active) return children;

  return (
    <div ref={ref} className={`h-full ${className}`} style={style}>
      {children}
    </div>
  );
};

// ── TiltCard ──────────────────────────────────────────────────────────────────
export const TiltCard = ({
  children,
  active = true,
}: {
  children: ReactNode;
  active?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = !window.matchMedia("(hover: none)").matches;
  }, []);

  const handleEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = "transform";
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!active || !canHover.current) return;
    const el = ref.current;
    if (!el) return;

    el.style.transition = "none";
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1)";
    el.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    const onEnd = () => {
      el.style.willChange = "auto";
      el.removeEventListener("transitionend", onEnd);
    };
    el.addEventListener("transitionend", onEnd);
  };

  if (!active) return children;

  return (
    <div
      ref={ref}
      className="h-full"
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

/* ─── Confetti explode ───────────────────────────────────────── */

export const explode = (originX: number, originY: number) => {
  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#facc15",
    "#f472b6",
    "#a78bfa",
    "#34d399",
    "#fb923c",
    "#ffffff",
  ];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const size = Math.random() * 6 + 4;
    el.style.cssText = `
      position: fixed; z-index: 9999; pointer-events: none;
      width: ${size}px; height: ${size}px;
      border-radius: ${Math.random() > 0.4 ? "50%" : "2px"};
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      left: ${originX}px; top: ${originY}px;
    `;
    document.body.appendChild(el);

    const angle = ((Math.PI * 2) / count) * i + (Math.random() - 0.5) * 0.6;
    const speed = Math.random() * 120 + 60;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const rotate = Math.random() * 720 - 360;
    const duration = 700 + Math.random() * 300;
    let start: number | null = null;

    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = 1 - t * t;
      el.style.left = `${originX + vx * t}px`;
      el.style.top = `${originY + vy * t + 80 * t * t}px`;
      el.style.opacity = `${ease}`;
      el.style.transform = `rotate(${rotate * t}deg) scale(${1 - t * 0.5})`;
      t < 1 ? requestAnimationFrame(step) : el.remove();
    };
    requestAnimationFrame(step);
  }

  // Ring
  const ring = document.createElement("div");
  ring.style.cssText = `position:fixed;left:${originX}px;top:${originY}px;
    width:0;height:0;border-radius:50%;border:2px solid rgba(37,99,235,0.8);
    transform:translate(-50%,-50%);pointer-events:none;z-index:9998;`;
  document.body.appendChild(ring);
  let rs: number | null = null;
  const ringStep = (ts: number) => {
    if (!rs) rs = ts;
    const t = Math.min((ts - rs) / 500, 1);
    const s = t * 80;
    ring.style.width = `${s}px`;
    ring.style.height = `${s}px`;
    ring.style.opacity = `${1 - t}`;
    t < 1 ? requestAnimationFrame(ringStep) : ring.remove();
  };
  requestAnimationFrame(ringStep);
};
