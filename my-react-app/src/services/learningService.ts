export interface ProgressCourse {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed';
  progress: number;
  label?: string;
}

export interface RecommendedProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  isNew: boolean;
  coverGradient: string;
}

export interface Discussion {
  id: string;
  title: string;
  description: string;
  author: string;
  replies: number;
  timeAgo: string;
  avatarUrl?: string;
  initials?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: string;
  badge: string;
  avatarUrl?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  iconType: 'file' | 'tool' | 'trend';
}

export const getYourProgress = (): ProgressCourse[] => [
  {
    id: '1',
    title: 'Technical Sourcing Mastery',
    status: 'In Progress',
    progress: 65,
    label: '65% Completed'
  },
  {
    id: '2',
    title: 'Inclusive Hiring Practices',
    status: 'Completed',
    progress: 100,
    label: 'Certified'
  }
];

export const getRecommendedPrograms = (): RecommendedProgram[] => [
  {
    id: '1',
    title: 'AI in Modern Recruitment',
    description: 'Learn to leverage generative AI for sourcing and...',
    duration: '4 hrs',
    isNew: true,
    coverGradient: 'bg-gradient-to-r from-blue-900 to-indigo-800'
  },
  {
    id: '2',
    title: 'Executive Compensation Strategy',
    description: 'Master the art of structuring complex executive offers.',
    duration: '8 hrs',
    isNew: false,
    coverGradient: 'bg-gradient-to-r from-slate-800 to-gray-700'
  },
  {
    id: '3',
    title: 'Global Talent Mapping',
    description: 'Strategies for identifying talent pools in emerging...',
    duration: '6 hrs',
    isNew: false,
    coverGradient: 'bg-gradient-to-r from-gray-200 to-gray-300'
  }
];

export const getActiveDiscussions = (): Discussion[] => [
  {
    id: '1',
    title: 'Strategies for countering tech offer counter-offers?',
    description: 'Seeing a massive spike in aggressive counter-offers this quarter. What are your go-to tactics?',
    author: 'J. Doe',
    replies: 24,
    timeAgo: '2 hrs ago',
    avatarUrl: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '2',
    title: 'Q3 Diversity Hiring Benchmarks Report Discussion',
    description: 'The new report just dropped. Let\'s discuss the key takeaways and how to apply them.',
    author: 'S. Lee',
    replies: 8,
    timeAgo: '5 hrs ago',
    initials: 'SL'
  }
];

export const getIndustryMentors = (): Mentor[] => [
  {
    id: '1',
    name: 'Sarah Jenkins',
    title: 'VP Talent',
    company: 'TechCorp',
    experience: '15+ Yrs Exp',
    badge: 'EXEC SEARCH',
    avatarUrl: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: '2',
    name: 'David Chen',
    title: 'Lead Sourcer',
    company: 'CloudNet',
    experience: '8 Yrs Exp',
    badge: 'TECH SOURCER',
    avatarUrl: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    title: 'Director DEI',
    company: 'GlobalFin',
    experience: '12 Yrs Exp',
    badge: 'DEI LEAD',
    avatarUrl: 'https://i.pravatar.cc/150?img=5'
  }
];

export const getKnowledgeLibrary = (): LibraryItem[] => [
  { id: '1', title: '2024 Tech Salary Guide', iconType: 'file' },
  { id: '2', title: 'Boolean Search String Toolkit', iconType: 'tool' },
  { id: '3', title: 'Q2 Market Trends Report', iconType: 'trend' }
];
