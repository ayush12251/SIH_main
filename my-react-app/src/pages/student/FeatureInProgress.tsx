import { ArrowLeft, Construction } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';

const FeatureInProgress = () => {
  const [searchParams] = useSearchParams();
  const feature = searchParams.get('feature') || 'This feature';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <Construction size={30} className="text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{feature}</h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          This feature is currently under development. It will be available in a future update.
        </p>
        <Link to="/student/skill-assessment" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-3 rounded-full hover:bg-indigo-700 transition-colors">
          <ArrowLeft size={16} />
          Back to Skill Assessment
        </Link>
      </main>
    </div>
  );
};

export default FeatureInProgress;
