import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ApplicationStatus = 'Applied' | 'Reviewed' | 'Interviewing' | 'Offered' | 'Rejected';

export interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  initials?: string;
  matchScore: number;
  appliedDate: string;
  tags: { text: string; type: 'matched' | 'missing' }[];
  location: string;
  yoe: string;
  education: string;
  aiInsight: {
    intro: string;
    points: { title: string; desc: string }[];
  };
  skills: { skill: string; required: string; candidate: string; colorClass: string }[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidate: CandidateProfile;
  status: ApplicationStatus;
  appliedAt: string;
}

const mockCandidates: CandidateProfile[] = [
  {
    id: 'cand-1',
    name: 'Sarah Chen',
    role: 'Data Science Intern',
    initials: 'SC',
    matchScore: 94,
    appliedDate: '2 hours ago',
    location: 'Berkeley, CA',
    yoe: '0 yrs (Student)',
    education: 'MS Computer Science, UC Berkeley',
    tags: [
      { text: 'Python', type: 'matched' },
      { text: 'Machine Learning', type: 'matched' },
      { text: 'PyTorch', type: 'matched' },
      { text: 'AWS', type: 'missing' }
    ],
    aiInsight: {
      intro: "Sarah's academic background and recent projects strongly align with the core requirements. She demonstrates exceptional depth in deep learning, though lacks direct cloud deployment experience.",
      points: [
        { title: "Strong Academic Foundation", desc: "Top 5% in MS CS program with focus on AI/ML." },
        { title: "Practical Implementation", desc: "Built and deployed an NLP model during previous internship." }
      ]
    },
    skills: [
      { skill: "Python", required: "Advanced", candidate: "Advanced", colorClass: "text-emerald-500" },
      { skill: "Machine Learning", required: "Intermediate", candidate: "Advanced", colorClass: "text-emerald-500" },
      { skill: "AWS / Cloud", required: "Intermediate", candidate: "Beginner", colorClass: "text-yellow-500" }
    ]
  },
  {
    id: 'cand-2',
    name: 'Marcus Johnson',
    role: 'Product Management Intern',
    initials: 'MJ',
    matchScore: 88,
    appliedDate: '1 day ago',
    location: 'Chicago, IL',
    yoe: '1 yr (Internships)',
    education: 'BS Business Admin, UIUC',
    tags: [
      { text: 'Agile', type: 'matched' },
      { text: 'Product Strategy', type: 'matched' },
      { text: 'SQL', type: 'missing' }
    ],
    aiInsight: {
      intro: "Marcus shows strong leadership and product sense. His previous internship at a SaaS startup gave him good exposure to Agile environments.",
      points: [
        { title: "Product Sense", desc: "Led a student team to build a campus delivery app." },
        { title: "Communication", desc: "Excellent verbal and written skills demonstrated in portfolio." }
      ]
    },
    skills: [
      { skill: "Agile", required: "Intermediate", candidate: "Intermediate", colorClass: "text-emerald-500" },
      { skill: "SQL", required: "Basic", candidate: "None", colorClass: "text-red-500" }
    ]
  },
  {
    id: 'cand-3',
    name: 'Emily Davis',
    role: 'UX/UI Design Intern',
    initials: 'ED',
    matchScore: 91,
    appliedDate: '3 days ago',
    location: 'Austin, TX',
    yoe: '2 yrs (Freelance)',
    education: 'BFA Interaction Design, UT Austin',
    tags: [
      { text: 'Figma', type: 'matched' },
      { text: 'Prototyping', type: 'matched' },
      { text: 'User Research', type: 'matched' }
    ],
    aiInsight: {
      intro: "Emily has an outstanding portfolio that showcases end-to-end design thinking. Her prototyping skills perfectly match our current needs.",
      points: [
        { title: "Design Systems", desc: "Created comprehensive design systems for freelance clients." },
        { title: "Prototyping", desc: "Advanced interactions in Figma and Framer." }
      ]
    },
    skills: [
      { skill: "Figma", required: "Advanced", candidate: "Advanced", colorClass: "text-emerald-500" },
      { skill: "User Research", required: "Intermediate", candidate: "Advanced", colorClass: "text-emerald-500" }
    ]
  }
];

const initialApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-2',
    jobTitle: 'Data Science Intern',
    company: 'Quantify Analytics',
    candidate: mockCandidates[0],
    status: 'Interviewing',
    appliedAt: '2 hours ago'
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    jobTitle: 'Product Management Intern',
    company: 'TechFlow',
    candidate: mockCandidates[1],
    status: 'Reviewed',
    appliedAt: '1 day ago'
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    jobTitle: 'UX/UI Design Intern',
    company: 'Studio Canvas',
    candidate: mockCandidates[2],
    status: 'Offered',
    appliedAt: '3 days ago'
  }
];

interface ATSContextType {
  applications: Application[];
  applyToJob: (job: { id: string; title: string; company: string }, studentProfile: any) => void;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus) => void;
  getApplicationsForRecruiter: () => Application[];
  getApplicationsForStudent: () => Application[];
}

const ATSContext = createContext<ATSContextType | undefined>(undefined);

export const ATSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);

  const applyToJob = (job: { id: string; title: string; company: string }, studentProfile: any) => {
    // Check if already applied
    if (applications.some(app => app.jobId === job.id && app.candidate.name === studentProfile.name)) {
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      candidate: {
        id: `cand-${Date.now()}`,
        name: studentProfile.name || 'Current Student',
        role: studentProfile.title || 'Student',
        initials: (studentProfile.name || 'S').charAt(0),
        matchScore: 85, // Mock score
        appliedDate: 'Just now',
        location: studentProfile.location || 'Unknown',
        yoe: '0 yrs',
        education: 'University',
        tags: [{ text: 'New Applicant', type: 'matched' }],
        aiInsight: {
          intro: "This candidate recently applied via Internix. AI analysis is processing.",
          points: []
        },
        skills: []
      },
      status: 'Applied',
      appliedAt: 'Just now'
    };
    
    setApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  const getApplicationsForRecruiter = () => {
    return applications;
  };

  const getApplicationsForStudent = () => {
    return applications;
  };

  return (
    <ATSContext.Provider value={{ applications, applyToJob, updateApplicationStatus, getApplicationsForRecruiter, getApplicationsForStudent }}>
      {children}
    </ATSContext.Provider>
  );
};

export const useATS = () => {
  const context = useContext(ATSContext);
  if (context === undefined) {
    throw new Error('useATS must be used within an ATSProvider');
  }
  return context;
};
