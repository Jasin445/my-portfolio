import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadResume = () => {
  const [downloadStats, setDownloadStats] = useState({
    pdf: 1247,
    doc: 892,
    total: 2139
  });

  const resumeFormats = [
    {
      id: 'pdf',
      name: 'PDF Format',
      description: 'Perfect for viewing and printing with preserved formatting',
      icon: 'FileText',
      size: '2.4 MB',
      downloads: downloadStats?.pdf,
      recommended: true,
      features: ['Preserved formatting', 'Universal compatibility', 'Print-ready', 'Smaller file size']
    },
    {
      id: 'doc',
      name: 'Word Document',
      description: 'Editable format for ATS systems and customization',
      icon: 'FileEdit',
      size: '1.8 MB',
      downloads: downloadStats?.doc,
      recommended: false,
      features: ['ATS-friendly', 'Editable content', 'Easy customization', 'Widely supported']
    }
  ];

  const handleDownload = (format) => {
    // Simulate download
    setDownloadStats(prev => ({
      ...prev,
      [format]: prev?.[format] + 1,
      total: prev?.total + 1
    }));

    // In a real application, this would trigger the actual download
    console.log(`Downloading resume in ${format} format`);
    
    // Show success message (you could use a toast notification here)
    alert(`Resume download started! Format: ${format?.toUpperCase()}`);
  };

  const lastUpdated = "December 8, 2024";
  const version = "v3.2";

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Download My Resume
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a comprehensive overview of my experience, skills, and achievements in your preferred format
          </p>
        </div>

        {/* Resume Preview Card */}
        <div className="bg-card rounded-xl border border-border p-8 mb-8 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Preview Image */}
            <div className="relative">
              <div className="bg-background rounded-lg border-2 border-border p-6 shadow-lg">
                {/* Mock Resume Preview */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    <div>
                      <div className="h-4 bg-foreground rounded w-32 mb-1"></div>
                      <div className="h-3 bg-muted-foreground rounded w-24"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-4/5"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-4 bg-primary/20 rounded w-24 mb-2"></div>
                    <div className="h-2 bg-muted rounded w-full"></div>
                    <div className="h-2 bg-muted rounded w-5/6"></div>
                    <div className="h-2 bg-muted rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              
              {/* Version Badge */}
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {version}
              </div>
            </div>

            {/* Resume Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Alex Johnson - Frontend Developer
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive resume showcasing 6+ years of frontend development experience, 
                  technical skills, project highlights, and professional achievements.
                </p>
              </div>

              {/* Resume Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{downloadStats?.total}</div>
                  <div className="text-sm text-muted-foreground">Total Downloads</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-accent mb-1">4.9</div>
                  <div className="text-sm text-muted-foreground">Avg. Rating</div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {resumeFormats?.map((format) => (
            <div
              key={format?.id}
              className={`relative bg-card rounded-xl border p-6 transition-all duration-normal hover:shadow-md ${
                format?.recommended ? 'border-primary/30 bg-primary/5' : 'border-border'
              }`}
            >
              {/* Recommended Badge */}
              {format?.recommended && (
                <div className="absolute -top-2 left-6 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Recommended
                </div>
              )}

              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  format?.recommended ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={format?.icon} size={20} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{format?.name}</h3>
                    <span className="text-xs text-muted-foreground">{format?.size}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {format?.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-1 mb-4">
                    {format?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Icon name="Check" size={12} className="text-success" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Download Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Download" size={12} />
                      <span>{format?.downloads} downloads</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    variant={format?.recommended ? 'default' : 'outline'}
                    fullWidth
                    onClick={() => handleDownload(format?.id)}
                    iconName="Download"
                    iconPosition="left"
                    className="transition-all duration-normal"
                  >
                    Download {format?.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Actions */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-border">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Need a Custom Version?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I can provide a tailored resume highlighting specific skills or experiences relevant to your opportunity.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default" iconName="Mail" iconPosition="left">
                Request Custom Resume
              </Button>
              <Button variant="outline" iconName="MessageCircle" iconPosition="left">
                Discuss Requirements
              </Button>
            </div>
          </div>
        </div>

        {/* Resume Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Award" size={20} className="text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Achievements</h4>
            <p className="text-sm text-muted-foreground">
              Key accomplishments and recognition from 6+ years of professional experience
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Code" size={20} className="text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Technical Skills</h4>
            <p className="text-sm text-muted-foreground">
              Comprehensive overview of programming languages, frameworks, and tools
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Briefcase" size={20} className="text-success" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Experience</h4>
            <p className="text-sm text-muted-foreground">
              Detailed work history with role descriptions and project highlights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadResume;