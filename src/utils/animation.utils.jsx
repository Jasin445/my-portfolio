import { useEffect, useRef, useState, useMemo } from "react";

/* ─── Underwater Fish Tank ───────────────────────────────────── */
// const FishTank = ({ active }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!active) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d", {
//       willReadFrequently: false,
//       alpha: true,
//     });

//     const fishColors = [
//       ["#6be6ff", "#3ab8d4"],
//       ["#f472b6", "#c0406e"],
//       ["#a78bfa", "#7c5cbf"],
//       ["#34d399", "#1a7a52"],
//       ["#fb923c", "#c4571a"],
//       ["#facc15", "#b8960f"],
//       ["#e2e8f0", "#94a3b8"],
//       ["#f87171", "#b91c1c"],
//     ];

//     let cachedGrads = [];
//     const buildGrads = () => {
//       cachedGrads = Array.from({ length: 5 }, () => {
//         const grad = ctx.createLinearGradient(0, 0, 40, canvas.height * 0.7);
//         grad.addColorStop(0, "rgba(107,230,255,0.04)");
//         grad.addColorStop(1, "rgba(107,230,255,0)");
//         return grad;
//       });
//     };

//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//       buildGrads();
//     };
//     resize();
//     window.addEventListener("resize", resize, {passive: true});

//     const fishes = Array.from({ length: 8 }, () => {
//       const size = Math.random() * 10 + 3;
//       const colorPair =
//         fishColors[Math.floor(Math.random() * fishColors.length)];
//       const dir = Math.random() > 0.5 ? 1 : -1;
//       return {
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         size,
//         speed: (Math.random() * 0.6 + 0.15) * dir,
//         vy: (Math.random() - 0.5) * 0.08,
//         waveAmp: Math.random() * 1.5 + 0.3,
//         waveFreq: Math.random() * 0.04 + 0.01,
//         phase: Math.random() * Math.PI * 2,
//         color: colorPair[0],
//         finColor: colorPair[1],
//         alpha: Math.random() * 0.45 + 0.15,
//         dir,
//         tailPhase: Math.random() * Math.PI * 2,
//         tailSpeed: Math.random() * 0.12 + 0.06,
//         depth: Math.random(),
//       };
//     });

//     const bubbles = Array.from({ length: 8 }, () => ({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       r: Math.random() * 3 + 1,
//       speed: Math.random() * 0.3 + 0.1,
//       wobble: Math.random() * Math.PI * 2,
//       alpha: Math.random() * 0.12 + 0.04,
//     }));

//     const drawFish = (ctx, fish, t) => {
//       const { x, y, color, finColor, alpha, dir, tailPhase, depth } = fish;
//       const size = fish.size * (0.5 + depth * 0.5);
//       const tail = Math.sin(t * fish.tailSpeed * 60 + tailPhase) * size * 0.3;

//       ctx.save();
//       ctx.globalAlpha = alpha;
//       ctx.translate(x, y);
//       if (dir < 0) ctx.scale(-1, 1);

//       // body
//       ctx.beginPath();
//       ctx.ellipse(0, 0, size * 1.5, size * 0.6, 0, 0, Math.PI * 2);
//       ctx.fillStyle = color;
//       ctx.fill();

//       // tail
//       ctx.beginPath();
//       ctx.moveTo(-size * 1.2, 0);
//       ctx.lineTo(-size * 2, tail - size * 0.4);
//       ctx.lineTo(-size * 2, tail + size * 0.4);
//       ctx.closePath();
//       ctx.fillStyle = finColor;
//       ctx.fill();

//       ctx.restore();
//     };

//     fishes.sort((a, b) => a.depth - b.depth);

//     let raf;
//     let t = 0;
//     let lastTime = 0;
//     let paused = false;
//     let visible = false;

//     const draw = (timestamp) => {
//       if (paused || !visible) return;
//       if (timestamp - lastTime < 80) {
//         raf = requestAnimationFrame(draw);
//         return;
//       }
//       lastTime = timestamp;
//       t += 0.016;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "rgba(10, 20, 50, 0.18)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw bubbles
//       bubbles.forEach((b) => {
//         b.y -= b.speed;
//         b.wobble += 0.02;
//         b.x += Math.sin(b.wobble) * 0.3;
//         if (b.y < -10) {
//           b.y = canvas.height + 10;
//           b.x = Math.random() * canvas.width;
//         }
//         ctx.beginPath();
//         ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
//         ctx.strokeStyle = `rgba(180,240,255,${b.alpha})`;
//         ctx.stroke();
//       });

//       // Draw fishes
//       fishes.forEach((fish) => {
//         fish.phase += fish.waveFreq;
//         fish.x += fish.speed;
//         fish.y += Math.sin(fish.phase) * fish.waveAmp + fish.vy;

//         if (fish.dir > 0 && fish.x > canvas.width + 30) fish.x = -30;
//         if (fish.dir < 0 && fish.x < -30) fish.x = canvas.width + 30;
//         if (fish.y < -20) fish.y = canvas.height + 20;
//         if (fish.y > canvas.height + 20) fish.y = -20;

