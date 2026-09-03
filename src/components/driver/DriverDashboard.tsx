import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User, Bus, Calendar, Clock, MapPin, CheckCircle2, Play, CheckCheck,
  AlertCircle, Users, ArrowRight, Shield, Phone, CreditCard, ChevronRight,
  TrendingUp, Sparkles, Navigation
} from 'lucide-react';

export const DriverDashboard: React.FC = () => {
  const {
    currentDriver,
    buses,
    schedules,
    routes,
    bookings,
    setDriverView,
    setSelectedDriverTripId,
    updateTripStatus
  } = useApp();

  if (!currentDriver) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-800 rounded-2xl border border-slate-700">
        <p>No driver session active. Please log in.</p>
      </div>
    );
  }

  // 1. Assigned Bus
  const assignedBus = buses.find(
    b => b.driver_id === currentDriver.driver_id ||
         b.driver?.driver_id === currentDriver.driver_id ||
         (currentDriver.assigned_bus_id && b.id === currentDriver.assigned_bus_id)
  );

  // 2. Assigned Trips
  const assignedTrips = schedules.filter(s => {
    if (s.driverId && s.driverId === currentDriver.driver_id) return true;
    if (assignedBus && s.busId === assignedBus.id) return true;
    return false;
  });

  // Calculate stats
  const totalTripsCount = assignedTrips.length;
  const completedTripsCount = assignedTrips.filter(s => s.tripStatus === 'Completed' || s.status === 'COMPLETED').length;
  const inProgressTripsCount = assignedTrips.filter(s => s.tripStatus === 'In Progress' || s.status === 'IN_TRANSIT').length;
  const scheduledTripsCount = assignedTrips.filter(s => s.tripStatus === 'Scheduled' || s.status === 'SCHEDULED').length;

  // Identify today's date formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTrips = assignedTrips.filter(s => s.departureDate === todayStr || s.date === todayStr);

  // Current active or next upcoming trip
  const activeTrip = assignedTrips.find(s => s.tripStatus === 'In Progress' || s.status === 'IN_TRANSIT') ||
                     assignedTrips.find(s => s.tripStatus === 'Scheduled' || s.status === 'SCHEDULED') ||
                     assignedTrips[0];

  const activeRoute = activeTrip ? routes.find(r => r.id === activeTrip.routeId) : null;

  // Passengers for active trip
  const activeTripBookings = activeTrip ? bookings.filter(b => b.scheduleId === activeTrip.id && b.status !== 'CANCELLED') : [];
  const bookedPassengersCount = activeTripBookings.reduce((acc, b) => acc + (b.passengers?.length || b.selectedSeats?.length || 0), 0);

  const boardedCount = activeTripBookings.reduce((acc, b) => {
    return acc + (b.passengers || []).filter(p => p.boardingStatus === 'BOARDED').length;
  }, 0);

  const handleStartTrip = (tripId: string) => {
    updateTripStatus(tripId, 'In Progress');
  };

  const handleEndTrip = (tripId: string) => {
    updateTripStatus(tripId, 'Completed');
  };

  const handleGoToPassengers = (tripId: string) => {
    setSelectedDriverTripId(tripId);
    setDriverView('passenger_list');
  };

  const handleGoToRoute = (tripId: string) => {
    setSelectedDriverTripId(tripId);
    setDriverView('route_details');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-white to-orange-50/60 border border-rose-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Driver Operations Portal
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ● Live Duty
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Namaste, {currentDriver.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              You are assigned to bus <span className="font-bold text-slate-900">{assignedBus?.busNumber || 'None'}</span> ({assignedBus?.name || 'Unassigned'}). Have a safe and punctual journey.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {activeTrip && (
              <button
                onClick={() => handleGoToPassengers(activeTrip.id)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <Users className="w-4 h-4" />
                <span>Open Passenger Manifest</span>
              </button>
            )}
            <button
              onClick={() => setDriverView('my_trips')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-xs"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>All Assigned Trips</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 2 Cards: Driver Info Card & Assigned Bus Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DRIVER INFO CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold text-lg">
                {currentDriver.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{currentDriver.name}</h3>
                <span className="text-xs font-mono text-rose-600 font-semibold">{currentDriver.driver_id}</span>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                currentDriver.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : currentDriver.status === 'On Leave'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {currentDriver.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-slate-500 block mb-1">Driver ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{currentDriver.driver_id}</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-slate-500 block mb-1">Mobile Phone</span>
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Phone className="w-3.5 h-3.5 text-rose-600" />
                <span>{currentDriver.phone}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-slate-500 block mb-1">Driving License Number</span>
              <span className="font-mono font-bold text-slate-800">{currentDriver.license_number || 'DL-PENDING'}</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-slate-500 block mb-1">Duty Status</span>
              <span className="font-semibold text-emerald-600">Authorized &bull; Medical Cleared</span>
            </div>
          </div>
        </div>

        {/* ASSIGNED BUS CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white shadow-xs flex items-center justify-center">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {assignedBus ? assignedBus.name : 'No Bus Assigned'}
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {assignedBus ? assignedBus.busNumber : 'Awaiting Fleet Allocation'}
                </span>
              </div>
            </div>

            {assignedBus && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                {assignedBus.type}
              </span>
            )}
          </div>

          {assignedBus ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="text-slate-500 block mb-1">Registration</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{assignedBus.busNumber}</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="text-slate-500 block mb-1">Total Capacity</span>
                <span className="font-bold text-slate-900 text-sm">{assignedBus.totalSeats} Seats</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-slate-500 block mb-1">Bus Status</span>
                <span className="font-semibold text-emerald-600">{assignedBus.status || 'Active'}</span>
              </div>

              <div className="col-span-2 sm:col-span-3 bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">Vehicle Amenities:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(assignedBus.amenities || ['AC', 'WiFi', 'Charging Point', 'Emergency Exit']).map((amenity, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 text-xs">
              No bus is currently assigned to this driver ID in Bus Fleet Management.
            </div>
          )}
        </div>
      </div>

      {/* TRIP SUMMARY STATS */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Trip Summary Overview
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">Total Assigned Trips</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalTripsCount}</span>
              <span className="text-[11px] text-rose-600 font-semibold">All-time</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">Today's Scheduled Trips</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{todayTrips.length}</span>
              <span className="text-[11px] text-emerald-600 font-semibold">{todayStr}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">Completed Trips</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">{completedTripsCount}</span>
              <span className="text-[11px] text-slate-500 font-medium">Finished</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">Scheduled / Pending</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-amber-600">{scheduledTripsCount}</span>
              <span className="text-[11px] text-amber-600 font-semibold">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* CURRENT / UPCOMING TRIP DETAILS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-5 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Primary Active / Upcoming Journey
              </span>
              {activeTrip?.tripStatus && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    activeTrip.tripStatus === 'In Progress'
                      ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                      : activeTrip.tripStatus === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {activeTrip.tripStatus}
                </span>
              )}
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {activeRoute ? `${activeRoute.sourceCity} → ${activeRoute.destinationCity}` : 'Scheduled Journey'}
            </h2>
          </div>

          {activeTrip && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                Trip ID: <span className="text-slate-900 font-bold">{activeTrip.id}</span>
              </span>
            </div>
          )}
        </div>

        {activeTrip ? (
          <div className="space-y-6">
            {/* Origin & Destination Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">DEPARTURE</span>
                <div className="text-base font-bold text-slate-900">{activeRoute?.sourceCity || 'Origin'}</div>
                <div className="text-xs text-rose-600 font-mono font-bold mt-0.5">{activeTrip.departureTime}</div>
                <div className="text-[11px] text-slate-500">{activeTrip.departureDate || activeTrip.date}</div>
              </div>

              <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-slate-200 py-3 md:py-0">
                <div className="text-xs text-slate-500 font-semibold mb-1">Total Distance &amp; Time</div>
                <div className="text-sm font-bold text-slate-900">{activeRoute?.duration || '8h 30m'}</div>
                <div className="text-[11px] text-slate-500">{activeRoute?.distanceKm || 560} km highway run</div>
              </div>

              <div className="md:text-right">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">ARRIVAL</span>
                <div className="text-base font-bold text-slate-900">{activeRoute?.destinationCity || 'Destination'}</div>
                <div className="text-xs text-emerald-600 font-mono font-bold mt-0.5">{activeTrip.arrivalTime}</div>
                <div className="text-[11px] text-slate-500">{activeTrip.departureDate || activeTrip.date}</div>
              </div>
            </div>

            {/* Passenger Manifest Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Booked Passengers</span>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">{bookedPassengersCount} Passengers</span>
                  <span className="text-xs text-rose-600 font-semibold">{assignedBus?.totalSeats ? `${Math.round((bookedPassengersCount / assignedBus.totalSeats) * 100)}% Occ` : ''}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Boarding Status</span>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-emerald-600">{boardedCount} Boarded</span>
                  <span className="text-xs text-slate-500">{bookedPassengersCount - boardedCount} Pending</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Assigned Vehicle</span>
                <span className="text-sm font-bold text-slate-900 block">{assignedBus?.busNumber || 'AP 29 BD 4501'}</span>
                <span className="text-[11px] text-slate-500">{assignedBus?.name}</span>
              </div>
            </div>

            {/* QUICK ACTION BUTTONS */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {activeTrip.tripStatus !== 'In Progress' && activeTrip.tripStatus !== 'Completed' && (
                  <button
                    onClick={() => handleStartTrip(activeTrip.id)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Trip</span>
                  </button>
                )}

                {activeTrip.tripStatus === 'In Progress' && (
                  <button
                    onClick={() => handleEndTrip(activeTrip.id)}
                    className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span>End Trip (Mark Completed)</span>
                  </button>
                )}

                {activeTrip.tripStatus === 'Completed' && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Trip has been marked as Completed</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGoToRoute(activeTrip.id)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 border border-slate-300 cursor-pointer transition-all shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-rose-600" />
                  <span>View Route Details</span>
                </button>

                <button
                  onClick={() => handleGoToPassengers(activeTrip.id)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>View Passenger List</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-sm">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p>No trips currently scheduled for this driver.</p>
          </div>
        )}
      </div>
    </div>
  );
};
