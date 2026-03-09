/* ─── 3D Tilt Card ───────────────────────────────────────────── */
export const TiltCard = ({ children }) => {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03) translateZ(10px)`;
    el.style.transition = "transform 0.1s ease";

    // shine follow
    const shine = el.querySelector(".tilt-shine");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.08) 0%, transparent 65%)`;
    }
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0)";
    el.style.transition = "transform 0.7s cubic-bezier(0.4,0,0.2,1)";
    const shine = el.querySelector(".tilt-shine");
    if (shine) shine.style.background = "transparent";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: "transform", position: "relative" }}
    >
      {/* Shine overlay */}
      <div
        className="tilt-shine"
        style={{
          position: "absolute", inset: 0, borderRadius: "1rem",
          zIndex: 20, pointerEvents: "none", transition: "background 0.15s ease",
        }}
      />
      {children}
    </div>
  );
};