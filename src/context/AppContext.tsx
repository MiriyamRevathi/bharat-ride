import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User, Bus, Route, BoardingPoint, DroppingPoint, Schedule, Seat,
  Offer, FoodItem, SelectedFoodItem, Booking, PaymentTransaction,
  BusTracking, AppNotification, ActivityLog, AppSettings,
  PaymentMethod, SeatState, Passenger, ContactInfo, Driver, DriverStatus, TripStatus
} from '../types';
import {
  INITIAL_SETTINGS, SEED_USERS, SEED_BUSES, SEED_ROUTES,
  SEED_BOARDING_POINTS, SEED_DROPPING_POINTS, SEED_SCHEDULES,
  SEED_SEATS, SEED_OFFERS, SEED_FOOD_ITEMS, SEED_BOOKINGS,
  SEED_PAYMENTS, SEED_TRACKING, SEED_NOTIFICATIONS, SEED_ACTIVITY_LOGS,
  SEED_DRIVERS, generateSeatsForBus
} from '../data/seedData';

const STORAGE_KEY_PREFIX = 'bharatride_app_v1_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

export interface FareCalculation {
  baseFarePerSeat: number;
  seatCount: number;
  seatFaresTotal: number;
  taxes: number;
  serviceFee: number;
  foodTotal: number;
  discount: number;
  totalAmount: number;
}

interface AppContextType {
  // State
  currentUser: User | null;
  currentRole: 'CUSTOMER' | 'ADMIN' | 'DRIVER';
  currentView: string;
  currentDriver: Driver | null;
  driverView: string;
  setDriverView: (view: string) => void;
  selectedDriverTripId: string | null;
  setSelectedDriverTripId: (tripId: string | null) => void;
  users: User[];
  buses: Bus[];
  drivers: Driver[];
  routes: Route[];
  schedules: Schedule[];
  seats: Seat[];
  bookings: Booking[];
  payments: PaymentTransaction[];
  offers: Offer[];
  boardingPoints: BoardingPoint[];
  droppingPoints: DroppingPoint[];
  foodItems: FoodItem[];
  trackingList: BusTracking[];
  notifications: AppNotification[];
  activityLogs: ActivityLog[];
  settings: AppSettings;

  // Booking Flow State
  searchParams: {
    fromCity: string;
    toCity: string;
    travelDate: string;
    returnDate?: string;
    passengers: number;
  };
  selectedBus: Bus | null;
  selectedSchedule: Schedule | null;
  selectedSeatNumbers: string[];
  selectedBoardingPoint: { id: string; name: string; landmark: string; address: string; time: string } | null;
  selectedDroppingPoint: { id: string; name: string; landmark: string; address: string; time: string } | null;
  passengers: Passenger[];
  contactInfo: ContactInfo;
  appliedOffer: Offer | null;
  selectedFoodItems: SelectedFoodItem[];
  latestConfirmedBooking: Booking | null;
  selectedBookingForDetails: Booking | null;
  selectedBookingForTicket: Booking | null;
  selectedTrackingBusId: string | null;

  // Modals & Popups
  showCustomerLoginModal: boolean;
  showAdminLoginModal: boolean;
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  authRedirect: string | null;
  setAuthRedirect: (view: string | null) => void;

  // Navigations & Views
  navigateTo: (view: string) => void;
  adminView: string;
  setAdminView: (view: string) => void;
  setCurrentRole: (role: 'CUSTOMER' | 'ADMIN' | 'DRIVER') => void;
  setCustomerLoginModal: (open: boolean) => void;
  setAdminLoginModal: (open: boolean) => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  requireLoginThen: (targetView: string) => boolean;

  // Convenient Aliases
  currentBooking: Booking | null;
  boardingPoint: { id: string; name: string; landmark: string; address: string; time: string } | null;
  droppingPoint: { id: string; name: string; landmark: string; address: string; time: string } | null;
  contactDetails: ContactInfo;
  setPassengerInfo: (passengers: Passenger[]) => void;
  setContactInfo: (contact: Partial<ContactInfo>) => void;
  applyOffer: (code: string) => { success: boolean; message: string };
  removeOffer: () => void;
  foodAddons: SelectedFoodItem[];
  updateFoodAddonQuantity: (item: FoodItem, quantity: number) => void;
  openTicketView: (booking: Booking) => void;
  openTrackingView: (booking: Booking) => void;
  updateUser: (name: string, phone: string) => void;

  // Auth
  loginAsCustomer: (userId?: string) => void;
  loginCustomer: (emailOrPhone: string, password?: string) => { success: boolean; message: string; user?: User };
  loginWithOtp: (phone: string, otp: string) => { success: boolean; message: string; user?: User };
  registerCustomer: (data: { name: string; email: string; phone: string; password?: string; gender?: 'MALE' | 'FEMALE' | 'OTHER'; city?: string }) => { success: boolean; message: string; user?: User };
  loginAsAdmin: () => void;
  logout: () => void;
  updateUserProfile: (name: string, phone: string) => void;

  // Driver App Specific Methods
  loginDriver: (driverIdOrPhone: string, password?: string) => { success: boolean; message: string; driver?: Driver };
  logoutDriver: () => void;
  updateDriverProfile: (driverId: string, updates: Partial<Driver>) => void;
  updatePassengerBoardingStatus: (tripIdOrScheduleId: string, seatNumber: string, status: 'BOARDED' | 'NOT_BOARDED') => void;
  updateTripStatus: (tripId: string, status: TripStatus) => void;

  // Customer Actions
  setSearchParams: (params: { fromCity: string; toCity: string; travelDate: string; returnDate?: string; passengers: number }) => void;
  selectBusAndSchedule: (bus: Bus, schedule: Schedule) => void;
  toggleSeatSelection: (seatNumber: string) => void;
  clearSeatSelection: () => void;
  setBoardingAndDropping: (
    boarding: { id: string; name: string; landmark: string; address: string; time: string },
    dropping: { id: string; name: string; landmark: string; address: string; time: string }
  ) => void;
  setPassengerAndContactData: (passengers: Passenger[], contact: ContactInfo) => void;
  applyOfferCode: (code: string) => { success: boolean; message: string };
  removeOfferCode: () => void;
  addFoodItem: (item: FoodItem) => void;
  removeFoodItem: (itemId: string) => void;
  calculateFare: () => FareCalculation;
  processPayment: (method: PaymentMethod, simulateSuccess: boolean) => Promise<{ success: boolean; booking?: Booking; error?: string }>;
  cancelCustomerBooking: (bookingId: string, reason: string) => { success: boolean; refundAmount: number };
  viewBookingDetails: (booking: Booking) => void;
  viewBookingTicket: (booking: Booking) => void;
  trackBusByScheduleOrBusId: (busId: string, scheduleId?: string) => void;

  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Admin Actions
  addBus: (bus: Omit<Bus, 'id' | 'rating' | 'totalRatings'>) => void;
  updateBus: (busId: string, updates: Partial<Bus>) => void;
  deleteBus: (busId: string) => void;
  toggleBusStatus: (busId: string) => void;

  // Driver Actions
  addDriver: (driver: Driver) => void;
  updateDriver: (driverId: string, updates: Partial<Driver>) => void;
  deleteDriver: (driverId: string) => void;
  assignDriverToBus: (busId: string, driver: Driver) => void;
  unassignDriverFromBus: (busId: string) => void;

  addRoute: (route: Omit<Route, 'id'>) => void;
  updateRoute: (routeId: string, updates: Partial<Route>) => void;
  deleteRoute: (routeId: string) => void;
  toggleRouteStatus: (routeId: string) => void;

  addSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  updateSchedule: (scheduleId: string, updates: Partial<Schedule>) => void;
  deleteSchedule: (scheduleId: string) => void;

  addBoardingPoint: (point: Omit<BoardingPoint, 'id'>) => void;
  updateBoardingPoint: (pointId: string, updates: Partial<BoardingPoint>) => void;
  deleteBoardingPoint: (pointId: string) => void;

  addDroppingPoint: (point: Omit<DroppingPoint, 'id'>) => void;
  updateDroppingPoint: (pointId: string, updates: Partial<DroppingPoint>) => void;
  deleteDroppingPoint: (pointId: string) => void;

