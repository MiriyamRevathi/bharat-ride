import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  Ticket, Search, Filter, CheckCircle2,
  XCircle, Clock, ArrowRight, Eye, AlertTriangle, X
} from 'lucide-react';

export const AdminBookingManagement: React.FC = () => {
  const { bookings, buses, routes, cancelCustomerBooking, openTicketView, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const bus = buses.find(x => x.id === b.busId);
    const matchesQuery =
      b.id.toLowerCase().includes(q) ||
      b.contactPhone.includes(q) ||
      b.contactEmail.toLowerCase().includes(q) ||
      bus?.name.toLowerCase().includes(q) ||
      b.passengers.some(p => p.name.toLowerCase().includes(q));

    return matchesStatus && matchesQuery;
  });

  const handleConfirmCancel = () => {
    if (cancellingBooking) {
      cancelCustomerBooking(cancellingBooking.id, 'Admin operations override');
      setCancellingBooking(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Master Reservations Ledger</h1>
          <p className="text-xs text-slate-400">All passenger tickets, seat allocations, and payment verification records.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === tab
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search PNR, phone, name, bus..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">PNR / Ref</th>
                <th className="p-4">Traveler / Contact</th>
                <th className="p-4">Bus Service &amp; Route</th>
                <th className="p-4">Seats Allocated</th>
                <th className="p-4">Travel Date</th>
                <th className="p-4">Fare &amp; Mode</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredBookings.map(booking => {
                const bus = buses.find(b => b.id === booking.busId);
                const route = routes.find(r => r.id === booking.routeId);

                return (
                  <tr key={booking.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-400">{booking.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">{booking.passengers[0]?.name || booking.customerName || 'Passenger'}</div>
                      <div className="text-[11px] text-slate-400 font-mono">+91 {booking.contactPhone || booking.customerPhone || '9876543210'}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{bus?.name || booking.busName}</div>
                      <div className="text-[10px] text-slate-400">
                        {route?.sourceCity || booking.sourceCity} → {route?.destinationCity || booking.destinationCity}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-white font-bold">
                        {(booking.selectedSeats || booking.seatNumbers || []).join(', ')}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-slate-300">{booking.travelDate}</td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">₹{booking.totalAmount || booking.fareBreakdown?.totalAmount || 0}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{booking.paymentMethod}</div>
                    </td>
                    <td className="p-4">
                      {(booking.bookingStatus === 'CONFIRMED' || booking.status === 'CONFIRMED') && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Confirmed
                        </span>
                      )}
                      {(booking.bookingStatus === 'COMPLETED' || booking.status === 'COMPLETED') && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Completed
                        </span>
                      )}
                      {(booking.bookingStatus === 'CANCELLED' || booking.status === 'CANCELLED') && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {booking.status === 'CONFIRMED' && (
                          <button
                            onClick={() => setCancellingBooking(booking)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-400 cursor-pointer"
                            title="Cancel Reservation"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Booking Details #{selectedBooking.id}</h3>
                <span className="text-[11px] text-slate-400">Created on {new Date(selectedBooking.createdAt).toLocaleString()}</span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Boarding Point</span>
                  <span className="font-bold text-white">{selectedBooking.boardingPoint.name}</span>
                  <span className="text-[11px] text-amber-400 block">{selectedBooking.boardingPoint.time}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Dropping Point</span>
                  <span className="font-bold text-white">{selectedBooking.droppingPoint.name}</span>
                  <span className="text-[11px] text-orange-400 block">{selectedBooking.droppingPoint.time}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Passengers</span>
                <div className="space-y-1">
                  {selectedBooking.passengers.map((p, idx) => (
                    <div key={idx} className="p-2 bg-slate-950 rounded-lg flex justify-between">
                      <span className="text-white font-medium">{p.name} ({p.gender}, {p.age} yrs)</span>
                      <span className="font-mono font-bold text-amber-400">Seat {p.seatNumber}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <div>
                  <span className="text-slate-400">Payment: </span>
                  <span className="font-bold text-emerald-400">{selectedBooking.paymentMethod} (₹{selectedBooking.totalAmount})</span>
                </div>
                <button
                  onClick={() => openTicketView(selectedBooking)}
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Print E-Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancellingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full p-6 border border-slate-800 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Cancel Reservation</h3>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure you want to cancel booking <span className="font-mono font-bold text-amber-400">{cancellingBooking.id}</span>? Seats will be immediately released.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCancellingBooking(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
