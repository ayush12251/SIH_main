import { Routes, Route } from 'react-router-dom';
import ChoosePath from './pages/onboarding/ChoosePath';
import LandingPage from './pages/LandingPage';
import StudentRoutes from './routes/StudentRoutes';
import RecruiterRoutes from './routes/RecruiterRoutes';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/choose-path" element={<ChoosePath />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Delegated Role Routes */}
      <Route path="/student/*" element={<StudentRoutes />} />
      <Route path="/recruiter/*" element={<RecruiterRoutes />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
