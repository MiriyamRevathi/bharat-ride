import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Offer } from '../../types';
import {
  Tag, Plus, Edit2, Trash2, CheckCircle2,
  Calendar, Percent, IndianRupee, X
} from 'lucide-react';

export const AdminOfferManagement: React.FC = () => {
  const { offers, addOffer, updateOffer, deleteOffer, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  // Form State
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FLAT'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState(15);
  const [minBookingAmount, setMinBookingAmount] = useState(500);
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(200);
  const [validUntil, setValidUntil] = useState('31 Dec 2026');

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setCode(`SAVE${Math.floor(10 + Math.random() * 90)}`);
    setTitle('Special Highway Travel Discount');
    setDescription('Get instant cashback discount on all express luxury bookings.');
    setDiscountType('PERCENTAGE');
    setDiscountValue(15);
    setMinBookingAmount(500);
    setMaxDiscountAmount(200);
    setValidUntil('31 Dec 2026');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setCode(offer.code);
    setTitle(offer.title);
    setDescription(offer.description);
    setDiscountType(offer.discountType);
    setDiscountValue(offer.discountValue);
    setMinBookingAmount(offer.minBookingAmount);
    setMaxDiscountAmount(offer.maxDiscount || 200);
    setValidUntil(offer.validUntil);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) {
      showToast('Please provide coupon code and title.', 'error');
      return;
    }

    if (editingOffer) {
      updateOffer(editingOffer.id, {
        code: code.toUpperCase(),
        title,
        description,
        discountType,
        discountValue: Number(discountValue),
        minBookingAmount: Number(minBookingAmount),
        maxDiscount: Number(maxDiscountAmount),
        validUntil
      });
    } else {
      addOffer({
        code: code.toUpperCase(),
        title,
        description,
        discountType,
        discountValue: Number(discountValue),
        minBookingAmount: Number(minBookingAmount),
        maxDiscount: Number(maxDiscountAmount),
        validUntil,
        status: 'ACTIVE',
        usageLimit: 500
      });
    }

    setIsAddModalOpen(false);
  };

  const toggleStatus = (offer: Offer) => {
    const next = offer.status === 'ACTIVE' ? 'EXPIRED' : 'ACTIVE';
    updateOffer(offer.id, { status: next });
  };

  const filteredOffers = offers.filter(o =>
    o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Coupons &amp; Promotional Offers</h1>
          <p className="text-xs text-slate-400">Configure promo codes, percentage discounts, minimum thresholds and expiry.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Grid of Offers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOffers.map(offer => (
          <div
            key={offer.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {offer.code}
                </span>
                <button
                  onClick={() => toggleStatus(offer)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                    offer.status === 'ACTIVE'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {offer.status}
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{offer.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{offer.description}</p>

              <div className="space-y-1 text-xs text-slate-400 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span>Benefit:</span>
                  <span className="font-bold text-white">
                    {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}% OFF (Max ₹${offer.maxDiscountAmount})` : `Flat ₹${offer.discountValue} OFF`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Min Booking:</span>
                  <span className="font-bold text-white">₹{offer.minBookingAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Redeemed Count:</span>
                  <span className="font-bold text-amber-400">{offer.usedCount} times</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid Until:</span>
                  <span className="font-bold text-slate-300">{offer.validUntil}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(offer)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Edit Coupon"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteOffer(offer.id)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-400 cursor-pointer"
                title="Delete Coupon"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingOffer ? 'Edit Promo Coupon' : 'Create New Promo Coupon'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BHARAT15"
                    value={code}
                    onChange={e => setCode(e.target.value.toUpperCase())}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold cursor-pointer"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FLAT">Flat Amount (₹)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15% Off on Volvo Multi-Axle Trips"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                ></textarea>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Value ({discountType === 'PERCENTAGE' ? '%' : '₹'})</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={discountValue}
                    onChange={e => setDiscountValue(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Min Booking (₹)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={minBookingAmount}
                    onChange={e => setMinBookingAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={maxDiscountAmount}
                    onChange={e => setMaxDiscountAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Valid Until Date</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 31 Dec 2026"
                  value={validUntil}
                  onChange={e => setValidUntil(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {editingOffer ? 'Save Changes' : 'Publish Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
