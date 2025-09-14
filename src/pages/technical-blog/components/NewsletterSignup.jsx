import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterSignup = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email?.trim()) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <div className={`bg-success/5 border border-success/20 rounded-lg p-6 text-center ${className}`}>
        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={24} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Successfully Subscribed!
        </h3>
        <p className="text-muted-foreground mb-4">
          Thank you for subscribing to our newsletter. You'll receive the latest articles and updates directly in your inbox.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubscribed(false)}
        >
          Subscribe Another Email
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-primary/5 border border-primary/20 rounded-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-muted-foreground">
          Subscribe to our newsletter and get the latest articles, tutorials, and tech insights delivered to your inbox.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          required
          disabled={loading}
          className="w-full"
        />
        
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          disabled={!email?.trim() || loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>
      {/* Newsletter Benefits */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Check" size={14} className="text-success" />
          <span>Weekly digest of new articles</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Check" size={14} className="text-success" />
          <span>Exclusive coding tips and tricks</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Check" size={14} className="text-success" />
          <span>Early access to new tutorials</span>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;