  updateSeatState: (busId: string, seatNumber: string, newState: SeatState) => void;

  addOffer: (offer: Omit<Offer, 'id' | 'usedCount'>) => void;
  updateOffer: (offerId: string, updates: Partial<Offer>) => void;
  deleteOffer: (offerId: string) => void;
  toggleOfferStatus: (offerId: string) => void;

  updateCustomer: (userId: string, updates: Partial<User>) => void;
  deleteCustomer: (userId: string) => void;

  cancelBookingByAdmin: (bookingId: string, reason: string) => void;
  approveRefund: (transactionId: string) => void;
  rejectRefund: (transactionId: string) => void;

  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Primary persistent entities
  const [users, setUsers] = useState<User[]>(() => loadFromStorage('users', SEED_USERS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadFromStorage<User | null>('current_user', null));
  const [currentRole, setCurrentRole] = useState<'CUSTOMER' | 'ADMIN' | 'DRIVER'>(() => loadFromStorage('current_role', 'CUSTOMER'));
  const [currentView, setCurrentView] = useState<string>(() => loadFromStorage('current_view', 'home'));
  const [adminView, setAdminView] = useState<string>(() => loadFromStorage('admin_view', 'dashboard'));
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(() => loadFromStorage<Driver | null>('current_driver', null));
  const [driverView, setDriverViewState] = useState<string>(() => loadFromStorage('driver_view', 'dashboard'));
  const [selectedDriverTripId, setSelectedDriverTripIdState] = useState<string | null>(() => loadFromStorage('selected_driver_trip_id', 'TRIP-001'));

  const normalizeBus = (b: Bus): Bus => {
    const driverId = b.driver_id || b.driverId || b.driver?.driver_id;
    return {
      ...b,
      amenities: Array.isArray(b.amenities) ? b.amenities : [],
      status: b.status || 'ACTIVE',
      driver_id: driverId,
      driverId: driverId,
      driver: b.driver
    };
  };

  const normalizeBooking = (b: Booking): Booking => ({
    ...b,
    seatNumbers: b.seatNumbers || b.selectedSeats || [],
    selectedSeats: b.selectedSeats || b.seatNumbers || [],
    totalAmount: b.totalAmount ?? b.fareBreakdown?.totalAmount ?? 0,
    contactPhone: b.contactPhone || b.customerPhone || '',
    userId: b.userId || b.customerId || '',
    status: b.status || b.bookingStatus || 'CONFIRMED',
    bookingStatus: b.bookingStatus || b.status || 'CONFIRMED'
  });

  const normalizePayment = (p: PaymentTransaction): PaymentTransaction => ({
    ...p,
    method: p.method || p.paymentMethod,
    status: p.status || p.paymentStatus,
    createdAt: p.createdAt || p.date
  });

  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const raw = loadFromStorage('drivers', SEED_DRIVERS);
    const list = Array.isArray(raw) && raw.length > 0 ? raw : SEED_DRIVERS;
    return list.map(d => ({
      ...d,
      password: d.password || 'driver123'
    }));
  });

  const [buses, setBuses] = useState<Bus[]>(() => {
    const raw = loadFromStorage('buses', SEED_BUSES);
    const busList = Array.isArray(raw) ? raw.map(normalizeBus) : SEED_BUSES.map(normalizeBus);
    const b104 = busList.find(b => b.id === 'BUS-104');
    if (b104 && (b104.baseFare !== 716 || b104.totalSeats !== 40)) {
      b104.baseFare = 716;
      b104.totalSeats = 40;
    }
    // Guarantee every bus has an assigned driver
    return busList.map((bus, idx) => {
      if (!bus.driver_id || !bus.driver) {
        const seedBus = SEED_BUSES.find(sb => sb.id === bus.id) || SEED_BUSES[idx % SEED_BUSES.length];
        const seedDriver = SEED_DRIVERS.find(d => d.assigned_bus_id === bus.id) || seedBus?.driver || SEED_DRIVERS[idx % SEED_DRIVERS.length];
        return {
          ...bus,
          driver_id: seedDriver?.driver_id || `DRV-${100 + idx}`,
          driverId: seedDriver?.driver_id || `DRV-${100 + idx}`,
          driver: seedDriver ? {
            driver_id: seedDriver.driver_id,
            name: seedDriver.name,
            phone: seedDriver.phone,
            license_number: seedDriver.license_number,
            status: seedDriver.status
          } : undefined
        };
      }
      return bus;
    });
  });
  const [routes, setRoutes] = useState<Route[]>(() => loadFromStorage('routes', SEED_ROUTES));
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const raw = loadFromStorage('schedules', SEED_SCHEDULES);
    const list = Array.isArray(raw) && raw.length > 0 ? raw : SEED_SCHEDULES;
    if (!list.some(s => s.id === 'TRIP-001')) {
      const trip1 = SEED_SCHEDULES.find(s => s.id === 'TRIP-001');
      if (trip1) return [trip1, ...list];
    }
    return list;
  });
  const [seats, setSeats] = useState<Seat[]>(() => {
    const raw = loadFromStorage('seats', SEED_SEATS);
    if (Array.isArray(raw)) {
      const hasSeat39 = raw.some(s => s.busId === 'BUS-104' && s.seatNumber === '39');
      if (hasSeat39) return raw;
    }
    return SEED_SEATS;
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const raw = loadFromStorage('bookings', SEED_BOOKINGS);
    const list = Array.isArray(raw) ? raw.map(normalizeBooking) : SEED_BOOKINGS.map(normalizeBooking);
    const hasTrip1 = list.some(b => b.scheduleId === 'TRIP-001');
    if (!hasTrip1) {
      const trip1Bookings = SEED_BOOKINGS.filter(b => b.scheduleId === 'TRIP-001').map(normalizeBooking);
      return [...trip1Bookings, ...list];
    }
    return list;
  });
  const [payments, setPayments] = useState<PaymentTransaction[]>(() => {
    const raw = loadFromStorage('payments', SEED_PAYMENTS);
    return Array.isArray(raw) ? raw.map(normalizePayment) : SEED_PAYMENTS.map(normalizePayment);
  });
  const [offers, setOffers] = useState<Offer[]>(() => loadFromStorage('offers', SEED_OFFERS));
  const [boardingPoints, setBoardingPoints] = useState<BoardingPoint[]>(() => loadFromStorage('boarding_points', SEED_BOARDING_POINTS));
  const [droppingPoints, setDroppingPoints] = useState<DroppingPoint[]>(() => loadFromStorage('dropping_points', SEED_DROPPING_POINTS));
  const [foodItems] = useState<FoodItem[]>(SEED_FOOD_ITEMS);
  const [trackingList, setTrackingList] = useState<BusTracking[]>(() => loadFromStorage('tracking', SEED_TRACKING));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => loadFromStorage('notifications', SEED_NOTIFICATIONS));
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => loadFromStorage('activity_logs', SEED_ACTIVITY_LOGS));
  const [settings, setSettings] = useState<AppSettings>(() => loadFromStorage('settings', INITIAL_SETTINGS));

  // Ephemeral in-session Booking State
  const [searchParams, setSearchParamsState] = useState({
    fromCity: 'Guntur',
    toCity: 'Hyderabad',
    travelDate: '2026-09-10',
    returnDate: '',
    passengers: 1
  });

  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<string[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<{ id: string; name: string; landmark: string; address: string; time: string } | null>(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<{ id: string; name: string; landmark: string; address: string; time: string } | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    fullName: currentUser?.name || 'Rajesh Sharma',
    email: currentUser?.email || 'rajesh.sharma@gmail.com',
    phone: currentUser?.phone || '+91 98480 22334',
    state: 'Telangana'
  });
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [selectedFoodItems, setSelectedFoodItems] = useState<SelectedFoodItem[]>([]);
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<Booking | null>(null);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);
  const [selectedBookingForTicket, setSelectedBookingForTicket] = useState<Booking | null>(null);
  const [selectedTrackingBusId, setSelectedTrackingBusId] = useState<string | null>(null);

  // Modals & Alerts
  const [showCustomerLoginModal, setCustomerLoginModal] = useState(false);
  const [showAdminLoginModal, setAdminLoginModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [authRedirect, setAuthRedirect] = useState<string | null>(() => loadFromStorage('auth_redirect', null));

  // Sync to storage on state change
  useEffect(() => { saveToStorage('users', users); }, [users]);
  useEffect(() => { saveToStorage('current_user', currentUser); }, [currentUser]);
  useEffect(() => { saveToStorage('current_role', currentRole); }, [currentRole]);
  useEffect(() => { saveToStorage('current_view', currentView); }, [currentView]);
  useEffect(() => { saveToStorage('auth_redirect', authRedirect); }, [authRedirect]);
  useEffect(() => { saveToStorage('buses', buses); }, [buses]);
  useEffect(() => { saveToStorage('drivers', drivers); }, [drivers]);
  useEffect(() => { saveToStorage('routes', routes); }, [routes]);
  useEffect(() => { saveToStorage('schedules', schedules); }, [schedules]);
  useEffect(() => { saveToStorage('seats', seats); }, [seats]);
  useEffect(() => { saveToStorage('bookings', bookings); }, [bookings]);
  useEffect(() => { saveToStorage('payments', payments); }, [payments]);
  useEffect(() => { saveToStorage('offers', offers); }, [offers]);
  useEffect(() => { saveToStorage('boarding_points', boardingPoints); }, [boardingPoints]);
  useEffect(() => { saveToStorage('dropping_points', droppingPoints); }, [droppingPoints]);
  useEffect(() => { saveToStorage('tracking', trackingList); }, [trackingList]);
  useEffect(() => { saveToStorage('notifications', notifications); }, [notifications]);
  useEffect(() => { saveToStorage('activity_logs', activityLogs); }, [activityLogs]);
  useEffect(() => { saveToStorage('settings', settings); }, [settings]);
  useEffect(() => { saveToStorage('current_driver', currentDriver); }, [currentDriver]);
  useEffect(() => { saveToStorage('driver_view', driverView); }, [driverView]);
  useEffect(() => { saveToStorage('selected_driver_trip_id', selectedDriverTripId); }, [selectedDriverTripId]);

  // Toast Helper
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addActivity = (action: string, module: ActivityLog['module'], description: string) => {
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser ? currentUser.name : (currentRole === 'ADMIN' ? 'Admin' : 'Guest'),
      userRole: currentRole,
      action,
      module,
      description
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'read' | 'createdAt'>) => {
    const newNotif: AppNotification = {
      id: `NOTIF-${Date.now()}`,
      ...notif,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Navigations
  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Require login helper: If user is logged in, returns true.
  // If not logged in, redirects to 'login' page (or opens login modal) and stores targetView in authRedirect.
  const requireLoginThen = (targetView: string): boolean => {
    if (currentUser) {
      return true;
    }
    setAuthRedirect(targetView);
    showToast('Please log in or create an account to proceed with your booking.', 'info');
    navigateTo('login');
    return false;
  };

  // Auth methods
  const handlePostAuthNavigation = (user: User) => {
    setCustomerLoginModal(false);
    if (authRedirect) {
      const destination = authRedirect;
      setAuthRedirect(null);
      navigateTo(destination);
      showToast(`Welcome back, ${user.name}! Resuming your booking...`, 'success');
    } else {
      navigateTo('home');
      showToast(`Welcome back, ${user.name}!`, 'success');
    }
  };

  const loginAsCustomer = (userId?: string) => {
    const target = users.find(u => u.id === userId && u.role === 'CUSTOMER') || users.find(u => u.role === 'CUSTOMER') || users[0];
    setCurrentUser(target);
    setCurrentRole('CUSTOMER');
    setContactInfo({
      fullName: target.name,
      email: target.email,
      phone: target.phone,
      state: 'Telangana'
    });
    addActivity('CUSTOMER_LOGIN', 'AUTH', `${target.name} logged in`);
    handlePostAuthNavigation(target);
  };

  const loginCustomer = (emailOrPhone: string, password?: string): { success: boolean; message: string; user?: User } => {
    const cleanInput = emailOrPhone.trim().toLowerCase();
    const cleanDigits = emailOrPhone.replace(/\D/g, '');

    const targetUser = users.find(u => {
      if (u.role !== 'CUSTOMER') return false;
      const uEmail = (u.email || '').trim().toLowerCase();
      const uPhoneDigits = (u.phone || '').replace(/\D/g, '');
      return uEmail === cleanInput || (cleanDigits && uPhoneDigits.endsWith(cleanDigits.slice(-10)));
    });

    if (!targetUser) {
      return {
        success: false,
        message: 'No account found with this email or mobile number. Please register first.'
      };
    }

    if (targetUser.status === 'INACTIVE') {
      return {
        success: false,
        message: 'This account is currently deactivated. Please contact customer support.'
      };
    }

    // If password provided in user record and password submitted, check match
    if (targetUser.password && password && targetUser.password !== password) {
      return {
        success: false,
        message: 'Incorrect password. Please try again or use OTP login.'
      };
    }

    setCurrentUser(targetUser);
    setCurrentRole('CUSTOMER');
    setContactInfo({
      fullName: targetUser.name,
      email: targetUser.email,
      phone: targetUser.phone,
      state: targetUser.city || 'Telangana'
    });
    addActivity('CUSTOMER_LOGIN', 'AUTH', `${targetUser.name} logged in via credentials`);
    handlePostAuthNavigation(targetUser);

    return { success: true, message: 'Logged in successfully', user: targetUser };
  };

  const loginWithOtp = (phone: string, otp: string): { success: boolean; message: string; user?: User } => {
    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }
    if (!otp || otp.length < 4) {
      return { success: false, message: 'Please enter the 4-digit OTP.' };
    }

    // Look for existing user or create instant passenger profile
    let targetUser = users.find(u => {
      const uPhoneDigits = (u.phone || '').replace(/\D/g, '');
      return uPhoneDigits.endsWith(cleanDigits.slice(-10));
    });

    if (!targetUser) {
      // Auto register user with phone
      const formattedPhone = `+91 ${cleanDigits.slice(-10)}`;
      const newUser: User = {
        id: `USR-${Date.now()}`,
        name: `Passenger ${cleanDigits.slice(-4)}`,
        email: `passenger${cleanDigits.slice(-4)}@bharatride.in`,
        phone: formattedPhone,
        role: 'CUSTOMER',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        registeredDate: new Date().toISOString().slice(0, 10),
        status: 'ACTIVE',
        totalTrips: 0
      };
      setUsers(prev => [newUser, ...prev]);
      targetUser = newUser;
    }

    setCurrentUser(targetUser);
    setCurrentRole('CUSTOMER');
    setContactInfo({
      fullName: targetUser.name,
      email: targetUser.email,
      phone: targetUser.phone,
      state: targetUser.city || 'Telangana'
    });
    addActivity('CUSTOMER_LOGIN_OTP', 'AUTH', `${targetUser.name} logged in via OTP`);
    handlePostAuthNavigation(targetUser);

    return { success: true, message: 'Logged in successfully via OTP', user: targetUser };
  };

  const registerCustomer = (data: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    city?: string;
  }): { success: boolean; message: string; user?: User } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhoneDigits = data.phone.replace(/\D/g, '');

    if (!data.name.trim()) {
      return { success: false, message: 'Please enter your full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (cleanPhoneDigits.length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }

    // Check if email already registered
    const existing = users.find(u => {
      const uEmail = (u.email || '').trim().toLowerCase();
      const uPhoneDigits = (u.phone || '').replace(/\D/g, '');
      return uEmail === cleanEmail || (cleanPhoneDigits && uPhoneDigits.endsWith(cleanPhoneDigits.slice(-10)));
    });

    if (existing) {
      return {
        success: false,
        message: 'An account with this email or mobile number already exists. Please log in instead.'
      };
    }

    const newUser: User = {
      id: `USR-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: `+91 ${cleanPhoneDigits.slice(-10)}`,
      password: data.password || 'password123',
      gender: data.gender || 'MALE',
      city: data.city || 'Hyderabad',
      role: 'CUSTOMER',
      avatar: data.gender === 'FEMALE'
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      registeredDate: new Date().toISOString().slice(0, 10),
      status: 'ACTIVE',
      totalTrips: 0
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setCurrentRole('CUSTOMER');
    setContactInfo({
      fullName: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      state: data.city || 'Telangana'
    });

    addActivity('CUSTOMER_REGISTER', 'AUTH', `New customer registered: ${newUser.name}`);
    addNotification({
      title: 'Welcome to BharatRide!',
      message: `Hi ${newUser.name}, your account is active. Use promo code FIRST50 for 50% discount on your first journey!`,
      type: 'BOOKING',
      targetRole: 'CUSTOMER'
    });

    setCustomerLoginModal(false);

    if (authRedirect) {
      const destination = authRedirect;
      setAuthRedirect(null);
      navigateTo(destination);
      showToast(`Account created! Welcome, ${newUser.name}. Resuming your booking...`, 'success');
    } else {
      navigateTo('home');
      showToast(`Account created! Welcome to BharatRide, ${newUser.name}!`, 'success');
    }

    return { success: true, message: 'Registration successful', user: newUser };
  };

  const loginAsAdmin = () => {
    const adminUser = users.find(u => u.role === 'ADMIN') || SEED_USERS.find(u => u.role === 'ADMIN')!;
    setCurrentUser(adminUser);
    setCurrentRole('ADMIN');
    setAdminLoginModal(false);
    navigateTo('dashboard');
    showToast(`Logged in as Admin: ${adminUser.name}`, 'success');
    addActivity('ADMIN_LOGIN', 'AUTH', `${adminUser.name} accessed Admin Console`);
  };

  const logout = () => {
    const oldName = currentUser?.name || 'User';
    setCurrentUser(null);
    saveToStorage('current_user', null);
    setCurrentRole('CUSTOMER');
    setAuthRedirect(null);
    navigateTo('home');
    showToast('You have been logged out safely.', 'info');
    addActivity('LOGOUT', 'AUTH', `${oldName} logged out`);
  };

  const updateUserProfile = (name: string, phone: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, name, phone };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    showToast('Profile updated successfully!', 'success');
    addActivity('PROFILE_UPDATED', 'CUSTOMER', `Customer profile updated: ${name}`);
  };

  // Driver App Specific Methods
  const loginDriver = (driverIdOrPhone: string, password?: string): { success: boolean; message: string; driver?: Driver } => {
    const cleanInput = driverIdOrPhone.trim().toLowerCase();
    const cleanDigits = driverIdOrPhone.replace(/\D/g, '');

    const found = drivers.find(d => {
      const idMatch = d.driver_id.toLowerCase() === cleanInput;
      const phoneDigits = d.phone.replace(/\D/g, '');
      const phoneMatch = cleanDigits.length >= 8 && phoneDigits.endsWith(cleanDigits.slice(-10));
      return idMatch || phoneMatch;
    });

    if (!found) {
      return { success: false, message: 'Driver not found with provided ID or Phone Number.' };
    }

    const expectedPassword = found.password || 'driver123';
    if (password && password.trim() !== expectedPassword) {
      return { success: false, message: 'Invalid password. Default demo password is driver123.' };
    }

    if (found.status === 'Inactive') {
      return { success: false, message: 'This driver account is currently Inactive. Please contact fleet manager.' };
    }

    setCurrentDriver(found);
    setCurrentRole('DRIVER');
    setDriverViewState('dashboard');
    setSelectedDriverTripIdState('TRIP-001');
    saveToStorage('current_driver', found);
    saveToStorage('current_role', 'DRIVER');
    saveToStorage('driver_view', 'dashboard');

    addActivity('DRIVER_LOGIN', 'AUTH', `Driver ${found.name} (${found.driver_id}) logged into Driver Application`);
    showToast(`Welcome back, Driver ${found.name}!`, 'success');

    return { success: true, message: 'Login successful', driver: found };
  };

  const logoutDriver = () => {
    const driverName = currentDriver?.name || 'Driver';
    setCurrentDriver(null);
    setCurrentRole('CUSTOMER');
    saveToStorage('current_driver', null);
    saveToStorage('current_role', 'CUSTOMER');
    navigateTo('driver_login');
    showToast('Logged out of Driver Application', 'info');
    addActivity('DRIVER_LOGOUT', 'AUTH', `Driver ${driverName} logged out`);
  };

  const updateDriverProfile = (driverId: string, updates: Partial<Driver>) => {
    setDrivers(prev => prev.map(d => {
      if (d.driver_id === driverId) {
        const updated = { ...d, ...updates };
        if (currentDriver?.driver_id === driverId) {
          setCurrentDriver(updated);
          saveToStorage('current_driver', updated);
        }
        return updated;
      }
      return d;
    }));

    setBuses(prev => prev.map(b => {
      if ((b.driver_id === driverId || b.driver?.driver_id === driverId) && b.driver) {
        return {
          ...b,
          driver: { ...b.driver, ...updates }
        };
      }
      return b;
    }));

    showToast('Driver profile updated successfully', 'success');
    addActivity('DRIVER_PROFILE_UPDATED', 'AUTH', `Driver profile updated for ${driverId}`);
  };

  const updatePassengerBoardingStatus = (tripIdOrScheduleId: string, seatNumber: string, status: 'BOARDED' | 'NOT_BOARDED') => {
    const timestamp = status === 'BOARDED' ? new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : null;

    setBookings(prev => {
      return prev.map(booking => {
        const matchesTrip = !tripIdOrScheduleId || booking.scheduleId === tripIdOrScheduleId || booking.id === tripIdOrScheduleId;
        const hasSeat = (booking.selectedSeats || []).includes(seatNumber) || (booking.passengers || []).some(p => p.seatNumber === seatNumber);

        if (hasSeat) {
          const updatedPassengers = (booking.passengers || []).map(p => {
            if (p.seatNumber === seatNumber) {
              return {
                ...p,
                boardingStatus: status,
                boardedAt: timestamp
              };
            }
            return p;
          });
          return {
            ...booking,
            passengers: updatedPassengers
          };
        }
        return booking;
      });
    });

    addActivity('BOARDING_STATUS_CHANGED', 'BOOKING', `Seat ${seatNumber} marked as ${status} by driver`);
    showToast(`Seat ${seatNumber} marked as ${status === 'BOARDED' ? 'Boarded' : 'Not Boarded'}`, 'success');
  };

  const updateTripStatus = (tripId: string, status: TripStatus) => {
    const timeNow = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setSchedules(prev => prev.map(s => {
      if (s.id === tripId) {
        return {
          ...s,
          tripStatus: status,
          status: status === 'In Progress' ? 'IN_TRANSIT' : status === 'Completed' ? 'COMPLETED' : status === 'Cancelled' ? 'CANCELLED' : 'SCHEDULED',
          startedAt: status === 'In Progress' ? (s.startedAt || timeNow) : s.startedAt,
          completedAt: status === 'Completed' ? (s.completedAt || timeNow) : s.completedAt
        };
      }
      return s;
    }));

    addActivity('TRIP_STATUS_UPDATED', 'SCHEDULE', `Trip ${tripId} status updated to ${status}`);
    showToast(`Trip status updated to ${status}`, 'success');
  };

  // Search & Booking Flow
  const setSearchParams = (params: { fromCity: string; toCity: string; travelDate: string; returnDate?: string; passengers: number }) => {
    setSearchParamsState(params);
    navigateTo('search');
    addActivity('SEARCH_BUSES', 'ROUTE', `Searched buses: ${params.fromCity} to ${params.toCity} on ${params.travelDate}`);
  };

  const selectBusAndSchedule = (bus: Bus, schedule: Schedule) => {
    setSelectedBus(bus);
    setSelectedSchedule(schedule);
    setSelectedSeatNumbers([]);
    setSelectedBoardingPoint(null);
    setSelectedDroppingPoint(null);
    setPassengers([]);
    setAppliedOffer(null);
    setSelectedFoodItems([]);
    navigateTo('seat_selection');
  };

  const toggleSeatSelection = (seatNumber: string) => {
    if (!selectedBus) return;
    const seatObj = seats.find(s => s.busId === selectedBus.id && s.seatNumber === seatNumber);
    if (!seatObj || seatObj.state === 'OCCUPIED' || seatObj.state === 'BLOCKED') {
      showToast('This seat is unavailable for booking.', 'error');
      return;
    }

    if (selectedSeatNumbers.includes(seatNumber)) {
      setSelectedSeatNumbers(prev => prev.filter(s => s !== seatNumber));
    } else {
      if (selectedSeatNumbers.length >= 6) {
        showToast('You can select a maximum of 6 seats per booking.', 'info');
        return;
      }
      setSelectedSeatNumbers(prev => [...prev, seatNumber]);
    }
  };

  const clearSeatSelection = () => {
    setSelectedSeatNumbers([]);
  };

  const setBoardingAndDropping = (
    boarding: { id: string; name: string; landmark: string; address: string; time: string },
    dropping: { id: string; name: string; landmark: string; address: string; time: string }
  ) => {
    setSelectedBoardingPoint(boarding);
    setSelectedDroppingPoint(dropping);
    // Initialize default passenger templates
    const initialPassengers: Passenger[] = selectedSeatNumbers.map((seatNum, idx) => ({
      seatNumber: seatNum,
      name: idx === 0 && currentUser ? currentUser.name : '',
      age: idx === 0 ? 30 : 25,
      gender: 'MALE'
    }));
    setPassengers(initialPassengers);
    navigateTo('passenger_details');
  };

  const setPassengerAndContactData = (passList: Passenger[], contact: ContactInfo) => {
    setPassengers(passList);
    setContactInfo(contact);
    navigateTo('offers');
  };

  const applyOfferCode = (code: string): { success: boolean; message: string } => {
    const offer = offers.find(o => o.code.toUpperCase() === code.toUpperCase() && o.status === 'ACTIVE');
    if (!offer) {
      return { success: false, message: 'Invalid or inactive promo code.' };
    }

    const { seatFaresTotal } = calculateFare();
    if (seatFaresTotal < offer.minBookingAmount) {
      return { success: false, message: `Minimum booking fare of ₹${offer.minBookingAmount} required for this coupon.` };
    }

    setAppliedOffer(offer);
    showToast(`Coupon '${offer.code}' applied successfully!`, 'success');
    return { success: true, message: `Coupon applied: ${offer.title}` };
  };

  const removeOfferCode = () => {
    setAppliedOffer(null);
    showToast('Coupon removed.', 'info');
  };

  const addFoodItem = (item: FoodItem) => {
    setSelectedFoodItems(prev => {
      const existing = prev.find(f => f.itemId === item.id);
      if (existing) {
        return prev.map(f => f.itemId === item.id ? { ...f, quantity: f.quantity + 1 } : f);
      }
      return [...prev, { itemId: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFoodItem = (itemId: string) => {
    setSelectedFoodItems(prev => {
      const existing = prev.find(f => f.itemId === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(f => f.itemId === itemId ? { ...f, quantity: f.quantity - 1 } : f);
      }
      return prev.filter(f => f.itemId !== itemId);
    });
  };

  const calculateFare = (): FareCalculation => {
    if (!selectedBus) {
      return {
        baseFarePerSeat: 0,
        seatCount: 0,
        seatFaresTotal: 0,
        taxes: 0,
        serviceFee: 0,
        foodTotal: 0,
        discount: 0,
        totalAmount: 0
      };
    }

    const baseFarePerSeat = selectedBus.baseFare;
    const busSeats = seats.filter(s => s.busId === selectedBus.id);

    // Sum specific seat prices
    let seatFaresTotal = 0;
    selectedSeatNumbers.forEach(seatNum => {
      const seatObj = busSeats.find(s => s.seatNumber === seatNum);
      seatFaresTotal += seatObj ? seatObj.price : baseFarePerSeat;
    });

    if (seatFaresTotal === 0 && selectedSeatNumbers.length > 0) {
      seatFaresTotal = baseFarePerSeat * selectedSeatNumbers.length;
    }

    const foodTotal = selectedFoodItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let discount = 0;
    if (appliedOffer) {
      if (appliedOffer.discountType === 'FLAT') {
        discount = appliedOffer.discountValue;
      } else {
        const calculated = Math.round((seatFaresTotal * appliedOffer.discountValue) / 100);
        discount = appliedOffer.maxDiscount ? Math.min(calculated, appliedOffer.maxDiscount) : calculated;
      }
    }

    const discountedSeatFare = Math.max(0, seatFaresTotal - discount);
    const taxes = Math.round((discountedSeatFare * settings.taxPercentage) / 100);
    const serviceFee = selectedSeatNumbers.length > 0 ? settings.serviceFee : 0;
    const totalAmount = Math.max(0, discountedSeatFare + taxes + serviceFee + foodTotal);

    return {
      baseFarePerSeat,
      seatCount: selectedSeatNumbers.length,
      seatFaresTotal,
      taxes,
      serviceFee,
      foodTotal,
      discount,
      totalAmount
    };
  };

  const processPayment = async (method: PaymentMethod, simulateSuccess: boolean): Promise<{ success: boolean; booking?: Booking; error?: string }> => {
    if (!simulateSuccess) {
      showToast('Payment Simulation: Transaction declined or failed by bank.', 'error');
      return { success: false, error: 'Transaction failed. Please retry with another payment option.' };
    }

    if (!selectedBus || !selectedSchedule || !selectedBoardingPoint || !selectedDroppingPoint) {
      return { success: false, error: 'Incomplete booking details.' };
    }

    const fare = calculateFare();
    const uniqueBookingId = `BUS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const custId = currentUser ? currentUser.id : `USR-GUEST-${Date.now()}`;
    const custName = contactInfo.fullName || 'Valued Passenger';

    const newBooking: Booking = {
      id: uniqueBookingId,
      customerId: custId,
      customerName: custName,
      customerEmail: contactInfo.email,
      customerPhone: contactInfo.phone,
      busId: selectedBus.id,
      busName: selectedBus.name,
      operator: selectedBus.operator,
      busType: selectedBus.busType,
      routeId: selectedSchedule.routeId,
      sourceCity: searchParams.fromCity,
      destinationCity: searchParams.toCity,
      travelDate: searchParams.travelDate,
      departureTime: selectedSchedule.departureTime,
      arrivalTime: selectedSchedule.arrivalTime,
      scheduleId: selectedSchedule.id,
      selectedSeats: [...selectedSeatNumbers],
      seatNumbers: [...selectedSeatNumbers],
      passengers: [...passengers],
      boardingPoint: { ...selectedBoardingPoint },
      droppingPoint: { ...selectedDroppingPoint },
      foodItems: [...selectedFoodItems],
      appliedOffer: appliedOffer ? { code: appliedOffer.code, discountAmount: fare.discount } : undefined,
      fareBreakdown: {
        baseFare: fare.baseFarePerSeat,
        seatFaresTotal: fare.seatFaresTotal,
        taxes: fare.taxes,
        serviceFee: fare.serviceFee,
        foodTotal: fare.foodTotal,
        discount: fare.discount,
        totalAmount: fare.totalAmount
      },
      totalAmount: fare.totalAmount,
      contactPhone: contactInfo.phone,
      userId: custId,
      status: 'CONFIRMED',
      paymentMethod: method,
      paymentStatus: 'SUCCESS',
      bookingStatus: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    // 1. Create Transaction
    const newTxn: PaymentTransaction = {
      id: `TXN-${Date.now()}`,
      bookingId: uniqueBookingId,
      customerId: custId,
      customerName: custName,
      amount: fare.totalAmount,
      paymentMethod: method,
      paymentStatus: 'SUCCESS',
      transactionRef: `${method}/SIMULATED/${Date.now()}`,
      date: new Date().toISOString()
    };

    // 2. Mark Seats as OCCUPIED in live seats state!
    setSeats(prevSeats =>
      prevSeats.map(seat => {
        if (seat.busId === selectedBus.id && selectedSeatNumbers.includes(seat.seatNumber)) {
          const matchingPass = passengers.find(p => p.seatNumber === seat.seatNumber);
          return {
            ...seat,
            state: 'OCCUPIED',
            bookedByGender: matchingPass ? matchingPass.gender : 'MALE'
          };
        }
        return seat;
      })
    );

    // 3. Update Bookings & Payments list
    setBookings(prev => [newBooking, ...prev]);
    setPayments(prev => [newTxn, ...prev]);

    // 4. Update coupon used count if used
    if (appliedOffer) {
      setOffers(prev => prev.map(o => o.id === appliedOffer.id ? { ...o, usedCount: o.usedCount + 1 } : o));
    }

    // 5. Notifications & Activity Logs
    addNotification({
      targetRole: 'CUSTOMER',
      targetUserId: custId,
      title: `Booking Confirmed: #${uniqueBookingId}`,
      message: `Your booking for ${selectedBus.name} (${searchParams.fromCity} to ${searchParams.toCity}) is confirmed for seats: ${selectedSeatNumbers.join(', ')}.`,
      type: 'BOOKING'
    });

    addNotification({
      targetRole: 'ADMIN',
      title: `New Booking #${uniqueBookingId}`,
      message: `${custName} booked ${selectedSeatNumbers.length} seat(s) on ${selectedBus.name}. Amount: ₹${fare.totalAmount}.`,
      type: 'BOOKING'
    });

    addActivity('BOOKING_CREATED', 'BOOKING', `Booking ${uniqueBookingId} created for ${custName} (${selectedSeatNumbers.join(', ')}) - ₹${fare.totalAmount}`);

    setLatestConfirmedBooking(newBooking);
    navigateTo('confirmation');
    return { success: true, booking: newBooking };
  };

  const cancelCustomerBooking = (bookingId: string, reason: string): { success: boolean; refundAmount: number } => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, refundAmount: 0 };

    const refund = Math.round(booking.fareBreakdown.totalAmount * ((100 - settings.cancellationDeductionPercent) / 100));

    // 1. Release Seats in live seats pool
    setSeats(prevSeats =>
      prevSeats.map(seat => {
        if (seat.busId === booking.busId && booking.selectedSeats.includes(seat.seatNumber)) {
          return { ...seat, state: 'AVAILABLE', bookedByGender: undefined };
        }
        return seat;
      })
    );

    // 2. Mark Booking Cancelled
    const updatedBooking: Booking = {
      ...booking,
      status: 'CANCELLED',
      bookingStatus: 'CANCELLED',
      cancelledAt: new Date().toISOString(),
      cancellationReason: reason,
      refundAmount: refund,
      refundStatus: 'APPROVED'
    };

    setBookings(prev => prev.map(b => b.id === bookingId ? updatedBooking : b));

    // 3. Update payment status to REFUNDED
    setPayments(prev =>
      prev.map(p => {
        if (p.bookingId === bookingId) {
          return {
            ...p,
            paymentStatus: 'REFUNDED',
            refundedAmount: refund,
            refundDate: new Date().toISOString(),
            refundReason: reason
          };
        }
        return p;
      })
    );

    // 4. Notifications & Activity Logs
    addNotification({
      targetRole: 'CUSTOMER',
      targetUserId: booking.customerId,
      title: `Booking Cancelled: #${bookingId}`,
      message: `Booking #${bookingId} has been cancelled. Refund of ₹${refund} approved.`,
      type: 'CANCELLATION'
    });

    const releasedSeatsStr = (booking.selectedSeats || booking.seatNumbers || []).join(', ');

    addNotification({
      targetRole: 'ADMIN',
      title: `Booking Cancelled #${bookingId}`,
      message: `${booking.customerName} cancelled booking #${bookingId}. Released seats: ${releasedSeatsStr}.`,
      type: 'CANCELLATION'
    });

    addActivity('BOOKING_CANCELLED', 'BOOKING', `Booking ${bookingId} cancelled by customer. Seats released: ${releasedSeatsStr}`);

    showToast(`Booking cancelled. Refund of ₹${refund} processed.`, 'info');
    return { success: true, refundAmount: refund };
  };

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBookingForDetails(booking);
    navigateTo('booking_details');
  };

  const viewBookingTicket = (booking: Booking) => {
    setSelectedBookingForTicket(booking);
    navigateTo('ticket');
  };

  const trackBusByScheduleOrBusId = (busId: string, scheduleId?: string) => {
    const tracking = trackingList.find(t => t.busId === busId || (scheduleId && t.scheduleId === scheduleId)) || trackingList[0];
    setSelectedTrackingBusId(tracking.busId);
    navigateTo('tracking');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // ADMIN CRUD IMPLEMENTATIONS
  const addBus = (busData: Omit<Bus, 'id' | 'rating' | 'totalRatings'>) => {
    const newId = `BUS-${Math.floor(100 + Math.random() * 900)}`;
    const driverId = busData.driver_id || busData.driverId || busData.driver?.driver_id || `DRV-${Math.floor(100 + Math.random() * 900)}`;

    const driverObj: Driver = busData.driver ? {
      driver_id: driverId,
      name: busData.driver.name,
      phone: busData.driver.phone,
      license_number: busData.driver.license_number,
      status: busData.driver.status || 'Active',
      assigned_bus_id: newId
    } : {
      driver_id: driverId,
      name: 'Assigned Driver',
      phone: '+91 98765 43210',
      license_number: `DL-AP-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active',
      assigned_bus_id: newId
    };

    const newBus: Bus = {
      ...busData,
      id: newId,
      rating: 4.8,
      totalRatings: 10,
      driver_id: driverId,
      driverId: driverId,
      driver: {
        driver_id: driverId,
        name: driverObj.name,
        phone: driverObj.phone,
        license_number: driverObj.license_number,
        status: driverObj.status
      }
    };

    // Update or insert driver in drivers list
    setDrivers(prev => {
      const idx = prev.findIndex(d => d.driver_id === driverId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...driverObj, assigned_bus_id: newId };
        return copy;
      }
      return [driverObj, ...prev];
    });

    setBuses(prev => [newBus, ...prev]);

    // Generate seats for the new bus
    const newSeats = generateSeatsForBus(newBus);
    setSeats(prev => [...prev, ...newSeats]);

    showToast(`Bus ${newBus.name} added with driver ${driverObj.name}.`, 'success');
    addActivity('BUS_ADDED', 'BUS', `Added bus: ${newBus.name} (${newBus.busNumber}) with driver ${driverObj.name}`);
  };

  const updateBus = (busId: string, updates: Partial<Bus>) => {
    setBuses(prev => prev.map(b => {
      if (b.id === busId) {
        const updatedDriver = updates.driver || (updates.driver_id ? {
          ...(b.driver || { name: 'Driver', phone: '', license_number: '', status: 'Active' as const }),
          driver_id: updates.driver_id
        } : b.driver);

        return {
          ...b,
          ...updates,
          driver: updatedDriver,
          driver_id: updates.driver_id || (updatedDriver ? updatedDriver.driver_id : b.driver_id),
          driverId: updates.driver_id || (updatedDriver ? updatedDriver.driver_id : b.driverId)
        };
      }
      return b;
    }));

    if (updates.driver) {
      const dObj = updates.driver;
      setDrivers(prev => {
        const idx = prev.findIndex(d => d.driver_id === dObj.driver_id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], ...dObj, assigned_bus_id: busId };
          return copy;
        } else {
          return [{ ...dObj, assigned_bus_id: busId }, ...prev];
        }
      });
    }

    showToast(`Bus details updated.`, 'success');
    addActivity('BUS_EDITED', 'BUS', `Updated bus: ${busId}`);
  };

  const deleteBus = (busId: string) => {
    const bus = buses.find(b => b.id === busId);
    setBuses(prev => prev.filter(b => b.id !== busId));
    setSeats(prev => prev.filter(s => s.busId !== busId));
    setSchedules(prev => prev.filter(s => s.busId !== busId));
    // Release assigned driver
    setDrivers(prev => prev.map(d => d.assigned_bus_id === busId ? { ...d, assigned_bus_id: null } : d));
    showToast(`Bus deleted.`, 'info');
    addActivity('BUS_DELETED', 'BUS', `Deleted bus: ${bus?.name || busId}`);
  };

  const addDriver = (driverData: Driver) => {
    setDrivers(prev => [driverData, ...prev]);
    if (driverData.assigned_bus_id) {
      setBuses(prev => prev.map(b => b.id === driverData.assigned_bus_id ? {
        ...b,
        driver_id: driverData.driver_id,
        driverId: driverData.driver_id,
        driver: {
          driver_id: driverData.driver_id,
          name: driverData.name,
          phone: driverData.phone,
          license_number: driverData.license_number,
          status: driverData.status
        }
      } : b));
    }
    showToast(`Driver ${driverData.name} registered.`, 'success');
    addActivity('DRIVER_ADDED', 'BUS', `Registered driver: ${driverData.name} (${driverData.driver_id})`);
  };

  const updateDriver = (driverId: string, updates: Partial<Driver>) => {
    setDrivers(prev => prev.map(d => d.driver_id === driverId ? { ...d, ...updates } : d));
    setBuses(prev => prev.map(b => {
      if (b.driver_id === driverId || b.driver?.driver_id === driverId) {
        return {
          ...b,
          driver: {
            ...(b.driver || { driver_id: driverId, name: '', phone: '', license_number: '', status: 'Active' as const }),
            ...updates
          }
        };
      }
      return b;
    }));
    showToast(`Driver details updated.`, 'success');
    addActivity('DRIVER_UPDATED', 'BUS', `Updated driver ${driverId}`);
  };

  const deleteDriver = (driverId: string) => {
    setDrivers(prev => prev.filter(d => d.driver_id !== driverId));
    setBuses(prev => prev.map(b => {
      if (b.driver_id === driverId || b.driver?.driver_id === driverId) {
        return {
          ...b,
          driver_id: undefined,
          driverId: undefined,
          driver: undefined
        };
      }
      return b;
    }));
    showToast(`Driver removed.`, 'info');
    addActivity('DRIVER_DELETED', 'BUS', `Removed driver ${driverId}`);
  };

  const assignDriverToBus = (busId: string, driver: Driver) => {
    setBuses(prev => prev.map(b => {
      if (b.id === busId) {
        return {
          ...b,
          driver_id: driver.driver_id,
          driverId: driver.driver_id,
          driver: {
            driver_id: driver.driver_id,
            name: driver.name,
            phone: driver.phone,
            license_number: driver.license_number,
            status: driver.status
          }
        };
      }
      if (b.id !== busId && (b.driver_id === driver.driver_id || b.driver?.driver_id === driver.driver_id)) {
        return {
          ...b,
          driver_id: undefined,
          driverId: undefined,
          driver: undefined
        };
      }
      return b;
    }));

    setDrivers(prev => prev.map(d => {
      if (d.driver_id === driver.driver_id) {
        return { ...d, ...driver, assigned_bus_id: busId };
      }
      if (d.assigned_bus_id === busId && d.driver_id !== driver.driver_id) {
        return { ...d, assigned_bus_id: null };
      }
      return d;
    }));

    showToast(`Driver ${driver.name} assigned to bus.`, 'success');
    addActivity('DRIVER_ASSIGNED', 'BUS', `Assigned driver ${driver.name} to bus ${busId}`);
  };

  const unassignDriverFromBus = (busId: string) => {
    setBuses(prev => prev.map(b => {
      if (b.id === busId) {
        return {
          ...b,
          driver_id: undefined,
          driverId: undefined,
          driver: undefined
        };
      }
      return b;
    }));
    setDrivers(prev => prev.map(d => d.assigned_bus_id === busId ? { ...d, assigned_bus_id: null } : d));
    showToast(`Driver removed from bus.`, 'info');
    addActivity('DRIVER_UNASSIGNED', 'BUS', `Unassigned driver from bus ${busId}`);
  };

  const toggleBusStatus = (busId: string) => {
    setBuses(prev => prev.map(b => {
      if (b.id === busId) {
        const nextStatus = b.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        addActivity(nextStatus === 'ACTIVE' ? 'BUS_ACTIVATED' : 'BUS_DEACTIVATED', 'BUS', `Bus ${b.name} set to ${nextStatus}`);
        return { ...b, status: nextStatus };
      }
      return b;
    }));
    showToast(`Bus status toggled.`, 'info');
  };

  const addRoute = (routeData: Omit<Route, 'id'>) => {
    const newId = `ROT-${Math.floor(100 + Math.random() * 900)}`;
    const newRoute: Route = { ...routeData, id: newId };
    setRoutes(prev => [newRoute, ...prev]);
    showToast(`Route ${newRoute.sourceCity} -> ${newRoute.destinationCity} added.`, 'success');
    addActivity('ROUTE_ADDED', 'ROUTE', `Added route: ${newRoute.sourceCity} to ${newRoute.destinationCity}`);
  };

  const updateRoute = (routeId: string, updates: Partial<Route>) => {
    setRoutes(prev => prev.map(r => r.id === routeId ? { ...r, ...updates } : r));
    showToast(`Route updated.`, 'success');
    addActivity('ROUTE_EDITED', 'ROUTE', `Updated route: ${routeId}`);
  };

  const deleteRoute = (routeId: string) => {
    setRoutes(prev => prev.filter(r => r.id !== routeId));
    showToast(`Route deleted.`, 'info');
    addActivity('ROUTE_DELETED', 'ROUTE', `Deleted route: ${routeId}`);
  };

  const toggleRouteStatus = (routeId: string) => {
    setRoutes(prev => prev.map(r => r.id === routeId ? { ...r, status: r.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : r));
    showToast(`Route status updated.`, 'info');
  };

  const addSchedule = (schData: Omit<Schedule, 'id'>) => {
    const newId = `SCH-${Math.floor(100 + Math.random() * 900)}`;
    const newSch: Schedule = { ...schData, id: newId };
    setSchedules(prev => [newSch, ...prev]);
    showToast(`Schedule created.`, 'success');
    addActivity('SCHEDULE_ADDED', 'SCHEDULE', `Added schedule ${newId} for bus ${newSch.busId}`);
  };

  const updateSchedule = (scheduleId: string, updates: Partial<Schedule>) => {
    setSchedules(prev => prev.map(s => s.id === scheduleId ? { ...s, ...updates } : s));
    showToast(`Schedule updated.`, 'success');
    addActivity('SCHEDULE_EDITED', 'SCHEDULE', `Updated schedule: ${scheduleId}`);
  };

  const deleteSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.filter(s => s.id !== scheduleId));
    showToast(`Schedule deleted.`, 'info');
    addActivity('SCHEDULE_DELETED', 'SCHEDULE', `Deleted schedule: ${scheduleId}`);
  };

  const addBoardingPoint = (pointData: Omit<BoardingPoint, 'id'>) => {
    const newId = `BP-${Date.now()}`;
    setBoardingPoints(prev => [...prev, { ...pointData, id: newId }]);
    showToast(`Boarding point added.`, 'success');
  };

  const updateBoardingPoint = (pointId: string, updates: Partial<BoardingPoint>) => {
    setBoardingPoints(prev => prev.map(p => p.id === pointId ? { ...p, ...updates } : p));
    showToast(`Boarding point updated.`, 'success');
  };

  const deleteBoardingPoint = (pointId: string) => {
    setBoardingPoints(prev => prev.filter(p => p.id !== pointId));
    showToast(`Boarding point removed.`, 'info');
  };

  const addDroppingPoint = (pointData: Omit<DroppingPoint, 'id'>) => {
    const newId = `DP-${Date.now()}`;
    setDroppingPoints(prev => [...prev, { ...pointData, id: newId }]);
    showToast(`Dropping point added.`, 'success');
  };

  const updateDroppingPoint = (pointId: string, updates: Partial<DroppingPoint>) => {
    setDroppingPoints(prev => prev.map(p => p.id === pointId ? { ...p, ...updates } : p));
    showToast(`Dropping point updated.`, 'success');
  };

  const deleteDroppingPoint = (pointId: string) => {
    setDroppingPoints(prev => prev.filter(p => p.id !== pointId));
    showToast(`Dropping point removed.`, 'info');
  };

  const updateSeatState = (busId: string, seatNumber: string, newState: SeatState) => {
    setSeats(prev =>
      prev.map(s => (s.busId === busId && s.seatNumber === seatNumber ? { ...s, state: newState } : s))
    );
    showToast(`Seat ${seatNumber} state changed to ${newState}.`, 'success');
    addActivity('SEAT_UPDATED', 'BUS', `Seat ${seatNumber} on bus ${busId} set to ${newState}`);
  };

  const addOffer = (offerData: Omit<Offer, 'id' | 'usedCount'>) => {
    const newId = `OFF-${Date.now()}`;
    const newOffer: Offer = { ...offerData, id: newId, usedCount: 0 };
    setOffers(prev => [newOffer, ...prev]);
    showToast(`Coupon ${newOffer.code} added.`, 'success');
    addActivity('OFFER_CREATED', 'OFFER', `Created offer: ${newOffer.code} (${newOffer.title})`);
  };

  const updateOffer = (offerId: string, updates: Partial<Offer>) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, ...updates } : o));
    showToast(`Offer updated.`, 'success');
    addActivity('OFFER_EDITED', 'OFFER', `Updated offer: ${offerId}`);
  };

  const deleteOffer = (offerId: string) => {
    setOffers(prev => prev.filter(o => o.id !== offerId));
    showToast(`Offer deleted.`, 'info');
    addActivity('OFFER_DELETED', 'OFFER', `Deleted offer: ${offerId}`);
  };

  const toggleOfferStatus = (offerId: string) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: o.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : o));
    showToast(`Offer status changed.`, 'info');
  };

  const updateCustomer = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    showToast(`Customer record updated.`, 'success');
    addActivity('CUSTOMER_EDITED', 'CUSTOMER', `Admin updated customer: ${userId}`);
  };

  const deleteCustomer = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast(`Customer account deleted.`, 'info');
    addActivity('CUSTOMER_DELETED', 'CUSTOMER', `Admin deleted customer: ${userId}`);
  };

  const cancelBookingByAdmin = (bookingId: string, reason: string) => {
    cancelCustomerBooking(bookingId, `Admin Cancel: ${reason}`);
    showToast(`Booking #${bookingId} cancelled by Admin.`, 'info');
  };

  const approveRefund = (transactionId: string) => {
    setPayments(prev => prev.map(p => p.id === transactionId ? { ...p, paymentStatus: 'REFUNDED', refundDate: new Date().toISOString() } : p));
    showToast(`Refund approved for transaction ${transactionId}.`, 'success');
    addActivity('REFUND_APPROVED', 'PAYMENT', `Approved refund for ${transactionId}`);
  };

  const rejectRefund = (transactionId: string) => {
    setPayments(prev => prev.map(p => p.id === transactionId ? { ...p, paymentStatus: 'FAILED', refundReason: 'Rejected by admin' } : p));
    showToast(`Refund request rejected.`, 'info');
    addActivity('REFUND_REJECTED', 'PAYMENT', `Rejected refund for ${transactionId}`);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Settings saved successfully.', 'success');
    addActivity('SETTINGS_UPDATED', 'SYSTEM', 'Application configuration updated');
  };

  const resetAllData = () => {
    localStorage.clear();
    setUsers(SEED_USERS);
    setCurrentUser(SEED_USERS[0]);
    setCurrentRole('CUSTOMER');
    setBuses(SEED_BUSES);
    setDrivers(SEED_DRIVERS);
    setRoutes(SEED_ROUTES);
    setSchedules(SEED_SCHEDULES);
    setSeats(SEED_SEATS);
    setBookings(SEED_BOOKINGS);
    setPayments(SEED_PAYMENTS);
    setOffers(SEED_OFFERS);
    setBoardingPoints(SEED_BOARDING_POINTS);
    setDroppingPoints(SEED_DROPPING_POINTS);
    setTrackingList(SEED_TRACKING);
    setNotifications(SEED_NOTIFICATIONS);
    setActivityLogs(SEED_ACTIVITY_LOGS);
    setSettings(INITIAL_SETTINGS);
    showToast('All data has been reset to original seed dataset.', 'success');
  };

  // Aliases for subcomponents
  const currentBooking = latestConfirmedBooking || selectedBookingForTicket || selectedBookingForDetails || bookings[0] || null;
  const boardingPoint = selectedBoardingPoint;
  const droppingPoint = selectedDroppingPoint;
  const contactDetails = contactInfo;
  const setPassengerInfo = (newPassengers: Passenger[]) => setPassengers(newPassengers);
  const updateContactInfo = (contact: Partial<ContactInfo>) => setContactInfo(prev => ({ ...prev, ...contact }));
  const applyOffer = (code: string) => applyOfferCode(code);
  const removeOffer = () => removeOfferCode();
  const foodAddons = selectedFoodItems;
  const updateFoodAddonQuantity = (item: FoodItem, qty: number) => {
    if (qty > 0) addFoodItem(item);
    else removeFoodItem(item.id);
  };
  const openTicketView = (booking: Booking) => {
    setSelectedBookingForTicket(booking);
    navigateTo('ticket_view');
  };
  const openTrackingView = (booking: Booking) => {
    setSelectedTrackingBusId(booking.busId);
    navigateTo('tracking');
  };
  const updateUser = (name: string, phone: string) => updateUserProfile(name, phone);

  useEffect(() => { saveToStorage('admin_view', adminView); }, [adminView]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentView,
        adminView,
        setAdminView,
        users,
        buses,
        drivers,
        routes,
        schedules,
        seats,
        bookings,
        payments,
        offers,
        boardingPoints,
        droppingPoints,
        foodItems,
        trackingList,
        notifications,
        activityLogs,
        settings,

        // Aliases
        currentBooking,
        boardingPoint,
        droppingPoint,
        contactDetails,
        setPassengerInfo,
        setContactInfo: updateContactInfo,
        applyOffer,
        removeOffer,
        foodAddons,
        updateFoodAddonQuantity,
        openTicketView,
        openTrackingView,
        updateUser,

        searchParams,
        selectedBus,
        selectedSchedule,
        selectedSeatNumbers,
        selectedBoardingPoint,
        selectedDroppingPoint,
        passengers,
        contactInfo,
        appliedOffer,
        selectedFoodItems,
        latestConfirmedBooking,
        selectedBookingForDetails,
        selectedBookingForTicket,
        selectedTrackingBusId,

        showCustomerLoginModal,
        showAdminLoginModal,
        toastMessage,
        authRedirect,
        setAuthRedirect,

        navigateTo,
        setCurrentRole,
        setCustomerLoginModal,
        setAdminLoginModal,
        showToast,
        requireLoginThen,

        loginAsCustomer,
        loginCustomer,
        loginWithOtp,
        registerCustomer,
        loginAsAdmin,
        logout,
        updateUserProfile,

        // Driver App
        currentDriver,
        driverView,
        setDriverView: setDriverViewState,
        selectedDriverTripId,
        setSelectedDriverTripId: setSelectedDriverTripIdState,
        loginDriver,
        logoutDriver,
        updateDriverProfile,
        updatePassengerBoardingStatus,
        updateTripStatus,

        setSearchParams,
        selectBusAndSchedule,
        toggleSeatSelection,
        clearSeatSelection,
        setBoardingAndDropping,
        setPassengerAndContactData,
        applyOfferCode,
        removeOfferCode,
        addFoodItem,
        removeFoodItem,
        calculateFare,
        processPayment,
        cancelCustomerBooking,
        viewBookingDetails,
        viewBookingTicket,
        trackBusByScheduleOrBusId,

        markNotificationAsRead,
        markAllNotificationsAsRead,

        addBus,
        updateBus,
        deleteBus,
        toggleBusStatus,
        addDriver,
        updateDriver,
        deleteDriver,
        assignDriverToBus,
        unassignDriverFromBus,
        addRoute,
        updateRoute,
        deleteRoute,
        toggleRouteStatus,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        addBoardingPoint,
        updateBoardingPoint,
        deleteBoardingPoint,
        addDroppingPoint,
        updateDroppingPoint,
        deleteDroppingPoint,
        updateSeatState,
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferStatus,
        updateCustomer,
        deleteCustomer,
        cancelBookingByAdmin,
        approveRefund,
        rejectRefund,
        updateSettings,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
