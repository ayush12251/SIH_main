import { useEffect, useRef, useState } from 'react';
import { FileUp, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import rocketImg from '../../assets/rocket.png';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { apiRequest } from '../../services/api';

// ─── Validation helpers ───────────────────────────────────────────────────────
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { label: '', color: 'bg-gray-200' },
    { label: 'Weak', color: 'bg-red-400' },
    { label: 'Fair', color: 'bg-amber-400' },
    { label: 'Good', color: 'bg-blue-400' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ];
  return { score, ...map[score] };
};

interface RegisterErrors {
  fullName?: string;
  companyName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get('role');
  const [mounted, setMounted] = useState(false);
  const { register, user } = useAuth();
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const registrationFinished = useRef(false);
  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    if (user && registrationFinished.current && !isSubmitting) {
      if (user.role === 'student') navigate('/student/dashboard');
      else if (user.role === 'industry') navigate('/recruiter/dashboard');
      else navigate('/');
    }
  }, [user, navigate, isSubmitting]);

  useEffect(() => {
    setMounted(true);
    if (!role) navigate('/choose-path');
  }, [role, navigate]);

  if (!mounted || !role) return null;

  const isStudent = role === 'student';

  const validate = (): boolean => {
    const newErrors: RegisterErrors = {};
    if (isStudent && !fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!isStudent && !companyName.trim()) newErrors.companyName = 'Company name is required.';
    if (!email.trim()) newErrors.email = 'Email address is required.';
    else if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email address.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await register(isStudent ? fullName : companyName, email, password, isStudent ? 'student' : 'industry');
      if (isStudent && resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        await apiRequest('/ai/resume/parse', { method: 'POST', body: formData });
        showToast('success', 'Profile created!', 'Your resume was parsed successfully.');
      } else {
        showToast('success', 'Account created!', 'Welcome to Internix. Let\'s get started.');
      }
      registrationFinished.current = true;
    } catch {
      showToast('error', 'Registration failed', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = isStudent ? (
    <>Your resume is your<br />profile.<br />
    <span className="bg-linear-to-r from-[#4ade80] to-[#2dd4bf] text-transparent bg-clip-text">
      We handle the rest.
    </span></>
  ) : (
    <>Connect with<br />top talent.<br />
    <span className="bg-linear-to-r from-[#4ade80] to-[#2dd4bf] text-transparent bg-clip-text">
      Build the future.
    </span></>
  );

  const subtitle = isStudent 
    ? "Join the platform designed for productive optimism. Simply drop your resume, and our intelligent extraction engine instantly builds a standout profile to connect you with top-tier internships."
    : "Deploy high-precision talent acquisition. Filter candidates through standardized competency matrices, not just resumes.";

  return (
    <div className="flex flex-col min-h-screen font-sans text-neutral-900 relative overflow-hidden bg-white">
      
      {/* Main Content Area */}
      <main className="flex-1 flex w-full relative z-10">
        
        {/* Left Section - Purple Gradient Background */}
        <div className="hidden lg:flex w-[48%] bg-linear-to-b from-[#4c42e6] to-[#5d52eb] relative flex-col justify-center px-16 py-20 z-20">
          
          <div className="max-w-115 text-white">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1.5 mb-10 shadow-sm">
              <Sparkles size={14} className="text-[#64fac8]" />
              <span className="text-[0.7rem] font-bold tracking-wide text-white uppercase">
                {isStudent ? 'AI-Driven Onboarding' : 'Enterprise Setup'}
              </span>
            </div>

            <h1 className="text-[3.5rem] font-extrabold leading-[1.1] mb-6 tracking-tight">
              {title}
            </h1>
            
            <p className="text-[1.1rem] leading-[1.65] text-indigo-100/90 font-medium tracking-wide pr-8">
              {subtitle}
            </p>
          </div>
          
          <img 
            src={rocketImg} 
            alt="3D Rocket taking off" 
            className="absolute right-[-25%] top-1/2 translate-y-[-35%] w-[110%] max-w-137.5 z-30 pointer-events-none drop-shadow-2xl" 
            style={{ filter: 'drop-shadow(0px 30px 50px rgba(0, 0, 0, 0.25))' }}
          />
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full lg:w-[52%] flex items-center justify-center p-6 sm:p-12 z-10">
          <Card padding="none" className="w-full max-w-110 bg-white border-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-4xl p-12">
            <div className="text-center mb-10">
              <h2 className="text-[1.85rem] font-bold text-gray-900 mb-2 tracking-tight">Get Started</h2>
              <p className="text-gray-500 text-[0.95rem]">
                {isStudent ? 'Fast-track your career growth today.' : 'Set up your organization account.'}
              </p>
            </div>

            {isStudent ? (
              <>
                {/* Full Name for students */}
                <div className="mb-6">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder=""
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: undefined })); }}
                    error={errors.fullName}
                    className="mb-0 [&>div>label]:text-[#4b5563] [&>div>label]:text-[0.7rem] [&>div>label]:uppercase [&>div>label]:tracking-wider [&>div>label]:font-bold [&>input]:bg-[#f4f5f7] [&>input]:py-3.5 [&>input]:rounded-xl [&>input]:text-sm"
                  />
                </div>

                {/* Upload Box */}
                <label className="mb-8 border-2 border-dashed border-[#e5e7eb] rounded-3xl bg-[#fcfcfd] hover:bg-gray-50 transition-colors py-8 px-6 flex flex-col items-center justify-center cursor-pointer group">
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    className="sr-only"
                    onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
                  />
                  <div className="w-12 h-12 bg-[#f0effd] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#e0defc] transition-colors">
                    <FileUp size={20} className="text-[#4c42e6]" strokeWidth={2.5} />
                  </div>
                  <p className="text-neutral-900 text-[0.9rem] font-bold mb-1.5 text-center">
                    Upload your resume to instantly<br />build your profile
                  </p>
                  <p className="text-gray-400 text-[0.75rem] font-medium">
                    {resumeFile ? resumeFile.name : 'Supports PDF (Max 10MB)'}
                  </p>
                </label>

                <div className="flex items-center text-center mb-8">
                  <div className="flex-1 border-b border-gray-100"></div>
                  <span className="px-4 text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">or sign up manually</span>
                  <div className="flex-1 border-b border-gray-100"></div>
                </div>
              </>
            ) : (
              <div className="mb-6">
                <Input
                  label="Company Name"
                  type="text"
                  placeholder=""
                  value={companyName}
                  onChange={(e) => { setCompanyName(e.target.value); setErrors(prev => ({ ...prev, companyName: undefined })); }}
                  error={errors.companyName}
                  className="mb-0 [&>div>label]:text-[#4b5563] [&>div>label]:text-[0.7rem] [&>div>label]:uppercase [&>div>label]:tracking-wider [&>div>label]:font-bold [&>input]:bg-[#f4f5f7] [&>input]:py-3.5 [&>input]:rounded-xl [&>input]:text-sm"
                />
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                  error={errors.email}
                  className="mb-0 [&>div>label]:text-[#4b5563] [&>div>label]:text-[0.7rem] [&>div>label]:uppercase [&>div>label]:tracking-wider [&>div>label]:font-bold [&>input]:bg-[#f4f5f7] [&>input]:py-3.5 [&>input]:rounded-xl [&>input]:text-sm"
                />
              </div>

              <div className="mb-2">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                  error={errors.password}
                  className="mb-0 [&>div>label]:text-[#4b5563] [&>div>label]:text-[0.7rem] [&>div>label]:uppercase [&>div>label]:tracking-wider [&>div>label]:font-bold [&>input]:bg-[#f4f5f7] [&>input]:py-3.5 [&>input]:rounded-xl [&>input]:text-sm"
                />
              </div>

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="mb-6">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength.score ? passwordStrength.color : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">{passwordStrength.label && `Password strength: ${passwordStrength.label}`}</p>
                </div>
              )}

              <div className="mb-8">
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: undefined })); }}
                  error={errors.confirmPassword}
                  rightElement={
                    confirmPassword.length > 0
                      ? password === confirmPassword
                        ? <CheckCircle2 size={16} className="text-emerald-500" />
                        : <XCircle size={16} className="text-red-400" />
                      : undefined
                  }
                  className="mb-0 [&>div>label]:text-[#4b5563] [&>div>label]:text-[0.7rem] [&>div>label]:uppercase [&>div>label]:tracking-wider [&>div>label]:font-bold [&>input]:bg-[#f4f5f7] [&>input]:py-3.5 [&>input]:rounded-xl [&>input]:text-sm"
                />
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                className="py-3.5 bg-[#3b2ec4] hover:bg-[#2d22a3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl! text-[0.95rem] shadow-[0_4px_14px_0_rgba(59,46,196,0.39)] transition duration-200"
              >
                {isSubmitting ? 'Creating Account…' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center mt-10 text-[0.85rem] text-gray-500 font-medium">
              Already have an account? <Link to="/login" className="text-[#4c42e6] font-bold hover:underline">Log in</Link>
            </p>
          </Card>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full bg-[#f8f9fa] border-t border-gray-100 py-6 px-12 md:px-16 flex flex-col md:flex-row items-center justify-between z-0 relative">
        <div className="font-bold text-[#4c42e6] text-[1.1rem] mb-4 md:mb-0">Internix</div>
        
        <div className="flex gap-6 md:gap-10 mb-4 md:mb-0">
          <a href="#" className="text-[0.7rem] text-gray-500 font-bold tracking-wide hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="text-[0.7rem] text-gray-500 font-bold tracking-wide hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="text-[0.7rem] text-gray-500 font-bold tracking-wide hover:text-gray-900 transition-colors">Help Center</a>
          <a href="#" className="text-[0.7rem] text-gray-500 font-bold tracking-wide hover:text-gray-900 transition-colors">Contact Support</a>
        </div>
        
        <div className="text-[0.7rem] text-gray-400 font-bold tracking-wide">
          © 2024 Internix Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Register;
