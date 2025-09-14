import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 'email',
      label: 'Email',
      value: 'alex.developer@email.com',
      icon: 'Mail',
      href: 'mailto:alex.developer@email.com',
      description: 'Best for detailed project discussions',
      responseTime: '24 hours',
      primary: true
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: '/in/alex-developer-pro',
      icon: 'Linkedin',
      href: 'https://linkedin.com/in/alex-developer-pro',
      description: 'Professional networking and opportunities',
      responseTime: '48 hours',
      primary: false
    },
    {
      id: 'github',
      label: 'GitHub',
      value: '/alex-developer',
      icon: 'Github',
      href: 'https://github.com/alex-developer',
      description: 'View my code and contribute to projects',
      responseTime: 'Varies',
      primary: false
    },
    {
      id: 'twitter',
      label: 'Twitter',
      value: '@alexdevpro',
      icon: 'Twitter',
      href: 'https://twitter.com/alexdevpro',
      description: 'Quick updates and tech discussions',
      responseTime: '24-48 hours',
      primary: false
    }
  ];

  const handleContactClick = (method) => {
    if (method?.href?.startsWith('mailto:')) {
      window.location.href = method?.href;
    } else {
      window.open(method?.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Get In Touch
        </h2>
        <p className="text-muted-foreground">
          Choose your preferred way to connect. I'm always open to discussing new opportunities.
        </p>
      </div>
      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactMethods?.map((method) => (
          <div
            key={method?.id}
            className={`relative p-6 rounded-lg border transition-all duration-fast hover:shadow-md cursor-pointer group ${
              method?.primary
                ? 'bg-primary/5 border-primary/20 hover:border-primary/30' :'bg-card border-border hover:border-border/60'
            }`}
            onClick={() => handleContactClick(method)}
          >
            {/* Primary Badge */}
            {method?.primary && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Primary
                </span>
              </div>
            )}

            {/* Icon and Label */}
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-fast ${
                method?.primary
                  ? 'bg-primary/10 text-primary group-hover:bg-primary/15' :'bg-muted text-muted-foreground group-hover:bg-muted/80'
              }`}>
                <Icon name={method?.icon} size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-1">
                  {method?.label}
                </h3>
                <p className="text-sm text-primary font-medium mb-2 truncate">
                  {method?.value}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {method?.description}
                </p>
                
                {/* Response Time */}
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>Response: {method?.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
              <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => window.open('https://calendly.com/alex-developer', '_blank')}
            className="justify-start"
          >
            Schedule a Call
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/assets/resume/Alex_Developer_Resume.pdf';
              link.download = 'Alex_Developer_Resume.pdf';
              link?.click();
            }}
            className="justify-start"
          >
            Download Resume
          </Button>
        </div>
      </div>
      {/* Availability Status */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <h3 className="font-medium text-foreground">Currently Available</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="text-success font-medium">Open to opportunities</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="text-foreground">San Francisco, CA (PST)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Preferred Projects:</span>
            <span className="text-foreground">React, Frontend, Full-stack</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Next Available:</span>
            <span className="text-foreground">January 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMethods;