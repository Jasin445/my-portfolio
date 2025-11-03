import React, { useState } from "react";

import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const ProfessionalBio = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = [
    { id: "story", label: "My Story", icon: "User" },
    { id: "philosophy", label: "Philosophy", icon: "Lightbulb" },
    { id: "interests", label: "Interests", icon: "Heart" },
  ];

  const content = {
    story: {
      title: "The Journey So Far",
      content: `My journey into frontend development began during my Computer Science studies at Stanford University, where I discovered my passion for creating intuitive user interfaces. What started as curiosity about how websites work evolved into a deep fascination with the intersection of technology and human experience.

After graduating in 2018, I joined TechCorp as a Junior Frontend Developer, where I quickly learned the importance of writing clean, maintainable code. Working alongside seasoned developers, I absorbed best practices in React development, state management, and performance optimization.

The turning point came when I led the redesign of our main product dashboard, resulting in a 40% increase in user engagement. This experience taught me that great frontend development isn't just about code—it's about understanding users, solving real problems, and creating delightful experiences. Over the years, I've had the privilege of working with startups and established companies, each presenting unique challenges that shaped my approach to development. From building scalable component libraries to optimizing applications for millions of users, every project has been a learning opportunity.

Today, I continue to push the boundaries of what's possible in frontend development, always staying curious and eager to learn new technologies while maintaining a strong foundation in proven methodologies.`,
    },
    philosophy: {
      title: "Development Philosophy",
      content: `I believe that exceptional frontend development is built on three fundamental pillars: user empathy, technical excellence, and continuous learning.

**User Empathy:** Every line of code I write serves a human being on the other side of the screen. I prioritize accessibility, performance, and intuitive design because technology should enhance lives, not complicate them. Before implementing any feature, I ask: "How will this improve the user's experience?" **Technical Excellence:** Clean, maintainable code isn't just a preference—it's a responsibility. I advocate for comprehensive testing, thoughtful architecture, and documentation that enables teams to move fast without breaking things. Code reviews aren't just about catching bugs; they're opportunities for knowledge sharing and collective improvement.

**Continuous Learning:** The frontend landscape evolves rapidly, and staying current requires intentional effort. I dedicate time weekly to exploring new technologies, contributing to open source projects, and sharing knowledge with the community. Learning isn't just about keeping up—it's about pushing the industry forward.

I also believe in the power of collaboration. The best solutions emerge when designers, developers, and stakeholders work together with mutual respect and open communication. My role extends beyond writing code to being a bridge between technical possibilities and business objectives.`,
    },
    interests: {
      title: "Beyond the Code",
      content: `While I'm passionate about development, I believe that diverse interests make me a better developer and collaborator.**Photography:** I'm an avid landscape photographer, which has sharpened my eye for composition, color theory, and visual storytelling. These skills directly translate to better UI design sensibilities and help me communicate more effectively with design teams.

**Open Source Contribution:** I maintain several open source projects, including a React component library with over 2,000 GitHub stars. Contributing to the community isn't just about giving back—it's about learning from developers worldwide and staying connected to emerging trends.

**Mentorship:** I volunteer as a mentor for coding bootcamp graduates and junior developers. Teaching others reinforces my own understanding and keeps me grounded in the fundamentals that sometimes get overlooked in complex projects.

**Travel & Culture:** Having visited 25+ countries, I've gained appreciation for diverse perspectives and approaches to problem-solving. This global mindset influences how I think about internationalization, accessibility, and inclusive design.

**Fitness & Mindfulness:** Regular exercise and meditation help me maintain focus and creativity. I find that my best solutions often come during morning runs or quiet moments away from the screen.

These interests aren't separate from my professional life—they inform and enrich my approach to development, making me more creative, empathetic, and effective in my work.`,
    },
  };

  return (
    <section className="relative py-16 lg:py-24 bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Getting to Know Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond the technical skills and professional achievements, here's
            what drives my passion for development
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab?.id)}
              iconName={tab?.icon}
              iconPosition="left"
              className="transition-all duration-normal"
            >
              {tab?.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-transparent rounded-xl border border-border p-8 lg:p-12 shadow-sm">
          <div className="space-y-6">
            <h3 className="text-3xl text-center font-semibold text-foreground">
              {content?.[activeTab]?.title}
            </h3>

            <div className="prose prose-lg max-w-none">
              <div className="relative h-88 w-[450px] mt-14 mb-10 mx-auto rounded-lg overflow-hidden border border-border p-2 shadow-inner">
                {/* <div className="absolute inset-0 h-full bg-white/5"></div> */}
                <Image
                  src="/assets/images/image.png"
                  fill
                  className="h-full w-full object-cover object-[65%_50%] scale-[1.10] hover:scale-[1.14] transition-transform duration-500"
                />
              </div>
              {content?.[activeTab]?.content
                ?.split("\n\n")
                ?.map((paragraph, index) => {
                  if (
                    paragraph?.startsWith("**") &&
                    paragraph?.endsWith("**")
                  ) {
                    const title = paragraph?.slice(2, -2);
                    return (
                      <h4
                        key={index}
                        className="text-lg font-semibold text-foreground mt-8 mb-3"
                      >
                        {title}
                      </h4>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-foreground leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always excited to discuss new opportunities, collaborate on
              interesting projects, or simply chat about the latest in frontend
              development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="default"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Start a Conversation
              </Button>
              <Button variant="outline" iconName="Calendar" iconPosition="left">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBio;
