import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import CarTransition from "../../../components/CarDrive";
import { mockProjects } from "../../../data";
import { useGetAllProjects } from "../../../apis/queries";

const FeaturedProjects = () => {
  // const { projects, loading, isEmpty, error } = useGetAllProjects();
  const featuredMockProjects = mockProjects?.filter((p) => p?.featured);
  // const filteredProjects = projects?.filter((p) => p?.featured);
  // const navigate = useNavigate();

  console.log(featuredMockProjects)

  const handleNavigate = (url) => {
    if (!url) return;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };

  // let featuredProjects =
  //   isEmpty || error ? featuredMockProjects : filteredProjects;
  let featuredProjects = featuredMockProjects?.slice(0, 4) || [];

  return (
    <section
      className="relative py-12 sm:py-20 
              bg-gradient-to-b from-[#2a363c] via-[#131426]/95 to-[#2a363c]/90"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-[#172034] to-white 
                  blur-[340px] opacity-20 pointer-events-none"
      />
      <div
        className="absolute inset-x-0 top-0 h-10 
                  bg-gradient-to-b from-black/20 to-transparent blur-xs"
      />

      <CarTransition />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="inline-flex items-center justify-center px-4 py-2 
                        bg-primary/10 text-primary rounded-full text-sm font-medium
                        ring-1 ring-primary/20 backdrop-blur-sm"
            >
              <Icon name="Star" size={16} className="mr-2" />
              Featured Work
            </div>
            {/* <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" /> */}
          </div>

          <div className="flex flex-col md:items-center justify-center gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-3 text-center">
                Selected
                <span className="ml-2 sm:ml-3 relative inline-block">
                   Projects
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-transparent rounded-full" />
                </span>
              </h2>
              <p className="text-lg text-center text-foreground max-w-xl leading-relaxed opacity-80">
                A showcase of my recent work demonstrating expertise in modern
                web technologies and user-centered design principles.
              </p>
            </div>

            
          </div>
        </div>

        {/* Projects Grid */}
        {/* {loading ? ( */}
          {/* <div className="h-32 flex justify-center items-center">
            <div className="w-20 h-20 rounded-full animate-spin border border-white border-t-blue-500" />
          </div>
        ) : ( */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredProjects?.map((project, index) => (
              <div
                key={project?.id}
                className="group bg-[#2a363c]/80 text-secondary rounded-2xl overflow-hidden shadow-2xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project?.image}
                    alt={`Screenshot of ${project?.title} project`}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />

                  {/* Bottom gradient so content reads on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a363c]/90 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-medium rounded-full shadow-lg">
                      {project?.category}
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <Button
                      onClick={() => navigate(project?.liveUrl)}
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 bg-white/90 hover:bg-white"
                      aria-label="View live demo"
                    >
                      <Icon name="ExternalLink" size={14} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 bg-white/90 hover:bg-white"
                      aria-label="View source code"
                    >
                      <Icon name="Github" size={14} />
                    </Button>
                  </div>

                  {/* Ghost index number */}
                  <div className="absolute bottom-3 right-4 text-white/[0.07] font-black text-6xl leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
                      {project?.title}
                    </h3>
                    <p className="text-sm text-foreground leading-relaxed opacity-80 line-clamp-2">
                      {project?.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project?.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white/5 border border-white text-foreground text-xs rounded-lg opacity-80 hover:opacity-100 hover:border-primary/30 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-4" />

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {project?.liveUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="left"
                          className="text-xs text-foreground opacity-80 hover:opacity-100 hover:text-primary"
                          onClick={() => handleNavigate(project?.liveUrl)}
                        >
                          Live Demo
                        </Button>
                      )}
                      {project?.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Github"
                          iconPosition="left"
                          className="text-xs text-foreground opacity-80 hover:opacity-100"
                          onClick={() => handleNavigate(project?.githubUrl)}
                        >
                          Code
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-foreground opacity-80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-100" />
                      {project?.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        {/* )} */}

        {/* View All Projects CTA */}
        {/* {!loading && ( */}
          <div className="text-center">
            <Button
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              asChild
            >
              <Link to="/projects" className="text-white">
                View All Projects
              </Link>
            </Button>
          </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default FeaturedProjects;