import { 
  Activity, Bookmark, Plus, 
  ChevronLeft, ChevronRight, CheckCircle2, Users,
  Clock, MessageSquare, FileText, Wrench, TrendingUp
} from 'lucide-react';
import { 
  getYourProgress, getRecommendedPrograms, 
  getActiveDiscussions, getIndustryMentors, getKnowledgeLibrary 
} from '../../services/learningService';
import { RecruiterNavbar } from '../../components/RecruiterNavbar';

const RecruiterLearning = () => {
  const progress = getYourProgress();
  const programs = getRecommendedPrograms();
  const discussions = getActiveDiscussions();
  const mentors = getIndustryMentors();
  const library = getKnowledgeLibrary();

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-neutral-900 flex flex-col">
      {/* Navbar */}
      <RecruiterNavbar />

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 max-w-350 w-full mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[1.8rem] font-bold text-gray-900 mb-1">Learning & Mentorship</h1>
            <p className="text-sm text-gray-500 font-medium">Elevate your recruitment expertise and connect with industry leaders.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 font-bold text-sm hover:bg-gray-50 shadow-sm transition-all">
              <Bookmark className="w-4 h-4" /> Saved Items
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 border border-indigo-600 rounded-full text-white font-bold text-sm hover:bg-indigo-700 shadow-sm transition-all">
              <Plus className="w-4 h-4" /> Request Mentor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Your Progress */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
                <a href="#" className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors">View Transcript</a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {progress.map(prog => (
                  <div key={prog.id} className="border border-gray-100 rounded-2xl p-6 relative">
                    <div className="flex justify-between items-start mb-4">
                      {prog.status === 'In Progress' ? (
                        <span className="bg-gray-100 text-gray-600 text-[0.65rem] font-bold px-2 py-1 rounded-md uppercase tracking-wider">In Progress</span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-600 text-[0.65rem] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                      
                      {prog.status === 'In Progress' ? (
                        <div className="flex items-center gap-1 text-gray-400">
                           <ChevronLeft className="w-4 h-4" />
                           <ChevronRight className="w-4 h-4" />
                        </div>
                      ) : (
                        <Users className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-[1.1rem] mb-6 leading-tight max-w-50">{prog.title}</h3>
                    
                    <div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full ${prog.status === 'Completed' ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                          style={{ width: `${prog.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-[0.65rem] font-bold text-gray-500">{prog.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Programs */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
               <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recommended Programs</h2>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {programs.map(prog => (
                  <div key={prog.id} className="border border-gray-100 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                    <div className={`h-32 ${prog.coverGradient} relative p-4 flex flex-col items-center justify-center`}>
                      {/* Placeholder for images, using gradient + some decorative lines/text for mock */}
                       <div className="text-white/50 font-bold text-xs">COURSE COVER</div>
                      {prog.isNew && (
                        <span className="absolute top-3 right-3 bg-white text-indigo-600 text-[0.6rem] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">New</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-indigo-600 transition-colors leading-tight min-h-10">{prog.title}</h3>
                      <p className="text-[0.7rem] text-gray-500 font-medium mb-4 leading-relaxed line-clamp-2">{prog.description}</p>
                      <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-gray-400">
                        <Clock className="w-3.5 h-3.5" /> {prog.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Discussions */}
            <section className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
               <div className="flex justify-between items-center p-6 border-b border-gray-50 bg-[#fafafa]">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Active Discussions</h2>
                <a href="#" className="text-indigo-600 text-xs font-bold hover:text-indigo-700 transition-colors">Go to Forums</a>
              </div>
              <div className="flex flex-col">
                {discussions.map((disc, idx) => (
                  <div key={disc.id} className={`p-6 flex items-start gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer ${idx !== discussions.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    {disc.avatarUrl ? (
                      <img src={disc.avatarUrl} alt={disc.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                        {disc.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{disc.title}</h3>
                      <p className="text-[0.75rem] text-gray-500 font-medium mb-3">{disc.description}</p>
                      <div className="flex items-center gap-4 text-[0.65rem] font-bold text-gray-400">
                        <span>By {disc.author}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {disc.replies} replies</span>
                        <span>{disc.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column (Sidebars) */}
          <div className="flex flex-col gap-8">
            
            {/* Industry Mentors */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Industry Mentors</h2>
                <a href="#" className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors">View Directory</a>
              </div>

              <div className="flex flex-col gap-4">
                {mentors.map(mentor => (
                  <div key={mentor.id} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      {mentor.avatarUrl ? (
                        <img src={mentor.avatarUrl} alt={mentor.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                          {mentor.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{mentor.name}</h3>
                        <p className="text-[0.65rem] text-gray-500 font-medium leading-tight mt-0.5">{mentor.title}, {mentor.company} | {mentor.experience}</p>
                        <span className="inline-block mt-2 bg-gray-100 text-gray-600 text-[0.6rem] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {mentor.badge}
                        </span>
                      </div>
                    </div>
                    <button className="w-full py-2.5 rounded-full border border-gray-200 text-gray-700 font-bold text-[0.8rem] hover:bg-gray-50 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Knowledge Library */}
            <section className="bg-[#fafafa] rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
               <div className="p-6 border-b border-gray-100">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Knowledge Library</h2>
              </div>
              <div className="p-6 flex flex-col gap-4 bg-white">
                {library.map(item => (
                  <div key={item.id} className="flex items-center gap-4 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                      {item.iconType === 'file' && <FileText className="w-4 h-4" />}
                      {item.iconType === 'tool' && <Wrench className="w-4 h-4" />}
                      {item.iconType === 'trend' && <TrendingUp className="w-4 h-4" />}
                    </div>
                    <span className="font-bold text-gray-700 text-sm group-hover:text-indigo-600 transition-colors">{item.title}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-gray-900 text-sm">Internix</span> 
          <span>© 2024 Internix Enterprise. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Help Center</a>
          <a href="#" className="hover:text-gray-900 transition-colors">API Documentation</a>
        </div>
      </footer>
    </div>
  );
};

export default RecruiterLearning;
