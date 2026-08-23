
import { FileUp, Sparkles } from 'lucide-react';
import rocketImg from '../../assets/rocket.png';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Link } from 'react-router-dom';

const StudentRegister = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-neutral-900 relative overflow-hidden bg-white">
      
      {/* Main Content Area */}
      <main className="flex-1 flex w-full relative z-10">
        
        {/* Left Section - Purple Gradient Background */}
        <div className="hidden lg:flex w-[48%] bg-linear-to-b from-[#4c42e6] to-[#5d52eb] relative flex-col justify-center px-16 py-20 z-20">
          
          <div className="max-w-115 text-white">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1.5 mb-10 shadow-sm">
              <Sparkles size={14} className="text-[#64fac8]" />
              <span className="text-[0.7rem] font-bold tracking-wide text-white uppercase">AI-Driven Onboarding</span>
            </div>

            <h1 className="text-[3.5rem] font-extrabold leading-[1.1] mb-6 tracking-tight">
              Your resume is your<br />profile.<br />
              <span className="bg-linear-to-r from-[#4ade80] to-[#2dd4bf] text-transparent bg-clip-text">
                We handle the rest.
              </span>
            </h1>
            
            <p className="text-[1.1rem] leading-[1.65] text-indigo-100/90 font-medium tracking-wide pr-8">
              Join the platform designed for productive optimism. Simply drop your resume, and our intelligent extraction engine instantly builds a standout profile to connect you with top-tier internships.
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
              <p className="text-gray-500 text-[0.95rem]">Fast-track your career growth today.</p>
            </div>

            {/* Upload Box */}
            <div className="mb-8 border-2 border-dashed border-[#e5e7eb] rounded-3xl bg-[#fcfcfd] hover:bg-gray-50 transition-colors py-8 px-6 flex flex-col items-center justify-center cursor-pointer group">
              <div className="w-12 h-12 bg-[#f0effd] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#e0defc] transition-colors">
                <FileUp size={20} className="text-[#4c42e6]" strokeWidth={2.5} />
              </div>
              <p className="text-neutral-900 text-[0.9rem] font-bold mb-1.5 text-center">
                Upload your resume to instantly<br />build your profile
              </p>
              <p className="text-gray-400 text-[0.75rem] font-medium">Supports PDF, DOCX (Max 5MB)</p>
            </div>

            <div className="flex items-center text-center mb-8">
              <div className="flex-1 border-b border-gray-100"></div>
              <span className="px-4 text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">or sign up manually</span>
              <div className="flex-1 border-b border-gray-100"></div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-6">
                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="" 
                  className="mb-0 [&>div>label]:text-[#4b5563] [&>div>label]:text-[0.7rem] [&>div>label]:uppercase [&>div>label]:tracking-wider [&>div>label]:font-bold [&>input]:bg-[#f4f5f7] [&>input]:py-3.5 [&>input]:rounded-xl [&>input]:text-sm"
                />
              </div>

              <div className="mb-8">
                <Input 
                  label="Password" 
                  type="password"
                  className="mb-0 [&>div>label]:text-[#4b5563] [&>div>label]:text-[0.7rem] [&>div>label]:uppercase [&>div>label]:tracking-wider [&>div>label]:font-bold [&>input]:bg-[#f4f5f7] [&>input]:py-3.5 [&>input]:rounded-xl [&>input]:text-sm"
                />
              </div>

              <Button type="submit" fullWidth className="py-3.5 bg-[#3b2ec4] hover:bg-[#2d22a3] text-white font-semibold rounded-xl! text-[0.95rem] shadow-[0_4px_14px_0_rgba(59,46,196,0.39)] transition duration-200">
                Create Account
              </Button>
            </form>

            <p className="text-center mt-10 text-[0.85rem] text-gray-500 font-medium">
              Already have an account? <Link to="/student/login" className="text-[#4c42e6] font-bold hover:underline">Log in</Link>
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

export default StudentRegister;
