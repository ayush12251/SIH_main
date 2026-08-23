import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StudentProfile,
  PendingTask,
  JourneyCard,
  Recommendation,
  ActivityItem,
  MentorItem,
  mockStudentProfile,
  mockPendingTask,
  mockJourneyCards,
  mockRecommendations,
  mockActivity,
  mockMentors,
} from '../services/studentDashboard.mock';
import { useAuth } from './AuthContext';

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Load from mocks — replace with actual API calls when backend is ready
      const resolvedProfile = { ...mockStudentProfile };
      // Personalize name from the logged-in AuthContext user if available
      if (user?.name) resolvedProfile.name = user.name;

      setProfile(resolvedProfile);
      setPendingTask(mockPendingTask);
      setJourneyCards(mockJourneyCards);
      setRecommendations(mockRecommendations);
      setActivity(mockActivity);
      setMentors(mockMentors);
      setIsLoading(false);
    };

    fetchStudentData();
  }, [user]);

  // ─── Actions ───────────────────────────────────────────────────────────────

  const updateProfileStrength = (strength: number) => {
    setProfile(prev => prev ? { ...prev, profileStrength: strength } : null);
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
