
import { Project, Experience } from './types';

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  accent: '#f43f5e',
  warning: '#f59e0b',
  error: '#ef4444',
  bg: '#f8fafc',
};

export const OPERATOR_NAME = "JONATHAN DOE";
export const OPERATOR_BIO = "Passionate Fullstack Engineer with over a decade of experience in building scalable web applications. Expert in modern frontend frameworks, cloud infrastructure, and user-centric design. Committed to delivering high-quality code and exceptional user experiences.";
export const DEFAULT_TACTICAL_TAGS = ['Open to Work', 'Full Time', 'Consulting', 'System Architect', 'Frontend Lead', 'UI Engineer', 'Strategic Planner'];

export const PROJECTS: Project[] = [
  {
    id: 'P-01',
    title: 'Aether Dashboard',
    subtitle: 'Next.js // Tailwind // Kubernetes',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=800',
    category: 'SaaS',
    description: 'A comprehensive monitoring solution for cloud-native infrastructure, streamlining incident response and resource management.',
    technologies: ['React', 'Node.js', 'Kubernetes'],
    status: 'ONLINE',
    metrics: { perf: 99, security: 95, reliability: 98 }
  },
  {
    id: 'P-02',
    title: 'Crypto Vault',
    subtitle: 'TypeScript // Solidity // Web3',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    category: 'Fintech',
    description: 'A secure and intuitive platform for managing digital assets with advanced multi-sig security features.',
    technologies: ['TypeScript', 'Solidity', 'Next.js'],
    status: 'ONLINE',
    metrics: { perf: 92, security: 100, reliability: 99 }
  },
  {
    id: 'P-03',
    title: 'Nexus UI Library',
    subtitle: 'Framer // Radix // Design Systems',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'Open Source',
    description: 'A high-performance component library built for speed, accessibility, and ease of use in enterprise applications.',
    technologies: ['Tailwind', 'Storybook', 'Framer'],
    status: 'DEVELOPMENT',
    metrics: { perf: 88, security: 85, reliability: 90 }
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'EXP-01',
    role: 'Lead Frontend Architect',
    company: 'TechFlow Systems',
    period: '2021 - Present',
    description: 'Orchestrating the transition to a modern micro-frontend architecture and setting engineering standards.',
    achievements: [
      'Built an automated delivery pipeline that increased deployment frequency by 60%.',
      'Mentored cross-functional teams on best practices for React and TypeScript.',
      'Established a unified accessibility framework for all customer-facing products.'
    ]
  },
  {
    id: 'EXP-02',
    role: 'Senior Software Engineer',
    company: 'Neural Networks Inc.',
    period: '2018 - 2021',
    description: 'Developed advanced data visualization tools for real-time artificial intelligence metrics.',
    achievements: [
      'Created a high-performance rendering engine for large-scale datasets.',
      'Optimized application performance, resulting in a 35% reduction in load times.'
    ]
  },
  {
    id: 'EXP-03',
    role: 'Fullstack Developer',
    company: 'Startup Lab',
    period: '2015 - 2018',
    description: 'Core contributor to the initial build and scaling of a global logistics platform.',
    achievements: [
      'Designed scalable GraphQL APIs supporting tens of thousands of users.',
      'Successfully managed high-availability production environments.'
    ]
  }
];

export const SKILLS = [
  { 
    name: 'React / Next.js', 
    level: 98, 
    color: '#3b82f6',
    details: 'Expert in the React ecosystem, including Server Components and state management.' 
  },
  { 
    name: 'Node / TypeScript', 
    level: 94, 
    color: '#6366f1',
    details: 'Fullstack development with a focus on type safety and scalable backend architecture.'
  },
  { 
    name: 'Cloud / DevOps', 
    level: 85, 
    color: '#10b981',
    details: 'Proficient in AWS, Kubernetes, and infrastructure as code.'
  },
  { 
    name: 'UX / Product Design', 
    level: 90, 
    color: '#f59e0b',
    details: 'Designing intuitive user interfaces with a focus on usability and accessibility.'
  },
];
