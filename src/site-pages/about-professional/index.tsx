"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/Footer";
import GenericHeroSection from "../portfolio-projects/components/GenericHero";
import ProfessionalBio from "./components/ProfessionalBio";
import DownloadResume from "./components/DownloadResume";

const AboutProfessional = () => {
  return (
    <>
      <Header />
      <main className="portfolio-canvas relative isolate min-h-screen overflow-hidden">
        <GenericHeroSection
          title={"About Me"}
          imageSrc="/assets/images/about-hero.png"
          imagePosition="top"
          overlay=""
        />

        <section className="relative py-12 h-full">
          <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-4 sm:px-6">
            <ProfessionalBio />
          </div>
        </section>
        <DownloadResume />
      </main>
      <Footer lightweight />
    </>
  );
};

export default AboutProfessional;
