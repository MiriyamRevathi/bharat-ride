import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityLog } from '../../types';
import {
  ScrollText, Search, Shield, Filter,
  Clock, User, CheckCircle2, AlertTriangle
} from 'lucide-react';

export const AdminActivityLogs: React.FC = () => {
  const { activityLogs } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  const modules = ['ALL', 'BOOKING', 'BUS', 'ROUTE', 'SCHEDULE', 'SEAT', 'OFFER', 'SYSTEM'];

  const filteredLogs = activityLogs.filter(log => {
    const matchesModule = moduleFilter === 'ALL' || log.module === moduleFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      log.action.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      log.userName.toLowerCase().includes(q);

    return matchesModule && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">System Audit &amp; Activity Log</h1>
          <p className="text-xs text-slate-400">Chronological trail of administrative modifications, seat blocks, and bookings.</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {modules.map(m => (
            <button
              key={m}
              onClick={() => setModuleFilter(m)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                moduleFilter === m
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {m === 'ALL' ? 'All Modules' : m}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search activity, user, details..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Operator / User</th>
                <th className="p-4">Module</th>
                <th className="p-4">Action</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>{log.userName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-amber-400 border border-slate-700">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {log.action}
                  </td>
                  <td className="p-4 text-slate-300 max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
