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
          image="bg-[url('/assets/images/about-hero.png')] !bg-cover bg-top"
          overlay="from-[#090c14]/60 via-[#111322]/55 to-[#202317]/65 sm:from-[#090c14]/60 sm:via-[#111322]/55 sm:to-[#202317]/65"
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
