import { useState } from 'react';
import { Leaf, GraduationCap, Building2, FlaskConical, Landmark, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Build your professional profile, discover internships, and connect with industry mentors.',
    icon: GraduationCap,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'industry',
    title: 'Industry Partner',
    description: 'Recruit top emerging talent and collaborate on curriculum-aligned projects.',
    icon: Building2,
    iconBg: 'bg-[#d1fae5]', // emerald-100 equivalent for softer green
    iconColor: 'text-[#059669]', // emerald-600
  },
  {
    id: 'faculty',
    title: 'Faculty Member',
    description: 'Track student progress, assign industry projects, and manage course outcomes.',
    icon: FlaskConical,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'admin',
    title: 'Institution Admin',
    description: 'Oversee campus-wide analytics, manage departmental access, and review placement metrics.',
    icon: Landmark,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  }
];

export default function ChoosePath() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/register?role=${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-7xl mx-auto w-full mt-10">

        {/* Header section */}
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <Leaf size={24} className="text-indigo-600 fill-indigo-600" />
            <span className="text-2xl font-bold text-indigo-600 tracking-wide">Internix</span>
          </div>

          <h1 className="text-[2.5rem] font-extrabold text-neutral-900 mb-4 tracking-tight">Choose Your Path</h1>
          <p className="text-[#6b7280] max-w-2xl mx-auto text-[1.05rem] leading-relaxed">
            Select the role that best describes you to personalize your Internix experience and<br className="hidden md:block" /> access the right tools.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`cursor-pointer transition-all duration-200 rounded-3xl p-8 bg-white flex flex-col items-start
                  ${isSelected
                    ? 'border-2 border-indigo-600 shadow-[0_10px_40px_-10px_rgba(79,70,229,0.15)] scale-[1.02]'
                    : 'border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:border-gray-200 hover:shadow-md'
                  }
                `}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 ${role.iconBg}`}>
                  <Icon className={role.iconColor} size={24} strokeWidth={2} />
                </div>
                <h3 className="text-[1.25rem] font-bold text-neutral-900 mb-3 tracking-tight">{role.title}</h3>
                <p className="text-[#6b7280] text-[0.95rem] leading-relaxed">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white px-10 py-6 w-full mt-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-[#6b7280] text-[0.95rem] font-medium">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 transition-colors ml-1 font-semibold">Sign In</Link>
          </p>
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`rounded-full px-8 py-3 text-base font-semibold shadow-sm transition-all duration-200
              ${!selectedRole ? 'opacity-50 cursor-not-allowed bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'}
            `}
          >
            Continue <ArrowRight size={20} className="ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
