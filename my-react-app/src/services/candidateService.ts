export interface CandidateShortlist {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  appliedDate: string;
  avatarUrl?: string;
  initials?: string;
  tags: { text: string; type?: 'default' | 'missing' }[];
  isSelected?: boolean;
  yoe?: string;
}

export interface SkillCompatibility {
  skill: string;
  required: string;
  candidate: string;
  colorClass: string;
}

export interface InterviewRecord {
  round: string;
  interviewer: string;
  date: string;
  score: string;
}

export interface KeyProject {
  title: string;
  description: string;
  url?: string;
}

export interface CandidateDetails {
  id: string;
  name: string;
  role: string;
  location: string;
  yoe: string;
  education: string;
  avatarUrl?: string;
  aiInsight: {
    intro: string;
    points: { title: string; desc: string }[];
  };
  skills: SkillCompatibility[];
  interviewHistory: InterviewRecord[];
  projects: KeyProject[];
  reference: {
    authorTitle: string;
    quote: string;
  };
}

export const getCandidateShortlist = (): CandidateShortlist[] => [
  {
    id: '1',
    name: 'David Chen',
    role: 'Senior Frontend Engineer',
    matchScore: 94,
    appliedDate: 'Applied 2d ago',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    tags: [
      { text: 'React' },
      { text: 'TypeScript' },
      { text: 'System Design' }
    ],
    isSelected: true
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    role: 'Frontend Engineer • 5 YOE',
    matchScore: 88,
    appliedDate: '5d ago',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    tags: [
      { text: 'Vue.js' },
      { text: 'JavaScript' },
      { text: 'Tailwind' }
    ]
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Full Stack Developer',
    matchScore: 76,
    appliedDate: 'Applied 1w ago',
    initials: 'MR',
    tags: [
      { text: 'React' },
      { text: 'Node.js' },
      { text: 'Missing: System Design', type: 'missing' }
    ]
  }
];

export const getCandidateDetails = (): CandidateDetails => {
  // Hardcoded for David Chen based on Figma
  return {
    id: '1',
    name: 'David Chen',
    role: 'Senior Frontend Engineer Applicant',
    location: 'San Francisco, CA (Remote OK)',
    yoe: '8 YOE',
    education: 'B.S. Comp Sci, 2016',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    aiInsight: {
      intro: 'David is a highly competitive candidate for the Senior Frontend Engineer role:',
      points: [
        { title: 'High experience in React scaling:', desc: 'Significantly exceeds required experience level.' },
        { title: 'Strong track record:', desc: 'Proven success in fast-paced fintech environments.' },
        { title: 'Minor gap in Jenkins:', desc: 'Extensive GitHub Actions experience compensates for this.' },
        { title: 'GraphQL:', desc: 'Basic proficiency (40%) noted as a secondary growth area.' }
      ]
    },
    skills: [
      { skill: 'React / Next.js', required: 'Expert', candidate: '100%', colorClass: 'text-green-600' },
      { skill: 'TypeScript', required: 'Advanced', candidate: '90%', colorClass: 'text-green-600' },
      { skill: 'System Arch.', required: 'Advanced', candidate: '75%', colorClass: 'text-blue-600' },
      { skill: 'GraphQL', required: 'Intermediate', candidate: '40%', colorClass: 'text-yellow-500' }
    ],
    interviewHistory: [
      { round: 'Initial Screen', interviewer: 'Sarah Jenkins', date: 'Oct 12, 2023', score: '4.8/5.0' },
      { round: 'Technical Assessment', interviewer: 'Marcus Thorne', date: 'Oct 15, 2023', score: '4.5/5.0' }
    ],
    projects: [
      {
        title: 'Fintech Dashboard v2',
        description: 'Led the migration of a legacy jQuery dashboard to Next.js, improving LCP by 40%.'
      },
      {
        title: 'Open Source: UI-Kit',
        description: 'Maintainer of a headless UI library with 2k+ GitHub stars.'
      }
    ],
    reference: {
      authorTitle: 'Verified: CTO @ FinStream',
      quote: '"David is one of the most disciplined engineers I\'ve worked with. His React patterns are industry-standard."'
    }
  };
};
