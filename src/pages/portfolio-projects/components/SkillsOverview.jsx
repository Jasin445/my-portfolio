import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import { SiCss3, SiDocker, SiGithub, SiJavascript, SiJest, SiNextdotjs, SiReact, SiSmart, SiTailwindcss, SiTestinglibrary, SiTypescript, SiVercel, SiVite } from "react-icons/si";
import { MdDesignServices } from "react-icons/md"
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
  }
  const ReactIcon = map[icon] || Smartphone
  return (
    <ReactIcon size={16} className="text-muted-foreground mr-2" />
  );
};

const SkillsOverview = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: "Monitor",
      skills: [
        { name: "React", level: "Intermediate", icon: "SiReact" },
        { name: "TypeScript", level: "Intermediate", icon: "SiTypescript" },
        { name: "JavaScript ES6+", level: "Advanced", icon: "SiJavascript" },
        { name: "Next.js", level: "Intermediate", icon: "SiNextdotjs" },
      ],
    },
    {
      title: "Styling & Design",
      icon: "Palette",
      skills: [
        { name: "Tailwind CSS", level: "Advanced", icon: "SiTailwindcss" },
        { name: "CSS/SCSS", level: "Advanced", icon: "SiCss3" },
        { name: "UI/UX Proficiency", level: "Intermediate", icon: "MdDesignServices" },
        { name: "Responsive Design", level: "Advanced", icon: "Smartphone" },
      ],
    },
    {
      title: "Tools & Workflow",
      icon: "Settings",
      skills: [
        { name: "Git/GitHub", level: "Advanced", icon: "SiGithub" },
        { name: "Webpack/Vite", level: "Intermediate", icon: "SiVite" },
        { name: "Vercel", level: "Intermediate", icon: "SiVercel" },
        { name: "Docker", level: "Beginner", icon: "SiDocker" },
      ],
    },
  ];

  const getSkillColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-secondary";
      case "Intermediate":
        return "bg-warning";
      case "Advanced":
        return "bg-primary";
      case "Expert":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  const getSkillWidth = (level) => {
    switch (level) {
      case "Beginner":
        return "30%";
      case "Intermediate":
        return "60%";
      case "Advanced":
        return "80%";
      case "Expert":
        return "95%";
      default:
        return "20%";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#2a363c]/90 via-[#131426]/100 to-[#2a363c]/90">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Icon name="Cpu" size={16} className="mr-2" />
            Technical Skills
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tools & Technologies I Use
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here’s a snapshot of the technologies and tools I work with, along with my comfort level for each.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-[#2a363c]/30 rounded-xl border border-border p-6 hover:shadow-md transition-shadow duration-slow">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name={category.icon} size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getIcons(skill.icon)}
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {skill.level}
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getSkillColor(skill.level)} rounded-full transition-all duration-slow ease-out`}
                        style={{ width: getSkillWidth(skill.level) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL", "AWS", "Netlify", "Performance Optimization", "SEO", "Accessibility", "PWA"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-fast cursor-default">
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