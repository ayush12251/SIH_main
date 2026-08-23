// Mock data for Portfolio page
// Replace this file's content only when backend APIs are available

export interface PortfolioProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  avatarUrl: string;
}

export interface Credential {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  icon: string;
  badge: { label: string; color: 'green' | 'gray' | 'yellow' };
  hasLink?: boolean;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  badge: string;
  skills: string[];
  placeholderType: 'diagram' | 'chart';
}

export interface TechStackCategory {
  title: string;
  skills: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  icon: 'pdf' | 'transcript' | 'cert';
}

export const mockPortfolioProfile: PortfolioProfile = {
  name: 'Alex Chen',
  title: 'M.S. Computer Science Candidate',
  location: 'Seattle, WA',
  email: 'alex.chen@university.edu',
  github: 'github.com/alexc-dev',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexc', // Generic placeholder matching design vibe
};

export const mockCredentials: Credential[] = [
  {
    id: 'c1',
    title: 'AWS Certified Solutions Architect',
    subtitle: 'Associate Level',
    meta: 'Issued: Jan 2023',
    icon: 'cloud',
    badge: { label: 'Active', color: 'green' },
    hasLink: true,
  },
  {
    id: 'c2',
    title: 'B.S. Software Engineering',
    subtitle: 'State University',
    meta: 'Graduated: May 2022 • GPA: 3.8',
    icon: 'gradCap',
    badge: { label: 'Verified', color: 'gray' },
  },
];

export const mockAchievements: Credential[] = [
  {
    id: 'a1',
    title: 'Global AI Hackathon',
    subtitle: 'Built ML traffic predictor',
    meta: 'Awarded: Aug 2023',
    icon: 'trophy',
    badge: { label: '1st Place', color: 'yellow' },
  },
  {
    id: 'a2',
    title: "Dean's List",
    subtitle: 'College of Engineering',
    meta: '4 Consecutive Semesters',
    icon: 'medal',
    badge: { label: 'Academic', color: 'green' },
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Distributed Ledger System',
    role: 'Lead Architect',
    badge: 'Academic Research',
    description: 'Designed and implemented a proof-of-concept distributed ledger focusing on high throughput for supply chain tracking. Achieved a 40% reduction in transaction validation time compared to standard protocols.',
    skills: ['Go', 'gRPC', 'Docker', 'Raft Consensus'],
    placeholderType: 'diagram',
  },
  {
    id: 'p2',
    title: 'ML Predictive Analytics Engine',
    role: 'Data Scientist',
    badge: 'Hackathon Winner',
    description: 'Developed a predictive model to forecast urban traffic congestion patterns using historical sensor data and weather APIs. Deployed as a microservice endpoint.',
    skills: ['Python', 'TensorFlow', 'Pandas', 'FastAPI'],
    placeholderType: 'chart',
  },
];

export const mockTechStack: TechStackCategory[] = [
  { title: 'LANGUAGES', skills: ['Python', 'Java', 'Go', 'C++', 'TypeScript', 'SQL'] },
  { title: 'INFRASTRUCTURE & CLOUD', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'] },
  { title: 'FRAMEWORKS', skills: ['React', 'Spring Boot', 'Node.js'] },
];

export const mockDocuments: DocumentItem[] = [
  { id: 'd1', name: 'Master_Resume_2024.pdf', size: '142 KB', icon: 'pdf' },
  { id: 'd2', name: 'Official_Transcript_BS.pdf', size: '2.1 MB', icon: 'transcript' },
  { id: 'd3', name: 'AWS_Cert_Verification.pdf', size: '450 KB', icon: 'cert' },
];
