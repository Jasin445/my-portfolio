import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import CarTransition from "../../../components/CarDrive";
import { mockProjects } from "../../../data";
import ProjectModal from "../../portfolio-projects/components/ProjectModal";
import { useState, useRef, useCallback, useEffect } from "react";
import { RevealSection, TiltCard } from "../../portfolio-projects";

/* ─── Underwater Fish Tank ───────────────────────────────────── */
const FishTank = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fishColors = [
      ["#6be6ff", "#3ab8d4"],
      ["#f472b6", "#c0406e"],
      ["#a78bfa", "#7c5cbf"],
      ["#34d399", "#1a7a52"],
      ["#fb923c", "#c4571a"],
      ["#facc15", "#b8960f"],
      ["#e2e8f0", "#94a3b8"],
      ["#f87171", "#b91c1c"],
    ];

    const fishes = Array.from({ length: 60 }, () => {
      const size = Math.random() * 10 + 3;
      const colorPair = fishColors[Math.floor(Math.random() * fishColors.length)];
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: Math.random() * (canvas.width || 1400),
        y: Math.random() * (canvas.height || 800),
        size,
        speed: (Math.random() * 0.6 + 0.15) * dir,
        vy: (Math.random() - 0.5) * 0.08,
        waveAmp: Math.random() * 1.5 + 0.3,
        waveFreq: Math.random() * 0.04 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: colorPair[0],
        finColor: colorPair[1],
        alpha: Math.random() * 0.45 + 0.15,
        dir,
        tailPhase: Math.random() * Math.PI * 2,
        tailSpeed: Math.random() * 0.12 + 0.06,
        depth: Math.random(),
      };
    });

    const bubbles = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 800,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.12 + 0.04,
    }));

    const drawFish = (ctx, fish, t) => {
      const { x, y, size, color, finColor, alpha, dir, tailPhase, depth } = fish;
      const depthAlpha = alpha * (0.3 + depth * 0.7);
      const depthSize = size * (0.5 + depth * 0.5);
      const tail = Math.sin(t * fish.tailSpeed * 60 + tailPhase) * (depthSize * 0.35);

      ctx.save();
      ctx.globalAlpha = depthAlpha;
      ctx.translate(x, y);
      if (dir < 0) ctx.scale(-1, 1);

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, depthSize * 1.6, depthSize * 0.65, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-depthSize * 1.4, 0);
      ctx.lineTo(-depthSize * 2.2, tail - depthSize * 0.5);
      ctx.lineTo(-depthSize * 2.2, tail + depthSize * 0.5);
      ctx.closePath();
      ctx.fillStyle = finColor;
      ctx.fill();

      // Dorsal fin
      ctx.beginPath();
      ctx.moveTo(-depthSize * 0.2, -depthSize * 0.65);
      ctx.quadraticCurveTo(depthSize * 0.3, -depthSize * 1.2, depthSize * 0.8, -depthSize * 0.65);
      ctx.fillStyle = finColor + "aa";
      ctx.fill();

      // Eye
      ctx.beginPath();
      ctx.arc(depthSize * 0.9, -depthSize * 0.1, depthSize * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(depthSize * 0.93, -depthSize * 0.13, depthSize * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      ctx.restore();
    };

    let raf;
    let t = 0;

// Sort ONCE at init, outside draw()
fishes.sort((a, b) => a.depth - b.depth);

// Pre-create gradients (do this after resize too)
let cachedGrads = [];
const buildGrads = () => {
  cachedGrads = Array.from({ length: 5 }, (_, i) => {
    const grad = ctx.createLinearGradient(0, 0, 40, canvas.height * 0.7);
    grad.addColorStop(0, "rgba(107,230,255,0.04)");
    grad.addColorStop(1, "rgba(107,230,255,0)");
    return grad;
  });
};
buildGrads();

// In resize():
const resized = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  buildGrads(); // rebuild after resize
};

