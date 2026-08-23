import { 
  MapPin, 
  Mail, 
  Link as LinkIcon, 
  Share2, 
  Download,
  CheckCircle2,
  Cloud,
  GraduationCap,
  ExternalLink,
  Trophy,
  Medal,
  FolderOpen,
  FileText,
  FileBadge2,
  FileCheck2,
  Upload,
  Archive
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import {
  mockPortfolioProfile,
  mockCredentials,
  mockAchievements,
  mockProjects,
  mockTechStack,
  mockDocuments
} from '../../services/portfolio.mock';

const IconMap = {
  cloud: <Cloud size={20} className="text-gray-500" />,
  gradCap: <GraduationCap size={20} className="text-gray-500" />,
  trophy: <Trophy size={20} className="text-gray-500" />,
  medal: <Medal size={20} className="text-gray-500" />,
};

const DocIconMap = {
  pdf: <FileText size={18} className="text-gray-500" />,
  transcript: <FileBadge2 size={18} className="text-gray-500" />,
  cert: <FileCheck2 size={18} className="text-gray-500" />,
};

const badgeStyles = {
  green: 'bg-emerald-100 text-emerald-700',
  gray: 'bg-gray-100 text-gray-700',
  yellow: 'bg-amber-100 text-amber-700',
};

const Portfolio = () => {
  const profile = mockPortfolioProfile;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 flex flex-col gap-10">
        
        {/* Profile Header */}
        <div className="flex items-start gap-8">
          <div className="w-40 h-40 rounded-3xl overflow-hidden shrink-0 border-4 border-white shadow-sm bg-gray-200">
            <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 pt-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-1">{profile.name}</h1>
            <p className="text-lg text-gray-600 font-medium mb-4">{profile.title}</p>
            
            <div className="flex items-center gap-6 text-sm font-semibold text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {profile.location}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {profile.email}
              </div>
              <div className="flex items-center gap-2 text-indigo-600">
                <LinkIcon size={16} />
                <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {profile.github}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
                <Share2 size={16} />
                Share Portfolio
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-8 items-start">
          
          {/* Left Column (Credentials, Achievements, Projects) */}
          <div className="flex-1 flex flex-col gap-10">
            
            {/* Verified Credentials */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} className="text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Verified Credentials</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mockCredentials.map((cred) => (
                  <Card key={cred.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col h-full relative">
                    <span className={`absolute top-5 right-5 text-[10px] font-bold px-3 py-1 rounded-full ${badgeStyles[cred.badge.color]}`}>
                      {cred.badge.label}
                    </span>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                      {IconMap[cred.icon as keyof typeof IconMap]}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{cred.title}</h3>
                    <p className="text-xs text-gray-500 mb-6">{cred.subtitle}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-semibold">
                      {cred.meta}
                      {cred.hasLink && <ExternalLink size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Achievements & Awards */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={20} className="text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Achievements &amp; Awards</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mockAchievements.map((ach) => (
                  <Card key={ach.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col h-full relative">
                    <span className={`absolute top-5 right-5 text-[10px] font-bold px-3 py-1 rounded-full ${badgeStyles[ach.badge.color]}`}>
                      {ach.badge.label}
                    </span>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                      {IconMap[ach.icon as keyof typeof IconMap]}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{ach.title}</h3>
                    <p className="text-xs text-gray-500 mb-6">{ach.subtitle}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-400 font-semibold">
                      {ach.meta}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Key Projects */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen size={20} className="text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Key Projects</h2>
              </div>
              <div className="flex flex-col gap-4">
                {mockProjects.map((proj) => (
                  <Card key={proj.id} radius="2xl" shadow="sm" padding="normal" className="flex gap-6 relative">
                    <span className="absolute top-5 right-5 text-[10px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {proj.badge}
                    </span>
                    
                    {/* Placeholder Visual */}
                    <div className="w-48 h-32 bg-gray-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden border border-gray-200/50">
                      {proj.placeholderType === 'diagram' ? (
                        <span className="text-xs font-mono text-gray-400">Architecture<br/>Diagram</span>
                      ) : (
                        <div className="flex items-end gap-2 h-16 w-32 px-2">
                          <div className="w-full bg-indigo-200 rounded-t-sm h-[40%]" />
                          <div className="w-full bg-indigo-300 rounded-t-sm h-[60%]" />
                          <div className="w-full bg-indigo-400 rounded-t-sm h-[30%]" />
                          <div className="w-full bg-indigo-500 rounded-t-sm h-[80%]" />
                          <div className="w-full bg-indigo-600 rounded-t-sm h-full" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pr-24 flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{proj.title}</h3>
                      <p className="text-xs font-bold text-indigo-600 mb-3">{proj.role}</p>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-lg">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {proj.skills.map(skill => (
                          <span key={skill} className="bg-gray-50 border border-gray-200 text-gray-700 text-[10px] font-bold px-3 py-1 rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
            
          </div>

          {/* Right Column (Stack, Upload, Vault) */}
          <aside className="w-90 shrink-0 flex flex-col gap-6">
            
            {/* Technical Stack */}
            <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-6">
              <h2 className="text-base font-bold text-gray-900">Technical Stack</h2>
              
              {mockTechStack.map((category) => (
                <div key={category.title}>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Card>

            {/* Update Resume Dropzone */}
            <div className="border-2 border-dashed border-gray-200 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                <Upload size={18} className="text-gray-500" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">Update Resume</p>
              <p className="text-xs font-semibold text-gray-400">Drag and drop resume to update profile</p>
            </div>

            {/* Document Vault */}
            <Card radius="2xl" shadow="sm" padding="normal" className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-gray-900">Document Vault</h2>
                <Archive size={16} className="text-gray-400" />
              </div>

              <div className="flex flex-col gap-3">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-100 rounded-xl p-3 flex items-center gap-3 group hover:border-gray-200 transition-colors">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                      {DocIconMap[doc.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{doc.name}</p>
                      <p className="text-[10px] font-semibold text-gray-400">{doc.size}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-2 w-full border border-gray-200 bg-white text-gray-700 text-xs font-bold py-3 rounded-full hover:bg-gray-50 transition-colors">
                View All Documents
              </button>
            </Card>

          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-semibold text-gray-500">
              Generated via Resume Parser • Last updated: Oct 24, 2023
            </p>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-semibold text-gray-500">
            <span className="text-gray-900">© 2024 CareerPath Enterprise. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
