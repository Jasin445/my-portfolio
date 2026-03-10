import { useEffect, useRef, useState, useMemo } from "react";

/* ─── Underwater Fish Tank ───────────────────────────────────── */
const FishTank = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", {
      willReadFrequently: false,
      alpha: true,
    });

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

    // ── buildGrads declared FIRST so resize can call it ──
    let cachedGrads = [];
    const buildGrads = () => {
      cachedGrads = Array.from({ length: 5 }, () => {
        const grad = ctx.createLinearGradient(0, 0, 40, canvas.height * 0.7);
        grad.addColorStop(0, "rgba(107,230,255,0.04)");
        grad.addColorStop(1, "rgba(107,230,255,0)");
        return grad;
      });
    };

    // ── resize declared AFTER buildGrads ──
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrads();
    };
    resize();
    window.addEventListener("resize", resize);

    const fishes = Array.from({ length: 30 }, () => {
      const size = Math.random() * 10 + 3;
      const colorPair =
        fishColors[Math.floor(Math.random() * fishColors.length)];
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: Math.random() * (canvas.width || 1400),
        y: Math.random() * (canvas.height || 800),
        size,
        speed: (Math.random() * 0.6 + 0.15) * dir,
        vy: (Math.random() - 0.5) * 0.08,
        waveAmp: Math.random() * 1.5 + 0.3,
        waveFreq: Math.random() * 0.04 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: colorPair[0],
        finColor: colorPair[1],
        alpha: Math.random() * 0.45 + 0.15,
        dir,
        tailPhase: Math.random() * Math.PI * 2,
        tailSpeed: Math.random() * 0.12 + 0.06,
        depth: Math.random(),
      };
    });

    const bubbles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 800,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.12 + 0.04,
    }));

    const drawFish = (ctx, fish, t) => {
      const { x, y, size, color, finColor, alpha, dir, tailPhase, depth } =
        fish;
      const depthAlpha = alpha * (0.3 + depth * 0.7);
      const depthSize = size * (0.5 + depth * 0.5);
      const tail =
        Math.sin(t * fish.tailSpeed * 60 + tailPhase) * (depthSize * 0.35);

      ctx.save();
      ctx.globalAlpha = depthAlpha;
      ctx.translate(x, y);
      if (dir < 0) ctx.scale(-1, 1);

      ctx.beginPath();
      ctx.ellipse(0, 0, depthSize * 1.6, depthSize * 0.65, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-depthSize * 1.4, 0);
      ctx.lineTo(-depthSize * 2.2, tail - depthSize * 0.5);
      ctx.lineTo(-depthSize * 2.2, tail + depthSize * 0.5);
      ctx.closePath();
      ctx.fillStyle = finColor;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-depthSize * 0.2, -depthSize * 0.65);
      ctx.quadraticCurveTo(
        depthSize * 0.3,
        -depthSize * 1.2,
        depthSize * 0.8,
        -depthSize * 0.65,
      );
      ctx.fillStyle = finColor + "aa";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        depthSize * 0.9,
        -depthSize * 0.1,
        depthSize * 0.18,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(
        depthSize * 0.93,
        -depthSize * 0.13,
        depthSize * 0.07,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#fff";
      ctx.fill();

      ctx.restore();
    };

    fishes.sort((a, b) => a.depth - b.depth);

    let raf;
    let t = 0;
    let lastTime = 0;
    let paused = false;

    const handleVisibility = () => {
      paused = document.hidden;
      if (!paused) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const draw = (timestamp) => {
      if (paused) return;
      if (timestamp - lastTime < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;
      t += 0.016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10, 20, 50, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 5; i++) {
        const rx = (canvas.width / 4) * i + Math.sin(t * 0.3 + i) * 30;
        ctx.beginPath();
        ctx.moveTo(rx, 0);
        ctx.lineTo(rx + 60, canvas.height * 0.7);
        ctx.lineTo(rx - 60, canvas.height * 0.7);
        ctx.fillStyle = cachedGrads[i];
        ctx.fill();
      }

      ctx.lineWidth = 0.5;
      bubbles.forEach((b) => {
        b.y -= b.speed;
        b.wobble += 0.02;
        b.x += Math.sin(b.wobble) * 0.3;
        if (b.y < -10) {
          b.y = canvas.height + 10;
          b.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180,240,255,${b.alpha})`;
        ctx.stroke();
      });

      fishes.forEach((fish) => {
        fish.phase += fish.waveFreq;
        fish.x += fish.speed;
        fish.y += Math.sin(fish.phase) * fish.waveAmp + fish.vy;

        if (fish.dir > 0 && fish.x > canvas.width + 30) fish.x = -30;
        if (fish.dir < 0 && fish.x < -30) fish.x = canvas.width + 30;
        if (fish.y < -20) fish.y = canvas.height + 20;
        if (fish.y > canvas.height + 20) fish.y = -20;

        drawFish(ctx, fish, t);
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

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
        willChange: "transform",
      }}
    />
  );
};

export default FishTank;

/* ─── Reveal section phase styles (direction-aware, outside component) ── */
const makePhaseStyle = (direction) => {
  const hidden =
    {
      up: "translateY(180px) rotate(-16deg) scale(0.85)",
      down: "translateY(-180px) rotate(4deg) scale(0.85)",
      left: "translateX(80px) rotate(16deg) scale(0.85)",
      right: "translateX(-80px) rotate(-16deg) scale(0.85)",
    }[direction] ?? "translateY(80px) rotate(-16deg) scale(0.85)";

  return (phase) => {
    if (phase === 0)
      return {
        opacity: 0,
        transform: hidden,
        filter: "blur(8px) brightness(0.3)",
        willChange: "transform, opacity, filter",
      };

    return {
      opacity: 1,
      transform: "translate(0) rotate(0deg) scale(1)",
      filter: "blur(0px) brightness(1)",
      transition: "all 2.4s cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "auto",
    };
  };
};

export const RevealSection = ({
  children,
  index = 0,
  direction = "up",
  className = "",
}) => {
  const ref = useRef(null);
  const t1 = useRef(null);
  const [phase, setPhase] = useState(0);
  const getStyle = useMemo(() => makePhaseStyle(direction), [direction]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        t1.current = setTimeout(() => setPhase(1), index * 120);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(t1.current);
    };
  }, [index]);

  return (
    <div ref={ref} className={className} style={getStyle(phase)}>
      {children}
    </div>
  );
};

/* ─── TiltCard — mouse-tracking 3-D tilt, no state re-renders ── */
export const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const leaveTimer = useRef(null);

  const handleMove = (e) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    clearTimeout(leaveTimer.current);
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
    el.style.transition = "transform 0.08s ease-out";
    el.style.willChange = "transform";
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1)";
    leaveTimer.current = setTimeout(() => {
      if (ref.current) ref.current.style.willChange = "auto";
    }, 500);
  };

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  return (
    <div
      ref={ref}
      className="h-full"
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
