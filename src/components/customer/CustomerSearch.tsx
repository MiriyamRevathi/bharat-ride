import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Bus, Schedule } from '../../types';
import { CustomerBusDetailsModal } from './CustomerBusDetailsModal';
import {
  Search, ArrowRightLeft, Calendar, Users, Filter,
  Star, Clock, RotateCcw, MapPin, ChevronDown,
  Sparkles, Check, ChevronUp, AlertCircle
} from 'lucide-react';

export const CustomerSearch: React.FC = () => {
  const {
    searchParams,
    setSearchParams,
    routes,
    buses,
    schedules,
    seats,
    boardingPoints,
    droppingPoints,
    selectBusAndSchedule,
    navigateTo
  } = useApp();

  // Search Modify State
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [fromCity, setFromCity] = useState(searchParams.fromCity);
  const [toCity, setToCity] = useState(searchParams.toCity);
  const [travelDate, setTravelDate] = useState(searchParams.travelDate);
  const [passengers, setPassengers] = useState(searchParams.passengers);

  // Filter States
  const [busTypes, setBusTypes] = useState<string[]>([]);
  const [operators, setOperators] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<string[]>([]); // 'early_morning', 'morning', 'afternoon', 'evening'
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [onlyAvailableSeats, setOnlyAvailableSeats] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'departure_early' | 'rating_high'>('recommended');

  // Modal State for bus details
  const [selectedBusForModal, setSelectedBusForModal] = useState<{ bus: Bus; schedule: Schedule } | null>(null);

  // Mobile Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const cityOptions = [
    'Hyderabad', 'Guntur', 'Vijayawada', 'Visakhapatnam',
    'Bengaluru', 'Chennai', 'Pune', 'Mumbai', 'Delhi',
    'Jaipur', 'Tirupati', 'Goa'
  ];

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleModifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      fromCity,
      toCity,
      travelDate,
      passengers
    });
    setIsModifyOpen(false);
  };

  const handleResetFilters = () => {
    setBusTypes([]);
    setOperators([]);
    setMinRating(0);
    setTimeSlots([]);
    setMaxPrice(2000);
    setOnlyAvailableSeats(false);
  };

  // Find matching route
  const currentRoute = useMemo(() => {
    return routes.find(
      r => r.sourceCity.toLowerCase() === searchParams.fromCity.toLowerCase() &&
           r.destinationCity.toLowerCase() === searchParams.toCity.toLowerCase() &&
           r.status === 'ACTIVE'
    );
  }, [routes, searchParams]);

  // Find matching schedules & enrich with bus data and dynamic seat counts
  const searchResults = useMemo(() => {
    // If no direct route, still search schedules on similar routes or all active schedules for demonstration
    const matchedSchedules = schedules.filter(s => {
      if (currentRoute) {
        return s.routeId === currentRoute.id && s.status !== 'CANCELLED';
      }
      return false;
    });

    const enriched = matchedSchedules.map(schedule => {
      const bus = buses.find(b => b.id === schedule.busId);
      if (!bus || bus.status !== 'ACTIVE') return null;

      // Calculate real available seats
      const busSeats = seats.filter(st => st.busId === bus.id);
      const availableCount = busSeats.filter(st => st.state === 'AVAILABLE').length;

      // Estimate duration
      const [depH, depM] = schedule.departureTime.split(':').map(Number);
      const [arrH, arrM] = schedule.arrivalTime.split(':').map(Number);
      let durationMinutes = (arrH * 60 + arrM) - (depH * 60 + depM);
      if (durationMinutes < 0 || schedule.nextDayArrival) {
        durationMinutes += 24 * 60;
      }
      const durHours = Math.floor(durationMinutes / 60);
      const durMins = durationMinutes % 60;
      const durationText = `${durHours}h ${durMins > 0 ? `${durMins}m` : '00m'}`;

      const adjustedFare = Math.round(bus.baseFare * schedule.fareMultiplier);

      return {
        schedule,
        bus,
        availableSeats: availableCount,
        durationText,
        durationMinutes,
        adjustedFare
      };
    }).filter(Boolean) as {
      schedule: Schedule;
      bus: Bus;
      availableSeats: number;
      durationText: string;
      durationMinutes: number;
      adjustedFare: number;
    }[];

    // Apply Filters
    let filtered = enriched.filter(item => {
      // Bus type filter
      if (busTypes.length > 0) {
        const matchesType = busTypes.some(t => item.bus.busType.toLowerCase().includes(t.toLowerCase()));
        if (!matchesType) return false;
      }

      // Operator filter
      if (operators.length > 0 && !operators.includes(item.bus.operator)) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && item.bus.rating < minRating) {
        return false;
      }

      // Price filter
      if (item.adjustedFare > maxPrice) {
        return false;
      }

      // Available seats filter
      if (onlyAvailableSeats && item.availableSeats < searchParams.passengers) {
        return false;
      }

      // Time slot filter
      if (timeSlots.length > 0) {
        const [depH] = item.schedule.departureTime.split(':').map(Number);
        const matchesSlot = timeSlots.some(slot => {
          if (slot === 'early_morning') return depH >= 0 && depH < 6;
          if (slot === 'morning') return depH >= 6 && depH < 12;
          if (slot === 'afternoon') return depH >= 12 && depH < 18;
          if (slot === 'evening') return depH >= 18 && depH < 24;
          return true;
        });
        if (!matchesSlot) return false;
      }

      return true;
    });

    // Apply Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'price_low') {
        return a.adjustedFare - b.adjustedFare;
      }
      if (sortBy === 'departure_early') {
        return a.schedule.departureTime.localeCompare(b.schedule.departureTime);
      }
      if (sortBy === 'rating_high') {
        return b.bus.rating - a.bus.rating;
      }
      // recommended
      return b.bus.rating * b.availableSeats - a.bus.rating * a.availableSeats;
    });

    return filtered;
  }, [schedules, buses, currentRoute, seats, busTypes, operators, minRating, maxPrice, onlyAvailableSeats, timeSlots, sortBy, searchParams.passengers]);

  const uniqueOperators = useMemo(() => {
    return Array.from(new Set(buses.map(b => b.operator)));
  }, [buses]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Search Info Bar & Modify Trigger */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm sm:text-base">
                <span className="text-rose-600 font-extrabold">{searchParams.fromCity}</span>
                <span className="text-slate-400">→</span>
                <span className="text-rose-600 font-extrabold">{searchParams.toCity}</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="text-xs text-slate-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{searchParams.travelDate}</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="text-xs text-slate-600 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{searchParams.passengers} Passenger(s)</span>
              </div>
              <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-full ml-2">
                {searchResults.length} Buses Found
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-rose-600" />
                <span>Filters</span>
              </button>

              <button
                onClick={() => setIsModifyOpen(!isModifyOpen)}
                className="px-4 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Modify Search</span>
                {isModifyOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Collapsible Modify Search Drawer */}
          {isModifyOpen && (
            <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-150">
              <form onSubmit={handleModifySubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-end">
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">From City</label>
                  <select
                    value={fromCity}
                    onChange={e => setFromCity(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                  >
                    {cityOptions.map(c => (
                      <option key={c} value={c} disabled={c === toCity}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-1 flex justify-center pb-1">
                  <button type="button" onClick={handleSwap} className="p-2 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 cursor-pointer">
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">To Destination</label>
                  <select
                    value={toCity}
                    onChange={e => setToCity(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                  >
                    {cityOptions.map(c => (
                      <option key={c} value={c} disabled={c === fromCity}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={e => setTravelDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-sm cursor-pointer"
                  >
                    Update Search
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area: Sidebar Filters + Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Filter Sidebar (Desktop & Mobile Drawer) */}
          <aside className={`lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs ${
            isMobileFilterOpen ? 'fixed inset-4 z-50 overflow-y-auto bg-white shadow-2xl' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Filter className="w-4 h-4 text-rose-600" />
                <span>Filters</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                {isMobileFilterOpen && (
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="lg:hidden text-xs font-bold text-slate-700 ml-2"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>

            {/* Bus Types Filter */}
            <div className="mb-5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">Bus Type</label>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'AC', label: 'AC Buses' },
                  { id: 'Non-AC', label: 'Non-AC Buses' },
                  { id: 'Sleeper', label: 'Sleeper Berths' },
                  { id: 'Seater', label: 'Seater / Pushback' },
                  { id: 'Electric', label: '100% Electric EV' }
                ].map(type => (
                  <label key={type.id} className="flex items-center gap-2 cursor-pointer hover:text-rose-600">
                    <input
                      type="checkbox"
                      checked={busTypes.includes(type.id)}
                      onChange={e => {
                        if (e.target.checked) setBusTypes(prev => [...prev, type.id]);
                        else setBusTypes(prev => prev.filter(t => t !== type.id));
                      }}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-slate-700 font-medium">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Departure Time Slots */}
            <div className="mb-5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">Departure Time</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'early_morning', label: 'Before 6 AM' },
                  { id: 'morning', label: '6 AM - 12 PM' },
                  { id: 'afternoon', label: '12 PM - 6 PM' },
                  { id: 'evening', label: 'After 6 PM' }
                ].map(slot => {
                  const isChecked = timeSlots.includes(slot.id);
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => {
                        if (isChecked) setTimeSlots(prev => prev.filter(s => s !== slot.id));
                        else setTimeSlots(prev => [...prev, slot.id]);
                      }}
                      className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                      <span className="text-[11px] block">{slot.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Max Fare</label>
                <span className="text-xs font-extrabold text-rose-600">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={400}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-semibold">
                <span>₹400</span>
                <span>₹2000</span>
              </div>
            </div>

            {/* Bus Operators Filter */}
            <div className="mb-5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Bus Operators</label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
                {uniqueOperators.map(op => (
                  <label key={op} className="flex items-center gap-2 cursor-pointer hover:text-rose-600">
                    <input
                      type="checkbox"
                      checked={operators.includes(op)}
                      onChange={e => {
                        if (e.target.checked) setOperators(prev => [...prev, op]);
                        else setOperators(prev => prev.filter(o => o !== op));
                      }}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-slate-700 font-medium truncate">{op}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating Filter */}
            <div className="mb-5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Customer Rating</label>
              <div className="space-y-1.5 text-xs">
                {[
                  { value: 4.5, label: '4.5 & Above' },
                  { value: 4.0, label: '4.0 & Above' },
                  { value: 3.5, label: '3.5 & Above' },
                ].map(r => (
                  <label key={r.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="min_rating"
                      checked={minRating === r.value}
                      onChange={() => setMinRating(r.value)}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div className="flex items-center gap-1 text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{r.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Seat Availability Switch */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer">
                <span>Available Seats Only</span>
                <input
                  type="checkbox"
                  checked={onlyAvailableSeats}
                  onChange={e => setOnlyAvailableSeats(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
              </label>
            </div>
          </aside>

          {/* Right Results Column */}
          <main className="lg:col-span-9 space-y-4">
            {/* Sorting Tabs Bar */}
            <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-bold text-slate-700 hidden sm:inline">SORT BY:</span>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap flex-1 sm:flex-initial">
                {[
                  { id: 'recommended', label: 'Recommended' },
                  { id: 'price_low', label: 'Cheapest Fare' },
                  { id: 'departure_early', label: 'Earliest' },
                  { id: 'rating_high', label: 'Highest Rated' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSortBy(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      sortBy === tab.id
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results Cards */}
            {searchResults.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Buses Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                  We could not find any buses matching your active filters for {searchParams.fromCity} to {searchParams.toCity}. Try resetting your filters or select from popular routes.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => navigateTo('home')}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Explore All Routes
                  </button>
                </div>
              </div>
            ) : (
              searchResults.map(({ schedule, bus, availableSeats, durationText, adjustedFare }) => (
                <div
                  key={schedule.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    {/* Top Bus Info Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-base font-bold text-slate-900">{bus.name}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {bus.busType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {bus.operator} • <span className="font-mono">{bus.busNumber}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                          <span>{bus.rating}</span>
                          <span className="text-[10px] text-emerald-600">({bus.totalRatings})</span>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-600 uppercase font-semibold">Starts from</div>
                          <div className="text-xl font-black text-slate-900">₹{adjustedFare}</div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Schedule Timeline & Availability */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Departure */}
                      <div className="md:col-span-3">
                        <div className="text-xl font-bold text-slate-900">{schedule.departureTime}</div>
                        <div className="text-xs font-semibold text-slate-700">{searchParams.fromCity}</div>
                        <div className="text-[11px] text-slate-600 truncate">
                          {boardingPoints.find(p => p.id === schedule.boardingPoints[0]?.pointId)?.name || 'Central Bus Stand'}
                        </div>
                      </div>

                      {/* Journey Duration */}
                      <div className="md:col-span-3 text-center">
                        <div className="text-xs font-semibold text-slate-500 mb-1">{durationText}</div>
                        <div className="w-full flex items-center justify-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          <span className="h-[2px] flex-1 bg-slate-200 border-t border-dashed border-slate-400"></span>
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        </div>
                        <div className="text-[10px] text-slate-600 mt-1 font-semibold">Direct Route</div>
                      </div>

                      {/* Arrival */}
                      <div className="md:col-span-3">
                        <div className="text-xl font-bold text-slate-900">
                          {schedule.arrivalTime} {schedule.nextDayArrival && <span className="text-[10px] text-rose-600 font-bold">(+1 day)</span>}
                        </div>
                        <div className="text-xs font-semibold text-slate-700">{searchParams.toCity}</div>
                        <div className="text-[11px] text-slate-600 truncate">
                          {droppingPoints.find(p => p.id === schedule.droppingPoints[0]?.pointId)?.name || 'Central Terminus'}
                        </div>
                      </div>

                      {/* Seat Count & Action Buttons */}
                      <div className="md:col-span-3 flex flex-col items-end justify-center space-y-2 pt-2 md:pt-0">
                        <div className="text-xs">
                          {availableSeats > 5 ? (
                            <span className="text-emerald-600 font-bold">{availableSeats} Seats Available</span>
                          ) : availableSeats > 0 ? (
                            <span className="text-amber-600 font-bold">Only {availableSeats} Seats Left!</span>
                          ) : (
                            <span className="text-rose-600 font-bold">Sold Out</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 w-full justify-end">
                          <button
                            onClick={() => setSelectedBusForModal({ bus, schedule })}
                            className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => selectBusAndSchedule(bus, schedule)}
                            disabled={availableSeats === 0}
                            className={`px-5 py-2 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer ${
                              availableSeats > 0
                                ? 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow-md'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            Select Seats
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Amenities Badges */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-500">
                      <div className="flex items-center gap-2 flex-wrap">
                        {bus.amenities.map((amenity, i) => (
                          <span key={i} className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-medium">Free Cancellation Available</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>

      {/* Bus Details Modal */}
      {selectedBusForModal && (
        <CustomerBusDetailsModal
          bus={selectedBusForModal.bus}
          schedule={selectedBusForModal.schedule}
          boardingPoints={boardingPoints}
          droppingPoints={droppingPoints}
          onClose={() => setSelectedBusForModal(null)}
          onSelectSeats={(b, s) => selectBusAndSchedule(b, s)}
        />
      )}
    </div>
  );
};
