import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bus, Lock, User, Phone, ArrowLeft, ShieldAlert, CheckCircle2, KeyRound } from 'lucide-react';

export const DriverLogin: React.FC = () => {
  const { loginDriver, drivers, navigateTo, setCurrentRole } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your Driver ID or registered Phone Number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = loginDriver(identifier, password);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 300);
  };

  const handleDemoSelect = (driverId: string) => {
    const d = drivers.find(drv => drv.driver_id === driverId);
    if (d) {
      setIdentifier(d.driver_id);
      setPassword(d.password || 'driver123');
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EE] text-slate-900 flex flex-col justify-between selection:bg-rose-500/20 selection:text-rose-900">
      {/* Top Header Bar */}
      <header className="bg-white px-6 py-4 border-b border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-900">
                Bharat<span className="text-rose-600">Ride</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                Driver Portal
              </span>
            </div>
            <p className="text-xs text-slate-500">Driver Console &amp; Trip Management</p>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentRole('CUSTOMER');
            navigateTo('home');
          }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-rose-600" />
          <span>Back to Passenger Booking</span>
        </button>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white font-bold mx-auto mb-3 shadow-lg shadow-rose-600/20">
              <Bus className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Driver Sign In</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your Driver ID or mobile number to access your assigned bus, trips, and passenger manifest.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Driver ID / Mobile Number <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. DRV-101 or 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-400"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-slate-500">Default demo: <code className="text-rose-600 font-bold">driver123</code></span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Login to Driver Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Selector */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center mb-3">
              One-Click Demo Driver Accounts
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {drivers.slice(0, 4).map((d) => (
                <button
                  key={d.driver_id}
                  type="button"
                  onClick={() => handleDemoSelect(d.driver_id)}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer flex flex-col justify-between ${
                    identifier === d.driver_id
                      ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold truncate text-slate-900">{d.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-rose-700 border border-slate-200 font-bold">
                      {d.driver_id}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Phone className="w-2.5 h-2.5 text-rose-500" />
                    <span>{d.phone}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-2.5">
              Click any driver above to autofill credentials, then click "Login to Driver Dashboard".
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 px-6 py-4 border-t border-slate-200 text-center text-xs text-slate-500">
        BharatRide Driver Portal &bull; Enterprise Bus Fleet Operations &bull; 24x7 Driver Dispatch Helpline: +91 1800 200 4888
      </footer>
    </div>
  );
};
