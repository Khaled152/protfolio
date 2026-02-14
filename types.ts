
export enum NavSection {
  STATUS = 'STATUS',
  SKILLS = 'SKILLS',
  EXPERIENCE = 'EXPERIENCE',
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN',
}

export interface Skill {
  name: string;
  level: number;
  color: string;
  details: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  category: string;
  description: string;
  technologies: string[];
  status: 'ONLINE' | 'STANDBY' | 'DEVELOPMENT';
  links?: {
    live?: string;
    github?: string;
  };
  metrics: {
    perf: number;
    security: number;
    reliability: number;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SYSTEM';
}
