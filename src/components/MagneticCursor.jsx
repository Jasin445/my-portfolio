import { useEffect, useState } from "react";
import { CarFront } from "lucide-react";
import Image from "./AppImage"


/* ─── Custom magnetic cursor ─────────────────────────────────── */
const MagneticCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener("mousemove", move);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 8, height: 8,
          borderRadius: "50%", background: "#6be6ff", pointerEvents: "none",
          zIndex: 9999, transition: "transform 0.05s",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 32, height: 32,
          borderRadius: "50%", border: "1.5px solid rgba(107,230,255,0.5)",
          pointerEvents: "none", zIndex: 9998,
        }}
      />
    </>
  );
};

export default MagneticCursor