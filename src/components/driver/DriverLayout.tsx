import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bus, LayoutDashboard, Calendar, Navigation, Users, Bell,
  User, LogOut, ArrowLeft, Shield, Clock, Phone, AlertCircle
} from 'lucide-react';

interface DriverLayoutProps {
  children: React.ReactNode;
}

export const DriverLayout: React.FC<DriverLayoutProps> = ({ children }) => {
  const {
    currentDriver,
    driverView,
    setDriverView,
    logoutDriver,
    buses,
    notifications,
    setCurrentRole,
    navigateTo
  } = useApp();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Find assigned bus for this driver
  const assignedBus = buses.find(
    b => b.driver_id === currentDriver?.driver_id ||
         b.driver?.driver_id === currentDriver?.driver_id ||
         (currentDriver?.assigned_bus_id && b.id === currentDriver.assigned_bus_id)
  );

  const unreadCount = notifications.filter(
    n => !n.read && (n.targetRole === 'DRIVER' || !n.targetRole)
  ).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my_trips', label: 'My Trips', icon: Calendar },
    { id: 'route_details', label: 'Route Details', icon: Navigation },
    { id: 'passenger_list', label: 'Passenger List', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EE] text-slate-900 flex flex-col font-sans selection:bg-rose-500/20 selection:text-rose-900">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Portal Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-slate-900">
                    Bharat<span className="text-rose-600">Driver</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Console
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Driver Management &amp; Passenger Manifest
                </p>
              </div>
            </div>

            {/* Middle: Live Clock & Assigned Bus Badge */}
            <div className="hidden md:flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span className="font-mono font-medium">
                  {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">
                  {currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              {assignedBus ? (
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-500">Assigned Bus:</span>
                  <span className="font-bold text-slate-900">{assignedBus.busNumber}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                    {assignedBus.type}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-800">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>No bus assigned currently</span>
                </div>
              )}
            </div>

            {/* Right: Driver Profile Badge & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Driver Details Pill */}
              <div
                onClick={() => setDriverView('profile')}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                title="View Driver Profile"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold text-xs">
                  {currentDriver?.name?.charAt(0) || 'D'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentDriver?.name || 'Driver'}
                  </div>
                  <div className="text-[10px] text-rose-600 font-mono font-medium">
                    {currentDriver?.driver_id || 'ID'} &bull; <span className="text-emerald-600">{currentDriver?.status || 'Active'}</span>
                  </div>
                </div>
              </div>

              {/* Portal Switch Button */}
              <button
                onClick={() => {
                  setCurrentRole('CUSTOMER');
                  navigateTo('home');
                }}
                className="text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                title="Switch to Passenger Portal"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden lg:inline">Passenger Portal</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={logoutDriver}
                className="text-xs text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 font-semibold cursor-pointer"
                title="Log out of Driver Console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-slate-200 bg-white overflow-x-auto no-scrollbar shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = driverView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setDriverView(item.id)}
                  className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-rose-600 text-rose-600 bg-rose-50/40'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-600 text-white leading-tight">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Driver Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BharatRide Driver System &bull; Live GPS Sync Active</span>
          <span>Emergency Fleet Control: +91 1800 200 4888</span>
        </div>
      </footer>
    </div>
  );
};
