import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import CarTransition from "../../../components/CarDrive";
import { mockProjects } from "../../../data";
import { lazy, Suspense, useMemo, useState } from "react";
import FishTank, {
  RevealSection,
  TiltCard,
} from "../../../utils/animation.utils";
import usePerformanceGuard from "../../../hooks/usePerformanceGuard";

const ProjectModal = lazy(
  () => import("../../portfolio-projects/components/ProjectModal"),
);

const DIRECTIONS = ["up", "down", "right", "left"];

const FeaturedProjects = () => {
  const featuredProjects = useMemo(
    () => mockProjects?.filter((p) => p?.featured).slice(0, 4) ?? [],
    [],
  );

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { animationsActive } = usePerformanceGuard();

  const hasNextProject = useMemo(
    () => selectedIndex < featuredProjects.length - 1,
    [selectedIndex, featuredProjects.length],
  );
  const hasPrevProject = useMemo(() => selectedIndex > 0, [selectedIndex]);

  const handleOpenModal = (project, index) => {
    setSelectedIndex(index);
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleNavigateProject = (direction) => {
    if (!selectedProject) return;
    const newIndex = direction === "next" ? selectedIndex + 1 : selectedIndex - 1;
    if (newIndex >= 0 && newIndex < featuredProjects.length) {
      setSelectedProject(featuredProjects[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  return (
    <section
      id="featuredProjects"
      className="scroll-mt-14 relative py-12 sm:py-20 h-full bg-gradient-to-b from-[#2a3a3c]/90 via-[#132026] to-[#252d36]/90"
      style={{ isolation: "isolate" }}
    >
      <div className="absolute inset-x-0 !top-0 h-10 bg-gradient-to-b from-black/20 to-transparent blur-xs" />

      <FishTank animationsActive={animationsActive} />
      <CarTransition active={animationsActive} />

      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-12 h-full"
        style={{ zIndex: 1 }}
      >
        <RevealSection direction="up">
          <div className="mb-10 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-8">
              <div className="inline-flex overflow-x-hidden items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium ring-1 ring-primary/20 backdrop-blur-sm">
                <Icon name="Star" size={16} className="mr-2" />
                Featured Work
              </div>
            </div>
            <div className="flex flex-col md:items-center justify-center gap-6">
              <div>
                <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-3 text-center">
                  Selected
                  <span className="ml-2 sm:ml-3 relative inline-block">
                    Projects
                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-transparent rounded-full" />
                  </span>
                </h2>
                <p className="text-sm sm:text-lg text-center text-foreground max-w-xl leading-relaxed opacity-80">
                  A showcase of my recent work demonstrating expertise in modern
                  web technologies and user-centered design principles.
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-6 mb-12 h-full">
          {featuredProjects.map((project, index) => {
            const direction = DIRECTIONS[index % DIRECTIONS.length];
            return (
              <RevealSection className="h-full" direction={direction} key={project?.id}>
                <TiltCard active={animationsActive}>
                  <div className="group bg-[#2a363c]/80 h-full text-secondary rounded-2xl overflow-hidden shadow-2xl border border-white/5 transition duration-500 sm:hover:-translate-y-2 sm:hover:border-primary/20 sm:hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={project?.image}
                        alt={`Screenshot of ${project?.title} project`}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a363c]/90 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-black/20 sm:group-hover:bg-black/40 transition-colors duration-500" />
                      <div className="absolute bottom-3 right-4 text-white/[0.07] font-black text-6xl leading-none select-none">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-base sm:text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
                          {project?.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground leading-relaxed opacity-80 line-clamp-2">
                          {project?.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project?.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-white/5 border border-white text-foreground text-xs rounded-lg opacity-80 hover:opacity-100 hover:border-primary/30 transition duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="h-px bg-white/5 mb-4" />

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="ExternalLink"
                            iconPosition="left"
                            className="text-xs text-foreground opacity-80 hover:opacity-100 hover:text-primary"
                            onClick={() => handleOpenModal(project, index)}
                          >
                            View Details
                          </Button>

                          {project?.liveUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="ExternalLink"
                              iconPosition="left"
                              className="text-xs text-foreground opacity-80 hover:opacity-100 hover:text-primary"
                              onClick={() => window.open(project.liveUrl, "_blank")}
                            >
                              Live Demo
                            </Button>
                          )}
                        </div>

                        <div className="hidden sm:flex items-center gap-1.5 text-xs text-foreground opacity-80">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-100" />
                          {project?.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </RevealSection>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" iconName="ArrowRight" iconPosition="right" asChild>
            <Link to="/projects" className="text-white">
              View All Projects
            </Link>
          </Button>
        </div>

        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onNavigate={handleNavigateProject}
            hasNext={hasNextProject}
            hasPrev={hasPrevProject}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default FeaturedProjects;