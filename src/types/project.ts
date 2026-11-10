export interface ProjectChallenge {
  problem: string;
  solution: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status: string;
  featured: boolean;
  images?: string[];
  fullDescription?: string;
  completedDate?: string;
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  githubBackendUrl?: string;
  documentationUrl?: string;
  architecture?: string;
  keyFeatures?: string[];
  codeSnippet?: string;
  challenges?: ProjectChallenge[];
  [key: string]: unknown;
}
