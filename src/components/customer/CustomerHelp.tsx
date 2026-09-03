import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle, ChevronDown, ChevronUp, Phone, Mail,
  Send, ShieldCheck, MessageSquare, Clock, CheckCircle2
} from 'lucide-react';

export const CustomerHelp: React.FC = () => {
  const { showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<'ALL' | 'BOOKING' | 'CANCELLATION' | 'PAYMENT' | 'TRACKING'>('ALL');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Support Form State
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketPnr, setTicketPnr] = useState('');
  const [ticketSubject, setTicketSubject] = useState('Booking Query');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      category: 'BOOKING',
      question: 'How do I choose sleeper berths versus pushback seats on BharatRide?',
      answer: 'During the seat selection step on our interactive coach layout, sleeper buses display individual upper (U) and lower (L) deck berths with distinct 2+1 layout grids. Seater buses show 2+2 rows. You can click on any available berth or seat to view its exact fare and select it.'
    },
    {
      id: 2,
      category: 'CANCELLATION',
      question: 'What is the cancellation and refund timeline for bus tickets?',
      answer: 'Cancellations made 12 hours prior to scheduled departure receive a 100% refund. Cancellations made between 2 to 12 hours before departure incur a flat 15% operator policy deduction. Once cancelled, your refund is instantly calculated and credited back to your original payment mode (UPI, Card, or Net Banking).'
    },
    {
      id: 3,
      category: 'TRACKING',
      question: 'How does live bus GPS tracking work?',
      answer: 'All BharatRide certified fleet vehicles are equipped with dual-band AIS-140 GPS transponders. You can view your bus location, highway speedometer, distance covered, upcoming food halts, and estimated arrival by clicking "Track Bus" on your ticket.'
    },
    {
      id: 4,
      category: 'PAYMENT',
      question: 'What payment modes are supported?',
      answer: 'We support all major Indian UPI applications (Google Pay, PhonePe, Paytm, BHIM, Amazon Pay), Debit & Credit Cards (Visa, Mastercard, RuPay), Net Banking across 40+ banks, BharatRide Wallet, and Pay-at-Boarding.'
    },
    {
      id: 5,
      category: 'BOOKING',
      question: 'Do I need to carry a printed physical ticket to board the bus?',
      answer: 'No physical printout is required! The digital M-Ticket QR code and confirmation SMS sent to your registered mobile number is 100% valid for boarding across all our bus operators.'
    },
    {
      id: 6,
      category: 'CANCELLATION',
      question: 'What happens if a bus departure is cancelled by the operator?',
      answer: 'In the rare event that an operator cancels a scheduled departure due to unforeseen highway or weather emergencies, you will receive an immediate 100% refund with zero deductions along with an instant SMS notification and priority alternate seat allocation.'
    },
  ];

  const filteredFaqs = activeCategory === 'ALL' ? faqs : faqs.filter(f => f.category === activeCategory);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName.trim() || !ticketEmail.trim() || !ticketMessage.trim()) {
      showToast('Please fill all required support ticket fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Support ticket #BR-9482 registered! Support team will respond shortly.', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>24x7 Traveler Support Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">How Can We Help You?</h1>
          <p className="text-xs text-slate-500">
            Find answers regarding ticket booking, seat reservation, cancellations, instant refunds, and live bus GPS tracking.
          </p>
        </div>

        {/* Quick Contact Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">24x7 Toll Free Helpline</div>
              <div className="text-xs font-bold text-rose-600">1800-419-8999</div>
              <div className="text-[10px] text-slate-400">All India Assistance</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Email Customer Desk</div>
              <div className="text-xs font-bold text-emerald-600">support@bharatride.in</div>
              <div className="text-[10px] text-slate-400">Avg reply time: 15 mins</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Live Support Desk</div>
              <div className="text-xs font-bold text-orange-600">Always Online (24/7)</div>
              <div className="text-[10px] text-slate-400">Highway Operations Center</div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'ALL', label: 'All Topics' },
                { id: 'BOOKING', label: 'Booking & Seats' },
                { id: 'CANCELLATION', label: 'Refunds & Cancel' },
                { id: 'TRACKING', label: 'Live GPS' },
                { id: 'PAYMENT', label: 'Payments' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion list */}
          <div className="space-y-3">
            {filteredFaqs.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-900">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support Ticket Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-1">Submit a Support Ticket</h3>
            <p className="text-xs text-slate-500 mb-6">
              Have a question about a specific booking, payment discrepancy, or boarding issue? Submit your request below.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Support Request Received</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Our customer happiness representative will review ticket <span className="font-mono font-bold">#BR-9482</span> and get back to you at {ticketEmail}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={ticketName}
                      onChange={e => setTicketName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={ticketEmail}
                      onChange={e => setTicketEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Booking Reference / PNR (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. BUS-2026-94821"
                      value={ticketPnr}
                      onChange={e => setTicketPnr(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Category</label>
                    <select
                      value={ticketSubject}
                      onChange={e => setTicketSubject(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 cursor-pointer"
                    >
                      <option value="Booking Query">Booking &amp; Seat Selection Query</option>
                      <option value="Cancellation & Refund">Cancellation &amp; Refund Request</option>
                      <option value="Boarding Point Assistance">Boarding Point / Delay Inquiry</option>
                      <option value="Food & Addons">Food &amp; Refreshment Inquiry</option>
                      <option value="General Feedback">General Feedback &amp; Suggestions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Detailed Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your issue or question in detail..."
                    value={ticketMessage}
                    onChange={e => setTicketMessage(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Support Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
