export interface PortfolioConfig {
  name: string;
  titleRole: string;
  welcomeKicker: string;
  college: string;
  bioSummary: string;
  email: string;
  phone: string;
  instagram: string;
  github: string;
  linkedin: string;
  twitter?: string;
  customVideoUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: number;
  years: number;
  highlight: string;
  glowColor: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  status: 'completed' | 'in-progress' | 'future';
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  metrics: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface VideoReelItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: string;
  description: string;
  tags: string[];
  instagramUrl?: string;
}
