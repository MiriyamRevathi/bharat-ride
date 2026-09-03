import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  AlertTriangle, X, ShieldAlert, CheckCircle2,
  DollarSign, ArrowRight
} from 'lucide-react';

interface CustomerCancelModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const CustomerCancelModal: React.FC<CustomerCancelModalProps> = ({
  booking,
  onClose
}) => {
  const { cancelCustomerBooking } = useApp();
  const [reason, setReason] = useState('Change of travel plans');
  const [customReason, setCustomReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!booking) return null;

  // Calculate cancellation deduction (15% standard deduction as per system policy)
  const deductionRate = 0.15;
  const deductionAmount = Math.round(booking.totalAmount * deductionRate);
  const calculatedRefund = Math.max(0, booking.totalAmount - deductionAmount);

  const handleConfirmCancel = () => {
    setIsProcessing(true);
    const finalReason = reason === 'Other' ? customReason || 'Other reason' : reason;
    setTimeout(() => {
      cancelCustomerBooking(booking.id, finalReason);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Cancel Bus Ticket</h3>
            <p className="text-xs text-slate-500">Booking Reference: <span className="font-mono font-bold text-slate-700">{booking.id}</span></p>
          </div>
        </div>

        {/* Refund Calculation Summary Box */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-5 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Original Ticket Paid:</span>
            <span className="font-semibold text-slate-900">₹{booking.totalAmount}</span>
          </div>
          <div className="flex justify-between text-rose-600">
            <span>Cancellation Policy Deduction (15%):</span>
            <span className="font-semibold">-₹{deductionAmount}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm">
            <span className="font-bold text-slate-900">Total Refund to be Credited:</span>
            <span className="text-lg font-extrabold text-emerald-600">₹{calculatedRefund}</span>
          </div>
          <div className="text-[10px] text-slate-500 pt-1">
            Refund will be processed directly to your original <span className="font-bold text-slate-700">{booking.paymentMethod}</span> account within 2-4 hours.
          </div>
        </div>

        {/* Cancellation Reason Dropdown */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Reason for Cancellation</label>
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 mb-2 cursor-pointer"
          >
            <option value="Change of travel plans">Change of travel plans</option>
            <option value="Booked incorrect date or time slot">Booked incorrect date or time slot</option>
            <option value="Emergency at home/work">Emergency at home/work</option>
            <option value="Found alternative mode of transport">Found alternative mode of transport</option>
            <option value="Other">Other reason</option>
          </select>

          {reason === 'Other' && (
            <input
              type="text"
              placeholder="Please specify reason..."
              value={customReason}
              onChange={e => setCustomReason(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
            />
          )}
        </div>

        {/* Seat Release Alert */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 mb-6 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>Seats ({(booking.selectedSeats || booking.seatNumbers || []).join(', ')}) will be released immediately and made available for other passengers.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Keep Ticket
          </button>
          <button
            type="button"
            onClick={handleConfirmCancel}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>{isProcessing ? 'Cancelling...' : 'Confirm Cancellation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
