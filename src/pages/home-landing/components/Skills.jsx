import Button from "../../../components/ui/Button";
import { RevealSection, TiltCard } from "../../../utils/animation.utils";
import { CSS3Icon, DockerIcon, GithubIcon, NextJsIcon, ReactIcon, TailwindIcon, TypeScriptIcon } from "../../../components/BrandIcons";
import { useRef } from "react";
import { useOnScreen } from "../../../hooks/useOnScreen";

const Skills = () => {
  const sectionRef = useRef(null);
  const active = useOnScreen(sectionRef, 0);

  const skills = [
  { icon: ReactIcon, label: "ReactJs", className: "text-sky-400", addedSize: 58 },
  { icon: NextJsIcon, label: "NextJs", className: "text-white" },
  { icon: TypeScriptIcon, label: "TypeScript", className: "text-blue-500" },
  { icon: TailwindIcon, label: "Tailwind", className: "text-cyan-400" },
  { icon: GithubIcon, label: "Github", className: "text-gray-100" },
  { icon: DockerIcon, label: "Docker", className: "text-blue-600" },
  { icon: CSS3Icon, label: "Css3", className: "text-[#1572B6]", hiddenOnMobile: true },
];
  return (
    <section ref={sectionRef} className="pt-20 px-4 sm: bg-gradient-to-b h-full from-[#2d3641] to-[#131426]/95">
      <RevealSection className="h-full" direction="left" active={true}>
        <TiltCard>

      <div
        className="bg-gradient-to-b from-[#2a363c]/80 to-transparent hover:shadow-[0_0_12px_rgba(1,149,255,0.25)] backdrop-blur-sm border-white/45 max-w-5xl border py-8 sm:py-12 px-6 lg:px-8 rounded-2xl shadow-2xl
        mx-auto text-center"
        >
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-6">
          Technical Skills
        </h2>
        <p className="hidden md:block text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-14 sm:mb-8">
          Skilled in modern frontend technologies, design systems, and developer
          tools.
        </p>

        <div className="grid grid-cols-3 sm:flex mt-11 md:mt-0 justify-center gap-12">
          {skills.map(({ icon: Icon, label, className, addedSize, hiddenOnMobile }) => (
            <div
            key={label}
              className={`flex flex-col items-center justify-center gap-6 ${hiddenOnMobile ? "md:flex hidden" : ""}`}
            >
              <Icon
                size={44}
                addedSize={addedSize || 0}
                // color="white"
                className={`${className} h-8 w-8 sm:w-11 sm:h-11 rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition`}
              />
              <p className="text-muted-foreground text-sm sm:text-base">{label}</p>
            </div>
          ))}
        </div>

        <Button
          variant="link"
          className="mt-2 text-primary hover:underline"
          onClick={() => (window.location.href = "/projects")}
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
