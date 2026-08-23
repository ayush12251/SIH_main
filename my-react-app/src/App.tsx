import { Routes, Route } from 'react-router-dom';
import ChoosePath from './pages/onboarding/ChoosePath';
import LandingPage from './pages/LandingPage';
import StudentRoutes from './routes/StudentRoutes';
import RecruiterRoutes from './routes/RecruiterRoutes';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/Toast';
import { JobsProvider } from './context/JobsContext';
import { ATSProvider } from './context/ATSContext';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <JobsProvider>
          <ATSProvider>
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/choose-path" element={<ChoosePath />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Delegated Role Routes */}
            <Route path="/student/*" element={<StudentRoutes />} />
            <Route path="/recruiter/*" element={<RecruiterRoutes />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </ATSProvider>
        </JobsProvider>
        <ToastContainer />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
