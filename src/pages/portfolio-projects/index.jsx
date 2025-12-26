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
import { useGetAllProjects } from "../../apis/queries";
import { mockProjects } from "../../data";

const PortfolioProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 6;

  const { projects, loading, isEmpty, error } = useGetAllProjects();
  console.log(projects)
  // const loading = true;
  // Helper function to determine project type
  const getProjectType = (project) => {
    const techs = project?.technologies?.map((t) => t?.toLowerCase()) || [];

    if (techs.some((t) => ["react", "vue.js", "angular"].includes(t))) {
      return "web-app";
    }
    if (techs.some((t) => ["node.js", "express"].includes(t))) {
      return "api";
    } ugly
    return "website";
  };

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = (error || isEmpty) ? mockProjects : projects || [];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project?.title?.toLowerCase()?.includes(query) ||
          project?.description?.toLowerCase()?.includes(query) ||
          project?.technologies?.some((tech) =>
            tech?.toLowerCase()?.includes(query)
          )
      );
    }

    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((project) => {
        return activeFilters.every((filter) => {
          const [category, value] = filter.split(":");

          switch (category) {
            case "technology":
              return project?.technologies?.some((tech) =>
                tech?.toLowerCase()?.includes(value?.toLowerCase())
              );
            case "type":
              return getProjectType(project) === value;
            case "status":
              return project?.status === value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    
    if (!Array.isArray(filtered)) {
      filtered = [];
    }
    const sorted =  [...filtered].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = a?.title?.toLowerCase() || "";
          bValue = b?.title?.toLowerCase() || "";
          break;
        case "date":
          aValue = new Date(a?.completedDate || "2024-01-01");
          bValue = new Date(b?.completedDate || "2024-01-01");
          break;
        case "technology":
          aValue = a?.technologies?.[0] || "";
          bValue = b?.technologies?.[0] || "";
          break;
        case "status":
          aValue = a?.status || "";
          bValue = b?.status || "";
          break;
        default:
          return 0;
      }

      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [projects, error, searchQuery, activeFilters, sortBy, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedProjects.length / projectsPerPage
  );
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = filteredAndSortedProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  // Navigation helpers
  const getCurrentProjectIndex = () => {
    return selectedProject
      ? filteredAndSortedProjects.findIndex(
          (p) => p?.id === selectedProject?.id
        )
      : -1;
  };

  const hasNextProject = () => {
    const currentIndex = getCurrentProjectIndex();
    return (
      currentIndex >= 0 && currentIndex < filteredAndSortedProjects.length - 1
    );
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

    if (newIndex >= 0 && newIndex < filteredAndSortedProjects.length) {
      setSelectedProject(filteredAndSortedProjects[newIndex]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters, sortBy, sortOrder]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
        <GenericHeroSection title="Projects" loading={loading} />

        {/* Main Content */}
        <section className="relative py-12 h-full">
          {/* Background Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[340px] z-40 h-20 -bottom-10 translate-y-14" />
          </div>

          <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0 py-8">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <h2 className="text-2xl z-30 font-semibold text-foreground">
                    {loading
                      ? "Fetching projects..."
                      : `${
                          filteredAndSortedProjects.length || "No"
                        } Projects found`}
                  </h2>
                </div>
                {/* Projects Display */}
                {paginatedProjects.length > 0 ? (
                  <>
                    {/* Grid or List View */}
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

                    {/* Pagination */}
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
                              variant={
                                currentPage === page ? "default" : "ghost"
                              }
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
                ) : loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <ProjectCardSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="relative text-center py-16 ">
                    <Icon
                      name="Search"
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or clearing the
                      filters.
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
