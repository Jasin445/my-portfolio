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
  const carDownRef        = useRef(null);
  const carUpRef          = useRef(null);
  const tooltipRef        = useRef(null);
  const tooltipReverseRef = useRef(null);
  const rafRef            = useRef(null);
  const stopTimer         = useRef(null);
  const isMoving          = useRef(false);

  // All scroll state in one ref — written synchronously, read in rAF
  const stateRef = useRef({
    scrollY:       0,
    lastScrollY:   -1,   // -1 = uninitialized
    scrollingDown: true,
  });

  useEffect(() => {
    const check = () => setShowCar(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!active || !showCar) return;

    const promote = () => {
      if (carDownRef.current) carDownRef.current.style.willChange = "transform, opacity";
      if (carUpRef.current)   carUpRef.current.style.willChange   = "transform, opacity";
    };
    const demote = () => {
      if (carDownRef.current) carDownRef.current.style.willChange = "auto";
      if (carUpRef.current)   carUpRef.current.style.willChange   = "auto";
    };

    const paint = () => {
      rafRef.current = null;
      const { scrollY, scrollingDown } = stateRef.current;

      const down = carDownRef.current;
      const up   = carUpRef.current;
      if (!down || !up) return;

      const trackWidth  = document.documentElement.clientWidth;
      const carWidth    = 40;
      const position    = (scrollY * 0.08) % 100;
      const edgeOpacity =
        position < 3  ? position / 3 :
        position > 97 ? (100 - position) / 3 : 1;

      const px          = (position / 100) * (trackWidth - carWidth);
      const showTooltip = position > 20 && position < 75;

      down.style.transform = `translateX(${px}px)`;
      down.style.opacity   = scrollingDown ? String(edgeOpacity) : "0";

      up.style.transform   = `translateX(${px}px) scaleX(-1)`;
      up.style.opacity     = scrollingDown ? "0" : String(edgeOpacity);

      if (tooltipRef.current) {
        tooltipRef.current.style.visibility =
          showTooltip && scrollingDown ? "visible" : "hidden";
      }
      if (tooltipReverseRef.current) {
        tooltipReverseRef.current.style.visibility =
          showTooltip && !scrollingDown ? "visible" : "hidden";
      }
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const s        = stateRef.current;

      // Direction committed synchronously — never lost to rAF skipping
      if (s.lastScrollY !== -1 && currentY !== s.lastScrollY) {
        s.scrollingDown = currentY > s.lastScrollY;
      }
      s.lastScrollY = currentY;
      s.scrollY     = currentY;

      if (!isMoving.current) {
        isMoving.current = true;
        promote();
      }

      clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => {
        isMoving.current = false;
        if (carDownRef.current) carDownRef.current.style.opacity = "0";
        if (carUpRef.current)   carUpRef.current.style.opacity   = "0";
        demote();
      }, 5000);

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(paint);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(stopTimer.current);
      demote();
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
          width:    "100%",
          height:   "40px",
          contain:  "layout style",
        }}
      >
        {/* scrolling down → faces right */}
        <div
          ref={carDownRef}
          style={{
            position:   "absolute",
            top:        "-29px",
            left:       0,
            width:      "40px",
            opacity:    0,
            transition: "opacity 0.15s ease",
            // transitionDuration: 100000
          }}
        >
          <div ref={tooltipRef} style={{ visibility: "hidden" }}>
            <ToolTip message={message} />
          </div>
          <Car className="w-10 h-10 text-white fill-primary" />
        </div>

        {/* scrolling up → faces left */}
        <div
          ref={carUpRef}
          style={{
            position:   "absolute",
            top:        "-29px",
            left:       0,
            width:      "40px",
            opacity:    0,
            transition: "opacity 0.15s ease",
            // transitionDuration: 100000
          }}
        >
          <div ref={tooltipReverseRef} style={{ visibility: "hidden" }}>
            <ToolTip message={message} className="scale-x-[-1]" />
          </div>
          <Car className="w-10 h-10 text-white fill-primary" />
        </div>
      </div>
    </div>
  );
};

export default CarTransition;