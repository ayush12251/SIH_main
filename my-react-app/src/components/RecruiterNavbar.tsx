import { NavLink } from 'react-router-dom';
import { Search, Activity } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/recruiter/dashboard' },
  { label: 'Postings', to: '/recruiter/jobs' },
  { label: 'Candidates', to: '/recruiter/candidates' },
  { label: 'Learning', to: '/recruiter/learning' },
  { label: 'Analytics', to: '/recruiter/analytics' },
];

export const RecruiterNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Activity className="w-6 h-6" />
          <span>Internix</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full font-bold text-sm transition-colors ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:bg-gray-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
        <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 font-bold text-sm hover:bg-gray-50 shadow-sm transition-all">
          Settings
        </button>
      </div>
    </nav>
  );
};
