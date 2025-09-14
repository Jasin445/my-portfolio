import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectInquiry = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const inquiryTypes = [
    {
      id: 'full-time',
      title: 'Full-time Position',
      description: 'Looking for a permanent team member with frontend expertise',
      icon: 'Briefcase',
      features: [
        'Remote or hybrid work arrangements',
        'Competitive salary and benefits',
        'Long-term career growth',
        'Team collaboration and mentorship'
      ],
      timeline: '2-4 weeks',
      commitment: 'Full-time',
      budget: '$80k - $150k annually'
    },
    {
      id: 'freelance',
      title: 'Freelance Project',
      description: 'Need a skilled developer for a specific project or feature',
      icon: 'Zap',
      features: [
        'Project-based engagement',
        'Flexible working hours',
        'Direct client communication',
        'Deliverable-focused approach'
      ],
      timeline: '1-6 months',
      commitment: 'Part-time/Project',
      budget: '$50 - $150/hour'
    },
    {
      id: 'consulting',
      title: 'Consulting Services',
      description: 'Expert advice on architecture, performance, or technical strategy',
      icon: 'Users',
      features: [
        'Technical architecture review',
        'Code quality assessment',
        'Performance optimization',
        'Team training and workshops'
      ],
      timeline: '1-4 weeks',
      commitment: 'Consultation',
      budget: '$150 - $250/hour'
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'Partnership opportunities, open source, or joint ventures',
      icon: 'GitBranch',
      features: [
        'Open source contributions',
        'Technical partnerships',
        'Knowledge sharing',
        'Community building'
      ],
      timeline: 'Ongoing',
      commitment: 'Flexible',
      budget: 'Negotiable'
    }
  ];

  const handleInquirySelect = (inquiry) => {
    setSelectedInquiry(selectedInquiry?.id === inquiry?.id ? null : inquiry);
  };

  const handleGetStarted = (inquiryType) => {
    // Scroll to contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm?.scrollIntoView({ behavior: 'smooth' });
      
      // Pre-fill project type in form if possible
      const projectTypeSelect = contactForm?.querySelector('select[name="projectType"]');
      if (projectTypeSelect) {
        projectTypeSelect.value = inquiryType?.id;
        projectTypeSelect?.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Project Inquiries
        </h2>
        <p className="text-muted-foreground">
          Choose the type of engagement that best fits your needs. Each option is tailored for different project requirements.
        </p>
      </div>
      {/* Inquiry Types */}
      <div className="space-y-4">
        {inquiryTypes?.map((inquiry) => (
          <div key={inquiry?.id} className="border border-border rounded-lg overflow-hidden">
            {/* Inquiry Header */}
            <button
              onClick={() => handleInquirySelect(inquiry)}
              className="w-full p-6 text-left bg-card hover:bg-muted/30 transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={inquiry?.icon} size={20} className="text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      {inquiry?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {inquiry?.description}
                    </p>
                  </div>
                </div>
                
                <Icon 
                  name={selectedInquiry?.id === inquiry?.id ? 'ChevronUp' : 'ChevronDown'} 
                  size={20} 
                  className="text-muted-foreground transition-transform duration-fast"
                />
              </div>
            </button>

            {/* Expanded Content */}
            {selectedInquiry?.id === inquiry?.id && (
              <div className="px-6 pb-6 bg-muted/20 border-t border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {inquiry?.features?.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Project Details:</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Timeline:</span>
                          <span className="text-foreground font-medium">{inquiry?.timeline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Commitment:</span>
                          <span className="text-foreground font-medium">{inquiry?.commitment}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Budget Range:</span>
                          <span className="text-foreground font-medium">{inquiry?.budget}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="default"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={() => handleGetStarted(inquiry)}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Process Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-medium text-foreground mb-4">How It Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-semibold">1</span>
            </div>
            <h4 className="font-medium text-foreground mb-2">Initial Contact</h4>
            <p className="text-sm text-muted-foreground">
              Submit your inquiry with project details and requirements
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-semibold">2</span>
            </div>
            <h4 className="font-medium text-foreground mb-2">Discovery Call</h4>
            <p className="text-sm text-muted-foreground">
              Schedule a call to discuss your project in detail
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-semibold">3</span>
            </div>
            <h4 className="font-medium text-foreground mb-2">Proposal & Start</h4>
            <p className="text-sm text-muted-foreground">
              Receive a detailed proposal and begin collaboration
            </p>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Frequently Asked Questions</h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-1">What's your typical response time?</h4>
            <p className="text-muted-foreground">I respond to all inquiries within 24 hours, usually much sooner.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-1">Do you work with international clients?</h4>
            <p className="text-muted-foreground">Yes, I work with clients globally and am flexible with time zones.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-1">What technologies do you specialize in?</h4>
            <p className="text-muted-foreground">React, TypeScript, Node.js, and modern frontend frameworks. Full stack capabilities available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInquiry;