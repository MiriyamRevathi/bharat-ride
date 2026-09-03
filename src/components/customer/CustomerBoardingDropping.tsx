import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft, ArrowRight, MapPin, Clock, CheckCircle2,
  Building, Navigation
} from 'lucide-react';

export const CustomerBoardingDropping: React.FC = () => {
  const {
    selectedBus,
    selectedSchedule,
    selectedSeatNumbers,
    boardingPoints,
    droppingPoints,
    setBoardingAndDropping,
    navigateTo,
    searchParams,
    showToast
  } = useApp();

  if (!selectedBus || !selectedSchedule || selectedSeatNumbers.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Incomplete Selection</h3>
        <p className="text-xs text-slate-500 mb-4">Please select your seats before choosing boarding and dropping points.</p>
        <button
          onClick={() => navigateTo('search')}
          className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Return to Bus Search
        </button>
      </div>
    );
  }

  // Find boarding & dropping options for this schedule or cities
  const availableBoarding = selectedSchedule.boardingPoints.map(bp => {
    const pt = boardingPoints.find(p => p.id === bp.pointId);
    return {
      id: bp.pointId,
      name: pt?.name || 'Bus Terminal',
      landmark: pt?.landmark || 'Main Road',
      address: pt?.address || searchParams.fromCity,
      time: bp.time
    };
  });

  const availableDropping = selectedSchedule.droppingPoints.map(dp => {
    const pt = droppingPoints.find(p => p.id === dp.pointId);
    return {
      id: dp.pointId,
      name: pt?.name || 'Central Drop Stand',
      landmark: pt?.landmark || 'Main Junction',
      address: pt?.address || searchParams.toCity,
      time: dp.time
    };
  });

  const [selectedBoarding, setSelectedBoarding] = useState(availableBoarding[0] || null);
  const [selectedDropping, setSelectedDropping] = useState(availableDropping[0] || null);

  const handleContinue = () => {
    if (!selectedBoarding || !selectedDropping) {
      showToast('Please select both a boarding point and a dropping point.', 'error');
      return;
    }
    setBoardingAndDropping(selectedBoarding, selectedDropping);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('seat_selection')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Seats</span>
          </button>
          <div className="text-right">
            <h2 className="text-base font-extrabold text-slate-900">{selectedBus.name}</h2>
            <p className="text-xs text-slate-500">Seats: {(selectedSeatNumbers || []).join(', ')}</p>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs mb-6 flex items-center justify-between text-xs font-semibold overflow-x-auto">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <span>Seats ({selectedSeatNumbers.length})</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-rose-600 font-bold">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">2</span>
            <span>Boarding &amp; Dropping</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">3</span>
            <span>Passenger Details</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">4</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Boarding Points Selection Column */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Select Boarding Point</h3>
                <p className="text-xs text-slate-500">Pickup in {searchParams.fromCity}</p>
              </div>
            </div>

            <div className="space-y-3">
              {availableBoarding.map(bp => {
                const isSelected = selectedBoarding?.id === bp.id;
                return (
                  <label
                    key={bp.id}
                    onClick={() => setSelectedBoarding(bp)}
                    className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="boarding_point"
                          checked={isSelected}
                          onChange={() => setSelectedBoarding(bp)}
                          className="mt-1 text-rose-600 focus:ring-rose-500 cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{bp.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Navigation className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{bp.landmark}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1">{bp.address}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-extrabold text-rose-600">{bp.time}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Pickup Time</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Dropping Points Selection Column */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Select Dropping Point</h3>
                <p className="text-xs text-slate-500">Drop in {searchParams.toCity}</p>
              </div>
            </div>

            <div className="space-y-3">
              {availableDropping.map(dp => {
                const isSelected = selectedDropping?.id === dp.id;
                return (
                  <label
                    key={dp.id}
                    onClick={() => setSelectedDropping(dp)}
                    className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="dropping_point"
                          checked={isSelected}
                          onChange={() => setSelectedDropping(dp)}
                          className="mt-1 text-orange-600 focus:ring-orange-500 cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{dp.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Navigation className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{dp.landmark}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1">{dp.address}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-extrabold text-orange-600">{dp.time}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Est. Arrival</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Summary & Continue Action */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 space-y-1 text-center sm:text-left">
            <div>
              <span className="font-semibold text-slate-800">Boarding at:</span>{' '}
              <span className="font-bold text-rose-600">{selectedBoarding?.name} ({selectedBoarding?.time})</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Dropping at:</span>{' '}
              <span className="font-bold text-orange-600">{selectedDropping?.name} ({selectedDropping?.time})</span>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full sm:w-auto px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Passenger Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
