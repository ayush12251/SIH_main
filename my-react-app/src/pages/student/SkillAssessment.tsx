import { useEffect, useState } from 'react';
import { Download, ClipboardList, Play, CheckCircle2, Clock } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Link } from 'react-router-dom';
import {
  type RadarAxis,
  type SkillScoreCard,
  type AssessmentHistoryItem,
} from '../../services/skillAssessment.mock';
import { apiRequest } from '../../services/api';

// ─── Circular Score Ring ───────────────────────────────────────────────────────
const colorMap = {
  indigo: { ring: '#4f46e5', text: 'text-indigo-600', border: 'border-indigo-200' },
  green:  { ring: '#10b981', text: 'text-green-600',  border: 'border-green-200' },
  amber:  { ring: '#f59e0b', text: 'text-amber-500',  border: 'border-amber-200' },
};

const ScoreRing = ({ score, color }: { score: number; color: SkillScoreCard['color'] }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const { ring } = colorMap[color];
  return (
    <svg width="56" height="56" className="shrink-0">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle
        cx="28" cy="28" r={r}
        fill="none" stroke={ring} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 28 28)"
      />
      <text x="28" y="33" textAnchor="middle" fontSize="13" fontWeight="700" fill={ring}>
        {score}%
      </text>
    </svg>
  );
};

// ─── Radar Chart (SVG) ────────────────────────────────────────────────────────
const RadarChart = ({ axes }: { axes: RadarAxis[] }) => {
  const cx = 150, cy = 160, r = 110;
  const n = axes.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, scale: number) => ({
    x: cx + scale * r * Math.cos(angle(i)),
    y: cy + scale * r * Math.sin(angle(i)),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 300 310" className="w-full h-full">
      {/* Grid rings */}
      {gridLevels.map((lvl) => (
        <polygon
          key={lvl}
          points={axes.map((_, i) => { const p = pt(i, lvl); return `${p.x},${p.y}`; }).join(' ')}
          fill="none" stroke="#e5e7eb" strokeWidth="1"
        />
      ))}
      {/* Spokes */}
      {axes.map((_, i) => {
        const outer = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="#e5e7eb" strokeWidth="1" />;
      })}
      {/* Data polygon */}
      <polygon
        points={axes.map((a, i) => { const p = pt(i, a.value); return `${p.x},${p.y}`; }).join(' ')}
        fill="rgba(99,102,241,0.15)" stroke="#4f46e5" strokeWidth="2"
      />
      {/* Data dots */}
      {axes.map((a, i) => {
        const p = pt(i, a.value);
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4f46e5" />;
      })}
      {/* Labels */}
      {axes.map((a, i) => {
        const p = pt(i, 1.2);
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="Inter, sans-serif">
            {a.label}
          </text>
        );
      })}
    </svg>
  );
};

// ─── Proficiency Bar ──────────────────────────────────────────────────────────
const ProficiencyBar = ({ value, highlighted }: { value: number; highlighted: boolean }) => (
  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
    <div
      className={`h-full rounded-full ${highlighted ? 'bg-amber-400' : 'bg-indigo-600'}`}
      style={{ width: `${value * 100}%` }}
    />
  </div>
);

// ─── Circular ATS Score ───────────────────────────────────────────────────────
const AtsScoreCircle = ({ score, max }: { score: number; max: number }) => {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / max) * circ;
  return (
    <svg width="90" height="90" className="shrink-0">
      <circle cx="45" cy="45" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
      <circle
        cx="45" cy="45" r={r}
        fill="none" stroke="#10b981" strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 45 45)"
      />
      <text x="45" y="43" textAnchor="middle" fontSize="18" fontWeight="800" fill="#111827">{score}</text>
      <text x="45" y="57" textAnchor="middle" fontSize="10" fill="#9ca3af">/{max}</text>
    </svg>
  );
};

