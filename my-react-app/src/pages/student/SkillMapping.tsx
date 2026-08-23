import { 
  SlidersHorizontal, 
  TrendingUp, 
  ArrowRight, 
  Rocket,
  BarChart3,
  Database,
  FlaskConical,
  Building2,
  ShieldCheck,
  Server,
  CheckCircle2,
  Play,
  Lock,
  Award
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import {
  mockPageHeader,
  mockImpactPath,
  mockMarketTrends,
  mockSkillGaps,
  mockIndustries,
  mockLearningModules,
  mockCertifications,
} from '../../services/skillMapping.mock';

const IconMap = {
  database: <Database size={20} className="text-indigo-500" />,
  flask: <FlaskConical size={20} className="text-indigo-500" />,
  building: <Building2 size={20} className="text-emerald-500" />,
  shield: <ShieldCheck size={20} className="text-indigo-500" />,
  server: <Server size={20} className="text-blue-500" />,
  award: <Award size={20} className="text-indigo-500" />,
};

const SkillMapping = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockPageHeader.title}</h1>
            <p className="text-sm text-gray-600 font-medium">
              Target Role: <strong className="text-gray-900">{mockPageHeader.targetRole}</strong> • Current Match: {mockPageHeader.currentMatch}%
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-5 py-2 hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={16} />
            Adjust Preferences
          </button>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Impact Path Card */}
          <Card radius="3xl" shadow="sm" padding="large" className="col-span-2 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={16} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">High Impact Path</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4 max-w-lg">
              {mockImpactPath.title}
            </h2>
            
            <p className="text-gray-600 text-sm mb-12 max-w-md leading-relaxed">
              {mockImpactPath.description}
            </p>

            <div className="flex items-end gap-12">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Current Match Score</p>
                <p className="text-4xl font-extrabold text-gray-900">{mockImpactPath.currentScore}%</p>
              </div>
              
              <div className="pb-3 text-indigo-300">
                <ArrowRight size={24} strokeWidth={3} />
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Projected Match Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-4xl font-extrabold text-emerald-500">{mockImpactPath.projectedScore}%</p>
                  <Rocket size={20} className="text-emerald-500" />
                </div>
              </div>
            </div>
          </Card>

          {/* Market Demand Trends */}
          <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <BarChart3 size={16} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Market Demand Trends</h3>
            </div>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Most requested skills in PM Internship postings<br />(Last 30 days)
            </p>

            <div className="flex flex-col gap-5 flex-1">
              {mockMarketTrends.map((trend) => (
                <div key={trend.id}>
                  <div className="flex justify-between items-end mb-2">
                    <span className={`text-xs font-bold ${trend.isGap ? 'text-indigo-600' : 'text-gray-900'}`}>
                      {trend.skill} {trend.isGap && '(Gap)'}
                    </span>
                    <span className={`text-xs font-bold ${trend.isGap ? 'text-indigo-600' : 'text-gray-600'}`}>
                      {trend.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${trend.isGap ? 'bg-indigo-600' : 'bg-gray-600'}`} 
                      style={{ width: `${trend.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Priority Gaps & Industries */}
        <div className="grid grid-cols-2 gap-6 mt-2">
          {/* Gaps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Priority Skill Gaps</h2>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full">
                2 Critical Items
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {mockSkillGaps.map((gap) => (
                <Card key={gap.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        {IconMap[gap.icon as keyof typeof IconMap]}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">{gap.skill}</h3>
                    </div>
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-3 py-1.5 rounded-full">
                      Required by {gap.requiredBy}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                    {gap.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Industries</h2>
            <div className="flex flex-col gap-4">
              {mockIndustries.map((ind) => (
                <Card key={ind.id} radius="2xl" shadow="sm" padding="small" className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ind.iconBg}`}>
                    {IconMap[ind.icon as keyof typeof IconMap]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{ind.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{ind.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Personalized Learning Path */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Personalized Learning Path</h2>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full">
              3 Modules
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {mockLearningModules.map((mod) => (
              <Card key={mod.id} radius="2xl" shadow="sm" padding="small" className={`flex items-center gap-4 px-6 ${mod.status === 'locked' ? 'bg-gray-50/50' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  mod.status === 'completed' ? 'bg-emerald-100 text-emerald-500' :
                  mod.status === 'in-progress' ? 'bg-indigo-100 text-indigo-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {mod.status === 'completed' && <CheckCircle2 size={20} />}
                  {mod.status === 'in-progress' && <Play size={16} className="ml-1" />}
                  {mod.status === 'locked' && <Lock size={16} />}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold text-sm mb-1 ${mod.status === 'in-progress' ? 'text-indigo-600' : mod.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                    {mod.title}
                  </h3>
                  <p className="text-xs text-gray-500">{mod.statusText}</p>
                </div>

                {mod.status === 'in-progress' && (
                  <div className="flex items-center gap-6 shrink-0 w-64">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${mod.progress}%` }} />
                    </div>
                    <button className="bg-indigo-600 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors">
                      Continue
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Certifications */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Certifications</h2>
          <div className="grid grid-cols-2 gap-6">
            {mockCertifications.map((cert) => (
              <Card key={cert.id} radius="2xl" shadow="sm" padding="small" className="flex items-center gap-4 px-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  {IconMap[cert.icon as keyof typeof IconMap]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{cert.title}</h3>
                  <p className="text-xs text-gray-500">{cert.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillMapping;
