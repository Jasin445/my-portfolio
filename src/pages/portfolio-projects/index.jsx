import { useState, useEffect, useMemo } from "react";
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

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Featured", value: "featured" },
    { label: "Non Featured", value: "non-featured" },
    { label: "Completed", value: "completed" },
  ];

  // Filter logic
  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case "featured":
        return mockProjects.filter((p) => p.featured);
      case "non-featured":
        return mockProjects.filter((p) => !p.featured);
      case "completed":
        return mockProjects.filter(
          (p) => p.status?.toLowerCase() === "completed"
        );
      default:
        return mockProjects;
    }
  }, [activeFilter]);

  // Pagination calculated from filtered list
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  // Navigation helpers
  const getCurrentProjectIndex = () => {
    return selectedProject
      ? filteredProjects.findIndex((p) => p?.id === selectedProject?.id)
      : -1;
  };

  const hasNextProject = () => {
    const currentIndex = getCurrentProjectIndex();
    return currentIndex >= 0 && currentIndex < filteredProjects.length - 1;
  };

  const hasPrevProject = () => {
    const currentIndex = getCurrentProjectIndex();
    return currentIndex > 0;
  };

  // Event handlers
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNavigateProject = (direction) => {
    if (!selectedProject) return;
    const currentIndex = getCurrentProjectIndex();
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < filteredProjects.length) {
      setSelectedProject(filteredProjects[newIndex]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage])

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    setOpenFilterDropdown(false);
  };

  const handleResetFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, sortBy, sortOrder]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#filter-dropdown")) {
        setOpenFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("currentPage:", currentPage);
console.log("paginatedProjects length:", paginatedProjects.length);
console.log("startIndex:", startIndex);
console.log("filteredProjects length:", filteredProjects.length);

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
    <div className="relative min-h-screen bg-gradient-to-br from-background via-card to-muted/20">
      <Helmet>
        <title>My Projects - Jason Dagana Projects</title>
        <meta
          name="description"
          content="Explore my portfolio of web development projects including React applications, full-stack solutions, and innovative digital experiences."
        />
        <meta
          name="keywords"
          content="projects, web development, React, JavaScript, frontend, fullstack"
        />
      </Helmet>

      <Header />
      <ScrollProgress />

      <main>
        <GenericHeroSection title="Projects" />

        {/* Main Content */}
        <section className="relative py-12 h-full">
          {/* Background Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[340px] z-40 h-20 -bottom-10 translate-y-14" />
          </div>

          <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0 py-8">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <h2 className="text-2xl z-30 font-semibold text-foreground">
                    {filteredProjects.length || "No"} Projects found
                  </h2>

                  {/* Filter Dropdown */}
                  <div id="filter-dropdown" className="relative z-20 rounded-lg w-60">
                    <button
                      onClick={() => setOpenFilterDropdown((prev) => !prev)}
                      className={`cursor-pointer w-full ${
                        !openFilterDropdown ? "rounded-lg" : "rounded-t-lg"
                      } text-left bg-[#1b202f] px-4 py-3 flex items-center justify-between`}
                    >
                      <span>
                        {filterOptions.find((o) => o.value === activeFilter)?.label ?? "Filter By"}
                      </span>
                      <Icon
                        name={openFilterDropdown ? "ChevronUp" : "ChevronDown"}
                        size={14}
                      />
                    </button>

                    {openFilterDropdown && (
                      <div className="absolute text-sm rounded-b-lg top-[46px] left-0 bg-[#1b202f] pt-2 w-full shadow-xl">
                        <ul className="flex flex-col">
                          {filterOptions.map((option, index) => (
                            <li
                              key={option.value}
                              onClick={() => handleFilterSelect(option.value)}
                              className={`hover:bg-[#4b4b6d] cursor-pointer px-4 py-4 flex items-center justify-between transition-colors
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
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                        {paginatedProjects.map((project) => (
                          <ProjectCard
                            key={project?.id}
                            project={project}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 space-y-6 mb-12">
                        {paginatedProjects.map((project) => (
                          <ProjectListItem
                            key={project?.id}
                            project={project}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    )}

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ChevronLeft"
                          className="z-30"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>

                        <div className="flex space-x-1 z-30">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "ghost"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className="w-10"
                            >
                              {page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ChevronRight"
                          iconPosition="right"
                          className="z-30"
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
                    <Icon
                      name="Search"
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or clearing the filters.
                    </p>
                    <Button
                      variant="outline"
                      iconName="RotateCcw"
                      iconPosition="left"
                      onClick={handleResetFilters}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Project Modal */}
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

        <SkillsOverview />
        <ContactCta />
      </main>

      <Footer lightweight />
    </div>
  );
};

export default PortfolioProjects;