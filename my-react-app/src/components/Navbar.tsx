import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Settings, Activity, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-1.5 font-bold text-lg text-indigo-600 shrink-0">
        <Activity size={20} />
        <span>Internix</span>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-1 flex-1 ml-6">
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

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-400 w-48">
          <Search size={14} />
          <span>Search...</span>
        </div>

        {/* Settings */}
        <Link 
          to="/student/settings"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          <Settings size={14} />
          Settings
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col p-4 shadow-lg md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-bold transition-colors mb-1 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="h-px bg-gray-100 my-2" />
          <Link 
            to="/student/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings size={18} />
            Settings
          </Link>
          <button
            type="button"
            onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
