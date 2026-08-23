import { Routes, Route, Outlet } from 'react-router-dom';
import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard';
import JobPostings from '../pages/recruiter/JobPostings';
import CandidateSearch from '../pages/recruiter/CandidateSearch';
import RecruitmentAnalytics from '../pages/recruiter/RecruitmentAnalytics';
import RecruiterLearning from '../pages/recruiter/RecruiterLearning';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { RecruiterProvider } from '../context/RecruiterContext';

export default function RecruiterRoutes() {
  return (
    <Routes>
      {/* Auth guard: only 'industry' role can enter */}
      <Route element={<ProtectedRoute allowedRoles={['industry']} />}>
        {/* RecruiterProvider mounts once and provides data to all child pages */}
        <Route element={<RecruiterProvider><Outlet /></RecruiterProvider>}>
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="jobs" element={<JobPostings />} />
          <Route path="candidates" element={<CandidateSearch />} />
          <Route path="analytics" element={<RecruitmentAnalytics />} />
          <Route path="learning" element={<RecruiterLearning />} />
        </Route>
      </Route>
    </Routes>
  );
}
