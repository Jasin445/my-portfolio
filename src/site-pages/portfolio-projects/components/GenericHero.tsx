import Image from "next/image";

interface GenericHeroSectionProps {
  title?: string;
  imageSrc?: string;
  imagePosition?: string;
  overlay?: string;
  loading?: boolean;
}

const GenericHeroSection = ({
  title,
  imageSrc = "/assets/images/projects-hero.png",
  imagePosition = "center",
  overlay = "from-[#131426]/50 via-[#0f1115]/50 to-[#132b3a]/55",
  loading = false,
}: GenericHeroSectionProps) => {
  return (
    <section className="relative h-[300px] md:h-[500px] overflow-hidden">
      {/* Background layer: only this is dimmed */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: imagePosition }}
        />
      </div>

      <div className="relative h-full">
        <div className={`relative z-0 flex justify-center items-center h-full pt-28 px-4 sm:px-6 bg-gradient-to-b ${overlay}`}>
          <div className="z-10 mb-12 w-full max-w-[920px] text-center">
            <p className="mb-4 flex items-center justify-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary z-30">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_1rem_rgba(0,149,255,0.7)]"
              />
              Portfolio // {title}
            </p>
            <h1 className="relative text-foreground mb-8 w-full text-center text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.86] tracking-[-0.085em] z-70">
              <span className="sr-only">{title}</span>
              {loading ? (
                <div className="flex justify-center items-center z-20">
                  <div className="w-[200px] h-[200px]">
                    <img
                      src="/assets/images/loader.png"
                      alt="loader"
                      className="animate-spin"
                    />
                  </div>
                </div>
              ) : (
                <svg
                  viewBox="0 0 900 200"
                  className="mx-auto w-full max-w-[920px]"
                  aria-hidden="true"
                  focusable="false"
                >
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="draw-text"
                  >
                    {title}
                  </text>
                </svg>
              )}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenericHeroSection;
