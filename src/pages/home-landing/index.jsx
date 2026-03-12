import { Suspense, useEffect, useState, lazy } from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import Footer from "../../components/Footer";
import ContactCta from "./components/ContactCta";
import CinematicCurtain from "../../components/CinematicCurtain";
import { useLocation } from "react-router-dom";
const FeaturedProjects = lazy(() => import("./components/FeaturedProjects"));
const TestimonialSection = lazy(
  () => import("./components/TestimonialSection"),
);
const Skills = lazy(() => import("./components/Skills"));

const ROUTES_WITHOUT_CURTAIN = [
  "/projects",
  "/about-professional",
  "/contact-connect",
  "/technical-blog",
];

/* ════════════════════════════════════════════════════════════ */
const HomeLanding = () => {
  const { pathname } = useLocation();

  const [introDone, setIntroDone] = useState(
    sessionStorage.getItem("introSeen") === "true",
  );

  const showIntro = !introDone && !ROUTES_WITHOUT_CURTAIN.includes(pathname);

  const handleFinish = () => {
    sessionStorage.setItem("introSeen", "true");
    setIntroDone(true);
  };
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
    document.addEventListener("click", handleSmoothScroll, {passive: true});
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return showIntro ? (
    <CinematicCurtain
      done={introDone}
      setDone={setIntroDone}
      handleFinish={handleFinish}
    />
  ) : (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-hidden">
        <div className="relative bg-[url('/assets/images/background3.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="">
            <HeroSection />
          </div>
        </div>
        <div>
          <Suspense fallback={null}>
            <FeaturedProjects />
            <Skills />
            <TestimonialSection />
          </Suspense>
          <ContactCta />
        </div>
      </main>
        <Footer lightweight />
    </>
  );
};

export default HomeLanding;
