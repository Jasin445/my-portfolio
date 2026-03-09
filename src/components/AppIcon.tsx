import React from "react";
import type { LucideIcon } from "lucide-react"; // ← type-only, zero bundle cost

import {
  Star,
  Code,
  Code2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Download,
  Briefcase,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Check,
  Quote,
  X,
  Menu,
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Layers,
  Zap,
  Globe,
  Terminal,
  Database,
  ShieldCheck,
  Server,
  Braces,
  User,
  Smile,
  MessageCircle,
  Twitter,
  FileText,
  Cpu,
  GitBranch,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Send,
  Eye,
  Heart,
  TrendingUp,
  FileType,
  Home,
  BarChart,
  Settings,
  Filter,
  Palette,
  Grid,
  List,
  AlertCircle, // ← fallback icon
} from "lucide-react";

interface AppIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const ICONS: Record<string, LucideIcon> = {
  Star,
  Code,
  Code2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Download,
  Briefcase,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Check,
  Quote,
  X,
  Menu,
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Layers,
  Zap,
  Globe,
  Terminal,
  Database,
  ShieldCheck,
  Server,
  Palette,
  Braces,
  User,
  Smile,
  MessageCircle,
  Twitter,
  FileText,
  Cpu,
  GitBranch,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Send,
  Eye,
  Heart,
  TrendingUp,
  FileType,
  Home,
  BarChart,
  Settings,
  Filter,
  Grid,
  List,
  AlertCircle,
};

const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`AppIcon: "${name}" not found. Add it to the ICONS map.`);
    }
    return <AlertCircle size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default AppIcon;
