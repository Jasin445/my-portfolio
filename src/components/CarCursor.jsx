import { useEffect, useState } from "react";
import { CarFront } from "lucide-react";
import Image from "./AppImage"

export default function CarCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
console.log("hellop there")
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate(${pos.x - 24}px, ${pos.y - 24}px)`,
      }}
    >
      <Image
        src="assets/logo.png"
        alt="cursor"
        width={52}
        height={52}
      />
        
    </div>
  );
}
