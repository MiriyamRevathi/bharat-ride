import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell, CheckCheck, Clock, Calendar, AlertCircle, Info, CheckCircle2,
  Trash2, ShieldCheck
} from 'lucide-react';

export const DriverNotifications: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    currentDriver
  } = useApp();

  // Filter notifications relevant to DRIVER
  const driverNotifs = notifications.filter(
    n => n.targetRole === 'DRIVER' || !n.targetRole
  );

  const unreadCount = driverNotifs.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Fleet Communications &amp; Dispatch Alerts
            </span>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Driver Alerts &amp; Notifications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational schedule alerts, route notifications, passenger bookings, and fleet dispatches
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto shadow-xs"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {driverNotifs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-xs">
          <Bell className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-900 mb-1">No alerts or notifications</h4>
          <p className="text-xs">Your dispatch notifications will appear here when trips or changes occur.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {driverNotifs.map(notif => {
            return (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 shadow-xs ${
                  notif.read
                    ? 'bg-slate-50/70 border-slate-200 text-slate-500'
                    : 'bg-white border-rose-300 text-slate-800 ring-1 ring-rose-500/10'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === 'CANCELLATION'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : notif.type === 'BOOKING'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`text-sm font-bold truncate ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {new Date(notif.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-1.5">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <span>{new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    {!notif.read && (
                      <>
                        <span>&bull;</span>
                        <span className="text-rose-600 font-bold">New Alert</span>
                      </>
                    )}
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
