import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import {
  ArrowLeft, Shield, Lock, CreditCard, Smartphone,
  Wallet, Building2, CheckCircle2, AlertCircle, RefreshCw,
  Sparkles, QrCode, Bus, LogIn, UserCheck
} from 'lucide-react';

export const CustomerPayment: React.FC = () => {
  const {
    currentUser,
    selectedBus,
    selectedSchedule,
    selectedSeatNumbers,
    passengers,
    boardingPoint,
    droppingPoint,
    calculateFare,
    processPayment,
    navigateTo,
    searchParams,
    requireLoginThen
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('demo.passenger@oksbi');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!selectedBus || !selectedSchedule || selectedSeatNumbers.length === 0 || !boardingPoint || !droppingPoint) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">No Active Booking</h3>
        <p className="text-xs text-slate-500 mb-4">Please initiate a booking before visiting payment.</p>
        <button
          onClick={() => navigateTo('search')}
          className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Return to Bus Search
        </button>
      </div>
    );
  }

  const fare = calculateFare();

  const handlePaySuccess = () => {
    // If not logged in, redirect to login page first to confirm account and link ticket
    if (!currentUser) {
      requireLoginThen('payment');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);
    setTimeout(() => {
      processPayment(paymentMethod, true);
      setIsProcessing(false);
    }, 1200);
  };

  const handlePayFailure = () => {
    setIsProcessing(true);
    setPaymentError(null);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentError('Bank Gateway Error (Simulated): Transaction timed out from the issuer bank. No funds were debited.');
    }, 900);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('passenger_details')}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Passenger Details</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Safe Demo Payment Mode</span>
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
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <span>Passengers</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-rose-600 font-bold">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">4</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Error notification if simulated failure */}
        {paymentError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-rose-900">Payment Simulation Notice</h4>
              <p className="text-xs text-rose-700 mt-0.5">{paymentError}</p>
              <button
                onClick={handlePaySuccess}
                className="mt-3 px-4 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry with Successful Payment Simulation</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Payment Methods */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 mb-4 border-b border-slate-100">
              Select Payment Method
            </h3>

            {/* Methods Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                { id: 'CARD', label: 'Credit/Debit Card', icon: CreditCard },
                { id: 'NET_BANKING', label: 'Net Banking', icon: Building2 },
                { id: 'WALLET', label: 'BharatRide Wallet', icon: Wallet },
                { id: 'PAY_AT_BUS', label: 'Pay on Boarding', icon: Bus },
              ].map(method => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method.id as PaymentMethod);
                      setPaymentError(null);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/50 text-rose-700 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
                    <span className="text-xs">{method.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method Details Input Area */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              {paymentMethod === 'UPI' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Scan &amp; Pay via Any UPI App</div>
                      <div className="text-[11px] text-slate-500">GPay, PhonePe, Paytm, BHIM, Amazon Pay</div>
                    </div>
                    <QrCode className="w-8 h-8 text-slate-700" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Demo UPI Virtual ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'CARD' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Card Number (Demo Preset)</label>
                    <input
                      type="text"
                      readOnly
                      value="4111 •••• •••• 8892"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Expiry</label>
                      <input
                        type="text"
                        readOnly
                        value="08 / 2029"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">CVV</label>
                      <input
                        type="password"
                        readOnly
                        value="888"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'NET_BANKING' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={e => setSelectedBank(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 cursor-pointer"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'WALLET' && (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">BharatRide Cash Balance</div>
                    <div className="text-[11px] text-emerald-600 font-bold">₹5,000.00 Available</div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                    Sufficient Balance
                  </span>
                </div>
              )}

              {paymentMethod === 'PAY_AT_BUS' && (
                <div>
                  <div className="text-xs font-bold text-slate-800">Pay directly to the bus conductor</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Your seat is reserved. Please carry exact cash or UPI for payment at boarding.
                  </div>
                </div>
              )}
            </div>

            {/* Guest Authentication Banner before Confirmation */}
            {!currentUser && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <LogIn className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-rose-900">Account Login Required to Confirm</h5>
                    <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                      You are booking as a Guest. To receive your confirmed M-Ticket SMS, WhatsApp QR pass, and live GPS tracking, please log in or register before final confirmation.
                    </p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        type="button"
                        onClick={() => requireLoginThen('payment')}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <LogIn className="w-3 h-3" />
                        <span>Log In Now</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          requireLoginThen('payment');
                          navigateTo('register');
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>Sign Up</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons: Simulate Success & Simulate Failure */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handlePaySuccess}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Demo Authorization...</span>
                  </>
                ) : !currentUser ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Log In to Confirm Booking (₹{fare.totalAmount})</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pay ₹{fare.totalAmount} (Confirm Booking for {currentUser.name})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePayFailure}
                disabled={isProcessing}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-semibold rounded-xl text-xs border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Simulate Payment Failure &amp; Error Handling</span>
              </button>
            </div>
          </div>

          {/* Right Column: Ticket Overview Sidebar */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 mb-3 border-b border-slate-100">
              Trip Itinerary
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-extrabold text-slate-900 text-sm block">{selectedBus.name}</span>
                <span className="text-[11px] text-slate-500">{selectedBus.busType} • {selectedBus.operator}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-slate-800">{searchParams.fromCity} → {searchParams.toCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travel Date:</span>
                  <span className="font-bold text-slate-800">{searchParams.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pickup:</span>
                  <span className="font-bold text-slate-800">{boardingPoint.name} ({boardingPoint.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Drop:</span>
                  <span className="font-bold text-slate-800">{droppingPoint.name} ({droppingPoint.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Seats:</span>
                  <span className="font-bold text-rose-600">{(selectedSeatNumbers || []).join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Passengers:</span>
                  <span className="font-bold text-slate-800">{passengers.length} Person(s)</span>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Seats Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{fare.seatFaresTotal}</span>
                </div>
                {fare.foodAddonsTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Food Meals:</span>
                    <span className="font-semibold text-slate-900">₹{fare.foodAddonsTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Taxes &amp; Fees:</span>
                  <span className="font-semibold text-slate-900">₹{fare.taxes + fare.serviceFee}</span>
                </div>
                {fare.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Savings:</span>
                    <span>-₹{fare.discount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">Total Payable:</span>
                  <span className="text-xl font-black text-rose-600">₹{fare.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Free cancellation eligible until 12 hours before departure. 100% money-back guarantee.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
