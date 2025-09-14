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
      <main className="pt-16">
        {/* Hero Section */}
        <ProfessionalHero />

        {/* Professional Biography */}
        <ProfessionalBio />

        {/* Career Timeline */}
        <CareerTimeline />

        {/* Skills Visualization */}
        <SkillsVisualization />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Download Resume */}
        <DownloadResume />

        {/* Social Proof */}
        {/* <SocialProof /> */}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutProfessional;
