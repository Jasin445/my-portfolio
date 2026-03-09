import Button from "../../../components/ui/Button";
import { RevealSection } from "../../../utils/animation.utils";

const ContactCta = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#283439] to-[#1f2229] py-12 sm:py-20">
           <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_rgba(36,40,49,1)_0%,_rgba(36,40,49,0)_80%)]
" />
      </div>

        <RevealSection direction="down">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <h2 className="text-xl sm:text-3xl font-bold text-secondary-foreground mb-4">
          Interested in Working Together?
        </h2>
        <p className="text-sm sm:text-lg text-muted-foreground mb-8 leading-relaxed">
          I'm always excited to take on new challenges and create amazing
          digital experiences. Let's discuss how we can bring your ideas to
          life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            iconName="Mail"
            iconPosition="left"
            className="text-white"
            onClick={() => (window.location.href = "/contact-connect")}
            >
            Get In Touch
          </Button>
        </div>
      </div>
            </RevealSection>
    </section>
  );
};

export default ContactCta;
