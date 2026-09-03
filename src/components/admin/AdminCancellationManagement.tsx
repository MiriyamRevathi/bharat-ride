import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  XCircle, CheckCircle2, Clock, AlertTriangle,
  IndianRupee, Search, ShieldCheck
} from 'lucide-react';

export const AdminCancellationManagement: React.FC = () => {
  const { bookings } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const cancelledBookings = bookings.filter(b => b.bookingStatus === 'CANCELLED');

  const filteredCancellations = cancelledBookings.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.id.toLowerCase().includes(q) ||
      (c.cancellationReason && c.cancellationReason.toLowerCase().includes(q)) ||
      c.customerName.toLowerCase().includes(q)
    );
  });

  const totalRefunded = cancelledBookings.reduce((acc, c) => acc + (c.refundAmount || Math.round(c.fareBreakdown.totalAmount * 0.85)), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Ticket Cancellations &amp; Refunds Ledger</h1>
          <p className="text-xs text-slate-400">Processed refund audits, policy deductions, and cancellation reasons.</p>
        </div>

        <div className="px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-2 text-rose-400">
          <IndianRupee className="w-4 h-4" />
          <span className="text-xs font-bold">Total Refund Disbursed: ₹{totalRefunded.toLocaleString()}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <input
          type="text"
          placeholder="Search cancellation ID, booking ID, reason..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-500"
        />
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          {filteredCancellations.length} Cancel Records
        </span>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Cancel Ref</th>
                <th className="p-4">Booking PNR</th>
                <th className="p-4">Reason Stated</th>
                <th className="p-4">Refund Amount</th>
                <th className="p-4">Policy Deduction</th>
                <th className="p-4">Processed At</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredCancellations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No cancellations recorded yet.
                  </td>
                </tr>
              ) : (
                filteredCancellations.map(c => {
                  const originalTotal = c.fareBreakdown?.totalAmount || c.totalAmount || 0;
                  const refund = c.refundAmount || Math.round(originalTotal * 0.85);
                  const deduction = originalTotal - refund;

                  return (
                    <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-rose-400">CNCL-{(c.id || '').slice(-6)}</td>
                      <td className="p-4 font-mono font-bold text-white">{c.id}</td>
                      <td className="p-4 font-medium text-slate-300 max-w-xs">{c.cancellationReason || 'Requested by customer'}</td>
                      <td className="p-4 font-black text-emerald-400 text-sm">
                        ₹{refund}
                      </td>
                      <td className="p-4 font-semibold text-rose-400">
                        -₹{deduction}
                      </td>
                      <td className="p-4 text-slate-400">
                        {new Date(c.cancelledAt || c.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{c.refundStatus || 'PROCESSED'}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
