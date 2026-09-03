import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Seat, SeatState, SeatStatus } from '../../types';
import {
  Grid, Bus as BusIcon, Shield, CheckCircle2,
  Lock, UserCheck, Heart, Info, RefreshCw
} from 'lucide-react';

export const AdminSeatManagement: React.FC = () => {
  const { buses, seats, updateSeatState, showToast } = useApp();

  const [selectedBusId, setSelectedBusId] = useState<string>(buses[0]?.id || 'bus-1');
  const [selectedDeck, setSelectedDeck] = useState<'LOWER' | 'UPPER'>('LOWER');

  const selectedBus = buses.find(b => b.id === selectedBusId) || buses[0];
  const busSeats = seats.filter(s => s.busId === selectedBusId);

  const lowerSeats = busSeats.filter(s => s.deck === 'LOWER');
  const upperSeats = busSeats.filter(s => s.deck === 'UPPER');
  const currentDeckSeats = selectedDeck === 'LOWER' ? lowerSeats : upperSeats;

  // Compute stats
  const totalCount = busSeats.length;
  const availableCount = busSeats.filter(s => (s.state || s.status) === 'AVAILABLE').length;
  const occupiedCount = busSeats.filter(s => (s.state || s.status) === 'OCCUPIED').length;
  const blockedCount = busSeats.filter(s => (s.state || s.status) === 'BLOCKED').length;

  const handleSeatClick = (seat: Seat) => {
    const currentState = seat.state || seat.status || 'AVAILABLE';
    let nextStatus: SeatState = 'AVAILABLE';
    if (currentState === 'AVAILABLE') nextStatus = 'BLOCKED';
    else if (currentState === 'BLOCKED') nextStatus = 'OCCUPIED';
    else if (currentState === 'OCCUPIED') nextStatus = 'AVAILABLE';

    updateSeatState(selectedBusId, seat.seatNumber, nextStatus);
  };

  const handleToggleLadies = (e: React.MouseEvent, seat: Seat) => {
    e.stopPropagation();
    showToast(`Seat ${seat.seatNumber} ladies quota updated.`, 'info');
  };

  // Group seats by row
  const rowNumbers: number[] = currentDeckSeats.map(s => s.row);
  const rows = Array.from(new Set<number>(rowNumbers)).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Interactive Coach Seat Grid</h1>
          <p className="text-xs text-slate-400">Manage live berth availability, manual blockouts, and quota restrictions.</p>
        </div>

        {/* Bus Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-400 uppercase hidden sm:inline">Active Bus:</label>
          <select
            value={selectedBusId}
            onChange={e => setSelectedBusId(e.target.value)}
            className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold cursor-pointer"
          >
            {buses.map(b => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.busNumber}) - {b.busType}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <div className="text-xl font-black text-white">{totalCount}</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Total Berths</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <div className="text-xl font-black text-emerald-400">{availableCount}</div>
          <div className="text-[11px] font-bold text-emerald-500 uppercase mt-0.5">Available for Sale</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <div className="text-xl font-black text-rose-400">{occupiedCount}</div>
          <div className="text-[11px] font-bold text-rose-500 uppercase mt-0.5">Reserved / Booked</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <div className="text-xl font-black text-amber-400">{blockedCount}</div>
          <div className="text-[11px] font-bold text-amber-500 uppercase mt-0.5">Admin Blocked</div>
        </div>
      </div>

      {/* Main Seat Matrix View */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        {/* Deck Switcher & Legend */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          {/* Deck Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDeck('LOWER')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDeck === 'LOWER'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Lower Deck ({lowerSeats.length} Berths)
            </button>
            {selectedBus?.hasUpperDeck && (
              <button
                onClick={() => setSelectedDeck('UPPER')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDeck === 'UPPER'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Upper Deck ({upperSeats.length} Berths)
              </button>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 flex-wrap text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-slate-800 border-2 border-emerald-500"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-rose-900/60 border-2 border-rose-500"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-amber-900/60 border-2 border-amber-500"></div>
              <span>Blocked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>Ladies Quota</span>
            </div>
          </div>
        </div>

        {/* Coach Matrix Container */}
        <div className="max-w-2xl mx-auto bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800">
          {/* Driver Cabin Visual */}
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-800 text-slate-400 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-white">
                💺
              </div>
              <span className="font-bold text-slate-300">DRIVER CABIN</span>
            </div>
            <span className="text-[11px] text-amber-400 font-bold uppercase">{selectedDeck} DECK MATRIX</span>
          </div>

          {/* Matrix Rows */}
          <div className="space-y-4">
            {rows.map(rowNum => {
              const rowSeats = currentDeckSeats.filter(s => s.row === rowNum);
              // Single column (left) vs Double columns (right) for 2+1 layout
              const leftSeat = rowSeats.find(s => s.column === 1);
              const rightSeats = rowSeats.filter(s => s.column > 1);

              return (
                <div key={rowNum} className="flex items-center justify-between gap-6">
                  {/* Left Single Berth */}
                  <div className="w-24">
                    {leftSeat && (
                      <div
                        onClick={() => handleSeatClick(leftSeat)}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                          leftSeat.status === 'AVAILABLE'
                            ? 'bg-slate-900 border-emerald-500/80 hover:bg-emerald-950/40 text-white'
                            : leftSeat.status === 'OCCUPIED'
                            ? 'bg-rose-950/50 border-rose-500/80 text-rose-300'
                            : 'bg-amber-950/50 border-amber-500/80 text-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs">{leftSeat.seatNumber}</span>
                          <button
                            onClick={e => handleToggleLadies(e, leftSeat)}
                            className="p-0.5 rounded hover:bg-slate-800"
                            title="Toggle Ladies Quota"
                          >
                            <Heart className={`w-3 h-3 ${leftSeat.isLadies ? 'text-pink-400 fill-pink-400' : 'text-slate-600'}`} />
                          </button>
                        </div>
                        <div className="flex justify-between items-baseline mt-2 text-[10px]">
                          <span className="font-bold">₹{leftSeat.price}</span>
                          <span className="uppercase text-[9px] font-extrabold opacity-80">{(leftSeat.status || 'AVL').slice(0, 3)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gangway Aisle */}
                  <div className="flex-1 text-center border-b border-dashed border-slate-800">
                    <span className="text-[10px] text-slate-600 font-mono tracking-widest">AISLE</span>
                  </div>

                  {/* Right Double Berths */}
                  <div className="flex items-center gap-3">
                    {rightSeats.map(seat => (
                      <div
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        className={`w-24 p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                          seat.status === 'AVAILABLE'
                            ? 'bg-slate-900 border-emerald-500/80 hover:bg-emerald-950/40 text-white'
                            : seat.status === 'OCCUPIED'
                            ? 'bg-rose-950/50 border-rose-500/80 text-rose-300'
                            : 'bg-amber-950/50 border-amber-500/80 text-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs">{seat.seatNumber}</span>
                          <button
                            onClick={e => handleToggleLadies(e, seat)}
                            className="p-0.5 rounded hover:bg-slate-800"
                            title="Toggle Ladies Quota"
                          >
                            <Heart className={`w-3 h-3 ${seat.isLadies ? 'text-pink-400 fill-pink-400' : 'text-slate-600'}`} />
                          </button>
                        </div>
                        <div className="flex justify-between items-baseline mt-2 text-[10px]">
                          <span className="font-bold">₹{seat.price}</span>
                          <span className="uppercase text-[9px] font-extrabold opacity-80">{(seat.status || 'AVL').slice(0, 3)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            💡 <span className="text-slate-300 font-bold">Admin Tip:</span> Click any berth to cycle status (<span className="text-emerald-400">Available</span> → <span className="text-amber-400">Blocked</span> → <span className="text-rose-400">Occupied</span>). Click heart to toggle Ladies Quota.
          </div>
        </div>
      </div>
    </div>
  );
};
