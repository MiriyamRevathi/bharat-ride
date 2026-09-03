import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2, Printer, Compass, ArrowRight,
  Bus, Calendar, MapPin, Users, QrCode, ShieldCheck, Download
} from 'lucide-react';

export const CustomerConfirmation: React.FC = () => {
  const {
    currentBooking,
    buses,
    routes,
    viewBookingDetails,
    openTicketView,
    openTrackingView,
    navigateTo
  } = useApp();

  useEffect(() => {
    // Fire confetti celebration on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore in testing environments
    }
  }, []);

  if (!currentBooking) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">No Recent Booking</h3>
        <p className="text-xs text-slate-500 mb-4">You have no active confirmed booking session.</p>
        <button
          onClick={() => navigateTo('my_bookings')}
          className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          View My Bookings
        </button>
      </div>
    );
  }

  const bus = buses.find(b => b.id === currentBooking.busId);
  const route = routes.find(r => r.id === currentBooking.routeId);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center mb-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full mb-2 border border-emerald-200">
            Booking Confirmed &amp; Seats Reserved
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Your Journey is Booked!
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Confirmation M-Ticket and tracking SMS sent to <span className="font-bold text-slate-800">{currentBooking.contactPhone}</span>.
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800">
            <span className="text-slate-500 uppercase font-sans text-[10px]">Booking Reference:</span>
            <span className="text-rose-600 text-sm tracking-wider">{currentBooking.id}</span>
          </div>
        </div>

        {/* Ticket Details Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">{bus?.operator || 'BharatRide Express'}</span>
              <h3 className="text-lg font-bold text-slate-900">{bus?.name || 'Luxury Sleeper'}</h3>
              <p className="text-xs text-slate-500">{bus?.busType} • Reg: {bus?.busNumber}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Paid</span>
              <div className="text-2xl font-black text-slate-900">₹{currentBooking.totalAmount}</div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Paid via {currentBooking.paymentMethod}
              </span>
            </div>
          </div>

          {/* Route & Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>BOARDING DETAILS</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900">{currentBooking.boardingPoint.name}</div>
              <div className="text-xs text-slate-600 font-semibold">{currentBooking.boardingPoint.time} • {currentBooking.travelDate}</div>
              <div className="text-[11px] text-slate-500 mt-1">{currentBooking.boardingPoint.landmark}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>DROPPING DETAILS</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900">{currentBooking.droppingPoint.name}</div>
              <div className="text-xs text-slate-600 font-semibold">{currentBooking.droppingPoint.time} • {currentBooking.travelDate}</div>
              <div className="text-[11px] text-slate-500 mt-1">{currentBooking.droppingPoint.landmark}</div>
            </div>
          </div>

          {/* Passenger & Seats Matrix */}
          <div className="border-t border-slate-100 pt-4 mb-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Passengers &amp; Allocated Seats</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentBooking.passengers.map((p, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500">{p.age} yrs • {p.gender}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded-lg text-xs">
                    Seat {p.seatNumber}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => openTicketView(currentBooking)}
              className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>View &amp; Print E-Ticket</span>
            </button>

            <button
              onClick={() => openTrackingView(currentBooking)}
              className="py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Compass className="w-4 h-4" />
              <span>Track Bus Live GPS</span>
            </button>
          </div>
        </div>

        {/* Next Step Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={() => navigateTo('my_bookings')}
            className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
          >
            ← View All My Bookings
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Book Another Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
