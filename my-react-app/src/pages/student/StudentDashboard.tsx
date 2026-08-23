import { Link } from 'react-router-dom';
import {
  TrendingUp,
  CheckCircle2,
  ClipboardList,
  Compass,
  Briefcase,
  LayoutDashboard,
  Code2,
  User,
  Send,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { useStudent } from '../../context/StudentContext';
import { mockActivity } from '../../services/studentDashboard.mock';

// Icon map for journey cards
const iconMap: Record<string, React.ReactNode> = {
  clipboard: <ClipboardList size={20} className="text-indigo-500" />,
  compass: <Compass size={20} className="text-indigo-500" />,
  briefcase: <Briefcase size={20} className="text-indigo-500" />,
  layout: <LayoutDashboard size={20} className="text-indigo-500" />,
};

const recIconMap: Record<string, React.ReactNode> = {
  ml: <TrendingUp size={18} className="text-green-500" />,
  code: <Code2 size={18} className="text-indigo-500" />,
};

const StudentDashboard = () => {
  const { profile, pendingTask, journeyCards, recommendations, activity, mentors, isLoading } = useStudent();

  if (isLoading || !profile || !pendingTask) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">

        {/* Profile Card */}
        <Card radius="2xl" shadow="sm" padding="none" className="px-6 py-5 flex items-center gap-6">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
            <User size={28} className="text-gray-400" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{profile.name}</h1>
            <p className="text-sm text-gray-500 mb-2">{profile.title}</p>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Profile Strength</span>
                <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${profile.profileStrength}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-800">{profile.profileStrength}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 size={14} className="text-indigo-500" />
                <span><strong className="text-gray-800">{profile.completedSkills}</strong> Completed Skills</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Send size={14} className="text-indigo-500" />
                <span><strong className="text-gray-800">{profile.applicationsSent}</strong> Applications Sent</span>
              </div>
            </div>
          </div>

          {/* Match Readiness */}
          <div className="shrink-0 border border-gray-100 rounded-xl px-5 py-3 min-w-37.5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Match Readiness</p>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-indigo-500" />
              <span className="text-xl font-bold text-indigo-600">
                {profile.matchReadiness.label}
                <span className="text-sm font-semibold text-gray-500 ml-1">({profile.matchReadiness.score}%)</span>
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${profile.matchReadiness.score}%` }} />
            </div>
          </div>

          {/* ATS Score */}
          <div className="shrink-0 border border-gray-100 rounded-xl px-5 py-3 min-w-32.5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">ATS Resume Score</p>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <span className="text-xl font-bold text-gray-900">
                {profile.atsScore.score}
                <span className="text-sm font-medium text-gray-400">/{profile.atsScore.max}</span>
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${profile.atsScore.score}%` }} />
            </div>
          </div>
        </Card>

        {/* Pending Task Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl px-6 py-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
            <ClipboardList size={20} className="text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{pendingTask.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{pendingTask.subtitle}</p>
          </div>
          <button className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-colors shrink-0">
            {pendingTask.ctaLabel}
          </button>
        </div>

        {/* Career Journey */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-3">Your Career Journey</h2>
          <div className="grid grid-cols-4 gap-4">
            {journeyCards.map((card) => (
              <Card key={card.id} radius="2xl" shadow="sm" padding="none" className="p-5 flex flex-col gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  {iconMap[card.icon]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                </div>
                <Link
                  to={card.linkTo}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-auto"
                >
                  {card.linkLabel} →
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Row: Recommended + Activity */}
        <div className="grid grid-cols-3 gap-4">
          {/* Recommended + Mentorship (left 2 cols) */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Recommended for You */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Recommended for You</h2>
              <div className="grid grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} radius="2xl" shadow="sm" padding="none" className="px-5 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                      {recIconMap[rec.icon]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{rec.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{rec.meta}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mentorship & Networking */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Mentorship &amp; Networking</h2>
              {mentors.map((mentor) => (
                <Card key={mentor.id} radius="2xl" shadow="sm" padding="none" className="px-5 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <User size={18} className="text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{mentor.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{mentor.role}</p>
                  </div>
                  <button className="text-sm font-semibold text-gray-700 border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 transition-colors">
                    Connect
                  </button>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Recent Activity</h2>
            <Card radius="2xl" shadow="sm" padding="none" className="px-5 py-4 flex flex-col gap-0">
              {activity.map((item, idx) => (
                <div key={item.id} className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 mt-0.5 shrink-0 ${item.active ? 'border-indigo-600 bg-white' : 'border-gray-300 bg-gray-100'}`} />
                    {idx < mockActivity.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.meta}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
