import { Car } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const defaultText =
  "Connect with me. I'd take you on a Journey to Digital Freedom";

const ToolTip = ({ className, message = defaultText }) => (
  <div
    className={`w-44 p-4 bg-[#2a363c] text-foreground absolute bottom-full mb-2 ${className}`}
  >
    {message}
  </div>
);

const CarTransition = ({ className, message, active = true }) => {
  const [showCar, setShowCar] = useState(false);
  const carDownRef = useRef(null);
  const carUpRef = useRef(null);
  const tooltipRef = useRef(null);
  const tooltipReverseRef = useRef(null);
  const lastScrollY = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const check = () => setShowCar(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!active || !showCar) return;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (lastScrollY.current === null) {
          lastScrollY.current = scrollY;
          rafRef.current = null;
          return;
        }

        const scrollingDown = scrollY > lastScrollY.current;
        lastScrollY.current = scrollY;

        const position = (scrollY * 0.1) % 100;
        const edgeOpacity =
          position < 5
            ? position / 5
            : position > 95
              ? (100 - position) / 5
              : 1;
        const showTooltip = position > 20 && position < 70;

        const down = carDownRef.current;
        const up = carUpRef.current;
        if (!down || !up) {
          rafRef.current = null;
          return;
        }

        const trackWidth = document.documentElement.clientWidth;
        const carWidth = 40;
        const px = (position / 100) * (trackWidth - carWidth);
        const opacity = String(edgeOpacity);

        down.style.transform = `translateX(${px}px)`;
        down.style.opacity = scrollingDown ? opacity : "0";

        up.style.transform = `translateX(${px}px) scaleX(-1)`;
        up.style.opacity = scrollingDown ? "0" : opacity;

        if (tooltipRef.current) {
          tooltipRef.current.style.display =
            showTooltip && scrollingDown ? "block" : "none";
        }
        if (tooltipReverseRef.current) {
          tooltipReverseRef.current.style.display =
            showTooltip && !scrollingDown ? "block" : "none";
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, showCar]);

  if (!active || !showCar) return null;

  return (
    <div
      className={`w-full absolute z-40 inset-x-0 pointer-events-none ${className}`}
      style={{ top: 0 }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "40px",
          contain: "layout style",
        }}
      >
        {/* scrolling down → faces right */}
        <div
          ref={carDownRef}
          style={{
            position: "absolute",
            top: "-29px",
            left: 0,
            width: "40px",
            opacity: 0,
            transition: "opacity 0.2s ease",
            willChange: "transform, opacity",
          }}
        >
          <div ref={tooltipRef} style={{ display: "none" }}>
            <ToolTip message={message} />
          </div>
          <Car className="w-10 h-10 text-white fill-primary" />
        </div>

        {/* scrolling up → faces left */}
        <div
          ref={carUpRef}
          style={{
            position: "absolute",
            top: "-29px",
            left: 0,
            width: "40px",
            opacity: 0,
            transition: "opacity 0.2s ease",
            willChange: "transform, opacity",
          }}
        >
          <div ref={tooltipReverseRef} style={{ display: "none" }}>
            <ToolTip message={message} className="scale-x-[-1]" />
          </div>
          <Car className="w-10 h-10 text-white fill-primary" />
        </div>
      </div>
    </div>
  );
};

export default CarTransition;