import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Route } from '../../types';
import {
  Route as RouteIcon, Plus, Edit2, Trash2,
  MapPin, Clock, ArrowRight, X
} from 'lucide-react';

export const AdminRouteManagement: React.FC = () => {
  const { routes, addRoute, updateRoute, deleteRoute, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [deletingRouteId, setDeletingRouteId] = useState<string | null>(null);

  // Form State
  const [sourceCity, setSourceCity] = useState('Guntur');
  const [destinationCity, setDestinationCity] = useState('Hyderabad');
  const [distanceKm, setDistanceKm] = useState(275);
  const [estimatedDuration, setEstimatedDuration] = useState('5h 30m');
  const [popular, setPopular] = useState(true);

  const handleOpenAdd = () => {
    setEditingRoute(null);
    setSourceCity('Guntur');
    setDestinationCity('Hyderabad');
    setDistanceKm(275);
    setEstimatedDuration('5h 30m');
    setPopular(true);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (route: Route) => {
    setEditingRoute(route);
    setSourceCity(route.sourceCity);
    setDestinationCity(route.destinationCity);
    setDistanceKm(route.distanceKm);
    setEstimatedDuration(route.estimatedDuration);
    setPopular(route.popular);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceCity.trim() || !destinationCity.trim()) {
      showToast('Please specify source and destination cities.', 'error');
      return;
    }

    if (editingRoute) {
      updateRoute(editingRoute.id, {
        sourceCity,
        destinationCity,
        distanceKm: Number(distanceKm),
        estimatedDuration,
        popular
      });
    } else {
      addRoute({
        sourceCity,
        destinationCity,
        distanceKm: Number(distanceKm),
        estimatedDuration,
        popular,
        status: 'ACTIVE'
      });
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = () => {
    if (deletingRouteId) {
      deleteRoute(deletingRouteId);
      setDeletingRouteId(null);
    }
  };

  const toggleStatus = (route: Route) => {
    const next = route.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    updateRoute(route.id, { status: next });
  };

  const filteredRoutes = routes.filter(r =>
    r.sourceCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.destinationCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Route Network Management</h1>
          <p className="text-xs text-slate-500">Configure origin-destination corridors, highway mileage and travel windows.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Route</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <input
          type="text"
          placeholder="Search city pairs, route code..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-rose-500"
        />
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          {filteredRoutes.length} Corridors
        </span>
      </div>

      {/* Routes Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Route Code</th>
                <th className="p-4">City Corridor (Origin → Destination)</th>
                <th className="p-4">Highway Mileage</th>
                <th className="p-4">Estimated Travel Time</th>
                <th className="p-4">Featured Popular</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRoutes.map(route => (
                <tr key={route.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-rose-600">{route.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <span>{route.sourceCity}</span>
                      <ArrowRight className="w-4 h-4 text-rose-500" />
                      <span>{route.destinationCity}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-900">{route.distanceKm} km</td>
                  <td className="p-4 font-semibold text-slate-600">{route.estimatedDuration}</td>
                  <td className="p-4">
                    {route.popular ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Popular Corridor
                      </span>
                    ) : (
                      <span className="text-slate-400">Regular</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(route)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        route.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {route.status}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(route)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                        title="Edit Route"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingRouteId(route.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 cursor-pointer transition-colors"
                        title="Delete Route"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                {editingRoute ? 'Edit Route Corridor' : 'Add New Route Corridor'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Source / Origin City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Guntur"
                    value={sourceCity}
                    onChange={e => setSourceCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Destination City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad"
                    value={destinationCity}
                    onChange={e => setDestinationCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Highway Distance (KM)</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={distanceKm}
                    onChange={e => setDistanceKm(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Travel Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5h 30m"
                    value={estimatedDuration}
                    onChange={e => setEstimatedDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="popularCheckbox"
                  checked={popular}
                  onChange={e => setPopular(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 bg-slate-50 border-slate-300 focus:ring-rose-500"
                />
                <label htmlFor="popularCheckbox" className="text-slate-700 font-semibold cursor-pointer">
                  Feature in Popular Expressway Routes on Customer Homepage
                </label>
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
                  {editingRoute ? 'Save Changes' : 'Create Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingRouteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-2">Delete Route Corridor</h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to remove this route corridor? All active schedules assigned to this route will also be removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingRouteId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Delete Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
