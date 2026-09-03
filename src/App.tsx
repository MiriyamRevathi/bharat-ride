import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CustomerHeader } from './components/customer/CustomerHeader';
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerSearch } from './components/customer/CustomerSearch';
import { CustomerSeatSelection } from './components/customer/CustomerSeatSelection';
import { CustomerBoardingDropping } from './components/customer/CustomerBoardingDropping';
import { CustomerPassengerDetails } from './components/customer/CustomerPassengerDetails';
import { CustomerPayment } from './components/customer/CustomerPayment';
import { CustomerConfirmation } from './components/customer/CustomerConfirmation';
import { CustomerMyBookings } from './components/customer/CustomerMyBookings';
import { CustomerOffersPage } from './components/customer/CustomerOffersPage';
import { CustomerProfile } from './components/customer/CustomerProfile';
import { CustomerHelp } from './components/customer/CustomerHelp';
import { CustomerTicketView } from './components/customer/CustomerTicketView';
import { CustomerBookingDetails } from './components/customer/CustomerBookingDetails';
import { CustomerTracking } from './components/customer/CustomerTracking';
import { CustomerLoginPage } from './components/customer/CustomerLoginPage';
import { CustomerRegisterPage } from './components/customer/CustomerRegisterPage';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminBusManagement } from './components/admin/AdminBusManagement';
import { AdminRouteManagement } from './components/admin/AdminRouteManagement';
import { AdminScheduleManagement } from './components/admin/AdminScheduleManagement';
import { AdminSeatManagement } from './components/admin/AdminSeatManagement';
import { AdminBoardingDropping } from './components/admin/AdminBoardingDropping';
import { AdminBookingManagement } from './components/admin/AdminBookingManagement';
import { AdminCancellationManagement } from './components/admin/AdminCancellationManagement';
import { AdminPaymentManagement } from './components/admin/AdminPaymentManagement';
import { AdminOfferManagement } from './components/admin/AdminOfferManagement';
import { AdminCustomerManagement } from './components/admin/AdminCustomerManagement';
import { AdminReports } from './components/admin/AdminReports';
import { AdminActivityLogs } from './components/admin/AdminActivityLogs';
import { AdminSettings } from './components/admin/AdminSettings';

import { DriverLogin } from './components/driver/DriverLogin';
import { DriverLayout } from './components/driver/DriverLayout';
import { DriverViewRenderer } from './components/driver/DriverViewRenderer';

import { CustomerLoginModal } from './components/common/CustomerLoginModal';
import { AdminLoginModal } from './components/common/AdminLoginModal';
import { Toast } from './components/common/Toast';
import { Bus, Shield, Phone, Mail, MapPin, Heart, ArrowRight } from 'lucide-react';

const AdminViewRenderer: React.FC = () => {
  const { adminView } = useApp();

  switch (adminView) {
    case 'dashboard':
      return <AdminDashboard />;
    case 'buses':
      return <AdminBusManagement />;
    case 'routes':
      return <AdminRouteManagement />;
    case 'schedules':
      return <AdminScheduleManagement />;
    case 'boarding_dropping':
      return <AdminBoardingDropping />;
    case 'seats':
      return <AdminSeatManagement />;
    case 'bookings':
      return <AdminBookingManagement />;
    case 'cancellations':
      return <AdminCancellationManagement />;
    case 'payments':
      return <AdminPaymentManagement />;
    case 'customers':
      return <AdminCustomerManagement />;
    case 'offers':
      return <AdminOfferManagement />;
    case 'reports':
      return <AdminReports />;
    case 'activity_logs':
      return <AdminActivityLogs />;
    case 'settings':
      return <AdminSettings />;
    default:
      return <AdminDashboard />;
  }
};

