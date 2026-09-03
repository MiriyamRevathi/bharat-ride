import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  X, 
  Shield, 
  ArrowRight, 
  Mail, 
  Lock, 
  Phone, 
  UserPlus, 
  KeyRound, 
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';

export const CustomerLoginModal: React.FC = () => {
  const {
    showCustomerLoginModal,
    setCustomerLoginModal,
    loginAsCustomer,
    loginCustomer,
    loginWithOtp,
    registerCustomer,
    users,
    navigateTo,
    authRedirect,
    selectedBus,
    selectedSeatNumbers,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'otp' | 'demo'>('login');
  
  // Login form state
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state
  const [otpPhone, setOtpPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCity, setRegCity] = useState('Hyderabad');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showCustomerLoginModal) return null;

  const demoUsers = (users || []).filter(u => u && u.role === 'CUSTOMER').slice(0, 3);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!loginEmailOrPhone.trim()) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginCustomer(loginEmailOrPhone, loginPassword);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 350);
  };

  const handleSendOtp = () => {
    const digits = otpPhone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage(null);
    setOtpSent(true);
    setOtpCode('1234');
    showToast('Demo OTP 1234 sent to your phone!', 'info');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!otpSent) {
      handleSendOtp();
      return;
    }
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 4-digit OTP code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginWithOtp(otpPhone, otpCode);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 350);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (regPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerCustomer({
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword || 'password123',
        city: regCity
      });
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={() => setCustomerLoginModal(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            {activeTab === 'register' ? <UserPlus className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              {authRedirect ? 'Login to Confirm Ticket' : 'Customer Account'}
            </h3>
            <p className="text-xs text-slate-500">Sign in or create account to manage journeys</p>
          </div>
        </div>

        {/* Pending Booking Notice */}
        {authRedirect && selectedBus && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-amber-900 text-xs">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Pending Booking:</span> {selectedBus.name} ({selectedSeatNumbers.join(', ')}). Your seats are held while you log in!
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setErrorMessage(null); }}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center text-[11px] ${
              activeTab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setErrorMessage(null); }}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center text-[11px] ${
              activeTab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('otp'); setErrorMessage(null); }}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center text-[11px] ${
              activeTab === 'otp' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            OTP Login
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('demo'); setErrorMessage(null); }}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center text-[11px] ${
              activeTab === 'demo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Demo Profiles
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {errorMessage}
          </div>
        )}

        {/* 1. Standard Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email or Mobile</label>
              <div className="relative">
                <input
                  type="text"
                  value={loginEmailOrPhone}
                  onChange={e => setLoginEmailOrPhone(e.target.value)}
                  placeholder="e.g. rajesh.sharma@gmail.com or 9848022334"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Password (e.g. password123)"
                  className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {isSubmitting ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>{authRedirect ? 'Log In & Continue Booking' : 'Log In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                placeholder="e.g. Ananya Rao"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="name@mail.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="password123"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={regCity}
                  onChange={e => setRegCity(e.target.value)}
                  placeholder="e.g. Hyderabad"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
            >
              {isSubmitting ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>{authRedirect ? 'Register & Confirm Booking' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 3. OTP Login */}
        {activeTab === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  maxLength={10}
                  value={otpPhone}
                  onChange={e => setOtpPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit mobile"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpPhone.length < 10}
                  className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  {otpSent ? 'Resend' : 'Get OTP'}
                </button>
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">4-Digit OTP</label>
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter OTP (e.g. 1234)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold tracking-widest text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                  required
                />
                <p className="text-[11px] text-emerald-600 mt-1 font-medium">✓ Demo OTP 1234 auto-filled</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
            >
              {isSubmitting ? <span>Verifying...</span> : <span>{otpSent ? 'Verify & Continue' : 'Send OTP'}</span>}
            </button>
          </form>
        )}

        {/* 4. Demo Accounts Preset */}
        {activeTab === 'demo' && (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-500 mb-2">Click any passenger profile for instant 1-click test login:</p>
            {demoUsers.map((user, idx) => (
              <button
                key={user.id}
                onClick={() => loginAsCustomer(user.id)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {user.name} {idx === 0 && <span className="text-[9px] bg-rose-100 text-rose-700 px-1 py-0.2 rounded ml-1">Default</span>}
                    </div>
                    <div className="text-[10px] text-slate-500">{user.phone}</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition-all" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Footer Link to Full Pages */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => { setCustomerLoginModal(false); navigateTo('login'); }}
            className="hover:text-rose-600 font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open Dedicated Login Page</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure Checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
};

