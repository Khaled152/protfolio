
import { Project, Experience } from './types';

export const COLORS = {
  primary: '#22d3ee',
  secondary: '#818cf8',
  accent: '#f472b6',
  warning: '#fbbf24',
  error: '#f87171',
  bg: '#020617',
};

export const OPERATOR_NAME = "JONATHAN DOE";
export const OPERATOR_BIO = "Strategic Fullstack Engineer with a decade of experience crafting high-stakes web applications. Specialist in distributed systems, real-time data visualization, and reactive UI architecture. Committed to technical excellence and mission success.";
export const DEFAULT_TACTICAL_TAGS = ['REMOTE_READY', 'FULL_TIME', 'CONSULTING', 'ARCHITECT', 'FRONTEND_LEAD', 'UI_ENGINEER', 'MISSION_CRITICAL'];

export const PROJECTS: Project[] = [
  {
    id: 'P-01',
    title: 'AETHER-DASH',
    subtitle: 'NEXT.JS // TAILWIND // K8S',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=800',
    category: 'SaaS',
    description: 'Enterprise-grade monitoring dashboard for cloud infrastructure, reducing incident response time by 40%.',
    technologies: ['React', 'Node.js', 'Kubernetes'],
    status: 'ONLINE',
    metrics: { perf: 99, security: 95, reliability: 98 }
  },
  {
    id: 'P-02',
    title: 'CRYPTO-VAULT',
    subtitle: 'TYPESCRIPT // SOLIDITY // WEB3',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    category: 'FINTECH',
    description: 'Highly secure digital asset management platform with multi-signature authorization protocols.',
    technologies: ['TypeScript', 'Solidity', 'Next.js'],
    status: 'ONLINE',
    metrics: { perf: 92, security: 100, reliability: 99 }
  },
  {
    id: 'P-03',
    title: 'NEXUS-UI',
    subtitle: 'FRAMER // RADIX // HUD-DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'OPEN_SOURCE',
    description: 'A component library designed for low-latency financial terminals and military-grade HUD interfaces.',
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
    period: '2021 - PRESENT',
    description: 'Leading the modernization of core platform architecture to micro-frontends.',
    achievements: [
      'Engineered a custom build pipeline reducing CI/CD time by 60%.',
      'Mentored a team of 12 developers in advanced React patterns.',
      'Implemented standardized accessibility protocols across all products.'
    ]
  },
  {
    id: 'EXP-02',
    role: 'Senior Software Engineer',
    company: 'Neural Networks Inc.',
    period: '2018 - 2021',
    description: 'Developed real-time data streaming visualizations for AI model outputs.',
    achievements: [
      'Optimized WebGL rendering engine for 4K data density.',
      'Reduced initial bundle size by 35% through aggressive code splitting.'
    ]
  },
  {
    id: 'EXP-03',
    role: 'Fullstack Developer',
    company: 'Startup Lab',
    period: '2015 - 2018',
    description: 'Built and scaled the MVP for a top-tier logistics tracking platform.',
    achievements: [
      'Designed a resilient GraphQL API supporting 50k+ concurrent users.',
      'Awarded "Developer of the Year" in 2017 for system stability.'
    ]
  }
];

export const SKILLS = [
  { 
    name: 'REACT / NEXT.JS', 
    level: 98, 
    color: COLORS.primary,
    details: 'Expert in React 19 features, Server Components, and Concurrent rendering. Architected high-traffic dashboards for AETHER-DASH.' 
  },
  { 
    name: 'NODE / TYPESCRIPT', 
    level: 94, 
    color: COLORS.secondary,
    details: 'Deep expertise in type-safe distributed systems and GraphQL API design. Managed neural network data pipelines at Neural Networks Inc.'
  },
  { 
    name: 'CLOUD / DEVOPS', 
    level: 85, 
    color: COLORS.accent,
    details: 'Proficient in Kubernetes, AWS deployments, and Terraform. Specialized in multi-region failover strategies.'
  },
  { 
    name: 'UX / HUD DESIGN', 
    level: 90, 
    color: COLORS.warning,
    details: 'Pioneer of high-density data visualizations. Creator of the NEXUS-UI HUD library used in aerospace simulation tools.'
  },
];
