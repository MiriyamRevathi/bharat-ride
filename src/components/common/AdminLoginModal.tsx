import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, X, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    showAdminLoginModal,
    setAdminLoginModal,
    loginAsAdmin
  } = useApp();

  if (!showAdminLoginModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={() => setAdminLoginModal(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white shadow-md flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Operations Admin Console</h3>
            <p className="text-xs text-slate-500">Fleet management, schedules, bookings &amp; live analytics</p>
          </div>
        </div>

        {/* Demo Admin Profile Preview */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
              alt="Admin Vikram"
              className="w-10 h-10 rounded-full object-cover border-2 border-rose-500/30"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-sm font-bold text-slate-900">Vikram Mehta</div>
              <div className="text-xs text-rose-600 font-semibold">Head of Intercity Operations</div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/80 space-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full CRUD authority over Buses, Routes &amp; Timetables</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live seat blocking &amp; passenger manifest controls</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Financial revenue reports &amp; refund processor</span>
            </div>
          </div>
        </div>

        <button
          onClick={loginAsAdmin}
          className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mb-3"
        >
          <span>Continue as Demo Admin</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>One-click safe demo authorization. No login credentials needed.</span>
        </div>
      </div>
    </div>
  );
};
