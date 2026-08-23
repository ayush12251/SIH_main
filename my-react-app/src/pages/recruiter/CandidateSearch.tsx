import React, { useState } from 'react';
import { 
  Activity, MapPin, Briefcase, 
  GraduationCap,
  ChevronRight, ChevronLeft, X
} from 'lucide-react';
import { RecruiterNavbar } from '../../components/RecruiterNavbar';
import { useATS, Application, ApplicationStatus, CandidateProfile } from '../../context/ATSContext';

const COLUMNS: { id: ApplicationStatus; title: string; color: string }[] = [
  { id: 'Applied', title: 'Applied', color: 'bg-gray-100 border-gray-200' },
  { id: 'Reviewed', title: 'Reviewed', color: 'bg-blue-50 border-blue-200' },
  { id: 'Interviewing', title: 'Interviewing', color: 'bg-purple-50 border-purple-200' },
  { id: 'Offered', title: 'Offered', color: 'bg-emerald-50 border-emerald-200' },
];

const CandidateDetailsModal: React.FC<{ 
  details: CandidateProfile; 
  onClose: () => void;
}> = ({ details, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8 lg:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 pb-8 border-b border-gray-100 gap-6">
            <div className="flex items-center gap-6">
              {details.avatarUrl ? (
                <img src={details.avatarUrl} alt={details.name} className="w-24 h-24 rounded-full object-cover shadow-sm" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl">
                  {details.initials || details.name.charAt(0)}
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
          </div>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column (Insight) */}
            <div className="flex flex-col gap-10">
              
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

            </div>

            {/* Right Column (Skills) */}
            <div className="flex flex-col gap-10">
              
              {/* Skills Compatibility */}
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Skills Compatibility</h3>
                <div className="overflow-x-auto">
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
                      {details.skills.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-3 py-4 text-center text-sm text-gray-400 font-medium">
                            No detailed skills data available for this candidate yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const CandidateSearch = () => {
  const { getApplicationsForRecruiter, updateApplicationStatus } = useATS();
  const applications = getApplicationsForRecruiter();
  
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);

  const moveApplication = (app: Application, direction: 'forward' | 'backward') => {
    const currentIndex = COLUMNS.findIndex(col => col.id === app.status);
    if (direction === 'forward' && currentIndex < COLUMNS.length - 1) {
      updateApplicationStatus(app.id, COLUMNS[currentIndex + 1].id);
    } else if (direction === 'backward' && currentIndex > 0) {
      updateApplicationStatus(app.id, COLUMNS[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-neutral-900 flex flex-col">
      {/* Navbar */}
      <RecruiterNavbar />

      {/* Kanban Board Container */}
      <main className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        
        <div className="mb-6 flex flex-col md:flex-row justify-between md:items-end gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Applicant Pipeline</h1>
            <p className="text-sm text-gray-500 font-medium">Manage candidates across all active job postings.</p>
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start">
          {COLUMNS.map((col, idx) => {
            const columnApps = applications.filter(app => app.status === col.id);
            
            return (
              <div key={col.id} className={`w-80 shrink-0 flex flex-col max-h-full rounded-2xl border ${col.color}`}>
                {/* Column Header */}
                <div className="p-4 border-b border-black/5 bg-black/5 rounded-t-2xl flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-gray-900 text-sm">{col.title}</h3>
                  <span className="text-xs font-bold bg-white text-gray-600 px-2 py-0.5 rounded-full shadow-sm">
                    {columnApps.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-3">
                  {columnApps.map(app => (
                    <div key={app.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          {app.candidate.avatarUrl ? (
                            <img src={app.candidate.avatarUrl} alt={app.candidate.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                              {app.candidate.initials || app.candidate.name.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 
                              onClick={() => setSelectedCandidate(app.candidate)}
                              className="font-bold text-gray-900 text-sm cursor-pointer hover:text-indigo-600 hover:underline truncate"
                            >
                              {app.candidate.name}
                            </h4>
                            <p className="text-[0.65rem] text-gray-500 font-medium truncate">{app.jobTitle}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <div className={`text-xs font-bold ${app.candidate.matchScore >= 80 ? 'text-emerald-500' : 'text-yellow-500'}`}>
                            {app.candidate.matchScore}% Match
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {app.candidate.tags.slice(0,3).map((tag, i) => (
                          <span 
                            key={i} 
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

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <button 
                          disabled={idx === 0}
                          onClick={() => moveApplication(app, 'backward')}
                          className={`p-1.5 rounded-full transition-colors ${idx === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button 
                          onClick={() => setSelectedCandidate(app.candidate)}
                          className="text-[0.7rem] font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          View Details
                        </button>

                        <button 
                          disabled={idx === COLUMNS.length - 1}
                          onClick={() => moveApplication(app, 'forward')}
                          className={`p-1.5 rounded-full transition-colors ${idx === COLUMNS.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                  
                  {columnApps.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm font-medium text-gray-400">No candidates in this stage.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal Overlay */}
      {selectedCandidate && (
        <CandidateDetailsModal 
          details={selectedCandidate} 
          onClose={() => setSelectedCandidate(null)} 
        />
      )}
    </div>
  );
};

export default CandidateSearch;
