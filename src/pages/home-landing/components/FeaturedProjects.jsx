import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const FeaturedProjects = () => {
  const featuredProjects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description:
        "A comprehensive admin dashboard for managing online stores with real-time analytics, inventory management, and customer insights.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      category: "Web Application",
      status: "Completed",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative project management tool with drag-and-drop functionality, team collaboration features, and progress tracking.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
      category: "Web Application",
      status: "Completed",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Forecast Widget",
      description:
        "An interactive weather widget with location-based forecasts, animated weather icons, and detailed meteorological data.",
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      technologies: ["React", "OpenWeather API", "CSS Animations"],
      category: "Widget",
      status: "Completed",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A responsive portfolio website showcasing creative work with smooth animations, optimized performance, and SEO best practices.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
      category: "Website",
      status: "Completed",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
  ];

  return (
    <section 
  className="relative py-20 
             bg-slate-100/80"
>
  {/* Subtle radial glow behind header for depth */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 
                  w-[600px] h-[300px] 
                  bg-gradient-radial from-white/5 via-transparent to-transparent 
                  blur-3xl opacity-0 pointer-events-none" />

  {/* Optional top shadow for smoother section nesting */}
  <div className="absolute inset-x-0 top-0 h-10 
                  bg-gradient-to-b from-black/20 to-transparent" />

  <div className="relative max-w-6xl mx-auto px-6 sm:px-12">
    {/* Section Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 
                      bg-primary/10 text-primary rounded-full text-sm font-medium mb-4
                      ring-1 ring-primary/20 backdrop-blur-sm">
        <Icon name="Star" size={16} className="mr-2" />
            Featured Work
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
            Selected Projects
          </h2>

          <p className="text-lg text-background max-w-2xl mx-auto">
            A showcase of my recent work demonstrating expertise in modern web
            technologies and user-centered design principles.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects?.map((project, index) => (
            <div
              key={project?.id}
              className="group bg-slate-100/80 border-white/20 text-secondary rounded-xl overflow-hidden hover:shadow-lg transition-all duration-slow hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project?.image}
                  alt={`Screenshot of ${project?.title} project`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-slow" />

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-slow">
                  <Button
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

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                    {project?.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold  mb-2 group-hover:text-primary transition-colors duration-fast">
                    {project?.title}
                  </h3>

                  <p className="text-sm leading-relaxed">
                    {project?.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted text-foreground text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="left"
                      className="text-xs"
                    >
                      Live Demo
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Github"
                      iconPosition="left"
                      className="text-xs"
                    >
                      Code
                    </Button>
                  </div>

                  <div className="flex items-center text-xs ">
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="mr-1 text-success"
                    />
                    {project?.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            asChild
          >
            <Link to="/portfolio-projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
