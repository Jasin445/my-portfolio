import Image from "./AppImage";
const Footer = ({lightweight}) => {

  if (lightweight) {
    return (
    <footer className="bg-gradient-to-b from-[#2a363c] to-background border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-transparent border rounded-lg flex items-center justify-center">
            <Image src="/assets/logo.png" alt="logo" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            © {new Date().getFullYear()} Dagana Jason
          </span>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-muted-foreground flex gap-6">
          <a href="mailto:daganajason72@gmail.com" className="hover:text-primary transition-colors">
            Email
          </a>
          <a href="tel:+2349013642811" className="hover:text-primary transition-colors">
            Call
          </a>
          <span>Abuja, Nigeria</span>
        </div>
      </div>
      </footer>
    )
  }


  return (
    <footer className="bg-gradient-to-b from-[#2a363c] to-background border-t border-border py-12">
      <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-4 sm:px-6">
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
              More than just a name, A digital Experience!
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
        <div className="pt-8 border-t w-full border-border flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} Dagana Jason. All rights reserved.
          </div>
          <div className="flex gap-6">
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


// import Image from "./AppImage";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-b from-[#2a363c] to-background border-t border-border py-8">
//       <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
//         {/* Brand */}
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-transparent border rounded-lg flex items-center justify-center">
//             <Image src="/assets/logo.png" alt="logo" />
//           </div>
//           <span className="text-sm font-medium text-muted-foreground">
//             © {new Date().getFullYear()} Dagana Jason
//           </span>
//         </div>

//         {/* Contact Info */}
//         <div className="text-sm text-muted-foreground flex gap-6">
//           <a href="mailto:daganajason72@gmail.com" className="hover:text-primary transition-colors">
//             Email
//           </a>
//           <a href="tel:+2349013642811" className="hover:text-primary transition-colors">
//             Call
//           </a>
//           <span>Abuja, Nigeria</span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
