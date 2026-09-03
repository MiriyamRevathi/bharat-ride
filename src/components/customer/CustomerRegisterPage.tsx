import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserPlus, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  Ticket,
  Gift,
  Clock
} from 'lucide-react';

export const CustomerRegisterPage: React.FC = () => {
  const {
    registerCustomer,
    navigateTo,
    authRedirect,
    selectedBus,
    selectedSeatNumbers
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: 'MALE' as 'MALE' | 'FEMALE' | 'OTHER',
    city: 'Hyderabad',
    agreeTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const indianCities = [
    'Hyderabad',
    'Bengaluru',
    'Chennai',
    'Mumbai',
    'Pune',
    'Vijayawada',
    'Visakhapatnam',
    'Delhi NCR',
    'Coimbatore',
    'Goa',
    'Tirupati'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Please agree to BharatRide Terms & Conditions.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerCustomer({
        name: formData.name,
        email: formData.email,
        phone: cleanPhone,
        password: formData.password || 'password123',
        gender: formData.gender,
        city: formData.city
      });
      setIsSubmitting(false);

      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 450);
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Left Informational & Branding Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-600 via-rose-700 to-amber-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight">BharatRide</h1>
                <p className="text-[11px] text-rose-100 font-medium">Smart Intercity Travel</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold">
                <Gift className="w-3.5 h-3.5" />
                <span>Special 50% Off Welcome Promo</span>
              </div>
              <h2 className="text-2xl font-black leading-tight">
                {authRedirect ? 'Create Account & Confirm Booking' : 'Join 250,000+ Smart Travelers'}
              </h2>
              <p className="text-xs text-rose-100/90 leading-relaxed">
                Register in less than a minute. Your confirmed booking and passenger profiles are automatically synced.
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
                  Seats: {(selectedSeatNumbers || []).join(', ') || 'Selected'} • Auto-resumes after signup
                </div>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-rose-50">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Save Passenger Names for 1-Click Fast Checkout</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-rose-50">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Ladies Seat Safety &amp; Priority Booking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-rose-50">
                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Real-Time WhatsApp Ticket &amp; Live Tracking</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-rose-100">
            <span>Customer First Guarantee</span>
            <span className="font-semibold text-amber-200">100% Safe Demo</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">Create Your Account</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fill in your details to register instantly</p>
              </div>
              <button
                onClick={() => navigateTo('login')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
              >
                Log In Instead
              </button>
            </div>

            {/* Pending Booking Notice */}
            {authRedirect && (
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-amber-900 text-xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Almost there!</strong> Creating an account lets us send your confirmed ticket QR code, driver contact, and GPS tracking link.
                </div>
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as on Govt ID) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                </div>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="10-digit mobile"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Password & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create password (optional)"
                      className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Home City / State
                  </label>
                  <div className="relative">
                    <select
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      {indianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Gender Radio Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Gender Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['MALE', 'FEMALE', 'OTHER'] as const).map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        formData.gender === g
                          ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {g === 'MALE' ? 'Male' : g === 'FEMALE' ? 'Female' : 'Other'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-slate-600 cursor-pointer leading-tight">
                  I agree to BharatRide's <span className="font-bold text-slate-800">Terms of Service</span>, <span className="font-bold text-slate-800">Cancellation Policy</span>, and consent to receive WhatsApp/SMS ticket updates.
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <span>Creating your account...</span>
                ) : (
                  <>
                    <span>{authRedirect ? 'Register & Resume Booking' : 'Complete Registration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Switch to Login */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => navigateTo('login')}
                className="font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
              >
                Sign In Here
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
    </div>
  );
};
