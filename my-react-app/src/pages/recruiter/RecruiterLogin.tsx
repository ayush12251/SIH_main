import { ArrowRight, CheckCircle2 } from 'lucide-react';
// We will use a colored div as a placeholder for the 3D rocket if we don't have the image asset
// or we can use an emoji or simple icon if preferred.

const RecruiterLogin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Main Container */}
      <div className="w-full max-w-300 bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden relative z-10 min-h-150">
        
        {/* Left Side (Blue Branding Section) */}
        <div className="w-full md:w-[55%] bg-[#4f46e5] p-12 text-white relative flex flex-col justify-center rounded-3xl z-10 md:m-0 m-2">
          {/* Decorative Rocket (Simulated with emoji/css since we don't have the 3D asset) */}
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[150px] rotate-45 opacity-90 drop-shadow-2xl z-20 pointer-events-none select-none">
            🚀
          </div>
          
          <div className="max-w-md relative z-30">
            <h1 className="text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-6">
              Welcome Back to <br/> Internix
            </h1>
            <p className="text-xl text-indigo-100 font-medium leading-relaxed max-w-sm">
              Your next big opportunity is waiting. Connect with top employers and propel your career forward.
            </p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-[45%] bg-white p-12 lg:p-16 flex flex-col justify-center relative z-20">
          
          <div className="max-w-100 w-full mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Login</h2>
              <p className="text-gray-500 font-medium">Access your Internix account.</p>
            </div>

            <form className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 px-4 py-3 rounded-lg text-sm transition-all outline-none font-medium shadow-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-gray-600">Password</label>
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Forgot Password?</a>
                </div>
                <input 
                  type="password" 
                  className="w-full bg-white border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 px-4 py-3 rounded-lg text-sm transition-all outline-none font-medium shadow-sm"
                />
              </div>

              <button 
                type="button" 
                className="w-full bg-[#5a55ed] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 mt-2 transition-colors shadow-[0_4px_14px_0_rgb(90,85,237,0.39)]"
              >
                Login <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs font-bold text-gray-400">or</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <button 
              type="button" 
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm"
            >
              {/* Google G logo SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-xs font-bold text-gray-500 mt-8">
              Don't have an account? <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Sign Up</a>
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Features List */}
      <div className="absolute bottom-6 left-12 flex items-center gap-6 z-20">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[0.7rem] font-bold text-gray-500">Skill Extraction</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[0.7rem] font-bold text-gray-500">Experience Parsing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[0.7rem] font-bold text-gray-500">Education Matching</span>
        </div>
      </div>

    </div>
  );
};

export default RecruiterLogin;
