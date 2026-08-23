import { NavLink } from 'react-router-dom';
import { Search, Settings, Activity } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/student/dashboard' },
  { label: 'Skill Assessment', to: '/student/skill-assessment' },
  { label: 'Skill Mapping', to: '/student/skill-mapping' },
  { label: 'Opportunities', to: '/student/opportunities' },
  { label: 'Portfolio', to: '/student/portfolio' },
  { label: 'Progress', to: '/student/progress' },
  { label: 'Library', to: '/student/library' },
];

export const Navbar = () => {
  return (
    <nav className="flex items-center gap-6 px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-1.5 font-bold text-lg text-indigo-600 shrink-0">
        <Activity size={20} />
        <span>Internix</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-400 w-48">
        <Search size={14} />
        <span>Search...</span>
      </div>

      {/* Settings */}
      <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5">
        <Settings size={14} />
        Settings
      </button>
    </nav>
  );
};
