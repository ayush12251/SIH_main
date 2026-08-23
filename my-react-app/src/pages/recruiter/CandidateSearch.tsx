import { useState } from 'react';
import { 
  Search, Activity, MapPin, Briefcase, 
  GraduationCap, ExternalLink, Check, MoreHorizontal, CheckCircle2 
} from 'lucide-react';
import { getCandidateShortlist, getCandidateDetails } from '../../services/candidateService';
import { RecruiterNavbar } from '../../components/RecruiterNavbar';

const CandidateSearch = () => {
  const shortlist = getCandidateShortlist();
  const [selectedId, setSelectedId] = useState<string>('1');
  const details = getCandidateDetails();

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 flex flex-col">
      {/* Navbar */}
      <RecruiterNavbar />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar - Shortlist */}
        <aside className="w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-white overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-bold text-gray-900">Shortlist</h2>
              <span className="text-xs font-semibold text-gray-400">24 Candidates</span>
            </div>
            
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
              <button className="whitespace-nowrap px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 text-[0.7rem] font-bold">Skill Match &gt; 80%</button>
              <button className="whitespace-nowrap px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 text-[0.7rem] font-bold">Grad Yr: 2024</button>
              <button className="whitespace-nowrap px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-500 text-[0.7rem] font-bold">+ Add Filter</button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Filter by name or keyword..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {shortlist.map((candidate) => (
              <div 
                key={candidate.id}
                onClick={() => setSelectedId(candidate.id)}
                className={`p-5 border-b border-gray-50 cursor-pointer transition-colors relative ${candidate.isSelected || candidate.id === selectedId ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
              >
                {(candidate.isSelected || candidate.id === selectedId) && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-md"></div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    {candidate.avatarUrl ? (
                      <img src={candidate.avatarUrl} alt={candidate.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                        {candidate.initials}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{candidate.name}</h4>
                      <p className="text-[0.65rem] text-gray-500 font-medium">{candidate.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${candidate.matchScore >= 80 ? 'text-emerald-500' : 'text-yellow-500'}`}>
                      {candidate.matchScore}% Match
                    </div>
                    <div className="text-[0.6rem] text-gray-400 font-medium mt-0.5">{candidate.appliedDate}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3 pl-13">
                  {candidate.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 py-0.5 text-[0.6rem] font-bold rounded ${
                        tag.type === 'missing' 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content - Candidate Details */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-8 lg:p-12 max-w-250">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 pb-8 border-b border-gray-100 gap-6">
              <div className="flex items-center gap-6">
                {details.avatarUrl ? (
                  <img src={details.avatarUrl} alt={details.name} className="w-24 h-24 rounded-full object-cover shadow-sm" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl">
                    {details.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{details.name}</h1>
                  <p className="text-gray-500 font-medium mb-3">{details.role}</p>
                  
                  <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {details.location}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> {details.yoe}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" /> {details.education}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 font-bold text-sm hover:bg-gray-50 shadow-sm transition-all">
                  Reject
                </button>
                <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 shadow-sm transition-all">
                  Move to Interview
                </button>
              </div>
            </div>

            {/* Grid Layout for Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column (Insight, Status, History) */}
              <div className="lg:col-span-2 flex flex-col gap-10">
                
                {/* AI Match Insight */}
                <div className="bg-[#f8f7fa] rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-4">
                    <Activity className="w-4 h-4 text-indigo-600" /> AI Match Insight
                  </h3>
                  <p className="text-sm text-gray-600 font-medium mb-4">{details.aiInsight.intro}</p>
                  <ul className="space-y-3">
                    {details.aiInsight.points.map((point, idx) => (
                      <li key={idx} className="text-sm">
                        <span className="font-bold text-gray-900">{point.title} </span>
                        <span className="text-gray-600 font-medium">{point.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Status */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-6">Application Status</h3>
                  <div className="flex items-center justify-between relative px-4">
                    <div className="absolute left-10 right-10 top-5 h-0.5 bg-gray-200 -z-10"></div>
                    <div className="absolute left-10 right-[50%] top-5 h-0.5 bg-emerald-500 -z-10"></div>
                    
                    <div className="flex flex-col items-center gap-2 z-10 bg-white px-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                        <Check className="w-5 h-5" />
                      </div>
                      <span className="text-[0.65rem] font-bold text-gray-900">Applied</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 z-10 bg-white px-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                        <Check className="w-5 h-5" />
                      </div>
                      <span className="text-[0.65rem] font-bold text-gray-900">Reviewed</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 z-10 bg-white px-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm">
                        <MoreHorizontal className="w-5 h-5" />
                      </div>
                      <span className="text-[0.65rem] font-bold text-blue-600">Interviewing</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 z-10 bg-white px-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="text-[0.65rem] font-bold text-gray-400">Offer</span>
                    </div>
                  </div>
                </div>

                {/* Interview History */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Interview History</h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-3 rounded-l-lg">Round</th>
                        <th className="px-4 py-3">Interviewer</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3 rounded-r-lg">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.interviewHistory.map((history, idx) => (
                        <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-gray-800">{history.round}</td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-600">{history.interviewer}</td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-500">{history.date}</td>
                          <td className="px-4 py-4 text-sm font-bold text-emerald-500">{history.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Right Column (Skills, Projects, References) */}
              <div className="flex flex-col gap-10">
                
                {/* Skills Compatibility */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Skills Compatibility</h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">
                        <th className="px-3 py-2 rounded-l-lg">Skill</th>
                        <th className="px-3 py-2 text-center">Required</th>
                        <th className="px-3 py-2 text-center rounded-r-lg">Candidate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.skills.map((skill, idx) => (
                        <tr key={idx} className="border-b border-gray-50 last:border-0">
                          <td className="px-3 py-3 text-xs font-semibold text-gray-800 leading-tight">
                            {skill.skill.includes('/') ? (
                              <>
                                {skill.skill.split(' / ')[0]} <br /> / {skill.skill.split(' / ')[1]}
                              </>
                            ) : skill.skill}
                          </td>
                          <td className="px-3 py-3 text-xs font-medium text-gray-500 text-center">{skill.required}</td>
                          <td className={`px-3 py-3 text-xs font-bold text-center ${skill.colorClass}`}>{skill.candidate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Key Projects */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Key Projects</h3>
                  <div className="flex flex-col gap-4">
                    {details.projects.map((project, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-blue-600 text-sm group-hover:text-blue-700">{project.title}</h4>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External References */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4">External References</h3>
                  <div className="bg-[#f8f9fc] rounded-xl p-5 border-l-4 border-emerald-500">
                    <h4 className="flex items-center gap-1.5 font-bold text-gray-900 text-xs mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {details.reference.authorTitle}
                    </h4>
                    <p className="text-xs text-gray-500 italic font-medium leading-relaxed">
                      {details.reference.quote}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default CandidateSearch;