const CustomerViewRenderer: React.FC = () => {
  const { currentView } = useApp();

  switch (currentView) {
    case 'home':
      return <CustomerHome />;
    case 'search':
      return <CustomerSearch />;
    case 'seat_selection':
      return <CustomerSeatSelection />;
    case 'boarding_dropping':
      return <CustomerBoardingDropping />;
    case 'passengers':
      return <CustomerPassengerDetails />;
    case 'payment':
      return <CustomerPayment />;
    case 'confirmation':
      return <CustomerConfirmation />;
    case 'my_bookings':
      return <CustomerMyBookings />;
    case 'offers':
    case 'offers_page':
      return <CustomerOffersPage />;
    case 'profile':
      return <CustomerProfile />;
    case 'help':
      return <CustomerHelp />;
    case 'ticket_view':
      return <CustomerTicketView />;
    case 'booking_details':
      return <CustomerBookingDetails />;
    case 'tracking':
      return <CustomerTracking />;
    case 'login':
    case 'signin':
      return <CustomerLoginPage />;
    case 'register':
    case 'signup':
      return <CustomerRegisterPage />;
    case 'driver_login':
      return <DriverLogin />;
    default:
      return <CustomerHome />;
  }
};

const CustomerFooter: React.FC = () => {
  const { navigateTo, setAdminLoginModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-700 flex items-center justify-center text-white font-bold shadow-md shadow-rose-900/30">
                <Bus className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Bharat<span className="text-rose-500">Ride</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              India's premium intercity bus booking platform. Verified luxury fleets, live GPS tracking, instant refunds, and 24/7 passenger assistance.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>100% Safe & Secure Payments</span>
            </div>
          </div>

          {/* Popular Travel Routes */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Popular Routes</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-rose-500" />
                  <span>Hyderabad → Guntur / Vijayawada</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-rose-500" />
                  <span>Bengaluru → Chennai (AC Sleeper)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-rose-500" />
                  <span>Mumbai → Pune (Multi-Axle AC)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-rose-500" />
                  <span>Delhi → Jaipur (Volvo 9600)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-rose-500" />
                  <span>Vijayawada → Visakhapatnam</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('my_bookings')} className="hover:text-white transition-colors cursor-pointer">
                  Manage My Bookings
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-white transition-colors cursor-pointer">
                  Live Bus Tracking (GPS)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('offers_page')} className="hover:text-white transition-colors cursor-pointer">
                  Discount Coupons &amp; Deals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('help')} className="hover:text-white transition-colors cursor-pointer">
                  Cancellation &amp; Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => setAdminLoginModal(true)} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-semibold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Operations Console</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('driver_login')} className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer font-semibold flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5" />
                  <span>Driver Operations Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 24x7 Customer Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Passenger Support</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-rose-400 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Toll Free Helpline</div>
                  <div className="font-bold text-white text-sm">+91 1800 200 4888</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-rose-400 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Email Support</div>
                  <div className="font-semibold text-white">support@bharatride.in</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-rose-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Corporate Office</div>
                  <div className="text-slate-300">HITEC City, Madhapur, Hyderabad - 500081</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 BharatRide Technologies Pvt. Ltd. Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indian Bus Travelers.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('help')} className="hover:text-slate-400 transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('help')} className="hover:text-slate-400 transition-colors">Terms of Service</button>
            <button onClick={() => navigateTo('help')} className="hover:text-slate-400 transition-colors">FAQ &amp; Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const MainApp: React.FC = () => {
  const { currentRole, currentView } = useApp();

  // 1. If currently in DRIVER role, enforce Driver Portal
  if (currentRole === 'DRIVER') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F4F1EE] text-[#121212] selection:bg-rose-500/20 selection:text-rose-900">
        <DriverLayout>
          <DriverViewRenderer />
        </DriverLayout>
        <Toast />
      </div>
    );
  }

  // 2. Dedicated Driver Login Screen
  if (currentView === 'driver_login') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F4F1EE] text-[#121212] selection:bg-rose-500/20 selection:text-rose-900">
        <DriverLogin />
        <Toast />
      </div>
    );
  }

  // 3. Admin or Customer Role
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EE] text-[#121212] selection:bg-rose-500/20 selection:text-rose-900">
      {currentRole === 'ADMIN' ? (
        <AdminLayout>
          <AdminViewRenderer />
        </AdminLayout>
      ) : (
        <>
          <CustomerHeader />
          <main className="flex-1">
            <CustomerViewRenderer />
          </main>
          <CustomerFooter />
        </>
      )}

      {/* Global Modals & Notifications */}
      <CustomerLoginModal />
      <AdminLoginModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
