import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerTimeline = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const timelineData = [
    {
      id: 1,
      period: "2023 - Present",
      role: "Senior Frontend Developer",
      company: "InnovateTech Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Leading frontend architecture and development for enterprise-scale applications serving 2M+ users.",
      achievements: [
        "Architected and implemented a micro-frontend system reducing deployment time by 60%",
        "Led a team of 5 developers in rebuilding the core product dashboard using React 18 and TypeScript",
        "Improved application performance by 45% through code splitting and optimization techniques",
        "Established frontend coding standards and review processes adopted company-wide",
        "Mentored junior developers and conducted technical interviews for frontend positions"
      ],
      technologies: ["React 18", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS", "Jest", "Cypress"],
      highlights: [
        "Promoted to Senior level within 18 months",
        "Received \'Innovation Award\' for micro-frontend architecture",
        "Speaker at company\'s annual tech conference"
      ]
    },
    {
      id: 2,
      period: "2021 - 2023",
      role: "Frontend Developer",
      company: "StartupHub Inc",
      location: "Austin, TX",
      type: "Full-time",
      description: "Developed and maintained multiple client-facing applications in a fast-paced startup environment.",
      achievements: [
        "Built responsive web applications for 10+ clients using React and Vue.js",
        "Implemented automated testing suites increasing code coverage from 40% to 85%",
        "Collaborated with UX/UI designers to create pixel-perfect implementations",
        "Optimized bundle sizes reducing initial load times by 35%",
        "Integrated third-party APIs and payment systems for e-commerce platforms"
      ],
      technologies: ["React", "Vue.js", "JavaScript", "SASS", "Webpack", "Node.js", "MongoDB"],
      highlights: [
        "Employee of the Quarter Q3 2022",
        "Led successful migration from Vue 2 to Vue 3",
        "Contributed to 15+ successful project launches"
      ]
    },
    {
      id: 3,
      period: "2019 - 2021",
      role: "Junior Frontend Developer",
      company: "TechCorp Solutions",
      location: "Seattle, WA",
      type: "Full-time",
      description: "Started my professional journey focusing on React development and modern frontend practices.",
      achievements: [
        "Developed reusable component library used across 5+ internal projects",
        "Participated in agile development cycles and daily standups",
        "Fixed 200+ bugs and implemented 50+ new features",
        "Collaborated with backend developers to integrate RESTful APIs",
        "Contributed to improving accessibility compliance to WCAG 2.1 AA standards"
      ],
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Redux", "REST APIs", "Git"],
      highlights: [
        "Completed React certification program",
        "Recognized for exceptional problem-solving skills",
        "Participated in company hackathon - 2nd place finish"
      ]
    },
    {
      id: 4,
      period: "2018 - 2019",
      role: "Frontend Developer Intern",
      company: "Digital Agency Pro",
      location: "San Francisco, CA",
      type: "Internship",
      description: "Gained hands-on experience in web development while completing my Computer Science degree.",
      achievements: [
        "Assisted in developing 8 client websites using modern web technologies",
        "Learned version control with Git and collaborative development workflows",
        "Created responsive email templates for marketing campaigns",
        "Participated in client meetings and requirement gathering sessions",
        "Contributed to the agency's internal design system documentation"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Photoshop"],
      highlights: [
        "Received full-time offer upon graduation",
        "Completed 6-month internship program successfully",
        "Built first production website independently"
      ]
    }
  ];

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Career Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth, key achievements, and the technologies that shaped my expertise
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:transform lg:-translate-x-px"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData?.map((item, index) => (
              <div
                key={item?.id}
                className={`relative flex flex-col lg:flex-row lg:items-center ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 lg:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background lg:transform lg:-translate-x-2 z-10 shadow-sm"></div>

                {/* Content Card */}
                <div className={`ml-16 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-card rounded-xl border border-border p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-normal">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {item?.period}
                          </span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {item?.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {item?.role}
                        </h3>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Icon name="Building" size={16} />
                          <span className="font-medium">{item?.company}</span>
                          <span>•</span>
                          <span>{item?.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item?.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item?.technologies?.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md border border-secondary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(item?.id)}
                      iconName={expandedItem === item?.id ? 'ChevronUp' : 'ChevronDown'}
                      iconPosition="right"
                      className="mb-4"
                    >
                      {expandedItem === item?.id ? 'Show Less' : 'Show Details'}
                    </Button>

                    {/* Expanded Content */}
                    {expandedItem === item?.id && (
                      <div className="space-y-6 pt-4 border-t border-border animate-fade-in">
                        {/* Key Achievements */}
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                            <Icon name="Target" size={16} className="mr-2 text-primary" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {item?.achievements?.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start space-x-2">
                                <Icon name="CheckCircle" size={14} className="text-success mt-1 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                            <Icon name="Star" size={16} className="mr-2 text-accent" />
                            Career Highlights
                          </h4>
                          <ul className="space-y-2">
                            {item?.highlights?.map((highlight, hlIndex) => (
                              <li key={hlIndex} className="flex items-start space-x-2">
                                <Icon name="Award" size={14} className="text-accent mt-1 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 bg-card rounded-xl border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Career Summary
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">6+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">4</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;