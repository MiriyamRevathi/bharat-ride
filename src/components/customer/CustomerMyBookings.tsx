import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { CustomerCancelModal } from './CustomerCancelModal';
import {
  Ticket, Search, Calendar, MapPin, Printer, Compass,
  AlertTriangle, CheckCircle2, Clock, XCircle, ArrowRight,
  ShieldCheck, RefreshCw
} from 'lucide-react';

export const CustomerMyBookings: React.FC = () => {
  const {
    bookings,
    currentUser,
    buses,
    routes,
    viewBookingDetails,
    openTicketView,
    openTrackingView,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ALL' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);

  // Filter user's bookings
  const userBookings = useMemo(() => {
    // Show all demo bookings or current user bookings
    let list = bookings;
    if (currentUser) {
      list = bookings.filter(b => b.userId === currentUser.id || b.customerId === currentUser.id);
      // If user has 0 bookings, fall back to showing all demo bookings so they can explore
      if (list.length === 0) list = bookings;
    }

    // Filter by tab
    if (activeTab === 'UPCOMING') {
      list = list.filter(b => b.status === 'CONFIRMED' || b.bookingStatus === 'CONFIRMED');
    } else if (activeTab === 'COMPLETED') {
      list = list.filter(b => b.status === 'COMPLETED' || b.bookingStatus === 'COMPLETED');
    } else if (activeTab === 'CANCELLED') {
      list = list.filter(b => b.status === 'CANCELLED' || b.bookingStatus === 'CANCELLED');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(b => {
        const bus = buses.find(x => x.id === b.busId);
        const route = routes.find(r => r.id === b.routeId);
        return (
          b.id.toLowerCase().includes(q) ||
          b.contactPhone.includes(q) ||
          b.boardingPoint.name.toLowerCase().includes(q) ||
          b.droppingPoint.name.toLowerCase().includes(q) ||
          bus?.name.toLowerCase().includes(q) ||
          route?.sourceCity.toLowerCase().includes(q) ||
          route?.destinationCity.toLowerCase().includes(q) ||
          b.passengers.some(p => p.name.toLowerCase().includes(q))
        );
      });
    }

    // Sort newest first
    return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [bookings, currentUser, activeTab, searchQuery, buses, routes]);

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">My Travel Bookings</h1>
            <p className="text-xs text-slate-500">View upcoming tickets, download e-tickets, cancel or track live buses.</p>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="self-start sm:self-auto px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book New Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'ALL', label: 'All Trips' },
              { id: 'UPCOMING', label: 'Upcoming' },
              { id: 'COMPLETED', label: 'Completed' },
              { id: 'CANCELLED', label: 'Cancelled' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID, city, passenger..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Bookings List */}
        {userBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No Bookings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              You do not have any trips in this tab. Search for luxury buses on top expressways and book in seconds.
            </p>
            <button
              onClick={() => navigateTo('search')}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              Search &amp; Book Buses
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map(booking => {
              const bus = buses.find(b => b.id === booking.busId);
              const route = routes.find(r => r.id === booking.routeId);

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    {/* Top Row: Ref ID + Status + Operator */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                          {booking.id}
                        </span>
                        {getStatusBadge(booking.bookingStatus || booking.status || 'CONFIRMED')}
                        <span className="text-xs font-semibold text-slate-500">
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Fare</span>
                        <span className="text-lg font-black text-slate-900">₹{booking.fareBreakdown?.totalAmount || booking.totalAmount || 0}</span>
                      </div>
                    </div>

                    {/* Middle Row: Trip Route Details */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
                      <div className="md:col-span-4">
                        <h4 className="text-sm font-bold text-slate-900">{bus?.name || booking.busName || 'BharatRide Luxury'}</h4>
                        <p className="text-xs text-slate-500">{bus?.busType || booking.busType} • {bus?.operator || booking.operator}</p>
                        <div className="mt-2 text-xs">
                          <span className="text-slate-500">Seats: </span>
                          <span className="font-bold text-rose-600">{(booking.selectedSeats || booking.seatNumbers || []).join(', ')}</span>
                          <span className="text-slate-400"> ({booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''})</span>
                        </div>
                      </div>

                      <div className="md:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span>{booking.boardingPoint.name}</span>
                          <span className="text-rose-600">{booking.boardingPoint.time}</span>
                        </div>
                        <div className="flex items-center justify-center text-[10px] text-slate-400 font-semibold py-0.5">
                          ↓ {booking.travelDate} ↓
                        </div>
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span>{booking.droppingPoint.name}</span>
                          <span className="text-orange-600">{booking.droppingPoint.time}</span>
                        </div>
                      </div>

                      {/* Primary Passengers Preview */}
                      <div className="md:col-span-4 text-xs text-slate-600 space-y-1">
                        <div className="font-semibold text-slate-800">Primary Passenger:</div>
                        <div className="text-slate-700">{booking.passengers[0]?.name || booking.customerName} ({booking.passengers[0]?.gender || 'MALE'}, {booking.passengers[0]?.age || 28} yrs)</div>
                        <div className="text-[11px] text-slate-400">Contact: +91 {booking.customerPhone || booking.contactPhone || '9876543210'}</div>
                      </div>
                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                      <button
                        onClick={() => viewBookingDetails(booking)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Full Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {(booking.bookingStatus === 'CONFIRMED' || booking.status === 'CONFIRMED') && (
                          <button
                            onClick={() => openTrackingView(booking)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            <span>Track Bus</span>
                          </button>
                        )}

                        <button
                          onClick={() => openTicketView(booking)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>E-Ticket</span>
                        </button>

                        {(booking.bookingStatus === 'CONFIRMED' || booking.status === 'CONFIRMED') && (
                          <button
                            onClick={() => setCancellingBooking(booking)}
                            className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-slate-200 hover:border-rose-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {cancellingBooking && (
        <CustomerCancelModal
          booking={cancellingBooking}
          onClose={() => setCancellingBooking(null)}
        />
      )}
    </div>
  );
};
