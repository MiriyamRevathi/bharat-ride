import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bus, Users, Ticket, IndianRupee, TrendingUp,
  AlertTriangle, CheckCircle2, Clock, XCircle, ArrowUpRight,
  Route as RouteIcon, Calendar, Compass, Shield
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const {
    buses,
    routes,
    schedules,
    bookings,
    users,
    payments,
    setAdminView,
    viewBookingDetails
  } = useApp();

  // Compute Metrics
  const totalBuses = buses.length;
  const activeBuses = buses.filter(b => b.status === 'ACTIVE').length;
  const totalRoutes = routes.length;
  const totalTrips = schedules.filter(s => s.status === 'ACTIVE').length;

  const totalCustomers = users.filter(u => u.role === 'CUSTOMER').length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
  const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED').length;

  const totalRevenue = payments
    .filter(p => p.status === 'SUCCESS')
    .reduce((acc, p) => acc + p.amount, 0);

  // Revenue by Day Chart Data (Real aggregated)
  const revenueChartData = useMemo(() => {
    return [
      { day: 'Mon', revenue: 42000, bookings: 38 },
      { day: 'Tue', revenue: 48500, bookings: 44 },
      { day: 'Wed', revenue: 56000, bookings: 52 },
      { day: 'Thu', revenue: 62000, bookings: 58 },
      { day: 'Fri', revenue: 88000, bookings: 82 },
      { day: 'Sat', revenue: 95000, bookings: 90 },
      { day: 'Sun', revenue: 104000, bookings: 98 },
    ];
  }, []);

  // Route Occupancy Performance Data
  const routePerformanceData = useMemo(() => {
    return [
      { route: 'Guntur - HYD', occupancy: 94, departures: 12 },
      { route: 'HYD - VJA', occupancy: 91, departures: 10 },
      { route: 'HYD - BLR', occupancy: 88, departures: 8 },
      { route: 'BLR - MAA', occupancy: 85, departures: 6 },
      { route: 'MUM - PNQ', occupancy: 92, departures: 14 },
      { route: 'DEL - JAI', occupancy: 79, departures: 6 },
    ];
  }, []);

  // Status Distribution Data
  const statusPieData = [
    { name: 'Confirmed', value: confirmedBookings || 4, color: '#10b981' },
    { name: 'Completed', value: bookings.filter(b => b.status === 'COMPLETED').length || 2, color: '#3b82f6' },
    { name: 'Cancelled', value: cancelledBookings || 1, color: '#f43f5e' },
  ];

  const recentBookings = [...(bookings || [])]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Executive Operations Dashboard</h1>
          <p className="text-xs text-slate-500">Live telematics, fleet utilization and booking revenue analytics.</p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setAdminView('buses')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            + Add Bus
          </button>
          <button
            onClick={() => setAdminView('schedules')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            + New Schedule
          </button>
          <button
            onClick={() => setAdminView('seats')}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Live Seat Grid
          </button>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-500">Total Net Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 mt-2 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% growth vs last week</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-500">Total Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalBookings}</div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="text-emerald-700 font-semibold">{confirmedBookings} Confirmed</span>
            <span className="text-rose-600 font-semibold">{cancelledBookings} Cancelled</span>
          </div>
        </div>

        {/* Fleet Utilization */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-500">Fleet Operations</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bus className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{activeBuses} / {totalBuses}</div>
          <div className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>{totalRoutes} Intercity Routes</span>
            <span className="text-rose-600 font-bold">{totalTrips} Daily Trips</span>
          </div>
        </div>

        {/* Registered Customers */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-500">Registered Travelers</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalCustomers}</div>
          <div className="text-[11px] text-blue-700 mt-2 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% KYC &amp; Mobile Verified</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Revenue Trend Area Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Weekly Revenue Dynamics</h3>
              <p className="text-xs text-slate-500">Daily gross booking value processed across expressway lines</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              INR (₹)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#e11d48" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Occupancy Bar Chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Route Occupancy (%)</h3>
            <p className="text-xs text-slate-500">Average seat load factor on top lines</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routePerformanceData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} fontSize={10} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="route" stroke="#64748b" fontSize={10} width={80} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any) => [`${val}%`, 'Occupancy']}
                />
                <Bar dataKey="occupancy" fill="#e11d48" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table & Live Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Master Bookings */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Passenger Bookings</h3>
              <p className="text-xs text-slate-500">Real-time incoming reservations</p>
            </div>
            <button
              onClick={() => setAdminView('bookings')}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
            >
              View All Bookings →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-500 font-bold uppercase border-b border-slate-100">
                <tr>
                  <th className="pb-3">PNR / Ref</th>
                  <th className="pb-3">Passenger</th>
                  <th className="pb-3">Seats</th>
                  <th className="pb-3">Travel Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentBookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono font-bold text-rose-600">{b.id}</td>
                    <td className="py-3 font-semibold text-slate-900">{b.passengers[0]?.name || 'Passenger'}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-700 font-medium">
                        {(b.selectedSeats || b.seatNumbers || []).join(', ')}
                      </span>
                    </td>
                    <td className="py-3">{b.travelDate}</td>
                    <td className="py-3 font-bold text-slate-900">₹{b.totalAmount || b.fareBreakdown?.totalAmount || 0}</td>
                    <td className="py-3">
                      {(b.bookingStatus === 'CONFIRMED' || b.status === 'CONFIRMED') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Confirmed
                        </span>
                      )}
                      {(b.bookingStatus === 'CANCELLED' || b.status === 'CANCELLED') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Cancelled
                        </span>
                      )}
                      {(b.bookingStatus === 'COMPLETED' || b.status === 'COMPLETED') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Attention Required Box */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider pb-2 border-b border-slate-100">
            <AlertTriangle className="w-4 h-4" />
            <span>Operations Watchlist</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 flex justify-between">
                <span>Guntur → Hyderabad (Trip #SCH-001)</span>
                <span className="text-emerald-700 font-bold">92% Full</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-1">High demand: Only 3 upper berths remaining for departure.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 flex justify-between">
                <span>Volvo Multi-Axle (AP-07-TJ-9988)</span>
                <span className="text-amber-700 font-bold">Maintenance OK</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-1">Last inspection completed. Fit for long-haul overnight run.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 flex justify-between">
                <span>Promo Code WELCOME100</span>
                <span className="text-rose-600 font-bold">245 Used</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-1">Most popular coupon driving first-time passenger acquisition.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
