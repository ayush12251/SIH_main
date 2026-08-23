import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  FlaskConical, 
  Landmark,
  Activity
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-neutral-900 overflow-x-hidden min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center px-[5%] py-6 bg-transparent">
        <div className="flex items-center gap-2 font-bold text-xl text-neutral-900">
          <Activity className="text-brand-indigo w-6 h-6" />
          <span>Internix</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto px-[5%] py-20 relative min-h-[80vh] bg-[radial-gradient(circle_at_10%_80%,rgba(209,250,229,0.4)_0%,transparent_40%),radial-gradient(circle_at_90%_20%,rgba(224,231,255,0.5)_0%,transparent_40%)]"
      >
        <div className="flex-1 max-w-150 z-10">
          <div className="inline-block bg-brand-light text-brand-indigo px-3 py-1 rounded-full text-xs font-semibold mb-6">
            <span className="text-[10px] mr-1">●</span> Enterprise Talent Infrastructure v2.4
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Precision alignment for the <span className="text-brand-indigo">future of work.</span>
          </h1>
          <p className="text-lg leading-relaxed text-neutral-600 mb-10">
            Internix is the high-density data layer connecting ambitious students, precise industry demands, forward-thinking faculty, and rigorous institutional analytics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => navigate('/choose-path')}>
              Get Started <ArrowRight size={18} />
            </Button>
            <Button variant="secondary">
              View Documentation
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-center mt-16 lg:mt-0 lg:justify-end">
          <div className="bg-white/40 backdrop-blur-3xl rounded-4xl p-16 w-full max-w-125 relative shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
            <Card padding="normal" shadow="lg" className="w-full">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-semibold m-0">Match Precision</h3>
                <span className="bg-accent-greenLight text-accent-green px-3 py-1 rounded-full font-semibold text-sm">98.4%</span>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm text-neutral-600">
                  <span>Technical Skills</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-brand-indigo w-[80%]"></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm text-neutral-600">
                  <span>Soft Skills</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-accent-green w-[65%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm text-neutral-600">
                  <span>Cultural Fit</span>
                  <span>90%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-accent-blueLight w-[90%]"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </header>

      {/* Stakeholder Protocol Section */}
      <section className="bg-neutral-50 px-[5%] py-20">
        <div className="max-w-150 mb-16">
          <h2 className="text-4xl font-bold mb-4 mt-0">Stakeholder Protocol</h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            A unified ecosystem engineered for mutually beneficial outcomes across all nodes of the talent pipeline.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Students Card */}
          <Card padding="normal" shadow="sm" className="flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-brand-light text-brand-indigo">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Students</h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 flex-1">
              Accelerate trajectory with algorithmic skill matching and verified industry credentials. Navigate the market with clarity.
            </p>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80 text-brand-indigo">
              Explore Student Portal <ArrowRight size={16} />
            </a>
          </Card>

          {/* Industry Card */}
          <Card padding="normal" shadow="sm" className="flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-accent-greenLight text-accent-green">
              <Building2 size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Industry</h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 flex-1">
              Deploy high-precision talent acquisition. Filter candidates through standardized competency matrices, not just resumes.
            </p>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80 text-accent-green">
              Access Talent Pool <ArrowRight size={16} />
            </a>
          </Card>

          {/* Faculty Card */}
          <Card padding="normal" shadow="sm" className="flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-accent-purpleLight text-accent-purple">
              <FlaskConical size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Faculty</h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 flex-1">
              Integrate real-time industry demands into curriculum. Track cohort performance against active market requirements.
            </p>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80 text-accent-purple">
              View Academic Tools <ArrowRight size={16} />
            </a>
          </Card>

          {/* Institutions Card */}
          <Card padding="normal" shadow="sm" className="flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-brand-light text-brand-indigo">
              <Landmark size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Institutions</h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 flex-1">
              Command placement analytics at scale. Optimize institutional ROI and generate audited reports on graduate outcomes.
            </p>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80 text-brand-indigo">
              Platform Analytics <ArrowRight size={16} />
            </a>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-[5%] py-8 border-t border-gray-200 flex flex-col md:flex-row gap-6 items-center justify-between bg-white">
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <div className="flex items-center gap-2 font-bold text-neutral-900">
            <Activity className="text-brand-indigo w-5 h-5" />
            <span className="text-lg">Internix</span>
          </div>
          <span className="text-sm text-neutral-500">
            © 2024 Internix Enterprise. All rights reserved.
          </span>
        </div>
        
        <div className="flex gap-6 flex-wrap justify-center text-sm text-neutral-500">
          <a href="#" className="hover:text-neutral-900">Privacy Policy</a>
          <a href="#" className="hover:text-neutral-900">Terms of Service</a>
          <a href="#" className="hover:text-neutral-900">Accessibility</a>
          <a href="#" className="hover:text-neutral-900">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
