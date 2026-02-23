import { useEffect } from "react";
import Header from "../../components/ui/Header";
import ScrollProgress from "../../components/ui/ScrollProgress";
import ProfessionalBio from "./components/ProfessionalBio";
import DownloadResume from "./components/DownloadResume";
import Footer from "../../components/Footer";
import GenericHeroSection from "../portfolio-projects/components/GenericHero";

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

      <section className="relative py-12 h-full">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
          <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4"></div>
          <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[340px] z-40 h-20 -bottom-10 translate-y-14"></div>
        </div>
        <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-4 sm:px-6">
          {/* Professional Biography */}
          <ProfessionalBio />
        </div>
      </section>
      <DownloadResume />
      {/* Download Resume */}

      {/* Social Proof */}
      {/* <SocialProof /> */}

      {/* Footer */}
      <Footer lightweight />
    </div>
  );
};

export default AboutProfessional;
