import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationInfo = () => {
  const currentTime = new Date()?.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const currentDate = new Date()?.toLocaleDateString('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const workingHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM PST' },
    { day: 'Sunday', hours: 'By appointment only' }
  ];

  const timeZones = [
    { zone: 'PST (My Time)', time: currentTime, current: true },
    { zone: 'EST', time: new Date()?.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: true }) },
    { zone: 'GMT', time: new Date()?.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: true }) },
    { zone: 'CET', time: new Date()?.toLocaleTimeString('en-US', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: true }) }
  ];

  return (
    <div className="space-y-6">
      {/* Current Location & Time */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="font-medium text-foreground">Location & Availability</h3>
        </div>

        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Based in:</span>
            <span className="text-foreground font-medium">San Francisco, CA</span>
          </div>

          {/* Current Time */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Current time:</span>
            <div className="text-right">
              <div className="text-foreground font-medium">{currentTime}</div>
              <div className="text-xs text-muted-foreground">{currentDate}</div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status:</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-medium">Available</span>
            </div>
          </div>
        </div>
      </div>
      {/* Working Hours */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="font-medium text-foreground">Working Hours</h3>
        </div>

        <div className="space-y-3">
          {workingHours?.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{schedule?.day}:</span>
              <span className="text-foreground font-medium">{schedule?.hours}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-md">
          <p className="text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="inline mr-1" />
            For urgent matters outside these hours, please mention "URGENT" in your message subject.
          </p>
        </div>
      </div>
      {/* Time Zones */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Globe" size={20} className="text-primary" />
          <h3 className="font-medium text-foreground">Time Zones</h3>
        </div>

        <div className="space-y-3">
          {timeZones?.map((tz, index) => (
            <div key={index} className={`flex items-center justify-between text-sm p-2 rounded ${
              tz?.current ? 'bg-primary/5 border border-primary/20' : ''
            }`}>
              <span className={`${tz?.current ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {tz?.zone}
              </span>
              <span className={`font-medium ${tz?.current ? 'text-primary' : 'text-foreground'}`}>
                {tz?.time}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Map */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Map" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Location</h3>
          </div>
        </div>
        
        <div className="h-64 relative">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="San Francisco, CA"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=37.7749,-122.4194&z=12&output=embed"
            className="border-0"
          />
          
          {/* Overlay with contact info */}
          <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border border-border">
            <div className="text-sm">
              <div className="font-medium text-foreground">San Francisco Bay Area</div>
              <div className="text-muted-foreground">Available for remote work globally</div>
            </div>
          </div>
        </div>
      </div>
      {/* Travel & Meeting Options */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Meeting Options</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-3">
            <Icon name="Video" size={16} className="text-primary mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Video Calls</div>
              <div className="text-muted-foreground">Zoom, Google Meet, or Teams</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Phone" size={16} className="text-primary mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Phone Calls</div>
              <div className="text-muted-foreground">Available upon request</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
            <div>
              <div className="font-medium text-foreground">In-Person</div>
              <div className="text-muted-foreground">SF Bay Area only</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="MessageSquare" size={16} className="text-primary mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Async Chat</div>
              <div className="text-muted-foreground">Slack, Discord, or email</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;