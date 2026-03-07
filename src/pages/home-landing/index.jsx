import { useEffect, useState } from "react";
import Header from "../../components/ui/Header";
import ScrollProgress from "../../components/ui/ScrollProgress";
import HeroSection from "./components/HeroSection";
import FeaturedProjects from "./components/FeaturedProjects";
import Footer from "../../components/Footer";
import TestimonialSection from "./components/TestimonialSection";
import Skills from "./components/Skills";
import ContactCta from "./components/ContactCta";

/* ─── Cinematic curtain ──────────────────────────────────────── */
const CinematicCurtain = () => {
  const [done, setDone] = useState(false);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    setTimeout(() => setLifting(true), 3800); // wait for logo to breathe
    setTimeout(() => setDone(true), 4400);
  }, []);

  if (done) return null;

  return (
    <>
      <style>{`
        @keyframes curtainUp {
          from { transform: scaleY(1); transform-origin: bottom; }
          to   { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes curtainDown {
          from { transform: scaleY(1); transform-origin: top; }
          to   { transform: scaleY(0); transform-origin: top; }
        }
        @keyframes logoPulse {
          0%   { opacity: 0; transform: scale(0.8); }
          40%  { opacity: 1; transform: scale(1.05); }
          70%  { transform: scale(1); }
          85%  { opacity: 1; }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes textGlow {
          0%   { opacity: 0; letter-spacing: 0.3em; }
          30%  { opacity: 1; }
          80%  { opacity: 1; letter-spacing: 0.15em; }
          100% { opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 10px #6be6ff, 0 0 20px #6be6ff, 0 0 40px #6be6ff; }
          50%       { text-shadow: 0 0 20px #a78bfa, 0 0 40px #a78bfa, 0 0 80px #a78bfa; }
        }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        pointerEvents: "none", display: "flex", flexDirection: "column",
      }}>
        {/* Logo + text centered between the two curtain halves */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "0px",
        }}>
          {/* Logo */}
          <div style={{
            animation: "logoPulse 3.8s cubic-bezier(0.4,0,0.2,1) forwards",
          }}>
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-[25vw] h-[25vw]"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Glowing text */}
          <p style={{
            color: "#6be6ff",
            fontSize: "clamp(10px, 3vw, 26px)",
            fontWeight: 500,
            letterSpacing: "0.3em",
            // transform: "translateY(-40px)",
            textTransform: "uppercase",
            animation: "textGlow 3.8s cubic-bezier(0.4,0,0.2,1) forwards, glowPulse 1.5s ease-in-out infinite",
          }}>
            Not just a name. A digital experience.
          </p>
        </div>

        {/* Top curtain */}
        <div style={{
          flex: 1, background: "#0a0e1a",
          animation: lifting ? "curtainDown 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards" : "none",
        }} />

        {/* Bottom curtain */}
        <div style={{
          flex: 1, background: "#0a0e1a",
          animation: lifting ? "curtainUp 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards" : "none",
        }} />
      </div>
    </>
  );
};

/* ════════════════════════════════════════════════════════════ */
const HomeLanding = () => {
  useEffect(() => {
    document.title = "Jason Dagana | Frontend Developer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute(
        "content",
        "Professional frontend developer specializing in React, TypeScript, and modern web technologies. Building digital experiences that drives result."
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

  return (
    <main className="min-h-screen bg-white">
      <CinematicCurtain />

      <div className="relative bg-[url('/assets/images/background3.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <Header />
        <ScrollProgress />
        <div className="">
          <HeroSection />
        </div>
      </div>
      <main>
        <FeaturedProjects />
        <Skills />
        <TestimonialSection />
        <ContactCta />
      </main>
      <Footer lightweight />
    </main>
  );
};

export default HomeLanding;