import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BoardingPoint, DroppingPoint } from '../../types';

type BoardingOrDropping = BoardingPoint | DroppingPoint;
import {
  MapPin, Plus, Edit2, Trash2, Clock,
  Building, Navigation, X
} from 'lucide-react';

export const AdminBoardingDropping: React.FC = () => {
  const {
    boardingPoints,
    droppingPoints,
    addBoardingPoint,
    updateBoardingPoint,
    deleteBoardingPoint,
    addDroppingPoint,
    updateDroppingPoint,
    deleteDroppingPoint,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'BOARDING' | 'DROPPING'>('BOARDING');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<BoardingOrDropping | null>(null);

  // Form
  const [name, setName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Guntur');

  const currentList = activeTab === 'BOARDING' ? boardingPoints : droppingPoints;

  const cities = Array.from(new Set(currentList.map(p => p.city)));

  const handleOpenAdd = () => {
    setEditingPoint(null);
    setName('');
    setLandmark('');
    setAddress('');
    setCity('Guntur');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (pt: BoardingOrDropping) => {
    setEditingPoint(pt);
    setName(pt.name);
    setLandmark(pt.landmark);
    setAddress(pt.address);
    setCity(pt.city);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim()) {
      showToast('Please fill all required point details.', 'error');
      return;
    }

    if (activeTab === 'BOARDING') {
      if (editingPoint) {
        updateBoardingPoint(editingPoint.id, { name, landmark, address, city });
      } else {
        addBoardingPoint({ name, landmark, address, city, status: 'ACTIVE' });
      }
    } else {
      if (editingPoint) {
        updateDroppingPoint(editingPoint.id, { name, landmark, address, city });
      } else {
        addDroppingPoint({ name, landmark, address, city, status: 'ACTIVE' });
      }
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (activeTab === 'BOARDING') {
      deleteBoardingPoint(id);
    } else {
      deleteDroppingPoint(id);
    }
  };

  const filteredPoints = currentList.filter(pt => {
    const matchesCity = selectedCity === 'ALL' || pt.city.toLowerCase() === selectedCity.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesQuery = pt.name.toLowerCase().includes(q) || pt.landmark.toLowerCase().includes(q) || pt.city.toLowerCase().includes(q);
    return matchesCity && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Boarding &amp; Dropping Points</h1>
          <p className="text-xs text-slate-400">Configure pickup hubs, drop terminals and reporting times per city.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New {activeTab === 'BOARDING' ? 'Boarding Point' : 'Dropping Point'}</span>
        </button>
      </div>

      {/* Tabs & City Filter Strip */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Type Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('BOARDING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'BOARDING'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Boarding Points ({boardingPoints.length})
          </button>
          <button
            onClick={() => setActiveTab('DROPPING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'DROPPING'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Dropping Points ({droppingPoints.length})
          </button>
        </div>

        {/* City Filter & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white cursor-pointer"
          >
            <option value="ALL">All Cities</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search point name, landmark..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-500 w-48 sm:w-60"
          />
        </div>
      </div>

      {/* Grid of Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPoints.map(pt => (
          <div
            key={pt.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 font-bold text-[10px] uppercase">
                  {pt.city}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <span>{pt.status}</span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">{pt.name}</h3>
              <p className="text-xs text-slate-400 mb-2 font-medium">{pt.landmark}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">{pt.address}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(pt)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Edit Point"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(pt.id)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-400 cursor-pointer"
                title="Delete Point"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingPoint ? `Edit ${activeTab === 'BOARDING' ? 'Boarding' : 'Dropping'} Point` : `Add New ${activeTab === 'BOARDING' ? 'Boarding' : 'Dropping'} Point`}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Guntur"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Point / Hub Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RTC Central Bus Stand, Counter #12"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Prominent Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Collectorate Circle / Railway Station Road"
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Full Pickup Address</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Full physical street address for GPS..."
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {editingPoint ? 'Save Changes' : 'Save Point'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
