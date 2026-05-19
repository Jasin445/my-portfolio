import { useEffect, useRef, useState, useMemo } from "react";

/* ─── Underwater Fish Tank ───────────────────────────────────── */

const FISH_COUNT = 6;
const BUBBLE_COUNT = 5;
const FPS_CAP = 24;
const FRAME_MS = 1000 / FPS_CAP;

const FISH_COLORS = [
  ["#6be6ff", "#3ab8d4"],
  ["#f472b6", "#c0406e"],
  ["#a78bfa", "#7c5cbf"],
  ["#34d399", "#1a7a52"],
  ["#fb923c", "#c4571a"],
  ["#e2e8f0", "#94a3b8"],
];

function drawFish(ctx, f, ts) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.scale(f.dir, 1);
  ctx.globalAlpha = f.alpha;

  const s = f.size;

  // Tail wag via rotation
  const wag = Math.sin(ts * 0.003 * f.wagSpeed) * 0.35;
  ctx.save();
  ctx.translate(-s * 1.4, 0);
  ctx.rotate(wag);
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 1.2, s * 0.9, 0, 0, Math.PI * 2);
  ctx.fillStyle = f.finColor;
  ctx.fill();
  ctx.restore();

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 1.5, s * 0.65, 0, 0, Math.PI * 2);
  ctx.fillStyle = f.color;
  ctx.fill();

  // Eye white
  const eyeR = Math.max(s * 0.19, 1.5);
  ctx.beginPath();
  ctx.arc(s * 0.6, -s * 0.15, eyeR, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Pupil
  ctx.beginPath();
  ctx.arc(s * 0.62, -s * 0.13, eyeR * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = "#111";
  ctx.fill();

  ctx.restore();
}

function drawBubble(ctx, b, ts) {
  // duration is now a plain period in ms (3000–8000ms) for readability
  const progress = ((ts % b.duration) / b.duration + b.offset) % 1;
  const alpha =
    progress < 0.1
      ? progress / 0.1
      : progress > 0.85
        ? (1 - progress) / 0.15
        : 1;

  const rise = progress * b.rise;
  const wobble = Math.sin(progress * Math.PI * 4) * b.wobble;

  ctx.save();
  ctx.globalAlpha = alpha * 0.4;
  ctx.beginPath();
  ctx.arc(b.x + wobble, b.y + rise, b.r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(180,240,255,0.6)";
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.restore();
}

// active prop removed — FishTank manages its own viewport visibility internally.
// The parent only needs to pass animationsActive (performance guard).
const FishTank = ({ animationsActive = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!animationsActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const makeFish = () =>
      Array.from({ length: FISH_COUNT }, (_, i) => {
        const [color, finColor] = FISH_COLORS[i % FISH_COLORS.length];
        const dir = Math.random() > 0.5 ? 1 : -1;
        const baseY = Math.random() * H * 0.85 + H * 0.05;
        return {
          x: Math.random() * W,
          y: baseY,
          baseY,
          size: Math.random() * 4 + 5,
          speed: (Math.random() * 0.08 + 0.06) * dir,
          dir,
          waveAmp: Math.random() * 14 + 4,
          waveFreq: Math.random() * 0.02 + 0.006,
          wagSpeed: Math.random() * 0.8 + 0.6,
          phase: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.4 + 0.25,
          color,
          finColor,
        };
      });

    const makeBubbles = () =>
      Array.from({ length: BUBBLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.6 + H * 0.2,
        r: Math.random() * 2.5 + 1,
        rise: -(Math.random() * H * 0.5 + H * 0.2),
        wobble: Math.random() * 8 - 4,
        duration: Math.random() * 5000 + 3000,
        offset: Math.random(),
      }));

    const fish = makeFish();
    const bubbles = makeBubbles();

    let rafId;
    let lastTs = 0;
    let visible = false; // controlled by IntersectionObserver below

    const loop = (ts) => {
      rafId = requestAnimationFrame(loop);
      if (!visible) return; // skip draw work when off-screen
      const delta = ts - lastTs;
      if (delta < FRAME_MS - 1) return;
      lastTs = ts - (delta % FRAME_MS);

      ctx.clearRect(0, 0, W, H);

      for (const f of fish) {
        f.phase += f.waveFreq;
        f.x += f.speed;
        if (f.dir > 0 && f.x > W + 40) f.x = -40;
        if (f.dir < 0 && f.x < -40) f.x = W + 40;
        f.y = f.baseY + Math.sin(f.phase) * f.waveAmp;
        drawFish(ctx, f, ts);
      }

      for (const b of bubbles) {
        drawBubble(ctx, b, ts);
      }
    };

    // Pause/resume based on viewport visibility — no parent needed
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    // Pause when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTs = 0;
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility, {
      passive: true,
    });

    // Resize: dimensions only, no entity regeneration
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        W = canvas.offsetWidth;
        H = canvas.offsetHeight;
        canvas.width = W;
        canvas.height = H;
      }, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [animationsActive]);

  if (!animationsActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
};

export default FishTank;

/* ─── Utilities ──────────────────────────────────────────────── */

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const makePhaseStyle = (direction) => {
  const hidden =
    {
      up: "translateY(180px) rotate(-16deg) scale(0.85) translateZ(0)",
      down: "translateY(-180px) rotate(4deg) scale(0.85) translateZ(0)",
      left: "translateX(80px) rotate(16deg) scale(0.85) translateZ(0)",
      right: "translateX(-80px) rotate(-16deg) scale(0.85) translateZ(0)",
    }[direction] ?? "translateY(80px) rotate(-16deg) scale(0.85) translateZ(0)";

  const reduced = prefersReducedMotion();

  return (phase) => {
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
export const RevealSection = ({
  children,
  index = 0,
  active = true,
  direction = "up",
  className = "",
}) => {
  const ref = useRef(null);
  const timerRef = useRef(null);
  const observerRef = useRef(null);
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
      clearTimeout(timerRef.current);
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
export const TiltCard = ({ children, active = true }) => {
  const ref = useRef(null);
  const canHover = useRef(!window.matchMedia("(hover: none)").matches);

  const handleEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = "transform";
  };

  const handleMove = (e) => {
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

export const explode = (originX, originY) => {
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
    let start = null;

    const step = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = 1 - t * t;
      el.style.left = `${originX + vx * t}px`;
      el.style.top = `${originY + vy * t + 80 * t * t}px`;
      el.style.opacity = ease;
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
  let rs = null;
  const ringStep = (ts) => {
    if (!rs) rs = ts;
    const t = Math.min((ts - rs) / 500, 1);
    const s = t * 80;
    ring.style.width = `${s}px`;
    ring.style.height = `${s}px`;
    ring.style.opacity = 1 - t;
    t < 1 ? requestAnimationFrame(ringStep) : ring.remove();
  };
  requestAnimationFrame(ringStep);
};
