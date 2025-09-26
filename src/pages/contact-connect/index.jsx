import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../.././components/AppIcon'
import { Helmet } from "react-helmet"
import ScrollProgress from '../../components/ui/ScrollProgress';
import Header from '../../components/ui/Header';


const ContactConnect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://linkedin.com/in/alexjohnson-dev",
      color: "text-blue-600",
      followers: "2.5K"
    },
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com/alexjohnson-dev",
      color: "text-gray-800",
      followers: "1.8K"
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://twitter.com/alexjohnson_dev",
      color: "text-blue-400",
      followers: "950"
    },
    {
      name: "Email",
      icon: "Mail",
      url: "mailto:alex@devportfolio.com",
      color: "text-red-500",
      followers: "Direct"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (in real app, use toast/notification)
    alert('Message sent successfully! I\'ll get back to you soon.');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
       <Helmet>
        <title>Contact Connect - DevPortfolio Pro</title>
        <meta
          name="description"
          content="Get in touch with Alex Developer for your next project. Available for full-time positions, freelance work, consulting, and collaboration opportunities."
        />
        <meta
          name="keywords"
          content="contact developer, hire react developer, freelance frontend, web development services, technical consulting"
        />
        <meta
          property="og:title"
          content="Contact Connect - DevPortfolio Pro"
        />
        <meta
          property="og:description"
          content="Ready to work together? Contact Alex Developer for professional frontend development services and opportunities."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://devportfolio-pro.com/contact-connect"
        />
      </Helmet>
      <div className="bg-background">
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
                Whether you're looking for a full-time developer, need help with
                a specific project, or want to explore collaboration
                opportunities, I'm here to help bring your ideas to life.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    24h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Response Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Projects Delivered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">5★</div>
                  <div className="text-sm text-muted-foreground">
                    Client Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">3+</div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Get In Touch
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Let's Work Together
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always interested in new opportunities and exciting projects. Whether you're a startup looking for a technical co-founder or an 
                established company needing frontend expertise, let's discuss how 
                we can create something amazing together.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Mail" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">alex@devportfolio.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Phone</div>
                  <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Location</div>
                  <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-fast group"
                  >
                    <Icon 
                      name={social?.icon} 
                      size={20} 
                      className={`${social?.color} group-hover:scale-110 transition-transform duration-fast`} 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{social?.name}</div>
                      <div className="text-xs text-muted-foreground">{social?.followers}</div>
                    </div>
                    <Icon name="ExternalLink" size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-fast" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">Schedule a Call</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Prefer to talk? Let's schedule a 30-minute call to discuss your project needs.
                  </p>
                  <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
                    Book a Meeting
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData?.name}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData?.email}
                onChange={handleInputChange}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or how I can help..."
                  value={formData?.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Or explore more about my work
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="User" 
                  iconPosition="left"
                  fullWidth
                  asChild
                >
                  <Link to="/about-professional">About Me</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="FileText" 
                  iconPosition="left"
                  fullWidth
                  asChild
                >
                  <Link to="/technical-blog">Read Blog</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactConnect;