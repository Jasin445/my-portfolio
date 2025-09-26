import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScrollProgress from '../../components/ui/ScrollProgress';
import ContactForm from './components/ContactForm';
import ContactMethods from './components/ContactMethods';
import ProjectInquiry from './components/ProjectInquiry';
import LocationInfo from './components/LocationInfo';
import Icon from '../../components/AppIcon';

const ContactConnect = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('form');

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleHashChange = () => {
      const hash = window.location?.hash?.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock form submission
      console.log('Form submitted:', formData);
      
      // In a real app, you would send this to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      return { success: true };
    } catch (error) {
      throw new Error('Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigationSections = [
    { id: 'form', label: 'Contact Form', icon: 'Mail' },
    { id: 'methods', label: 'Get In Touch', icon: 'MessageSquare' },
    { id: 'inquiry', label: 'Project Types', icon: 'Briefcase' },
    { id: 'location', label: 'Location & Time', icon: 'MapPin' }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Connect - DevPortfolio Pro</title>
        <meta name="description" content="Get in touch with Alex Developer for your next project. Available for full-time positions, freelance work, consulting, and collaboration opportunities." />
        <meta name="keywords" content="contact developer, hire react developer, freelance frontend, web development services, technical consulting" />
        <meta property="og:title" content="Contact Connect - DevPortfolio Pro" />
        <meta property="og:description" content="Ready to work together? Contact Alex Developer for professional frontend development services and opportunities." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://devportfolio-pro.com/contact-connect" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <ScrollProgress />

        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="MessageCircle" size={16} />
                <span>Let's Connect</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Build Something
                <span className="text-primary"> Amazing Together?</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Whether you're looking for a full-time developer, need help with a specific project, 
                or want to explore collaboration opportunities, I'm here to help bring your ideas to life.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">24h</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">5★</div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">3+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto px-6">
            <div className="flex items-center space-x-1 py-4 overflow-x-auto">
              {navigationSections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => {
                    setActiveSection(section?.id);
                    document.getElementById(section?.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast whitespace-nowrap ${
                    activeSection === section?.id
                      ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Form Section */}
              <section id="form">
                <ContactForm 
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
              </section>

              {/* Project Inquiry Section */}
              <section id="inquiry">
                <ProjectInquiry />
              </section>
            </div>

            {/* Right Column - Contact Methods & Location */}
            <div className="space-y-8">
              {/* Contact Methods Section */}
              <section id="methods">
                <ContactMethods />
              </section>

              {/* Location Info Section */}
              <section id="location">
                <LocationInfo />
              </section>
            </div>
          </div>
        </main>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't hesitate to reach out. I'm always happy to discuss your project needs 
              and explore how we can work together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="mailto:alex.developer@email.com"
                className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-fast"
              >
                <Icon name="Mail" size={18} />
                <span>Send Quick Email</span>
              </a>
              
              <a
                href="https://calendly.com/alex-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-background text-foreground border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors duration-fast"
              >
                <Icon name="Calendar" size={18} />
                <span>Schedule Call</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className=" mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} DevPortfolio Pro. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6">
                <a
                  href="mailto:alex.developer@email.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-fast"
                  aria-label="Email"
                >
                  <Icon name="Mail" size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/alex-developer-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-fast"
                  aria-label="LinkedIn"
                >
                  <Icon name="Linkedin" size={18} />
                </a>
                <a
                  href="https://github.com/alex-developer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-fast"
                  aria-label="GitHub"
                >
                  <Icon name="Github" size={18} />
                </a>
                <a
                  href="https://twitter.com/alexdevpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-fast"
                  aria-label="Twitter"
                >
                  <Icon name="Twitter" size={18} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactConnect;