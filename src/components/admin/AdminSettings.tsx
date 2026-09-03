import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings, Save, RefreshCw, Shield, Bell,
  IndianRupee, Phone, Mail, CheckCircle2, AlertTriangle
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { resetDemoData, showToast } = useApp();

  const [gstRate, setGstRate] = useState(5);
  const [serviceFee, setServiceFee] = useState(25);
  const [cancellationRate, setCancellationRate] = useState(15);
  const [freeCancelHours, setFreeCancelHours] = useState(12);
  const [supportPhone, setSupportPhone] = useState('1800-419-8999');
  const [supportEmail, setSupportEmail] = useState('support@bharatride.in');
  const [instantUpiDemo, setInstantUpiDemo] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform operational parameters saved successfully.', 'success');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo state back to default seed data?')) {
      resetDemoData();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white">Platform Configuration &amp; Business Rules</h1>
        <p className="text-xs text-slate-400">Configure financial taxation, service charges, cancellation terms and helpline parameters.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Taxation and Fees Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <IndianRupee className="w-4 h-4" />
            <span>Financial &amp; Pricing Policies</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-xs mb-1">Standard GST Rate (%)</label>
              <input
                type="number"
                min={0}
                max={28}
                value={gstRate}
                onChange={e => setGstRate(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Applied to gross seat ticket value across all interstate journeys.</span>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-xs mb-1">Platform Service Fee (₹ per seat)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={serviceFee}
                onChange={e => setServiceFee(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Flat technology facilitation fee added to customer invoices.</span>
            </div>
          </div>
        </div>

        {/* Cancellation & Refund Policies */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Cancellation &amp; Refund Rules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-xs mb-1">Cancellation Deduction (%)</label>
              <input
                type="number"
                min={0}
                max={50}
                value={cancellationRate}
                onChange={e => setCancellationRate(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Percentage deducted when passenger cancels within the penalty window.</span>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-xs mb-1">Free Cancellation Window (Hours)</label>
              <input
                type="number"
                min={1}
                max={48}
                value={freeCancelHours}
                onChange={e => setFreeCancelHours(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Hours before scheduled departure allowing 100% refund.</span>
            </div>
          </div>
        </div>

        {/* Customer Support Helplines */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Phone className="w-4 h-4" />
            <span>Customer Care Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 font-bold uppercase text-xs mb-1">Toll Free Phone</label>
              <input
                type="text"
                value={supportPhone}
                onChange={e => setSupportPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase text-xs mb-1">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save System Parameters</span>
          </button>
        </div>
      </form>

      {/* Danger Zone: Reset Demo Data */}
      <div className="bg-rose-950/30 border border-rose-800/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Demo Data Management</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Need to restore all buses, express routes, mock seats, sample customer bookings, and promo coupons to the original demo dataset?
        </p>

        <button
          onClick={handleResetData}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Demo Data to Initial Defaults</span>
        </button>
      </div>
    </div>
  );
};