// Updated draw():
let lastTime = 0;
const draw = (timestamp) => {
  if (timestamp - lastTime < 33) {
    raf = requestAnimationFrame(draw);
    return;
  }
  lastTime = timestamp;
  t += 0.016;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(10, 20, 50, 0.18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Caustic rays - use cached grads
  for (let i = 0; i < 5; i++) {
    const rx = (canvas.width / 4) * i + Math.sin(t * 0.3 + i) * 30;
    ctx.beginPath();
    ctx.moveTo(rx, 0);
    ctx.lineTo(rx + 60, canvas.height * 0.7);
    ctx.lineTo(rx - 60, canvas.height * 0.7);
    ctx.fillStyle = cachedGrads[i];
    ctx.fill();
  }

  // Batch bubbles - single strokeStyle set
  ctx.lineWidth = 0.5;
  bubbles.forEach((b) => {
    b.y -= b.speed;
    b.wobble += 0.02;
    b.x += Math.sin(b.wobble) * 0.3;
    if (b.y < -10) { b.y = canvas.height + 10; b.x = Math.random() * canvas.width; }
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(180,240,255,${b.alpha})`;
    ctx.stroke();
  });

  // No sort — already sorted at init
  fishes.forEach((fish) => {
    fish.phase += fish.waveFreq;
    fish.x += fish.speed;
    fish.y += Math.sin(fish.phase) * fish.waveAmp + fish.vy;

    if (fish.dir > 0 && fish.x > canvas.width + 30) fish.x = -30;
    if (fish.dir < 0 && fish.x < -30) fish.x = canvas.width + 30;
    if (fish.y < -20) fish.y = canvas.height + 20;
    if (fish.y > canvas.height + 20) fish.y = -20;

    drawFish(ctx, fish, t);
  });

  raf = requestAnimationFrame(draw);
};
raf = requestAnimationFrame(draw);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resized);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
};

/* ════════════════════════════════════════════════════════════ */
const FeaturedProjects = () => {
  const featuredMockProjects = mockProjects?.filter((p) => p?.featured);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  let featuredProjects = featuredMockProjects?.slice(0, 4) || [];

  const hasNextProject = () => selectedIndex < featuredProjects.length - 1;
  const hasPrevProject = () => selectedIndex > 0;

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
      className="scroll-mt-14 relative py-12 sm:py-20 
              bg-gradient-to-b from-[#2a3a3c]/90 via-[#132026] to-[#252d36]/90"
    >
      {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-[#172034] to-white blur-[40px] opacity-20 pointer-events-none" /> */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/20 to-transparent blur-xs" />
      <div className="absolute inset-0 pointer-events-none">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" /> */}
          {/* <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4"></div> */}
          {/* <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[40px] z-40 h-20 -bottom-10 translate-y-14"></div> */}
        </div>

      <FishTank />
      <CarTransition />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-12" style={{ zIndex: 1 }}>
        <RevealSection>
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
                A showcase of my recent work demonstrating expertise in modern web technologies and user-centered design principles.
              </p>
            </div>
          </div>
          </div>
          </RevealSection>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featuredProjects?.map((project, index) => {
            return (
            <RevealSection key={project?.id}>
            <TiltCard>
              <div
                className="group bg-[#2a363c]/80 h-full text-secondary rounded-2xl overflow-hidden shadow-2xl border border-white/5 transition-all duration-500 sm:hover:-translate-y-2 sm:hover:border-primary/20 sm:hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]"
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
                  <div className="absolute inset-0 bg-black/20 sm:group-hover:bg-black/40 transition-colors duration-500" />


                  {/* Ghost index number */}
                  <div className="absolute bottom-3 right-4 text-white/[0.07] font-black text-6xl leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-base sm:text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
                      {project?.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed opacity-80 line-clamp-2">
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
                      {/* {project?.liveUrl && ( */}
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
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-foreground opacity-80">
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
            <Link to="/projects" className="text-white">View All Projects</Link>
          </Button>
        </div>

        <ProjectModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onNavigate={handleNavigateProject}
          hasNext={hasNextProject()}
          hasPrev={hasPrevProject()}
        />
      </div>
    </section>
  );
};

export default FeaturedProjects;