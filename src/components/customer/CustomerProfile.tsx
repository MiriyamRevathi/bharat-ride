import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User, Mail, Phone, Ticket, Shield, CheckCircle2,
  Calendar, MapPin, Edit3, ArrowRight, Save
} from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const {
    currentUser,
    bookings,
    updateUser,
    setCustomerLoginModal,
    navigateTo,
    showToast
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || 'Rajesh Sharma');
  const [email, setEmail] = useState(currentUser?.email || 'rajesh.sharma@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');

  const userBookings = bookings.filter(b => b.userId === currentUser?.id || currentUser?.role === 'CUSTOMER');
  const upcomingCount = userBookings.filter(b => b.status === 'CONFIRMED').length;
  const completedCount = userBookings.filter(b => b.status === 'COMPLETED').length;
  const cancelledCount = userBookings.filter(b => b.status === 'CANCELLED').length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      updateUser(currentUser.id, {
        name,
        email,
        phone
      });
    }
    setIsEditing(false);
    showToast('Passenger profile updated successfully.', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-200 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-slate-900">{currentUser?.name || name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Verified Passenger
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{currentUser?.email || email}</p>
                <div className="text-[11px] text-slate-400 mt-1">BharatRide Club Member since 2024</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              <button
                onClick={() => setCustomerLoginModal(true)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Switch Account
              </button>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Mobile</span>
                <span className="font-bold text-slate-800">{phone}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Email</span>
                <span className="font-bold text-slate-800">{email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Primary City</span>
                <span className="font-bold text-slate-800">Hyderabad, Telangana</span>
              </div>
            </div>
          )}
        </div>

        {/* Travel Statistics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-slate-900 mb-1">{userBookings.length}</div>
            <div className="text-xs text-slate-500 font-semibold">Total Bookings</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-emerald-600 mb-1">{upcomingCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Upcoming Trips</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-blue-600 mb-1">{completedCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Completed Trips</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-rose-600 mb-1">{cancelledCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Cancelled</div>
          </div>
        </div>

        {/* Quick Links to Bookings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Manage Your Bus Tickets</h3>
            <p className="text-xs text-slate-500">View journey manifests, download printable e-tickets, or cancel trips.</p>
          </div>
          <button
            onClick={() => navigateTo('my_bookings')}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
