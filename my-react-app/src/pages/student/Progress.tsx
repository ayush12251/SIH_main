import { useEffect, useState } from 'react';
import { 
  Cloud, 
  Database,
  Check,
  Hourglass,
  Lock,
  Clock,
  BarChart,
  CalendarDays,
  TrendingUp,
  Users,
  RefreshCw,
  ChevronDown,
  BarChart2,
  Briefcase
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { apiRequest } from '../../services/api';
import {
  mockActiveCourses,
  mockPathSteps,
  mockRecommendedCerts,
  mockLearningHours,
  mockUpcomingAssessments,
  mockMarketTrends,
  mockNetworkActivity
} from '../../services/progress.mock';

const IconMap = {
  cloud: <Cloud size={20} className="text-indigo-500" />,
  database: <Database size={20} className="text-indigo-500" />,
};

const Progress = () => {
  const [applications, setApplications] = useState<Array<{ id: string; jobTitle: string; company: string; status: string; appliedAt: string }>>([]);

  useEffect(() => {
    apiRequest<{ applications: Array<{ id: string; job_title: string; company: string; status: string; applied_at: string }> }>('/student/applications')
      .then(data => setApplications(data.applications.map(application => ({
        id: application.id,
        jobTitle: application.job_title,
        company: application.company,
        status: application.status,
        appliedAt: new Date(application.applied_at).toLocaleDateString(),
      }))))
      .catch(() => setApplications([]));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        
        {/* Page Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">My Learning Progress</h1>
          <p className="text-sm text-gray-500">Track your active certifications and required skill modules.</p>
        </div>

        <div className="flex gap-6 items-start">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Active Courses */}
            <div className="grid grid-cols-2 gap-6">
              {mockActiveCourses.map(course => (
                <Card key={course.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col relative">
                  <span className="absolute top-5 right-5 bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full">
                    {course.statusText}
                  </span>
                  
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                    {IconMap[course.icon as keyof typeof IconMap]}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-xs text-gray-500 mb-8">Provider: {course.provider}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                      <span className="text-gray-500">{course.moduleText}</span>
                      <span className="text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                      <div 
                        className={`h-full rounded-full ${course.isReadyForFinal ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${course.progress}%` }} 
                      />
                    </div>
                    
                    {course.isReadyForFinal ? (
                      <button className="w-full bg-indigo-600 text-white text-xs font-bold py-3 rounded-full hover:bg-indigo-700 transition-colors">
                        Complete Project
                      </button>
                    ) : (
                      <button className="w-full bg-white border border-gray-200 text-gray-900 text-xs font-bold py-3 rounded-full hover:bg-gray-50 transition-colors">
                        Continue Learning
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Skill Path Progress */}
            <Card radius="2xl" shadow="sm" padding="large">
              <div className="flex items-start justify-between mb-10">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Skill Path Progress</h2>
                  <p className="text-sm text-gray-500">Full-Stack Developer Path</p>
                </div>
                <span className="bg-cyan-50 text-cyan-700 text-[10px] font-bold px-3 py-1 rounded-full">
                  3 of 5 Completed
                </span>
              </div>

              {/* Timeline */}
              <div className="relative flex items-center justify-between px-4">
                {/* Connecting lines */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100 -z-10" />
                <div className="absolute top-4 left-4 h-0.5 bg-indigo-600 -z-10 transition-all duration-500" style={{ width: '50%' }} />

                {mockPathSteps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white ${
                      step.state === 'completed' ? 'border-indigo-600 bg-indigo-600 text-white' :
                      step.state === 'current' ? 'border-indigo-600 text-indigo-600' :
                      'border-gray-200 text-gray-400'
                    }`}>
                      {step.state === 'completed' && <Check size={14} strokeWidth={3} />}
                      {step.state === 'current' && <Hourglass size={14} />}
                      {step.state === 'locked' && <Lock size={14} />}
                    </div>
                    <span className={`text-[11px] font-bold ${
                      step.state === 'completed' ? 'text-gray-900' :
                      step.state === 'current' ? 'text-gray-900' :
                      'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* My Applications (ATS) */}
            <Card radius="2xl" shadow="sm" padding="large">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">My Applications</h2>
                  <p className="text-sm text-gray-500">Track the real-time status of your job applications</p>
                </div>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full">
                  {applications.length} Active
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {applications.map(app => (
                  <div key={app.id} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{app.jobTitle}</h3>
                          <p className="text-xs font-medium text-gray-500">{app.company}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                        Applied {app.appliedAt}
                      </span>
                    </div>

                    {/* Progress Timeline */}
                    <div className="relative flex items-center justify-between px-2">
                      <div className="absolute top-2.5 left-6 right-6 h-0.5 bg-gray-100 -z-10" />
                      
                      {['Applied', 'Reviewed', 'Interviewing', 'Offered'].map((stage, idx, arr) => {
                        const stageIndex = arr.indexOf(app.status);
                        const isCompleted = idx <= stageIndex;
                        const isCurrent = idx === stageIndex;
                        
                        return (
                          <div key={stage} className="flex flex-col items-center gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                              isCompleted 
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : 'bg-white border-gray-200'
                            }`}>
                              {isCompleted && <Check size={10} strokeWidth={4} />}
                            </div>
                            <span className={`text-[10px] font-bold ${
                              isCurrent ? 'text-indigo-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                {applications.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-sm font-medium text-gray-500">You haven't applied to any roles yet.</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Recommended Certifications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recommended Certifications</h2>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                    Technical Skills <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                    All Providers <ChevronDown size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {mockRecommendedCerts.map(cert => (
                  <Card key={cert.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col relative">
                    <span className="absolute top-5 right-5 bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full">
                      Certificate
                    </span>
                    
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4 text-xl font-bold text-gray-700">
                      {cert.providerIconInitial}
                    </div>
                    
                    <h3 className="text-base font-bold text-gray-900 mb-1">{cert.title}</h3>
                    <p className="text-xs text-gray-500 mb-5">{cert.provider}</p>
                    
                    <div className="flex flex-col gap-2 text-[11px] font-semibold text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={14} /> {cert.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart size={14} /> {cert.level}
                      </div>
                    </div>
                    
                    <button className="mt-auto w-full bg-indigo-600 text-white text-xs font-bold py-3 rounded-full hover:bg-indigo-700 transition-colors">
                      Enroll Now
                    </button>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="w-[320px] shrink-0 flex flex-col gap-6">
            
            {/* Learning Hours */}
            <Card radius="2xl" shadow="sm" padding="normal">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Learning Hours</h3>
                  <p className="text-xs text-gray-500">This Week</p>
                </div>
                <BarChart2 size={18} className="text-gray-400" />
              </div>
              
              <div className="flex items-end justify-between h-24 mb-6 gap-2">
                {mockLearningHours.bars.map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className={`w-full rounded-sm ${i === 3 ? 'bg-indigo-600' : i < 5 ? 'bg-indigo-300' : 'bg-gray-200'}`} 
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{mockLearningHours.days[i]}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                <span className="text-sm font-bold text-gray-900">Total: {mockLearningHours.total}</span>
                <span className="text-[11px] font-bold text-emerald-500">{mockLearningHours.trend}</span>
              </div>
            </Card>

            {/* Upcoming Assessments */}
            <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays size={18} className="text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">Upcoming Assessments</h3>
              </div>
              
              {mockUpcomingAssessments.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-3 flex items-center gap-4 border border-transparent hover:border-gray-200 transition-colors">
                  <div className="bg-white border border-gray-200 rounded-lg w-12 h-12 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-gray-400">{item.date.month}</span>
                    <span className="text-sm font-black text-gray-900">{item.date.day}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-[10px] font-semibold text-gray-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </Card>

            {/* Market Trends */}
            <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">Market Trends</h3>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-1">
                Acquiring these high-demand skills significantly increases your internship match rate.
              </p>
              <div className="flex flex-col gap-3">
                {mockMarketTrends.map((trend, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span className="text-xs font-semibold text-gray-700">{trend.skill}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      {trend.boost}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trending in your Network */}
            <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <Users size={18} className="text-gray-700" />
                <h3 className="text-base font-bold text-gray-900">Trending in your Network</h3>
              </div>
              <div className="flex flex-col gap-4">
                {mockNetworkActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <img src={activity.avatarUrl} alt={activity.name} className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
                    <p className="text-xs text-gray-700 leading-relaxed pt-0.5">
                      <strong className="text-gray-900">{activity.name}</strong> {activity.action} <strong className="text-indigo-600">{activity.target}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sync with ATS */}
            <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-3 bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">Sync with ATS</h3>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-2">
                Automatically update your profile with newly acquired certifications to improve your ATS score.
              </p>
              <button className="w-full bg-white border border-gray-200 text-gray-900 text-xs font-bold py-2.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                Sync Profile
              </button>
            </Card>

          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-bold text-gray-900">
            © 2024 CareerPath Enterprise. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-bold text-gray-500">
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

export default Progress;
