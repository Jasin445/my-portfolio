import { Suspense, useEffect, useState, lazy } from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import Footer from "../../components/Footer";
import ContactCta from "./components/ContactCta";
const FeaturedProjects = lazy(() => import("./components/FeaturedProjects"));
const TestimonialSection = lazy(
  () => import("./components/TestimonialSection"),
);
const Skills = lazy(() => import("./components/Skills"));

/* ─── Cinematic curtain ──────────────────────────────────────── */
const CinematicCurtain = ({ done, setDone }) => {
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    setTimeout(() => setLifting(true), 3800); // wait for logo to breathe
    setTimeout(() => setDone(true), 4400);
  }, []);

  if (done) return null;

  return (
    <>
      <style>{`
       
      `}</style>

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
        {/* Logo + text centered between the two curtain halves */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              animation: "logoPulse 3.8s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          >
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-[25vw] h-[25vw]"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Glowing text */}
          <p
            style={{
              color: "#6be6ff",
              fontSize: "clamp(10px, 3vw, 26px)",
              fontWeight: 500,
              letterSpacing: "0.3em",
              // transform: "translateY(-40px)",
              textTransform: "uppercase",
              animation:
                "textGlow 3.8s cubic-bezier(0.4,0,0.2,1) forwards, glowPulse 1.5s ease-in-out infinite",
            }}
          >
            Not just a name. A digital experience!.
          </p>
        </div>

        {/* Top curtain */}
        <div
          style={{
            flex: 1,
            background: "#0a0e1a",
            animation: lifting
              ? "curtainDown 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards"
              : "none",
          }}
        />

        {/* Bottom curtain */}
        <div
          style={{
            flex: 1,
            background: "#0a0e1a",
            animation: lifting
              ? "curtainUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards"
              : "none",
          }}
        />
      </div>
    </>
  );
};

/* ════════════════════════════════════════════════════════════ */
const HomeLanding = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    document.title = "Jason Dagana | Frontend Developer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute(
        "content",
        "Professional frontend developer specializing in React, TypeScript, and modern web technologies. Building digital experiences that drives result.",
      );
    }
    const handleSmoothScroll = (e) => {
      const target = e?.target?.closest('a[href^="#"]');
      if (target) {
        e?.preventDefault();
        const targetId = target?.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return !done ? (
    <CinematicCurtain done={done} setDone={setDone} />
  ) : (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <div className="relative bg-[url('/assets/images/background3.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <Header />
        <div className="">
          <HeroSection />
        </div>
      </div>
      <main>
        <Suspense fallback={null}>
          <FeaturedProjects />
        <Skills />
        <TestimonialSection />
        </Suspense>
        <ContactCta />
      </main>
      <Footer lightweight />
    </main>
  );
};

export default HomeLanding;
