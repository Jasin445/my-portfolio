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
import usePerformanceGuard from "../../../hooks/usePerformanceGuard";
import { explode } from "../../../utils/animation.utils";

const HeroSection = () => {
  const heroRef = useRef(null);
  const { animationsActive } = usePerformanceGuard();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);

  // Animate on mount only — never re-trigger on scroll
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleCopy = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    explode(rect.left + rect.width / 2, rect.top + rect.height / 2);
    navigator.clipboard?.writeText("daganajason72@gmail.com").catch(() => {});
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  };

  const shouldAnimate = mounted && animationsActive;

  return (
    <section
      ref={heroRef}
      className={`hero-section relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-card to-muted/20${mounted ? " hero-loaded" : ""}`}
    >
      {/*
        Background orbs — replaced blur-lg with SVG radial gradients.
        SVG filters are GPU-composited once and never repaint on scroll.
      */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="orb1" cx="15%" cy="15%" r="35%">
              <stop offset="0%" stopColor="var(--color-primary, #6366f1)" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="orb2" cx="85%" cy="85%" r="40%">
              <stop offset="0%" stopColor="var(--color-accent, #a855f7)" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#orb1)" />
          <rect width="100%" height="100%" fill="url(#orb2)" />
        </svg>
      </div>

      <div className="relative z-0 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl w-full mx-auto px-4 sm:px-12 pb-10 pt-20 sm:py-28 lg:py-20">
        <div className="grid lg:grid-cols-[60%_40%] mt-6 sm:mt-12 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 sm:pt-0 text-center lg:text-left">
            <div className="space-y-6">
              {/* Badge — CSS-driven entrance via .hero-loaded */}
              <div className="hero-child hero-child--badge hidden sm:inline-flex items-center px-2 sm:px-6 py-1 bg-gradient-to-r from-primary/20 mt-9 to-blue-500/20 text-primary rounded-full text-[9px] sm:text-sm font-medium border border-primary/20 backdrop-blur-sm shadow-lg hover:scale-105 hover:shadow-primary/20 hover:shadow-xl transition-[transform,box-shadow] duration-300">
                <Icon
                  name="Code"
                  size={16}
                  className={`mr-2 text-blue-300 ${shouldAnimate ? "animate-pulse" : ""}`}
                />
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-blue-300 font-semibold">
                  Frontend Developer
                </span>
              </div>

              {/* Heading */}
              <div className="lg:min-h-[180px]">
                <h1 className="hero-child hero-child--heading text-[7.3vw] sm:text-5xl lg:text-5xl lg:text-[48px] 3xl:text-[4vw] lg:leading-tight font-normal text-foreground tracking-widest leading-tight">
                  <span className="font-black">Hi, I'm Jason.</span>
                  <br />
                  <span
                    className={`block bg-gradient-to-r font-bold from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent ${
                      shouldAnimate ? "animate-gradient-x will-change-transform" : ""
                    }`}
                  >
                    I Turn Ideas Into
                  </span>
                  Beautiful Web Apps
                </h1>
              </div>

              {/* Paragraph */}
              <p className="hero-child hero-child--para text-lg md:text-xl text-muted-foreground !mt-0 max-w-xl mx-auto lg:ml-0 pt-2 leading-relaxed">
                React & Next.js developer who obsesses over clean code, fast
                load times, and interfaces users actually enjoy.
              </p>
            </div>

            {/* Mobile image */}
            <div className="hero-child hero-child--img-mobile flex justify-center lg:hidden lg:justify-end lg:mr-[20%]">
              <div className="relative group cursor-pointer">
                <div className="relative rounded-2xl lg:rounded-full h-auto w-full sm:w-[70vw] aspect-square sm:h-[50vw] sm:aspect-auto overflow-hidden lg:group-hover:border-2 group-hover:border-2 group-hover:border-primary/80 lg:border-4 border-primary shadow-2xl transition-[border,shadow] duration-500 hover:shadow-primary/20">
                  <div className="absolute w-full h-full z-10 group-hover:opacity-50 transition-opacity duration-300" />
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
            <div className="hero-child hero-child--cta flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                iconName="Terminal"
                iconPosition="left"
                asChild
              >
                <Link to="/projects">
                  <span className="relative z-10 font-semibold">Explore My Projects</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName={copied ? "Check" : "Copy"}
                iconPosition="left"
                onClick={handleCopy}
                style={{ minWidth: "200px" }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-200 ${
                  copied
                    ? "!border-green-500 text-green-500"
                    : "!border-white/80 text-white hover:bg-white/5"
                }`}
              >
                {copied ? "Copied!" : "Copy My Email"}
              </Button>
            </div>

            {/* Stats — hover scale removed to prevent repaint chains */}
            <div className="hero-child hero-child--stats flex gap-8 justify-center lg:justify-start pt-3 sm:pt-8">
              {[
                { number: "5+", label: "Projects Completed", color: "text-white" },
                { number: "7+", label: "Modern Tools & Frameworks", color: "text-white" },
                { number: "1000+", label: "GitHub Contributions", color: "text-white" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                >
                  <div
                    className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} ${
                      shouldAnimate
                        ? "group-hover:animate-pulse group-hover:text-blue-200"
                        : "group-hover:text-blue-200"
                    }`}
                  >
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
          <div className="hero-child hero-child--img-desktop lg:flex hidden justify-center lg:justify-end lg:mr-[20%]">
            <div className="relative group cursor-pointer">
              <div className="relative rounded-2xl lg:rounded-full w-[100%] aspect-square lg:aspect-auto overflow-hidden lg:group-hover:border-2 lg:border-[3px] border-primary shadow-2xl transition-[border,shadow] duration-500 hover:shadow-primary/20">
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
                <div
                  className={`absolute !rounded-full inset-0 ${
                    shouldAnimate ? "animate-spin-slow-1 will-change-transform" : ""
                  }`}
                >
                  <div
                    className={`absolute -right-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center shadow-xl ${
                      shouldAnimate ? "animate-pulse-slow-1" : ""
                    }`}
                  >
                    <ReactIcon size={22} color="white" />
                  </div>
                  <div
                    className={`absolute -left-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-gray-500 to-black rounded-full flex items-center justify-center shadow-xl ${
                      shouldAnimate ? "animate-pulse-slow-2" : ""
                    }`}
                  >
                    <NextJsIcon size={22} color="white" />
                  </div>
                </div>

                <div
                  className={`absolute inset-0 !rounded-full ${
                    shouldAnimate ? "animate-spin-reverse will-change-transform" : ""
                  }`}
                >
                  <div
                    className={`absolute -left-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-xl ${
                      shouldAnimate ? "animate-pulse-slow-3" : ""
                    }`}
                  >
                    <TailwindIcon size={22} color="white" fill="white" />
                  </div>
                  <div
                    className={`absolute -right-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-xl ${
                      shouldAnimate ? "animate-pulse-slow-4" : ""
                    }`}
                  >
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
        onClick={() =>
          document
            .getElementById("featuredProjects")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="hero-child hero-child--scroll absolute z-20 bottom-8 hidden sm:block left-1/2 -translate-x-1/2 cursor-pointer group"
      >
        <ChevronDown
          className={`z-50 text-white size-6 ${shouldAnimate ? "animate-bounce" : ""}`}
        />
      </div>
    </section>
  );
};

export default HeroSection;