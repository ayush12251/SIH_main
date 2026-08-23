import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Big 404 number */}
        <div className="relative mb-8">
          <p className="text-[10rem] font-black text-gray-100 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 rounded-full text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Home size={15} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
