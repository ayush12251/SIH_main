import { useEffect, useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  Briefcase,
  FileText,
  UserCheck,
  Award
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { useToast } from '../../context/ToastContext';
import { apiRequest } from '../../services/api';
import type { JobOpportunity } from '../../services/opportunities.mock';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Recommended' | 'Applied/Tracking'>('Recommended');
  const [roleFilters, setRoleFilters] = useState<string[]>([]);
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const { showToast } = useToast();
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    Promise.all([
      apiRequest<{ opportunities: Array<{ id: string; title: string; company: string; location: string; type: string; term: string; pay: string; required_skills: string[]; match_score: number }> }>('/student/opportunities'),
      apiRequest<{ applications: Array<{ job_id: string }> }>('/student/applications'),
    ]).then(([opportunityData, applicationData]) => {
      setJobs(opportunityData.opportunities.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        term: job.term,
        pay: job.pay,
        matchScore: job.match_score,
        skills: job.required_skills.map(name => ({ name, matched: true })),
        posted: 'Recently',
      })));
      setAppliedJobIds(new Set(applicationData.applications.map(application => application.job_id)));
    }).catch(() => showToast('error', 'Could not load opportunities', 'Please try again in a moment.'));
  }, [showToast]);

  const hasApplied = (jobId: string) => appliedJobIds.has(jobId);
  const stats = {
    saved: savedJobs.size,
    applied: appliedJobIds.size,
    interviewing: 0,
    offers: 0,
  };

  const toggleRoleFilter = (role: string) => {
    setRoleFilters(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const toggleLocationFilter = (loc: string) => {
    setLocationFilters(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
  };

  const toggleSavedJob = (jobId: string) => {
    setSavedJobs(prev => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'Applied/Tracking' && !hasApplied(job.id)) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(query);
      const matchesCompany = job.company.toLowerCase().includes(query);
      const matchesSkill = job.skills.some(s => s.name.toLowerCase().includes(query));
      if (!matchesTitle && !matchesCompany && !matchesSkill) return false;
    }

    if (roleFilters.length > 0) {
      const isIntern = job.title.toLowerCase().includes('intern');
      const jobRole = isIntern ? 'Internship' : 'Full-time';
      if (!roleFilters.includes(jobRole) && !roleFilters.includes('Contract')) return false;
    }

    if (locationFilters.length > 0) {
      if (!locationFilters.includes(job.type)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card radius="2xl" shadow="sm" padding="normal" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
              <Briefcase className="text-indigo-600" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Saved</span>
              <span className="text-xl font-bold text-gray-900">{stats.saved}</span>
            </div>
          </Card>
          <Card radius="2xl" shadow="sm" padding="normal" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Applied</span>
              <span className="text-xl font-bold text-gray-900">{stats.applied}</span>
            </div>
          </Card>
          <Card radius="2xl" shadow="sm" padding="normal" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
              <UserCheck className="text-purple-600" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interviewing</span>
              <span className="text-xl font-bold text-gray-900">{stats.interviewing}</span>
            </div>
          </Card>
          <Card radius="2xl" shadow="sm" padding="normal" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
              <Award className="text-emerald-600" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Offers</span>
              <span className="text-xl font-bold text-gray-900">{stats.offers}</span>
            </div>
          </Card>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Opportunities &amp; Tracker</h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8 px-2">
          <button 
            onClick={() => setActiveTab('Recommended')}
            className={`text-sm font-bold pb-3 px-2 transition-colors ${activeTab === 'Recommended' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Recommended
          </button>
          <button 
            onClick={() => setActiveTab('Applied/Tracking')}
            className={`text-sm font-bold pb-3 px-2 transition-colors ${activeTab === 'Applied/Tracking' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Applied/Tracking
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-56 shrink-0 flex flex-col gap-8">
            
            {/* Role Type */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">Role Type</h3>
              <div className="flex flex-col gap-3">
                {['Full-time', 'Internship', 'Contract'].map(role => (
                  <label key={role} className="flex items-center gap-3 cursor-pointer" onClick={(e) => { e.preventDefault(); toggleRoleFilter(role); }}>
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${roleFilters.includes(role) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                      {roleFilters.includes(role) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-sm ${roleFilters.includes(role) ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">Location</h3>
              <div className="flex flex-col gap-3">
                {['Remote', 'Hybrid', 'On-site'].map(loc => (
                  <label key={loc} className="flex items-center gap-3 cursor-pointer" onClick={(e) => { e.preventDefault(); toggleLocationFilter(loc); }}>
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${locationFilters.includes(loc) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                      {locationFilters.includes(loc) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-sm ${locationFilters.includes(loc) ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{loc}</span>
                  </label>
                ))}
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
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roles, companies, or skills..." 
                  className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                />
              </div>
              <div className="flex w-full sm:w-auto gap-4">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
              </div>
            </div>

            {/* Job List */}
            <div className="flex flex-col gap-4 mt-2">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                  <p className="text-gray-500 font-medium">No opportunities found matching your criteria.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setRoleFilters([]); setLocationFilters([]); }}
                    className="mt-4 text-indigo-600 font-bold hover:text-indigo-800"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => (
                <Card key={job.id} radius="2xl" shadow="sm" padding="normal" className={`relative flex flex-col overflow-hidden ${job.isTrending ? 'pt-10' : ''}`}>
                  
                  {job.isTrending && (
                    <div className="absolute top-0 left-0 bg-indigo-500 text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-br-xl">
                      Trending
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
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
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-gray-400">Matched:</span>
                        <div className="flex items-center gap-2 flex-wrap">
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

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-8">
                      <div className="flex items-center gap-4">
                        <MatchScoreRing score={job.matchScore} />
                        <div className="hidden sm:flex flex-col">
                          <span className="text-sm font-bold text-gray-900">Match</span>
                          <button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-400">
                      Posted {job.posted}
                    </span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleSavedJob(job.id)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${savedJobs.has(job.id) ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                      >
                        <Bookmark size={16} fill={savedJobs.has(job.id) ? 'currentColor' : 'none'} />
                      </button>
                      {hasApplied(job.id) ? (
                        <button 
                          disabled
                          className="bg-gray-100 text-gray-500 border border-gray-200 text-sm font-bold px-6 py-2.5 rounded-full cursor-not-allowed"
                        >
                          Applied
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            apiRequest(`/student/opportunities/${job.id}/apply`, { method: 'POST' })
                              .then(() => {
                                setAppliedJobIds(previous => new Set(previous).add(job.id));
                                showToast('success', 'Application Submitted', `You have successfully applied for the ${job.title} role.`);
                              })
                              .catch(() => showToast('error', 'Application failed', 'You may have already applied to this opportunity.'));
                          }}
                          className="bg-indigo-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              )))}
            </div>
            
            {filteredJobs.length > 0 && (
              <div className="flex justify-center mt-4">
                <button className="border border-gray-200 bg-white text-gray-900 text-sm font-bold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                  Load More Opportunities
                </button>
              </div>
            )}

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
