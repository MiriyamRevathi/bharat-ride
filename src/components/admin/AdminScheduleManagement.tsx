import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Schedule } from '../../types';
import {
  Calendar, Plus, Edit2, Trash2, Clock,
  Bus as BusIcon, Route as RouteIcon, ArrowRight, X
} from 'lucide-react';

export const AdminScheduleManagement: React.FC = () => {
  const { schedules, buses, routes, addSchedule, updateSchedule, deleteSchedule, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [deletingScheduleId, setDeletingScheduleId] = useState<string | null>(null);

  // Form State
  const [busId, setBusId] = useState(buses[0]?.id || '');
  const [routeId, setRouteId] = useState(routes[0]?.id || '');
  const [departureTime, setDepartureTime] = useState('22:30');
  const [arrivalTime, setArrivalTime] = useState('04:00');
  const [fareMultiplier, setFareMultiplier] = useState(1.0);
  const [frequency, setFrequency] = useState('Daily Departure');

  const handleOpenAdd = () => {
    setEditingSchedule(null);
    setBusId(buses[0]?.id || '');
    setRouteId(routes[0]?.id || '');
    setDepartureTime('22:30');
    setArrivalTime('04:00');
    setFareMultiplier(1.0);
    setFrequency('Daily Departure');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setBusId(schedule.busId);
    setRouteId(schedule.routeId);
    setDepartureTime(schedule.departureTime);
    setArrivalTime(schedule.arrivalTime);
    setFareMultiplier(schedule.fareMultiplier);
    setFrequency(schedule.frequency);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!busId || !routeId) {
      showToast('Please select both a bus and a route corridor.', 'error');
      return;
    }

    if (editingSchedule) {
      updateSchedule(editingSchedule.id, {
        busId,
        routeId,
        departureTime,
        arrivalTime,
        fareMultiplier: Number(fareMultiplier),
        frequency
      });
    } else {
      addSchedule({
        busId,
        routeId,
        departureTime,
        arrivalTime,
        nextDayArrival: true,
        travelDate: new Date().toISOString().split('T')[0],
        boardingPoints: [],
        droppingPoints: [],
        fareMultiplier: Number(fareMultiplier),
        frequency,
        status: 'SCHEDULED'
      });
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = () => {
    if (deletingScheduleId) {
      deleteSchedule(deletingScheduleId);
      setDeletingScheduleId(null);
    }
  };

  const toggleStatus = (sch: Schedule) => {
    const next = sch.status === 'SCHEDULED' ? 'CANCELLED' : 'SCHEDULED';
    updateSchedule(sch.id, { status: next });
  };

  const filteredSchedules = schedules.filter(s => {
    const bus = buses.find(b => b.id === s.busId);
    const route = routes.find(r => r.id === s.routeId);
    const q = searchQuery.toLowerCase();
    return (
      s.id.toLowerCase().includes(q) ||
      bus?.name.toLowerCase().includes(q) ||
      bus?.operator.toLowerCase().includes(q) ||
      route?.sourceCity.toLowerCase().includes(q) ||
      route?.destinationCity.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Daily Schedules &amp; Departures Master</h1>
          <p className="text-xs text-slate-500">Map buses to corridors, set departure windows and demand fare multipliers.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Schedule</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <input
          type="text"
          placeholder="Search bus, route, schedule ID..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-rose-500"
        />
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          {filteredSchedules.length} Active Timetables
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Schedule ID</th>
                <th className="p-4">Route Corridor</th>
                <th className="p-4">Assigned Bus &amp; Operator</th>
                <th className="p-4">Departure → Arrival</th>
                <th className="p-4">Frequency</th>
                <th className="p-4">Multiplier</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSchedules.map(sch => {
                const bus = buses.find(b => b.id === sch.busId);
                const route = routes.find(r => r.id === sch.routeId);

                return (
                  <tr key={sch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-rose-600">{sch.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{route?.sourceCity}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                        <span>{route?.destinationCity}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{route?.distanceKm} km • {route?.estimatedDuration}</span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{bus?.name || 'Assigned Bus'}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{bus?.busNumber} • {bus?.operator}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-rose-600">
                        {sch.departureTime} → {sch.arrivalTime}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {sch.frequency}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {sch.fareMultiplier}x
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(sch)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          sch.status === 'SCHEDULED' || sch.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {sch.status}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(sch)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                          title="Edit Schedule"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingScheduleId(sch.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 cursor-pointer transition-colors"
                          title="Delete Schedule"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingSchedule ? 'Edit Departure Schedule' : 'Create Departure Schedule'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase mb-1">Select Route Corridor</label>
                <select
                  value={routeId}
                  onChange={e => setRouteId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold cursor-pointer focus:border-rose-500 focus:outline-hidden"
                >
                  {routes.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.sourceCity} → {r.destinationCity} ({r.distanceKm} km, {r.estimatedDuration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase mb-1">Assign Fleet Bus</label>
                <select
                  value={busId}
                  onChange={e => setBusId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold cursor-pointer focus:border-rose-500 focus:outline-hidden"
                >
                  {buses.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.busNumber}) - {b.busType} [₹{b.baseFare}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Departure Time (24h)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 22:30"
                    value={departureTime}
                    onChange={e => setDepartureTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Arrival Time (24h)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 04:00"
                    value={arrivalTime}
                    onChange={e => setArrivalTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Frequency</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daily Departure"
                    value={frequency}
                    onChange={e => setFrequency(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Fare Multiplier</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.5"
                    max="3.0"
                    value={fareMultiplier}
                    onChange={e => setFareMultiplier(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  {editingSchedule ? 'Save Changes' : 'Create Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingScheduleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-2">Delete Departure Schedule</h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to remove this departure timetable?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingScheduleId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Delete Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
