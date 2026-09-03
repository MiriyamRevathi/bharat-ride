import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bus, Ticket, Tag, Compass, HelpCircle, User,
  Bell, LogIn, LogOut, Shield, ChevronDown, CheckCheck
} from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const {
    currentUser,
    currentView,
    navigateTo,
    logout,
    setCustomerLoginModal,
    setAdminLoginModal,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setAuthRedirect
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLoginClick = () => {
    if (['seat_selection', 'boarding_dropping', 'passenger_details', 'payment'].includes(currentView)) {
      setAuthRedirect(currentView);
    }
    navigateTo('login');
  };

  const handleRegisterClick = () => {
    if (['seat_selection', 'boarding_dropping', 'passenger_details', 'payment'].includes(currentView)) {
      setAuthRedirect(currentView);
    }
    navigateTo('register');
  };

  const customerNotifications = (notifications || []).filter(
    n => n && (n.targetRole === 'ALL' || n.targetRole === 'CUSTOMER')
  );
  const unreadCount = customerNotifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Bus },
    { id: 'search', label: 'Search Buses', icon: Compass },
    { id: 'my_bookings', label: 'My Bookings', icon: Ticket },
    { id: 'offers_page', label: 'Offers', icon: Tag },
    { id: 'tracking', label: 'Track Bus', icon: Compass },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs print:hidden">
      {/* Top Banner with Demo mode & Quick Admin Switch */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-white">BharatRide Intercity Bus Network</span>
            <span className="hidden sm:inline text-slate-400">| Safe Demo Travel Booking Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAdminLoginModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer py-0.5 px-2 rounded bg-slate-800 border border-slate-700 hover:border-amber-400/50"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo Treatment */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                <span>Bharat</span>
                <span className="text-rose-600">Ride</span>
              </div>
              <p className="text-[10px] tracking-wider uppercase text-slate-700 font-semibold">Premium Intercity Travels</p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-rose-600 bg-rose-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Controls & Notifications */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Driver Portal Link */}
            <button
              onClick={() => navigateTo('driver_login')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors border border-indigo-200 cursor-pointer"
              title="Open Driver Management Portal"
            >
              <Bus className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Driver Portal</span>
              <span className="sm:hidden">Driver</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <div className="font-semibold text-slate-800 text-sm">Notifications</div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {customerNotifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-600 font-medium">No new notifications</div>
                    ) : (
                      customerNotifications.slice(0, 6).map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-3 text-xs transition-colors cursor-pointer hover:bg-slate-50 ${
                            notif.read ? 'opacity-70' : 'bg-rose-50/40 font-medium'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-semibold text-slate-900">{notif.title}</span>
                            {!notif.read && <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-1"></span>}
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                          <span className="text-[10px] text-slate-700 mt-1 block">
                            {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Authentication / Profile Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:block text-left text-xs">
                    <div className="font-semibold text-slate-800 leading-tight truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-emerald-600 font-medium">Customer Demo</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-800 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-600 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => { setShowUserMenu(false); navigateTo('profile'); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      My Profile
                    </button>
                    <button
                      onClick={() => { setShowUserMenu(false); navigateTo('my_bookings'); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5 text-slate-400" />
                      My Bookings
                    </button>
                    <button
                      onClick={() => { setShowUserMenu(false); navigateTo('login'); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5 text-slate-400" />
                      Switch Account / Re-login
                    </button>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => { setShowUserMenu(false); logout(); }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-600" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-white border-t border-slate-200 py-2 px-1 text-[11px] font-medium text-slate-600">
        {navItems.slice(0, 5).map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded cursor-pointer ${
                isActive ? 'text-rose-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

export const CustomerFooter: React.FC = () => {
  const { navigateTo, setAdminLoginModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white font-bold">
                <Bus className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">Bharat<span className="text-rose-500">Ride</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier high-comfort bus ticketing network connecting major cities with verified luxury operators, live GPS tracking, and transparent pricing.
            </p>
            <div className="text-xs text-slate-500">
              Customer Helpline: <span className="text-white font-semibold">+91 1800-419-8999</span>
            </div>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Routes</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigateTo('search')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Guntur → Hyderabad</button></li>
              <li><button onClick={() => navigateTo('search')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Hyderabad → Vijayawada</button></li>
              <li><button onClick={() => navigateTo('search')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Hyderabad → Bengaluru</button></li>
              <li><button onClick={() => navigateTo('search')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Bengaluru → Chennai</button></li>
              <li><button onClick={() => navigateTo('search')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Mumbai → Pune</button></li>
              <li><button onClick={() => navigateTo('search')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Delhi → Jaipur</button></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Customer Support</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigateTo('help')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Frequently Asked Questions</button></li>
              <li><button onClick={() => navigateTo('help')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Cancellation &amp; Refund Policy</button></li>
              <li><button onClick={() => navigateTo('tracking')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Live Bus GPS Tracking</button></li>
              <li><button onClick={() => navigateTo('offers_page')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Coupons &amp; Offers</button></li>
              <li><button onClick={() => navigateTo('help')} className="hover:text-rose-400 transition-colors text-slate-400 cursor-pointer">Contact Support Desk</button></li>
            </ul>
          </div>

          {/* Quick Admin Access & Disclaimer */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Admin Portal</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Fleet managers and operations staff can access scheduling, live passenger manifests, seat allocation and analytics.
            </p>
            <button
              onClick={() => setAdminLoginModal(true)}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Launch Admin Dashboard</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 BharatRide Travel Systems Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
