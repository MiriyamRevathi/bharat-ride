import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import {
  Users, Search, Shield, Trash2, Mail,
  Phone, Ticket, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';

export const AdminCustomerManagement: React.FC = () => {
  const { users, bookings, deleteUser, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const customerList = users.filter(u => u.role === 'CUSTOMER');

  const filteredCustomers = customerList.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Registered Customer Accounts</h1>
          <p className="text-xs text-slate-400">View passenger profiles, verified contacts and past booking histories.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search passenger name, email, phone, ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          {filteredCustomers.length} Travelers
        </span>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Total Bookings</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredCustomers.map(user => {
                const userBookings = bookings.filter(b => b.userId === user.id);

                return (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                          alt={user.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{user.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{user.phone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-amber-400 font-bold font-mono">
                        {userBookings.length} Trips
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors cursor-pointer"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View User Trips Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-amber-500/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedUser.name}</h3>
                  <p className="text-xs text-slate-400">{selectedUser.email} • {selectedUser.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-amber-400">Customer Booking Log</h4>
              {bookings.filter(b => (b.userId === selectedUser.id || b.customerId === selectedUser.id)).length === 0 ? (
                <div className="p-6 bg-slate-950 rounded-2xl text-center text-slate-500 text-xs">
                  No bookings on record for this customer.
                </div>
              ) : (
                <div className="space-y-2">
                  {bookings
                    .filter(b => (b.userId === selectedUser.id || b.customerId === selectedUser.id))
                    .map(b => (
                      <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-bold text-amber-400">{b.id}</span>
                          <span className="text-slate-400 ml-2">Date: {b.travelDate}</span>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Seats: {(b.selectedSeats || b.seatNumbers || []).join(', ')} • Paid: ₹{b.totalAmount || b.fareBreakdown?.totalAmount || 0} ({b.paymentMethod})
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          (b.bookingStatus === 'CONFIRMED' || b.status === 'CONFIRMED') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {b.bookingStatus || b.status}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
