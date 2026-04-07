import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { ChevronDown } from "lucide-react";
import "../../../styles/hero-section-styles.css";
import {
  NextJsIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "../../../components/BrandIcons";
import { useOnScreen } from "../../../hooks/useOnScreen";

const HeroSection = () => {
  const heroRef = useRef(null);
  const heroVisible = useOnScreen(heroRef);
  const isVisible = heroVisible

  // useEffect(() => {
  //   if (heroVisible) setIsVisible(true);
  // }, [heroVisible]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-card to-muted/20"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-20 left-20 w-72 h-72 transform-gpu will-change-transform bg-gradient-to-r from-primary to-blue-500 rounded-full blur-lg isolate animate-pulse-slow"
          style={{ transition: "transform 0.1s ease-out", transform: "translateZ(0)" }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent to-purple-500 rounded-full transform-gpu will-change-transform blur-lg animate-pulse-slow"
          style={{
            transition: isVisible ? "transform 0.1s ease-out" : undefined,
            animationDelay: isVisible ? "1s" : undefined,
          }}
        />
      </div>

      <div className="relative z-0 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl w-full mx-auto px-4 sm:px-12 pb-10 pt-20 sm:py-28 lg:py-20">
        <div className="grid lg:grid-cols-[60%_40%] mt-6 sm:mt-12 gap-12 items-center">

          {/* Content */}
          <div className="space-y-8 sm:pt-0 text-center lg:text-left">
            <div className="space-y-6">

              {/* Badge */}
              <div
                className={`hidden sm:inline-flex items-center px-2 sm:px-6 py-1 bg-gradient-to-r from-primary/20 mt-9 to-blue-500/20 text-primary rounded-full text-[9px] sm:text-sm font-medium border border-primary/20 backdrop-blur-sm shadow-lg transition-[transform,opacity] duration-700 hover:scale-105 hover:shadow-primary/20 hover:shadow-xl transform-gpu ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <Icon name="Code" size={16} className="mr-2 animate-pulse text-blue-300" />
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-blue-300 font-semibold">
                  Frontend Developer
                </span>
              </div>

              {/* Heading */}
              <div className="lg:min-h-[180px]">
                <h1
                  className={`text-[7.3vw] sm:text-5xl lg:text-5xl lg:text-[48px] 3xl:text-[4vw] lg:leading-tight font-normal text-foreground tracking-widest leading-tight transition-[transform,opacity] duration-700 transform-gpu ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <span className="font-black">Hi, I'm Jason.</span>
                  <br />
                  <span className="block bg-gradient-to-r font-bold from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x transform-gpu will-change-transform">
                    I Turn Ideas Into
                  </span>
                  Beautiful Web Apps
                </h1>
              </div>

              {/* Paragraph */}
              <p
                className={`text-lg md:text-xl text-muted-foreground !mt-0 max-w-xl mx-auto lg:ml-0 pt-2 leading-relaxed transition-[transform,opacity] duration-1000 delay-300 transform-gpu ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                React & Next.js developer who obsesses over clean code, fast load times, and interfaces users actually enjoy.
              </p>
            </div>

            {/* Mobile image */}
            <div
              className={`flex justify-center lg:hidden lg:justify-end lg:mr-[20%] transition-[transform,opacity] duration-1000 delay-300 transform-gpu ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <div className="relative group cursor-pointer">
                <div className="relative rounded-2xl lg:rounded-full h-auto w-full sm:w-[70vw] aspect-square sm:h-[50vw] sm:aspect-auto overflow-hidden lg:group-hover:border-2 group-hover:border-2 group-hover:border-primary/80 lg:animate-glow-ring lg:border-4 border-primary shadow-2xl transition-[border,shadow] duration-500 hover:shadow-primary/20 transform-gpu">
                  <div className="absolute w-full h-full z-10 group-hover:opacity-50 transition-opacity duration-300 transform-gpu" />
                  <Image
                    src="./assets/images/jason.webp"
                    alt="Jason Dagana - Frontend Developer"
                    title="Jason Dagana | Frontend Developer"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover object-[0_30%] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-5 justify-center lg:justify-start transition-[transform,opacity] duration-1000 delay-500 transform-gpu ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <Button variant="default" size="lg" iconName="Briefcase" iconPosition="left" asChild>
                <Link to="/projects">
                  <span className="relative z-10">Explore My Projects</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" iconName="Download" iconPosition="left" className="border-2">
                Get My Resume
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`flex gap-8 justify-center lg:justify-start pt-3 sm:pt-8 transition-[transform,opacity] duration-1000 delay-700 transform-gpu ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {[
                { number: "5+",   label: "Projects Completed",        color: "text-white" },
                { number: "7+",   label: "Modern Tools & Frameworks",  color: "text-white" },
                { number: "1000+", label: "GitHub Contributions",       color: "text-white" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group cursor-pointer transform hover:scale-110 transition-transform duration-300">
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} group-hover:animate-pulse group-hover:text-blue-200`}>
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-blue-200 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop image */}
          <div
            className={`lg:flex hidden justify-center lg:justify-end lg:mr-[20%] transition-[transform,opacity] duration-1000 delay-300 transform-gpu ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative group cursor-pointer">
              <div className="relative rounded-2xl lg:rounded-full w-[100%] aspect-square lg:aspect-auto overflow-hidden lg:group-hover:border-2 lg:border-[3px] border-primary shadow-2xl transition-[border,shadow] duration-500 hover:shadow-primary/20 transform-gpu">
                <Image
                  src="./assets/images/jason.webp"
                  alt="Jason Dagana - Frontend Developer"
                  title="Jason Dagana | Frontend Developer"
                  width={800}
                  height={800}
                  className="w-full h-full hover:scale-105 object-cover object-center transition-transform duration-500"
                />
              </div>

              {/* Orbit */}
              <div className="absolute !rounded-full inset-0 w-[110%] flex items-center justify-center pointer-events-none">
                <div className={`absolute !rounded-full inset-0 ${isVisible ? "animate-spin-slow-1 transform-gpu will-change-transform" : "animate-none"}`}>
                  <div className="absolute -right-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-1 transform-gpu">
                    <ReactIcon size={22} color="white" />
                  </div>
                  <div className="absolute -left-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-gray-500 to-black rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-2 transform-gpu">
                    <NextJsIcon size={22} color="white" />
                  </div>
                </div>

                <div className="absolute inset-0 animate-spin-reverse !rounded-full transform-gpu will-change-transform">
                  <div className="absolute -left-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-3 transform-gpu">
                    <TailwindIcon size={22} color="white" fill="white" />
                  </div>
                  <div className="absolute -right-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-4 transform-gpu">
                    <TypeScriptIcon size={22} color="white" fill="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        onClick={() => document.getElementById("featuredProjects")?.scrollIntoView({ behavior: "smooth" })}
        className={`absolute z-20 bottom-8 hidden sm:block left-1/2 transform -translate-x-1/2 cursor-pointer group transition-[transform,opacity] duration-1000 delay-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <ChevronDown className="z-50 text-white size-6 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;