//         drawFish(ctx, fish, t);
//       });

//       raf = requestAnimationFrame(draw);
//     };

//     const handleVisibility = () => {
//       paused = document.hidden;
//       if (!paused && visible) raf = requestAnimationFrame(draw);
//     };
//     document.addEventListener("visibilitychange", handleVisibility, {passive: true});

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         visible = entry.isIntersecting;
//         if (visible && !paused) {
//           raf = requestAnimationFrame(draw);
//         } else {
//           cancelAnimationFrame(raf);
//         }
//       },
//       { threshold: 0.1 },
//     );
//     observer.observe(canvas);

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", resize);
//       document.removeEventListener("visibilitychange", handleVisibility);
//       observer.disconnect();
//     };
//   }, [active]);

//   if (!active) return null;

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "absolute",
//         inset: 0,
//         width: "100%",
//         height: "100%",
//         pointerEvents: "none",
//         zIndex: 0,
//         willChange: "transform",
//       }}
//     />
//   );
// };

const FishTank = ({ active = true }) => {
  const containerRef = useRef(null);
  const stateRef = useRef({ rafs: [], elements: [] });

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const fishColors = [
      ["#6be6ff", "#3ab8d4"],
      ["#f472b6", "#c0406e"],
      ["#a78bfa", "#7c5cbf"],
      ["#34d399", "#1a7a52"],
      ["#fb923c", "#c4571a"],
      ["#facc15", "#b8960f"],
      ["#e2e8f0", "#94a3b8"],
      ["#f87171", "#b91c1c"],
    ];

    const COUNT = 10;
    const { rafs, elements } = stateRef.current;

    if (!document.getElementById("ft-styles")) {
      const s = document.createElement("style");
      s.id = "ft-styles";
      s.textContent = `
        .ft-fish {
          position: absolute;
          display: flex;
          align-items: center;
          pointer-events: none;
          will-change: transform;
          top: 0; left: 0;
        }
        .ft-body {
          border-radius: 50%;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }
        .ft-eye {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          top: 22%;
          right: 18%;
          z-index: 3;
        }
        .ft-pupil {
          position: absolute;
          border-radius: 50%;
          background: #111;
          bottom: 1px;
          right: 1px;
        }
        .ft-tail {
          flex-shrink: 0;
          will-change: transform;
          animation: ft-wag ease-in-out infinite alternate;
          transform-origin: right center;
          z-index: 1;
          position: relative;
        }
        .ft-bubble {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(180,240,255,0.22);
          pointer-events: none;
          will-change: transform, opacity;
          animation: ft-bubble linear infinite;
          top: 0; left: 0;
        }
        @keyframes ft-wag {
          from { transform: skewY(-20deg) scaleX(0.92); }
          to   { transform: skewY(20deg)  scaleX(1.08); }
        }
        @keyframes ft-bubble {
          0%   { opacity: 0;    transform: translate(0, 0); }
          10%  { opacity: 1; }
          85%  { opacity: 0.15; }
          100% { opacity: 0;    transform: translate(var(--bx), var(--by)); }
        }
      `;
      document.head.appendChild(s);
    }

    const W = container.offsetWidth;
    const H = container.offsetHeight;

    const fishData = [];

    for (let i = 0; i < COUNT; i++) {
      const size = Math.random() * 4 + 4;
      const [color, finColor] = fishColors[i % fishColors.length];
      const dir      = Math.random() > 0.5 ? 1 : -1;
      const speed    = (Math.random() * 0.1 + 0.1) * dir;
      const alpha    = Math.random() * 0.45 + 0.2;
      const waveAmp  = Math.random() * 18 + 4;
      const waveFreq = Math.random() * 0.025 + 0.008;
      const phase    = Math.random() * Math.PI * 2;
      const tailDur  = (Math.random() * 300 + 180).toFixed(0);

      const x0 = Math.random() * W;
      const y0 = Math.random() * H * 0.85 + H * 0.05;

      // ── wrapper ──────────────────────────────────────────
      const wrapper = document.createElement("div");
      wrapper.className = "ft-fish";
      wrapper.style.cssText += `
        opacity: ${alpha};
        transform: translate(${x0}px,${y0}px) scaleX(${dir});
      `;

      // ── tail — overlaps body via negative margin ──────────
      // Uses border-radius to make a rounded fan shape instead of
      // a hard triangle, and inherits body color so it blends
      const tail = document.createElement("div");
      tail.className = "ft-tail";
      tail.style.cssText = `
        width: ${size * 1.2}px;
        height: ${size * 1.1}px;
        background: ${finColor};
        animation-duration: ${tailDur}ms;
        margin-left: -${size * 0.3}px;
        border-radius: 160px;
        filter: brightness(0.78);
      `;

      // ── body ─────────────────────────────────────────────
      const body = document.createElement("div");
      body.className = "ft-body";
      body.style.cssText = `
        width:      ${size * 3}px;
        height:     ${size * 1.3}px;
        background: ${color};
      `;

      // ── eye ──────────────────────────────────────────────
      const eyeSize   = Math.max(size * 0.38, 3);
      const pupilSize = Math.max(eyeSize * 0.55, 1.5);

      const eye = document.createElement("div");
      eye.className = "ft-eye";
      eye.style.cssText = `
        width:  ${eyeSize}px;
        height: ${eyeSize}px;
        box-shadow: 0 0 ${eyeSize * 0.4}px rgba(255,255,255,0.6);
      `;

      const pupil = document.createElement("div");
      pupil.className = "ft-pupil";
      pupil.style.cssText = `
        width:  ${pupilSize}px;
        height: ${pupilSize}px;
      `;

      eye.appendChild(pupil);
      body.appendChild(eye);

      wrapper.appendChild(tail);
      wrapper.appendChild(body);
      container.appendChild(wrapper);
      elements.push(wrapper);

      fishData.push({ el: wrapper, x: x0, y: y0, speed, waveAmp, waveFreq, phase, dir });
    }

    // ── Bubbles (pure CSS) ────────────────────────────────────
    for (let i = 0; i < 10; i++) {
      const r        = Math.random() * 3 + 1;
      const bx       = Math.random() * W;
      const by       = Math.random() * H * 0.8 + H * 0.1;
      const wobble   = (Math.random() * 12 - 6).toFixed(1);
      const rise     = (-(Math.random() * H * 0.6 + H * 0.3)).toFixed(0);
      const duration = (Math.random() * 4000 + 3000).toFixed(0);
      const delay    = (Math.random() * -5000).toFixed(0);

      const b = document.createElement("div");
      b.className = "ft-bubble";
      b.style.cssText = `
        width:  ${r * 2}px;
        height: ${r * 2}px;
        transform: translate(${bx}px,${by}px);
        --bx: ${wobble}px;
        --by: ${rise}px;
        animation-duration: ${duration}ms;
        animation-delay:    ${delay}ms;
      `;
      container.appendChild(b);
      elements.push(b);
    }

    // ── Single rAF loop ───────────────────────────────────────
    let rafId;
    let lastTs    = 0;
    const FRAME_MS = 1000 / 60;

    const loop = (ts) => {
      rafId = requestAnimationFrame(loop);
      const delta = ts - lastTs;
      if (delta < FRAME_MS - 1) return;
      lastTs = ts - (delta % FRAME_MS);

      for (let i = 0; i < fishData.length; i++) {
        const f = fishData[i];
        f.phase += f.waveFreq;
        f.x     += f.speed;

        if (f.dir > 0 && f.x >  W + 40) f.x = -40;
        if (f.dir < 0 && f.x < -40)     f.x =  W + 40;

        const y = f.y + Math.sin(f.phase) * f.waveAmp;
        f.el.style.transform = `translate(${f.x | 0}px,${y | 0}px) scaleX(${f.dir})`;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTs = 0;
        rafId  = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility, { passive: true });

    rafId = requestAnimationFrame(loop);
    rafs.push(() => cancelAnimationFrame(rafId));

    return () => {
      rafs.forEach(c => c());
      stateRef.current.rafs = [];
      document.removeEventListener("visibilitychange", onVisibility);
      elements.forEach(el => el.remove());
      stateRef.current.elements = [];
      document.getElementById("ft-styles")?.remove();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background: "rgba(10,20,50,0.18)",
        contain: "strict",
      }}
    />
  );
};


