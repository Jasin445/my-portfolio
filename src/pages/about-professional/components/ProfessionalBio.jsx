import { useState } from "react";
import { User, Lightbulb, Heart } from "lucide-react";
import AppIcon from "../../../components/AppIcon";

const ProfessionalBio = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = [
    { id: "story", label: "My Story", icon: User },
    { id: "philosophy", label: "Philosophy", icon: Lightbulb },
    { id: "interests", label: "Interests", icon: Heart },
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

  const Button = ({
    children,
    variant = "default",
    icon: Icon,
    onClick,
    className = "",
  }) => {
    const baseStyles =
      "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105";
    const variants = {
      default:
        "bg-primary text-white hover:bg-primary/95 shadow-lg shadow-primary/30",
      outline:
        "border-2 border-blue-50/70 text-blue-50/80 hover:bg-blue-500/10 hover:border-blue-100",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {Icon && <Icon size={18} />}
        {children}
      </button>
    );
  };

  return (
    <section className="relative py-20 lg:py-28 bg-transparent text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className=" mb-4">
            <div
              className="inline-flex items-center px-4 py-2 
                      bg-primary/10 text-primary rounded-full text-base font-medium mb-4
                      ring-1 ring-primary/20 backdrop-blur-sm"
            >
              <AppIcon name="Smile" size={16} className="mr-2" />
              About Me
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 py-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Getting to Know Me
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Beyond the technical skills and professional achievements, here's
            what drives my passion for development
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab?.id)}
              icon={tab.icon}
            >
              {tab?.label}
            </Button>
          ))}
        </div>

        {/* Content Card */}
        <div className="relative bg-gradient-to-br from-[#2a363c]/20 via-[#2a363c]/50 to-slate-[#2a363c]/60 rounded-3xl border border-blue-200/50 p-8 lg:p-14 shadow-2xl backdrop-blur-sm overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-500/20 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-500/20 rounded-br-3xl"></div>

          {/* Subtle glow effects */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

          <div className="relative space-y-10">
            {/* Title */}
            <div className="text-center space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {content?.[activeTab]?.title}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>

            {/* Image Container */}
            <div
              className="relative h-[400px] w-full max-w-[550px] mx-auto rounded-2xl overflow-hidden border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10 group"
              style={{
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.15",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

              <div className="relative h-full w-full p-3 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5">
                <div className="absolute inset-0 bg-slate-900/30 rounded-xl z-10"></div>
                <img
                  src="/assets/images/Jason_main2.png"
                  className="relative h-full w-full object-cover grayscale rounded-xl scale-[1.02] group-hover:scale-[1.06] group-hover:brightness-110 group-hover:contrast-110 transition-all duration-700 ease-out z-0"
                  alt={content?.[activeTab]?.title}
                />
              </div>

              {/* Floating badges */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-blue-400/30">
                {activeTab === "story" && "Journey"}
                {activeTab === "philosophy" && "Principles"}
                {activeTab === "interests" && "Passion"}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 px-2 lg:px-10">
              {content?.[activeTab]?.content
                ?.split("\n\n")
                ?.map((paragraph, index) => {
                  if (
                    paragraph?.startsWith("**") &&
                    paragraph?.endsWith("**")
                  ) {
                    const title = paragraph?.slice(2, -2);
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 mt-12 mb-6 group"
                      >
                        <div className="flex flex-col items-center gap-2 pt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent"></div>
                        </div>
                        <h4 className="text-xl lg:text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                          {title}
                        </h4>
                      </div>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-gray-300 leading-relaxed text-base lg:text-lg pl-6 relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-blue-500/50 before:to-transparent hover:text-white transition-colors duration-300"
                    >
                      {paragraph}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBio;
