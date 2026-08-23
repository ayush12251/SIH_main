import { 
  Briefcase, Star, Users,
  PlusCircle, SlidersHorizontal, GraduationCap, BarChart2,
  FileText, CheckCircle2, MessageSquare, Clock, 
  ChevronRight, Calendar
} from 'lucide-react';
import { RecruiterNavbar } from '../../components/RecruiterNavbar';

const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-neutral-900 flex flex-col">
      {/* Navbar */}
      <RecruiterNavbar />

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* Main Content Area */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-[2.2rem] font-extrabold text-gray-900 tracking-tight mb-2">Good morning, Recruit Team.</h1>
            <p className="text-gray-500 text-[1.05rem] font-medium">Here's what's happening in your talent pipeline today.</p>
          </div>

          {/* Global Talent Pipeline Card */}
          <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-8">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">Global Talent Pipeline</h3>
            
            <div className="flex justify-between items-end mb-8 px-4">
              <div className="text-center flex-1 border-r border-gray-100 last:border-0">
                <div className="text-4xl font-black text-indigo-600 mb-2">42</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sourcing</div>
              </div>
              <div className="text-center flex-1 border-r border-gray-100 last:border-0">
                <div className="text-4xl font-black text-gray-800 mb-2">28</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Screening</div>
              </div>
              <div className="text-center flex-1 border-r border-gray-100 last:border-0">
                <div className="text-4xl font-black text-gray-800 mb-2">15</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Interviewing</div>
              </div>
              <div className="text-center flex-1 border-r border-gray-100 last:border-0">
                <div className="text-4xl font-black text-gray-800 mb-2">4</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Offer</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-4xl font-black text-emerald-500 mb-2">12</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hired</div>
              </div>
            </div>

            {/* Unified Progress Bar */}
            <div className="h-2.5 flex rounded-full overflow-hidden bg-gray-100 w-full">
              <div className="bg-indigo-600 h-full" style={{ width: '40%' }}></div>
              <div className="bg-indigo-400 h-full" style={{ width: '25%' }}></div>
              <div className="bg-indigo-300 h-full" style={{ width: '15%' }}></div>
              <div className="bg-emerald-400 h-full" style={{ width: '5%' }}></div>
              <div className="bg-emerald-500 h-full" style={{ width: '15%' }}></div>
            </div>
          </div>

          {/* 3 Stat Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative">
              <h3 className="text-gray-500 font-bold text-sm mb-6">Active Postings</h3>
              <div className="text-[3.5rem] font-black text-gray-900 leading-none">12</div>
              <div className="absolute top-8 right-8 w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative">
              <h3 className="text-gray-500 font-bold text-sm mb-6">Total Applicants</h3>
              <div className="flex items-end justify-between">
                <div className="text-[3.5rem] font-black text-gray-900 leading-none">145</div>
                <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md mb-2">↑ 12%</div>
              </div>
              <div className="absolute top-8 right-8 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative">
              <h3 className="text-gray-500 font-bold text-sm mb-6">New Matches</h3>
              <div className="text-[3.5rem] font-black text-gray-900 leading-none">8</div>
              <div className="absolute top-8 right-8 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Core Workflows */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Core Workflows</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">All Roles</button>
                <button className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50">UX Design</button>
                <button className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50">Full Stack</button>
                <button className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50">Product Management</button>
                <button className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50">Data Science</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] cursor-pointer hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <PlusCircle className="w-5 h-5 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">1. Postings</h4>
                <p className="text-xs text-gray-500 font-medium">Create & manage opportunities</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] cursor-pointer hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <SlidersHorizontal className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">2. Shortlisting</h4>
                <p className="text-xs text-gray-500 font-medium">Review & filter candidates</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] cursor-pointer hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">3. Learning</h4>
                <p className="text-xs text-gray-500 font-medium">Industry trends & skills</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] cursor-pointer hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <BarChart2 className="w-5 h-5 text-gray-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">4. Analytics</h4>
                <p className="text-xs text-gray-500 font-medium">Metrics & reporting</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-4xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium"><span className="font-bold">Sarah J.</span> updated her resume for <span className="text-indigo-600 font-bold cursor-pointer">Senior UX Designer</span></p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">2 hours ago</p>
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium"><span className="font-bold">Mark T.</span> completed the SQL Assessment</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">5 hours ago • Score: 92%</p>
                </div>
              </div>

              <div className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium"><span className="font-bold">Elena R.</span> responded to the interview invite</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-105 p-8 lg:p-12 lg:pl-0">
          
          {/* Needs Attention Widget */}
          <div className="bg-[#eff4ff] rounded-4xl p-6 mb-8 border border-blue-100">
            <h2 className="text-[1.15rem] font-extrabold text-[#1e3a8a] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse"></span> Needs Attention
            </h2>
            
            <div className="bg-white rounded-2xl p-5 border border-blue-50 shadow-sm mb-4">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-red-50 text-red-600 text-[0.65rem] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Closing Soon</span>
                <span className="text-red-500 text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 2 days left
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Senior UX Designer</h4>
              <p className="text-xs text-gray-400 font-medium mb-5">Req ID: #UX-2024-89 • Design Team</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-wider mb-1">Current Pipeline</p>
                  <p className="text-sm font-bold text-gray-900">3 Finalists, 0 Offers</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-5 rounded-full transition-colors shadow-sm">
                  Review
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-blue-50 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">Interview Feedback Pending</h4>
                <p className="text-xs text-gray-500 font-medium">Frontend Engineer Role • 2 candidates</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Today's Interviews Widget */}
          <div className="mb-8">
            <h2 className="text-[1.15rem] font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" /> Today's Interviews
            </h2>

            <div className="bg-white rounded-4xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 text-[1.05rem]">James Wilson</h4>
                  <span className="text-xs font-bold text-gray-500">10:30 AM</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-4">Product Manager • Round 2</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors shadow-sm">
                  Join Meeting
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 text-[1.05rem]">Linda Chen</h4>
                  <span className="text-xs font-bold text-gray-500">2:00 PM</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-4">Senior UX Designer • Portfolio Review</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors shadow-sm">
                  Join Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Hiring Team Online */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Hiring Team Online</h3>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden relative">
                <img src="https://ui-avatars.com/api/?name=Sarah&background=random" alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden relative">
                <img src="https://ui-avatars.com/api/?name=Mike&background=random" alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden relative">
                <img src="https://ui-avatars.com/api/?name=Alex&background=random" alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[0.6rem] font-bold text-gray-600">
                +2
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
        <div>
          <span className="font-bold text-gray-900 text-sm">RecruitHub</span> © 2024 RecruitHub Enterprise. All rights reserved.
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">API Documentation</a>
        </div>
      </footer>
    </div>
  );
};

export default RecruiterDashboard;
