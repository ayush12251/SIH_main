import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StudentProfile,
  PendingTask,
  JourneyCard,
  Recommendation,
  ActivityItem,
  MentorItem,
  mockStudentProfile,
  mockJourneyCards,
} from '../services/studentDashboard.mock';
import { useAuth } from './AuthContext';
import { apiRequest } from '../services/api';

// ─── Types ───────────────────────────────────────────────────────────────────

interface StudentContextType {
  isLoading: boolean;
  profile: StudentProfile | null;
  pendingTask: PendingTask | null;
  journeyCards: JourneyCard[];
  recommendations: Recommendation[];
  activity: ActivityItem[];
  mentors: MentorItem[];
  // Actions
  updateProfileStrength: (strength: number) => void;
  updateProfileData: (data: Partial<StudentProfile>) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const StudentContext = createContext<StudentContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [pendingTask, setPendingTask] = useState<PendingTask | null>(null);
  const [journeyCards, setJourneyCards] = useState<JourneyCard[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [mentors, setMentors] = useState<MentorItem[]>([]);

  useEffect(() => {
    // Fetch all student-specific data when the student portal mounts
    // In a real app, these would be parallel API calls (e.g., Promise.all)
    const fetchStudentData = async () => {
      setIsLoading(true);
      const dashboard = await apiRequest<{
        profile: {
        name: string;
        title: string;
        location: string;
        email: string;
        github: string;
        bio: string;
        avatar_url: string | null;
        profile_strength: number;
        completed_skills: number;
        applications_sent: number;
        match_readiness: { label: string; score: number };
        ats_score: { score: number; max: number };
        };
        pending_task: PendingTask;
        activity: ActivityItem[];
        mentors: (MentorItem & { linkedinUrl?: string })[];
        recommendations: Recommendation[];
      }>('/student/dashboard');
      const backendProfile = dashboard.profile;

      const resolvedProfile: StudentProfile = {
        ...mockStudentProfile,
        name: backendProfile.name,
        title: backendProfile.title || 'Student at Internix',
        location: backendProfile.location,
        email: backendProfile.email,
        github: backendProfile.github,
        bio: backendProfile.bio,
        avatarUrl: backendProfile.avatar_url,
        profileStrength: backendProfile.profile_strength,
        completedSkills: backendProfile.completed_skills,
        applicationsSent: backendProfile.applications_sent,
        matchReadiness: backendProfile.match_readiness,
        atsScore: backendProfile.ats_score,
      };

      setProfile(resolvedProfile);
      setPendingTask(dashboard.pending_task);
      setJourneyCards(mockJourneyCards);
      setRecommendations(dashboard.recommendations);
      setActivity(dashboard.activity);
      setMentors(dashboard.mentors);
      setIsLoading(false);
    };

    fetchStudentData();
  }, [user]);

  // ─── Actions ───────────────────────────────────────────────────────────────

  const updateProfileStrength = (strength: number) => {
    setProfile(prev => prev ? { ...prev, profileStrength: strength } : null);
  };

  const updateProfileData = (data: Partial<StudentProfile>) => {
    setProfile(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <StudentContext.Provider
      value={{
        isLoading,
        profile,
        pendingTask,
        journeyCards,
        recommendations,
        activity,
        mentors,
        updateProfileStrength,
        updateProfileData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
