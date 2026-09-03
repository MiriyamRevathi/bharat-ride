export type BusType = 'AC Sleeper (2+1)' | 'AC Semi-Sleeper (2+2)' | 'Non-AC Sleeper (2+1)' | 'Volvo Multi-Axle AC (2+2)' | 'BharatBenz AC Seater (2+2)' | 'Electric AC Sleeper (2+1)';

export type BusOperator = 'Bharat Super Express' | 'Vayu Travels' | 'Kaveri Intercity' | 'Garuda Premium Lines' | 'Deccan Royal' | 'Orange City Lines' | 'Kallada Luxury' | 'Neeta Tours';

export type DriverStatus = 'Active' | 'Inactive' | 'On Leave';

export interface Driver {
  driver_id: string;
  name: string;
  phone: string;
  license_number: string;
  password?: string;
  status: DriverStatus;
  assigned_bus_id?: string | null;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Bus {
  id: string;
  name: string;
  operator: BusOperator;
  busNumber: string;
  busType: BusType;
  totalSeats: number;
  layoutType: 'sleeper_2_1' | 'seater_2_2' | 'semi_sleeper_2_2';
  hasUpperDeck?: boolean;
  rating: number;
  totalRatings: number;
  amenities: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  baseFare: number;
  cancellationPolicy: string;
  features: string[];
  driver_id?: string;
  driverId?: string;
  driver?: {
    driver_id: string;
    name: string;
    phone: string;
    license_number: string;
    status: DriverStatus;
  };
}

export interface Route {
  id: string;
  sourceCity: string;
  destinationCity: string;
  distanceKm: number;
  estimatedDuration: string;
  popularStops: string[];
  popular?: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface BoardingPoint {
  id: string;
  city: string;
  name: string;
  landmark: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface DroppingPoint {
  id: string;
  city: string;
  name: string;
  landmark: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export type TripStatus = 'Upcoming' | 'Ready' | 'In Progress' | 'Completed' | 'Cancelled';

export interface RouteStopDetail {
  stopName: string;
  arrivalTime: string;
  departureTime: string;
  distanceKm?: number;
}

export interface Schedule {
  id: string;
  busId: string;
  routeId: string;
  departureTime: string; // "21:30" or "08:30 AM"
  arrivalTime: string;   // "06:00" or "02:30 PM"
  nextDayArrival: boolean;
  travelDate: string;    // "YYYY-MM-DD" or applicable recurring
  frequency?: string;
  boardingPoints: { pointId: string; time: string }[];
  droppingPoints: { pointId: string; time: string }[];
  fareMultiplier: number;
  status: 'SCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'IN_TRANSIT';
  tripStatus?: TripStatus;
  startedAt?: string | null;
  completedAt?: string | null;
  routeStops?: RouteStopDetail[];
}

export type SeatState = 'AVAILABLE' | 'SELECTED' | 'OCCUPIED' | 'BLOCKED';
export type SeatStatus = SeatState;
export type SeatType = 'SEATER' | 'SLEEPER' | 'SEMI_SLEEPER';
export type DeckType = 'LOWER' | 'UPPER';

export interface Seat {
  id: string; // e.g. "bus-1-U1", "bus-1-L12"
  busId: string;
  seatNumber: string;
  deck: DeckType;
  row: number;
  column: number;
  seatType: SeatType;
  state: SeatState;
  status?: SeatState;
  price: number;
  isLadiesSeat?: boolean;
  isLadies?: boolean;
  bookedByGender?: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface Passenger {
  seatNumber: string;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phone?: string;
  pickup?: string;
  drop?: string;
  boardingStatus?: 'BOARDED' | 'NOT_BOARDED';
  boardedAt?: string | null;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  state: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  maxDiscount?: number;
  minBookingAmount: number;
  validUntil: string;
  applicableRoutes?: string[]; // empty means all
  usageLimit: number;
  usedCount: number;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: 'VEG' | 'NON_VEG' | 'SNACKS' | 'BEVERAGES' | 'WATER';
  price: number;
  image: string;
}

export interface SelectedFoodItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

export type PaymentMethod = 'DEMO_CARD' | 'DEMO_UPI' | 'DEMO_WALLET' | 'PAY_AT_BOARDING';
export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
export type BookingStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  method?: PaymentMethod;
  paymentStatus: PaymentStatus;
  status?: PaymentStatus;
  transactionRef: string;
  date: string;
  createdAt?: string;
  refundedAmount?: number;
  refundDate?: string;
  refundReason?: string;
}

export interface Booking {
  id: string; // e.g., "BUS-2026-10492"
  customerId: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  contactPhone?: string;
  busId: string;
  busName: string;
  operator: BusOperator;
  busType: BusType;
  routeId: string;
  sourceCity: string;
  destinationCity: string;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  scheduleId: string;
  selectedSeats: string[]; // seat numbers
  seatNumbers?: string[];
  passengers: Passenger[];
  boardingPoint: {
    id: string;
    name: string;
    landmark: string;
    address: string;
    time: string;
  };
  droppingPoint: {
    id: string;
    name: string;
    landmark: string;
    address: string;
    time: string;
  };
  foodItems: SelectedFoodItem[];
  appliedOffer?: {
    code: string;
    discountAmount: number;
  };
  fareBreakdown: {
    baseFare: number;
    seatFaresTotal: number;
    taxes: number;
    serviceFee: number;
    foodTotal: number;
    discount: number;
    totalAmount: number;
  };
  totalAmount?: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  status?: BookingStatus;
  createdAt: string;
  cancelledAt?: string;
  cancellationReason?: string;
  refundAmount?: number;
  refundStatus?: 'NONE' | 'PENDING' | 'APPROVED' | 'PROCESSED' | 'REJECTED';
}

export interface CancellationRecord {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  route: string;
  busName: string;
  seats: string[];
  originalAmount: number;
  refundAmount: number;
  cancellationReason: string;
  cancelledDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSED';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  city?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'DRIVER';
  driver_id?: string;
  avatar?: string;
  registeredDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  totalTrips?: number;
}

export interface TrackingCheckpoint {
  name: string;
  city: string;
  scheduledTime: string;
  actualTime?: string;
  status: 'PASSED' | 'CURRENT' | 'UPCOMING';
  notes?: string;
}

export interface BusTracking {
  busId: string;
  scheduleId: string;
  routeId: string;
  busName: string;
  busNumber: string;
  sourceCity: string;
  destinationCity: string;
  currentLocationName: string;
  currentSpeedKmH: number;
  progressPercent: number;
  status: 'ON_TIME' | 'DELAYED_15_MIN' | 'EARLY' | 'ARRIVED';
  estimatedArrival: string;
  lastUpdated: string;
  driverName: string;
  driverContact: string;
  checkpoints: TrackingCheckpoint[];
}

export interface AppNotification {
  id: string;
  targetRole: 'CUSTOMER' | 'ADMIN' | 'DRIVER' | 'ALL';
  targetUserId?: string;
  targetDriverId?: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'PAYMENT' | 'CANCELLATION' | 'SCHEDULE' | 'OFFER' | 'SYSTEM' | 'ALERT' | 'DRIVER_TRIP';
  read: boolean;
  createdAt: string;
  linkAction?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: 'ADMIN' | 'CUSTOMER' | 'DRIVER';
  action: string;
  module: 'BUS' | 'ROUTE' | 'SCHEDULE' | 'CUSTOMER' | 'BOOKING' | 'OFFER' | 'PAYMENT' | 'SYSTEM' | 'AUTH';
  description: string;
}

export interface AppSettings {
  appName: string;
  supportPhone: string;
  supportEmail: string;
  serviceFee: number;
  taxPercentage: number;
  freeCancellationHours: number;
  cancellationDeductionPercent: number;
  currencySymbol: string;
  enableLiveTrackingDemo: boolean;
  maintenanceMode: boolean;
}
