import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentTransaction } from '../../types';
import {
  CreditCard, Search, CheckCircle2, XCircle,
  Clock, IndianRupee, ArrowUpRight, RefreshCw
} from 'lucide-react';

export const AdminPaymentManagement: React.FC = () => {
  const { payments } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('ALL');

  const filteredPayments = payments.filter(p => {
    const matchesMethod = methodFilter === 'ALL' || p.paymentMethod === methodFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      p.id.toLowerCase().includes(q) ||
      p.bookingId.toLowerCase().includes(q) ||
      p.transactionRef.toLowerCase().includes(q) ||
      p.paymentMethod.toLowerCase().includes(q) ||
      (p.customerName && p.customerName.toLowerCase().includes(q));

    return matchesMethod && matchesQuery;
  });

  const totalProcessed = payments
    .filter(p => p.paymentStatus === 'SUCCESS')
    .reduce((acc, p) => acc + p.amount, 0);

  const methods = ['ALL', 'DEMO_UPI', 'DEMO_CARD', 'DEMO_WALLET', 'PAY_AT_BOARDING'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Payment &amp; Transaction Registry</h1>
          <p className="text-xs text-slate-400">All inbound gateway transactions, UPI references and settlement states.</p>
        </div>

        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400">
          <IndianRupee className="w-4 h-4" />
          <span className="text-xs font-bold">Total Settled: ₹{totalProcessed.toLocaleString()}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {methods.map(m => (
            <button
              key={m}
              onClick={() => setMethodFilter(m)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                methodFilter === m
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {m === 'ALL' ? 'All Channels' : m.replace('DEMO_', '')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search txn ref, payment ID, PNR..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Payment ID</th>
                <th className="p-4">Associated PNR</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Gateway Reference</th>
                <th className="p-4">Payment Channel</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-amber-400">{payment.id}</td>
                  <td className="p-4 font-mono font-bold text-white">{payment.bookingId}</td>
                  <td className="p-4 font-medium text-slate-300">{payment.customerName}</td>
                  <td className="p-4 font-mono text-slate-400">{payment.transactionRef}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-bold text-[11px]">
                      {payment.paymentMethod.replace('DEMO_', '')}
                    </span>
                  </td>
                  <td className="p-4 font-black text-white text-sm">
                    ₹{payment.amount}
                  </td>
                  <td className="p-4 text-slate-400">
                    {new Date(payment.date).toLocaleString()}
                  </td>
                  <td className="p-4">
                    {payment.paymentStatus === 'SUCCESS' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Success</span>
                      </span>
                    )}
                    {payment.paymentStatus === 'REFUNDED' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1 w-max">
                        <RefreshCw className="w-3 h-3" />
                        <span>Refunded</span>
                      </span>
                    )}
                    {payment.paymentStatus === 'FAILED' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-max">
                        <XCircle className="w-3 h-3" />
                        <span>Failed</span>
                      </span>
                    )}
                    {payment.paymentStatus === 'PENDING' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 w-max">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
