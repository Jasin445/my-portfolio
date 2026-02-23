// OverlayDesign.tsx
import React from "react";

const OverlayDesign: React.FC<{children: React.ReactNode, id: string}> = ({children, id}) => {
  return (
     <section className="relative py-12 h-full" id={id}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
      <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4"></div>
      <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[340px] z-40 h-20 -bottom-10 translate-y-14"></div>
      </div>
      <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-4 sm:px-6">
        {children}
       </div>
      </section>
  );
};

export default OverlayDesign;