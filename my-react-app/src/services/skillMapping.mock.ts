// Mock data for Skill Mapping page
// Replace this file's content only when backend APIs are available

export interface SkillGap {
  id: string;
  skill: string;
  requiredBy: string;
  description: string;
  icon: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

export interface LearningModule {
  id: string;
  title: string;
  statusText: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress?: number;
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MarketTrend {
  id: string;
  skill: string;
  percentage: number;
  isGap: boolean;
}

export const mockPageHeader = {
  title: 'Personalized Career Guidance',
  targetRole: 'Product Manager Intern',
  currentMatch: 67,
};

export const mockImpactPath = {
  title: 'Mastering 2 key skills will boost your match score.',
  description: 'Data indicates that candidates with SQL and A/B Testing proficiency are heavily preferred for Product Manager Internships.',
  currentScore: 67,
  projectedScore: 85,
};

export const mockMarketTrends: MarketTrend[] = [
  { id: 't1', skill: 'Agile/Scrum', percentage: 92, isGap: false },
  { id: 't2', skill: 'SQL', percentage: 85, isGap: true },
  { id: 't3', skill: 'A/B Testing', percentage: 78, isGap: true },
  { id: 't4', skill: 'Wireframing', percentage: 65, isGap: false },
];

export const mockSkillGaps: SkillGap[] = [
  {
    id: 'g1',
    skill: 'SQL Data Analysis',
    requiredBy: '85%',
    description: 'Essential for pulling usage metrics and answering basic product questions without relying heavily on engineering resources.',
    icon: 'database',
  },
  {
    id: 'g2',
    skill: 'A/B Testing',
    requiredBy: '78%',
    description: 'Crucial for validating product hypotheses and making data-informed decisions during iterative development cycles.',
    icon: 'flask',
  },
];

export const mockIndustries: Industry[] = [
  {
    id: 'i1',
    name: 'FinTech',
    description: 'High demand for PMs with strong data analytics and compliance knowledge.',
    icon: 'building',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
  },
  {
    id: 'i2',
    name: 'HealthTech',
    description: 'Seeking PMs to navigate complex user journeys and A/B testing on patient portals.',
    icon: 'shield',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-50',
  },
  {
    id: 'i3',
    name: 'Enterprise SaaS',
    description: 'Requires strong technical background for platform integrations and feature rollouts.',
    icon: 'server',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
  },
];

export const mockLearningModules: LearningModule[] = [
  {
    id: 'm1',
    title: 'Module 1: Agile & Scrum Basics',
    statusText: 'Completed',
    status: 'completed',
  },
  {
    id: 'm2',
    title: 'Module 2: SQL Data Analysis',
    statusText: 'In Progress • 45% Complete',
    status: 'in-progress',
    progress: 45,
  },
  {
    id: 'm3',
    title: 'Module 3: A/B Testing & Experimentation',
    statusText: 'Locked • Complete Module 2 to unlock',
    status: 'locked',
  },
];

export const mockCertifications: Certification[] = [
  {
    id: 'c1',
    title: 'Certified Scrum Product Owner (CSPO)',
    description: 'Boosts profile visibility by 30%',
    icon: 'award',
  },
  {
    id: 'c2',
    title: 'Google Data Analytics Certificate',
    description: 'Covers SQL and foundational data skills',
    icon: 'award',
  },
];
