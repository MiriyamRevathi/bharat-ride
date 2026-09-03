import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRightLeft, Calendar, Users, Search, Bus,
  ShieldCheck, Clock, MapPin, Tag, Star, ArrowRight,
  Zap, HeartHandshake, PhoneCall
} from 'lucide-react';

export const CustomerHome: React.FC = () => {
  const {
    routes,
    buses,
    offers,
    setSearchParams,
    navigateTo,
    selectBusAndSchedule,
    schedules
  } = useApp();

  const [fromCity, setFromCity] = useState('Guntur');
  const [toCity, setToCity] = useState('Hyderabad');
  const [travelDate, setTravelDate] = useState('2026-09-10');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      fromCity,
      toCity,
      travelDate,
      returnDate,
      passengers
    });
  };

  const handlePopularRouteClick = (source: string, destination: string) => {
    setFromCity(source);
    setToCity(destination);
    setSearchParams({
      fromCity: source,
      toCity: destination,
      travelDate,
      returnDate: '',
      passengers: 1
    });
  };

  const popularRoutes = [
    { from: 'Guntur', to: 'Hyderabad', duration: '5h 15m', fare: '₹850', tag: 'Fast Highway' },
    { from: 'Hyderabad', to: 'Guntur', duration: '5h 15m', fare: '₹850', tag: 'Overnight' },
    { from: 'Vijayawada', to: 'Hyderabad', duration: '4h 45m', fare: '₹750', tag: 'Express' },
    { from: 'Hyderabad', to: 'Vijayawada', duration: '4h 45m', fare: '₹750', tag: 'Frequent' },
    { from: 'Hyderabad', to: 'Bengaluru', duration: '8h 30m', fare: '₹1,100', tag: 'AC Sleeper' },
    { from: 'Bengaluru', to: 'Chennai', duration: '6h 00m', fare: '₹650', tag: 'Top Rated' },
    { from: 'Chennai', to: 'Bengaluru', duration: '6h 00m', fare: '₹650', tag: 'Express' },
    { from: 'Mumbai', to: 'Pune', duration: '3h 30m', fare: '₹700', tag: 'Expressway' },
    { from: 'Delhi', to: 'Jaipur', duration: '5h 00m', fare: '₹950', tag: 'Luxury Volvo' },
    { from: 'Hyderabad', to: 'Visakhapatnam', duration: '11h 00m', fare: '₹1,250', tag: 'Long Haul' },
  ];

  const activeBuses = (buses || []).filter(b => b && b.status === 'ACTIVE').slice(0, 3);
  const activeOffers = (offers || []).filter(o => o && o.status === 'ACTIVE').slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section with Search Card */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Subtle Highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>India's Most Trusted Luxury Bus Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Book Your Journey With Ease
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Experience premium Volvo, BharatBenz &amp; Electric AC sleepers with live GPS tracking, sanitised berths and guaranteed departures.
          </p>
        </div>

        {/* The Search Card */}
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-800 border border-slate-100">
            <form onSubmit={handleSearchSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* FROM */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">From City</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-rose-600 absolute left-3 top-3.5" />
                    <select
                      value={fromCity}
                      onChange={e => setFromCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      {cityOptions.map(city => (
                        <option key={city} value={city} disabled={city === toCity}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* SWAP BUTTON */}
                <div className="md:col-span-1 flex justify-center pt-2 md:pt-4">
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="p-2.5 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-600 border border-slate-200 transition-all cursor-pointer shadow-xs hover:rotate-180 duration-200"
                    title="Swap Cities"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* TO */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">To Destination</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-orange-600 absolute left-3 top-3.5" />
                    <select
                      value={toCity}
                      onChange={e => setToCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      {cityOptions.map(city => (
                        <option key={city} value={city} disabled={city === fromCity}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* JOURNEY DATE */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Journey Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      value={travelDate}
                      onChange={e => setTravelDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                {/* PASSENGERS & SEARCH BTN */}
                <div className="md:col-span-2 flex flex-col justify-end">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Passengers</label>
                  <div className="relative mb-0">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <select
                      value={passengers}
                      onChange={e => setPassengers(Number(e.target.value))}
                      className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      <option value={1}>1 Seat</option>
                      <option value={2}>2 Seats</option>
                      <option value={3}>3 Seats</option>
                      <option value={4}>4 Seats</option>
                      <option value={5}>5 Seats</option>
                      <option value={6}>6 Seats</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Free cancellation up to 12 hrs before departure • Instant M-Tickets</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white font-bold rounded-xl text-xs shadow-lg hover:shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>SEARCH BUSES</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Special Offers Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeOffers.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex items-start gap-3.5 group cursor-pointer"
              onClick={() => navigateTo('offers_page')}
            >
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Tag className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900 truncate">{offer.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{offer.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800">
                    {offer.code}
                  </span>
                  <span className="text-[10px] text-rose-600 font-bold group-hover:underline">Use Code →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Top Indian Expressways</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Popular Bus Routes</h2>
          </div>
          <p className="text-xs text-slate-500">Over 500+ daily departures across Andhra, Telangana, Karnataka, Tamil Nadu &amp; Maharashtra</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {popularRoutes.map((route, i) => (
            <button
              key={i}
              onClick={() => handlePopularRouteClick(route.from, route.to)}
              className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-2">
                <span>{route.duration}</span>
                <span className="bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded">{route.tag}</span>
              </div>
              <div className="font-bold text-slate-900 text-xs group-hover:text-rose-600 transition-colors flex items-center gap-1.5 mb-1.5">
                <span>{route.from}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                <span>{route.to}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Starting from</span>
                <span className="font-bold text-slate-900 text-xs">{route.fare}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Luxury Buses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Fleet Excellence</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Luxury Buses</h2>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
          >
            View all available schedules →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeBuses.map(bus => {
            const matchingSch = schedules.find(s => s.busId === bus.id);
            return (
              <div
                key={bus.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {bus.busType}
                    </span>
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                      <span>{bus.rating}</span>
                      <span className="text-[10px] text-emerald-600">({bus.totalRatings})</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{bus.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-3">Operated by {bus.operator}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(bus.amenities || []).slice(0, 4).map((amenity, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">
                        {amenity}
                      </span>
                    ))}
                    {(bus.amenities || []).length > 4 && (
                      <span className="text-[10px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded-md">
                        +{(bus.amenities || []).length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Total Capacity:</span>
                      <span className="font-semibold text-slate-800">{bus.totalSeats} Berths/Seats</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Registration:</span>
                      <span className="font-mono text-slate-800 font-semibold">{bus.busNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-600 uppercase font-semibold block">Base Fare</span>
                    <span className="text-lg font-extrabold text-slate-900">₹{bus.baseFare}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (matchingSch) {
                        selectBusAndSchedule(bus, matchingSch);
                      } else {
                        navigateTo('search');
                      }
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 my-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-500 mb-1">50,000+</div>
            <div className="text-xs text-slate-300 font-medium">Happy Passengers Traveled</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">200+</div>
            <div className="text-xs text-slate-300 font-medium">Daily Scheduled Departures</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 mb-1">98.4%</div>
            <div className="text-xs text-slate-300 font-medium">On-Time Highway Performance</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">4.8 / 5</div>
            <div className="text-xs text-slate-300 font-medium">Verified Customer Rating</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Travel Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">The BharatRide Standard</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Why Travelers Choose BharatRide</h2>
          <p className="text-xs text-slate-500 mt-2">Engineered for comfort, punctuality, and complete peace of mind on Indian highways.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Live GPS Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track your bus in real-time, view live speed, upcoming rest halts, and exact boarding point arrivals with precision telemetry.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Verified Luxury Fleet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Travel only on sanitized Volvo Multi-Axle, BharatBenz, and Electric AC sleeper buses with comfortable berths and clean linens.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Zero-Hassle Refunds</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plans changed? Enjoy instant automated cancellations and immediate refund disbursements straight to your original payment mode.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Fast &amp; Simple</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">How It Works in 4 Steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Search Route</h4>
              <p className="text-xs text-slate-500">Pick your source city, destination, and travel date.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Select Seat</h4>
              <p className="text-xs text-slate-500">Choose your preferred sleeper berth or window seat with interactive layout.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Boarding &amp; Add-ons</h4>
              <p className="text-xs text-slate-500">Select boarding point, enter passenger details and apply discount coupons.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-3">4</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Instant M-Ticket</h4>
              <p className="text-xs text-slate-500">Get confirmed ticket instantly with live bus tracking link.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-rose-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready for your next journey?</h2>
            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
              Book your intercity bus tickets today with exclusive coupons like <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME100</span> and travel in supreme luxury.
            </p>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="px-8 py-3.5 bg-white text-rose-600 hover:bg-rose-50 font-bold rounded-xl text-xs sm:text-sm shadow-lg hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
          >
            Search &amp; Book Buses Now
          </button>
        </div>
      </section>
    </div>
  );
};
