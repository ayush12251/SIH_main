// Mock data for Opportunities page
// Replace this file's content only when backend APIs are available

export interface OpportunityStats {
  saved: number;
  applied: number;
  interviewing: number;
  offers: number;
}

export interface SkillMatch {
  name: string;
  matched: boolean;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // e.g., 'Hybrid', 'Remote', 'On-site'
  term: string;
  duration?: string;
  pay: string;
  posted?: string;
  matchScore: number;
  skills: SkillMatch[];
  extraSkillsCount?: number;
  isTrending?: boolean;
  contextBadge?: string; // e.g., "SIMILAR TO ROLES YOU'VE VIEWED"
}

export const mockOpportunityStats: OpportunityStats = {
  saved: 12,
  applied: 8,
  interviewing: 3,
  offers: 1,
};

export const mockOpportunities: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Product Management Intern',
    company: 'TechFlow',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    term: 'Summer 2024',
    duration: '12 weeks',
    pay: '$35-45/hr',
    posted: '2d ago',
    matchScore: 92,
    isTrending: true,
    contextBadge: "SIMILAR TO ROLES YOU'VE VIEWED",
    skills: [
      { name: 'Python', matched: true },
      { name: 'SQL', matched: true },
      { name: 'Agile', matched: true },
    ],
    extraSkillsCount: 2,
  },
  {
    id: 'job-2',
    title: 'Data Science Intern',
    company: 'Quantify Analytics',
    location: 'New York, NY',
    type: 'Remote',
    term: 'Summer 2024',
    pay: '$40-50/hr',
    matchScore: 84,
    skills: [
      { name: 'Python', matched: true },
      { name: 'R', matched: true },
      { name: 'Statistics', matched: true },
    ],
  },
  {
    id: 'job-3',
    title: 'UX/UI Design Intern',
    company: 'Studio Canvas',
    location: 'Los Angeles, CA',
    type: 'On-site',
    term: 'Fall 2024',
    pay: '$30-35/hr',
    matchScore: 78,
    skills: [
      { name: 'Figma', matched: true },
      { name: 'Prototyping', matched: true },
    ],
  },
];
