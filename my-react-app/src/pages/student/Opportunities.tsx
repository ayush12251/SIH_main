import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  ExternalLink 
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { mockOpportunityStats, mockOpportunities } from '../../services/opportunities.mock';

const MatchScoreRing = ({ score }: { score: number }) => {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="48" height="48" className="shrink-0">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle
        cx="24" cy="24" r={r}
        fill="none" stroke="#4f46e5" strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 24 24)"
      />
      <text x="24" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fill="#4f46e5">
        {score}%
      </text>
    </svg>
  );
};

const Opportunities = () => {
  const stats = mockOpportunityStats;
  const jobs = mockOpportunities;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col">
        
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-500">Saved</span>
            <span className="text-4xl font-bold text-gray-900">{stats.saved}</span>
          </Card>
          <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-500">Applied</span>
            <span className="text-4xl font-bold text-gray-900">{stats.applied}</span>
          </Card>
          <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-500">Interviewing</span>
            <span className="text-4xl font-bold text-indigo-600">{stats.interviewing}</span>
          </Card>
          <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-500">Offers</span>
            <span className="text-4xl font-bold text-emerald-500">{stats.offers}</span>
          </Card>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Opportunities &amp; Tracker</h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8 px-2">
          <button className="text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 pb-3 px-2">
            Recommended
          </button>
          <button className="text-sm font-bold text-gray-500 hover:text-gray-900 pb-3 px-2 transition-colors">
            Applied/Tracking
          </button>
        </div>

        <div className="flex gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="w-56 shrink-0 flex flex-col gap-8">
            
            {/* Role Type */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">Role Type</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-white" />
                  <span className="text-sm font-medium text-gray-700">Full-time</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white" />
                  <span className="text-sm font-bold text-gray-900">Internship</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-white" />
                  <span className="text-sm font-medium text-gray-700">Contract</span>
                </label>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">Location</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white" />
                  <span className="text-sm font-bold text-gray-900">Remote</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-white" />
                  <span className="text-sm font-medium text-gray-700">Hybrid</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-white" />
                  <span className="text-sm font-medium text-gray-700">On-site</span>
                </label>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-gray-100 rounded-2xl p-5 mt-4">
              <h4 className="font-bold text-gray-900 text-sm mb-2">Quick Tip</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Roles with a match score above 85% are 3x more likely to result in an interview.
              </p>
            </div>
            
          </aside>

          {/* Right Main Area */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Search and Filters Bar */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search roles, companies, or skills..." 
                  className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Sort by: Match Score
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Job List */}
            <div className="flex flex-col gap-4 mt-2">
              {jobs.map((job) => (
                <Card key={job.id} radius="2xl" shadow="sm" padding="normal" className={`relative flex items-center justify-between overflow-hidden ${job.isTrending ? 'pt-10' : ''}`}>
                  
                  {job.isTrending && (
                    <div className="absolute top-0 left-0 bg-indigo-500 text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-br-xl">
                      Trending
                    </div>
                  )}

                  <div className="flex-1 pr-8">
                    {job.contextBadge && (
                      <span className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3">
                        {job.contextBadge}
                      </span>
                    )}
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
                    
                    <div className="flex items-center flex-wrap gap-y-2 gap-x-4 text-xs font-semibold text-gray-500 mb-5">
                      <span className="text-gray-900">{job.company}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {job.location} ({job.type})
                      </div>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {job.term}
                      </div>
                      {job.duration && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {job.duration}
                          </div>
                        </>
                      )}
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1.5">
                        <DollarSign size={14} />
                        {job.pay}
                      </div>
                      {job.posted && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span>Posted {job.posted}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-400">Matched because of:</span>
                      <div className="flex items-center gap-2">
                        {job.skills.map((skill) => (
                          <span key={skill.name} className="bg-green-100 text-green-700 text-[11px] font-bold px-3 py-1 rounded-full">
                            {skill.name}
                          </span>
                        ))}
                        {job.extraSkillsCount && (
                          <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-3 py-1 rounded-full">
                            +{job.extraSkillsCount} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end border-l border-gray-100 pl-8 ml-4">
                    <div className="flex items-center gap-4 mb-5">
                      <MatchScoreRing score={job.matchScore} />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">Match</span>
                        <button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800">
                          View details
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        <Bookmark size={16} />
                      </button>
                      <button className="bg-indigo-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors w-32 text-center">
                        Apply Now
                      </button>
                    </div>
                    {job.isTrending && (
                      <button className="text-[10px] font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1 mt-3">
                        Quick View <ExternalLink size={10} />
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <button className="border border-gray-200 bg-white text-gray-900 text-sm font-bold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                Load More Opportunities
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-gray-900">
            © 2024 CareerPath Enterprise. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-semibold text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Opportunities;
