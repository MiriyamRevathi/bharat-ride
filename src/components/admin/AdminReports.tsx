import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3, Download, Calendar, Filter,
  FileSpreadsheet, IndianRupee, Bus, Ticket, Users
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { bookings, buses, routes, payments, showToast } = useApp();

  const [reportType, setReportType] = useState<'BOOKINGS' | 'REVENUE' | 'FLEET'>('BOOKINGS');
  const [dateRange, setDateRange] = useState('ALL');

  // CSV Export Generation
  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = '';

    if (reportType === 'BOOKINGS') {
      filename = `BharatRide_Bookings_Report_${new Date().toISOString().slice(0, 10)}.csv`;
      headers = ['Booking_ID', 'Travel_Date', 'Bus_ID', 'Seats', 'Amount_INR', 'Payment_Mode', 'Status', 'Passenger_Name', 'Contact_Phone'];
      rows = bookings.map(b => [
        b.id,
        b.travelDate,
        b.busId,
        `"${(b.selectedSeats || b.seatNumbers || []).join(';')}"`,
        (b.totalAmount || b.fareBreakdown?.totalAmount || 0).toString(),
        b.paymentMethod,
        b.bookingStatus || b.status || 'CONFIRMED',
        `"${b.passengers[0]?.name || b.customerName || ''}"`,
        b.contactPhone || b.customerPhone || ''
      ]);
    } else if (reportType === 'REVENUE') {
      filename = `BharatRide_Revenue_Report_${new Date().toISOString().slice(0, 10)}.csv`;
      headers = ['Payment_ID', 'Booking_ID', 'Amount_INR', 'Channel', 'Transaction_Ref', 'Status', 'Date'];
      rows = payments.map(p => [
        p.id,
        p.bookingId,
        p.amount.toString(),
        p.method || p.paymentMethod || '',
        p.transactionRef,
        p.status || p.paymentStatus || '',
        p.createdAt || p.date || ''
      ]);
    } else {
      filename = `BharatRide_Fleet_Report_${new Date().toISOString().slice(0, 10)}.csv`;
      headers = ['Bus_ID', 'Name', 'Reg_Number', 'Operator', 'Type', 'Total_Seats', 'Base_Fare_INR', 'Status'];
      rows = buses.map(b => [
        b.id,
        `"${b.name}"`,
        b.busNumber,
        `"${b.operator}"`,
        `"${b.busType}"`,
        b.totalSeats.toString(),
        b.baseFare.toString(),
        b.status
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filename} successfully.`, 'success');
  };

  const totalRevenue = payments.filter(p => p.status === 'SUCCESS').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Business Intelligence &amp; Data Exports</h1>
          <p className="text-xs text-slate-400">Generate compliance audit logs, operational metrics and export CSV spreadsheets.</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export {reportType} (CSV)</span>
        </button>
      </div>

      {/* Report Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setReportType('BOOKINGS')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            reportType === 'BOOKINGS'
              ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Ticket className={`w-5 h-5 ${reportType === 'BOOKINGS' ? 'text-amber-400' : 'text-slate-500'}`} />
            <span className="text-xs font-mono font-bold text-slate-400">{bookings.length} Records</span>
          </div>
          <h3 className="text-sm font-bold text-white">Passenger Bookings Master</h3>
          <p className="text-[11px] text-slate-400 mt-1">Full reservation list, berth assignments, passenger contact details.</p>
        </div>

        <div
          onClick={() => setReportType('REVENUE')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            reportType === 'REVENUE'
              ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <IndianRupee className={`w-5 h-5 ${reportType === 'REVENUE' ? 'text-amber-400' : 'text-slate-500'}`} />
            <span className="text-xs font-mono font-bold text-slate-400">₹{totalRevenue.toLocaleString()}</span>
          </div>
          <h3 className="text-sm font-bold text-white">Revenue &amp; Settlement Report</h3>
          <p className="text-[11px] text-slate-400 mt-1">Payment gateway transactions, channel splits, and refund records.</p>
        </div>

        <div
          onClick={() => setReportType('FLEET')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            reportType === 'FLEET'
              ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Bus className={`w-5 h-5 ${reportType === 'FLEET' ? 'text-amber-400' : 'text-slate-500'}`} />
            <span className="text-xs font-mono font-bold text-slate-400">{buses.length} Coaches</span>
          </div>
          <h3 className="text-sm font-bold text-white">Fleet Utilization &amp; Health</h3>
          <p className="text-[11px] text-slate-400 mt-1">Coach registration, maintenance states, seating capacity inventory.</p>
        </div>
      </div>

      {/* Live Preview of Report Data */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {reportType} Data Preview (Showing top rows)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Click Export button above to download .csv</span>
        </div>

        <div className="overflow-x-auto text-xs">
          {reportType === 'BOOKINGS' && (
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">PNR</th>
                  <th className="p-3">Travel Date</th>
                  <th className="p-3">Seats</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {(bookings || []).slice(0, 8).map(b => (
                  <tr key={b.id}>
                    <td className="p-3 font-mono font-bold text-amber-400">{b.id}</td>
                    <td className="p-3">{b.travelDate}</td>
                    <td className="p-3 font-mono">{(b.selectedSeats || b.seatNumbers || []).join(', ')}</td>
                    <td className="p-3 font-bold text-white">₹{b.totalAmount || b.fareBreakdown?.totalAmount || 0}</td>
                    <td className="p-3">{b.paymentMethod}</td>
                    <td className="p-3">{b.bookingStatus || b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'REVENUE' && (
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Txn ID</th>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Channel</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {(payments || []).slice(0, 8).map(p => (
                  <tr key={p.id}>
                    <td className="p-3 font-mono font-bold text-amber-400">{p.id}</td>
                    <td className="p-3 font-mono">{p.bookingId}</td>
                    <td className="p-3">{p.method || p.paymentMethod}</td>
                    <td className="p-3 font-bold text-white">₹{p.amount}</td>
                    <td className="p-3 text-emerald-400 font-bold">{p.status || p.paymentStatus}</td>
                    <td className="p-3 text-slate-400">{new Date(p.createdAt || p.date || 0).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'FLEET' && (
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Bus Name</th>
                  <th className="p-3">Reg No</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Seats</th>
                  <th className="p-3">Base Fare</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {(buses || []).slice(0, 8).map(b => (
                  <tr key={b.id}>
                    <td className="p-3 font-bold text-white">{b.name}</td>
                    <td className="p-3 font-mono text-amber-400">{b.busNumber}</td>
                    <td className="p-3">{b.busType}</td>
                    <td className="p-3">{b.totalSeats}</td>
                    <td className="p-3 font-bold">₹{b.baseFare}</td>
                    <td className="p-3 text-emerald-400 font-bold">{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
