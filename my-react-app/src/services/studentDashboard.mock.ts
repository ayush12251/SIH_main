// Mock data mirroring future API response structure
// Replace content of this file only when backend APIs are available

export interface StudentProfile {
  name: string;
  title: string;
  avatarUrl: string | null;
  location: string;
  email: string;
  github: string;
  bio: string;
  profileStrength: number;
  completedSkills: number;
  applicationsSent: number;
  matchReadiness: { label: string; score: number };
  atsScore: { score: number; max: number };
}

export interface PendingTask {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export interface JourneyCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  linkLabel: string;
  linkTo: string;
}

export interface Recommendation {
  id: string;
  type: 'job' | 'course';
  icon: string;
  title: string;
  meta: string;
  linkTo?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  meta: string;
  active: boolean;
}

export interface MentorItem {
  id: string;
  name: string;
  role: string;
  linkedinUrl?: string;
}

export const mockStudentProfile: StudentProfile = {
  name: 'Alex Rivera',
  title: 'MSc Data Science Candidate',
  location: 'Seattle, WA',
  email: 'alex.rivera@university.edu',
  github: 'github.com/alexr-dev',
  bio: 'Data science student passionate about predictive modeling and ML.',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexr',
  profileStrength: 85,
  completedSkills: 12,
  applicationsSent: 5,
  matchReadiness: { label: 'High', score: 78 },
  atsScore: { score: 82, max: 100 },
};

export const mockPendingTask: PendingTask = {
  id: '1',
  title: 'Complete Technical Assessment',
  subtitle: 'Due in 2 days • Required for Product Manager role at TechFlow',
  ctaLabel: 'Start Assessment',
};

export const mockJourneyCards: JourneyCard[] = [
  {
    id: 'assessment',
    icon: 'clipboard',
    title: 'Assessment',
    description: 'Evaluate your skills and identify gaps for target roles.',
    linkLabel: 'Go to Assessment',
    linkTo: '/student/skill-assessment',
  },
  {
    id: 'guidance',
    icon: 'compass',
    title: 'Career Guidance',
    description: 'Explore personalized career paths and learning modules.',
    linkLabel: 'Go to Guidance',
    linkTo: '/student/skill-mapping',
  },
  {
    id: 'opportunities',
    icon: 'briefcase',
    title: 'Opportunities',
    description: 'View matched jobs, internships, and networking events.',
    linkLabel: 'Go to Opportunities',
    linkTo: '/student/opportunities',
  },
  {
    id: 'portfolio',
    icon: 'layout',
    title: 'Portfolio',
    description: 'Manage your resume, projects, and interview prep.',
    linkLabel: 'Go to Portfolio',
    linkTo: '/student/portfolio',
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'r1',
    type: 'job',
    icon: 'ml',
    title: 'Machine Learning Engineer',
    meta: '92% Match • High Demand Role',
  },
  {
    id: 'r2',
    type: 'course',
    icon: 'code',
    title: 'Advanced Python for Data',
    meta: 'Skill gap module • 4 hours est.',
  },
];

export const mockActivity: ActivityItem[] = [
  { id: 'a1', title: 'Rescanned Resume', meta: '2 hours ago • ATS Score +4', active: true },
  { id: 'a2', title: 'Completed Tech Assessment', meta: 'Yesterday • Python (Advanced)', active: false },
  { id: 'a3', title: 'Saved Job: Data Analyst', meta: '3 days ago • FinTech Corp', active: false },
];

export const mockMentors: MentorItem[] = [
  { id: 'm1', name: 'Sarah Jenkins', role: 'Sr. Data Scientist at TechFlow • Available for resume review and career chat.' },
];
