import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import ScrollProgress from "../../components/ui/ScrollProgress";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectListItem from "./components/ProjectListItem";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Footer from "../../components/Footer";
import SkillsOverview from "./components/SkillsOverview";
import ContactCta from "./components/ContactCta";
import GenericHeroSection from "./components/GenericHero";
import { mockProjects } from "../../data";

const PROJECTS_PER_PAGE = 6;

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

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prev.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span>{display}</span>;
};

/* ─── Scroll-reveal + stagger wrapper ──────────────────────── */
const RevealCard = ({ children, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms, transform 2s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms`,
      }}
    >
      {children}
    </div>
  );
};


export const RevealSection = ({ children, index = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);

  const getHiddenTransform = () => {
    switch (direction) {
      case "up":    return "translateY(60px) rotate(-4deg) scale(0.85)";
      case "down":  return "translateY(-60px) rotate(4deg) scale(0.85)";
      case "left":  return "translateX(60px) rotate(4deg) scale(0.85)";
      case "right": return "translateX(-60px) rotate(-4deg) scale(0.85)";
      default:      return "translateY(60px) rotate(-4deg) scale(0.85)";
    }
  };

  const getOvershootTransform = () => {
    switch (direction) {
      case "up":    return "translateY(-22px) rotate(1.5deg) scale(1.04)";
      case "down":  return "translateY(22px) rotate(-1.5deg) scale(1.04)";
      case "left":  return "translateX(-22px) rotate(-1.5deg) scale(1.04)";
      case "right": return "translateX(22px) rotate(1.5deg) scale(1.04)";
      default:      return "translateY(-22px) rotate(1.5deg) scale(1.04)";
    }
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => setPhase(1), index * 120);
      setTimeout(() => setPhase(2), index * 120 + 300);
    }
  }, [visible, index]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getStyle = () => {
    switch (phase) {
      case 0: return {
        opacity: 0,
        transform: getHiddenTransform(),
        filter: "blur(6px)",
      };
      case 1: return {
        opacity: 1,
        transform: getOvershootTransform(),
        filter: "blur(0px)",
        transition: `all 2s cubic-bezier(0.34, 1.56, 0.64, 1)`,
      };
      case 2: return {
        opacity: 1,
        transform: "translate(0) rotate(0deg) scale(1)",
        filter: "blur(0px)",
        transition: `all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      };
      default: return {};
    }
  };

  return (
    <div ref={ref} className={className} style={getStyle()}>
      {children}
    </div>
  );
};


