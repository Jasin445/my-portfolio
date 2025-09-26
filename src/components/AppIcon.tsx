import React from "react";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface AppIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ 
  name, 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const IconComponent = Icons[name as keyof typeof Icons] as LucideIcon;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return <Icons.File size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default AppIcon;