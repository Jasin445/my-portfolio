import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfessionalHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 ">
      <div className=" mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">Available for opportunities</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Frontend Developer & 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> UI Architect</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
               Dedicated to building seamless, user-focused web experiences through clean code, thoughtful design, and modern frameworks. Skilled in React, Next.js, and TypeScript.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="default" 
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="shadow-lg hover:shadow-xl transition-shadow duration-normal"
              >
                Download Resume
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                iconName="Mail"
                iconPosition="left"
              >
                Get In Touch
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-primary">6+</div>
                {/* <div className="text-sm text-muted-foreground">Years Experience</div> */}
                <div className="text-sm text-muted-foreground">Frontend Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-accent">50+</div>
                {/* <div className="text-sm text-muted-foreground">Projects Completed</div> */}
                <div className="text-sm text-muted-foreground">Modern Tools & Frameworks</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-success">500+</div>
                <div className="text-sm text-muted-foreground">Hours of Focused <br /> Practise</div>
              </div>
            </div>
          </div>

          {/* Professional Photo */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              {/* Background Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-accent/10 rounded-full blur-2xl"></div>
              
              {/* Main Photo Container */}
              <div className="relative bg-card rounded-2xl p-6 shadow-xl border border-border">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-muted">
                  <Image
                    src="/assets/images/jason.webp"
                    alt="Alex Johnson - Frontend Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Badge */}
                {/* <div className="absolute -bottom-3 -right-3 bg-background border border-border rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Code" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Senior Developer</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHero;