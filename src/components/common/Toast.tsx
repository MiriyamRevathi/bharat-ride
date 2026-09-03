import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const bgStyles = {
    success: 'bg-emerald-600 text-white shadow-emerald-900/20',
    error: 'bg-rose-600 text-white shadow-rose-900/20',
    info: 'bg-slate-800 text-white shadow-slate-900/20'
  }[toastMessage.type];

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  }[toastMessage.type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold ${bgStyles} border border-white/10 max-w-md`}>
        <Icon className="w-4 h-4 shrink-0" />
        <span>{toastMessage.text}</span>
      </div>
    </div>
  );
};
