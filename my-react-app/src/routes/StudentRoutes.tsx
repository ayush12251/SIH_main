import { Routes, Route } from 'react-router-dom';
import StudentLogin from '../pages/student/StudentLogin';
import StudentRegister from '../pages/student/StudentRegister';
import StudentDashboard from '../pages/student/StudentDashboard';
import SkillAssessment from '../pages/student/SkillAssessment';
import SkillMapping from '../pages/student/SkillMapping';
import Opportunities from '../pages/student/Opportunities';
import Portfolio from '../pages/student/Portfolio';
import Progress from '../pages/student/Progress';
import Library from '../pages/student/Library';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="login" element={<StudentLogin />} />
      <Route path="register" element={<StudentRegister />} />
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="skill-assessment" element={<SkillAssessment />} />
      <Route path="skill-mapping" element={<SkillMapping />} />
      <Route path="opportunities" element={<Opportunities />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="progress" element={<Progress />} />
      <Route path="library" element={<Library />} />
    </Routes>
  );
}
