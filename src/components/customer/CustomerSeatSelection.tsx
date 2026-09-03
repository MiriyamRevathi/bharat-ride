import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Seat } from '../../types';
import {
  ArrowLeft, ArrowRight, User, Shield, Info,
  Check, AlertTriangle
} from 'lucide-react';

export const CustomerSeatSelection: React.FC = () => {
  const {
    currentUser,
    selectedBus,
    selectedSchedule,
    seats,
    selectedSeatNumbers,
    toggleSeatSelection,
    clearSeatSelection,
    calculateFare,
    navigateTo,
    searchParams,
    showToast,
    requireLoginThen,
    settings
  } = useApp();

  const [activeDeck, setActiveDeck] = useState<'LOWER' | 'UPPER'>('LOWER');

  if (!selectedBus || !selectedSchedule) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">No Bus Selected</h3>
        <p className="text-xs text-slate-500 mb-4">Please search and choose a bus first before selecting seats.</p>
        <button
          onClick={() => navigateTo('search')}
          className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Return to Search
        </button>
      </div>
    );
  }

  const busSeats = seats.filter(s => s.busId === selectedBus.id);
  const isSleeper = selectedBus.layoutType === 'sleeper_2_1';
  const hasUpper = selectedBus.hasUpperDeck || isSleeper;

  const deckSeats = busSeats.filter(s => (hasUpper ? s.deck === activeDeck : true));
  const fare = calculateFare();

  const handleContinue = () => {
    if (selectedSeatNumbers.length === 0) {
      showToast('Please select at least one seat to continue.', 'error');
      return;
    }
    if (!currentUser) {
      requireLoginThen('boarding_dropping');
      return;
    }
    navigateTo('boarding_dropping');
  };

  const getSeatColor = (seat: Seat) => {
    const isSelected = selectedSeatNumbers.includes(seat.seatNumber);
    if (isSelected) {
      return 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-105 ring-2 ring-emerald-400';
    }
    if (seat.state === 'OCCUPIED') {
      if (seat.bookedByGender === 'FEMALE') {
        return 'bg-pink-100 text-pink-700 border-pink-300 cursor-not-allowed opacity-75';
      }
      return 'bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed opacity-70';
    }
    if (seat.state === 'BLOCKED') {
      return 'bg-slate-300 text-slate-600 border-slate-400 cursor-not-allowed opacity-60';
    }
    if (seat.isLadiesSeat) {
      return 'bg-pink-50 text-pink-700 border-pink-300 hover:border-pink-500 hover:bg-pink-100';
    }
    return 'bg-white text-slate-800 border-slate-300 hover:border-rose-500 hover:bg-rose-50/50';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('search')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Results</span>
          </button>
          <div className="text-right">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">{selectedBus.name}</h2>
            <p className="text-xs text-slate-500">{searchParams.fromCity} → {searchParams.toCity} • {searchParams.travelDate}</p>
          </div>
        </div>

        {/* Steps Progress Bar */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs mb-6 flex items-center justify-between text-xs font-semibold overflow-x-auto">
          <div className="flex items-center gap-2 text-rose-600">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">1</span>
            <span>Seat Selection</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">2</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Seat Deck Map */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            {/* Upper / Lower Deck Switcher for Sleepers */}
            {hasUpper && (
              <div className="flex justify-center mb-6">
                <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
                  <button
                    onClick={() => setActiveDeck('LOWER')}
                    className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeDeck === 'LOWER'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lower Deck (L)
                  </button>
                  <button
                    onClick={() => setActiveDeck('UPPER')}
                    className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeDeck === 'UPPER'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Upper Deck (U)
                  </button>
                </div>
              </div>
            )}

            {/* Bus Coach Shell */}
            <div className="max-w-md mx-auto border-2 border-slate-300 rounded-3xl p-5 bg-slate-50/50 shadow-inner relative">
              {/* Driver Cockpit Front */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-dashed border-slate-300">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase">
                  <span>Front Entrance</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  <span>Driver Cabin</span>
                </div>
              </div>

              {/* Seat Layout Matrix */}
              {isSleeper ? (
                // 2+1 Sleeper Layout
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(rowNum => {
                    const singleSeat = deckSeats.find(s => s.row === rowNum && s.column === 1);
                    const doubleSeat1 = deckSeats.find(s => s.row === rowNum && s.column === 2);
                    const doubleSeat2 = deckSeats.find(s => s.row === rowNum && s.column === 3);

                    return (
                      <div key={rowNum} className="flex items-center justify-between gap-4">
                        {/* Single Berth (Left) */}
                        <div className="w-24">
                          {singleSeat && (
                            <button
                              type="button"
                              onClick={() => toggleSeatSelection(singleSeat.seatNumber)}
                              disabled={singleSeat.state === 'OCCUPIED' || singleSeat.state === 'BLOCKED'}
                              className={`w-full h-14 rounded-xl border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${getSeatColor(
                                singleSeat
                              )}`}
                              title={`Seat No: ${singleSeat.seatNumber}`}
                            >
                              <span className="text-xs font-black tracking-tight select-none">₹{singleSeat.price}</span>
                            </button>
                          )}
                        </div>

                        {/* Walking Gangway */}
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center px-1">
                          |
                        </div>

                        {/* Double Berths (Right) */}
                        <div className="flex items-center gap-2">
                          {doubleSeat1 && (
                            <button
                              type="button"
                              onClick={() => toggleSeatSelection(doubleSeat1.seatNumber)}
                              disabled={doubleSeat1.state === 'OCCUPIED' || doubleSeat1.state === 'BLOCKED'}
                              className={`w-20 h-14 rounded-xl border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${getSeatColor(
                                doubleSeat1
                              )}`}
                              title={`Seat No: ${doubleSeat1.seatNumber}`}
                            >
                              <span className="text-xs font-black tracking-tight select-none">₹{doubleSeat1.price}</span>
                            </button>
                          )}
                          {doubleSeat2 && (
                            <button
                              type="button"
                              onClick={() => toggleSeatSelection(doubleSeat2.seatNumber)}
                              disabled={doubleSeat2.state === 'OCCUPIED' || doubleSeat2.state === 'BLOCKED'}
                              className={`w-20 h-14 rounded-xl border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${getSeatColor(
                                doubleSeat2
                              )}`}
                              title={`Seat No: ${doubleSeat2.seatNumber}`}
                            >
                              <span className="text-xs font-black tracking-tight select-none">₹{doubleSeat2.price}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // 2+2 Seater Layout
                <div className="space-y-2.5">
                  {Array.from({ length: selectedBus.totalSeats / 4 }).map((_, rIdx) => {
                    const rowNum = rIdx + 1;
                    const seatA = deckSeats.find(s => s.row === rowNum && s.column === 1);
                    const seatB = deckSeats.find(s => s.row === rowNum && s.column === 2);
                    const seatC = deckSeats.find(s => s.row === rowNum && s.column === 3);
                    const seatD = deckSeats.find(s => s.row === rowNum && s.column === 4);

                    return (
                      <div key={rowNum} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {seatA && (
                            <button
                              type="button"
                              onClick={() => toggleSeatSelection(seatA.seatNumber)}
                              disabled={seatA.state === 'OCCUPIED' || seatA.state === 'BLOCKED'}
                              className={`w-12 h-11 rounded-lg border-2 flex items-center justify-center text-[11px] font-bold transition-all cursor-pointer ${getSeatColor(
                                seatA
                              )}`}
                              title={`Seat No: ${seatA.seatNumber}`}
                            >
                              <span className="text-[11px] font-extrabold tracking-tight select-none">₹{seatA.price}</span>
                            </button>
                          )}
                          {seatB && (
                            <button
                              type="button"
                              onClick={() => toggleSeatSelection(seatB.seatNumber)}
                              disabled={seatB.state === 'OCCUPIED' || seatB.state === 'BLOCKED'}
                              className={`w-12 h-11 rounded-lg border-2 flex items-center justify-center text-[11px] font-bold transition-all cursor-pointer ${getSeatColor(
                                seatB
                              )}`}
                              title={`Seat No: ${seatB.seatNumber}`}
                            >
                              <span className="text-[11px] font-extrabold tracking-tight select-none">₹{seatB.price}</span>
                            </button>
                          )}
                        </div>

                        {/* Walking Gangway */}
                        <div className="text-[9px] text-slate-300 font-mono">||</div>

                        <div className="flex items-center gap-1.5">
                          {seatC && (
                            <button
                              type="button"
                              onClick={() => toggleSeatSelection(seatC.seatNumber)}
                              disabled={seatC.state === 'OCCUPIED' || seatC.state === 'BLOCKED'}
                              className={`w-12 h-11 rounded-lg border-2 flex items-center justify-center text-[11px] font-bold transition-all cursor-pointer ${getSeatColor(
                                seatC
                              )}`}
                              title={`Seat No: ${seatC.seatNumber}`}
                            >
                              <span className="text-[11px] font-extrabold tracking-tight select-none">₹{seatC.price}</span>
                            </button>
                          )}
                          {seatD && (
                            <button
                              type="button"
                              onClick={() => toggleSeatSelection(seatD.seatNumber)}
                              disabled={seatD.state === 'OCCUPIED' || seatD.state === 'BLOCKED'}
                              className={`w-12 h-11 rounded-lg border-2 flex items-center justify-center text-[11px] font-bold transition-all cursor-pointer ${getSeatColor(
                                seatD
                              )}`}
                              title={`Seat No: ${seatD.seatNumber}`}
                            >
                              <span className="text-[11px] font-extrabold tracking-tight select-none">₹{seatD.price}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Seat States Legend */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-slate-300 bg-white"></div>
                <span className="text-slate-600 font-medium">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-emerald-600 bg-emerald-600"></div>
                <span className="text-slate-900 font-bold">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-slate-300 bg-slate-200"></div>
                <span className="text-slate-600 font-medium">Occupied</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-pink-300 bg-pink-50"></div>
                <span className="text-pink-700 font-medium">Ladies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-slate-400 bg-slate-300"></div>
                <span className="text-slate-600 font-medium">Blocked</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fare & Selection Summary */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
              Booking Fare Summary
            </h3>

            {/* Selected Seats Tags */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-500 font-semibold">Selected Seats</span>
                {selectedSeatNumbers.length > 0 && (
                  <button
                    onClick={clearSeatSelection}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {selectedSeatNumbers.length === 0 ? (
                <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-600 font-medium">
                  Click on available seats on the coach layout to select.
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeatNumbers.map(seatNum => (
                    <span
                      key={seatNum}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold"
                    >
                      Seat {seatNum}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare ({selectedSeatNumbers.length} seat(s)):</span>
                <span className="font-semibold text-slate-900">₹{fare.seatFaresTotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST / Taxes ({settings?.taxPercentage ?? 5}%):</span>
                <span className="font-semibold text-slate-900">₹{fare.taxes}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Operator Service Fee:</span>
                <span className="font-semibold text-slate-900">₹{fare.serviceFee}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-900">Total Amount:</span>
                <span className="text-xl font-black text-rose-600">₹{fare.totalAmount}</span>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={selectedSeatNumbers.length === 0}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                selectedSeatNumbers.length > 0
                  ? 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Boarding Points</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 flex items-start gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Free cancellation eligible on this booking until 12 hours before departure.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
