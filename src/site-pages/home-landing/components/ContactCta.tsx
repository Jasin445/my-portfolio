import Button from "../../../components/ui/Button";
import { RevealSection } from "../../../utils/animation.utils";

const ContactCta = () => {
  return (
    <section className="homepage-section-divider relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <RevealSection direction="up">
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
            onClick={() => (window.location.href = "/contact-connect")}
            >
            Get In Touch
          </Button>
        </div>
            </RevealSection>
      </div>
    </section>
  );
};

export default ContactCta;
