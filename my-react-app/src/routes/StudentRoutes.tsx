import { Routes, Route, Outlet } from 'react-router-dom';
import StudentDashboard from '../pages/student/StudentDashboard';
import SkillAssessment from '../pages/student/SkillAssessment';
import SkillMapping from '../pages/student/SkillMapping';
import Opportunities from '../pages/student/Opportunities';
import Portfolio from '../pages/student/Portfolio';
import Progress from '../pages/student/Progress';
import Library from '../pages/student/Library';
import ProfileSettings from '../pages/student/ProfileSettings';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { StudentProvider } from '../context/StudentContext';

export default function StudentRoutes() {
  return (
    <Routes>
      {/* Auth guard: only 'student' role can enter */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        {/* StudentProvider mounts once and provides data to all child pages */}
        <Route element={<StudentProvider><Outlet /></StudentProvider>}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="skill-assessment" element={<SkillAssessment />} />
          <Route path="skill-mapping" element={<SkillMapping />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="progress" element={<Progress />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