// ─── Badge ────────────────────────────────────────────────────────────────────
const badgeStyles = {
  green: 'bg-green-100 text-green-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  gray: 'bg-gray-100 text-gray-600',
  blue: 'bg-blue-100 text-blue-700',
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const SkillAssessment = () => {
  const [assessment, setAssessment] = useState<{
    scoreCards: Array<{ id: string; label: string; subLabel: string; score: number }>;
    radarAxes: RadarAxis[];
    skillInventory: Array<{ id: string; skill: string; subSkill?: string; proficiency: number; level: string; lastTested: string | null; highlighted: boolean }>;
    dailyChallenges: Array<{ id: string; tag: string; title: string; description: string }>;
    atsMatch: { score: number; max: number; label: string; description: string };
  } | null>(null);

  useEffect(() => {
    apiRequest<typeof assessment extends null ? never : NonNullable<typeof assessment>>('/student/skills/assessment')
      .then(data => setAssessment(data))
      .catch(() => setAssessment({ scoreCards: [], radarAxes: [], skillInventory: [], dailyChallenges: [], atsMatch: { score: 0, max: 100, label: 'Not assessed', description: 'Upload a resume to generate your baseline.' } }));
  }, []);

  if (!assessment) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" /></div>;
  const ats = assessment.atsMatch;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">

        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Skill Assessment &amp; Profiling</h1>
            <p className="text-sm text-gray-500 mt-1">
              Assess your Data Science competencies, discover strengths, and identify critical gaps.
            </p>
          </div>
          <Link to="/student/feature-status?feature=Export%20Transcript" className="flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-200 bg-white rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
            <Download size={14} />
            Export Transcript
          </Link>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-3 gap-4">
          {assessment.scoreCards.map((card, index) => (
            <div key={card.id} className={`bg-white rounded-2xl border ${colorMap[['indigo', 'green', 'amber'][index % 3] as SkillScoreCard['color']].border} shadow-sm px-5 py-4 flex items-center gap-4`}>
              <ScoreRing score={card.score} color={['indigo', 'green', 'amber'][index % 3] as SkillScoreCard['color']} />
              <div>
                <p className="font-bold text-gray-900 text-sm">{card.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.subLabel}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Questionnaire Banner */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-xl px-6 py-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
            <ClipboardList size={20} className="text-indigo-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">Skill Questionnaire Baseline</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Take a comprehensive 15-minute evaluation to update your data science skill matrix.
            </p>
          </div>
          <a href="/student/questionnaire" className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-colors shrink-0">
            Start Skill Questionnaire
          </a>
        </div>

        {/* Skill Matrix + Skill Inventory */}
        <div className="grid grid-cols-2 gap-4">
          {/* Radar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 size={16} className="text-indigo-500" />
              </div>
              <h2 className="font-bold text-gray-900 text-sm">Data Science Skill Matrix</h2>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-65">
              <RadarChart axes={assessment.radarAxes} />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Last updated: 2 days ago</span>
              <Link to="/student/feature-status?feature=Matrix%20Details" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View Matrix Details
              </Link>
            </div>
          </div>

          {/* Skill Inventory */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <ClipboardList size={16} className="text-indigo-500" />
              </div>
              <h2 className="font-bold text-gray-900 text-sm">Skill Inventory</h2>
            </div>
            {/* Table Header */}
            <div className="grid grid-cols-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
              <span>Skill</span>
              <span>Proficiency</span>
              <span className="text-right">Last Tested</span>
            </div>
            {/* Rows */}
            <div className="flex flex-col gap-0.5 flex-1">
              {assessment.skillInventory.map((row) => (
                <div
                  key={row.id}
                  className={`grid grid-cols-3 items-center px-2 py-2.5 rounded-lg ${row.highlighted ? 'bg-amber-50' : 'hover:bg-gray-50'}`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{row.skill}</p>
                    {row.subSkill && <p className="text-xs text-gray-400">{row.subSkill}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <ProficiencyBar value={row.proficiency} highlighted={row.highlighted} />
                    <span className="text-xs text-gray-500">{row.level}</span>
                  </div>
                  <p className="text-xs text-gray-400 text-right">{row.lastTested}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-100 mt-3">
              <Link to="/student/feature-status?feature=Full%20Skill%20Inventory" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 float-right">
                View Full Inventory
              </Link>
            </div>
          </div>
        </div>

        {/* Daily Challenges + ATS Match */}
        <div className="grid grid-cols-2 gap-4">
          {/* Daily Skill Challenges */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Clock size={16} className="text-indigo-500" />
                </div>
                <h2 className="font-bold text-gray-900 text-sm">Daily Skill Challenges</h2>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Practice Center</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {assessment.dailyChallenges.map((ch) => (
                <div key={ch.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {ch.tag}
                    </span>
                    <Link to={`/student/feature-status?feature=${encodeURIComponent(`${ch.title} Challenge`)}`} className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                      <Play size={12} className="text-indigo-600 ml-0.5" />
                    </Link>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{ch.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ch.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Resume Match */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-500" />
              </div>
              <h2 className="font-bold text-gray-900 text-sm">ATS Resume Match: Sr. Data Scientist</h2>
            </div>
            <div className="flex items-center gap-5 bg-gray-50 rounded-xl p-4">
              <AtsScoreCircle score={ats.score} max={ats.max} />
              <div>
                <p className="font-bold text-gray-900 text-base">{ats.label}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ats.description}</p>
                <Link to="/student/feature-status?feature=ATS%20Review%20Suggestions" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 mt-2">
                  Review Suggestions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment History & Trends */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-indigo-500" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Assessment History &amp; Trends</h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {([] as AssessmentHistoryItem[]).map((item, idx) => (
              <div key={item.id} className="relative flex flex-col gap-3">
                {/* Timeline connector */}
                {idx < 0 && (
                  <div className="absolute top-3 left-full w-full h-px bg-gray-200 -translate-y-px z-0" />
                )}
                <div className="flex items-center gap-2 relative z-10">
                  <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${item.isUpcoming ? 'border-indigo-400 bg-white' : 'border-gray-300 bg-gray-200'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${item.isUpcoming ? 'text-indigo-500' : 'text-gray-400'}`}>
                    {item.period}
                  </span>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
                  <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.meta}</p>
                  {item.badge && (
                    <span className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeStyles[item.badge.color]}`}>
                      {item.badge.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillAssessment;
