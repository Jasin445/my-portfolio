import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const SocialProof = () => {
  const [githubStats, setGithubStats] = useState({
    contributions: 1247,
    repositories: 42,
    followers: 389,
    stars: 2156
  });

  const [animatedStats, setAnimatedStats] = useState({
    contributions: 0,
    repositories: 0,
    followers: 0,
    stars: 0
  });

  useEffect(() => {
    // Animate stats on component mount
    const animateStats = () => {
      Object.keys(githubStats)?.forEach((key, index) => {
        setTimeout(() => {
          const target = githubStats?.[key];
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setAnimatedStats(prev => ({
              ...prev,
              [key]: Math.floor(current)
            }));
          }, duration / steps);
        }, index * 200);
      });
    };

    animateStats();
  }, [githubStats]);

  const socialLinks = [
    {
      platform: 'GitHub',
      username: '@alexjohnson-dev',
      url: 'https://github.com/alexjohnson-dev',
      icon: 'Github',
      followers: '389 followers',
      description: 'Open source contributions and personal projects',
      color: 'text-foreground',
      bgColor: 'bg-foreground/5 hover:bg-foreground/10'
    },
    {
      platform: 'LinkedIn',
      username: 'Alex Johnson',
      url: 'https://linkedin.com/in/alexjohnson-frontend',
      icon: 'Linkedin',
      followers: '2.1K connections',
      description: 'Professional network and career updates',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      platform: 'Twitter',
      username: '@alexcodes',
      url: 'https://twitter.com/alexcodes',
      icon: 'Twitter',
      followers: '1.8K followers',
      description: 'Tech insights and development tips',
      color: 'text-blue-400',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      platform: 'Dev.to',
      username: '@alexjohnson',
      url: 'https://dev.to/alexjohnson',
      icon: 'FileText',
      followers: '892 followers',
      description: 'Technical articles and tutorials',
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    }
  ];

  const speakingEngagements = [
    {
      event: 'React Conference 2024',
      title: 'Building Scalable Component Libraries',
      date: 'March 15, 2024',
      location: 'San Francisco, CA',
      attendees: '500+',
      type: 'Keynote'
    },
    {
      event: 'Frontend Masters Workshop',
      title: 'Advanced React Patterns',
      date: 'January 20, 2024',
      location: 'Online',
      attendees: '200+',
      type: 'Workshop'
    },
    {
      event: 'Tech Meetup SF',
      title: 'Performance Optimization in React',
      date: 'November 8, 2023',
      location: 'San Francisco, CA',
      attendees: '150+',
      type: 'Talk'
    }
  ];

  const achievements = [
    {
      title: 'GitHub Arctic Code Vault Contributor',
      description: 'Code preserved in the Arctic World Archive',
      icon: 'Archive',
      year: '2024'
    },
    {
      title: 'Open Source Contributor',
      description: 'Contributed to 25+ open source projects',
      icon: 'GitBranch',
      year: '2023'
    },
    {
      title: 'Tech Conference Speaker',
      description: 'Spoke at 8+ conferences and meetups',
      icon: 'Mic',
      year: '2023'
    },
    {
      title: 'Community Mentor',
      description: 'Mentored 50+ junior developers',
      icon: 'Users',
      year: '2022'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Social Proof & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My contributions to the developer community, speaking engagements, and professional recognition
          </p>
        </div>

        {/* GitHub Stats */}
        <div className="bg-card rounded-xl border border-border p-8 mb-12 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Icon name="Github" size={24} className="text-foreground" />
              <h3 className="text-xl font-semibold text-foreground">GitHub Activity</h3>
            </div>
            <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
              View Profile
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {animatedStats?.contributions?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Contributions</div>
              <div className="text-xs text-muted-foreground mt-1">This year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {animatedStats?.repositories}
              </div>
              <div className="text-sm text-muted-foreground">Repositories</div>
              <div className="text-xs text-muted-foreground mt-1">Public</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-1">
                {animatedStats?.followers}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
              <div className="text-xs text-muted-foreground mt-1">Growing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">
                {animatedStats?.stars?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Stars Earned</div>
              <div className="text-xs text-muted-foreground mt-1">Total</div>
            </div>
          </div>

          {/* GitHub Contribution Graph Mockup */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="text-sm font-medium text-foreground mb-4">Contribution Activity</h4>
            <div className="grid grid-cols-53 gap-1">
              {Array.from({ length: 371 }, (_, i) => {
                const intensity = Math.random();
                let bgColor = 'bg-muted';
                if (intensity > 0.8) bgColor = 'bg-success';
                else if (intensity > 0.6) bgColor = 'bg-success/70';
                else if (intensity > 0.4) bgColor = 'bg-success/40';
                else if (intensity > 0.2) bgColor = 'bg-success/20';
                
                return (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${bgColor}`}
                    title={`${Math.floor(intensity * 10)} contributions`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-muted rounded-sm"></div>
                <div className="w-3 h-3 bg-success/20 rounded-sm"></div>
                <div className="w-3 h-3 bg-success/40 rounded-sm"></div>
                <div className="w-3 h-3 bg-success/70 rounded-sm"></div>
                <div className="w-3 h-3 bg-success rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialLinks?.map((social) => (
            <a
              key={social?.platform}
              href={social?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-6 rounded-xl border border-border transition-all duration-normal hover:shadow-md ${social?.bgColor}`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon name={social?.icon} size={20} className={social?.color} />
                <h3 className="font-semibold text-foreground">{social?.platform}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{social?.username}</p>
              <p className="text-xs text-muted-foreground mb-3">{social?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{social?.followers}</span>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
              </div>
            </a>
          ))}
        </div>

        {/* Speaking Engagements */}
        <div className="bg-card rounded-xl border border-border p-8 mb-12 shadow-sm">
          <div className="flex items-center space-x-3 mb-8">
            <Icon name="Mic" size={24} className="text-accent" />
            <h3 className="text-xl font-semibold text-foreground">Speaking Engagements</h3>
          </div>

          <div className="space-y-6">
            {speakingEngagements?.map((engagement, index) => (
              <div key={index} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                      {engagement?.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{engagement?.date}</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{engagement?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{engagement?.event}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{engagement?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{engagement?.attendees} attendees</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 lg:mt-0">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements?.map((achievement, index) => (
            <div key={index} className="bg-card rounded-xl border border-border p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={achievement?.icon} size={20} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{achievement?.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{achievement?.description}</p>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {achievement?.year}
              </span>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Let's Connect
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Follow my journey, connect with me on social media, or reach out for collaboration opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default" iconName="Github" iconPosition="left">
                Follow on GitHub
              </Button>
              <Button variant="outline" iconName="Linkedin" iconPosition="left">
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;