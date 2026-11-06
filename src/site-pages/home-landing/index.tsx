"use client";

import { useEffect, useState, lazy } from "react";
import { usePathname } from "next/navigation";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import Footer from "../../components/Footer";
import ContactCta from "./components/ContactCta";
import CinematicCurtain from "../../components/CinematicCurtain";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import TestimonialSection from "./components/TestimonialSection";

const ROUTES_WITHOUT_CURTAIN = [
  "/projects",
  "/about-professional",
  "/contact-connect",
  "/my-articles",
];

/* ════════════════════════════════════════════════════════════ */
const HomeLanding = () => {
  const pathname = usePathname();
  const [introDone, setIntroDone] = useState<boolean | null>(null);

  const showIntro =
    introDone === false && !ROUTES_WITHOUT_CURTAIN.includes(pathname);

  useEffect(() => {
    setIntroDone(window.sessionStorage.getItem("introSeen") === "true");
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("introSeen", "true");
    setIntroDone(true);
  };
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target =
        e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (target) {
        e?.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handleSmoothScroll, { passive: true });
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden">
        <div className="relative bg-[url('/assets/images/background3.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="">
            <HeroSection />
          </div>
        </div>
        <FeaturedProjects />
        <Skills />
        <TestimonialSection />
        <ContactCta />
      </main>
      <Footer lightweight />
      {showIntro && (
        <CinematicCurtain
          done={false}
          setDone={setIntroDone}
          handleFinish={handleFinish}
        />
      )}
    </>
  );
};

export default HomeLanding;
