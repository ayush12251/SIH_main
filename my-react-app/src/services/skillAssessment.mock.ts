// Mock data for Skill Assessment page
// Replace this file's content only when backend APIs are available

export interface SkillScoreCard {
  id: string;
  label: string;
  subLabel: string;
  score: number;
  color: 'indigo' | 'green' | 'amber';
}

export interface RadarAxis {
  label: string;
  value: number; // 0–1
}

export interface SkillInventoryRow {
  id: string;
  skill: string;
  subSkill?: string;
  proficiency: number; // 0–1
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Novice' | 'Beginner';
  lastTested: string;
  highlighted: boolean;
}

export interface DailyChallenge {
  id: string;
  tag: string;
  title: string;
  description: string;
}

export interface AtsMatch {
  score: number;
  max: number;
  label: string;
  description: string;
}

export interface AssessmentHistoryItem {
  id: string;
  period: string;
  title: string;
  meta: string;
  badge?: { label: string; color: 'green' | 'indigo' | 'gray' | 'blue' };
  isUpcoming?: boolean;
  ctaLabel?: string;
}

export const mockSkillScoreCards: SkillScoreCard[] = [
  { id: 'tech', label: 'Technical Domain', subLabel: 'Machine Learning, Python', score: 85, color: 'indigo' },
  { id: 'soft', label: 'Soft Skills', subLabel: 'Communication, Leadership', score: 92, color: 'green' },
  { id: 'aptitude', label: 'Aptitude', subLabel: 'Problem Solving, Logic', score: 68, color: 'amber' },
];

export const mockRadarAxes: RadarAxis[] = [
  { label: 'Machine Learning', value: 0.85 },
  { label: 'Data Eng', value: 0.7 },
  { label: 'Deep Learning', value: 0.6 },
  { label: 'Statistics', value: 0.75 },
  { label: 'Visualization', value: 0.65 },
];

export const mockSkillInventory: SkillInventoryRow[] = [
  { id: 's1', skill: 'Machine Learning', proficiency: 0.95, level: 'Expert', lastTested: 'Oct 12', highlighted: false },
  { id: 's2', skill: 'Python', subSkill: '(Pandas/NumPy)', proficiency: 0.92, level: 'Expert', lastTested: 'Sep 29', highlighted: false },
  { id: 's3', skill: 'Statistical Modeling', proficiency: 0.75, level: 'Advanced', lastTested: 'Aug 15', highlighted: false },
  { id: 's4', skill: 'Apache Spark / Hadoop', proficiency: 0.35, level: 'Novice', lastTested: 'Never', highlighted: true },
  { id: 's5', skill: 'MLOps (Docker, K8s)', proficiency: 0.25, level: 'Beginner', lastTested: 'Jan 05', highlighted: true },
];

export const mockDailyChallenges: DailyChallenge[] = [
  { id: 'c1', tag: 'Python', title: 'Pandas Data Manipulation', description: '5 quick questions on DataFrames.' },
  { id: 'c2', tag: 'SQL', title: 'Complex Joins Quiz', description: 'Test your query optimization skills.' },
];

export const mockAtsMatch: AtsMatch = {
  score: 88,
  max: 100,
  label: 'Strong Match',
  description: 'Your resume aligns well with standard Senior Data Scientist parsing logic. Highlight MLOps experience for a higher score.',
};

export const mockAssessmentHistory: AssessmentHistoryItem[] = [
  {
    id: 'h1',
    period: 'OCT 2023',
    title: 'Advanced ML Cert',
    meta: 'Score: 94% (Top 5%)',
    badge: { label: '+12% Improvement', color: 'green' },
  },
  {
    id: 'h2',
    period: 'JUL 2023',
    title: 'SQL Fundamentals',
    meta: 'Score: 88%',
    badge: { label: 'Passed', color: 'green' },
  },
  {
    id: 'h3',
    period: 'MAR 2023',
    title: 'Baseline Assessment',
    meta: 'Initial Profiling',
    badge: { label: 'Completed', color: 'gray' },
  },
  {
    id: 'h4',
    period: 'UPCOMING',
    title: 'MLOps Practitioner',
    meta: 'Recommended',
    badge: { label: 'Schedule', color: 'indigo' },
    isUpcoming: true,
    ctaLabel: 'Schedule',
  },
];
