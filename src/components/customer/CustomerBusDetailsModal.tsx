import React from 'react';
import { Bus, Schedule, BoardingPoint, DroppingPoint } from '../../types';
import {
  X, Star, ShieldCheck, Clock, MapPin, CheckCircle2,
  AlertCircle, Sparkles, ArrowRight
} from 'lucide-react';

interface CustomerBusDetailsModalProps {
  bus: Bus | null;
  schedule: Schedule | null;
  boardingPoints: BoardingPoint[];
  droppingPoints: DroppingPoint[];
  onClose: () => void;
  onSelectSeats: (bus: Bus, schedule: Schedule) => void;
}

export const CustomerBusDetailsModal: React.FC<CustomerBusDetailsModalProps> = ({
  bus,
  schedule,
  boardingPoints,
  droppingPoints,
  onClose,
  onSelectSeats
}) => {
  if (!bus || !schedule) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Bus Title & Operator Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
              {bus.busType}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono font-bold">
              {bus.busNumber}
            </span>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>{bus.rating}</span>
              <span className="text-[10px] text-emerald-600">({bus.totalRatings} ratings)</span>
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">{bus.name}</h2>
          <p className="text-xs text-slate-500 font-medium">Operated by <span className="text-slate-700 font-semibold">{bus.operator}</span></p>
        </div>

        {/* Journey Timeline */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-slate-900">{schedule.departureTime}</div>
              <div className="text-xs text-slate-500">Departure</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-4 h-4 text-slate-400 mb-1" />
              <div className="text-[10px] text-slate-400 font-medium border-t border-slate-300 px-3 pt-0.5">Express</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-900">{schedule.arrivalTime}</div>
              <div className="text-xs text-slate-500">
                Arrival {schedule.nextDayArrival && <span className="text-[10px] text-rose-600 font-semibold">(Next Day)</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Key Features & Amenities */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Bus Features &amp; Amenities</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {bus.amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Boarding & Dropping Points Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <h5 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Boarding Points</span>
            </h5>
            <div className="space-y-2">
              {schedule.boardingPoints.map((bp, i) => {
                const point = boardingPoints.find(p => p.id === bp.pointId);
                return (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{point?.name || bp.pointId}</span>
                      <span className="text-rose-600">{bp.time}</span>
                    </div>
                    <div className="text-[10px] text-slate-600">{point?.landmark}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <h5 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>Dropping Points</span>
            </h5>
            <div className="space-y-2">
              {schedule.droppingPoints.map((dp, i) => {
                const point = droppingPoints.find(p => p.id === dp.pointId);
                return (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{point?.name || dp.pointId}</span>
                      <span className="text-orange-600">{dp.time}</span>
                    </div>
                    <div className="text-[10px] text-slate-600">{point?.landmark}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/60 mb-6 text-xs text-amber-900">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Cancellation Policy</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">{bus.cancellationPolicy}</p>
        </div>

        {/* Bottom Bar with CTA */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-600">Base Fare</div>
            <div className="text-2xl font-black text-slate-900">₹{bus.baseFare}</div>
          </div>
          <button
            onClick={() => {
              onClose();
              onSelectSeats(bus, schedule);
            }}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Seat Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
