import { ArrowRight, CheckCircle2 } from 'lucide-react';
import rocketImg from '../../assets/rocket.png';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';

const StudentLogin = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <main className="flex flex-1 flex-col lg:flex-row relative overflow-hidden">
        {/* Left Section - Blue Background */}
        <div className="bg-brand-indigo w-full lg:w-[45%] rounded-br-none lg:rounded-br-[4rem] px-8 py-16 lg:px-16 lg:py-24 flex flex-col relative z-10">
          <div className="max-w-100 text-white">
            <h1 className="text-5xl font-extrabold leading-tight mb-8">Welcome Back to Internix</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Your next big opportunity is waiting. Connect with top employers and propel your career forward.
            </p>
          </div>
          <img 
            src={rocketImg} 
            alt="Rocket taking off" 
            className="hidden lg:block absolute right-[-25%] top-1/2 -translate-y-1/2 w-125 h-auto z-20 pointer-events-none drop-shadow-2xl max-w-none" 
          />
        </div>

        {/* Right Section - Login Card */}
        <div className="w-full lg:w-[55%] flex items-center justify-center p-8 lg:p-12 relative z-0">
          <Card padding="large" className="w-full max-w-120 lg:ml-[10%]">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Login</h2>
            <p className="text-neutral-500 mb-10 text-base">Access your Internix account.</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="" 
              />

              <Input 
                label="Password" 
                type="password"
                rightElement={<a href="#" className="text-sm text-brand-indigo font-semibold hover:underline">Forgot Password?</a>}
              />

              <Button type="submit" fullWidth className="mt-4">
                Login <ArrowRight size={18} />
              </Button>
            </form>

            <div className="flex items-center text-center my-8">
              <div className="flex-1 border-b border-gray-200"></div>
              <span className="px-4 text-sm text-neutral-400">or</span>
              <div className="flex-1 border-b border-gray-200"></div>
            </div>

            <Button variant="google" fullWidth icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            }>
              Continue with Google
            </Button>

            <p className="text-center mt-10 text-[0.95rem] text-neutral-500">
              Don't have an account? <a href="#" className="text-brand-indigo font-semibold hover:underline">Sign Up</a>
            </p>
          </Card>
        </div>
      </main>

      {/* Footer / Features Section */}
      <footer className="px-8 py-8 lg:px-16 flex flex-wrap gap-8 items-center bg-neutral-50 relative z-30">
        <div className="flex items-center gap-2 text-neutral-500 text-sm font-medium">
          <CheckCircle2 size={18} className="text-white fill-accent-green" />
          <span>Skill Extraction</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500 text-sm font-medium">
          <CheckCircle2 size={18} className="text-white fill-accent-green" />
          <span>Experience Parsing</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500 text-sm font-medium">
          <CheckCircle2 size={18} className="text-white fill-accent-green" />
          <span>Education Matching</span>
        </div>
      </footer>
    </div>
  );
};

export default StudentLogin;
