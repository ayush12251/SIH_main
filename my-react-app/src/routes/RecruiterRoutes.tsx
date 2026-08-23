import { Routes, Route } from 'react-router-dom';
import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard';
import RecruiterLogin from '../pages/recruiter/RecruiterLogin';
import JobPostings from '../pages/recruiter/JobPostings';
import CandidateSearch from '../pages/recruiter/CandidateSearch';
import RecruitmentAnalytics from '../pages/recruiter/RecruitmentAnalytics';
import RecruiterLearning from '../pages/recruiter/RecruiterLearning';

export default function RecruiterRoutes() {
  return (
    <Routes>
      <Route path="login" element={<RecruiterLogin />} />
      <Route path="dashboard" element={<RecruiterDashboard />} />
      <Route path="jobs" element={<JobPostings />} />
      <Route path="candidates" element={<CandidateSearch />} />
      <Route path="analytics" element={<RecruitmentAnalytics />} />
      <Route path="learning" element={<RecruiterLearning />} />
    </Routes>
  );
}
