import Image from "./AppImage";
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-transparent border rounded-lg flex items-center justify-center">
                <Image src="/assets/logo.png" alt={"logo"} />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Dagana Jason
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Frontend Developer passionate about creating exceptional digital
              experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "Portfolio", path: "/portfolio-projects" },
                { label: "About", path: "/about-professional" },
                { label: "Blog", path: "/technical-blog" },
                { label: "Contact", path: "/contact-connect" },
              ]?.map((link) => (
                <a
                  key={link?.path}
                  href={link?.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-fast"
                >
                  {link?.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>daganajason72@gmail.com</div>
              <div>+234 9013642811</div>
              <div>Abuja, Nigeria</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} Dagana Jason. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-fast"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-fast"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
