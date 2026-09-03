import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar, Clock, MapPin, Bus, Users, Navigation, Play, CheckCheck,
  Search, ArrowRight, CheckCircle2, ChevronRight, AlertCircle, Filter
} from 'lucide-react';
import { TripStatus } from '../../types';

export const DriverMyTrips: React.FC = () => {
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

  const [activeTab, setActiveTab] = useState<'ALL' | 'TODAY' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

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

  const todayStr = new Date().toISOString().slice(0, 10);

  // Filter by tab
  const filteredByTab = assignedTrips.filter(s => {
    const sDate = s.departureDate || s.date || '';
    const status = s.tripStatus || (s.status === 'COMPLETED' ? 'Completed' : s.status === 'IN_TRANSIT' ? 'In Progress' : 'Scheduled');

    if (activeTab === 'TODAY') {
      return sDate === todayStr;
    }
    if (activeTab === 'UPCOMING') {
      return status === 'Scheduled' || status === 'In Progress';
    }
    if (activeTab === 'COMPLETED') {
      return status === 'Completed';
    }
    return true;
  });

  // Filter by search query
  const displayedTrips = filteredByTab.filter(s => {
    const r = routes.find(route => route.id === s.routeId);
    const text = `${s.id} ${r?.sourceCity || ''} ${r?.destinationCity || ''} ${s.departureDate || ''} ${s.busId}`.toLowerCase();
    return text.includes(searchQuery.toLowerCase());
  });

  const handleOpenPassengers = (tripId: string) => {
    setSelectedDriverTripId(tripId);
    setDriverView('passenger_list');
  };

  const handleOpenRoute = (tripId: string) => {
    setSelectedDriverTripId(tripId);
    setDriverView('route_details');
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            My Assigned Trips
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Schedules allocated to your assigned bus ({assignedBus?.busNumber || 'None'})
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trip ID, city..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 shadow-xs"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'ALL', label: `All Trips (${assignedTrips.length})` },
          { id: 'TODAY', label: `Today (${assignedTrips.filter(s => (s.departureDate || s.date) === todayStr).length})` },
          { id: 'UPCOMING', label: `Upcoming / Active (${assignedTrips.filter(s => s.tripStatus !== 'Completed').length})` },
          { id: 'COMPLETED', label: `Completed (${assignedTrips.filter(s => s.tripStatus === 'Completed').length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trips Grid / List */}
      {displayedTrips.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500 shadow-xs">
          <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-900 mb-1">No trips found in this category</h4>
          <p className="text-xs">No scheduled trips match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayedTrips.map(trip => {
            const route = routes.find(r => r.id === trip.routeId);
            const bus = buses.find(b => b.id === trip.busId) || assignedBus;
            const tripBookings = bookings.filter(b => b.scheduleId === trip.id && b.status !== 'CANCELLED');
            const bookedPassengers = tripBookings.reduce((acc, b) => acc + (b.passengers?.length || b.selectedSeats?.length || 0), 0);
            const boardedPassengers = tripBookings.reduce((acc, b) => {
              return acc + (b.passengers || []).filter(p => p.boardingStatus === 'BOARDED').length;
            }, 0);

            const status = trip.tripStatus || (trip.status === 'COMPLETED' ? 'Completed' : trip.status === 'IN_TRANSIT' ? 'In Progress' : 'Scheduled');

            return (
              <div
                key={trip.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-rose-300 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Trip ID, Bus, Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg">
                        {trip.id}
                      </span>
                      <span className="text-xs text-slate-500">
                        Bus: <strong className="text-slate-900">{bus?.busNumber || trip.busId}</strong>
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Route & Times */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm font-bold text-slate-900 mb-2">
                      <div className="flex items-center gap-2">
                        <span>{route?.sourceCity || 'Origin'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span>{route?.destinationCity || 'Destination'}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{route?.duration || '8h'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-500 block">Departure</span>
                        <span className="font-mono font-bold text-slate-900">{trip.departureTime}</span>
                        <span className="text-slate-500 text-[11px] block">{trip.departureDate || trip.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-slate-500 block">Arrival</span>
                        <span className="font-mono font-bold text-slate-900">{trip.arrivalTime}</span>
                        <span className="text-slate-500 text-[11px] block">{trip.departureDate || trip.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Manifest Count */}
                  <div className="flex items-center justify-between text-xs py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 mb-4">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Users className="w-3.5 h-3.5 text-rose-600" />
                      <span>Booked Seats: <strong className="text-slate-900">{bookedPassengers}</strong></span>
                    </div>
                    <div className="text-slate-500">
                      Boarded: <strong className="text-emerald-600 font-bold">{boardedPassengers}</strong> / {bookedPassengers}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {status === 'Scheduled' && (
                      <button
                        onClick={() => updateTripStatus(trip.id, 'In Progress')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Start</span>
                      </button>
                    )}

                    {status === 'In Progress' && (
                      <button
                        onClick={() => updateTripStatus(trip.id, 'Completed')}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                      >
                        <CheckCheck className="w-3 h-3" />
                        <span>End Trip</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenRoute(trip.id)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <Navigation className="w-3 h-3 text-rose-600" />
                      <span>Route</span>
                    </button>

                    <button
                      onClick={() => handleOpenPassengers(trip.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                    >
                      <Users className="w-3 h-3" />
                      <span>Passengers</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
