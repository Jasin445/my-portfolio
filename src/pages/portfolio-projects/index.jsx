import { useState, useEffect, useMemo, useRef, useCallback, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import ProjectCard from "./components/ProjectCard";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Footer from "../../components/Footer";
import SkillsOverview from "./components/SkillsOverview";
import ContactCta from "./components/ContactCta";
import GenericHeroSection from "./components/GenericHero";
import { mockProjects } from "../../data";
import { RevealSection, TiltCard } from "../../utils/animation.utils";
import { useOnScreen } from "../../hooks/useOnScreen";

// ── Lazy loaded — only fetched when user opens a project ──
const ProjectModal = lazy(() => import("./components/ProjectModal"));

const PROJECTS_PER_PAGE = 6;

// ── Static data outside component — never recreated on render ──
const FILTER_OPTIONS = [
  { label: "All Projects",  value: "all"          },
  { label: "Featured",      value: "featured"     },
  { label: "Non Featured",  value: "non-featured" },
  { label: "Completed",     value: "completed"    },
];

/* ─── Animated counter ─────────────────────────────────────── */
const AnimatedCounter = ({ value }) => {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    const start = prev.current;
    const end = value;
    const duration = 400;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else prev.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span>{display}</span>;
};


const Particles = ({ active }) => {
  if (!active) return null;

  const particles = useMemo(() => 
    Array.from({ length: 180 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(107,230,255,0.25)",
            animation: `floatParticles ${p.duration}s ${p.delay}s infinite alternate ease-in-out`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};


/* ─── Page number slot machine ───────────────────────────────── */
const SlotNumber = ({ page }) => (
  <span
    key={page}
    style={{ display: "inline-block", animation: "slotIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards" }}
  >
    {page}
  </span>
);

/* ════════════════════════════════════════════════════════════ */
const PortfolioProjects = () => {
  const [selectedProject,    setSelectedProject]    = useState(null);
  const [isModalOpen,        setIsModalOpen]        = useState(false);
  const [activeFilter,       setActiveFilter]       = useState("all");
  const [searchQuery,        setSearchQuery]        = useState("");
  const [sortBy,             setSortBy]             = useState("date");
  const [sortOrder,          setSortOrder]          = useState("desc");
  const [currentPage,        setCurrentPage]        = useState(1);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const [filterChanging,     setFilterChanging]     = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const sectionRef = useRef(null);
  const active = useOnScreen(sectionRef, 0);

  const filterTimer = useRef(null);

  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case "featured":     return mockProjects.filter((p) => p.featured);
      case "non-featured": return mockProjects.filter((p) => !p.featured);
      case "completed":    return mockProjects.filter((p) => p.status?.toLowerCase() === "completed");
      default:             return mockProjects;
    }
  }, [activeFilter]);

  const totalPages        = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex        = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const getCurrentProjectIndex = useCallback(
    () => selectedProject ? filteredProjects.findIndex((p) => p?.id === selectedProject?.id) : -1,
    [selectedProject, filteredProjects]
  );

  const hasNextProject = useMemo(() => {
    const i = getCurrentProjectIndex();
    return i >= 0 && i < filteredProjects.length - 1;
  }, [getCurrentProjectIndex, filteredProjects]);

  const hasPrevProject = useMemo(
    () => getCurrentProjectIndex() > 0,
    [getCurrentProjectIndex]
  );

  const handleViewDetails = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  const handleNavigateProject = useCallback((direction) => {
    if (!selectedProject) return;
    const i        = getCurrentProjectIndex();
    const newIndex = direction === "next" ? i + 1 : i - 1;
    if (newIndex >= 0 && newIndex < filteredProjects.length)
      setSelectedProject(filteredProjects[newIndex]);
  }, [selectedProject, getCurrentProjectIndex, filteredProjects]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFilterSelect = useCallback((filter) => {
    setFilterChanging(true);
    clearTimeout(filterTimer.current);
    filterTimer.current = setTimeout(() => {
      setActiveFilter(filter);
      setGridKey((k) => k + 1);
      setOpenFilterDropdown(false);
      setFilterChanging(false);
    }, 200);
  }, []);

  const handleResetFilters = useCallback(() => {
    setActiveFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  useEffect(() => { setCurrentPage(1); }, [activeFilter, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#filter-dropdown")) setOpenFilterDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside, {passive: true});
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => () => clearTimeout(filterTimer.current), []);

  return (
    <>
      <Helmet>
        <title>My Projects - Jason Dagana Projects</title>
        <meta name="description" content="Explore my portfolio of web development projects including React applications, full-stack solutions, and innovative digital experiences." />
        <meta name="keywords" content="projects, web development, React, JavaScript, frontend, fullstack" />
      </Helmet>

      <Header />
      <main ref={sectionRef} className="relative min-h-screen bg-gradient-to-br overflow-hidden from-background via-card to-muted/20">
        <GenericHeroSection title="Projects" />

        <section className="relative z-30 pb-4 sm:py-12 h-full overflow-hidden" style={{isolation: "isolate"}}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[40px] z-40 h-20 -bottom-10 translate-y-14" />
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <Particles active={active} />
          </div>

          <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 min-w-0 py-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <h2 className="text-base sm:text-2xl z-30 font-semibold text-foreground">
                    <AnimatedCounter value={filteredProjects.length} />
                    {filteredProjects.length === 0 ? " No" : ""} Projects found
                  </h2>

                  <div id="filter-dropdown" className="relative z-30 rounded-lg w-40 sm:w-60">
                    <button
                      onClick={() => setOpenFilterDropdown((prev) => !prev)}
                      className={`cursor-pointer w-full ${!openFilterDropdown ? "rounded-lg" : "rounded-t-lg"} text-left bg-[#1b202f] px-4 py-2 sm:py-3 text-xs sm:text-base flex items-center justify-between`}
                    >
                      <span>{FILTER_OPTIONS.find((o) => o.value === activeFilter)?.label ?? "Filter By"}</span>
                      <Icon name={openFilterDropdown ? "ChevronUp" : "ChevronDown"} size={14} />
                    </button>

                    {openFilterDropdown && (
                      <div className="absolute text-xs sm:text-sm rounded-b-lg top-[46px] left-0 bg-[#1b202f] sm:pt-2 w-full shadow-xl">
                        <ul className="flex flex-col">
                          {FILTER_OPTIONS.map((option, index) => (
                            <li
                              key={option.value}
                              onClick={() => handleFilterSelect(option.value)}
                              className={`hover:bg-[#4b4b6d] cursor-pointer px-4 py-2 sm:py-4 flex items-center justify-between transition-colors
                                ${index === FILTER_OPTIONS.length - 1 ? "rounded-b-lg" : ""}
                                ${activeFilter === option.value ? "text-primary" : ""}`}
                            >
                              {option.label}
                              {activeFilter === option.value && <Icon name="Check" size={14} className="text-primary" />}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {paginatedProjects.length > 0 ? (
                  <>
                    <div
                      key={gridKey}
                      style={{
                        opacity:    filterChanging ? 0 : 1,
                        transform:  filterChanging ? "scale(0.98)" : "scale(1)",
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                        {paginatedProjects.map((project, index) => (
                          <RevealSection
                            key={project?.id}
                            index={index}
                            direction={index % 2 === 0 ? "left" : "right"}
                            active={active}
                          >
                            <TiltCard active={active}>
                                <ProjectCard project={project} onViewDetails={handleViewDetails} />
                            </TiltCard>
                          </RevealSection>
                        ))}
                      </div>
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="outline" size="sm" iconName="ChevronLeft" className="z-30"
                          onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                          Previous
                        </Button>
                        <div className="flex space-x-1 z-30">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button key={page} variant={currentPage === page ? "default" : "ghost"} size="sm"
                              onClick={() => handlePageChange(page)} className="w-10">
                              {currentPage === page ? <SlotNumber page={page} /> : page}
                            </Button>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" iconName="ChevronRight" iconPosition="right" className="z-30"
                          onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative text-center py-16">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search criteria or clearing the filters.</p>
                    <Button variant="outline" iconName="RotateCcw" iconPosition="left" onClick={handleResetFilters}>
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>

              {/* ── Suspense required for lazy ProjectModal ── */}
              <Suspense fallback={null}>
                {isModalOpen && (
                  <ProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onNavigate={handleNavigateProject}
                    hasNext={hasNextProject}
                    hasPrev={hasPrevProject}
                  />
                )}
              </Suspense>
            </div>
          </div>
        </section>

        <SkillsOverview />
        <ContactCta />
      </main>

      <Footer lightweight />
    </>
  );
};

export default PortfolioProjects;