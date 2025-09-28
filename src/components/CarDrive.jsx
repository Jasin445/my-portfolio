import { Car } from "lucide-react";
import { useEffect, useState } from "react";

const defaultText = "Connect with me. I'd take you on a Journey to Digital Freedom"

const ToolTip = ({className, message = defaultText}) => {
  return (
    <div className={`w-44 p-4 bg-[#2a363c] text-foreground ${className}`}>
      {message}
    </div>
  );
};

const CarTransition = ({className, message}) => {
  const [carPosition, setCarPosition] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Detect direction
      const scrollingDown = scrollY > lastScrollY;
      setIsScrollingDown(scrollingDown);
      setLastScrollY(scrollY);

      // Calculate position (0 to 100)
      const progress = Math.min(Math.max((scrollY / heroHeight) * 100, 0), 100);
      setCarPosition(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
    
    const showTooltip = carPosition > 20 && carPosition < 70;
    const topPosition = showTooltip ? "-10rem" : "-30px";

  return (
      <div className={`w-full absolute z-40 inset-x-0 bg-transparent overflow-hidden pointer-events-none ${className}`} style={{top: topPosition}}>
      {/* Car for scrolling DOWN (moves right) */}
      <div
        style={{
          left: `${carPosition}%`,
          position: "relative",
          opacity: isScrollingDown ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
          {showTooltip && <ToolTip message={message} />}
          {carPosition > 0 && <Car className="w-10 h-10 text-white fill-primary" />}
      </div>

      {/* Car for scrolling UP (moves left, facing left) */}
      <div
        style={{
          left: `${carPosition}%`,
          position: "absolute",
          top: 0,
          transform: "scaleX(-1)",
          opacity: !isScrollingDown ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {showTooltip && <ToolTip message={message} className={"scale-x-[-1]"}/>}
        <Car className="w-10 h-10 text-white fill-primary" />
      </div>
    </div>
  );
};

export default CarTransition;
