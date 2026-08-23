import { 
  Search, 
  Zap, 
  Rocket, 
  FileText, 
  PenTool,
  MessageSquare,
  Compass,
  Network,
  Banknote,
  Users,
  GraduationCap,
  Brush,
  Download,
  ArrowRight,
  ArrowUpRight,
  Code,
  LayoutTemplate,
  Lightbulb,
  Plus
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import {
  mockCollections,
  mockCategories,
  mockTemplates,
  mockInterviewPrep,
  mockRoadmap,
  mockCareerGuides
} from '../../services/library.mock';

const IconMap = {
  rocket: <Rocket size={18} className="text-orange-500" />,
  doc: <FileText size={18} className="text-blue-500" />,
  pen: <PenTool size={18} className="text-purple-500" />,
  fileText: <FileText size={20} className="text-gray-500" />,
  messageSquare: <MessageSquare size={20} className="text-gray-500" />,
  compass: <Compass size={20} className="text-gray-500" />,
  network: <Network size={20} className="text-gray-500" />,
  banknote: <Banknote size={20} className="text-gray-500" />,
  users: <Users size={20} className="text-gray-500" />,
  graduationCap: <GraduationCap size={20} className="text-gray-500" />,
  brush: <Brush size={20} className="text-gray-500" />,
  code: <Code size={18} className="text-blue-500" />,
  layoutTemplate: <LayoutTemplate size={18} className="text-green-500" />,
  lightbulb: <Lightbulb size={18} className="text-purple-500" />,
};

const TemplateColorMap = {
  blue: 'bg-blue-50',
  purple: 'bg-purple-50',
  pink: 'bg-pink-50',
};

const GuideColorMap = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
};

const Library = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-10">
        
        {/* Hero Section */}
        <div className="rounded-3xl bg-linear-to-b from-indigo-50/50 to-white border border-gray-100 p-12 flex flex-col items-center text-center shadow-sm">
          <div className="bg-indigo-100 text-indigo-700 text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 mb-6">
            <Zap size={14} className="fill-indigo-700" />
            Supercharge your career
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Resource Library</h1>
          <p className="text-sm text-gray-500 max-w-lg mb-8 leading-relaxed">
            A curated collection of career frameworks, technical guides, and professional templates designed for enterprise talent.
          </p>
          
          <div className="w-full max-w-2xl relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-400" />
            <input 
              type="text" 
              placeholder="Search 500+ templates, guides, and frameworks..." 
              className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-32 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Featured Collections */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FlameIcon />
            <h2 className="text-lg font-bold text-gray-900">Featured Collections</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {mockCollections.map((col) => (
              <Card key={col.id} radius="2xl" shadow="sm" padding="normal" className="flex items-start gap-4 hover:border-gray-300 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-${col.color}-50`}>
                  {IconMap[col.icon as keyof typeof IconMap]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{col.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{col.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Resource Categories */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CategoryIcon />
            <h2 className="text-lg font-bold text-gray-900">Resource Categories</h2>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {mockCategories.map((cat) => (
              <Card key={cat.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col items-center text-center hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
                <div className="mb-3 text-gray-400 group-hover:text-indigo-600 transition-colors">
                  {IconMap[cat.icon as keyof typeof IconMap]}
                </div>
                <h3 className="text-xs font-bold text-gray-900">{cat.title}</h3>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="flex gap-8 items-start">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-10">
            
            {/* Resume Templates */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">Resume Templates</h2>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                  View all <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {mockTemplates.map((template) => (
                  <Card key={template.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col">
                    <div className={`w-full h-32 rounded-xl flex items-center justify-center mb-4 ${TemplateColorMap[template.color]}`}>
                      <div className="text-indigo-300 opacity-60">
                         {IconMap[template.icon as keyof typeof IconMap]}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{template.title}</h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {template.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="mt-auto w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-bold py-2.5 rounded-full hover:bg-indigo-100 transition-colors">
                      <Download size={14} /> Download
                    </button>
                  </Card>
                ))}
              </div>
            </section>

            {/* Career Guides */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Compass size={20} className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">Career Guides</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                    &lt;
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors">
                    &gt;
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {mockCareerGuides.map((guide) => (
                  <Card key={guide.id} radius="2xl" shadow="sm" padding="normal" className="flex flex-col relative group cursor-pointer hover:border-gray-300 transition-colors">
                    {guide.isNew && (
                      <span className="absolute top-0 right-4 bg-indigo-600 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-b-md">
                        NEW
                      </span>
                    )}
                    <div className="w-8 h-8 flex items-center justify-center mb-4">
                      {/* Assuming icon colors are mapped */}
                      {IconMap[guide.icon as keyof typeof IconMap]}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{guide.title}</h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-6">
                      {guide.description}
                    </p>
                    <button className={`mt-auto text-[11px] font-bold ${GuideColorMap[guide.color]} group-hover:underline flex items-center gap-1`}>
                      Read Guide <ArrowRight size={12} />
                    </button>
                  </Card>
                ))}
                
                {/* Suggest a Topic */}
                <div className="border-2 border-dashed border-indigo-100 bg-indigo-50/30 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50/50 transition-colors">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-3">
                    <Plus size={16} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Suggest a Topic</h3>
                  <p className="text-[11px] text-gray-500">Don't see what you need?</p>
                </div>
              </div>
            </section>
            
          </div>

          {/* Right Column */}
          <aside className="w-[320px] shrink-0 flex flex-col gap-6">
            
            {/* Interview Prep */}
            <Card radius="2xl" shadow="sm" padding="none" className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={18} className="text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">Interview Prep</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {mockInterviewPrep.map((prep) => (
                  <div key={prep.id} className="border border-gray-100 rounded-xl p-4 flex flex-col group hover:border-indigo-200 transition-colors cursor-pointer relative">
                    <button className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={12} />
                    </button>
                    <h4 className="font-bold text-gray-900 text-sm mb-1.5 pr-6">{prep.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      {prep.description}
                    </p>
                    <div className="self-start bg-gray-50 text-gray-600 border border-gray-100 text-[10px] font-semibold px-2 py-1 rounded">
                      {prep.tag}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Roadmap */}
            <Card radius="2xl" shadow="sm" padding="none" className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Network size={18} className="text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">Career Roadmap</h3>
              </div>
              
              <div className="flex flex-col gap-0 relative ml-2">
                <div className="absolute top-2 bottom-6 left-1.5 w-0.5 bg-gray-100 -z-10" />
                
                {mockRoadmap.map((phase) => (
                  <div key={phase.id} className="flex items-start gap-4 pb-6 relative">
                    <div className={`w-3.5 h-3.5 rounded-full border-[3px] mt-1 bg-white shrink-0 ${
                      phase.status === 'completed' ? 'border-indigo-600' :
                      phase.status === 'current' ? 'border-indigo-600' :
                      'border-gray-200'
                    }`}>
                      {phase.status === 'completed' && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full m-auto mt-px" />}
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-bold mb-0.5 ${
                        (phase.status === 'completed' || phase.status === 'current') ? 'text-indigo-600' : 'text-gray-500'
                      }`}>
                        {phase.phase} <span className={(phase.status === 'completed' || phase.status === 'current') ? 'text-indigo-900' : 'text-gray-900'}>{phase.title}</span>
                      </h4>
                      <p className="text-[11px] font-medium text-gray-400">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-bold text-gray-500">
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

export default Library;

// Helper Icons for section headers (similar to Figma)
function FlameIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
