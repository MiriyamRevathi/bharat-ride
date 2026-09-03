import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass, ArrowLeft, Bus, Navigation, Clock,
  MapPin, CheckCircle2, Phone, AlertCircle, RefreshCw,
  Search, ShieldCheck, Gauge
} from 'lucide-react';

export const CustomerTracking: React.FC = () => {
  const {
    currentBooking,
    bookings,
    buses,
    routes,
    navigateTo,
    showToast
  } = useApp();

  const [searchPnr, setSearchPnr] = useState('');
  const [activeBooking, setActiveBooking] = useState(currentBooking || bookings[0] || null);
  const [currentSpeed, setCurrentSpeed] = useState(72);
  const [currentProgress, setCurrentProgress] = useState(65);

  // Speed odometer simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeed(prev => {
        const delta = (Math.random() - 0.5) * 6;
        return Math.min(88, Math.max(60, Math.round(prev + delta)));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchPnr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPnr.trim()) return;
    const found = bookings.find(b => b.id.toLowerCase() === searchPnr.trim().toLowerCase());
    if (found) {
      setActiveBooking(found);
      showToast(`Tracking active for ${found.id}`, 'success');
    } else {
      showToast('Booking PNR reference not found. Showing demo live bus tracking.', 'error');
    }
  };

  const bus = activeBooking ? buses.find(b => b.id === activeBooking.busId) : buses[0];
  const route = activeBooking ? routes.find(r => r.id === activeBooking.routeId) : routes[0];

  const checkpoints = [
    { name: `${route?.sourceCity || 'Guntur'} Boarding Point`, status: 'PASSED', time: '10:30 PM', dist: '0 km' },
    { name: 'City Toll Plaza & Ring Road Bypass', status: 'PASSED', time: '11:15 PM', dist: '35 km' },
    { name: 'Highway Rest Oasis & Refreshment Halt', status: 'CURRENT', time: '01:00 AM (Ongoing 15 min halt)', dist: '140 km' },
    { name: 'Outer Ring Road (ORR) Intercity Junction', status: 'UPCOMING', time: '03:15 AM (Expected)', dist: '225 km' },
    { name: `${route?.destinationCity || 'Hyderabad'} Central Terminal`, status: 'UPCOMING', time: '04:15 AM (Expected)', dist: '275 km' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Live Satellite GPS Telemetry</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Live Bus GPS Tracking</h1>
          </div>

          <button
            onClick={() => navigateTo('my_bookings')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>My Bookings</span>
          </button>
        </div>

        {/* PNR Tracker Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6">
          <form onSubmit={handleSearchPnr} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Booking ID / PNR (e.g. BUS-2026-94821)"
                value={searchPnr}
                onChange={e => setSearchPnr(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Track PNR
            </button>
          </form>
        </div>

        {/* Active Bus Telemetry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Tracking Map / Telemetry */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Bus Info Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{bus?.operator || 'Bharat Super Express'}</span>
                <h2 className="text-xl font-extrabold text-slate-900">{bus?.name || 'Volvo Multi-Axle AC Sleeper'}</h2>
                <p className="text-xs text-slate-500 font-mono">Reg: {bus?.busNumber} • {bus?.busType}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-right">
                  <div className="text-[10px] uppercase font-bold text-emerald-600">Status</div>
                  <div className="text-xs font-extrabold text-emerald-700">On Time (+0 min)</div>
                </div>
              </div>
            </div>

            {/* Simulated Live Expressway Highway Radar Map View */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-white overflow-hidden shadow-inner border border-slate-800">
              {/* Radar Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Navigation className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>Live GPS Telemetry Active</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700 text-xs font-mono">
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-white font-bold">{currentSpeed} km/h</span>
                  </div>
                </div>

                {/* Progress Bar along Expressway */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">{route?.sourceCity || 'Guntur'} (Start)</span>
                    <span className="text-rose-400 font-extrabold">{route?.destinationCity || 'Hyderabad'} (Destination)</span>
                  </div>

                  <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${currentProgress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>140 km covered</span>
                    <span className="text-emerald-400 font-bold">135 km remaining (Est. 2h 15m)</span>
                  </div>
                </div>

                {/* Live Position Marker */}
                <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
                      <Bus className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">NH-65 Highway Tollway, Km 140</div>
                      <div className="text-[11px] text-slate-400">Current Halt: Food Plaza &amp; Fuel Station</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Signal Quality</div>
                    <div className="text-emerald-400 font-bold text-xs">4G / GPS Locked</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkpoints & Schedule Timeline */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Highway Route Checkpoints &amp; Halts</span>
              </h3>

              <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {checkpoints.map((cp, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                      cp.status === 'PASSED'
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : cp.status === 'CURRENT'
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {cp.status === 'PASSED' ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{cp.name}</span>
                        <span className={cp.status === 'CURRENT' ? 'text-amber-600' : 'text-slate-500'}>{cp.time}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex justify-between">
                        <span>Distance: {cp.dist}</span>
                        <span className="font-semibold uppercase text-[10px] text-slate-600">{cp.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Driver Contact & Support */}
          <div className="lg:col-span-4 space-y-6">
            {/* Driver Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 mb-4 border-b border-slate-100">
                Assigned Bus Crew
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                  alt="Driver"
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">Suresh Kumar Rao</div>
                  <div className="text-xs text-slate-500">Lead Senior Highway Captain</div>
                  <div className="text-[11px] text-emerald-600 font-bold">12+ Years Verified Experience</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Contact Number:</span>
                  <span className="font-mono font-bold text-slate-900">+91 94401 88392</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Conductor:</span>
                  <span className="font-semibold text-slate-900">Ravi Shankar</span>
                </div>
              </div>

              <button
                onClick={() => showToast('Simulating call to Captain Suresh Kumar...', 'info')}
                className="w-full mt-4 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Bus Captain (Demo)</span>
              </button>
            </div>

            {/* Emergency & 24x7 Helpline */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>BharatRide 24x7 Passenger Care</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Need urgent assistance or have queries regarding your boarding point pickup? Our ops center is online.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 text-center">
                Toll Free Helpline: <span className="text-rose-600">1800-419-8999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
