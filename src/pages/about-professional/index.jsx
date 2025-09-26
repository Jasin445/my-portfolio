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
    <div className="min-h-screen  bg-background">
      <Header />
      <ScrollProgress />
      <main className="pt-16 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto">
        {/* Hero Section */}
        {/* <ProfessionalHero /> */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
                   <div className="mx-auto px-6">
                     <div className="text-center max-w-4xl mx-auto">
                       <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                         <Icon name="BookOpen" size={16} />
                         <span>About Me</span>
                       </div>
                       
                       <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                         Learn The Drive Behind Being a
                         <span className="text-primary"> Modern Developer</span>
                       </h1>
                       
                       <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                         
                       </p>
       
                       {/* Blog Stats */}
                       {/* <BlogStats stats={blogStats} className="mb-8" /> */}
                     </div>
                   </div>
                 </section>

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