/* ─── 3-D tilt card wrapper ─────────────────────────────────── */
const TiltCard = ({ children }) => {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`;
    el.style.transition = "transform 0.1s ease";
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1)";
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};

/* ─── Glowing border card ────────────────────────────────────── */
const GlowCard = ({ children, active }) => (
  <div
    style={{
      position: "relative",
      borderRadius: "0.75rem",
      padding: "1px",
      background: active
        ? "linear-gradient(135deg,#6be6ff,#a855f7,#6be6ff)"
        : "transparent",
      backgroundSize: active ? "200% 200%" : "100%",
      animation: active ? "borderSpin 3s linear infinite" : "none",
    }}
  >
    {children}
  </div>
);

/* ─── Floating particles background ─────────────────────────── */
const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 1440 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 1.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMove);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        // subtle mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += dx * 0.003;
          p.y += dy * 0.003;
        }
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107,230,255,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
};


/* ─── Page number slot machine ───────────────────────────────── */
const SlotNumber = ({ page }) => {
  const [key, setKey] = useState(page);
  useEffect(() => { setKey(page); }, [page]);

  return (
    <span
      key={key}
      style={{
        display: "inline-block",
        animation: "slotIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards",
      }}
    >
      {page}
    </span>
  );
};

/* ════════════════════════════════════════════════════════════ */
const PortfolioProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const [filterChanging, setFilterChanging] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  const filterOptions = [
    { label: "All Projects", value: "all" },
    { label: "Featured", value: "featured" },
    { label: "Non Featured", value: "non-featured" },
    { label: "Completed", value: "completed" },
  ];

  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case "featured":      return mockProjects.filter((p) => p.featured);
      case "non-featured":  return mockProjects.filter((p) => !p.featured);
      case "completed":     return mockProjects.filter((p) => p.status?.toLowerCase() === "completed");
      default:              return mockProjects;
    }
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const getCurrentProjectIndex = () =>
    selectedProject ? filteredProjects.findIndex((p) => p?.id === selectedProject?.id) : -1;

  const hasNextProject = () => {
    const i = getCurrentProjectIndex();
    return i >= 0 && i < filteredProjects.length - 1;
  };
  const hasPrevProject = () => getCurrentProjectIndex() > 0;

  const handleViewDetails = (project) => { setSelectedProject(project); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedProject(null); };

  const handleNavigateProject = (direction) => {
    if (!selectedProject) return;
    const i = getCurrentProjectIndex();
    const newIndex = direction === "next" ? i + 1 : i - 1;
    if (newIndex >= 0 && newIndex < filteredProjects.length)
      setSelectedProject(filteredProjects[newIndex]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  const handleFilterSelect = (filter) => {
    setFilterChanging(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setGridKey((k) => k + 1);
      setOpenFilterDropdown(false);
      setFilterChanging(false);
    }, 200);
  };

  const handleResetFilters = () => { setActiveFilter("all"); setSearchQuery(""); setCurrentPage(1); };

  useEffect(() => { setCurrentPage(1); }, [activeFilter, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#filter-dropdown")) setOpenFilterDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ProjectCardSkeleton = () => (
    <div className="bg-card rounded-lg border border-gray-500 p-6 animate-pulse">
      <div className="w-full h-48 bg-muted opacity-45 rounded-md mb-4" />
      <div className="h-6 bg-muted opacity-45 rounded w-3/4 mb-3" />
      <div className="h-4 bg-muted opacity-45 rounded w-full mb-2" />
      <div className="h-4 bg-muted opacity-45 rounded w-5/6 mb-4" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-muted opacity-45 rounded-full" />
        <div className="h-6 w-16 bg-muted opacity-45 rounded-full" />
        <div className="h-6 w-16 bg-muted opacity-45 rounded-full" />
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-br overflow-hidden from-background via-card to-muted/20">
      <style>{`
        @keyframes borderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slotIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-sweep {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(107,230,255,0.08) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmerSweep 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* <MagneticCursor /> */}

      <Helmet>
        <title>My Projects - Jason Dagana Projects</title>
        <meta name="description" content="Explore my portfolio of web development projects including React applications, full-stack solutions, and innovative digital experiences." />
        <meta name="keywords" content="projects, web development, React, JavaScript, frontend, fullstack" />
      </Helmet>

      <Header />
      <ScrollProgress />

      <div>
        <GenericHeroSection title="Projects" />

        {/* Main Content */}
        <section className="relative z-30 pb-4 sm:py-12 h-full overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[340px] z-40 h-20 -bottom-10 translate-y-14" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <Particles />
          </div>

          <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 min-w-0 py-8">

                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <h2 className="text-base sm:text-2xl z-30 font-semibold text-foreground">
                    <AnimatedCounter value={filteredProjects.length} />
                    {filteredProjects.length === 0 ? " No" : ""} Projects found
                  </h2>

                  {/* Filter Dropdown */}
                  <div id="filter-dropdown" className="relative z-30 rounded-lg w-40 sm:w-60">
                    <button
                      onClick={() => setOpenFilterDropdown((prev) => !prev)}
                      className={`cursor-pointer w-full ${!openFilterDropdown ? "rounded-lg" : "rounded-t-lg"} text-left bg-[#1b202f] px-4 py-2 sm:py-3 text-xs sm:text-base flex items-center justify-between`}
                    >
                      <span>{filterOptions.find((o) => o.value === activeFilter)?.label ?? "Filter By"}</span>
                      <Icon name={openFilterDropdown ? "ChevronUp" : "ChevronDown"} size={14} />
                    </button>

                    {openFilterDropdown && (
                      <div className="absolute text-xs sm:text-sm rounded-b-lg top-[46px] left-0 bg-[#1b202f] sm:pt-2 w-full shadow-xl">
                        <ul className="flex flex-col">
                          {filterOptions.map((option, index) => (
                            <li
                              key={option.value}
                              onClick={() => handleFilterSelect(option.value)}
                              className={`hover:bg-[#4b4b6d] cursor-pointer px-4 py-2 sm:py-4 flex items-center justify-between transition-colors
                                ${index === filterOptions.length - 1 ? "rounded-b-lg" : ""}
                                ${activeFilter === option.value ? "text-primary" : ""}`}
                            >
                              {option.label}
                              {activeFilter === option.value && (
                                <Icon name="Check" size={14} className="text-primary" />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Projects Display */}
                {paginatedProjects.length > 0 ? (
                  <>
                    <div
                      key={gridKey}
                      style={{
                        opacity: filterChanging ? 0 : 1,
                        transform: filterChanging ? "scale(0.98)" : "scale(1)",
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                          {paginatedProjects.map((project, index) => {
                            const isEven = index % 2 === 0
                            const direction = isEven ? "left" : "right"
                           return <RevealSection key={project?.id} index={index} direction={direction}>
                              <TiltCard>
                                <GlowCard active={false}>
                                  <ProjectCard
                                    project={project}
                                    onViewDetails={handleViewDetails}
                                  />
                                </GlowCard>
                              </TiltCard>
                            </RevealSection>
})}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 space-y-6 mb-12">
                          {paginatedProjects.map((project, index) => (
                            <RevealSection key={project?.id} index={index}>
                              <ProjectListItem project={project} onViewDetails={handleViewDetails} />
                            </RevealSection>
                          ))}
                        </div>
                      )}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline" size="sm" iconName="ChevronLeft" className="z-30"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>

                        <div className="flex space-x-1 z-30">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "ghost"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className="w-10"
                            >
                              {currentPage === page ? <SlotNumber page={page} /> : page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline" size="sm" iconName="ChevronRight" iconPosition="right" className="z-30"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
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

              <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onNavigate={handleNavigateProject}
                hasNext={hasNextProject()}
                hasPrev={hasPrevProject()}
              />
            </div>
          </div>
        </section>

        <SkillsOverview RevealCard={RevealCard} />
        <ContactCta />
      </div>

      <Footer lightweight />
    </main>
  );
};

export default PortfolioProjects;