import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LogIn, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  KeyRound, 
  ArrowLeft,
  Ticket,
  Clock,
  Navigation
} from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const {
    loginCustomer,
    loginWithOtp,
    loginAsCustomer,
    users,
    navigateTo,
    authRedirect,
    selectedBus,
    selectedSeatNumbers,
    showToast
  } = useApp();

  const [authMethod, setAuthMethod] = useState<'password' | 'otp' | 'demo'>('password');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneForOtp, setPhoneForOtp] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const demoCustomers = (users || []).filter(u => u && u.role === 'CUSTOMER').slice(0, 4);

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your registered email address or 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginCustomer(emailOrPhone, password);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  const handleSendOtp = () => {
    const digits = phoneForOtp.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number to receive OTP.');
      return;
    }
    setErrorMessage(null);
    setOtpSent(true);
    setOtpCode('1234'); // Auto-fill default demo OTP for fast user experience
    showToast('Demo OTP 1234 sent to your mobile number!', 'info');
    setOtpTimer(30);

    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!otpSent) {
      handleSendOtp();
      return;
    }

    if (!otpCode.trim() || otpCode.length < 4) {
      setErrorMessage('Please enter the 4-digit OTP.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginWithOtp(phoneForOtp, otpCode);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Left Informational & Branding Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-600 via-rose-700 to-amber-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight">BharatRide</h1>
                <p className="text-[11px] text-rose-100 font-medium">India's Smart Intercity Bus Network</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-black leading-tight">
                {authRedirect ? 'Log In to Confirm Your Journey' : 'Welcome Back, Traveler!'}
              </h2>
              <p className="text-xs text-rose-100/90 leading-relaxed">
                Sign in to manage active tickets, track your bus in real-time, get instant refunds, and unlock exclusive discounts.
              </p>
            </div>

            {/* If redirected from checkout/booking */}
            {authRedirect && selectedBus && (
              <div className="mt-6 p-3.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25">
                <div className="flex items-center gap-2 text-amber-200 text-xs font-bold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending Booking Held</span>
                </div>
                <div className="text-xs font-semibold text-white">{selectedBus.name}</div>
                <div className="text-[11px] text-rose-100">
                  Seats: {(selectedSeatNumbers || []).join(', ') || 'Selected'} • Instant resume after login
                </div>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-rose-50">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Instant Ticket SMS, Email &amp; WhatsApp</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-rose-50">
                <Navigation className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Live GPS Bus Tracking with Speed &amp; ETA</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-rose-50">
                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Zero-stress Instant Refund on Cancellations</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-rose-100">
            <span>24x7 Customer Support</span>
            <span className="font-mono font-bold text-white">1800-425-8899</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Header Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">Sign In to Your Account</h3>
                <p className="text-xs text-slate-500 mt-0.5">Choose your preferred login method</p>
              </div>
              <button
                onClick={() => navigateTo('register')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
              >
                Register New
              </button>
            </div>

            {/* Pending Booking Notice */}
            {authRedirect && (
              <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-amber-900 text-xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Confirmation Step:</strong> Please log in or register once so your ticket confirmation and live travel updates are safely linked to your profile.
                </div>
              </div>
            )}

            {/* Auth Method Selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setAuthMethod('password'); setErrorMessage(null); }}
                className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
                  authMethod === 'password'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod('otp'); setErrorMessage(null); }}
                className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
                  authMethod === 'otp'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod('demo'); setErrorMessage(null); }}
                className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
                  authMethod === 'demo'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Quick Demo
              </button>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {errorMessage}
              </div>
            )}

            {/* 1. Password Login Mode */}
            {authMethod === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address or Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={emailOrPhone}
                      onChange={e => setEmailOrPhone(e.target.value)}
                      placeholder="e.g. rajesh.sharma@gmail.com or 9848022334"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your account password (e.g. password123)"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Hint: Default demo passwords are auto-accepted (or enter any password)</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Verifying credentials...</span>
                  ) : (
                    <>
                      <span>{authRedirect ? 'Log In & Confirm Booking' : 'Log In to BharatRide'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 2. Mobile OTP Login Mode */}
            {authMethod === 'otp' && (
              <form onSubmit={handleOtpLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    10-Digit Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-600">
                      +91
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneForOtp}
                        onChange={e => setPhoneForOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter mobile number"
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        required
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={phoneForOtp.length < 10 || (otpSent && otpTimer > 0)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors whitespace-nowrap"
                    >
                      {otpSent && otpTimer > 0 ? `Resend (${otpTimer}s)` : otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="animate-in fade-in duration-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      4-Digit Verification Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 4-digit OTP"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold tracking-widest text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                        required
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-emerald-600 font-medium mt-1.5">
                      <span>✓ Demo code auto-filled: 1234</span>
                      <button
                        type="button"
                        onClick={() => setOtpCode('1234')}
                        className="text-rose-600 font-bold hover:underline cursor-pointer"
                      >
                        Auto Fill 1234
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Verifying OTP...</span>
                  ) : otpSent ? (
                    <>
                      <span>Verify OTP &amp; Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Send OTP to Mobile</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 3. Quick Demo Passenger Select */}
            {authMethod === 'demo' && (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-600 font-medium mb-3">
                  Select any pre-configured Indian passenger profile for instant 1-click login:
                </p>
                {demoCustomers.map((user, idx) => (
                  <button
                    key={user.id}
                    onClick={() => loginAsCustomer(user.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/50 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors flex items-center gap-1.5">
                          <span>{user.name}</span>
                          {idx === 0 && (
                            <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded-sm">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {user.phone} • {user.email}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Switch to Register / Guest Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-600">
              Don't have a BharatRide account?{' '}
              <button
                onClick={() => navigateTo('register')}
                className="font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
              >
                Sign Up Now
              </button>
            </div>
            <button
              onClick={() => navigateTo(authRedirect || 'home')}
              className="text-slate-400 hover:text-slate-600 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue as Guest</span>
            </button>
          </div>
        </div>

      </div>

      {/* Forgot Password Helper Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <KeyRound className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Demo Password Recovery</h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              In this demo environment, all customer profiles have the standard password: <code className="bg-slate-100 text-rose-600 font-bold px-1.5 py-0.5 rounded">password123</code> or you can instantly sign in using the Mobile OTP / Quick Demo tabs.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPassword('password123');
                  setShowForgotModal(false);
                  showToast('Password autofilled: password123', 'info');
                }}
                className="flex-1 py-2 px-3 bg-rose-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Fill Password
              </button>
              <button
                onClick={() => setShowForgotModal(false)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