export default FishTank;

const prefersReducedMotion = () =>
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
        // filter: reduced ? "none" : "blur(8px) brightness(0.3)",
        willChange: "transform, opacity",
      };

    return {
      opacity: 1,
      transform: "translate(0) rotate(0deg) scale(1) translateZ(0)",
      // filter: "blur(0px) brightness(1)",
      transition:
        "transform 2.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "auto",
    };
  };
};

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

  const style = useMemo(() => makePhaseStyle(direction)(phase), [direction, phase]);

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
        timerRef.current = setTimeout(() => setPhase(1), index * 120);
      },
      { threshold: 0.15 },
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

/* ─── TiltCard — mouse-tracking 3-D tilt, no state re-renders ── */
export const TiltCard = ({ children, active = true }) => {
  const ref = useRef(null);
  const canHover = useRef(!window.matchMedia("(hover: none)").matches);

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
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  if (!active) return children;

  return (
    <div
      ref={ref}
      className="will-change-transform h-full"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

/* ─── Glowing border card ────────────────────────────────────── */
export const GlowCard = ({ children, active }) => (
  <div
    style={{
      position: "relative",
      borderRadius: "0.75rem",
      padding: "1px",
      background: active
        ? "linear-gradient(135deg,#6be6ff,#a855f7,#6be6ff)"
        : "transparent",
      backgroundSize: active ? "200% 200%" : "100%",
      animation: active ? "borderSpin 3s linear infinite" : "none",
    }}
  >
    {children}
  </div>
);
