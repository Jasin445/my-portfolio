import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";
import { RevealSection } from "../../../utils/animation.utils";

const ContactCta = () => {
  const router = useRouter();

  return (
    <RevealSection direction="down">
    <section className="relative py-10 sm:py-20">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-secondary-foreground mb-4">
          Let’s Solve the Hard Problems
        </h2>
        <p className="text-sm sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          I thrive on challenges that push creativity and technical skill. If
          you’re tackling something ambitious, whether it’s a startup idea or a
          product at scale, I’d love to help design and build the solution.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            iconName="Mail"
            iconPosition="left"
            onClick={() => router.push("/contact-connect")}
          >
            Get In Touch
          </Button>

          <Button
            variant="outline"
            size="lg"
            iconName="Linkedin"
            iconPosition="left"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() =>
              window.open("https://www.linkedin.com/in/jason-dagana-73a470317/", "_blank")
            }
          >
            Connect on LinkedIn
          </Button>
        </div>
      </div>
      </section>
      </RevealSection>
  );
};

export default ContactCta;
