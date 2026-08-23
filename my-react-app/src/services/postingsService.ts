export interface PostingStats {
  activePostings: string;
  totalApplicants: string;
  newMatches: string;
  newMatchesChange: string;
  avgTimeToHire: string;
}

export interface PostingRow {
  id: string;
  title: string;
  department: string;
  applicants: number;
  matches: number;
  status: 'Active' | 'Review';
  lastUpdated: string;
  performance: string;
  performanceTrend: 'up' | 'down' | 'flat';
}

export interface AttentionItem {
  id: string;
  title: string;
  role: string;
  type: 'urgent' | 'draft';
}

export const getPostingStats = (): PostingStats => ({
  activePostings: '12',
  totalApplicants: '1,452',
  newMatches: '48',
  newMatchesChange: '+12%',
  avgTimeToHire: '18 days'
});

export const getPostingsList = (): PostingRow[] => [
  {
    id: '1',
    title: 'Senior Data Engineer',
    department: 'Data Science',
    applicants: 142,
    matches: 28,
    status: 'Active',
    lastUpdated: '2h ago',
    performance: '+5%',
    performanceTrend: 'up'
  },
  {
    id: '2',
    title: 'Product Marketing Manager',
    department: 'Marketing',
    applicants: 87,
    matches: 12,
    status: 'Review',
    lastUpdated: '5h ago',
    performance: '0%',
    performanceTrend: 'flat'
  },
  {
    id: '3',
    title: 'Lead UX Researcher',
    department: 'Design',
    applicants: 45,
    matches: 8,
    status: 'Active',
    lastUpdated: '1d ago',
    performance: '+12%',
    performanceTrend: 'up'
  },
  {
    id: '4',
    title: 'Data Scientist',
    department: 'Data Science',
    applicants: 112,
    matches: 19,
    status: 'Active',
    lastUpdated: '2d ago',
    performance: '-2%',
    performanceTrend: 'down'
  },
  {
    id: '5',
    title: 'Junior Frontend Dev',
    department: 'Engineering',
    applicants: 340,
    matches: 52,
    status: 'Active',
    lastUpdated: '3d ago',
    performance: '+25%',
    performanceTrend: 'up'
  },
  {
    id: '6',
    title: 'Product Manager',
    department: 'Product',
    applicants: 64,
    matches: 14,
    status: 'Review',
    lastUpdated: '4d ago',
    performance: '-1%',
    performanceTrend: 'flat'
  }
];

export const getAttentionItems = (): AttentionItem[] => [
  {
    id: '1',
    title: 'Expiring in 48h',
    role: 'Senior Data Engineer',
    type: 'urgent'
  },
  {
    id: '2',
    title: 'Draft',
    role: 'Backend Developer (Go)',
    type: 'draft'
  }
];
