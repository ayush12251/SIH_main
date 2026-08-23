import { 
  Search, Download, Plus, 
  Filter, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import { 
  getPostingStats, getAttentionItems 
} from '../../services/postingsService';
import { RecruiterNavbar } from '../../components/RecruiterNavbar';
import { useState } from 'react';
import { useJobs } from '../../context/JobsContext';
import { CreatePostingModal } from '../../components/recruiter/CreatePostingModal';

const JobPostings = () => {
  const stats = getPostingStats();
  const { getJobsForRecruiter } = useJobs();
  const postings = getJobsForRecruiter();
  const attentionItems = getAttentionItems();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-neutral-900 flex flex-col">
      {/* Navbar */}
      <RecruiterNavbar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 max-w-7xl w-full mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-[1.8rem] font-bold text-gray-900 mb-1">Posting Opportunities</h1>
            <p className="text-sm text-gray-500 font-medium">Manage active job postings or create new opportunities.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 font-bold text-sm hover:bg-gray-50 shadow-sm transition-all">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 border border-indigo-600 rounded-full text-white font-bold text-sm hover:bg-indigo-700 shadow-sm transition-all">
              <Plus className="w-4 h-4" /> Create Posting
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
          <button className="pb-4 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600">
            Active Postings
          </button>
          <button className="pb-4 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors border-b-2 border-gray-100">
            Create New Posting
          </button>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-2">Active Postings</h3>
            <div className="text-3xl font-black text-gray-900">{stats.activePostings}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Applicants</h3>
            <div className="text-3xl font-black text-gray-900">{stats.totalApplicants}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-2">New Matches (24H)</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-gray-900">{stats.newMatches}</span>
              <span className="flex items-center text-[0.7rem] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3 mr-1" /> {stats.newMatchesChange}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-2">Avg. Time to Hire</h3>
            <div className="text-3xl font-black text-gray-900">{stats.avgTimeToHire}</div>
          </div>
        </div>

        {/* Main Grid: Postings List (Left) + Sidebars (Right) */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Postings Table */}
          <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden flex flex-col">
            
            {/* Table Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white gap-4 sm:gap-0">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search postings..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors"
                />
              </div>
              <button className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-200">
                <thead>
                  <tr className="bg-white text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4">Posting Title</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4 text-center">Applicants</th>
                    <th className="px-6 py-4 text-center">Matches<br/>(&gt;80%)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Last Updated</th>
                    <th className="px-6 py-4">Performance</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {postings.map((post, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <span className="font-bold text-indigo-600 text-sm cursor-pointer hover:underline block max-w-45 leading-tight">
                          {post.title}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-500">{post.department}</td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-900 text-center">{post.applicants}</td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-900 text-center">{post.matches}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[0.65rem] font-bold ${
                          post.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-500">{post.lastUpdated}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 font-bold text-sm">
                          {post.performanceTrend === 'up' && (
                            <>
                              <span className="text-emerald-500">{post.performance}</span>
                              <TrendingUp className="w-4 h-4 text-emerald-500" />
                            </>
                          )}
                          {post.performanceTrend === 'down' && (
                            <>
                              <span className="text-red-500">{post.performance}</span>
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            </>
                          )}
                          {post.performanceTrend === 'flat' && (
                            <>
                              <span className="text-gray-500">{post.performance}</span>
                              <Minus className="w-4 h-4 text-gray-400" />
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <button className="text-indigo-600 font-bold text-xs hover:text-indigo-800 transition-colors">Edit</button>
                          <button className="text-gray-400 font-bold text-xs hover:text-gray-600 transition-colors">Preview</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Showing 1-6 of 24 postings</span>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6">
            
            {/* Attention Required */}
            <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <h2 className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider mb-4">Attention Required</h2>
              
              <div className="flex flex-col gap-3">
                {attentionItems.map(item => (
                  <div key={item.id} className="relative bg-gray-50 rounded-xl p-4 overflow-hidden group cursor-pointer hover:bg-gray-100 transition-colors">
                    {/* Color indicator line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.type === 'urgent' ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
                    
                    <h3 className="font-bold text-gray-900 text-sm mb-1 ml-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 font-medium ml-2 leading-relaxed">{item.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Hiring Trends */}
            <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <h2 className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider mb-6">Hiring Trends (30D)</h2>
              
              {/* Mock Bar Chart */}
              <div className="flex items-end justify-between h-32 gap-1.5 mb-6">
                {/* Randomly generated heights to match aesthetic */}
                <div className="w-full bg-indigo-300 rounded-sm h-[30%] hover:opacity-80 transition-opacity"></div>
                <div className="w-full bg-indigo-400 rounded-sm h-[45%] hover:opacity-80 transition-opacity"></div>
                <div className="w-full bg-indigo-300 rounded-sm h-[35%] hover:opacity-80 transition-opacity"></div>
                <div className="w-full bg-indigo-500 rounded-sm h-[70%] hover:opacity-80 transition-opacity"></div>
                <div className="w-full bg-indigo-600 rounded-sm h-[90%] hover:opacity-80 transition-opacity"></div>
                <div className="w-full bg-indigo-500 rounded-sm h-[60%] hover:opacity-80 transition-opacity"></div>
                <div className="w-full bg-indigo-600 rounded-sm h-[80%] hover:opacity-80 transition-opacity"></div>
              </div>
              
              <p className="text-[0.75rem] text-gray-600 font-medium text-center leading-relaxed max-w-50 mx-auto">
                Application volume is up <br/><span className="font-bold">15%</span>
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-[#f8f9fc] px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <span>© 2024 Internix Enterprise. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">API Documentation</a>
        </div>
      </footer>

      {/* Modals */}
      <CreatePostingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default JobPostings;
