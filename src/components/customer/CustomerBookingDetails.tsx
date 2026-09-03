import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerCancelModal } from './CustomerCancelModal';
import {
  ArrowLeft, Printer, Compass, AlertTriangle, CheckCircle2,
  Clock, XCircle, MapPin, Users, Utensils, Tag, ShieldCheck,
  Phone, Mail, Bus
} from 'lucide-react';

export const CustomerBookingDetails: React.FC = () => {
  const {
    currentBooking,
    buses,
    routes,
    openTicketView,
    openTrackingView,
    navigateTo
  } = useApp();

  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!currentBooking) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">No Booking Selected</h3>
        <p className="text-xs text-slate-500 mb-4">Please select a booking from My Bookings to view details.</p>
        <button
          onClick={() => navigateTo('my_bookings')}
          className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Go to My Bookings
        </button>
      </div>
    );
  }

  const bus = buses.find(b => b.id === currentBooking.busId);
  const route = routes.find(r => r.id === currentBooking.routeId);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('my_bookings')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Bookings</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openTicketView(currentBooking)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Ticket</span>
            </button>

            {currentBooking.status === 'CONFIRMED' && (
              <button
                onClick={() => openTrackingView(currentBooking)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Track Bus</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                  {currentBooking.id}
                </span>
                {currentBooking.status === 'CONFIRMED' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Confirmed
                  </span>
                )}
                {currentBooking.status === 'COMPLETED' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Trip Completed
                  </span>
                )}
                {currentBooking.status === 'CANCELLED' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    Cancelled &amp; Refunded
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{bus?.name || 'BharatRide Sleeper'}</h2>
              <p className="text-xs text-slate-500">{bus?.busType} • {bus?.operator} • Reg: {bus?.busNumber}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
              <span className="text-2xl font-black text-slate-900">₹{currentBooking.totalAmount}</span>
              <span className="text-[11px] text-emerald-600 font-semibold block">Paid via {currentBooking.paymentMethod}</span>
            </div>
          </div>

          {/* Boarding and Dropping Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>BOARDING POINT</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{currentBooking.boardingPoint.name}</div>
              <div className="text-xs text-slate-600 font-semibold mt-0.5">
                {currentBooking.boardingPoint.time} • {currentBooking.travelDate}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">{currentBooking.boardingPoint.landmark}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{currentBooking.boardingPoint.address}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>DROPPING POINT</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{currentBooking.droppingPoint.name}</div>
              <div className="text-xs text-slate-600 font-semibold mt-0.5">
                {currentBooking.droppingPoint.time} • {currentBooking.travelDate}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">{currentBooking.droppingPoint.landmark}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{currentBooking.droppingPoint.address}</div>
            </div>
          </div>

          {/* Passenger Manifest */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Passengers &amp; Berths ({currentBooking.passengers.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentBooking.passengers.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500">{p.gender} • {p.age} years old</div>
                  </div>
                  <span className="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg text-xs">
                    Seat {p.seatNumber}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Food Add-ons if any */}
          {currentBooking.foodAddons && currentBooking.foodAddons.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-amber-500" />
                <span>Travel Food &amp; Refreshments</span>
              </h4>
              <div className="space-y-2">
                {currentBooking.foodAddons.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">{item.name} × {item.quantity}</span>
                    <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details & Policy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="font-bold text-slate-800 block mb-1">Contact Details</span>
              <div className="text-slate-600 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 {currentBooking.contactPhone}</span>
              </div>
              <div className="text-slate-600 flex items-center gap-2 mt-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentBooking.contactEmail}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-1">Cancellation Terms</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Free cancellation up to 12 hours before scheduled departure. 15% deduction applies within 12 hours.
              </p>
            </div>
          </div>

            {/* Cancel Ticket Action if confirmed */}
            {(currentBooking.bookingStatus === 'CONFIRMED' || currentBooking.status === 'CONFIRMED') && (
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cancel This Booking &amp; Request Refund</span>
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <CustomerCancelModal
          booking={currentBooking}
          onClose={() => setShowCancelModal(false)}
        />
      )}
    </div>
  );
};
