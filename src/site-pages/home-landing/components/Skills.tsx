import Button from "../../../components/ui/Button";
import { RevealSection, TiltCard } from "../../../utils/animation.utils";
import {
  CSS3Icon,
  DockerIcon,
  GithubIcon,
  NextJsIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "../../../components/BrandIcons";
import { useRouter } from "next/navigation";
import usePerformanceGuard from "../../../hooks/usePerformanceGuard";

const skills = [
  {
    icon: ReactIcon,
    label: "ReactJs",
    className: "text-sky-400",
    addedSize: 58,
  },
  { icon: NextJsIcon, label: "NextJs", className: "text-white" },
  { icon: TypeScriptIcon, label: "TypeScript", className: "text-blue-500" },
  { icon: TailwindIcon, label: "Tailwind", className: "text-cyan-400" },
  { icon: GithubIcon, label: "Github", className: "text-gray-100" },
  { icon: DockerIcon, label: "Docker", className: "text-blue-600" },
  {
    icon: CSS3Icon,
    label: "Css3",
    className: "text-[#1572B6]",
    hiddenOnMobile: true,
  },
];

const Skills = () => {
  const router = useRouter();
  const { animationsActive } = usePerformanceGuard();

  return (
    <section className="homepage-section-divider relative h-full px-4 pt-20 pb-20">
      {/* RevealSection uses its own IntersectionObserver — no active prop needed */}
      <RevealSection className="h-full" direction="left">
        <TiltCard active={animationsActive}>
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#172126] px-4 py-8 text-center shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] transition-shadow hover:shadow-[0_0_50px_rgba(0,149,255,0.12)] sm:px-6 sm:py-12 lg:px-8">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-6">
              Technical Skills
            </h2>
            <p className="hidden md:block text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-14 sm:mb-8">
              Skilled in modern frontend technologies, design systems, and
              developer tools.
            </p>

            <div className="mt-8 grid grid-cols-3 justify-items-center gap-x-3 gap-y-7 sm:mt-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 md:gap-12">
              {skills.map(
                ({
                  icon: Icon,
                  label,
                  className,
                  addedSize,
                  hiddenOnMobile,
                }) => (
                  <div
                    key={label}
                    className={`flex min-w-0 flex-col items-center justify-center gap-3 sm:gap-4 ${hiddenOnMobile ? "hidden md:flex" : ""}`}
                  >
                    <Icon
                      size={44}
                      addedSize={addedSize || 0}
                      className={`${className} h-8 w-8 sm:w-11 sm:h-11 rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition`}
                    />
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {label}
                    </p>
                  </div>
                ),
              )}
            </div>

            <Button
              variant="link"
              className="mt-2 text-accent hover:underline"
              onClick={() => router.push("/projects#skills")}
            >
              See full breakdown →
            </Button>
          </div>
        </TiltCard>
      </RevealSection>
    </section>
  );
};

export default Skills;
