// Mock data for Progress page
// Replace this file's content only when backend APIs are available

export interface ActiveCourse {
  id: string;
  title: string;
  provider: string;
  icon: string;
  statusText: string;
  moduleText: string;
  progress: number;
  isReadyForFinal?: boolean;
}

export interface PathStep {
  label: string;
  state: 'completed' | 'current' | 'locked';
}

export interface Recommendation {
  id: string;
  title: string;
  provider: string;
  providerIconInitial: string;
  duration: string;
  level: string;
}

export interface Assessment {
  id: string;
  date: { month: string; day: string };
  title: string;
  meta: string;
}

export interface MarketTrend {
  skill: string;
  boost: string;
}

export interface NetworkActivity {
  id: string;
  name: string;
  avatarUrl: string;
  action: string;
  target: string;
}

export const mockActiveCourses: ActiveCourse[] = [
  {
    id: 'c1',
    title: 'AWS Solutions Architect',
    provider: 'Amazon Web Services',
    icon: 'cloud',
    statusText: 'In Progress',
    moduleText: 'Module 4 of 10',
    progress: 40,
    isReadyForFinal: false,
  },
  {
    id: 'c2',
    title: 'Advanced SQL for Data Science',
    provider: 'IBM',
    icon: 'database',
    statusText: 'In Progress',
    moduleText: 'Module 8 of 8 - Final Project',
    progress: 90,
    isReadyForFinal: true,
  },
];

export const mockPathSteps: PathStep[] = [
  { label: 'HTML/CSS', state: 'completed' },
  { label: 'JavaScript', state: 'completed' },
  { label: 'React', state: 'completed' },
  { label: 'Node.js', state: 'current' },
  { label: 'Databases', state: 'locked' },
];

export const mockRecommendedCerts: Recommendation[] = [
  {
    id: 'r1',
    title: 'Data Analytics Professional',
    provider: 'Google',
    providerIconInitial: 'G',
    duration: '6 months (10 hrs/week)',
    level: 'Beginner Level',
  },
  {
    id: 'r2',
    title: 'Product Management',
    provider: 'Meta',
    providerIconInitial: 'M',
    duration: '4 months (8 hrs/week)',
    level: 'Intermediate Level',
  },
];

export const mockLearningHours = {
  total: '14.5 hrs',
  trend: '+12%',
  // mock heights for the 7 bars
  bars: [40, 60, 30, 80, 60, 10, 10], 
  days: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
};

export const mockUpcomingAssessments: Assessment[] = [
  {
    id: 'a1',
    date: { month: 'OCT', day: '15' },
    title: 'AWS Practice Exam',
    meta: '2 hours • Online',
  },
  {
    id: 'a2',
    date: { month: 'OCT', day: '22' },
    title: 'SQL Final Project Due',
    meta: 'IBM Certification',
  },
];

export const mockMarketTrends: MarketTrend[] = [
  { skill: 'Python Data Analysis', boost: '+24% matches' },
  { skill: 'Agile / Scrum', boost: '+18% matches' },
  { skill: 'Figma Prototyping', boost: '+15% matches' },
];

export const mockNetworkActivity: NetworkActivity[] = [
  {
    id: 'n1',
    name: 'Sarah J.',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
    action: 'earned the',
    target: 'React Native certification.',
  },
  {
    id: 'n2',
    name: 'David M.',
    avatarUrl: 'https://i.pravatar.cc/150?u=david',
    action: 'started',
    target: 'UX Research Basics.',
  },
];
