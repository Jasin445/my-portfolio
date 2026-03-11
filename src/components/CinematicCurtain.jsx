import { useEffect, useState, useRef } from "react";

const LOGO_DURATION = 3600;
const LIFT_DURATION = 1400;

const CinematicCurtain = ({ onFinish, onStart }) => {
  const [lifting, setLifting] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef([]);
  const refs = useRef({ top: null, bottom: null, center: null });

  // Ref callback — promotes layer BEFORE first paint, not after
  const promoteRef = (key) => (el) => {
    if (!el) return;
    refs.current[key] = el;
    el.style.willChange = "transform, opacity";
    el.style.transform = "translateZ(0)";
  };

  useEffect(() => {
    const schedule = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
      return id;
    };

    // Sync first tick with compositor so CSS animations
    // and JS timeline start from the exact same frame
    const raf = requestAnimationFrame(() => {
      const rafInner = requestAnimationFrame(() => {
        schedule(() => {
          // Batch the state update + callbacks in one RAF
          requestAnimationFrame(() => {
            setLifting(true);
            onStart?.();
          });

          schedule(() => {
            requestAnimationFrame(() => {
              Object.values(refs.current).forEach((el) => {
                if (el) el.style.willChange = "auto";
              });
              onFinish?.();
              setDone(true);
            });
          }, LIFT_DURATION + 100);

        }, LOGO_DURATION);
      });
      timers.current.push(rafInner);
    });

    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach((id) => {
        // ids could be raf or timeout handles — cancel both
        cancelAnimationFrame(id);
        clearTimeout(id);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        ref={promoteRef("center")}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateZ(0)",
        }}
      >
        <div
          className="cc-logo"
          style={{
            animation: `logoPulse ${LOGO_DURATION + 200}ms cubic-bezier(0.4,0,0.2,1) forwards`,
            transform: "translateZ(0)",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-[25vw] h-[25vw]"
            decoding="async"
            fetchpriority="high"
            style={{ objectFit: "contain", transform: "translateZ(0)" }}
          />
        </div>

        <p
          className="cc-text"
          style={{
            color: "#6be6ff",
            fontSize: "clamp(10px, 3vw, 26px)",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            animation: `textGlow ${LOGO_DURATION + 200}ms cubic-bezier(0.4,0,0.2,1) forwards, glowPulse 1.5s ease-in-out infinite`,
            transform: "translateZ(0)",
          }}
        >
          Not just a name. A digital experience!.
        </p>
      </div>

      <div
        ref={promoteRef("top")}
        className="cc-top"
        style={{
          height: "50%",
          background: "#0a0e1a",
          transform: "translateZ(0)",
          animation: lifting
            ? `curtainDown ${LIFT_DURATION}ms cubic-bezier(0.22,1,0.36,1) forwards`
            : "none",
        }}
      />

      <div
        ref={promoteRef("bottom")}
        className="cc-bottom"
        style={{
          height: "50%",
          background: "#0a0e1a",
          transform: "translateZ(0)",
          animation: lifting
            ? `curtainUp ${LIFT_DURATION}ms cubic-bezier(0.22,1,0.36,1) forwards`
            : "none",
        }}
      />
    </div>
  );
};

export default CinematicCurtain;





// const CinematicCurtain = ({ done, setDone }) => {
//   const [lifting, setLifting] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setLifting(true), 3800); // wait for logo to breathe
//     setTimeout(() => setDone(true), 4400);
//   }, []);

//   if (done) return null;

//   return (
//     <>
//       <style>{`
       
//       `}</style>

//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           zIndex: 9999,
//           pointerEvents: "none",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Logo + text centered between the two curtain halves */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             zIndex: 10,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "0px",
//           }}
//         >
//           {/* Logo */}
//           <div
//             style={{
//               animation: "logoPulse 3.8s cubic-bezier(0.4,0,0.2,1) forwards",
//             }}
//           >
//             <img
//               src="/assets/logo.png"
//               alt="Logo"
//               className="w-[25vw] h-[25vw]"
//               style={{ objectFit: "contain" }}
//             />
//           </div>

//           {/* Glowing text */}
//           <p
//             style={{
//               color: "#6be6ff",
//               fontSize: "clamp(10px, 3vw, 26px)",
//               fontWeight: 500,
//               letterSpacing: "0.3em",
//               // transform: "translateY(-40px)",
//               textTransform: "uppercase",
//               animation:
//                 "textGlow 3.8s cubic-bezier(0.4,0,0.2,1) forwards, glowPulse 1.5s ease-in-out infinite",
//             }}
//           >
//             Not just a name. A digital experience!.
//           </p>
//         </div>

//         {/* Top curtain */}
//         <div
//           style={{
//             flex: 1,
//             background: "#0a0e1a",
//             animation: lifting
//               ? "curtainDown 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards"
//               : "none",
//           }}
//         />

//         {/* Bottom curtain */}
//         <div
//           style={{
//             flex: 1,
//             background: "#0a0e1a",
//             animation: lifting
//               ? "curtainUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards"
//               : "none",
//           }}
//         />
//       </div>
//     </>
//   );
// };
