import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Booking, Bus, Route } from '../../types';
import {
  Printer, ArrowLeft, Bus as BusIcon, QrCode, ShieldCheck,
  MapPin, Clock, Users, Phone, Calendar, Download, CheckCircle2,
  Loader2, Check
} from 'lucide-react';

export const CustomerTicketView: React.FC = () => {
  const {
    currentBooking,
    buses,
    routes,
    navigateTo,
    showToast
  } = useApp();

  const ticketRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!currentBooking) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Ticket Not Found</h3>
        <p className="text-xs text-slate-500 mb-4">Please select a valid booking from your booking history.</p>
        <button
          onClick={() => navigateTo('my_bookings')}
          className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Go to My Bookings
        </button>
      </div>
    );
  }

  const bus = buses.find(b => b.id === currentBooking.busId);
  const route = routes.find(r => r.id === currentBooking.routeId);

  // Reliable Vector Fallback PDF Generator
  const generateVectorTicketPDF = (booking: Booking, busObj?: Bus, routeObj?: Route) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Header bar (Slate 900)
    doc.setFillColor(15, 23, 42);
    doc.rect(10, 10, 190, 24, 'F');

    // Red accent strip
    doc.setFillColor(225, 29, 72);
    doc.rect(10, 34, 190, 2, 'F');

    // Brand Name & Tagline
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('BharatRide', 16, 22);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('ELECTRONIC PASSENGER BOARDING TICKET', 16, 28);

    // PNR on right
    doc.setFontSize(8);
    doc.text('BOOKING REFERENCE / PNR', 194, 18, { align: 'right' });
    doc.setFontSize(12);
    doc.setTextColor(251, 191, 36);
    doc.text(booking.id, 194, 25, { align: 'right' });
    doc.setFontSize(8);
    doc.setTextColor(52, 211, 153);
    doc.text('CONFIRMED & PAID', 194, 30, { align: 'right' });

    // Bus overview box
    doc.setFillColor(248, 250, 252);
    doc.rect(10, 40, 190, 20, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(10, 40, 190, 20, 'S');

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('BUS SERVICE', 15, 46);
    doc.text('FLEET OPERATOR', 80, 46);
    doc.text('TRAVEL DATE', 145, 46);

    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(busObj?.name || booking.busName || 'BharatRide Express', 15, 52);
    doc.text(`${busObj?.operator || booking.operator || 'BharatRide Fleet'} (${busObj?.busNumber || 'AP09AB1234'})`, 80, 52);
    doc.text(booking.travelDate || 'Today', 145, 52);

    // Boarding & Dropping card
    doc.setFillColor(248, 250, 252);
    doc.rect(10, 64, 190, 32, 'F');
    doc.rect(10, 64, 190, 32, 'S');

    doc.setFontSize(9);
    doc.setTextColor(225, 29, 72);
    doc.text('BOARDING / PICKUP', 15, 71);
    doc.setTextColor(234, 88, 12);
    doc.text('DESTINATION / DROP', 105, 71);

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(booking.boardingPoint.name, 15, 78);
    doc.text(booking.droppingPoint.name, 105, 78);

    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`Reporting Time: ${booking.boardingPoint.time}`, 15, 84);
    doc.text(`Expected Arrival: ${booking.droppingPoint.time}`, 105, 84);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${booking.boardingPoint.landmark} - ${booking.boardingPoint.address}`.substring(0, 52), 15, 90);
    doc.text(`${booking.droppingPoint.landmark} - ${booking.droppingPoint.address}`.substring(0, 52), 105, 90);

    // Passengers Manifest
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('PASSENGER MANIFEST & RESERVED BERTHS', 15, 103);

    // Table header
    doc.setFillColor(241, 245, 249);
    doc.rect(10, 106, 190, 8, 'F');
    doc.rect(10, 106, 190, 8, 'S');

    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('#', 15, 111);
    doc.text('Passenger Name', 28, 111);
    doc.text('Age / Gender', 95, 111);
    doc.text('Seat Number', 140, 111);
    doc.text('Status', 180, 111, { align: 'right' });

    let currentY = 114;
    booking.passengers.forEach((p, idx) => {
      currentY += 7;
      doc.setDrawColor(241, 245, 249);
      doc.line(10, currentY, 200, currentY);
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(String(idx + 1), 15, currentY - 2);
      doc.setTextColor(15, 23, 42);
      doc.text(p.name, 28, currentY - 2);
      doc.setTextColor(71, 85, 105);
      doc.text(`${p.age} Yrs / ${p.gender}`, 95, currentY - 2);
      doc.setTextColor(225, 29, 72);
      doc.setFont('helvetica', 'bold');
      doc.text(`Seat ${p.seatNumber}`, 140, currentY - 2);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(5, 150, 105);
      doc.text('Confirmed', 180, currentY - 2, { align: 'right' });
    });

    // Fare & Payment
    const fareY = currentY + 12;
    doc.setDrawColor(226, 232, 240);
    doc.line(10, fareY, 200, fareY);

    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`Payment Mode: ${booking.paymentMethod} (PAID)`, 15, fareY + 8);
    doc.text(`Seats Subtotal: Rs. ${booking.totalAmount}`, 194, fareY + 8, { align: 'right' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(225, 29, 72);
    doc.text(`Total Amount Paid: Rs. ${booking.totalAmount}`, 194, fareY + 16, { align: 'right' });

    // Guidelines
    const termsY = fareY + 24;
    doc.setFillColor(248, 250, 252);
    doc.rect(10, termsY, 190, 26, 'F');
    doc.rect(10, termsY, 190, 26, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text('IMPORTANT TRAVEL GUIDELINES:', 15, termsY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('1. Please report at boarding point at least 15 minutes prior to scheduled departure.', 15, termsY + 11);
    doc.text('2. Carry valid Government Photo ID (Aadhaar / Driving License / Passport) for verification.', 15, termsY + 16);
    doc.text('3. Baggage allowance: 15 kg per passenger. 24x7 Customer Support: +91 1800-419-8999.', 15, termsY + 21);

    doc.save(`BharatRide-Ticket-${booking.id}.pdf`);
  };

  // Main High-Fidelity PDF Downloader
  const handleDownload = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setDownloadSuccess(false);

    try {
      showToast('Preparing your official e-ticket PDF...', 'info');

      if (ticketRef.current) {
        // High-resolution rendering via html2canvas
        const canvas = await html2canvas(ticketRef.current, {
          scale: 2, // 2x retina clarity
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 8;
        const printableWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * printableWidth) / canvas.width;

        if (imgHeight <= pageHeight - margin * 2) {
          // Fits on single clean page
          pdf.addImage(imgData, 'JPEG', margin, margin, printableWidth, imgHeight, undefined, 'FAST');
        } else {
          // Fit comfortably on a single A4 page
          const scaleFactor = (pageHeight - margin * 2) / imgHeight;
          const fittedWidth = printableWidth * scaleFactor;
          const leftOffset = (pageWidth - fittedWidth) / 2;
          pdf.addImage(imgData, 'JPEG', leftOffset, margin, fittedWidth, pageHeight - margin * 2, undefined, 'FAST');
        }

        pdf.save(`BharatRide-Ticket-${currentBooking.id}.pdf`);
        setDownloadSuccess(true);
        showToast('E-Ticket PDF downloaded successfully!', 'success');
        setTimeout(() => setDownloadSuccess(false), 3000);
      } else {
        generateVectorTicketPDF(currentBooking, bus, route);
        showToast('E-Ticket PDF downloaded successfully!', 'success');
      }
    } catch (err) {
      console.warn('Canvas capture fallback to direct vector PDF:', err);
      try {
        generateVectorTicketPDF(currentBooking, bus, route);
        setDownloadSuccess(true);
        showToast('E-Ticket PDF generated and downloaded!', 'success');
        setTimeout(() => setDownloadSuccess(false), 3000);
      } catch (fallbackErr) {
        console.error('Vector PDF fallback failed:', fallbackErr);
        showToast('Could not generate PDF. Please try Print.', 'error');
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Dedicated Print Handler
  const handlePrint = () => {
    setIsPrinting(true);
    try {
      window.print();
    } catch (e) {
      console.warn('Direct window.print() failed, trying printable iframe fallback:', e);
      // Fallback: Create printable iframe if modal print was blocked
      printViaHiddenIframe();
    } finally {
      setTimeout(() => setIsPrinting(false), 1200);
    }
  };

  const printViaHiddenIframe = () => {
    if (!ticketRef.current) return;
    try {
      const existing = document.getElementById('ticket-print-iframe');
      if (existing) existing.remove();

      const iframe = document.createElement('iframe');
      iframe.id = 'ticket-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const frameDoc = iframe.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
          .map(s => s.outerHTML)
          .join('\n');

        frameDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>BharatRide Official Ticket - ${currentBooking.id}</title>
              ${styles}
              <style>
                body { background: white !important; margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
                @page { size: portrait; margin: 10mm; }
              </style>
            </head>
            <body>
              ${ticketRef.current.outerHTML}
            </body>
          </html>
        `);
        frameDoc.close();

        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch (err) {
            console.warn('Iframe print error:', err);
            handleDownload();
          }
        }, 400);
      }
    } catch (err) {
      console.error('Print iframe creation error:', err);
      handleDownload();
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation & Action Bar (Hidden in Print) */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => navigateTo('my_bookings')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Bookings</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isGeneratingPdf}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                downloadSuccess
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 active:scale-95'
              }`}
              title="Download official PDF copy of your e-ticket"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                  <span>Generating PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Print official e-ticket or save to paper/PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isPrinting ? 'Preparing Print...' : 'Print Official E-Ticket'}</span>
            </button>
          </div>
        </div>

        {/* Printable Official E-Ticket Container */}
        <div
          ref={ticketRef}
          id="official-ticket-print"
          className="bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden print:border-none print:shadow-none print:rounded-none"
        >
          {/* Ticket Header Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-rose-600">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                <BusIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight">Bharat<span className="text-rose-500">Ride</span></div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Electronic Passenger Boarding Ticket</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Booking Reference / PNR</div>
              <div className="font-mono text-base sm:text-lg font-extrabold text-amber-400 tracking-wider">
                {currentBooking.id}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center sm:justify-end gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>CONFIRMED &amp; PAID</span>
              </div>
            </div>
          </div>

          {/* Ticket Body Content */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-800">
            {/* Bus & Operator Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Bus Service</span>
                <span className="font-extrabold text-sm text-slate-900">{bus?.name || currentBooking.busName || 'BharatRide Express'}</span>
                <span className="text-xs text-slate-500 block">{bus?.busType || currentBooking.busType}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Fleet Operator</span>
                <span className="font-bold text-xs text-slate-800">{bus?.operator || currentBooking.operator}</span>
                <span className="font-mono text-xs text-slate-600 block">Reg: {bus?.busNumber || 'AP09AB1234'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Travel Date</span>
                <span className="font-extrabold text-xs text-slate-900">{currentBooking.travelDate}</span>
                <span className="text-xs text-emerald-600 font-semibold block">Scheduled On-Time</span>
              </div>
            </div>

            {/* Boarding and Dropping Itinerary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              {/* Pickup */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Boarding / Pickup</span>
                </div>
                <div className="text-base font-extrabold text-slate-900">{currentBooking.boardingPoint.name}</div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  Reporting Time: <span className="text-rose-600">{currentBooking.boardingPoint.time}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{currentBooking.boardingPoint.landmark}</div>
                <div className="text-[10px] text-slate-400">{currentBooking.boardingPoint.address}</div>
              </div>

              {/* Drop */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Destination / Drop</span>
                </div>
                <div className="text-base font-extrabold text-slate-900">{currentBooking.droppingPoint.name}</div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  Expected Arrival: <span className="text-orange-600">{currentBooking.droppingPoint.time}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{currentBooking.droppingPoint.landmark}</div>
                <div className="text-[10px] text-slate-400">{currentBooking.droppingPoint.address}</div>
              </div>
            </div>

            {/* Passenger Manifest Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Passenger Manifest &amp; Reserved Berths</span>
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Passenger Name</th>
                      <th className="p-2.5">Age / Gender</th>
                      <th className="p-2.5 text-center">Seat Number</th>
                      <th className="p-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentBooking.passengers.map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-400">{i + 1}</td>
                        <td className="p-2.5 font-bold text-slate-900">{p.name}</td>
                        <td className="p-2.5 text-slate-600">{p.age} Yrs / {p.gender}</td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-mono font-bold rounded border border-rose-200">
                            {p.seatNumber}
                          </span>
                        </td>
                        <td className="p-2.5 text-right">
                          <span className="text-emerald-700 font-bold">Confirmed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fare Summary & QR Code Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 border-t border-slate-200 items-center">
              {/* QR and Barcode visual */}
              <div className="sm:col-span-5 flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-20 h-20 bg-white p-1 rounded-xl border border-slate-300 flex items-center justify-center shrink-0">
                  <QrCode className="w-16 h-16 text-slate-900" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Conductor Verification</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                    Scan via BharatRide Conductor Terminal to validate boarding.
                  </div>
                </div>
              </div>

              {/* Fare & Payment Summary */}
              <div className="sm:col-span-7 sm:text-right space-y-1 text-xs">
                <div className="flex justify-between sm:justify-end gap-4 text-slate-600">
                  <span>Seats Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{currentBooking.totalAmount}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-4 text-slate-600">
                  <span>Payment Mode:</span>
                  <span className="font-semibold text-slate-900">{currentBooking.paymentMethod} (PAID)</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-4 text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Amount Paid:</span>
                  <span className="text-xl font-black text-rose-600">₹{currentBooking.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions Notice */}
            <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed space-y-1">
              <div className="font-bold text-slate-700 uppercase">Important Travel Guidelines:</div>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Passengers must report at the boarding point at least 15 minutes before the scheduled departure.</li>
                <li>Valid government-issued photo identity proof (Aadhaar, Driving License, Passport) is required for verification.</li>
                <li>Free baggage allowance up to 15 kg per passenger. Luggage containing flammable items is strictly prohibited.</li>
                <li>Helpline 24x7 Customer Support: <span className="font-bold text-slate-700">+91 1800-419-8999</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
