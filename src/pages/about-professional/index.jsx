import React, { useEffect } from "react";
import Header from "../../components/ui/Header";
import ScrollProgress from "../../components/ui/ScrollProgress";
import ProfessionalHero from "./components/ProfessionalHero";
import ProfessionalBio from "./components/ProfessionalBio";
import CareerTimeline from "./components/CareerTimeline";
import SkillsVisualization from "./components/SkillsVisualization";
import TestimonialsSection from "./components/TestimonialsSection";
import DownloadResume from "./components/DownloadResume";
import Footer from "../../components/Footer";
import BlogStats from "../technical-blog/components/BlogStats";
import Icon from "../../components/AppIcon";
import GenericHeroSection from "../portfolio-projects/components/GenericHero";
import PagesLayout from "../../components/PagesLayout";

const AboutProfessional = () => {
  useEffect(() => {
    // Set page title
    document.title = "About - Jason Dagana | Frontend Developer & UI Architect";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute(
        "content",
        "Learn about Jason Dagana, a passionate frontend developer with 6+ years of experience in React, TypeScript, and modern web technologies. Download resume and connect for opportunities."
      );
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollProgress />
        <GenericHeroSection title={"About Me"} />
    
        <PagesLayout>

        {/* Professional Biography */}
        <ProfessionalBio />

       
        </PagesLayout>
        <DownloadResume />
        {/* Download Resume */}

        {/* Social Proof */}
        {/* <SocialProof /> */}
    
      {/* Footer */}
      <Footer lightweight/>
    </div>
  );
};

export default AboutProfessional;
