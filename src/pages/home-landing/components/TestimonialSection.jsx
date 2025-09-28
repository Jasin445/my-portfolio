import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon"

const TestimonialSection = () => {
  return (
    <section className="pt-11 pb-14 bg-gradient-to-b from-[#131426]/95 via-[#272b34] to-[#2a363c]">
      <div className="max-w-6xl mx-auto relative z-20">
        <div className="absolute top-[18%] right-0 bg-gradient-to-r from-muted opacity-50 rounded-full w-40 h-40 via-muted to-muted blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[60%] -left-10 bg-gradient-to-r from-muted opacity-70 rounded-full w-40 h-40 via-muted to-muted blur-3xl animate-float" />
        <div className="absolute top-[5%] right-[50%] bg-gradient-to-r from-[#4e575d] opacity-70 rounded-full w-40 h-40 via-[#4e575d] to-[#4e575d] blur-3xl animate-pulse-slow"></div>
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Section Header */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
              <Icon name="Quote" size={16} className="mr-2" />
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What People Say
            </h2>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              A few words from colleagues and clients I’ve worked with on
              projects and collaborations.
            </p>
          </div>

          {/* Testimonial Grid */}
          <div className="grid md:grid-cols-[30%_35%_30%] gap-8">
            {/* Testimonial 1 */}
            <div
              className="bg-gradient-to-b z-30 from-[#1d1f2e]/70 via-white/10 to-transparent hover:shadow-[0_0_12px_rgba(1,149,255,0.25)] rounded-xl border border-border shadow-xl transition p-8"
            >
              <p className="text-muted-foreground mb-4 italic">
                "Jason combines strong technical skills with a sharp eye for
                design. He delivered our project on time and exceeded
                expectations."
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src="assets/images/testimonial1.jpg"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="text-foreground font-semibold">
                    Sarah Johnson
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    Product Manager, TechCorp
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className="bg-gradient-to-b z-30 from-[#1d1f2e]/70 via-white/10 to-transparent hover:shadow-[0_0_12px_rgba(1,149,255,0.25)] rounded-xl border border-border shadow-xl transition p-8"
            >
              <p className="text-muted-foreground mb-4 italic">
                "His ability to merge clean code with user-centered design is
                outstanding. Jason brought real innovation to our web platform."
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src="assets/images/testimonial2.jpg"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="text-foreground font-semibold">
                    Michael Chen
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    Lead Developer, InnovateX
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className="bg-gradient-to-b z-30 from-[#1d1f2e]/70 via-white/10 to-transparent hover:shadow-[0_0_12px_rgba(1,149,255,0.25)] rounded-xl border border-border shadow-xl transition p-8"
            >
              <p className="text-muted-foreground mb-4 italic">
                "Jason’s design sense and technical know-how transformed our
                idea into a seamless digital product. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src="assets/images/testimonial3.jpg"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="text-foreground font-semibold">Aisha Bello</h4>
                  <span className="text-sm text-muted-foreground">
                    Founder, StartupHub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
