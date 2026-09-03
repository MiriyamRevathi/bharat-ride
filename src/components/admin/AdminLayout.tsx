import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bus, LayoutDashboard, Route as RouteIcon, Calendar,
  MapPin, Grid, Users, Ticket, CreditCard, XCircle,
  Tag, BarChart3, Settings, ScrollText, LogOut, Shield,
  Bell, ChevronDown, CheckCheck, Menu, X, ArrowLeft
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    adminView,
    setAdminView,
    logout,
    navigateTo,
    currentUser,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const adminNotifications = notifications.filter(
    n => n.targetRole === 'ALL' || n.targetRole === 'ADMIN'
  );
  const unreadCount = adminNotifications.filter(n => !n.read).length;

  const navMenuItems = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'buses', label: 'Bus Fleet Master', icon: Bus },
    { id: 'routes', label: 'Route Management', icon: RouteIcon },
    { id: 'schedules', label: 'Schedules & Trips', icon: Calendar },
    { id: 'boarding_dropping', label: 'Boarding Points', icon: MapPin },
    { id: 'seats', label: 'Live Seat Grid', icon: Grid },
    { id: 'bookings', label: 'Master Bookings', icon: Ticket },
    { id: 'cancellations', label: 'Cancellations & Refunds', icon: XCircle },
    { id: 'payments', label: 'Payment Registry', icon: CreditCard },
    { id: 'customers', label: 'Customer Accounts', icon: Users },
    { id: 'offers', label: 'Coupons & Promo Codes', icon: Tag },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3 },
    { id: 'activity_logs', label: 'Audit Activity Logs', icon: ScrollText },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EE] text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-900">BharatRide Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 z-50 ${
          isSidebarOpen ? 'fixed inset-y-0 left-0 shadow-2xl' : 'hidden md:flex'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white font-black shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                  <span>Bharat</span>
                  <span className="text-rose-600">Admin</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Fleet Operations</div>
              </div>
            </div>
            {isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Exit to Customer Portal button */}
          <div className="p-3 border-b border-slate-100">
            <button
              onClick={() => navigateTo('home')}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center justify-between border border-slate-200 transition-colors cursor-pointer group"
            >
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5 text-rose-500 group-hover:-translate-x-0.5 transition-transform" />
                <span>Customer Portal</span>
              </span>
              <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold border border-rose-200">LIVE</span>
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-230px)] overflow-y-auto">
            {navMenuItems.map(item => {
              const Icon = item.icon;
              const isActive = adminView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminView(item.id as any);
                    if (isSidebarOpen) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout Bottom Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'}
                alt="Admin Vikram"
                className="w-8 h-8 rounded-full object-cover border border-rose-200"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 truncate max-w-[100px]">{currentUser?.name || 'Vikram Mehta'}</div>
                <div className="text-[10px] text-rose-600 font-medium">Head Operations</div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {navMenuItems.find(i => i.id === adminView)?.label || 'Admin Portal'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-slate-700">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <span className="font-bold text-xs text-slate-900">System Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-rose-600 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {adminNotifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-400">No alerts</div>
                    ) : (
                      adminNotifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-3 transition-colors cursor-pointer hover:bg-slate-50 ${
                            notif.read ? 'opacity-60' : 'bg-rose-50/50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-900">{notif.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-1">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Portal Switch */}
            <button
              onClick={() => navigateTo('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>View Passenger Website</span>
            </button>
          </div>
        </header>

        {/* Children Body View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F4F1EE] text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};
