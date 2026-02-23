import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

const ContactCta = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-[#2a363c]/90 via-blue-200/5 to-[#2a363c]/5 py-20">
      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bg-red-400/25 h-40 w-20 rounded-full blur-[120px] right-[8%] top-[10%]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
          Let’s Solve the Hard Problems
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
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
            className="text-white"
            onClick={() => navigate("/contact-connect")}
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
              window.open("https://www.linkedin.com/in/yourprofile", "_blank")
            }
          >
            Connect on LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
