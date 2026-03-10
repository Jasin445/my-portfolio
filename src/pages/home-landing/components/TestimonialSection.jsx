import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon"
import { RevealSection, TiltCard } from "../../../utils/animation.utils";

// Testimonials data
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

const TestimonialSection = () => {
  return (
    <section className="pt-11 pb-14 bg-gradient-to-b from-[#131426]/95 via-[#272b34] to-[#2a363c]">
      <div className="max-w-6xl mx-auto relative z-20">
        <div className="absolute top-[18%] right-0 bg-gradient-to-r from-muted opacity-50 rounded-full w-40 h-40 via-muted to-muted blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[60%] -left-10 bg-gradient-to-r from-muted opacity-70 rounded-full w-40 h-40 via-muted to-muted blur-3xl animate-float" />
        <div className="absolute top-[5%] right-[50%] bg-gradient-to-r from-[#4e575d] opacity-70 rounded-full w-40 h-40 via-[#4e575d] to-[#4e575d] blur-3xl animate-pulse-slow"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Section Header */}
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
              A few words from colleagues and clients I’ve worked with on
              projects and collaborations.
            </p>
          </div>
          </RevealSection>

          {/* Testimonial Grid */}
          <div className="grid xl:grid-cols-[33.3%_33.3%_33.3%] gap-8 max-w-xl mx-auto xl:ml-0 xl:max-w-full">
            {testimonials?.map((testimonial, idx) => {
              let direction;
              const isEven = idx % 2 === 0;
              if(isEven) direction = "right"
              if(!isEven) direction = "left"
              if(idx === 1) direction = "down"
              return <RevealSection index={idx} direction={direction} key={testimonial?.id}>
                <TiltCard>
                  <div
          
                    className="bg-gradient-to-b z-30 from-[#1d1f2e]/70 via-white/10 to-transparent hover:shadow-[0_0_12px_rgba(1,149,255,0.25)] rounded-xl border border-border shadow-xl transition p-8"
                  >
                    <p className="text-sm sm:text-lg text-muted-foreground mb-4 italic">
                      "{testimonial?.quote}"
                    </p>
                    <div className="flex justify-center sm:justify-end xl:justify-center items-center gap-4">
                      {testimonial?.image ? <Image
                        src={testimonial?.image}
                        alt={testimonial?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      /> : <div className="w-12 h-12 rounded-full bg-slate-500 font-bold text-gray-200 flex items-center justify-center">{testimonial?.avatar}</div>}
                      <div className="text-left">
                        <h4 className="text-foreground font-semibold">
                          {testimonial?.name}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {testimonial?.role}, {testimonial?.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </RevealSection>
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
