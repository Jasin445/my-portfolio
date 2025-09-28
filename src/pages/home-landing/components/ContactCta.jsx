import Button from "../../../components/ui/Button";

const ContactCta = () => {
  return (
      <section className="relative bg-gradient-to-b from-[#2a363c] to-[#1c1f25] py-20">
           <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_rgba(36,40,49,1)_0%,_rgba(36,40,49,0)_80%)]
" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl font-bold text-secondary-foreground mb-4">
          Interested in Working Together?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
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
    </section>
  );
};

export default ContactCta;
