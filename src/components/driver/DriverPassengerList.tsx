import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users, Search, Phone, CheckCircle2, XCircle, Filter, ArrowRight,
  MapPin, CheckCheck, Clock, ShieldCheck, AlertCircle, RefreshCw,
  UserCheck, UserX, Download
} from 'lucide-react';

export const DriverPassengerList: React.FC = () => {
  const {
    currentDriver,
    buses,
    schedules,
    routes,
    bookings,
    selectedDriverTripId,
    setSelectedDriverTripId,
    updatePassengerBoardingStatus,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'BOARDED' | 'NOT_BOARDED'>('ALL');

  if (!currentDriver) return null;

  const assignedBus = buses.find(
    b => b.driver_id === currentDriver.driver_id ||
         b.driver?.driver_id === currentDriver.driver_id ||
         (currentDriver.assigned_bus_id && b.id === currentDriver.assigned_bus_id)
  );

  // Trips strictly belonging to this driver
  const assignedTrips = schedules.filter(s => {
    if (s.driverId && s.driverId === currentDriver.driver_id) return true;
    if (assignedBus && s.busId === assignedBus.id) return true;
    return false;
  });

  const selectedTrip = assignedTrips.find(s => s.id === selectedDriverTripId) || assignedTrips[0];
  const selectedRoute = selectedTrip ? routes.find(r => r.id === selectedTrip.routeId) : null;

  // Bookings belonging to the selected trip
  const tripBookings = selectedTrip
    ? bookings.filter(b => b.scheduleId === selectedTrip.id && b.status !== 'CANCELLED')
    : [];

  // Flatten out all passengers
  const passengersList = tripBookings.flatMap(booking => {
    const bp = booking.boardingPoint?.name || booking.boardingPointName || 'Central Hub';
    const dp = booking.droppingPoint?.name || booking.droppingPointName || 'Main Terminus';
    const phone = booking.contactPhone || booking.customerPhone || '';
    const bookingId = booking.id;

    return (booking.passengers || []).map(p => ({
      ...p,
      bookingId,
      customerPhone: phone,
      boardingPointName: bp,
      droppingPointName: dp,
      bookingStatus: booking.status
    }));
  });

  // Sort by seat number numerically
  passengersList.sort((a, b) => {
    const seatA = parseInt(a.seatNumber.replace(/\D/g, ''), 10) || 0;
    const seatB = parseInt(b.seatNumber.replace(/\D/g, ''), 10) || 0;
    return seatA - seatB;
  });

  // Stats
  const totalCount = passengersList.length;
  const boardedCount = passengersList.filter(p => p.boardingStatus === 'BOARDED').length;
  const notBoardedCount = totalCount - boardedCount;
  const boardingRate = totalCount > 0 ? Math.round((boardedCount / totalCount) * 100) : 0;

  // Filter passengers
  const filteredPassengers = passengersList.filter(p => {
    // Status filter
    if (statusFilter === 'BOARDED' && p.boardingStatus !== 'BOARDED') return false;
    if (statusFilter === 'NOT_BOARDED' && p.boardingStatus === 'BOARDED') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSeat = p.seatNumber.toLowerCase().includes(q);
      const matchName = p.name.toLowerCase().includes(q);
      const matchPhone = (p.customerPhone || '').replace(/\D/g, '').includes(q.replace(/\D/g, ''));
      const matchBp = p.boardingPointName.toLowerCase().includes(q);
      if (!matchSeat && !matchName && !matchPhone && !matchBp) return false;
    }

    return true;
  });

  const handleToggleBoarding = (seatNumber: string, currentStatus?: string) => {
    const nextStatus = currentStatus === 'BOARDED' ? 'NOT_BOARDED' : 'BOARDED';
    updatePassengerBoardingStatus(selectedTrip.id, seatNumber, nextStatus);
  };

  const handleMarkAllBoarded = () => {
    passengersList.forEach(p => {
      if (p.boardingStatus !== 'BOARDED') {
        updatePassengerBoardingStatus(selectedTrip.id, p.seatNumber, 'BOARDED');
      }
    });
    showToast('All passengers marked as Boarded.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header & Trip Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Passenger Manifest &amp; Verification
            </span>
            {selectedTrip && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Gate Control
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Passenger Boarding List
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verify seat assignments, passenger identification, and toggle boarding status in real-time
          </p>
        </div>

        {/* Trip Switcher */}
        {assignedTrips.length > 1 && (
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 text-xs shadow-xs">
            <span className="text-slate-500 pl-2">Trip:</span>
            <select
              value={selectedTrip?.id || ''}
              onChange={(e) => setSelectedDriverTripId(e.target.value)}
              className="bg-slate-50 text-slate-900 font-semibold rounded-lg px-2.5 py-1.5 border border-slate-200 focus:outline-hidden"
            >
              {assignedTrips.map(t => {
                const r = routes.find(ro => ro.id === t.routeId);
                return (
                  <option key={t.id} value={t.id}>
                    {t.id} - {r?.sourceCity} → {r?.destinationCity} ({t.departureDate})
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {!selectedTrip ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500 shadow-xs">
          <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-900 mb-1">No assigned trips available</h4>
          <p className="text-xs">You do not have any active trip schedules assigned to your bus.</p>
        </div>
      ) : (
        <>
          {/* Summary Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Total Booked</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</span>
                <span className="text-xs text-slate-500">Seats</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Boarded Passengers</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">{boardedCount}</span>
                <span className="text-xs text-emerald-700 font-semibold">{boardingRate}% done</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Not Yet Boarded</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-black text-amber-600">{notBoardedCount}</span>
                <span className="text-xs text-amber-700 font-semibold">Pending</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Batch Operation</span>
              <button
                onClick={handleMarkAllBoarded}
                disabled={notBoardedCount === 0}
                className="w-full py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Boarded</span>
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seat number, name, phone..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  statusFilter === 'ALL'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setStatusFilter('NOT_BOARDED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  statusFilter === 'NOT_BOARDED'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Pending Boarding ({notBoardedCount})
              </button>
              <button
                onClick={() => setStatusFilter('BOARDED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  statusFilter === 'BOARDED'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Boarded ({boardedCount})
              </button>
            </div>
          </div>

          {/* Passenger Table / List */}
          {filteredPassengers.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500 shadow-xs">
              <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-900 mb-1">No matching passengers found</h4>
              <p className="text-xs">Adjust your search query or status filter to see passengers.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      <th className="py-3.5 px-4 text-center w-20">Seat</th>
                      <th className="py-3.5 px-4">Passenger Details</th>
                      <th className="py-3.5 px-4">Contact Phone</th>
                      <th className="py-3.5 px-4">Boarding &amp; Dropping Point</th>
                      <th className="py-3.5 px-4 text-center">Boarding Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredPassengers.map((passenger, idx) => {
                      const isBoarded = passenger.boardingStatus === 'BOARDED';

                      return (
                        <tr
                          key={`${passenger.bookingId}-${passenger.seatNumber}-${idx}`}
                          className={`hover:bg-slate-50/60 transition-colors ${
                            isBoarded ? 'bg-emerald-50/30' : ''
                          }`}
                        >
                          {/* Seat Badge */}
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 font-black text-sm text-rose-700 shadow-xs">
                              {passenger.seatNumber}
                            </span>
                          </td>

                          {/* Passenger Name & Age/Gender */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{passenger.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {passenger.age} yrs &bull; <span className="capitalize">{passenger.gender?.toLowerCase()}</span>
                            </div>
                          </td>

                          {/* Contact Phone */}
                          <td className="py-3.5 px-4">
                            <a
                              href={`tel:${passenger.customerPhone}`}
                              className="inline-flex items-center gap-1.5 font-mono text-slate-800 hover:text-rose-600 transition-colors bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200"
                            >
                              <Phone className="w-3 h-3 text-rose-600" />
                              <span>{passenger.customerPhone || 'Not available'}</span>
                            </a>
                          </td>

                          {/* Boarding & Dropping Points */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 font-medium text-slate-800">
                              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span className="truncate max-w-[200px]" title={passenger.boardingPointName}>
                                {passenger.boardingPointName}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <span className="text-slate-400">To:</span>
                              <span className="truncate max-w-[200px]" title={passenger.droppingPointName}>
                                {passenger.droppingPointName}
                              </span>
                            </div>
                          </td>

                          {/* Boarding Status */}
                          <td className="py-3.5 px-4 text-center">
                            {isBoarded ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Boarded</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>Not Boarded</span>
                              </span>
                            )}
                            {passenger.boardedAt && (
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                at {passenger.boardedAt}
                              </span>
                            )}
                          </td>

                          {/* Action Button */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleToggleBoarding(passenger.seatNumber, passenger.boardingStatus)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs ${
                                isBoarded
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              }`}
                            >
                              {isBoarded ? (
                                <>
                                  <UserX className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Undo</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3.5 h-3.5" />
                                  <span>Mark as Boarded</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
