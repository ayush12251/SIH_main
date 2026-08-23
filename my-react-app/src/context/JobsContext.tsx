import React, { createContext, useContext, useState, ReactNode } from 'react';
import { JobOpportunity, SkillMatch } from '../services/opportunities.mock';
import { PostingRow } from '../services/postingsService';

export interface Job {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  type: string;
  pay: string;
  term: string;
  duration?: string;
  postedAt: string;
  status: 'Active' | 'Review';
  requiredSkills: string[];
  applicants: number;
  matches: number;
  performance: string;
  performanceTrend: 'up' | 'down' | 'flat';
}

const initialJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Product Management Intern',
    company: 'TechFlow',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    pay: '$35-45/hr',
    term: 'Summer 2024',
    duration: '12 weeks',
    postedAt: '2d ago',
    status: 'Active',
    requiredSkills: ['Python', 'SQL', 'Agile', 'Product Strategy'],
    applicants: 142,
    matches: 28,
    performance: '+5%',
    performanceTrend: 'up'
  },
  {
    id: 'job-2',
    title: 'Data Science Intern',
    company: 'Quantify Analytics',
    department: 'Data Science',
    location: 'New York, NY',
    type: 'Remote',
    pay: '$40-50/hr',
    term: 'Summer 2024',
    postedAt: '3d ago',
    status: 'Active',
    requiredSkills: ['Python', 'R', 'Statistics', 'Machine Learning'],
    applicants: 87,
    matches: 12,
    performance: '0%',
    performanceTrend: 'flat'
  },
  {
    id: 'job-3',
    title: 'UX/UI Design Intern',
    company: 'Studio Canvas',
    department: 'Design',
    location: 'Los Angeles, CA',
    type: 'On-site',
    pay: '$30-35/hr',
    term: 'Fall 2024',
    postedAt: '4d ago',
    status: 'Review',
    requiredSkills: ['Figma', 'Prototyping', 'User Research'],
    applicants: 45,
    matches: 8,
    performance: '+12%',
    performanceTrend: 'up'
  }
];

interface JobsContextType {
  jobs: Job[];
  addJob: (job: Partial<Job>) => void;
  applyToJob: (jobId: string) => void;
  getJobsForStudent: (studentSkills: string[]) => JobOpportunity[];
  getJobsForRecruiter: () => PostingRow[];
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const addJob = (newJobData: Partial<Job>) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: newJobData.title || 'Untitled Role',
      company: newJobData.company || 'Internix Enterprise',
      department: newJobData.department || 'General',
      location: newJobData.location || 'Remote',
      type: newJobData.type || 'Remote',
      pay: newJobData.pay || 'Unpaid / TBD',
      term: newJobData.term || 'Immediate',
      duration: newJobData.duration,
      postedAt: 'Just now',
      status: 'Active',
      requiredSkills: newJobData.requiredSkills || [],
      applicants: 0,
      matches: 0, // Will update as students apply, but simulating here
      performance: '0%',
      performanceTrend: 'flat'
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const applyToJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, applicants: job.applicants + 1 } : job
    ));
  };

  // Simulates ATS matching engine
  const getJobsForStudent = (studentSkills: string[]): JobOpportunity[] => {
    return jobs.map(job => {
      let matchedCount = 0;
      const skillsMatch: SkillMatch[] = job.requiredSkills.map(reqSkill => {
        // Simple case-insensitive exact match
        const isMatched = studentSkills.some(s => s.toLowerCase() === reqSkill.toLowerCase());
        if (isMatched) matchedCount++;
        return { name: reqSkill, matched: isMatched };
      });

      // Calculate score (0-100) based on how many required skills the student has
      const matchScore = job.requiredSkills.length > 0 
        ? Math.round((matchedCount / job.requiredSkills.length) * 100)
        : 100;

      // Sort so matched skills appear first
      skillsMatch.sort((a, b) => (a.matched === b.matched ? 0 : a.matched ? -1 : 1));

      return {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        term: job.term,
        duration: job.duration,
        pay: job.pay,
        posted: job.postedAt,
        matchScore,
        skills: skillsMatch.slice(0, 3), // show up to 3 skills in badge list
        extraSkillsCount: Math.max(0, skillsMatch.length - 3),
        isTrending: job.applicants > 100,
        contextBadge: matchScore >= 80 ? "STRONG MATCH" : undefined
      };
    }).sort((a, b) => b.matchScore - a.matchScore); // Sort by highest match score
  };

  const getJobsForRecruiter = (): PostingRow[] => {
    return jobs.map(job => ({
      id: job.id,
      title: job.title,
      department: job.department,
      applicants: job.applicants,
      matches: job.matches, // In a real app, this would dynamically count students >80% match
      status: job.status,
      lastUpdated: job.postedAt,
      performance: job.performance,
      performanceTrend: job.performanceTrend
    }));
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, applyToJob, getJobsForStudent, getJobsForRecruiter }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
