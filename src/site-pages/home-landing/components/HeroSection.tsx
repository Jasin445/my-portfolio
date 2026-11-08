import { useState, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import Image from "next/image";
import Icon from "../../../components/AppIcon";
import { ChevronDown } from "lucide-react";
import "../../../styles/hero-section-styles.css";
import {
  NextJsIcon,
  ReactIcon,
} from "../../../components/BrandIcons";
import { explode } from "../../../utils/animation.utils";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate on mount only — never re-trigger on scroll
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    explode(rect.left + rect.width / 2, rect.top + rect.height / 2);
    navigator.clipboard?.writeText("daganajason72@gmail.com").catch(() => {});
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={heroRef}
      className={`hero-section relative isolate flex min-h-[100svh] items-start justify-center overflow-hidden bg-transparent lg:min-h-screen lg:items-center${mounted ? " hero-loaded" : ""}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-[14%] aspect-square w-[min(74vw,68rem)] rounded-full border border-[#0095ff]/[0.12] shadow-[0_0_0_2rem_rgba(0,149,255,0.02),0_0_0_6rem_rgba(0,149,255,0.015),inset_0_0_8rem_rgba(0,149,255,0.05)]" />
        <div className="absolute -right-12 top-[22%] aspect-square w-[min(62vw,56rem)] rounded-full border border-dashed border-primary/[0.18]" />
        <div className="absolute left-[8%] top-[23%] h-px w-[min(35vw,25rem)] bg-gradient-to-r from-[#0095ff]/40 to-transparent" />
        <div className="absolute bottom-28 left-[7%] h-1 w-1 rounded-full bg-accent shadow-[0_0_1rem_rgba(215,255,99,0.8)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] items-start gap-10 px-5 pb-14 pt-28 sm:gap-12 sm:px-8 sm:pt-32 lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-16 lg:pb-24 lg:pt-28">
        <div className="space-y-8 text-center lg:text-left">
          <div className="hero-child hero-child--badge mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-cyan-100/80 sm:text-xs sm:tracking-[0.18em] lg:mx-0 lg:justify-start">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_1rem_rgba(215,255,99,0.7)]" />
            Full-stack developer <span className="text-accent">/</span> Abuja, Nigeria
          </div>

          <div>
            <h1 className="hero-child hero-child--heading mx-auto max-w-[12ch] text-[clamp(2.8rem,11vw,6rem)] font-semibold leading-[1.02] tracking-[-0.095em] text-[#f4f4ee] sm:text-[clamp(3.35rem,7vw,6rem)] lg:mx-0">
              <span className="block leading-[1.02]">I build</span>
              <span className="block leading-[1.02] text-transparent [-webkit-text-stroke:1px_rgba(238,244,249,0.7)]">
                digital
              </span>
              <span className="block leading-[1.02]">
                experiences.
              </span>
            </h1>
            <p className="hero-child hero-child--para mx-auto mt-8 max-w-xl text-sm leading-7 text-slate-300/85 sm:text-base sm:leading-8 lg:mx-0">
              I&apos;m Jason Dagana — a full-stack developer turning complex ideas into
              fast, thoughtful web products with React, Next.js, and TypeScript.
            </p>
          </div>

          <div className="hero-child hero-child--cta flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              asChild
              className="!h-14 w-full rounded-full !px-5 !text-sm !font-semibold !tracking-wide sm:w-auto sm:!px-7"
            >
              <Link href="/projects">Explore the work</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName={copied ? "Check" : "Copy"}
              iconPosition="left"
              onClick={handleCopy}
              className={`!h-14 w-full rounded-full !border-accent/70 !bg-accent/[0.06] !px-5 !text-sm !text-accent hover:!border-accent hover:!bg-accent/15 sm:w-auto sm:!px-7 ${copied ? "!border-accent !text-accent" : ""}`}
            >
              {copied ? "Email copied" : "Copy my email"}
            </Button>
          </div>

          <div className="hero-child hero-child--stats grid grid-cols-3 border-y border-white/10 py-5 text-left">
            {[
              { number: "05+", label: "Selected builds" },
              { number: "07+", label: "Modern tools" },
              { number: "1K+", label: "GitHub commits" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`group min-w-0 px-2 first:pl-0 sm:px-5 ${index > 0 ? "border-l border-white/10" : ""}`}
              >
                <div className="font-mono text-xl font-semibold tracking-[-0.06em] text-white transition-colors group-hover:text-primary sm:text-2xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-[0.5rem] uppercase tracking-[0.08em] text-slate-400 sm:text-[0.66rem] sm:tracking-[0.12em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-child hero-child--img-desktop relative mx-auto w-[calc(100%-2.5rem)] max-w-[29rem] sm:w-full lg:ml-auto lg:mr-8">
          <div className="absolute -inset-5 rounded-[46%_46%_2rem_2rem] border border-[#0095ff]/25" />
          <div className="absolute -inset-9 rounded-[48%_48%_2.8rem_2.8rem] border border-dashed border-accent/35" />
          <div className="group relative aspect-[0.79] overflow-hidden rounded-[44%_44%_1.8rem_1.8rem] border border-white/20 bg-[#0b1524] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(64,171,229,0.35)]">
            <Image
              src="/assets/images/jason.webp"
              alt="Jason Dagana - FullStack Developer"
              title="Jason Dagana | FullStack Developer"
              width={800}
              height={800}
              priority
              sizes="(max-width: 1023px) 80vw, 460px"
              className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07172d]/5 via-transparent to-[#06101f]/90" />
          <div className="absolute inset-x-0 top-0 flex justify-between gap-2 p-4 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-white/80 sm:p-5 sm:text-[0.56rem] sm:tracking-[0.14em]">
              <span>Jason Dagana</span>
              <span>JD / 001</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:gap-4 sm:p-7">
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-primary">Design-minded engineer</p>
                <p className="mt-2 text-lg font-medium tracking-[-0.04em] text-white sm:text-2xl">Making the web feel human.</p>
              </div>
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-[#172126] text-white sm:flex">
                <Icon name="ArrowRight" size={18} className="-rotate-45" />
              </div>
            </div>
          </div>

          <div className="absolute -right-5 top-[24%] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#07172d] shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:-right-7 sm:h-14 sm:w-14">
            <ReactIcon size={25} color="white" />
          </div>
          <div className="absolute -left-5 bottom-[25%] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#07172d] shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:-left-7 sm:h-14 sm:w-14">
            <NextJsIcon size={25} color="white" />
          </div>
          <div className="absolute -bottom-8 right-0 hidden items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate-400 sm:flex">
            <span className="h-px w-8 bg-accent" />
            Scroll to explore
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
        className="hero-child hero-child--scroll absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer group text-cyan-100/70 sm:block"
      >
        <ChevronDown
          className="z-50 text-white size-6"
        />
      </div>
    </section>
  );
};

export default HeroSection;
