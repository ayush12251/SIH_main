import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PostingStats,
  PostingRow,
  AttentionItem,
  getPostingStats,
  getPostingsList,
  getAttentionItems,
} from '../services/postingsService';
import { useAuth } from './AuthContext';

// ─── Types ───────────────────────────────────────────────────────────────────

interface RecruiterContextType {
  isLoading: boolean;
  companyName: string;
  postingStats: PostingStats | null;
  jobPostings: PostingRow[];
  attentionItems: AttentionItem[];
  // Actions
  addJobPosting: (posting: PostingRow) => void;
  updateJobPosting: (id: string, updates: Partial<PostingRow>) => void;
  removeJobPosting: (id: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const RecruiterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [companyName, setCompanyName] = useState('Your Company');
  const [postingStats, setPostingStats] = useState<PostingStats | null>(null);
  const [jobPostings, setJobPostings] = useState<PostingRow[]>([]);
  const [attentionItems, setAttentionItems] = useState<AttentionItem[]>([]);

  useEffect(() => {
    // Fetch all recruiter-specific data when the recruiter portal mounts
    // In a real app, these would be parallel API calls (e.g., Promise.all)
    const fetchRecruiterData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Load from mocks — replace with actual API calls when backend is ready
      // Derive company name from logged-in user's email domain for demo
      if (user?.email) {
        const domain = user.email.split('@')[1]?.split('.')[0];
        if (domain) setCompanyName(domain.charAt(0).toUpperCase() + domain.slice(1));
      }

      setPostingStats(getPostingStats());
      setJobPostings(getPostingsList());
      setAttentionItems(getAttentionItems());
      setIsLoading(false);
    };

    fetchRecruiterData();
  }, [user]);

  // ─── Actions ───────────────────────────────────────────────────────────────

  const addJobPosting = (posting: PostingRow) => {
    setJobPostings(prev => [posting, ...prev]);
    // Also bump the stat counter
    setPostingStats(prev =>
      prev
        ? { ...prev, activePostings: String(Number(prev.activePostings) + 1) }
        : null
    );
  };

  const updateJobPosting = (id: string, updates: Partial<PostingRow>) => {
    setJobPostings(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const removeJobPosting = (id: string) => {
    setJobPostings(prev => prev.filter(p => p.id !== id));
    setPostingStats(prev =>
      prev
        ? { ...prev, activePostings: String(Math.max(0, Number(prev.activePostings) - 1)) }
        : null
    );
  };

  return (
    <RecruiterContext.Provider
      value={{
        isLoading,
        companyName,
        postingStats,
        jobPostings,
        attentionItems,
        addJobPosting,
        updateJobPosting,
        removeJobPosting,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useRecruiter = () => {
  const context = useContext(RecruiterContext);
  if (context === undefined) {
    throw new Error('useRecruiter must be used within a RecruiterProvider');
  }
  return context;
};
