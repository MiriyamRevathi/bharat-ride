import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Passenger } from '../../types';
import {
  ArrowLeft, ArrowRight, User, Phone, Mail,
  CheckCircle2, Tag, Utensils, Shield, Plus, Minus, X, LogIn
} from 'lucide-react';

export const CustomerPassengerDetails: React.FC = () => {
  const {
    currentUser,
    selectedBus,
    selectedSchedule,
    selectedSeatNumbers,
    passengers,
    setPassengerInfo,
    contactDetails,
    setContactInfo,
    boardingPoint,
    droppingPoint,
    appliedOffer,
    applyOffer,
    removeOffer,
    offers,
    foodAddons,
    updateFoodAddonQuantity,
    calculateFare,
    navigateTo,
    showToast,
    requireLoginThen
  } = useApp();

  // Local state for passengers
  const [localPassengers, setLocalPassengers] = useState<Passenger[]>(() => {
    return selectedSeatNumbers.map((seatNum, idx) => {
      const existing = passengers.find(p => p.seatNumber === seatNum);
      return (
        existing || {
          id: `pass_${Date.now()}_${idx}`,
          name: idx === 0 ? (currentUser?.name || '') : '',
          age: idx === 0 ? 32 : 28,
          gender: 'MALE',
          seatNumber: seatNum
        }
      );
    });
  });

  const [contactPhone, setContactPhone] = useState(currentUser?.phone || contactDetails.phone || '');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || contactDetails.email || '');
  const [couponInput, setCouponInput] = useState('');
  const [showFoodSection, setShowFoodSection] = useState(true);

  // Sync if currentUser logs in or changes
  useEffect(() => {
    if (currentUser) {
      setLocalPassengers(prev => {
        if (prev.length > 0 && !prev[0].name) {
          const updated = [...prev];
          updated[0] = { ...updated[0], name: currentUser.name };
          return updated;
        }
        return prev;
      });
      if (currentUser.phone && !contactPhone) setContactPhone(currentUser.phone);
      if (currentUser.email && !contactEmail) setContactEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!selectedBus || !selectedSchedule || selectedSeatNumbers.length === 0 || !boardingPoint || !droppingPoint) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Incomplete Selection</h3>
        <p className="text-xs text-slate-500 mb-4">Please complete seat and boarding selection first.</p>
        <button
          onClick={() => navigateTo('search')}
          className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Return to Bus Search
        </button>
      </div>
    );
  }

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...localPassengers];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setLocalPassengers(updated);
  };

  const handleApplyCoupon = (code: string) => {
    applyOffer(code);
  };

  const handleProceedToPayment = () => {
    // Validate passengers
    for (let i = 0; i < localPassengers.length; i++) {
      if (!localPassengers[i].name.trim()) {
        showToast(`Please enter passenger name for Seat ${localPassengers[i].seatNumber}.`, 'error');
        return;
      }
      if (!localPassengers[i].age || localPassengers[i].age < 1 || localPassengers[i].age > 120) {
        showToast(`Please enter a valid age for Seat ${localPassengers[i].seatNumber}.`, 'error');
        return;
      }
    }

    if (!contactPhone.trim() || contactPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    if (!contactEmail.trim() || !contactEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setPassengerInfo(localPassengers);
    setContactInfo({ phone: contactPhone, email: contactEmail });
    if (!currentUser) {
      requireLoginThen('payment');
      return;
    }
    navigateTo('payment');
  };

  const fare = calculateFare();
  const activeOffers = (offers || []).filter(o => o && o.status === 'ACTIVE');

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('boarding_dropping')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Boarding</span>
          </button>
          <div className="text-right">
            <h2 className="text-base font-extrabold text-slate-900">{selectedBus.name}</h2>
            <p className="text-xs text-slate-500">Boarding: {boardingPoint.name} ({boardingPoint.time})</p>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs mb-6 flex items-center justify-between text-xs font-semibold overflow-x-auto">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <span>Seats</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <span>Boarding</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-rose-600 font-bold">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">3</span>
            <span>Passenger Details</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">4</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Guest Login Suggestion Banner */}
        {!currentUser && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900 font-medium">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">💡</span>
              <div>
                <span className="font-bold">Already have a BharatRide account?</span> Log in to auto-fill saved passengers and apply member coupons.
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => requireLoginThen('passengers')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  requireLoginThen('passengers');
                  navigateTo('register');
                }}
                className="px-3 py-1.5 bg-white text-amber-800 border border-amber-300 rounded-lg text-xs font-bold hover:bg-amber-50 transition-colors cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Passenger Info Forms */}
          <div className="lg:col-span-8 space-y-6">
            {/* Passenger Forms */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Passenger Information</h3>
                  <p className="text-xs text-slate-500">Government ID matching names recommended for check-in</p>
                </div>
              </div>

              <div className="space-y-4">
                {localPassengers.map((passenger, index) => (
                  <div key={passenger.seatNumber} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[11px]">
                          Seat {passenger.seatNumber}
                        </span>
                        <span>Passenger {index + 1}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      {/* Name */}
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Rajesh Sharma"
                          value={passenger.name}
                          onChange={e => handlePassengerChange(index, 'name', e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                        />
                      </div>

                      {/* Age */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Age (Years)</label>
                        <input
                          type="number"
                          placeholder="30"
                          min={1}
                          max={120}
                          value={passenger.age || ''}
                          onChange={e => handlePassengerChange(index, 'age', Number(e.target.value))}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                        />
                      </div>

                      {/* Gender */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Gender</label>
                        <select
                          value={passenger.gender}
                          onChange={e => handlePassengerChange(index, 'gender', e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Contact Details</h3>
                  <p className="text-xs text-slate-500">Your M-Ticket and live bus tracking SMS will be sent here</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={contactPhone}
                      onChange={e => setContactPhone(e.target.value)}
                      className="w-full pl-11 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="passenger@example.com"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Food Addons Selection Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Travel Food &amp; Refreshments</h3>
                    <p className="text-xs text-slate-500">Hygenic meal packs delivered to your seat during highway halt</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {foodAddons.map(item => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        <span className="text-xs font-bold text-slate-900 truncate">{item.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.description}</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">₹{item.price}</div>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateFoodAddonQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer disabled:opacity-30"
                        disabled={item.quantity === 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateFoodAddonQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Promo Coupons & Fare Breakdown */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Promo Code Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100">
                <Tag className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Coupons &amp; Offers</h4>
              </div>

              {appliedOffer ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{appliedOffer.code} Applied</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">₹{fare.discount} instant savings</div>
                  </div>
                  <button
                    onClick={removeOffer}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-emerald-100 transition-colors cursor-pointer"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER COUPON"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold uppercase"
                    />
                    <button
                      onClick={() => handleApplyCoupon(couponInput)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Quick Click Offers */}
                  <div className="space-y-2 pt-1">
                    {activeOffers.slice(0, 3).map(offer => (
                      <div
                        key={offer.id}
                        className="p-2.5 rounded-lg border border-dashed border-slate-200 hover:border-rose-300 bg-slate-50/50 flex items-center justify-between text-xs cursor-pointer group"
                        onClick={() => handleApplyCoupon(offer.code)}
                      >
                        <div>
                          <span className="font-mono font-bold text-slate-800 group-hover:text-rose-600">{offer.code}</span>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{offer.description}</p>
                        </div>
                        <span className="text-[10px] font-bold text-rose-600 group-hover:underline">Apply</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Total Fare Breakdown Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 mb-3 border-b border-slate-100">
                Fare Summary
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Seats ({selectedSeatNumbers.length} seat(s)):</span>
                  <span className="font-semibold text-slate-900">₹{fare.seatFaresTotal}</span>
                </div>

                {fare.foodAddonsTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Food &amp; Meals:</span>
                    <span className="font-semibold text-slate-900">₹{fare.foodAddonsTotal}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>GST Taxes (5%):</span>
                  <span className="font-semibold text-slate-900">₹{fare.taxes}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Service Fee:</span>
                  <span className="font-semibold text-slate-900">₹{fare.serviceFee}</span>
                </div>

                {fare.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount:</span>
                    <span>-₹{fare.discount}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">Final Payable:</span>
                  <span className="text-2xl font-black text-rose-600">₹{fare.totalAmount}</span>
                </div>
              </div>

              {/* Proceed to Payment CTA */}
              <button
                onClick={handleProceedToPayment}
                className="w-full mt-5 py-3.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white font-bold rounded-xl text-xs shadow-lg hover:shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Safe Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                <span>100% Secure 256-Bit Encrypted Demo Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
