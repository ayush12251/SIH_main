export interface FunnelMetrics {
  stage: string;
  count?: number | string;
  color: string;
  height: string;
}

export interface KPI {
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  description: string;
}

export interface SkillDemand {
  skill: string;
  percentage: number;
  color: string;
}

export interface StageVelocity {
  stage: string;
  days: number;
  color: string;
}

export interface Demographic {
  group: string;
  percentage: number;
  color: string;
}

export interface LearningProgram {
  name: string;
  enrolled: string;
  completionRate: string;
  status: 'Active' | 'Review';
}

export interface SourcingSource {
  source: string;
  applicants: string;
  conversionRate: string;
  costPerHire: string;
}

export const getRecruitmentFunnel = (): FunnelMetrics[] => [
  { stage: 'Postings Views', count: '12,450', color: 'bg-indigo-500', height: 'h-48' },
  { stage: 'Applicants', count: '8,092', color: 'bg-blue-500', height: 'h-32' },
  { stage: 'Shortlisted', count: '3,112', color: 'bg-orange-400', height: 'h-12' },
  { stage: 'Hired', color: 'bg-emerald-500', height: 'h-4' },
];

export const getKPIs = () => ({
  retention: {
    title: 'Intern Retention Rate',
    value: '78.4',
    unit: '%',
    change: '4.2%',
    isPositive: true,
    description: 'Converted to full-time post-graduation.',
  },
  timeToFill: {
    title: 'Avg Time-to-Fill',
    value: '24',
    unit: 'Days',
    change: '2.1d',
    isPositive: true, // It's a decrease in days, so positive
    description: 'Across all technical roles.',
  },
  offerAcceptance: {
    title: 'Offer Acceptance Rate',
    value: '92.1',
    unit: '%',
    change: '1.5%',
    isPositive: true,
    description: 'MoM increase in accepted offers.',
  }
});

export const getTopSkills = (): SkillDemand[] => [
  { skill: 'React / Next.js', percentage: 42, color: 'bg-indigo-600' },
  { skill: 'Python (Data Science)', percentage: 38, color: 'bg-blue-500' },
  { skill: 'AWS / Cloud Architecture', percentage: 29, color: 'bg-indigo-800' },
  { skill: 'UI/UX Prototyping (Figma)', percentage: 15, color: 'bg-gray-300' },
];

export const getStageVelocity = (): StageVelocity[] => [
  { stage: 'Sourcing', days: 4.2, color: 'bg-blue-500' },
  { stage: 'Screening', days: 2.1, color: 'bg-blue-500' },
  { stage: 'Interviewing', days: 12.5, color: 'bg-orange-400' },
  { stage: 'Offer', days: 3.8, color: 'bg-blue-500' },
];

export const getDemographics = (): Demographic[] => [
  { group: 'Female', percentage: 48, color: 'bg-indigo-500' },
  { group: 'Male', percentage: 45, color: 'bg-blue-500' },
  { group: 'Non-binary / Other', percentage: 7, color: 'bg-indigo-800' },
];

export const getLearningPrograms = (): LearningProgram[] => [
  { name: 'Cloud Native Boot-camp', enrolled: '1,234', completionRate: '82%', status: 'Active' },
  { name: 'Intro to Enterprise AI', enrolled: '850', completionRate: '65%', status: 'Review' },
  { name: 'Advanced Data Structures', enrolled: '420', completionRate: '91%', status: 'Active' },
];

export const getSourcingPerformance = (): SourcingSource[] => [
  { source: 'LinkedIn Recruiter', applicants: '4,250', conversionRate: '12.4%', costPerHire: '$1,200' },
  { source: 'Employee Referrals', applicants: '840', conversionRate: '34.2%', costPerHire: '$500' },
  { source: 'University Portal', applicants: '1,120', conversionRate: '8.1%', costPerHire: '$250' },
];
