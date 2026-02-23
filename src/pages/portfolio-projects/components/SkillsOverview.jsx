import Icon from "../../../components/AppIcon";
import {
  SiCss3,
  SiDocker,
  SiGithub,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiSmart,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { Smartphone } from "lucide-react";

const getIcons = (icon) => {
  const map = {
    SiReact,
    SiTypescript,
    SiJavascript,
    SiNextdotjs,
    SiTailwindcss,
    SiCss3,
    SiSmart,
    SiGithub,
    SiVite,
    SiVercel,
    SiDocker,
    MdDesignServices,
    Smartphone,
  };
  const ReactIcon = map[icon] || Smartphone;
  return <ReactIcon size={16} className="text-muted-foreground mr-2" />;
};

const SkillsOverview = () => {
  const skillCategories = [
    {
      title: "Application Architecture",
      icon: "Cpu",
      skills: [
        { name: "React & Next.js Application Architecture", icon: "SiReact" },
        { name: "TypeScript-driven Development", icon: "SiTypescript" },
        { name: "Component & Feature-based Design", icon: "SiJavascript" },
        { name: "Server & Client Component Patterns", icon: "SiNextdotjs" },
      ],
    },

    {
      title: "Data & State Management",
      icon: "Database",
      skills: [
        { name: "Server State Management (TanStack Query)", icon: "SiReact" },
        { name: "API Integration & Contract Handling", icon: "SiJavascript" },
        { name: "Caching & Data Synchronization", icon: "SiNextdotjs" },
        { name: "Optimistic UI Updates", icon: "SiTypescript" },
      ],
    },

    {
      title: "Performance Engineering",
      icon: "Gauge",
      skills: [
        { name: "Code Splitting & Lazy Loading", icon: "SiJavascript" },
        { name: "Bundle & Rendering Optimization", icon: "SiVite" },
        { name: "Image & Asset Optimization", icon: "SiNextdotjs" },
        { name: "Lighthouse Performance Optimization", icon: "SiVercel" },
      ],
    },

    {
      title: "Authentication & Security",
      icon: "ShieldCheck",
      skills: [
        { name: "JWT Authentication", icon: "SiJavascript" },
        { name: "Session Management", icon: "SiNextdotjs" },
        { name: "Protected Routes & Middleware", icon: "SiTypescript" },
        { name: "Backend-for-Frontend (BFF) Pattern", icon: "SiReact" },
      ],
    },

    {
      title: "Testing & Reliability",
      icon: "TestTube",
      skills: [
        { name: "Jest Unit Testing", icon: "SiJest" },
        { name: "React Testing Library", icon: "SiTestinglibrary" },
        { name: "Component & Integration Testing", icon: "SiReact" },
        { name: "Debugging Production Issues", icon: "SiJavascript" },
      ],
    },

    {
      title: "Engineering Workflow",
      icon: "GitBranch",
      skills: [
        { name: "Git-based Collaboration & PR Reviews", icon: "SiGithub" },
        { name: "CI/CD Deployment (Vercel)", icon: "SiVercel" },
        { name: "Dockerized Development Environments", icon: "SiDocker" },
        { name: "Cross-team API Collaboration", icon: "SiJavascript" },
      ],
    },
  ];


  return (
    <section className="py-16 bg-gradient-to-b from-[#2a363c]/90 via-[#131426]/100 to-[#2a363c]/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Icon name="Cpu" size={16} className="mr-2" />
            Technical Skills
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Core Engineering Skills
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here’s a snapshot of the technologies and tools I work with.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-[#2a363c]/30 rounded-xl border border-border p-6 hover:shadow-md transition-shadow duration-slow"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon
                    name={category.icon}
                    size={20}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getIcons(skill.icon)}
                        <span className="text-sm text-foreground">
                          {skill.name}
                        </span>
                      </div>
                    </div>

                    {/* <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getSkillColor(skill.level)} rounded-full transition-all duration-slow ease-out`}
                        style={{ width: getSkillWidth(skill.level) }}
                      />
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Additional Engineering Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Node.js",
              "PostgreSQL",
              "REST API Design",
              "System Debugging",
              "Responsive UI Engineering",
              "Accessibility (WCAG)",
              "Performance Monitoring",
              "Production Deployment",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-fast cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SkillsOverview;
