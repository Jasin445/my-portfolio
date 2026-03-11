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



/* ════════════════════════════════════════════════════════════ */
const HomeLanding = () => {
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

  return (
    <main className="min-h-screen bg-white overflow-hidden">
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
