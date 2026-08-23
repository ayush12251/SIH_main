import { 
  Activity, Download, Wand2, PieChart, 
  ArrowUp, ArrowDown, MoreVertical
} from 'lucide-react';
import {
  getRecruitmentFunnel,
  getKPIs,
  getTopSkills,
  getStageVelocity,
  getDemographics,
  getLearningPrograms,
  getSourcingPerformance
} from '../../services/analyticsService';
import { RecruiterNavbar } from '../../components/RecruiterNavbar';

const RecruitmentAnalytics = () => {
  const funnel = getRecruitmentFunnel();
  const kpis = getKPIs();
  const topSkills = getTopSkills();
  const stageVelocity = getStageVelocity();
  const demographics = getDemographics();
  const learningPrograms = getLearningPrograms();
  const sourcing = getSourcingPerformance();

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-neutral-900 flex flex-col">
      {/* Navbar */}
      <RecruiterNavbar />

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-10 max-w-350 w-full mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[1.8rem] font-bold text-gray-900 mb-1">Recruitment Analytics</h1>
            <p className="text-sm text-gray-500 font-medium">Comprehensive performance metrics across the hiring lifecycle.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold text-sm hover:bg-gray-50 shadow-sm transition-all">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 border border-indigo-600 rounded-xl text-white font-bold text-sm hover:bg-indigo-700 shadow-sm transition-all">
              <Wand2 className="w-4 h-4" /> Custom Query
            </button>
          </div>
        </div>

        {/* Top Section: Funnel & KPIs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Recruitment Funnel */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-bold text-gray-900 text-lg">Recruitment Funnel</h3>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">YTD 2024</span>
            </div>
            
            <div className="flex items-end h-64 gap-4">
              {funnel.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end group">
                  {item.count && (
                    <div className="text-center font-bold text-white z-10 -mb-8 drop-shadow-sm text-sm">
                      {item.count}
                    </div>
                  )}
                  <div className={`w-full rounded-t-lg ${item.color} ${item.height} transition-all duration-300 hover:opacity-90`}></div>
                  <div className="text-center text-xs font-semibold text-gray-500 mt-4 border-t border-gray-100 pt-3">
                    {item.stage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="flex flex-col gap-6">
            {/* Retention */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex-1">
              <h3 className="font-semibold text-gray-500 text-sm mb-2">{kpis.retention.title}</h3>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-black text-gray-900">{kpis.retention.value}</span>
                <span className="text-2xl font-bold text-gray-900">{kpis.retention.unit}</span>
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-md ${kpis.retention.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {kpis.retention.isPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                  {kpis.retention.change}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">{kpis.retention.description}</p>
            </div>

            <div className="flex gap-6 flex-1">
              {/* Time to Fill */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-gray-500 text-xs mb-2">{kpis.timeToFill.title}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-black text-gray-900">{kpis.timeToFill.value}</span>
                  <span className="text-sm font-bold text-gray-500">{kpis.timeToFill.unit}</span>
                </div>
                <span className={`inline-flex items-center w-fit text-[0.65rem] font-bold px-1.5 py-0.5 rounded ${kpis.timeToFill.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} mb-2`}>
                  {kpis.timeToFill.isPositive ? <ArrowDown className="w-3 h-3 mr-0.5" /> : <ArrowUp className="w-3 h-3 mr-0.5" />}
                  {kpis.timeToFill.change}
                </span>
                <p className="text-[0.65rem] text-gray-400 font-medium leading-tight">{kpis.timeToFill.description}</p>
              </div>
              
              {/* Offer Acceptance */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-gray-500 text-xs mb-2">{kpis.offerAcceptance.title}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-black text-gray-900">{kpis.offerAcceptance.value}</span>
                  <span className="text-sm font-bold text-gray-900">{kpis.offerAcceptance.unit}</span>
                </div>
                <span className={`inline-flex items-center w-fit text-[0.65rem] font-bold px-1.5 py-0.5 rounded ${kpis.offerAcceptance.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} mb-2`}>
                  {kpis.offerAcceptance.isPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                  {kpis.offerAcceptance.change}
                </span>
                <p className="text-[0.65rem] text-gray-400 font-medium leading-tight">{kpis.offerAcceptance.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Skills, Velocity, Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Top Skill Demand */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] row-span-2">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-gray-900 text-lg">Top Skill Demand</h3>
              <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
            
            <div className="flex flex-col gap-8">
              {topSkills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-800">{skill.skill}</span>
                    <span className="font-medium text-gray-500">{skill.percentage}% of postings</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`${skill.color} h-full rounded-full`} style={{ width: `${skill.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stage Velocity */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Stage Velocity (Avg. Days)</h3>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Last 90 Days</span>
            </div>
            <div className="flex gap-4 h-32 items-end">
              {stageVelocity.map((stage, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end">
                  <div className="bg-gray-100 rounded-t-lg relative flex flex-col justify-end" style={{ height: '100%' }}>
                    <div className="absolute top-3 w-full text-center text-xs font-bold text-gray-900">{stage.days}d</div>
                    <div className={`w-full rounded-b-lg ${stage.color}`} style={{ height: `${(stage.days / 15) * 100}%`, minHeight: '20%' }}></div>
                  </div>
                  <div className="text-center text-[0.65rem] font-semibold text-gray-500 mt-2">
                    {stage.stage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Demographics */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
             <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Candidate Demographics</h3>
              <PieChart className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
            <div className="flex flex-col gap-5">
               {demographics.map((demo, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-gray-700">{demo.group}</span>
                    <span className="font-semibold text-gray-500">{demo.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${demo.color} h-full rounded-full`} style={{ width: `${demo.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Tables */}
        <div className="flex flex-col gap-6">
          
          {/* Learning Program Completion */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Learning Program Completion</h3>
              <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3 rounded-l-lg">Program Name</th>
                    <th className="px-4 py-3 text-right">Enrolled</th>
                    <th className="px-4 py-3 text-right">Completion Rate</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {learningPrograms.map((prog, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">{prog.name}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500 text-right">{prog.enrolled}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500 text-right">{prog.completionRate}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[0.65rem] font-bold ${prog.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${prog.status === 'Active' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                          {prog.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sourcing Performance */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Sourcing Performance</h3>
              <button className="flex items-center gap-1.5 text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3 rounded-l-lg">Source</th>
                    <th className="px-4 py-3 text-right">Applicants</th>
                    <th className="px-4 py-3 text-right">Conversion Rate</th>
                    <th className="px-4 py-3 text-right rounded-r-lg">Cost Per Hire</th>
                  </tr>
                </thead>
                <tbody>
                  {sourcing.map((src, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">{src.source}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500 text-right">{src.applicants}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500 text-right">{src.conversionRate}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-500 text-right">{src.costPerHire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default RecruitmentAnalytics;
