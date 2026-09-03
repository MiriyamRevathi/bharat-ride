import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tag, Copy, Check, Sparkles, ArrowRight, ShieldCheck,
  Calendar, Percent, Gift
} from 'lucide-react';

export const CustomerOffersPage: React.FC = () => {
  const { offers, applyOffer, navigateTo, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyAndBook = (code: string) => {
    applyOffer(code);
    navigateTo('search');
  };

  const activeOffers = offers.filter(o => o.status === 'ACTIVE');

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-3">
            <Gift className="w-3.5 h-3.5 text-rose-600" />
            <span>Exclusive Travel Deals &amp; Discounts</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">BharatRide Coupons &amp; Offers</h1>
          <p className="text-xs text-slate-500">
            Save big on your intercity bus tickets with our verified promotional promo codes and cashback offers.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activeOffers.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white flex items-center justify-center font-bold shadow-xs">
                  <Tag className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Active Verified
                </span>
              </div>

              {/* Offer Info */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-900 mb-1">{offer.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{offer.description}</p>

                <div className="space-y-1.5 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between">
                    <span>Discount Value:</span>
                    <span className="font-bold text-slate-800">
                      {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}% OFF (up to ₹${offer.maxDiscountAmount})` : `Flat ₹${offer.discountValue} OFF`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minimum Booking:</span>
                    <span className="font-bold text-slate-800">₹{offer.minBookingAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Until:</span>
                    <span className="font-bold text-slate-800">{offer.validUntil}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code & Action Box */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-xs font-extrabold text-slate-900">
                  <span>{offer.code}</span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="text-slate-500 hover:text-slate-900 cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode === offer.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  onClick={() => handleApplyAndBook(offer.code)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
