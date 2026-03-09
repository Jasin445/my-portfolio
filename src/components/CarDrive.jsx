import { Car } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const defaultText = "Connect with me. I'd take you on a Journey to Digital Freedom";


const ToolTip = ({ className, message = defaultText }) => (
  <div
    className={`w-44 p-4 bg-[#2a363c] text-foreground absolute bottom-full mb-2 ${className}`}
  >
    {message}
  </div>
);

const CarTransition = ({ className, message }) => {
  const [carState, setCarState] = useState({ position: 0, scrollingDown: true });
  const [showCar, setShowCar] = useState(false);
  const lastScrollY = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const configWidth = () => setShowCar(window.innerWidth >= 1024);
    configWidth();
    window.addEventListener("resize", configWidth);
    return () => window.removeEventListener("resize", configWidth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollingDown = scrollY > lastScrollY.current;
        lastScrollY.current = scrollY;
        const position = Math.min(Math.max((scrollY / window.innerHeight) * 100, 0), 100);
        setCarState({ position, scrollingDown });
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const { position, scrollingDown } = carState;
  const showTooltip = position > 20 && position < 70;
  const edgeOpacity = position < 5 ? position / 5 : position > 95 ? (100 - position) / 5 : 1;


  if (!showCar) return null;

  return (
    <div
      className={`w-full absolute z-40 inset-x-0 bg-transparent pointer-events-none ${className}`}
      style={{ top: 0 }} // ← never moves
    >
      {/* Car scrolling DOWN → moves right */}
      <div
        style={{
          left: `${position}%`,
          top: "-29px",
          position: "relative",
    opacity: scrollingDown ? edgeOpacity : 0,  // ← edgeOpacity instead of 1
          transition: "opacity 0.2s ease",
        }}
      >
        {/* tooltip floats above the car via absolute positioning */}
        {showTooltip && <ToolTip message={message} />}
        {position > 0 && <Car className="w-10 h-10 text-white fill-primary" />}
      </div>

      {/* Car scrolling UP → moves left, mirrored */}
      <div
        style={{
          left: `${position}%`,
          position: "absolute",
          top: "-29px",
          transform: "scaleX(-1)",
    opacity: !scrollingDown ? edgeOpacity : 0,  // ← edgeOpacity instead of 1
          transition: "opacity 0.2s ease",
        }}
      >
        {showTooltip && <ToolTip message={message} className="scale-x-[-1]" />}
        <Car className="w-10 h-10 text-white fill-primary" />
      </div>
    </div>
  );
};

export default CarTransition;