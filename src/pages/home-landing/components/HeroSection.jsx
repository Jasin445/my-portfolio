import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-background via-card to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Icon name="Code" size={16} className="mr-2" />
                Frontend Developer
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Building Digital
                <span className="block text-primary">Experiences</span>
                That Matter
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Dedicated to building seamless, user-focused web experiences through clean code, thoughtful design, and modern frameworks. Skilled in React, Next.js, and TypeScript.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="default" 
                size="lg" 
                iconName="Briefcase" 
                iconPosition="left"
                className="text-base"
                asChild
              >
                <Link to="/portfolio-projects">View My Work</Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                iconName="Download" 
                iconPosition="left"
                className="text-base"
              >
                Download Resume
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">7+</div>
                <div className="text-sm text-muted-foreground">Modern Tools & Frameworks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">100+</div>
                <div className="text-sm text-muted-foreground">GitHub Contributions</div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                 <Image
                                    src="/assets/images/photo.jpg"
                                    alt="Alex Johnson - Frontend Developer"
                                    className="w-full h-full object-cover"
                                  />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse-subtle">
                <Icon name="Zap" size={24} color="white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg animate-pulse-subtle">
                <Icon name="Heart" size={16} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;