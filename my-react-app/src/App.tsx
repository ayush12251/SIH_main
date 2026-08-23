import { Routes, Route } from 'react-router-dom';
import ChoosePath from './pages/onboarding/ChoosePath';
import LandingPage from './pages/LandingPage';
import StudentRoutes from './routes/StudentRoutes';
import RecruiterRoutes from './routes/RecruiterRoutes';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/choose-path" element={<ChoosePath />} />
      
      {/* Delegated Role Routes */}
      <Route path="/student/*" element={<StudentRoutes />} />
      <Route path="/recruiter/*" element={<RecruiterRoutes />} />
      
      {/* Aliases for convenience */}
      <Route path="/register" element={<StudentRoutes />} /> 
    </Routes>
  );
}

export default App;
