import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { Atom, Code2, ChevronDown } from "lucide-react";
import { FaReact, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const typewriterText = ["Building Digital Experiences That Drives Result"];
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < typewriterText.length && isVisible) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + typewriterText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isVisible, typewriterText]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-muted/20">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Animated gradient orbs */}
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary to-blue-500 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent to-purple-500 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.1s ease-out",
            animationDelay: "1s",
          }}
        ></div>

        {/* Floating particles */}
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-primary rounded-full animate-float"></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-accent rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-float-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl w-full mx-auto px-6 sm:px-12 py-20">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Enhanced Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              {/* Enhanced Badge */}
              <div
                className={`inline-flex items-center px-6 py-1 bg-gradient-to-r from-primary/20 mt-9 to-blue-500/20 text-primary rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-primary/20 hover:shadow-xl ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <Icon
                  name="Code"
                  size={16}
                  className="mr-2 animate-pulse text-blue-300"
                />
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-blue-300 font-semibold">
                  Frontend Developer
                </span>
              </div>

              {/* Typewriter Title */}
              <div className="min-h-[200px] lg:min-h-[180px]">
                <h1
                  className={`text-4xl md:text-7xl lg:text-[48px] 3xl:text-[4vw] lg:leading-tight font-normal text-foreground tracking-widest leading-tight transform transition-all duration-1000 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {displayText.split(" ")[0]}
                  <br />
                  {/* {displayText.split('Digital')[1]} */}

                  <span className="block bg-gradient-to-r font-bold from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                    {displayText.slice(8, 29)}
                  </span>
                  {displayText.slice(29)}

                  {/* <span className="inline-block w-1 h-12 lg:h-16 bg-primary ml-1 animate-pulse"></span> */}
                </h1>
              </div>

              <p
                className={`text-lg md:text-xl text-muted-foreground !mt-0 max-w-2xl pt-2 leading-relaxed transform transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                I build fast, user-friendly web apps with React, Next.js, and
                TypeScript — combining clean code and thoughtful design.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-5 justify-center lg:justify-start transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Button
                variant="default"
                size="lg"
                iconName="Briefcase"
                iconPosition="left"
                className="text-base text-muted-foreground bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:shadow-xl"
                asChild
              >
                <Link to="/portfolio-projects">
                  <span className="relative z-10">Explore My Projects</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="text-base border-2 hover:bg-transparent hover:text-white transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-background/50 hover:shadow-lg"
              >
                Get My Resume
              </Button>
            </div>

            {/* Enhanced Quick Stats */}
            <div
              className={`flex flex-wrap gap-8 justify-center lg:justify-start pt-8 transform transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {[
                {
                  number: "5+",
                  label: "Projects Completed",
                  color: "text-white",
                },
                {
                  number: "7+",
                  label: "Modern Tools & Frameworks",
                  color: "text-white",
                },
                {
                  number: "100+",
                  label: "GitHub Contributions",
                  color: "text-white",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300"
                >
                  <div
                    className={`text-3xl font-bold ${stat.color} group-hover:animate-pulse group-hover:text-blue-200`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-blue-200 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Profile Image */}
          <div
            className={`flex justify-center lg:justify-end lg:mr-[20%] transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative group cursor-pointer">
              {/* Main image container */}
              <div
                className="relative w-[100%] rounded-full overflow-hidden group-hover:border-2 group-hover:border-white/80 animate-glow-ring border-4 border-primary shadow-2xl transform group-hover:scale-105 transition-all duration-500 hover:shadow-primary/20 hover:shadow-3xl"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                  transform: `perspective(1000px) rotateY(${
                    mousePosition.x * 0.1
                  }deg) rotateX(${-mousePosition.y * 0.1}deg)`,
                }}
              >
                {/* Enhanced overlay */}
                <div className="absolute w-full h-full z-10 group-hover:opacity-50 transition-opacity duration-300"></div>

                <Image
                  src="/assets/images/jason.png"
                  alt="Jason Dagana - Frontend Developer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-full border-2 bg-cover bg-center border-transparent bg-gradient-to-br from-[#1d2427] via-card to-[#494f59] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow group-hover:animate-none">
                  <div className="absolute -top-9 inset-0 flex items-center justify-center bg-[url('/assets/logo.png')] bg-contain animate-logo-pulse bg-no-repeat bg-center opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40"></div>
                  </div>

                  <p className="absolute bottom-[23%] opacity-50 text-center left-[25%] w-[50%] hover-glow-1 text-white drop-shadow-[#118afc] animate-fadeUp text-md font-medium mt-4 tracking-wide">
                    More than just a name, <br /> a digital experience.
                  </p>
                </div>
              </div>

              {/* Orbit Container */}
              <div className="absolute !rounded-full inset-0 w-[110%] flex items-center justify-center">
                {/* Clockwise group */}
                <div className="absolute !rounded-full inset-0 animate-spin-slow-1">
                  {/* React */}
                  <div className="absolute -right-5 w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-1">
                    <FaReact size={22} color="white" />
                  </div>

                  {/* Next.js */}
                  <div className="absolute -left-5  w-12 h-12 bg-gradient-to-r from-gray-500 to-black rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-2">
                    <SiNextdotjs size={22} color="white" />
                  </div>
                </div>

                {/* Counter-clockwise group */}
                <div className="absolute inset-0 animate-spin-reverse !rounded-full">
                  {/* Tailwind */}
                  <div className="absolute -left-5 w-12 h-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-3">
                    <SiTailwindcss size={22} color="white" />
                  </div>

                  {/* TypeScript */}
                  <div className="absolute -right-5 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow-4">
                    <SiTypescript size={22} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group transition-all duration-1000 delay-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <ChevronDown className="z-50 text-white size-6 animate-bounce" />
        {/* <div className="flex flex-col items-center space-y-2 group-hover:scale-110 transition-transform">
          <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center group-hover:border-primary transition-colors">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .!animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 40s linear infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        .animate-spin-slow-1 {
          animation: spin-slow 30s ease-in-out infinite;
        }

        .animate-pulse-slow-1 {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slow-2 {
          animation: pulse-slow 4s ease-in-out infinite 1s;
        }
        .animate-pulse-slow-3 {
          animation: pulse-slow 4s ease-in-out infinite 2s;
        }
        .animate-pulse-slow-4 {
          animation: pulse-slow 4s ease-in-out infinite 3s;
        }
        .hover-glow {
          filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.8));
        }
        .hover-glow-1 {
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.6),
            0 0 12px rgba(147, 51, 234, 0.6);
        }

        @keyframes logo-pulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        .animate-logo-pulse {
          animation: logo-pulse 4s ease-in-out infinite;
        }
        @keyframes glow-ring {
          0%,
          100% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 24px rgba(59, 130, 246, 0.7);
          }
        }
        .animate-glow-ring {
          animation: glow-ring 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
