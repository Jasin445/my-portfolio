import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsVisualization = () => {
  const [animatedSkills, setAnimatedSkills] = useState({});
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: 'Monitor',
      color: 'primary',
      skills: [
        { name: 'React/Next.js', level: 95, experience: '6+ years', projects: 45 },
        { name: 'TypeScript', level: 90, experience: '4+ years', projects: 35 },
        { name: 'JavaScript (ES6+)', level: 95, experience: '6+ years', projects: 50 },
        { name: 'HTML5/CSS3', level: 98, experience: '6+ years', projects: 50 },
        { name: 'Tailwind CSS', level: 92, experience: '3+ years', projects: 30 },
        { name: 'Vue.js', level: 85, experience: '3+ years', projects: 20 },
        { name: 'SASS/SCSS', level: 88, experience: '5+ years', projects: 40 }
      ]
    },
    tools: {
      title: 'Tools & Workflow',
      icon: 'Settings',
      color: 'accent',
      skills: [
        { name: 'Git/GitHub', level: 95, experience: '6+ years', projects: 50 },
        { name: 'Webpack/Vite', level: 88, experience: '4+ years', projects: 35 },
        { name: 'Jest/Testing Library', level: 85, experience: '3+ years', projects: 25 },
        { name: 'Docker', level: 75, experience: '2+ years', projects: 15 },
        { name: 'CI/CD Pipelines', level: 80, experience: '3+ years', projects: 20 },
        { name: 'Figma/Design Tools', level: 85, experience: '4+ years', projects: 40 },
        { name: 'VS Code/IDEs', level: 95, experience: '6+ years', projects: 50 }
      ]
    },
    backend: {
      title: 'Backend & Database',
      icon: 'Server',
      color: 'success',
      skills: [
        { name: 'Node.js/Express', level: 80, experience: '4+ years', projects: 25 },
        { name: 'GraphQL/Apollo', level: 75, experience: '2+ years', projects: 12 },
        { name: 'REST APIs', level: 90, experience: '5+ years', projects: 40 },
        { name: 'MongoDB', level: 70, experience: '3+ years', projects: 18 },
        { name: 'PostgreSQL', level: 65, experience: '2+ years', projects: 10 },
        { name: 'Firebase', level: 80, experience: '3+ years', projects: 20 },
        { name: 'AWS Services', level: 70, experience: '2+ years', projects: 15 }
      ]
    },
    soft: {
      title: 'Soft Skills',
      icon: 'Users',
      color: 'secondary',
      skills: [
        { name: 'Team Leadership', level: 90, experience: '3+ years', projects: 15 },
        { name: 'Project Management', level: 85, experience: '4+ years', projects: 30 },
        { name: 'Client Communication', level: 92, experience: '5+ years', projects: 25 },
        { name: 'Problem Solving', level: 95, experience: '6+ years', projects: 50 },
        { name: 'Mentoring', level: 88, experience: '3+ years', projects: 20 },
        { name: 'Agile/Scrum', level: 90, experience: '5+ years', projects: 35 },
        { name: 'Code Review', level: 93, experience: '4+ years', projects: 40 }
      ]
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated = {};
      skillCategories?.[activeCategory]?.skills?.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => ({
            ...prev,
            [skill?.name]: skill?.level
          }));
        }, index * 100);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const getSkillColor = (level) => {
    if (level >= 90) return 'bg-success';
    if (level >= 80) return 'bg-primary';
    if (level >= 70) return 'bg-accent';
    return 'bg-secondary';
  };

  const getSkillColorText = (level) => {
    if (level >= 90) return 'text-success';
    if (level >= 80) return 'text-primary';
    if (level >= 70) return 'text-accent';
    return 'text-secondary';
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and professional competencies developed over years of hands-on experience
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.entries(skillCategories)?.map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-normal ${
                activeCategory === key
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
              }`}
            >
              <Icon name={category?.icon} size={18} />
              <span>{category?.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skills List */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Icon 
                name={skillCategories?.[activeCategory]?.icon} 
                size={20} 
                className={`mr-3 text-${skillCategories?.[activeCategory]?.color}`} 
              />
              {skillCategories?.[activeCategory]?.title}
            </h3>

            <div className="space-y-4">
              {skillCategories?.[activeCategory]?.skills?.map((skill, index) => (
                <div key={skill?.name} className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{skill?.name}</h4>
                    <span className={`text-sm font-semibold ${getSkillColorText(skill?.level)}`}>
                      {skill?.level}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-slow ease-out ${getSkillColor(skill?.level)}`}
                      style={{
                        width: `${animatedSkills?.[skill?.name] || 0}%`
                      }}
                    ></div>
                  </div>

                  {/* Skill Details */}
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{skill?.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Briefcase" size={12} />
                      <span>{skill?.projects} projects</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Summary & Certifications */}
          <div className="space-y-8">
            {/* Proficiency Legend */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Proficiency Levels</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Expert (90-100%) - Can teach others, lead projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Advanced (80-89%) - Highly proficient, independent work</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Intermediate (70-79%) - Comfortable with guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Beginner (&lt;70%) - Learning and improving</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Award" size={18} className="mr-2 text-accent" />
                Certifications & Education
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-foreground">AWS Certified Developer</h4>
                    <p className="text-sm text-muted-foreground">Amazon Web Services • 2023</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-foreground">React Developer Certification</h4>
                    <p className="text-sm text-muted-foreground">Meta (Facebook) • 2022</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-foreground">B.S. Computer Science</h4>
                    <p className="text-sm text-muted-foreground">Stanford University • 2018</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-foreground">Google UX Design Certificate</h4>
                    <p className="text-sm text-muted-foreground">Google • 2021</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Target" size={18} className="mr-2 text-primary" />
                Currently Learning
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={14} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Advanced React Patterns & Performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={14} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Web3 & Blockchain Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={14} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Machine Learning for Frontend</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={14} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Advanced TypeScript Patterns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsVisualization;