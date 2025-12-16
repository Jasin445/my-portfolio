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
import { useGetAllProjects } from "../../apis/queries";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  // Filter and sort projects
  //   const apiService = new APIService()
  //   const { get } = apiService;

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const allProjects = await get("/projects");
  //     console.log(allProjects);
  //   };

  //   fetchProjects();
  // }, []); // 👈 runs once on mount

  // const { projects, loading, isEmpty, error } = useGetAllProjects();
  // console.log(projects);
  const loading = false

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(
        (project) =>
          project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          project?.description
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          project?.technologies?.some((tech) =>
            tech?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          )
      );
    }

    // Apply category filters
    if (activeFilters?.length > 0) {
      filtered = filtered?.filter((project) => {
        return activeFilters?.every((filter) => {
          // Safer filter parsing to avoid initialization issues
          const filterParts = filter?.split(":") || [];
          const category = filterParts?.[0] || "";
          const value = filterParts?.[1] || "";

          switch (category) {
            case "technology":
              return project?.technologies?.some((tech) =>
                tech?.toLowerCase()?.includes(value?.toLowerCase())
              );
            case "type":
              // Map project types based on technologies and characteristics
              const projectType = getProjectType(project);
              return projectType === value;
            case "status":
              return project?.status === value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    filtered?.sort((sortA, sortB) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = sortA?.title?.toLowerCase() || "";
          bValue = sortB?.title?.toLowerCase() || "";
          break;
        case "date":
          aValue = new Date(sortA?.completedDate || "2024-01-01");
          bValue = new Date(sortB?.completedDate || "2024-01-01");
          break;
        case "technology":
          aValue = sortA?.technologies?.[0] || "";
          bValue = sortB?.technologies?.[0] || "";
          break;
        case "status":
          aValue = sortA?.status || "";
          bValue = sortB?.status || "";
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [mockProjects, searchQuery, activeFilters, sortBy, sortOrder]);

  const getProjectType = (project) => {
    const techs = project?.technologies?.map((t) => t?.toLowerCase());

    if (
      techs?.includes("react") ||
      techs?.includes("vue.js") ||
      techs?.includes("angular")
    ) {
      return "web-app";
    }
    if (techs?.includes("node.js") || techs?.includes("express")) {
      return "api";
    }
    return "website";
  };

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProjects?.length / projectsPerPage
  );
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = filteredAndSortedProjects?.slice(
    startIndex,
    startIndex + projectsPerPage
  );

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

    const currentIndex = filteredAndSortedProjects?.findIndex(
      (p) => p?.id === selectedProject?.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex - 1;
    }

    if (newIndex >= 0 && newIndex < filteredAndSortedProjects?.length) {
      setSelectedProject(filteredAndSortedProjects?.[newIndex]);
    }
  };

  const hasNextProject = selectedProject
    ? filteredAndSortedProjects?.findIndex(
        (p) => p?.id === selectedProject?.id
      ) <
      filteredAndSortedProjects?.length - 1
    : false;

  const hasPrevProject = selectedProject
    ? filteredAndSortedProjects?.findIndex(
        (p) => p?.id === selectedProject?.id
      ) > 0
    : false;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters, sortBy, sortOrder]);

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
      <main className="">
        {/* Hero Section */}

        <GenericHeroSection title={"Projects"} loading={loading} />

        {/* Main Content */}
        <section className="relative py-12 h-full">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4"></div>
            <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[340px] z-40 h-20 -bottom-10 translate-y-14"></div>
          </div>
          <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0 py-8">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl z-30 font-semibold text-foreground">
                      {loading
                        ? "Fetching projects..."
                        : `${filteredAndSortedProjects?.length} Projects found`}
                    </h2>
                  </div>
                </div>

                {/* Projects Grid/List */}
                {paginatedProjects?.length > 0 ? (
                  <>
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                        {paginatedProjects?.map((project) => (
                          <ProjectCard
                            key={project?.id}
                            project={project}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 space-y-6 mb-12">
                        {paginatedProjects?.map((project) => (
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
                          )?.map((page) => (
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
                ) : (
                  <div className="text-center py-16">
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
                      onClick={() => {
                        setActiveFilters([]);
                        setSearchQuery("");
                        setCurrentPage(1);
                      }}
                    >
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
                hasNext={hasNextProject}
                hasPrev={hasPrevProject}
              />
            </div>
          </div>
        </section>

        <section>
          <SkillsOverview />
        </section>
        <ContactCta />
      </main>
      <Footer lightweight />
    </div>
  );
};

export default PortfolioProjects;
