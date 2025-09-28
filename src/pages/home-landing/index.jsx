import { useEffect } from "react";
import Header from "../../components/ui/Header";
import ScrollProgress from "../../components/ui/ScrollProgress";
import HeroSection from "./components/HeroSection";
import FeaturedProjects from "./components/FeaturedProjects";
import SkillsOverview from "../portfolio-projects/components/SkillsOverview";
import ContactSection from "../contact-connect";
import Footer from "../../components/Footer";
import TestimonialSection from "./components/TestimonialSection";
import Skills from "./components/Skills";
import ContactCta from "./components/ContactCta";

const HomeLanding = () => {
  useEffect(() => {
    // Set page title
    document.title = "Jason Dagana | Frontend Developer";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute(
        "content",
        "Professional frontend developer specializing in React, TypeScript, and modern web technologies. Building digital experiences that drives result."
      );
    }

    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e?.target?.closest('a[href^="#"]');
      if (target) {
        e?.preventDefault();
        const targetId = target?.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-[url('assets/images/background3.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
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
      <Footer lightweight/>
    </div>
  );
};

export default HomeLanding;
