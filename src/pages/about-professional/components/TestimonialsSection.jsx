import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "InnovateTech Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Alex is an exceptional frontend developer who consistently delivers high-quality work. His attention to detail and ability to translate complex requirements into intuitive user interfaces is remarkable. During our collaboration on the enterprise dashboard project, he not only met all deadlines but also proactively suggested improvements that enhanced the overall user experience.`,
      rating: 5,
      project: "Enterprise Dashboard Redesign",
      relationship: "Direct collaboration for 2 years"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Senior Software Engineer",
      company: "StartupHub Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Working with Alex has been a pleasure. His technical expertise in React and TypeScript is outstanding, but what sets him apart is his collaborative approach and willingness to mentor junior developers. He has a unique ability to break down complex problems into manageable solutions and communicate them effectively to both technical and non-technical stakeholders.`,
      rating: 5,
      project: "Multi-client Platform Development",
      relationship: "Team member for 1.5 years"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "UX/UI Designer",
      company: "Creative Studios",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Alex is one of the best frontend developers I've worked with. He has an excellent eye for design and can implement pixel-perfect interfaces while maintaining clean, maintainable code. His understanding of user experience principles and ability to provide valuable feedback during the design process makes him an invaluable team member.`,
      rating: 5,
      project: "E-commerce Platform UI/UX",
      relationship: "Collaborated on 8+ projects"
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `Alex joined our team as a junior developer and quickly proved himself to be a valuable asset. His learning curve was impressive, and he consistently took on challenging tasks with enthusiasm. His contributions to our component library and his initiative in improving our development processes have had a lasting positive impact on our team's productivity.`,
      rating: 5,
      project: "Component Library Development",
      relationship: "Managed for 2 years"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Freelance Client",
      company: "Thompson Marketing Agency",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      content: `Alex delivered exactly what we needed for our agency's website redesign. He was professional, communicative, and delivered on time and within budget. The website he built not only looks fantastic but also performs excellently across all devices. I would definitely work with him again and recommend him to other businesses looking for top-quality frontend development.`,
      rating: 5,
      project: "Agency Website Redesign",
      relationship: "Client relationship - 6 months"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-accent fill-current' : 'text-muted'}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimonials from colleagues, clients, and collaborators who have experienced my work firsthand
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative bg-card rounded-2xl border border-border p-8 lg:p-12 shadow-sm mb-8">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>

          {/* Testimonial Content */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Quote Icon */}
            <div className="mb-6">
              <Icon name="Quote" size={48} className="text-primary/20 mx-auto" />
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 italic">
              "{testimonials?.[currentTestimonial]?.content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={testimonials?.[currentTestimonial]?.avatar}
                    alt={testimonials?.[currentTestimonial]?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="text-center sm:text-left">
                <h4 className="font-semibold text-foreground text-lg">
                  {testimonials?.[currentTestimonial]?.name}
                </h4>
                <p className="text-muted-foreground">
                  {testimonials?.[currentTestimonial]?.role} at {testimonials?.[currentTestimonial]?.company}
                </p>
                <div className="flex items-center justify-center sm:justify-start space-x-1 mt-2">
                  {renderStars(testimonials?.[currentTestimonial]?.rating)}
                </div>
              </div>
            </div>

            {/* Project & Relationship Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Icon name="Briefcase" size={14} />
                  <span>Project: {testimonials?.[currentTestimonial]?.project}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Icon name="Users" size={14} />
                  <span>{testimonials?.[currentTestimonial]?.relationship}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-normal ${
                index === currentTestimonial
                  ? 'bg-primary scale-110' :'bg-muted hover:bg-muted-foreground/30'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonial Grid Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.slice(0, 3)?.map((testimonial, index) => (
            <div
              key={testimonial?.id}
              className={`bg-card rounded-lg border border-border p-6 cursor-pointer transition-all duration-normal hover:shadow-md ${
                index === currentTestimonial ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{testimonial?.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial?.role}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                "{testimonial?.content?.substring(0, 120)}..."
              </p>
              
              <div className="flex items-center space-x-1">
                {renderStars(testimonial?.rating)}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Ready to Work Together?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the list of satisfied clients and colleagues. Let's discuss how I can help bring your project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default" iconName="MessageCircle" iconPosition="left">
                Start a Project
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

export default TestimonialsSection;