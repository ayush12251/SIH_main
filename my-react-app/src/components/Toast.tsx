import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast, Toast, ToastType } from '../context/ToastContext';
import { useEffect, useState } from 'react';

const config: Record<ToastType, { icon: React.ReactNode; bg: string; border: string; title: string; bar: string }> = {
  success: {
    icon: <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />,
    bg: 'bg-white',
    border: 'border-l-4 border-emerald-500',
    title: 'text-emerald-700',
    bar: 'bg-emerald-500',
  },
  error: {
    icon: <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />,
    bg: 'bg-white',
    border: 'border-l-4 border-red-500',
    title: 'text-red-700',
    bar: 'bg-red-500',
  },
  warning: {
    icon: <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />,
    bg: 'bg-white',
    border: 'border-l-4 border-amber-500',
    title: 'text-amber-700',
    bar: 'bg-amber-500',
  },
  info: {
    icon: <Info size={18} className="text-indigo-500 shrink-0 mt-0.5" />,
    bg: 'bg-white',
    border: 'border-l-4 border-indigo-500',
    title: 'text-indigo-700',
    bar: 'bg-indigo-500',
  },
};

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { dismissToast } = useToast();
  const [visible, setVisible] = useState(false);
  const c = config[toast.type];

  useEffect(() => {
    // Trigger slide-in animation on mount
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      className={`
        relative flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-lg min-w-72 max-w-sm
        ${c.bg} ${c.border}
        transition-all duration-300 ease-out overflow-hidden
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
    >
      {c.icon}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${c.title}`}>{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => dismissToast(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
      >
        <X size={14} />
      </button>
      {/* Auto-dismiss progress bar */}
      <div className={`absolute bottom-0 left-0 h-0.5 ${c.bar} animate-[shrink_4s_linear_forwards]`}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
};
