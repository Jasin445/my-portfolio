import { useEffect, useState, useRef } from "react";
import { User, Lightbulb, Cpu } from "lucide-react";
import AppIcon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { RevealSection } from "../../../utils/animation.utils";
import type { ComponentType, ReactNode } from "react";

type BioTab = "story" | "philosophy" | "interests";

interface BioContent {
  title: string;
  content: string;
  image: string;
}

const ProfessionalBio = () => {
  const [activeTab, setActiveTab] = useState<BioTab>("story");
  const [expanded, setExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [
      "/assets/images/Jason_main2.webp",
      "/assets/images/Jason_philosophy.png",
      "/assets/images/Jason_interest.png",
    ].forEach((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
    });
  }, []);

  const tabs: { id: BioTab; label: string; icon: ComponentType<{ size?: number }> }[] = [
    { id: "story", label: "My Story", icon: User },
    { id: "philosophy", label: "Philosophy", icon: Lightbulb },
    { id: "interests", label: "Systems", icon: Cpu },
  ];

  const content: Record<BioTab, BioContent> = {
    story: {
      title: "Building with Intention",
      content: `My work today brings together software engineering, independent building, and academic study. I work as a software engineer, build and contribute to projects outside work, and am pursuing a master's degree in Information Management.

Much of what I build is AI-driven, using large language models such as GPT, Gemini, and others. I use AI to help with code writing, but the thinking and engineering decisions remain mine: I define the problem, shape the architecture, and decide whether a solution belongs in the system.

Over time, my focus has shifted from simply getting something to work toward understanding why it works and what happens underneath. I trace problems across layers, question the design, and consider whether a solution will make sense beyond the immediate task.

Work gives me practical engineering problems to learn from, independent projects give me room to explore, and my master's studies broaden how I think about information and the systems that manage it. I am still learning, and that is part of the work I value: building more capable software while deepening my understanding of the technology behind it.`,
      image: "/assets/images/Jason_main2.webp",
    },
    philosophy: {
      title: "Think Before the Fix",
      content: `I no longer judge a solution only by whether it produces the expected output. I want to understand why it works, what is happening beneath the surface, and whether the approach makes sense in the wider system.

That means tracing problems through the layers involved, examining assumptions, and weighing trade-offs before settling on a design. Architecture, data flow, APIs, security, performance, edge cases, and product behavior all matter. Which concern leads depends on the problem in front of me.

AI is a technical collaborator in my process, not the authority on what should be built. I use it to explore ideas and accelerate code writing, but I challenge its suggestions, ask it to explain its reasoning, and correct it when it misses context. If a solution works but I do not understand or agree with its approach, I keep investigating.

I am still learning, so I do not expect to have every answer. I do expect to stay curious, make decisions deliberately, and take responsibility for the systems I help build.`,
      image: "/assets/images/Jason_philosophy.png",
    },
    interests: {
      title: "Systems & First Principles",
      content: `I am interested in the relationship between software and the systems that make it possible. I want to understand not only how to use an abstraction, but what happens underneath when I do.

That curiosity takes me from operating systems and Linux to computer architecture, networking, databases, and the ways computers manage resources. These foundations shape how software behaves, how components communicate, and where constraints and trade-offs come from.

I am also drawn to the engineering thinking behind software: problem-solving, system design, debugging, and the reasons one architecture or integration makes more sense than another. For me, understanding the lower layers and making sound decisions at the application level are connected parts of the same practice.

My master's degree in Information Management adds another perspective. Software systems collect, store, process, organize, and make information useful. I am interested in how computing principles meet information architecture, databases, organizations, and decision-making—and in continuing to explore that intersection.`,
      image: "/assets/images/Jason_interest.png",
    },
  };

  const Button = ({
    children,
    variant = "default",
    icon: Icon,
    onClick,
    className = "",
  }: {
    children: ReactNode;
    variant?: "default" | "outline";
    icon?: ComponentType<{ size?: number }>;
    onClick?: () => void;
    className?: string;
  }) => {
    const baseStyles =
      "px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-[colors,transform] duration-300 flex items-center gap-2 hover:scale-105";
    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
      outline:
        "border-2 border-accent/50 text-accent hover:bg-accent/10 hover:border-accent",
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

  const allParagraphs = content?.[activeTab]?.content?.split("\n\n");
  const previewParagraphs = allParagraphs?.slice(0, 2);
  const extraParagraphs = allParagraphs?.slice(2);

  const renderParagraph = (paragraph: string, index: number) => {
    if (paragraph?.startsWith("**") && paragraph?.endsWith("**")) {
      const title = paragraph?.slice(2, -2);
      return (
        <div key={index} className="flex items-start gap-4 mt-12 mb-6 group">
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
          <h4 className="text-xl lg:text-2xl font-bold text-primary group-hover:text-cyan-100 transition-colors">
            {title}
          </h4>
        </div>
      );
    }
    return (
      <p
        key={index}
        className="text-gray-300 leading-relaxed text-sm lg:text-lg pl-3 sm:pl-6 relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary/60 before:to-transparent hover:text-white transition-colors duration-300"
      >
        {paragraph}
      </p>
    );
  };

  return (
    <section className="relative py-2 lg:py-8 bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-0 sm:px-6 relative z-10">
        {/* Header Section */}
        <RevealSection direction="left">
          <div className="text-center mb-8 sm:mb-16">
            <div className=" sm:mb-4">
              <div
                className="inline-flex items-center px-4 py-2 
              bg-primary/10 text-primary rounded-full text-xs sm:text-base font-medium mb-4
              ring-1 ring-primary/20"
              >
                <AppIcon name="Smile" size={16} className="mr-2" />
                About Me
              </div>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-6 py-2 bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent">
              How I Think, Build, and Learn
            </h2>
            <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The systems I build, the decisions behind them, and the questions
              that keep me learning
            </p>
          </div>
        </RevealSection>

        {/* Enhanced Tab Navigation */}
        <RevealSection direction="up">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(tab?.id);
                  setExpanded(false);
                }}
                icon={tab.icon}
              >
                {tab?.label}
              </Button>
            ))}
          </div>
        </RevealSection>

        {/* Content Card */}
        <RevealSection direction="right">
          <div className="relative bg-[#172126]/90 rounded-3xl lg:border border-primary/25 px-2 py-8 lg:p-14 lg:shadow-2xl overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/35 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-emerald-300/25 rounded-br-3xl"></div>

            <div className="relative space-y-10">
              {/* Title */}
              <div className="text-center space-y-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                  {content?.[activeTab]?.title}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-cyan-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                </div>
              </div>

              {/* Image Container */}
              <div
                className="relative h-[60vw] sm:h-[400px] w-full max-w-[550px] mx-auto rounded-2xl overflow-hidden border-2 border-primary/25 shadow-2xl shadow-primary/10 group"
                style={{
                  boxShadow: "0 0 32px rgba(0, 149, 255, 0.12)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                <div className="relative h-full w-full p-3 bg-gradient-to-br from-primary/10 via-transparent to-emerald-300/10">
                  <div className="absolute inset-0 bg-slate-900/30 rounded-xl z-10"></div>
                  <Image
                    src={content?.[activeTab]?.image}
                    className="relative h-full w-full object-cover grayscale rounded-xl scale-[1.02] group-hover:scale-[1.06] group-hover:brightness-110 group-hover:contrast-110 transition duration-700 ease-out z-0"
                    alt={content?.[activeTab]?.title}
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#d7ff63] text-[#10150b] text-xs font-semibold rounded-full border border-accent/30">
                  {activeTab === "story" && "Journey"}
                  {activeTab === "philosophy" && "Principles"}
                  {activeTab === "interests" && "Under the surface"}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 px-2 lg:px-10">
                {/* Always visible — first 2 paragraphs */}
                {previewParagraphs?.map((paragraph, index) =>
                  renderParagraph(paragraph, index),
                )}

                {/* Expandable section */}
                <div
                  ref={expandRef}
                  style={{
                    maxHeight: expanded
                      ? expandRef.current?.scrollHeight + "px"
                      : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="space-y-6 pt-2">
                    {extraParagraphs?.map((paragraph, index) =>
                      renderParagraph(paragraph, index + 2),
                    )}
                  </div>
                </div>

                {/* See More / See Less */}
                {extraParagraphs?.length > 0 && (
                  <div className="flex justify-center pt-2 !mt-2">
                    <button
                      onClick={() => setExpanded((prev) => !prev)}
                      className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-[#0095ff] border border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-400 transition-colors duration-300"
                    >
                      <span>{expanded ? "See Less" : "See More"}</span>
                      <AppIcon
                        name="ChevronDown"
                        size={16}
                        className={`transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

export default ProfessionalBio;
