import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budgetRange: '',
    message: '',
    urgency: '',
    timeline: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypeOptions = [
    { value: 'full-time', label: 'Full-time Position' },
    { value: 'freelance', label: 'Freelance Project' },
    { value: 'consulting', label: 'Consulting Services' },
    { value: 'collaboration', label: 'Collaboration Opportunity' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRangeOptions = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: 'over-100k', label: 'Over $100,000' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const urgencyOptions = [
    { value: 'asap', label: 'ASAP (Within 1 week)' },
    { value: 'month', label: 'Within a month' },
    { value: 'quarter', label: 'Within 3 months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const timelineOptions = [
    { value: 'short', label: '1-3 months' },
    { value: 'medium', label: '3-6 months' },
    { value: 'long', label: '6+ months' },
    { value: 'ongoing', label: 'Ongoing partnership' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData?.message?.trim()?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'Please agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit?.(formData);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budgetRange: '',
          message: '',
          urgency: '',
          timeline: '',
          agreeToTerms: false,
          subscribeNewsletter: false
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground mb-4">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Expected response time: 24 hours</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Let's Work Together
        </h2>
        <p className="text-muted-foreground">
          Ready to bring your project to life? Fill out the form below and I'll get back to you within 24 hours.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="john@company.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
        </div>

        <Input
          label="Company/Organization"
          type="text"
          placeholder="Your Company Name (Optional)"
          value={formData?.company}
          onChange={(e) => handleInputChange('company', e?.target?.value)}
          description="Help me understand your business context"
        />

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Project Type"
            placeholder="Select project type"
            options={projectTypeOptions}
            value={formData?.projectType}
            onChange={(value) => handleInputChange('projectType', value)}
            error={errors?.projectType}
            required
          />

          <Select
            label="Budget Range"
            placeholder="Select budget range"
            options={budgetRangeOptions}
            value={formData?.budgetRange}
            onChange={(value) => handleInputChange('budgetRange', value)}
            description="This helps me provide accurate proposals"
          />
        </div>

        {/* Timeline Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Urgency"
            placeholder="When do you need to start?"
            options={urgencyOptions}
            value={formData?.urgency}
            onChange={(value) => handleInputChange('urgency', value)}
          />

          <Select
            label="Project Duration"
            placeholder="Expected project length"
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleInputChange('timeline', value)}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Details <span className="text-error">*</span>
          </label>
          <textarea
            placeholder="Tell me about your project, goals, and any specific requirements..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            rows={6}
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none ${
              errors?.message ? 'border-error' : 'border-border'
            }`}
            required
          />
          {errors?.message && (
            <p className="mt-1 text-sm text-error">{errors?.message}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            Minimum 10 characters. Be specific about your requirements.
          </p>
        </div>

        {/* Agreements */}
        <div className="space-y-3">
          <Checkbox
            label="I agree to the terms and conditions"
            description="By submitting this form, you agree to our privacy policy and terms of service"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label="Subscribe to newsletter"
            description="Get updates about new projects, articles, and industry insights"
            checked={formData?.subscribeNewsletter}
            onChange={(e) => handleInputChange('subscribeNewsletter', e?.target?.checked)}
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          fullWidth
          className="mt-8"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>

        {/* Response Time Info */}
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pt-4">
          <Icon name="Clock" size={16} />
          <span>I typically respond within 24 hours</span>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;