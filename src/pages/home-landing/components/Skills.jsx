import Button from "../../../components/ui/Button";
import {
  SiCss3,
  SiDocker,
  SiGithub,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const Skills = () => {
  return (
    <section className="py-2 px-4 sm: bg-gradient-to-b from-[#2a363c]/90 to-[#131426]/95">
      <div
        className="bg-gradient-to-b from-[#2a363c]/80 to-transparent hover:shadow-[0_0_12px_rgba(1,149,255,0.25)] backdrop-blur-sm border-white max-w-5xl border py-8 sm:py-12  px-6 lg:px-8 rounded-2xl shadow-xl
 mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-6">
          Technical Skills
        </h2>
        <p className="hidden md:block text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-14 sm:mb-8">
          Skilled in modern frontend technologies, design systems, and developer
          tools.
        </p>

        <div className="flex mt-14 md:mt-0 flex-wrap justify-center gap-12">
          <div className="flex flex-col items-center justify-center gap-6">
            <SiReact
              size={44}
              className="text-sky-400 rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition"
            />
            <p className="text-muted-foreground">ReactJs</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <SiNextdotjs
              size={44}
              className="text-white rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition"
            />
            <p className="text-muted-foreground">NextJs</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <SiTypescript
              size={44}
              className="text-blue-500 rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition"
            />
            <p className="text-muted-foreground">TypeScript</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <SiTailwindcss
              size={44}
              className="text-cyan-400 rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition"
            />
            <p className="text-muted-foreground">Tailwind</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <SiGithub
              size={44}
              className="text-gray-100 rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition"
            />
            <p className="text-muted-foreground">Github</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <SiDocker
              size={44}
              className="text-blue-600 rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition"
            />
            <p className="text-muted-foreground">Docker</p>
          </div>
          <div className="md:flex hidden flex-col items-center justify-center gap-6">
            <SiCss3
              size={44}
              className="text-[#1572B6] rounded-full hover:scale-[1.11] hover:drop-shadow-[0_0_8px_rgba(1,149,255,0.3)] cursor-pointer transition"
            />
            <p className="text-muted-foreground">Css3</p>
          </div>
        </div>

        <Button
          variant="link"
          className="mt-2 text-primary hover:underline"
          onClick={() => (window.location.href = "/portfolio-projects")}
        >
          See full breakdown →
        </Button>
      </div>
    </section>
  );
};

export default Skills;
