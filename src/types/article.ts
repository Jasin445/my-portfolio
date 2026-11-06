import type { AppIconName } from "../components/AppIcon";

export interface BlogArticle {
  id: string | number;
  slug: string;
  thumbnail: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: number;
  views: number;
  excerpt: string;
  tags: string[];
  author: string;
  authorRole: string;
}

export interface BlogCategory {
  value: string;
  label: string;
  count: number;
  icon?: AppIconName;
}

export interface BlogStatsData {
  totalArticles: number;
  totalViews: number;
  avgReadTime: number;
  categories: number;
}
