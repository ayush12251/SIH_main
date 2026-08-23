// Mock data for Library page
// Replace this file's content only when backend APIs are available

export interface Collection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'orange' | 'blue' | 'purple';
}

export interface Category {
  id: string;
  title: string;
  icon: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'purple' | 'pink';
  tags: string[];
}

export interface InterviewPrep {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface RoadmapPhase {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface CareerGuide {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'purple';
  isNew?: boolean;
}

export const mockCollections: Collection[] = [
  {
    id: 'c1',
    title: 'Product Management Starter Kit',
    description: 'Everything you need to land your first PM role.',
    icon: 'rocket',
    color: 'orange',
  },
  {
    id: 'c2',
    title: 'Data Science Fast Track',
    description: 'Roadmaps, interview prep, and project templates.',
    icon: 'doc',
    color: 'blue',
  },
  {
    id: 'c3',
    title: 'UX Design Fundamentals',
    description: 'Portfolios, case studies, and whiteboard challenges.',
    icon: 'pen',
    color: 'purple',
  },
];

export const mockCategories: Category[] = [
  { id: 'cat1', title: 'Resume & CV', icon: 'fileText' },
  { id: 'cat2', title: 'Interview Prep', icon: 'messageSquare' },
  { id: 'cat3', title: 'Career Guides', icon: 'compass' },
  { id: 'cat4', title: 'Networking', icon: 'network' },
  { id: 'cat5', title: 'Salary Neg.', icon: 'banknote' },
  { id: 'cat6', title: 'Work Culture', icon: 'users' },
];

export const mockTemplates: Template[] = [
  {
    id: 't1',
    title: 'Modern Tech',
    description: 'Optimized for ATS systems, ideal for software...',
    icon: 'fileText',
    color: 'blue',
    tags: ['.DOCX', 'ATS Ready'],
  },
  {
    id: 't2',
    title: 'Academic CV',
    description: 'Comprehensive format for research, publications, and...',
    icon: 'graduationCap',
    color: 'purple',
    tags: ['.PDF', 'Comprehensive'],
  },
  {
    id: 't3',
    title: 'Creative Portfolio',
    description: 'Visually distinct layout balancing aesthetic appeal...',
    icon: 'brush',
    color: 'pink',
    tags: ['Figma', 'Design'],
  },
];

export const mockInterviewPrep: InterviewPrep[] = [
  {
    id: 'i1',
    title: 'STAR Method Guide',
    description: 'Mastering behavioral questions with structured responses.',
    tag: 'Read Time: 15m',
  },
  {
    id: 'i2',
    title: 'Technical Mockups',
    description: 'System design frameworks and algorithm problem sets.',
    tag: 'Interactive',
  },
  {
    id: 'i3',
    title: 'Executive Presence',
    description: 'Communicating strategy and impact to senior leadership.',
    tag: 'Video Module',
  },
];

export const mockRoadmap: RoadmapPhase[] = [
  {
    id: 'r1',
    phase: 'Phase 1:',
    title: 'Discovery',
    description: 'Self-assessment & goal setting',
    status: 'completed',
  },
  {
    id: 'r2',
    phase: 'Phase 2:',
    title: 'Preparation',
    description: 'Resume & portfolio building',
    status: 'current',
  },
  {
    id: 'r3',
    phase: 'Phase 3:',
    title: 'Application',
    description: 'Sourcing & networking',
    status: 'upcoming',
  },
  {
    id: 'r4',
    phase: 'Phase 4:',
    title: 'Interviewing',
    description: 'Mock interviews & negotiation',
    status: 'upcoming',
  },
];

export const mockCareerGuides: CareerGuide[] = [
  {
    id: 'cg1',
    title: 'Data Science Transition',
    description: 'A roadmap from analyst to machine learning engineer.',
    icon: 'code',
    color: 'blue',
    isNew: true,
  },
  {
    id: 'cg2',
    title: 'Product Management 101',
    description: 'Core competencies and frameworks for new PMs.',
    icon: 'layoutTemplate',
    color: 'green',
  },
  {
    id: 'cg3',
    title: 'UX Research Operations',
    description: 'Scaling research practices within enterprise teams.',
    icon: 'lightbulb',
    color: 'purple',
  },
];
