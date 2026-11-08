import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { RevealSection, TiltCard } from "../../../utils/animation.utils";
import usePerformanceGuard from "../../../hooks/usePerformanceGuard";

const testimonials = [
  {
    id: 1,
    quote: "Jason combines strong technical skills with a sharp eye for design. He delivered our project on time and exceeded expectations.",
    name: "Bobson Prosper",
    avatar: "BP",
    role: "CEO",
    company: "9Stack",
    image: ""
  },
  {
    id: 2,
    quote: "Working with Jason was a fantastic experience. His attention to detail and problem-solving abilities are outstanding.",
    name: "Isaac Adedokun",
    avatar: "IA",
    role: "Data Scientist",
    company: "Newsbridge",
    image: ""
  },
  {
    id: 3,
    quote: "Jason's expertise in Engineering helped us build a scalable and performant application. Highly recommended!",
    name: "Brumen Pascal",
    avatar: "BP",
    role: "CEO",
    company: "Datatechhub Edtech",
    image: ""
  }
];

const DIRECTIONS = ["right", "down", "left"] as const;

const TestimonialSection = () => {
  const { animationsActive } = usePerformanceGuard();

  return (
    <section className="homepage-section-divider relative overflow-hidden py-16">
      <div className="relative z-20 mx-auto w-full max-w-6xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center h-full">
          <RevealSection direction="down">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                <Icon name="Quote" size={16} className="mr-2" />
                Testimonials
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                What People Say
              </h2>
              <p className="text-sm sm:text-lg text-gray-100 max-w-xl mx-auto">
                A few words from colleagues and clients I've worked with on
                projects and collaborations.
              </p>
            </div>
          </RevealSection>

          <div className="mx-auto grid max-w-xl gap-5 md:gap-6 xl:ml-0 xl:max-w-full xl:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <RevealSection
                className="h-full"
                index={idx}
                direction={DIRECTIONS[idx]}
                key={testimonial.id}
              >
                <TiltCard active={animationsActive}>
                  <div className="project-art-card relative z-30 rounded-xl border border-white/10 p-5 shadow-xl transition hover:shadow-[0_0_32px_rgba(0,149,255,0.12)] sm:p-8">
                    <p className="text-sm sm:text-lg text-muted-foreground mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex min-w-0 items-center justify-center gap-3 sm:justify-end sm:gap-4 xl:justify-center">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-500 font-bold text-gray-200 flex items-center justify-center">
                          {testimonial.avatar}
                        </div>
                      )}
                      <div className="text-left">
                        <h4 className="text-foreground font-semibold">{testimonial.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
