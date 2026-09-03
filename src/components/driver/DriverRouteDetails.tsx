import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Navigation, MapPin, Clock, Users, ArrowRight, Bus, Calendar,
  ChevronRight, Building2, CheckCircle2
} from 'lucide-react';

export const DriverRouteDetails: React.FC = () => {
  const {
    currentDriver,
    buses,
    schedules,
    routes,
    bookings,
    boardingPoints,
    droppingPoints,
    selectedDriverTripId,
    setSelectedDriverTripId,
    setDriverView
  } = useApp();

  if (!currentDriver) return null;

  const assignedBus = buses.find(
    b => b.driver_id === currentDriver.driver_id ||
         b.driver?.driver_id === currentDriver.driver_id ||
         (currentDriver.assigned_bus_id && b.id === currentDriver.assigned_bus_id)
  );

  const assignedTrips = schedules.filter(s => {
    if (s.driverId && s.driverId === currentDriver.driver_id) return true;
    if (assignedBus && s.busId === assignedBus.id) return true;
    return false;
  });

  const currentTrip = assignedTrips.find(s => s.id === selectedDriverTripId) || assignedTrips[0];
  const currentRoute = currentTrip ? routes.find(r => r.id === currentTrip.routeId) : null;

  // Bookings for this trip
  const tripBookings = currentTrip
    ? bookings.filter(b => b.scheduleId === currentTrip.id && b.status !== 'CANCELLED')
    : [];

  // Extract all passengers for this trip
  const allTripPassengers = tripBookings.flatMap(b => {
    const bpName = b.boardingPoint?.name || b.boardingPointName || '';
    const dpName = b.droppingPoint?.name || b.droppingPointName || '';
    return (b.passengers || []).map(p => ({
      ...p,
      contactPhone: b.contactPhone || b.customerPhone,
      boardingPointName: bpName,
      droppingPointName: dpName,
      bookingId: b.id
    }));
  });

  // Calculate boarding count per boarding point
  const tripBoardingPoints = currentRoute?.boardingPoints?.length
    ? currentRoute.boardingPoints.map(bpId => boardingPoints.find(bp => bp.id === bpId)).filter(Boolean)
    : boardingPoints.filter(bp => bp.city === currentRoute?.sourceCity);

  // Calculate dropping count per dropping point
  const tripDroppingPoints = currentRoute?.droppingPoints?.length
    ? currentRoute.droppingPoints.map(dpId => droppingPoints.find(dp => dp.id === dpId)).filter(Boolean)
    : droppingPoints.filter(dp => dp.city === currentRoute?.destinationCity);

  return (
    <div className="space-y-6">
      {/* Top Header & Trip Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Trip Navigation &amp; Stop Manifest
            </span>
            {currentTrip && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                {currentTrip.tripStatus || 'Scheduled'}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Route &amp; Stop Schedule
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Boarding pickup points, intermediate halts, and dropping hubs with passenger counts
          </p>
        </div>

        {/* Trip Switcher */}
        {assignedTrips.length > 1 && (
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 text-xs shadow-xs">
            <span className="text-slate-500 pl-2">Select Trip:</span>
            <select
              value={currentTrip?.id || ''}
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

      {!currentTrip ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500 shadow-xs">
          <Navigation className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-900 mb-1">No trip selected</h4>
          <p className="text-xs">Select or assign a trip to inspect route stops.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Route Header Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Trip Route
                </span>
                <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>{currentRoute?.sourceCity || 'Origin'}</span>
                  <ArrowRight className="w-4 h-4 text-rose-500" />
                  <span>{currentRoute?.destinationCity || 'Destination'}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                  Trip #{currentTrip.id} &bull; Bus {assignedBus?.busNumber || currentTrip.busId}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Departure Time &amp; Date
                </span>
                <div className="text-base font-bold text-slate-900 font-mono">{currentTrip.departureTime}</div>
                <div className="text-xs text-slate-500">{currentTrip.departureDate || currentTrip.date}</div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Estimated Arrival
                </span>
                <div className="text-base font-bold text-emerald-600 font-mono">{currentTrip.arrivalTime}</div>
                <div className="text-xs text-slate-500">Duration: {currentRoute?.duration || '8h 30m'} ({currentRoute?.distanceKm || 560} km)</div>
              </div>

              <div className="flex items-center md:justify-end">
                <button
                  onClick={() => setDriverView('passenger_list')}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>View Full Passenger List</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 1: BOARDING STOPS (PASSENGER PICKUP) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Boarding Stops &amp; Pickups ({currentRoute?.sourceCity})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Scheduled stop locations where passengers will board your bus
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
                {tripBoardingPoints.length} Boarding Stops
              </span>
            </div>

            <div className="space-y-4">
              {tripBoardingPoints.map((bp: any, idx: number) => {
                // Count passengers boarding at this stop
                const matchingPassengers = allTripPassengers.filter(p => {
                  return p.boardingPointName?.toLowerCase().includes(bp.name?.toLowerCase()) ||
                         bp.name?.toLowerCase().includes(p.boardingPointName?.toLowerCase());
                });

                return (
                  <div
                    key={bp.id || idx}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{bp.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-mono">
                              {bp.landmark || bp.address || 'Central Landmark'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{bp.address || `${bp.name}, ${currentRoute?.sourceCity}`}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right sm:text-right">
                          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Pickup Time</span>
                          <span className="text-sm font-bold text-slate-900 font-mono">{bp.time || currentTrip.departureTime}</span>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-center min-w-[90px]">
                          <span className="text-[10px] text-rose-700 font-semibold block">Boarding</span>
                          <span className="text-sm font-bold text-slate-900">
                            {matchingPassengers.length} <span className="text-xs font-normal text-slate-500">Pax</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Passenger breakdown list */}
                    {matchingPassengers.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-medium">Passenger Seats:</span>
                        {matchingPassengers.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${
                              p.boardingStatus === 'BOARDED'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>Seat {p.seatNumber}</span>
                            <span className="text-slate-500">({p.name})</span>
                            {p.boardingStatus === 'BOARDED' && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: DROPPING STOPS (PASSENGER DEBOARDING) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Dropping Points &amp; Destination ({currentRoute?.destinationCity})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Designated deboarding stops and final bus terminus
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                {tripDroppingPoints.length} Dropping Points
              </span>
            </div>

            <div className="space-y-4">
              {tripDroppingPoints.map((dp: any, idx: number) => {
                const matchingPassengers = allTripPassengers.filter(p => {
                  return p.droppingPointName?.toLowerCase().includes(dp.name?.toLowerCase()) ||
                         dp.name?.toLowerCase().includes(p.droppingPointName?.toLowerCase());
                });

                return (
                  <div
                    key={dp.id || idx}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{dp.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-mono">
                              {dp.landmark || dp.address || 'Dropping Hub'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{dp.address || `${dp.name}, ${currentRoute?.destinationCity}`}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right sm:text-right">
                          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Arrival Time</span>
                          <span className="text-sm font-bold text-slate-900 font-mono">{dp.time || currentTrip.arrivalTime}</span>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center min-w-[90px]">
                          <span className="text-[10px] text-emerald-700 font-semibold block">Dropping</span>
                          <span className="text-sm font-bold text-slate-900">
                            {matchingPassengers.length} <span className="text-xs font-normal text-slate-500">Pax</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {matchingPassengers.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-medium">Dropping Passengers:</span>
                        {matchingPassengers.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-white border-slate-200 text-slate-700"
                          >
                            Seat {p.seatNumber} ({p.name})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
