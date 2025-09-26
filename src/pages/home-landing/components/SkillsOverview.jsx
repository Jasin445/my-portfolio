import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsOverview = () => {
  const [animatedSkills, setAnimatedSkills] = useState({});

  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: "Monitor",
      skills: [
        { name: "React", level: 95, icon: "Atom" },
        { name: "TypeScript", level: 90, icon: "Code" },
        { name: "Vue.js", level: 85, icon: "Layers" },
        { name: "Next.js", level: 88, icon: "Zap" }
      ]
    },
    {
      title: "Styling & Design",
      icon: "Palette",
      skills: [
        { name: "Tailwind CSS", level: 92, icon: "Brush" },
        { name: "CSS/SCSS", level: 90, icon: "Paintbrush" },
        { name: "Figma", level: 80, icon: "Figma" },
        { name: "Responsive Design", level: 95, icon: "Smartphone" }
      ]
    },
    {
      title: "Tools & Workflow",
      icon: "Settings",
      skills: [
        { name: "Git/GitHub", level: 90, icon: "GitBranch" },
        { name: "Webpack/Vite", level: 85, icon: "Package" },
        { name: "Jest/Testing", level: 80, icon: "CheckSquare" },
        { name: "Docker", level: 75, icon: "Container" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated = {};
      skillCategories?.forEach(category => {
        category?.skills?.forEach(skill => {
          animated[skill.name] = skill?.level;
        });
      });
      setAnimatedSkills(animated);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getSkillColor = (level) => {
    if (level >= 90) return 'bg-success';
    if (level >= 80) return 'bg-primary';
    if (level >= 70) return 'bg-warning';
    return 'bg-secondary';
  };

  return (
    <section className="py-20 bg-card">
      <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Icon name="Cpu" size={16} className="mr-2" />
            Technical Skills
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expertise & Proficiency
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels 
            across various technologies and tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories?.map((category, categoryIndex) => (
            <div
              key={category?.title}
              className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow duration-slow"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name={category?.icon} size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category?.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category?.skills?.map((skill, skillIndex) => (
                  <div key={skill?.name} className="space-y-2">
                    {/* Skill Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon 
                          name={skill?.icon} 
                          size={16} 
                          className="text-muted-foreground mr-2" 
                        />
                        <span className="text-sm font-medium text-foreground">
                          {skill?.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {skill?.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getSkillColor(skill?.level)} rounded-full transition-all duration-slow ease-out`}
                        style={{
                          width: `${animatedSkills?.[skill?.name] || 0}%`,
                          transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Additional Technologies
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "JavaScript ES6+", "Node.js", "Express.js", "MongoDB", "PostgreSQL",
              "REST APIs", "GraphQL", "AWS", "Vercel", "Netlify", "Agile/Scrum",
              "Performance Optimization", "SEO", "Accessibility", "PWA"
            ]?.map((tech) => (
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