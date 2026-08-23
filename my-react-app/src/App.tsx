import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/student/LandingPage';
import StudentLogin from './pages/student/StudentLogin';
import StudentDashboard from './pages/student/StudentDashboard';
import SkillAssessment from './pages/student/SkillAssessment';
import SkillMapping from './pages/student/SkillMapping';
import Opportunities from './pages/student/Opportunities';
import Portfolio from './pages/student/Portfolio';
import Progress from './pages/student/Progress';
import Library from './pages/student/Library';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/skill-assessment" element={<SkillAssessment />} />
      <Route path="/student/skill-mapping" element={<SkillMapping />} />
      <Route path="/student/opportunities" element={<Opportunities />} />
      <Route path="/student/portfolio" element={<Portfolio />} />
      <Route path="/student/progress" element={<Progress />} />
      <Route path="/student/library" element={<Library />} />
    </Routes>
  );
}

export default App;
