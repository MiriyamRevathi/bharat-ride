import {
  User, Bus, Route, BoardingPoint, DroppingPoint, Schedule, Seat,
  Offer, FoodItem, Booking, PaymentTransaction, BusTracking,
  AppNotification, ActivityLog, AppSettings, Driver
} from '../types';

export const INITIAL_SETTINGS: AppSettings = {
  appName: 'BharatRide',
  supportPhone: '+91 1800-419-8999',
  supportEmail: 'care@bharatride.in',
  serviceFee: 45,
  taxPercentage: 5,
  freeCancellationHours: 12,
  cancellationDeductionPercent: 15,
  currencySymbol: '₹',
  enableLiveTrackingDemo: true,
  maintenanceMode: false
};

export const SEED_USERS: User[] = [
  {
    id: 'USR-CUST-001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@gmail.com',
    phone: '+91 98480 22334',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    registeredDate: '2025-11-10',
    status: 'ACTIVE',
    totalTrips: 8
  },
  {
    id: 'USR-CUST-002',
    name: 'Priya Patel',
    email: 'priya.patel@outlook.com',
    phone: '+91 94401 55667',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    registeredDate: '2026-01-15',
    status: 'ACTIVE',
    totalTrips: 5
  },
  {
    id: 'USR-CUST-003',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@gmail.com',
    phone: '+91 98492 88441',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    registeredDate: '2026-02-01',
    status: 'ACTIVE',
    totalTrips: 4
  },
  {
    id: 'USR-CUST-004',
    name: 'Venkat Rao',
    email: 'venkat.rao@yahoo.co.in',
    phone: '+91 97000 12345',
    role: 'CUSTOMER',
    registeredDate: '2026-02-14',
    status: 'ACTIVE',
    totalTrips: 2
  },
  {
    id: 'USR-CUST-005',
    name: 'Kavita Sundaram',
    email: 'kavita.s@gmail.com',
    phone: '+91 98840 99881',
    role: 'CUSTOMER',
    registeredDate: '2026-03-02',
    status: 'ACTIVE',
    totalTrips: 6
  },
  {
    id: 'USR-CUST-006',
    name: 'Arjun Deshmukh',
    email: 'arjun.deshmukh@gmail.com',
    phone: '+91 98220 33441',
    role: 'CUSTOMER',
    registeredDate: '2026-03-18',
    status: 'ACTIVE',
    totalTrips: 3
  },
  {
    id: 'USR-CUST-007',
    name: 'Meera Nambiar',
    email: 'meera.nambiar@gmail.com',
    phone: '+91 94470 12890',
    role: 'CUSTOMER',
    registeredDate: '2026-04-05',
    status: 'ACTIVE',
    totalTrips: 1
  },
  {
    id: 'USR-CUST-008',
    name: 'Suresh Kumar',
    email: 'suresh.kumar@rediffmail.com',
    phone: '+91 98410 77654',
    role: 'CUSTOMER',
    registeredDate: '2026-04-12',
    status: 'ACTIVE',
    totalTrips: 7
  },
  {
    id: 'USR-CUST-009',
    name: 'Divya Agarwal',
    email: 'divya.agarwal@gmail.com',
    phone: '+91 99100 44552',
    role: 'CUSTOMER',
    registeredDate: '2026-05-20',
    status: 'ACTIVE',
    totalTrips: 2
  },
  {
    id: 'USR-CUST-010',
    name: 'Rohan Joshi',
    email: 'rohan.joshi@gmail.com',
    phone: '+91 98200 99883',
    role: 'CUSTOMER',
    registeredDate: '2026-06-01',
    status: 'ACTIVE',
    totalTrips: 4
  },
  {
    id: 'USR-CUST-011',
    name: 'Sneha Chawla',
    email: 'sneha.chawla@gmail.com',
    phone: '+91 98111 66778',
    role: 'CUSTOMER',
    registeredDate: '2026-06-15',
    status: 'ACTIVE',
    totalTrips: 3
  },
  {
    id: 'USR-CUST-012',
    name: 'Manish Verma',
    email: 'manish.v@gmail.com',
    phone: '+91 99880 22119',
    role: 'CUSTOMER',
    registeredDate: '2026-07-02',
    status: 'ACTIVE',
    totalTrips: 5
  },
  {
    id: 'USR-CUST-013',
    name: 'Deepika Sen',
    email: 'deepika.sen@gmail.com',
    phone: '+91 98300 44332',
    role: 'CUSTOMER',
    registeredDate: '2026-07-19',
    status: 'ACTIVE',
    totalTrips: 1
  },
  {
    id: 'USR-CUST-014',
    name: 'Karthik Raman',
    email: 'karthik.raman@gmail.com',
    phone: '+91 98400 88771',
    role: 'CUSTOMER',
    registeredDate: '2026-07-28',
    status: 'ACTIVE',
    totalTrips: 9
  },
  {
    id: 'USR-CUST-015',
    name: 'Pooja Hegde',
    email: 'pooja.hegde@gmail.com',
    phone: '+91 98860 11223',
    role: 'CUSTOMER',
    registeredDate: '2026-08-03',
    status: 'ACTIVE',
    totalTrips: 2
  },
  {
    id: 'USR-CUST-016',
    name: 'Naveen Choudhary',
    email: 'naveen.ch@gmail.com',
    phone: '+91 94140 33221',
    role: 'CUSTOMER',
    registeredDate: '2026-08-11',
    status: 'ACTIVE',
    totalTrips: 3
  },
  {
    id: 'USR-CUST-017',
    name: 'Swati Kulkarni',
    email: 'swati.k@gmail.com',
    phone: '+91 98230 44556',
    role: 'CUSTOMER',
    registeredDate: '2026-08-18',
    status: 'ACTIVE',
    totalTrips: 2
  },
  {
    id: 'USR-CUST-018',
    name: 'Vikramaditya Bose',
    email: 'vikram.bose@gmail.com',
    phone: '+91 98310 99887',
    role: 'CUSTOMER',
    registeredDate: '2026-08-22',
    status: 'ACTIVE',
    totalTrips: 1
  },
  {
    id: 'USR-CUST-019',
    name: 'Sunita Naidu',
    email: 'sunita.naidu@gmail.com',
    phone: '+91 98481 00992',
    role: 'CUSTOMER',
    registeredDate: '2026-08-25',
    status: 'ACTIVE',
    totalTrips: 4
  },
  {
    id: 'USR-CUST-020',
    name: 'Aditya Narayanan',
    email: 'aditya.n@gmail.com',
    phone: '+91 99400 33445',
    role: 'CUSTOMER',
    registeredDate: '2026-08-30',
    status: 'ACTIVE',
    totalTrips: 3
  },
  {
    id: 'USR-ADM-001',
    name: 'Vikram Mehta',
    email: 'admin@bharatride.in',
    phone: '+91 98201 00000',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    registeredDate: '2025-01-01',
    status: 'ACTIVE'
  }
];

export const SEED_DRIVERS: Driver[] = [
  {
    driver_id: 'DRV-001',
    name: 'Raj Kumar',
    phone: '+91 98765 43210',
    license_number: 'DL-AP-2026-001',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-101'
  },
  {
    driver_id: 'DRV-002',
    name: 'Suresh Varma',
    phone: '+91 94401 23456',
    license_number: 'DL-AP-2024-002',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-102'
  },
  {
    driver_id: 'DRV-003',
    name: 'Ramesh Naik',
    phone: '+91 98480 34567',
    license_number: 'DL-KA-2025-003',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-103'
  },
  {
    driver_id: 'DRV-004',
    name: 'Anand Reddy',
    phone: '+91 97001 45678',
    license_number: 'DL-TN-2023-004',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-104'
  },
  {
    driver_id: 'DRV-005',
    name: 'Balwant Singh',
    phone: '+91 98220 56789',
    license_number: 'DL-MH-2022-005',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-105'
  },
  {
    driver_id: 'DRV-006',
    name: 'Venkat Ramana',
    phone: '+91 98850 67890',
    license_number: 'DL-TS-2025-006',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-106'
  },
  {
    driver_id: 'DRV-007',
    name: 'Manoj Nair',
    phone: '+91 94470 78901',
    license_number: 'DL-KL-2024-007',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-107'
  },
  {
    driver_id: 'DRV-008',
    name: 'Dilip Shinde',
    phone: '+91 98230 89012',
    license_number: 'DL-MH-2023-008',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-108'
  },
  {
    driver_id: 'DRV-009',
    name: 'Harvinder Singh',
    phone: '+91 98110 90123',
    license_number: 'DL-DL-2025-009',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-109'
  },
  {
    driver_id: 'DRV-010',
    name: 'Praveen Sawant',
    phone: '+91 98200 01234',
    license_number: 'DL-GA-2024-010',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: 'BUS-110'
  },
  {
    driver_id: 'DRV-011',
    name: 'Vikram Rathore',
    phone: '+91 98930 11223',
    license_number: 'DL-RJ-2025-011',
    password: "driver123",
    status: 'Active',
    assigned_bus_id: null
  },
  {
    driver_id: 'DRV-012',
    name: 'Santosh Patil',
    phone: '+91 98690 33445',
    license_number: 'DL-MH-2026-012',
    password: "driver123",
    status: 'On Leave',
    assigned_bus_id: null
  }
];

export const SEED_BUSES: Bus[] = [
  {
    id: 'BUS-101',
    name: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busNumber: 'TS 09 UB 7812',
    busType: 'Express AC Sleeper' as any,
    totalSeats: 36,
    layoutType: 'seater_2_2',
    hasUpperDeck: false,
    rating: 4.8,
    totalRatings: 1420,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Live Tracking', 'Emergency Exit'],
    status: 'ACTIVE',
    baseFare: 850,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Reclining Ergonomic Seats', 'Individual AC Vents', 'Air Suspension Ride'],
    driver_id: 'DRV-001',
    driver: {
      driver_id: 'DRV-001',
      name: 'Raj Kumar',
      phone: '+91 98765 43210',
      license_number: 'DL-AP-2026-001',
      status: 'Active'
    }
  },
  {
    id: 'BUS-102',
    name: 'Vayu Royal Class AC Sleeper',
    operator: 'Vayu Travels',
    busNumber: 'AP 16 TZ 4509',
    busType: 'AC Sleeper (2+1)',
    totalSeats: 30,
    layoutType: 'sleeper_2_1',
    hasUpperDeck: true,
    rating: 4.7,
    totalRatings: 980,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Pillow', 'Reading Light', 'Live Tracking'],
    status: 'ACTIVE',
    baseFare: 1100,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Spacious Single and Double Berths', 'Noise Isolation Cabin', 'Fresh Bed Linens'],
    driver_id: 'DRV-002',
    driver: {
      driver_id: 'DRV-002',
      name: 'Suresh Varma',
      phone: '+91 94401 23456',
      license_number: 'DL-AP-2024-002',
      status: 'Active'
    }
  },
  {
    id: 'BUS-103',
    name: 'Bharat Star Electric Intercity',
    operator: 'Bharat Super Express',
    busNumber: 'KA 01 EK 9021',
    busType: 'Electric AC Sleeper (2+1)',
    totalSeats: 30,
    layoutType: 'sleeper_2_1',
    hasUpperDeck: true,
    rating: 4.9,
    totalRatings: 1850,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Reading Light', 'Live Tracking', 'Snack Pack'],
    status: 'ACTIVE',
    baseFare: 1250,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['100% Zero Emission Quiet Ride', 'High Speed USB-C Power Ports', 'Clean Air HEPA Filtration'],
    driver_id: 'DRV-003',
    driver: {
      driver_id: 'DRV-003',
      name: 'Ramesh Naik',
      phone: '+91 98480 34567',
      license_number: 'DL-KA-2025-003',
      status: 'Active'
    }
  },
  {
    id: 'BUS-104',
    name: 'Kaveri Diamond Semi-Sleeper',
    operator: 'Kaveri Intercity',
    busNumber: 'TN 02 BK 3341',
    busType: 'AC Semi-Sleeper (2+2)',
    totalSeats: 40,
    layoutType: 'semi_sleeper_2_2',
    hasUpperDeck: false,
    rating: 4.5,
    totalRatings: 630,
    amenities: ['AC', 'Charging Point', 'Water Bottle', 'Live Tracking', 'CCTV'],
    status: 'ACTIVE',
    baseFare: 716,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Calf Support Leg-Rests', 'Wide Window Views', 'Luggage Tagging'],
    driver_id: 'DRV-004',
    driver: {
      driver_id: 'DRV-004',
      name: 'Anand Reddy',
      phone: '+91 97001 45678',
      license_number: 'DL-TN-2023-004',
      status: 'Active'
    }
  },
  {
    id: 'BUS-105',
    name: 'Deccan Express Non-AC Sleeper',
    operator: 'Deccan Royal',
    busNumber: 'MH 12 CR 1199',
    busType: 'Non-AC Sleeper (2+1)',
    totalSeats: 30,
    layoutType: 'sleeper_2_1',
    hasUpperDeck: true,
    rating: 4.2,
    totalRatings: 410,
    amenities: ['Charging Point', 'Pillow', 'Reading Light', 'Emergency Exit'],
    status: 'ACTIVE',
    baseFare: 550,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Affordable Long Distance Berths', 'Spacious Boot Space'],
    driver_id: 'DRV-005',
    driver: {
      driver_id: 'DRV-005',
      name: 'Balwant Singh',
      phone: '+91 98220 56789',
      license_number: 'DL-MH-2022-005',
      status: 'Active'
    }
  },
  {
    id: 'BUS-106',
    name: 'Orange Platinum BharatBenz AC',
    operator: 'Orange City Lines',
    busNumber: 'TS 07 EA 5522',
    busType: 'BharatBenz AC Seater (2+2)',
    totalSeats: 36,
    layoutType: 'seater_2_2',
    hasUpperDeck: false,
    rating: 4.6,
    totalRatings: 840,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle', 'Live Tracking', 'CCTV'],
    status: 'ACTIVE',
    baseFare: 750,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Smooth German Suspension', 'Leatherette Seating', 'Individual LED Lights'],
    driver_id: 'DRV-006',
    driver: {
      driver_id: 'DRV-006',
      name: 'Venkat Ramana',
      phone: '+91 98850 67890',
      license_number: 'DL-TS-2025-006',
      status: 'Active'
    }
  },
  {
    id: 'BUS-107',
    name: 'Kallada King Gold Sleeper',
    operator: 'Kallada Luxury',
    busNumber: 'KL 07 CD 8820',
    busType: 'AC Sleeper (2+1)',
    totalSeats: 30,
    layoutType: 'sleeper_2_1',
    hasUpperDeck: true,
    rating: 4.7,
    totalRatings: 1120,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Pillow', 'Live Tracking', 'Water Bottle'],
    status: 'ACTIVE',
    baseFare: 1150,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Privacy Curtains', 'Plush Mattresses', 'Punctual Operations'],
    driver_id: 'DRV-007',
    driver: {
      driver_id: 'DRV-007',
      name: 'Manoj Nair',
      phone: '+91 94470 78901',
      license_number: 'DL-KL-2024-007',
      status: 'Active'
    }
  },
  {
    id: 'BUS-108',
    name: 'Neeta Grand Cruiser Multi-Axle',
    operator: 'Neeta Tours',
    busNumber: 'MH 04 AX 6644',
    busType: 'Volvo Multi-Axle AC (2+2)',
    totalSeats: 40,
    layoutType: 'seater_2_2',
    hasUpperDeck: false,
    rating: 4.4,
    totalRatings: 520,
    amenities: ['AC', 'Charging Point', 'Water Bottle', 'Emergency Exit', 'Live Tracking'],
    status: 'ACTIVE',
    baseFare: 700,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Push Back Seats', 'Central Entertainment Screen'],
    driver_id: 'DRV-008',
    driver: {
      driver_id: 'DRV-008',
      name: 'Dilip Shinde',
      phone: '+91 98230 89012',
      license_number: 'DL-MH-2023-008',
      status: 'Active'
    }
  },
  {
    id: 'BUS-109',
    name: 'Bharat Prime Executive AC Sleeper',
    operator: 'Bharat Super Express',
    busNumber: 'DL 01 AA 2314',
    busType: 'AC Sleeper (2+1)',
    totalSeats: 30,
    layoutType: 'sleeper_2_1',
    hasUpperDeck: true,
    rating: 4.8,
    totalRatings: 940,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Pillow', 'Live Tracking', 'Water Bottle'],
    status: 'ACTIVE',
    baseFare: 950,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Express Highway FastTag', 'Curtained Pods', 'GPS Fleet Monitored'],
    driver_id: 'DRV-009',
    driver: {
      driver_id: 'DRV-009',
      name: 'Harvinder Singh',
      phone: '+91 98110 90123',
      license_number: 'DL-DL-2025-009',
      status: 'Active'
    }
  },
  {
    id: 'BUS-110',
    name: 'Vayu Night Rider Sleeper',
    operator: 'Vayu Travels',
    busNumber: 'GA 03 Z 9911',
    busType: 'AC Sleeper (2+1)',
    totalSeats: 30,
    layoutType: 'sleeper_2_1',
    hasUpperDeck: true,
    rating: 4.6,
    totalRatings: 790,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Live Tracking', 'Reading Light'],
    status: 'ACTIVE',
    baseFare: 1300,
    cancellationPolicy: 'Full refund if cancelled 12 hours prior to departure. 50% refund up to 4 hours.',
    features: ['Late Night Direct Route', 'Refreshment Halt Support'],
    driver_id: 'DRV-010',
    driver: {
      driver_id: 'DRV-010',
      name: 'Praveen Sawant',
      phone: '+91 98200 01234',
      license_number: 'DL-GA-2024-010',
      status: 'Active'
    }
  }
];

export const SEED_ROUTES: Route[] = [
  {
    id: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    distanceKm: 285,
    estimatedDuration: '5h 15m',
    popularStops: ['Narasaraopet', 'Miryalaguda', 'Narketpally', 'LB Nagar'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-002',
    sourceCity: 'Hyderabad',
    destinationCity: 'Guntur',
    distanceKm: 285,
    estimatedDuration: '5h 15m',
    popularStops: ['LB Nagar', 'Narketpally', 'Miryalaguda', 'Piduguralla'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-003',
    sourceCity: 'Vijayawada',
    destinationCity: 'Hyderabad',
    distanceKm: 275,
    estimatedDuration: '4h 45m',
    popularStops: ['Ibrahimpatnam', 'Kodad', 'Suryapet', 'LB Nagar'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-004',
    sourceCity: 'Hyderabad',
    destinationCity: 'Vijayawada',
    distanceKm: 275,
    estimatedDuration: '4h 45m',
    popularStops: ['LB Nagar', 'Suryapet', 'Kodad', 'Ibrahimpatnam'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-005',
    sourceCity: 'Hyderabad',
    destinationCity: 'Bengaluru',
    distanceKm: 570,
    estimatedDuration: '8h 30m',
    popularStops: ['Jadcherla', 'Kurnool', 'Anantapur', 'Hebbal'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-006',
    sourceCity: 'Bengaluru',
    destinationCity: 'Chennai',
    distanceKm: 345,
    estimatedDuration: '6h 00m',
    popularStops: ['Hosur', 'Krishnagiri', 'Vellore', 'Sriperumbudur'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-007',
    sourceCity: 'Chennai',
    destinationCity: 'Bengaluru',
    distanceKm: 345,
    estimatedDuration: '6h 00m',
    popularStops: ['Sriperumbudur', 'Vellore', 'Krishnagiri', 'Hosur', 'Electronic City'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-008',
    sourceCity: 'Mumbai',
    destinationCity: 'Pune',
    distanceKm: 150,
    estimatedDuration: '3h 30m',
    popularStops: ['Vashi', 'Nerul', 'Lonavala', 'Wakad'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-009',
    sourceCity: 'Delhi',
    destinationCity: 'Jaipur',
    distanceKm: 280,
    estimatedDuration: '5h 00m',
    popularStops: ['Gurugram', 'Manesar', 'Kotputli', 'Shahpura'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-010',
    sourceCity: 'Hyderabad',
    destinationCity: 'Visakhapatnam',
    distanceKm: 620,
    estimatedDuration: '11h 00m',
    popularStops: ['Suryapet', 'Vijayawada', 'Eluru', 'Rajahmundry', 'Annavaram'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-011',
    sourceCity: 'Bengaluru',
    destinationCity: 'Tirupati',
    distanceKm: 250,
    estimatedDuration: '5h 00m',
    popularStops: ['Hoskote', 'Kolar', 'Palamaner', 'Chittoor'],
    status: 'ACTIVE'
  },
  {
    id: 'ROT-012',
    sourceCity: 'Pune',
    destinationCity: 'Goa',
    distanceKm: 440,
    estimatedDuration: '9h 15m',
    popularStops: ['Satara', 'Kolhapur', 'Nipani', 'Mapusa'],
    status: 'ACTIVE'
  }
];

export const SEED_BOARDING_POINTS: BoardingPoint[] = [
  // Guntur
  { id: 'BP-GUN-01', city: 'Guntur', name: 'NTR Bus Station (RTC Complex)', landmark: 'Opposite Railway Station Road', address: 'RTC Bus Stand Entrance, Guntur', status: 'ACTIVE' },
  { id: 'BP-GUN-02', city: 'Guntur', name: 'Autonagar Junction', landmark: 'Near Indian Oil Petrol Bunk', address: 'NH16 Highway Bypass, Autonagar, Guntur', status: 'ACTIVE' },
  { id: 'BP-GUN-03', city: 'Guntur', name: 'Lodge Centre', landmark: 'Opposite State Bank of India', address: 'Lodge Center Circle, Guntur', status: 'ACTIVE' },

  // Hyderabad
  { id: 'BP-HYD-01', city: 'Hyderabad', name: 'MGBS Central Bus Station', landmark: 'Platform 54/55 Out Gate', address: 'Mahatma Gandhi Bus Station, Gowliguda, Hyderabad', status: 'ACTIVE' },
  { id: 'BP-HYD-02', city: 'Hyderabad', name: 'LB Nagar Ring Road', landmark: 'Near Metro Station Pillar 104', address: 'LB Nagar X Roads, Hyderabad', status: 'ACTIVE' },
  { id: 'BP-HYD-03', city: 'Hyderabad', name: 'Ameerpet Metro Station', landmark: 'Beside Big Bazaar', address: 'Ameerpet Main Road, Hyderabad', status: 'ACTIVE' },
  { id: 'BP-HYD-04', city: 'Hyderabad', name: 'Gachibowli Outer Ring Road', landmark: 'Near Bio-Diversity Park', address: 'Gachibowli Junction Flyover, Hyderabad', status: 'ACTIVE' },
  { id: 'BP-HYD-05', city: 'Hyderabad', name: 'KPHB Colony', landmark: 'Near Malaysian Township Arch', address: 'Kukatpally Housing Board, Hyderabad', status: 'ACTIVE' },

  // Vijayawada
  { id: 'BP-VJA-01', city: 'Vijayawada', name: 'Pandit Nehru Bus Station (PNBS)', landmark: 'Departure Terminal Gate 1', address: 'PNBS Complex, Krishnalanka, Vijayawada', status: 'ACTIVE' },
  { id: 'BP-VJA-02', city: 'Vijayawada', name: 'Benz Circle', landmark: 'Near Joyalukkas Showroom', address: 'MG Road, Benz Circle, Vijayawada', status: 'ACTIVE' },
  { id: 'BP-VJA-03', city: 'Vijayawada', name: 'Varadhi Junction', landmark: 'Krishna River Bridge End', address: 'National Highway Bypass, Vijayawada', status: 'ACTIVE' },

  // Bengaluru
  { id: 'BP-BLR-01', city: 'Bengaluru', name: 'Majestic Kempegowda Bus Station', landmark: 'Terminal 3 Front Area', address: 'Majestic Intercity Terminal, Bengaluru', status: 'ACTIVE' },
  { id: 'BP-BLR-02', city: 'Bengaluru', name: 'Madiwala Silk Board Junction', landmark: 'Near Total Gas Station', address: 'Hosur Main Road, Madiwala, Bengaluru', status: 'ACTIVE' },
  { id: 'BP-BLR-03', city: 'Bengaluru', name: 'Hebbal Flyover', landmark: 'Esteem Mall Side Gate', address: 'Bellary Road, Hebbal, Bengaluru', status: 'ACTIVE' },
  { id: 'BP-BLR-04', city: 'Bengaluru', name: 'Electronic City Toll Gate', landmark: 'Pillar 150 Elevated Highway', address: 'Electronic City Phase 1, Bengaluru', status: 'ACTIVE' },

  // Chennai
  { id: 'BP-CHE-01', city: 'Chennai', name: 'Koyambedu (CMBT)', landmark: 'Omni Bus Stand Bay 4', address: 'Koyambedu Intercity Bus Terminus, Chennai', status: 'ACTIVE' },
  { id: 'BP-CHE-02', city: 'Chennai', name: 'Guindy Kathipara', landmark: 'Near Metro Station Entrance', address: 'Kathipara Junction, Guindy, Chennai', status: 'ACTIVE' },
  { id: 'BP-CHE-03', city: 'Chennai', name: 'Tambaram Sanatorium', landmark: 'Near Railway Overbridge', address: 'GST Road, Tambaram, Chennai', status: 'ACTIVE' },

  // Mumbai
  { id: 'BP-BOM-01', city: 'Mumbai', name: 'Dadar Asiad Bus Stand', landmark: 'Near Swami Narayan Temple', address: 'Dadar East, Mumbai', status: 'ACTIVE' },
  { id: 'BP-BOM-02', city: 'Mumbai', name: 'Vashi Highway Plaza', landmark: 'Old Toll Plaza', address: 'Sion-Panvel Highway, Vashi, Navi Mumbai', status: 'ACTIVE' },
  { id: 'BP-BOM-03', city: 'Mumbai', name: 'Borivali National Park Gate', landmark: 'Western Express Highway', address: 'Borivali East, Mumbai', status: 'ACTIVE' },

  // Pune
  { id: 'BP-PUN-01', city: 'Pune', name: 'Shivajinagar Bus Terminus', landmark: 'Opposite Court', address: 'Shivajinagar, Pune', status: 'ACTIVE' },
  { id: 'BP-PUN-02', city: 'Pune', name: 'Wakad Highway Bridge', landmark: 'Near Ginger Hotel', address: 'Mumbai-Bangalore Highway, Wakad, Pune', status: 'ACTIVE' },
  { id: 'BP-PUN-03', city: 'Pune', name: 'Swargate Bus Stand', landmark: 'Jedhe Chowk Gate', address: 'Swargate, Pune', status: 'ACTIVE' },

  // Delhi
  { id: 'BP-DEL-01', city: 'Delhi', name: 'ISBT Kashmiri Gate', landmark: 'Gate 2 Intercity Bus Bay', address: 'Maharana Pratap ISBT, Delhi', status: 'ACTIVE' },
  { id: 'BP-DEL-02', city: 'Delhi', name: 'Dhaula Kuan Metro Hub', landmark: 'Under Airport Express Metro', address: 'Ring Road, Dhaula Kuan, New Delhi', status: 'ACTIVE' },
  { id: 'BP-DEL-03', city: 'Delhi', name: 'IFFCO Chowk Gurugram', landmark: 'Near Metro Station Gate 1', address: 'MG Road, Gurugram', status: 'ACTIVE' },

  // Jaipur
  { id: 'BP-JAI-01', city: 'Jaipur', name: 'Sindhi Camp Central Bus Stand', landmark: 'Platform 3', address: 'Station Road, Sindhi Camp, Jaipur', status: 'ACTIVE' },
  { id: 'BP-JAI-02', city: 'Jaipur', name: '200 Feet Bypass Ajmer Road', landmark: 'Near Elements Mall', address: 'Ajmer Road, Jaipur', status: 'ACTIVE' },

  // Visakhapatnam
  { id: 'BP-VSKP-01', city: 'Visakhapatnam', name: 'Dwaraka Bus Station (RTC Complex)', landmark: 'Main Gate', address: 'Dwaraka Nagar, Visakhapatnam', status: 'ACTIVE' },
  { id: 'BP-VSKP-02', city: 'Visakhapatnam', name: 'Gajuwaka Junction', landmark: 'Near High School Road', address: 'NH16, Gajuwaka, Visakhapatnam', status: 'ACTIVE' },

  // Tirupati
  { id: 'BP-TPTY-01', city: 'Tirupati', name: 'Tirupati Central Bus Stand', landmark: 'Near Sri Govindaraja Swamy Temple', address: 'Alipiri Road, Tirupati', status: 'ACTIVE' },

  // Goa
  { id: 'BP-GOA-01', city: 'Goa', name: 'Panaji KTC Bus Stand', landmark: 'Patto Plaza', address: 'Panaji, Goa', status: 'ACTIVE' },
  { id: 'BP-GOA-02', city: 'Goa', name: 'Mapusa Bus Stand', landmark: 'Near Mapusa Market', address: 'Mapusa, Goa', status: 'ACTIVE' }
];

export const SEED_DROPPING_POINTS: DroppingPoint[] = [
  // Hyderabad
  { id: 'DP-HYD-01', city: 'Hyderabad', name: 'MGBS Central Bus Terminal', landmark: 'Arrival Platform', address: 'Mahatma Gandhi Bus Station, Gowliguda, Hyderabad', status: 'ACTIVE' },
  { id: 'DP-HYD-02', city: 'Hyderabad', name: 'LB Nagar X Roads', landmark: 'Near Metro Station', address: 'LB Nagar, Hyderabad', status: 'ACTIVE' },
  { id: 'DP-HYD-03', city: 'Hyderabad', name: 'Ameerpet Metro Gate 3', landmark: 'Beside Maitrivanam', address: 'Ameerpet, Hyderabad', status: 'ACTIVE' },
  { id: 'DP-HYD-04', city: 'Hyderabad', name: 'Gachibowli Stadium Gate', landmark: 'ORR Junction', address: 'Gachibowli, Hyderabad', status: 'ACTIVE' },
  { id: 'DP-HYD-05', city: 'Hyderabad', name: 'KPHB Colony Pillar 720', landmark: 'Near Metro', address: 'KPHB, Hyderabad', status: 'ACTIVE' },

  // Guntur
  { id: 'DP-GUN-01', city: 'Guntur', name: 'NTR Bus Station (RTC Complex)', landmark: 'Arrival Gate', address: 'RTC Complex, Guntur', status: 'ACTIVE' },
  { id: 'DP-GUN-02', city: 'Guntur', name: 'Autonagar Bypass', landmark: 'Opposite Shell Fuel Station', address: 'NH16 Highway, Guntur', status: 'ACTIVE' },
  { id: 'DP-GUN-03', city: 'Guntur', name: 'Lodge Centre Flyover', landmark: 'Near SBI', address: 'Lodge Centre, Guntur', status: 'ACTIVE' },

  // Vijayawada
  { id: 'DP-VJA-01', city: 'Vijayawada', name: 'Pandit Nehru Bus Station (PNBS)', landmark: 'Arrival Gate 2', address: 'PNBS, Vijayawada', status: 'ACTIVE' },
  { id: 'DP-VJA-02', city: 'Vijayawada', name: 'Benz Circle Flyover Down', landmark: 'Near Hotel DV Manor', address: 'MG Road, Vijayawada', status: 'ACTIVE' },
  { id: 'DP-VJA-03', city: 'Vijayawada', name: 'Gollapudi Bypass', landmark: 'Toll Plaza', address: 'Gollapudi, Vijayawada', status: 'ACTIVE' },

  // Bengaluru
  { id: 'DP-BLR-01', city: 'Bengaluru', name: 'Majestic Central Terminus', landmark: 'Subway Exit', address: 'Majestic, Bengaluru', status: 'ACTIVE' },
  { id: 'DP-BLR-02', city: 'Bengaluru', name: 'Silk Board Madiwala', landmark: 'Near Police Station', address: 'Silk Board, Bengaluru', status: 'ACTIVE' },
  { id: 'DP-BLR-03', city: 'Bengaluru', name: 'Hebbal Flyover', landmark: 'Near Columbia Asia Hospital', address: 'Hebbal, Bengaluru', status: 'ACTIVE' },
  { id: 'DP-BLR-04', city: 'Bengaluru', name: 'Electronic City Toll Plaza', landmark: 'Pillar 150', address: 'Electronic City, Bengaluru', status: 'ACTIVE' },

  // Chennai
  { id: 'DP-CHE-01', city: 'Chennai', name: 'Koyambedu Omni Terminus (CMBT)', landmark: 'Arrival Bay 1', address: 'Koyambedu, Chennai', status: 'ACTIVE' },
  { id: 'DP-CHE-02', city: 'Chennai', name: 'Guindy Kathipara Junction', landmark: 'Metro Station Gate 2', address: 'Guindy, Chennai', status: 'ACTIVE' },
  { id: 'DP-CHE-03', city: 'Chennai', name: 'Tambaram Sanatorium', landmark: 'Near Railway Station', address: 'Tambaram, Chennai', status: 'ACTIVE' },

  // Mumbai
  { id: 'DP-BOM-01', city: 'Mumbai', name: 'Dadar East Station Hub', landmark: 'Near Swami Narayan Temple', address: 'Dadar East, Mumbai', status: 'ACTIVE' },
  { id: 'DP-BOM-02', city: 'Mumbai', name: 'Vashi Highway Stop', landmark: 'Near Center One Mall', address: 'Vashi, Navi Mumbai', status: 'ACTIVE' },
  { id: 'DP-BOM-03', city: 'Mumbai', name: 'Borivali National Park', landmark: 'WE Highway Bridge', address: 'Borivali East, Mumbai', status: 'ACTIVE' },

  // Pune
  { id: 'DP-PUN-01', city: 'Pune', name: 'Shivajinagar Bus Depot', landmark: 'Near Railway Station', address: 'Shivajinagar, Pune', status: 'ACTIVE' },
  { id: 'DP-PUN-02', city: 'Pune', name: 'Wakad Bridge Down', landmark: 'Near Ginger Hotel', address: 'Wakad, Pune', status: 'ACTIVE' },
  { id: 'DP-PUN-03', city: 'Pune', name: 'Swargate Jedhe Chowk', landmark: 'Main Gate', address: 'Swargate, Pune', status: 'ACTIVE' },

  // Delhi
  { id: 'DP-DEL-01', city: 'Delhi', name: 'ISBT Kashmiri Gate Arrival', landmark: 'Gate 1', address: 'ISBT, Delhi', status: 'ACTIVE' },
  { id: 'DP-DEL-02', city: 'Delhi', name: 'Dhaula Kuan Metro Ring Road', landmark: 'Under Flyover', address: 'Dhaula Kuan, New Delhi', status: 'ACTIVE' },

  // Jaipur
  { id: 'DP-JAI-01', city: 'Jaipur', name: 'Sindhi Camp Bus Station', landmark: 'Main Exit Gate', address: 'Sindhi Camp, Jaipur', status: 'ACTIVE' },
  { id: 'DP-JAI-02', city: 'Jaipur', name: '200 Feet Bypass Ajmer Road', landmark: 'Elements Mall', address: 'Ajmer Road, Jaipur', status: 'ACTIVE' },

  // Visakhapatnam
  { id: 'DP-VSKP-01', city: 'Visakhapatnam', name: 'RTC Complex Dwaraka Nagar', landmark: 'Arrival Platform 1', address: 'Dwaraka Nagar, Visakhapatnam', status: 'ACTIVE' },
  { id: 'DP-VSKP-02', city: 'Visakhapatnam', name: 'Gajuwaka Junction', landmark: 'NH16 Bypass', address: 'Gajuwaka, Visakhapatnam', status: 'ACTIVE' },

  // Tirupati
  { id: 'DP-TPTY-01', city: 'Tirupati', name: 'Tirupati RTC Central Bus Station', landmark: 'Pilgrim Help Desk', address: 'Alipiri Road, Tirupati', status: 'ACTIVE' },

  // Goa
  { id: 'DP-GOA-01', city: 'Goa', name: 'Panaji KTC Terminus', landmark: 'Patto Plaza Bridge', address: 'Panaji, Goa', status: 'ACTIVE' },
  { id: 'DP-GOA-02', city: 'Goa', name: 'Mapusa City Depot', landmark: 'Mapusa Market Gate', address: 'Mapusa, Goa', status: 'ACTIVE' }
];

export const SEED_SCHEDULES: Schedule[] = [
  {
    id: 'TRIP-001',
    busId: 'BUS-101',
    routeId: 'ROT-001',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    nextDayArrival: false,
    travelDate: '2026-09-05',
    tripStatus: 'Ready',
    status: 'SCHEDULED',
    startedAt: null,
    completedAt: null,
    boardingPoints: [{ pointId: 'BP-GUN-01', time: '08:30 AM' }],
    droppingPoints: [{ pointId: 'DP-HYD-01', time: '02:30 PM' }],
    routeStops: [
      { stopName: 'Guntur', arrivalTime: '08:00 AM', departureTime: '08:30 AM', distanceKm: 0 },
      { stopName: 'Sattenapalli', arrivalTime: '09:15 AM', departureTime: '09:25 AM', distanceKm: 35 },
      { stopName: 'Piduguralla', arrivalTime: '10:10 AM', departureTime: '10:20 AM', distanceKm: 75 },
      { stopName: 'Narasaraopet', arrivalTime: '11:00 AM', departureTime: '11:10 AM', distanceKm: 110 },
      { stopName: 'Hyderabad', arrivalTime: '02:30 PM', departureTime: 'Terminates', distanceKm: 285 }
    ],
    fareMultiplier: 1.0
  },
  {
    id: 'TRIP-002',
    busId: 'BUS-101',
    routeId: 'ROT-002',
    departureTime: '09:00 PM',
    arrivalTime: '04:30 AM',
    nextDayArrival: true,
    travelDate: '2026-09-06',
    tripStatus: 'Upcoming',
    status: 'SCHEDULED',
    startedAt: null,
    completedAt: null,
    boardingPoints: [{ pointId: 'BP-HYD-01', time: '09:00 PM' }],
    droppingPoints: [{ pointId: 'DP-GUN-01', time: '04:30 AM' }],
    routeStops: [
      { stopName: 'Hyderabad', arrivalTime: '08:30 PM', departureTime: '09:00 PM', distanceKm: 0 },
      { stopName: 'Narasaraopet', arrivalTime: '02:00 AM', departureTime: '02:10 AM', distanceKm: 175 },
      { stopName: 'Piduguralla', arrivalTime: '02:50 AM', departureTime: '03:00 AM', distanceKm: 210 },
      { stopName: 'Sattenapalli', arrivalTime: '03:45 AM', departureTime: '03:55 AM', distanceKm: 250 },
      { stopName: 'Guntur', arrivalTime: '04:30 AM', departureTime: 'Terminates', distanceKm: 285 }
    ],
    fareMultiplier: 1.0
  },
  {
    id: 'TRIP-003',
    busId: 'BUS-101',
    routeId: 'ROT-001',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    nextDayArrival: false,
    travelDate: '2026-09-03',
    tripStatus: 'Completed',
    status: 'COMPLETED',
    startedAt: '08:30 AM',
    completedAt: '02:25 PM',
    boardingPoints: [{ pointId: 'BP-GUN-01', time: '08:30 AM' }],
    droppingPoints: [{ pointId: 'DP-HYD-01', time: '02:30 PM' }],
    fareMultiplier: 1.0
  },
  // Guntur -> Hyderabad (Rot-001)
  {
    id: 'SCH-001',
    busId: 'BUS-101',
    routeId: 'ROT-001',
    departureTime: '22:30',
    arrivalTime: '03:45',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-GUN-01', time: '22:30' },
      { pointId: 'BP-GUN-02', time: '22:50' },
      { pointId: 'BP-GUN-03', time: '23:10' }
    ],
    droppingPoints: [
      { pointId: 'DP-HYD-02', time: '03:15' },
      { pointId: 'DP-HYD-01', time: '03:45' },
      { pointId: 'DP-HYD-03', time: '04:15' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-002',
    busId: 'BUS-102',
    routeId: 'ROT-001',
    departureTime: '23:15',
    arrivalTime: '04:30',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-GUN-01', time: '23:15' },
      { pointId: 'BP-GUN-02', time: '23:35' }
    ],
    droppingPoints: [
      { pointId: 'DP-HYD-02', time: '04:00' },
      { pointId: 'DP-HYD-01', time: '04:30' },
      { pointId: 'DP-HYD-05', time: '05:00' }
    ],
    fareMultiplier: 1.05,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-003',
    busId: 'BUS-106',
    routeId: 'ROT-001',
    departureTime: '06:30',
    arrivalTime: '11:45',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-GUN-01', time: '06:30' },
      { pointId: 'BP-GUN-03', time: '06:50' }
    ],
    droppingPoints: [
      { pointId: 'DP-HYD-02', time: '11:15' },
      { pointId: 'DP-HYD-01', time: '11:45' }
    ],
    fareMultiplier: 0.95,
    status: 'SCHEDULED'
  },

  // Hyderabad -> Guntur (Rot-002)
  {
    id: 'SCH-004',
    busId: 'BUS-101',
    routeId: 'ROT-002',
    departureTime: '23:00',
    arrivalTime: '04:15',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-HYD-03', time: '22:15' },
      { pointId: 'BP-HYD-01', time: '23:00' },
      { pointId: 'BP-HYD-02', time: '23:45' }
    ],
    droppingPoints: [
      { pointId: 'DP-GUN-02', time: '03:45' },
      { pointId: 'DP-GUN-01', time: '04:15' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-005',
    busId: 'BUS-103',
    routeId: 'ROT-002',
    departureTime: '21:30',
    arrivalTime: '02:45',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-HYD-04', time: '20:30' },
      { pointId: 'BP-HYD-01', time: '21:30' },
      { pointId: 'BP-HYD-02', time: '22:15' }
    ],
    droppingPoints: [
      { pointId: 'DP-GUN-02', time: '02:15' },
      { pointId: 'DP-GUN-01', time: '02:45' }
    ],
    fareMultiplier: 1.1,
    status: 'SCHEDULED'
  },

  // Vijayawada -> Hyderabad (Rot-003)
  {
    id: 'SCH-006',
    busId: 'BUS-103',
    routeId: 'ROT-003',
    departureTime: '23:00',
    arrivalTime: '03:45',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-VJA-01', time: '23:00' },
      { pointId: 'BP-VJA-02', time: '23:25' }
    ],
    droppingPoints: [
      { pointId: 'DP-HYD-02', time: '03:15' },
      { pointId: 'DP-HYD-01', time: '03:45' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-007',
    busId: 'BUS-104',
    routeId: 'ROT-003',
    departureTime: '15:30',
    arrivalTime: '20:15',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-VJA-01', time: '15:30' },
      { pointId: 'BP-VJA-03', time: '15:55' }
    ],
    droppingPoints: [
      { pointId: 'DP-HYD-02', time: '19:45' },
      { pointId: 'DP-HYD-01', time: '20:15' }
    ],
    fareMultiplier: 0.9,
    status: 'SCHEDULED'
  },

  // Hyderabad -> Vijayawada (Rot-004)
  {
    id: 'SCH-008',
    busId: 'BUS-104',
    routeId: 'ROT-004',
    departureTime: '22:45',
    arrivalTime: '03:30',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-HYD-01', time: '22:45' },
      { pointId: 'BP-HYD-02', time: '23:30' }
    ],
    droppingPoints: [
      { pointId: 'DP-VJA-02', time: '03:00' },
      { pointId: 'DP-VJA-01', time: '03:30' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-009',
    busId: 'BUS-107',
    routeId: 'ROT-004',
    departureTime: '07:00',
    arrivalTime: '11:45',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-HYD-05', time: '06:15' },
      { pointId: 'BP-HYD-01', time: '07:00' },
      { pointId: 'BP-HYD-02', time: '07:45' }
    ],
    droppingPoints: [
      { pointId: 'DP-VJA-02', time: '11:15' },
      { pointId: 'DP-VJA-01', time: '11:45' }
    ],
    fareMultiplier: 1.05,
    status: 'SCHEDULED'
  },

  // Hyderabad -> Bengaluru (Rot-005)
  {
    id: 'SCH-010',
    busId: 'BUS-103',
    routeId: 'ROT-005',
    departureTime: '21:00',
    arrivalTime: '05:30',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-HYD-05', time: '19:45' },
      { pointId: 'BP-HYD-04', time: '20:30' },
      { pointId: 'BP-HYD-01', time: '21:00' }
    ],
    droppingPoints: [
      { pointId: 'DP-BLR-03', time: '04:45' },
      { pointId: 'DP-BLR-01', time: '05:30' },
      { pointId: 'DP-BLR-02', time: '06:15' }
    ],
    fareMultiplier: 1.15,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-011',
    busId: 'BUS-107',
    routeId: 'ROT-005',
    departureTime: '22:15',
    arrivalTime: '06:45',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-HYD-03', time: '21:15' },
      { pointId: 'BP-HYD-01', time: '22:15' }
    ],
    droppingPoints: [
      { pointId: 'DP-BLR-03', time: '06:00' },
      { pointId: 'DP-BLR-01', time: '06:45' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },

  // Bengaluru -> Chennai (Rot-006)
  {
    id: 'SCH-012',
    busId: 'BUS-101',
    routeId: 'ROT-006',
    departureTime: '06:00',
    arrivalTime: '12:00',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-BLR-01', time: '06:00' },
      { pointId: 'BP-BLR-02', time: '06:45' },
      { pointId: 'BP-BLR-04', time: '07:15' }
    ],
    droppingPoints: [
      { pointId: 'DP-CHE-03', time: '11:15' },
      { pointId: 'DP-CHE-02', time: '11:35' },
      { pointId: 'DP-CHE-01', time: '12:00' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-013',
    busId: 'BUS-104',
    routeId: 'ROT-006',
    departureTime: '23:30',
    arrivalTime: '05:30',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-BLR-01', time: '23:30' },
      { pointId: 'BP-BLR-02', time: '00:15' }
    ],
    droppingPoints: [
      { pointId: 'DP-CHE-02', time: '05:00' },
      { pointId: 'DP-CHE-01', time: '05:30' }
    ],
    fareMultiplier: 0.95,
    status: 'SCHEDULED'
  },

  // Chennai -> Bengaluru (Rot-007)
  {
    id: 'SCH-014',
    busId: 'BUS-101',
    routeId: 'ROT-007',
    departureTime: '14:30',
    arrivalTime: '20:30',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-CHE-01', time: '14:30' },
      { pointId: 'BP-CHE-02', time: '15:00' },
      { pointId: 'BP-CHE-03', time: '15:30' }
    ],
    droppingPoints: [
      { pointId: 'DP-BLR-04', time: '19:30' },
      { pointId: 'DP-BLR-02', time: '20:00' },
      { pointId: 'DP-BLR-01', time: '20:30' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },

  // Mumbai -> Pune (Rot-008)
  {
    id: 'SCH-015',
    busId: 'BUS-108',
    routeId: 'ROT-008',
    departureTime: '07:30',
    arrivalTime: '11:00',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-BOM-03', time: '06:45' },
      { pointId: 'BP-BOM-01', time: '07:30' },
      { pointId: 'BP-BOM-02', time: '08:15' }
    ],
    droppingPoints: [
      { pointId: 'DP-PUN-02', time: '10:30' },
      { pointId: 'DP-PUN-01', time: '11:00' }
    ],
    fareMultiplier: 0.9,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-016',
    busId: 'BUS-105',
    routeId: 'ROT-008',
    departureTime: '17:45',
    arrivalTime: '21:15',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-BOM-01', time: '17:45' },
      { pointId: 'BP-BOM-02', time: '18:30' }
    ],
    droppingPoints: [
      { pointId: 'DP-PUN-02', time: '20:45' },
      { pointId: 'DP-PUN-03', time: '21:15' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },

  // Delhi -> Jaipur (Rot-009)
  {
    id: 'SCH-017',
    busId: 'BUS-109',
    routeId: 'ROT-009',
    departureTime: '06:00',
    arrivalTime: '11:00',
    nextDayArrival: false,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-DEL-01', time: '06:00' },
      { pointId: 'BP-DEL-02', time: '06:45' },
      { pointId: 'BP-DEL-03', time: '07:30' }
    ],
    droppingPoints: [
      { pointId: 'DP-JAI-02', time: '10:30' },
      { pointId: 'DP-JAI-01', time: '11:00' }
    ],
    fareMultiplier: 1.0,
    status: 'SCHEDULED'
  },
  {
    id: 'SCH-018',
    busId: 'BUS-102',
    routeId: 'ROT-009',
    departureTime: '23:00',
    arrivalTime: '04:00',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-DEL-01', time: '23:00' },
      { pointId: 'BP-DEL-03', time: '23:55' }
    ],
    droppingPoints: [
      { pointId: 'DP-JAI-01', time: '04:00' }
    ],
    fareMultiplier: 1.1,
    status: 'SCHEDULED'
  },

  // Hyderabad -> Visakhapatnam (Rot-010)
  {
    id: 'SCH-019',
    busId: 'BUS-102',
    routeId: 'ROT-010',
    departureTime: '19:30',
    arrivalTime: '06:30',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-HYD-05', time: '18:15' },
      { pointId: 'BP-HYD-01', time: '19:30' },
      { pointId: 'BP-HYD-02', time: '20:15' }
    ],
    droppingPoints: [
      { pointId: 'DP-VSKP-02', time: '05:45' },
      { pointId: 'DP-VSKP-01', time: '06:30' }
    ],
    fareMultiplier: 1.2,
    status: 'SCHEDULED'
  },

  // Pune -> Goa (Rot-012)
  {
    id: 'SCH-020',
    busId: 'BUS-110',
    routeId: 'ROT-012',
    departureTime: '21:00',
    arrivalTime: '06:15',
    nextDayArrival: true,
    travelDate: '2026-09-10',
    boardingPoints: [
      { pointId: 'BP-PUN-01', time: '21:00' },
      { pointId: 'BP-PUN-03', time: '21:45' }
    ],
    droppingPoints: [
      { pointId: 'DP-GOA-02', time: '05:30' },
      { pointId: 'DP-GOA-01', time: '06:15' }
    ],
    fareMultiplier: 1.1,
    status: 'SCHEDULED'
  }
];

// Helper to generate realistic seats for each bus
export function generateSeatsForBus(bus: Bus): Seat[] {
  const seats: Seat[] = [];
  const basePrice = bus.baseFare;

  if (bus.layoutType === 'sleeper_2_1') {
    // 30 berths: Lower (L1 to L15), Upper (U1 to U15)
    // Left side: Single Berths (L1, L2, L3, L4, L5)
    // Right side: Double Berths (L6-L7, L8-L9, L10-L11, L12-L13, L14-L15)
    const decks: ('LOWER' | 'UPPER')[] = ['LOWER', 'UPPER'];

    decks.forEach(deck => {
      const prefix = deck === 'LOWER' ? 'L' : 'U';
      const deckMultiplier = deck === 'LOWER' ? 1.0 : 0.95;

      for (let row = 1; row <= 5; row++) {
        // Single berth (Left)
        const singleNum = `${prefix}${row}`;
        const isLadies = row === 1 || row === 2; // Front berths reserved/preferred for ladies
        const isOccupied = (row === 2 && deck === 'LOWER') || (row === 4 && deck === 'UPPER');

        seats.push({
          id: `${bus.id}-${singleNum}`,
          busId: bus.id,
          seatNumber: singleNum,
          deck,
          row,
          column: 1,
          seatType: 'SLEEPER',
          state: isOccupied ? 'OCCUPIED' : 'AVAILABLE',
          price: Math.round(basePrice * deckMultiplier * 1.05),
          isLadiesSeat: isLadies,
          bookedByGender: isOccupied ? (isLadies ? 'FEMALE' : 'MALE') : undefined
        });

        // Double berth - Left berth in pair
        const doubleNum1 = `${prefix}${row * 2 + 4}`;
        const isDouble1Occupied = row === 3;
        seats.push({
          id: `${bus.id}-${doubleNum1}`,
          busId: bus.id,
          seatNumber: doubleNum1,
          deck,
          row,
          column: 2,
          seatType: 'SLEEPER',
          state: isDouble1Occupied ? 'OCCUPIED' : 'AVAILABLE',
          price: Math.round(basePrice * deckMultiplier),
          isLadiesSeat: false,
          bookedByGender: isDouble1Occupied ? 'MALE' : undefined
        });

        // Double berth - Window berth in pair
        const doubleNum2 = `${prefix}${row * 2 + 5}`;
        const isDouble2Occupied = row === 1;
        seats.push({
          id: `${bus.id}-${doubleNum2}`,
          busId: bus.id,
          seatNumber: doubleNum2,
          deck,
          row,
          column: 3,
          seatType: 'SLEEPER',
          state: isDouble2Occupied ? 'OCCUPIED' : 'AVAILABLE',
          price: Math.round(basePrice * deckMultiplier * 1.02),
          isLadiesSeat: false,
          bookedByGender: isDouble2Occupied ? 'FEMALE' : undefined
        });
      }
    });
  } else {
    // 2+2 Seater / Semi-Sleeper (e.g. 36 or 40 seats)
    const rows = bus.totalSeats / 4;
    for (let row = 1; row <= rows; row++) {
      const colLabels = ['A', 'B', 'C', 'D'];
      colLabels.forEach((colLabel, colIndex) => {
        const seatNum = `${row}${colLabel}`;
        const isWindow = colIndex === 0 || colIndex === 3;
        const isLadies = row <= 2 && (colIndex === 0 || colIndex === 1);
        const isOccupied = (row === 2 && colIndex === 1) || (row === 4 && colIndex === 3) || (row === 6 && colIndex === 0) || (row === 7 && colIndex === 2);
        const isBlocked = row === rows && colIndex === 3; // Maintenance/Spare

        seats.push({
          id: `${bus.id}-${seatNum}`,
          busId: bus.id,
          seatNumber: seatNum,
          deck: 'LOWER',
          row,
          column: colIndex + 1,
          seatType: bus.layoutType === 'semi_sleeper_2_2' ? 'SEMI_SLEEPER' : 'SEATER',
          state: isBlocked ? 'BLOCKED' : isOccupied ? 'OCCUPIED' : 'AVAILABLE',
          price: isWindow ? Math.round(basePrice * 1.05) : basePrice,
          isLadiesSeat: isLadies,
          bookedByGender: isOccupied ? (isLadies ? 'FEMALE' : 'MALE') : undefined
        });
      });
    }
  }

  return seats;
}

export const SEED_SEATS: Seat[] = SEED_BUSES.flatMap(bus => generateSeatsForBus(bus));

export const SEED_OFFERS: Offer[] = [
  {
    id: 'OFF-001',
    code: 'WELCOME100',
    title: 'First Trip Flat Discount',
    description: 'Flat ₹100 OFF on your first bus booking across any Indian route.',
    discountType: 'FLAT',
    discountValue: 100,
    minBookingAmount: 500,
    validUntil: '2026-12-31',
    usageLimit: 5000,
    usedCount: 1420,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-002',
    code: 'FIRSTBUS',
    title: '15% Off New Travelers Special',
    description: 'Get 15% discount up to ₹150 on your booking. Applicable on all AC buses.',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    maxDiscount: 150,
    minBookingAmount: 600,
    validUntil: '2026-11-30',
    usageLimit: 3000,
    usedCount: 890,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-003',
    code: 'TRAVEL200',
    title: 'Grand Highway Mega Saver',
    description: 'Flat ₹200 OFF on premium Volvo and BharatBenz luxury sleeper buses.',
    discountType: 'FLAT',
    discountValue: 200,
    minBookingAmount: 1200,
    validUntil: '2026-10-31',
    usageLimit: 2000,
    usedCount: 740,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-004',
    code: 'WEEKEND10',
    title: 'Weekend Getaway 10% Off',
    description: 'Enjoy 10% instant discount on Friday, Saturday & Sunday intercity travel.',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    maxDiscount: 120,
    minBookingAmount: 400,
    validUntil: '2026-12-31',
    usageLimit: 4000,
    usedCount: 1650,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-005',
    code: 'HYDGUNTUR',
    title: 'Hyderabad - Guntur Route Saver',
    description: 'Special ₹75 discount on Andhra - Telangana express highway routes.',
    discountType: 'FLAT',
    discountValue: 75,
    minBookingAmount: 450,
    validUntil: '2026-10-15',
    usageLimit: 1500,
    usedCount: 620,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-006',
    code: 'ECOELECTRIC',
    title: 'Green Ride EV Cashback',
    description: 'Get ₹150 OFF when you choose 100% Electric luxury sleeper buses.',
    discountType: 'FLAT',
    discountValue: 150,
    minBookingAmount: 900,
    validUntil: '2026-12-31',
    usageLimit: 1000,
    usedCount: 310,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-007',
    code: 'RETURNTRIP',
    title: 'Round Trip 12% Discount',
    description: 'Book return journeys and enjoy 12% discount up to ₹250.',
    discountType: 'PERCENTAGE',
    discountValue: 12,
    maxDiscount: 250,
    minBookingAmount: 800,
    validUntil: '2026-11-15',
    usageLimit: 2500,
    usedCount: 430,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-008',
    code: 'FAMILY500',
    title: 'Family & Group Travel Bonanza',
    description: 'Flat ₹500 OFF when booking 4 or more seats together.',
    discountType: 'FLAT',
    discountValue: 500,
    minBookingAmount: 2500,
    validUntil: '2026-12-31',
    usageLimit: 800,
    usedCount: 220,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-009',
    code: 'NIGHTOWL',
    title: 'Late Night Sleeper Special',
    description: 'Flat ₹80 discount on departures scheduled after 10:00 PM.',
    discountType: 'FLAT',
    discountValue: 80,
    minBookingAmount: 600,
    validUntil: '2026-10-31',
    usageLimit: 1200,
    usedCount: 510,
    status: 'ACTIVE'
  },
  {
    id: 'OFF-010',
    code: 'FESTIVE25',
    title: 'Festive Season Express 25%',
    description: 'Exclusive 25% festive travel discount up to ₹300.',
    discountType: 'PERCENTAGE',
    discountValue: 25,
    maxDiscount: 300,
    minBookingAmount: 1000,
    validUntil: '2026-09-30',
    usageLimit: 500,
    usedCount: 490,
    status: 'ACTIVE'
  }
];

export const SEED_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'FOOD-01',
    name: 'South Indian Veg Meals Thali',
    description: 'Rice, Sambar, Rasam, Curd, Veg Curry, Papad & Sweet. Packed fresh in hot-pack.',
    category: 'VEG',
    price: 160,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'FOOD-02',
    name: 'Grilled Veg Cheese Sandwich',
    description: 'Toasted brown bread with fresh cucumber, tomato, paneer & melted cheese slice.',
    category: 'SNACKS',
    price: 90,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'FOOD-03',
    name: 'Hyderabadi Veg Biryani Box',
    description: 'Aromatic basmati rice cooked with garden veggies, served with Mirchi Ka Salan & Raitha.',
    category: 'VEG',
    price: 190,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'FOOD-04',
    name: 'Natural Mineral Water (1000ml)',
    description: 'Chilled sealed mineral water bottle with electrolytes.',
    category: 'WATER',
    price: 20,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'FOOD-05',
    name: 'Masala Tea / Filter Coffee Flask',
    description: 'Hot authentic brew kept warm in spill-proof insulated travel cup.',
    category: 'BEVERAGES',
    price: 45,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'FOOD-06',
    name: 'Roasted Cashews & Dry Fruits Mix',
    description: 'Salted crunchy premium dry fruits pack (100g).',
    category: 'SNACKS',
    price: 120,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&auto=format&fit=crop&q=80'
  }
];

export const SEED_BOOKINGS: Booking[] = [
  {
    id: 'BK-2026-0001',
    customerId: 'USR-CUST-001',
    customerName: 'Alexander Wright',
    customerEmail: 'alexander wright@example.com',
    customerPhone: '+91 98765 11111',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['1A'],
    seatNumbers: ['1A'],
    passengers: [
      {
        seatNumber: '1A',
        name: 'Alexander Wright',
        age: 24,
        gender: 'MALE',
        phone: '+91 98765 11111',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '08:15 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0002',
    customerId: 'USR-CUST-002',
    customerName: 'Beatrix Potter',
    customerEmail: 'beatrix potter@example.com',
    customerPhone: '+91 98765 22222',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['1B'],
    seatNumbers: ['1B'],
    passengers: [
      {
        seatNumber: '1B',
        name: 'Beatrix Potter',
        age: 22,
        gender: 'FEMALE',
        phone: '+91 98765 22222',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'NOT_BOARDED',
        boardedAt: null
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0003',
    customerId: 'USR-CUST-003',
    customerName: 'Charles Darwin',
    customerEmail: 'charles darwin@example.com',
    customerPhone: '+91 98765 33333',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['2A'],
    seatNumbers: ['2A'],
    passengers: [
      {
        seatNumber: '2A',
        name: 'Charles Darwin',
        age: 30,
        gender: 'MALE',
        phone: '+91 98765 33333',
        pickup: 'Narasaraopet',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:55 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Narasaraopet',
      landmark: 'RTC Complex Bay 4',
      address: 'Narasaraopet Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0004',
    customerId: 'USR-CUST-004',
    customerName: 'Dorothy Vaughan',
    customerEmail: 'dorothy vaughan@example.com',
    customerPhone: '+91 98765 44444',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['2B'],
    seatNumbers: ['2B'],
    passengers: [
      {
        seatNumber: '2B',
        name: 'Dorothy Vaughan',
        age: 28,
        gender: 'FEMALE',
        phone: '+91 98765 44444',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '08:18 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0005',
    customerId: 'USR-CUST-005',
    customerName: 'Ernest Rutherford',
    customerEmail: 'ernest rutherford@example.com',
    customerPhone: '+91 98765 55555',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['3A'],
    seatNumbers: ['3A'],
    passengers: [
      {
        seatNumber: '3A',
        name: 'Ernest Rutherford',
        age: 35,
        gender: 'MALE',
        phone: '+91 98765 55555',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '08:20 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0006',
    customerId: 'USR-CUST-006',
    customerName: 'Florence Nightingale',
    customerEmail: 'florence nightingale@example.com',
    customerPhone: '+91 98765 66666',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['3B'],
    seatNumbers: ['3B'],
    passengers: [
      {
        seatNumber: '3B',
        name: 'Florence Nightingale',
        age: 29,
        gender: 'FEMALE',
        phone: '+91 98765 66666',
        pickup: 'Sattenapalli',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '09:20 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Sattenapalli',
      landmark: 'RTC Complex Bay 4',
      address: 'Sattenapalli Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0007',
    customerId: 'USR-CUST-007',
    customerName: 'Galileo Galilei',
    customerEmail: 'galileo galilei@example.com',
    customerPhone: '+91 98765 77777',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['4A'],
    seatNumbers: ['4A'],
    passengers: [
      {
        seatNumber: '4A',
        name: 'Galileo Galilei',
        age: 42,
        gender: 'MALE',
        phone: '+91 98765 77777',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '08:22 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0008',
    customerId: 'USR-CUST-008',
    customerName: 'John Smith',
    customerEmail: 'john smith@example.com',
    customerPhone: '+91 98765 88888',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['4B'],
    seatNumbers: ['4B'],
    passengers: [
      {
        seatNumber: '4B',
        name: 'John Smith',
        age: 32,
        gender: 'MALE',
        phone: '+91 98765 88888',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'NOT_BOARDED',
        boardedAt: null
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0009',
    customerId: 'USR-CUST-009',
    customerName: 'Isaac Newton',
    customerEmail: 'isaac newton@example.com',
    customerPhone: '+91 98765 99999',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['5A'],
    seatNumbers: ['5A'],
    passengers: [
      {
        seatNumber: '5A',
        name: 'Isaac Newton',
        age: 40,
        gender: 'MALE',
        phone: '+91 98765 99999',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:15 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0010',
    customerId: 'USR-CUST-010',
    customerName: 'Jane Goodall',
    customerEmail: 'jane goodall@example.com',
    customerPhone: '+91 98765 00001',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['5B'],
    seatNumbers: ['5B'],
    passengers: [
      {
        seatNumber: '5B',
        name: 'Jane Goodall',
        age: 27,
        gender: 'FEMALE',
        phone: '+91 98765 00001',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '08:25 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0011',
    customerId: 'USR-CUST-011',
    customerName: 'Johannes Kepler',
    customerEmail: 'johannes kepler@example.com',
    customerPhone: '+91 98765 00002',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['6A'],
    seatNumbers: ['6A'],
    passengers: [
      {
        seatNumber: '6A',
        name: 'Johannes Kepler',
        age: 38,
        gender: 'MALE',
        phone: '+91 98765 00002',
        pickup: 'Sattenapalli',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '09:22 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Sattenapalli',
      landmark: 'RTC Complex Bay 4',
      address: 'Sattenapalli Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0012',
    customerId: 'USR-CUST-012',
    customerName: 'Katherine Johnson',
    customerEmail: 'katherine johnson@example.com',
    customerPhone: '+91 98765 00003',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['6B'],
    seatNumbers: ['6B'],
    passengers: [
      {
        seatNumber: '6B',
        name: 'Katherine Johnson',
        age: 31,
        gender: 'FEMALE',
        phone: '+91 98765 00003',
        pickup: 'Guntur',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '08:27 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Guntur',
      landmark: 'RTC Complex Bay 4',
      address: 'Guntur Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0013',
    customerId: 'USR-CUST-013',
    customerName: 'Louis Pasteur',
    customerEmail: 'louis pasteur@example.com',
    customerPhone: '+91 98765 00004',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['7A'],
    seatNumbers: ['7A'],
    passengers: [
      {
        seatNumber: '7A',
        name: 'Louis Pasteur',
        age: 45,
        gender: 'MALE',
        phone: '+91 98765 00004',
        pickup: 'Sattenapalli',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '09:24 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Sattenapalli',
      landmark: 'RTC Complex Bay 4',
      address: 'Sattenapalli Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0014',
    customerId: 'USR-CUST-014',
    customerName: 'Marie Curie',
    customerEmail: 'marie curie@example.com',
    customerPhone: '+91 98765 00005',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['7B'],
    seatNumbers: ['7B'],
    passengers: [
      {
        seatNumber: '7B',
        name: 'Marie Curie',
        age: 36,
        gender: 'FEMALE',
        phone: '+91 98765 00005',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:16 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0015',
    customerId: 'USR-CUST-015',
    customerName: 'Nikola Tesla',
    customerEmail: 'nikola tesla@example.com',
    customerPhone: '+91 98765 00006',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['8A'],
    seatNumbers: ['8A'],
    passengers: [
      {
        seatNumber: '8A',
        name: 'Nikola Tesla',
        age: 33,
        gender: 'MALE',
        phone: '+91 98765 00006',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:17 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0016',
    customerId: 'USR-CUST-016',
    customerName: 'Rosalind Franklin',
    customerEmail: 'rosalind franklin@example.com',
    customerPhone: '+91 98765 00007',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['8B'],
    seatNumbers: ['8B'],
    passengers: [
      {
        seatNumber: '8B',
        name: 'Rosalind Franklin',
        age: 26,
        gender: 'FEMALE',
        phone: '+91 98765 00007',
        pickup: 'Narasaraopet',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '11:05 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Narasaraopet',
      landmark: 'RTC Complex Bay 4',
      address: 'Narasaraopet Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0017',
    customerId: 'USR-CUST-017',
    customerName: 'Niels Bohr',
    customerEmail: 'niels bohr@example.com',
    customerPhone: '+91 98765 00008',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['9A'],
    seatNumbers: ['9A'],
    passengers: [
      {
        seatNumber: '9A',
        name: 'Niels Bohr',
        age: 39,
        gender: 'MALE',
        phone: '+91 98765 00008',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:18 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0018',
    customerId: 'USR-CUST-018',
    customerName: 'Ada Lovelace',
    customerEmail: 'ada lovelace@example.com',
    customerPhone: '+91 98765 00009',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['9B'],
    seatNumbers: ['9B'],
    passengers: [
      {
        seatNumber: '9B',
        name: 'Ada Lovelace',
        age: 25,
        gender: 'FEMALE',
        phone: '+91 98765 00009',
        pickup: 'Narasaraopet',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '11:07 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Narasaraopet',
      landmark: 'RTC Complex Bay 4',
      address: 'Narasaraopet Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0019',
    customerId: 'USR-CUST-019',
    customerName: 'Albert Einstein',
    customerEmail: 'albert einstein@example.com',
    customerPhone: '+91 98765 00010',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['10A'],
    seatNumbers: ['10A'],
    passengers: [
      {
        seatNumber: '10A',
        name: 'Albert Einstein',
        age: 44,
        gender: 'MALE',
        phone: '+91 98765 00010',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:19 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0020',
    customerId: 'USR-CUST-020',
    customerName: 'Chien-Shiung Wu',
    customerEmail: 'chien-shiung wu@example.com',
    customerPhone: '+91 98765 00011',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['10B'],
    seatNumbers: ['10B'],
    passengers: [
      {
        seatNumber: '10B',
        name: 'Chien-Shiung Wu',
        age: 34,
        gender: 'FEMALE',
        phone: '+91 98765 00011',
        pickup: 'Sattenapalli',
        drop: 'Hyderabad',
        boardingStatus: 'NOT_BOARDED',
        boardedAt: null
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Sattenapalli',
      landmark: 'RTC Complex Bay 4',
      address: 'Sattenapalli Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0021',
    customerId: 'USR-CUST-021',
    customerName: 'Michael Faraday',
    customerEmail: 'michael faraday@example.com',
    customerPhone: '+91 98765 00012',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['1C'],
    seatNumbers: ['1C'],
    passengers: [
      {
        seatNumber: '1C',
        name: 'Michael Faraday',
        age: 37,
        gender: 'MALE',
        phone: '+91 98765 00012',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:14 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0022',
    customerId: 'USR-CUST-022',
    customerName: 'Lise Meitner',
    customerEmail: 'lise meitner@example.com',
    customerPhone: '+91 98765 00013',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['2C'],
    seatNumbers: ['2C'],
    passengers: [
      {
        seatNumber: '2C',
        name: 'Lise Meitner',
        age: 41,
        gender: 'FEMALE',
        phone: '+91 98765 00013',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:14 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0023',
    customerId: 'USR-CUST-023',
    customerName: 'Richard Feynman',
    customerEmail: 'richard feynman@example.com',
    customerPhone: '+91 98765 00014',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['3C'],
    seatNumbers: ['3C'],
    passengers: [
      {
        seatNumber: '3C',
        name: 'Richard Feynman',
        age: 29,
        gender: 'MALE',
        phone: '+91 98765 00014',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:15 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0024',
    customerId: 'USR-CUST-024',
    customerName: 'Barbara McClintock',
    customerEmail: 'barbara mcclintock@example.com',
    customerPhone: '+91 98765 00015',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['4C'],
    seatNumbers: ['4C'],
    passengers: [
      {
        seatNumber: '4C',
        name: 'Barbara McClintock',
        age: 33,
        gender: 'FEMALE',
        phone: '+91 98765 00015',
        pickup: 'Narasaraopet',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '11:08 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Narasaraopet',
      landmark: 'RTC Complex Bay 4',
      address: 'Narasaraopet Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0025',
    customerId: 'USR-CUST-025',
    customerName: 'Stephen Hawking',
    customerEmail: 'stephen hawking@example.com',
    customerPhone: '+91 98765 00016',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['5C'],
    seatNumbers: ['5C'],
    passengers: [
      {
        seatNumber: '5C',
        name: 'Stephen Hawking',
        age: 36,
        gender: 'MALE',
        phone: '+91 98765 00016',
        pickup: 'Narasaraopet',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '11:09 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Narasaraopet',
      landmark: 'RTC Complex Bay 4',
      address: 'Narasaraopet Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0026',
    customerId: 'USR-CUST-026',
    customerName: 'Grace Hopper',
    customerEmail: 'grace hopper@example.com',
    customerPhone: '+91 98765 00017',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['6C'],
    seatNumbers: ['6C'],
    passengers: [
      {
        seatNumber: '6C',
        name: 'Grace Hopper',
        age: 32,
        gender: 'FEMALE',
        phone: '+91 98765 00017',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:16 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0027',
    customerId: 'USR-CUST-027',
    customerName: 'Carl Sagan',
    customerEmail: 'carl sagan@example.com',
    customerPhone: '+91 98765 00018',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['7C'],
    seatNumbers: ['7C'],
    passengers: [
      {
        seatNumber: '7C',
        name: 'Carl Sagan',
        age: 35,
        gender: 'MALE',
        phone: '+91 98765 00018',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'BOARDED',
        boardedAt: '10:17 AM'
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BK-2026-0028',
    customerId: 'USR-CUST-028',
    customerName: 'Rachel Carson',
    customerEmail: 'rachel carson@example.com',
    customerPhone: '+91 98765 00019',
    busId: 'BUS-101',
    busName: 'Express AC Sleeper',
    operator: 'Garuda Premium Lines',
    busType: 'Express AC Sleeper' as any,
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-05',
    departureTime: '08:30 AM',
    arrivalTime: '02:30 PM',
    scheduleId: 'TRIP-001',
    selectedSeats: ['8C'],
    seatNumbers: ['8C'],
    passengers: [
      {
        seatNumber: '8C',
        name: 'Rachel Carson',
        age: 28,
        gender: 'FEMALE',
        phone: '+91 98765 00019',
        pickup: 'Piduguralla',
        drop: 'Hyderabad',
        boardingStatus: 'NOT_BOARDED',
        boardedAt: null
      }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'Piduguralla',
      landmark: 'RTC Complex Bay 4',
      address: 'Piduguralla Central Bus Station',
      time: '08:30 AM'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'Hyderabad',
      landmark: 'MGBS Bay 12',
      address: 'Hyderabad MGBS Central Terminal',
      time: '02:30 PM'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 937
    },
    totalAmount: 937,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    status: 'CONFIRMED',
    createdAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'BUS-2026-10001',
    customerId: 'USR-CUST-001',
    customerName: 'Rajesh Sharma',
    customerEmail: 'rajesh.sharma@gmail.com',
    customerPhone: '+91 98480 22334',
    busId: 'BUS-101',
    busName: 'Garuda Super Luxury Multi-Axle',
    operator: 'Garuda Premium Lines',
    busType: 'Volvo Multi-Axle AC (2+2)',
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-10',
    departureTime: '22:30',
    arrivalTime: '03:45',
    scheduleId: 'SCH-001',
    selectedSeats: ['2B'],
    passengers: [
      { seatNumber: '2B', name: 'Rajesh Sharma', age: 34, gender: 'MALE' }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'NTR Bus Station (RTC Complex)',
      landmark: 'Opposite Railway Station Road',
      address: 'RTC Bus Stand Entrance, Guntur',
      time: '22:30'
    },
    droppingPoint: {
      id: 'DP-HYD-01',
      name: 'MGBS Central Bus Terminal',
      landmark: 'Arrival Platform',
      address: 'Mahatma Gandhi Bus Station, Gowliguda, Hyderabad',
      time: '03:45'
    },
    foodItems: [
      { itemId: 'FOOD-04', name: 'Natural Mineral Water (1000ml)', price: 20, quantity: 1 }
    ],
    appliedOffer: {
      code: 'WELCOME100',
      discountAmount: 100
    },
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 850,
      taxes: 42,
      serviceFee: 45,
      foodTotal: 20,
      discount: 100,
      totalAmount: 857
    },
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    createdAt: '2026-09-01T10:15:00.000Z'
  },
  {
    id: 'BUS-2026-10002',
    customerId: 'USR-CUST-002',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@outlook.com',
    customerPhone: '+91 94401 55667',
    busId: 'BUS-102',
    busName: 'Vayu Royal Class AC Sleeper',
    operator: 'Vayu Travels',
    busType: 'AC Sleeper (2+1)',
    routeId: 'ROT-001',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    travelDate: '2026-09-10',
    departureTime: '23:15',
    arrivalTime: '04:30',
    scheduleId: 'SCH-002',
    selectedSeats: ['L2', 'L11'],
    passengers: [
      { seatNumber: 'L2', name: 'Priya Patel', age: 29, gender: 'FEMALE' },
      { seatNumber: 'L11', name: 'Ravi Patel', age: 32, gender: 'MALE' }
    ],
    boardingPoint: {
      id: 'BP-GUN-01',
      name: 'NTR Bus Station (RTC Complex)',
      landmark: 'Opposite Railway Station Road',
      address: 'RTC Bus Stand Entrance, Guntur',
      time: '23:15'
    },
    droppingPoint: {
      id: 'DP-HYD-02',
      name: 'LB Nagar X Roads',
      landmark: 'Near Metro Station',
      address: 'LB Nagar, Hyderabad',
      time: '04:00'
    },
    foodItems: [],
    appliedOffer: {
      code: 'FIRSTBUS',
      discountAmount: 150
    },
    fareBreakdown: {
      baseFare: 1100,
      seatFaresTotal: 2310,
      taxes: 115,
      serviceFee: 45,
      foodTotal: 0,
      discount: 150,
      totalAmount: 2320
    },
    paymentMethod: 'DEMO_CARD',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    createdAt: '2026-09-01T14:30:00.000Z'
  },
  {
    id: 'BUS-2026-10003',
    customerId: 'USR-CUST-003',
    customerName: 'Ananya Reddy',
    customerEmail: 'ananya.reddy@gmail.com',
    customerPhone: '+91 98492 88441',
    busId: 'BUS-103',
    busName: 'Bharat Star Electric Intercity',
    operator: 'Bharat Super Express',
    busType: 'Electric AC Sleeper (2+1)',
    routeId: 'ROT-005',
    sourceCity: 'Hyderabad',
    destinationCity: 'Bengaluru',
    travelDate: '2026-09-10',
    departureTime: '21:00',
    arrivalTime: '05:30',
    scheduleId: 'SCH-010',
    selectedSeats: ['L1'],
    passengers: [
      { seatNumber: 'L1', name: 'Ananya Reddy', age: 26, gender: 'FEMALE' }
    ],
    boardingPoint: {
      id: 'BP-HYD-04',
      name: 'Gachibowli Outer Ring Road',
      landmark: 'Near Bio-Diversity Park',
      address: 'Gachibowli Junction Flyover, Hyderabad',
      time: '20:30'
    },
    droppingPoint: {
      id: 'DP-BLR-01',
      name: 'Majestic Central Terminus',
      landmark: 'Subway Exit',
      address: 'Majestic, Bengaluru',
      time: '05:30'
    },
    foodItems: [
      { itemId: 'FOOD-01', name: 'South Indian Veg Meals Thali', price: 160, quantity: 1 }
    ],
    appliedOffer: {
      code: 'ECOELECTRIC',
      discountAmount: 150
    },
    fareBreakdown: {
      baseFare: 1250,
      seatFaresTotal: 1438,
      taxes: 72,
      serviceFee: 45,
      foodTotal: 160,
      discount: 150,
      totalAmount: 1565
    },
    paymentMethod: 'DEMO_WALLET',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'CONFIRMED',
    createdAt: '2026-09-02T01:10:00.000Z'
  },
  {
    id: 'BUS-2026-10004',
    customerId: 'USR-CUST-004',
    customerName: 'Venkat Rao',
    customerEmail: 'venkat.rao@yahoo.co.in',
    customerPhone: '+91 97000 12345',
    busId: 'BUS-104',
    busName: 'Kaveri Diamond Semi-Sleeper',
    operator: 'Kaveri Intercity',
    busType: 'AC Semi-Sleeper (2+2)',
    routeId: 'ROT-006',
    sourceCity: 'Bengaluru',
    destinationCity: 'Chennai',
    travelDate: '2026-08-20',
    departureTime: '23:30',
    arrivalTime: '05:30',
    scheduleId: 'SCH-013',
    selectedSeats: ['4D'],
    passengers: [
      { seatNumber: '4D', name: 'Venkat Rao', age: 45, gender: 'MALE' }
    ],
    boardingPoint: {
      id: 'BP-BLR-01',
      name: 'Majestic Kempegowda Bus Station',
      landmark: 'Terminal 3 Front Area',
      address: 'Majestic Intercity Terminal, Bengaluru',
      time: '23:30'
    },
    droppingPoint: {
      id: 'DP-CHE-01',
      name: 'Koyambedu Omni Terminus (CMBT)',
      landmark: 'Arrival Bay 1',
      address: 'Koyambedu, Chennai',
      time: '05:30'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 650,
      seatFaresTotal: 650,
      taxes: 32,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 727
    },
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'COMPLETED',
    createdAt: '2026-08-15T09:00:00.000Z'
  },
  {
    id: 'BUS-2026-10005',
    customerId: 'USR-CUST-005',
    customerName: 'Kavita Sundaram',
    customerEmail: 'kavita.s@gmail.com',
    customerPhone: '+91 98840 99881',
    busId: 'BUS-101',
    busName: 'Garuda Super Luxury Multi-Axle',
    operator: 'Garuda Premium Lines',
    busType: 'Volvo Multi-Axle AC (2+2)',
    routeId: 'ROT-007',
    sourceCity: 'Chennai',
    destinationCity: 'Bengaluru',
    travelDate: '2026-08-28',
    departureTime: '14:30',
    arrivalTime: '20:30',
    scheduleId: 'SCH-014',
    selectedSeats: ['6A'],
    passengers: [
      { seatNumber: '6A', name: 'Kavita Sundaram', age: 38, gender: 'FEMALE' }
    ],
    boardingPoint: {
      id: 'BP-CHE-01',
      name: 'Koyambedu (CMBT)',
      landmark: 'Omni Bus Stand Bay 4',
      address: 'Koyambedu Intercity Bus Terminus, Chennai',
      time: '14:30'
    },
    droppingPoint: {
      id: 'DP-BLR-01',
      name: 'Majestic Central Terminus',
      landmark: 'Subway Exit',
      address: 'Majestic, Bengaluru',
      time: '20:30'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 850,
      seatFaresTotal: 892,
      taxes: 44,
      serviceFee: 45,
      foodTotal: 0,
      discount: 100,
      totalAmount: 881
    },
    appliedOffer: { code: 'WELCOME100', discountAmount: 100 },
    paymentMethod: 'DEMO_CARD',
    paymentStatus: 'SUCCESS',
    bookingStatus: 'COMPLETED',
    createdAt: '2026-08-25T11:20:00.000Z'
  },
  {
    id: 'BUS-2026-10006',
    customerId: 'USR-CUST-001',
    customerName: 'Rajesh Sharma',
    customerEmail: 'rajesh.sharma@gmail.com',
    customerPhone: '+91 98480 22334',
    busId: 'BUS-108',
    busName: 'Neeta Grand Cruiser Multi-Axle',
    operator: 'Neeta Tours',
    busType: 'Volvo Multi-Axle AC (2+2)',
    routeId: 'ROT-008',
    sourceCity: 'Mumbai',
    destinationCity: 'Pune',
    travelDate: '2026-08-10',
    departureTime: '07:30',
    arrivalTime: '11:00',
    scheduleId: 'SCH-015',
    selectedSeats: ['3C'],
    passengers: [
      { seatNumber: '3C', name: 'Rajesh Sharma', age: 34, gender: 'MALE' }
    ],
    boardingPoint: {
      id: 'BP-BOM-01',
      name: 'Dadar Asiad Bus Stand',
      landmark: 'Near Swami Narayan Temple',
      address: 'Dadar East, Mumbai',
      time: '07:30'
    },
    droppingPoint: {
      id: 'DP-PUN-01',
      name: 'Shivajinagar Bus Depot',
      landmark: 'Near Railway Station',
      address: 'Shivajinagar, Pune',
      time: '11:00'
    },
    foodItems: [],
    fareBreakdown: {
      baseFare: 700,
      seatFaresTotal: 700,
      taxes: 35,
      serviceFee: 45,
      foodTotal: 0,
      discount: 0,
      totalAmount: 780
    },
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'REFUNDED',
    bookingStatus: 'CANCELLED',
    createdAt: '2026-08-05T08:30:00.000Z',
    cancelledAt: '2026-08-08T14:10:00.000Z',
    cancellationReason: 'Change of meeting schedule in Pune',
    refundAmount: 663,
    refundStatus: 'PROCESSED'
  }
];

export const SEED_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'TXN-9988101',
    bookingId: 'BUS-2026-10001',
    customerId: 'USR-CUST-001',
    customerName: 'Rajesh Sharma',
    amount: 857,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    transactionRef: 'UPI/DEMO/20260901/778101',
    date: '2026-09-01T10:15:30.000Z'
  },
  {
    id: 'TXN-9988102',
    bookingId: 'BUS-2026-10002',
    customerId: 'USR-CUST-002',
    customerName: 'Priya Patel',
    amount: 2320,
    paymentMethod: 'DEMO_CARD',
    paymentStatus: 'SUCCESS',
    transactionRef: 'CARD/DEMO/20260901/449202',
    date: '2026-09-01T14:30:45.000Z'
  },
  {
    id: 'TXN-9988103',
    bookingId: 'BUS-2026-10003',
    customerId: 'USR-CUST-003',
    customerName: 'Ananya Reddy',
    amount: 1565,
    paymentMethod: 'DEMO_WALLET',
    paymentStatus: 'SUCCESS',
    transactionRef: 'WLT/DEMO/20260902/112003',
    date: '2026-09-02T01:10:20.000Z'
  },
  {
    id: 'TXN-9988104',
    bookingId: 'BUS-2026-10004',
    customerId: 'USR-CUST-004',
    customerName: 'Venkat Rao',
    amount: 727,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'SUCCESS',
    transactionRef: 'UPI/DEMO/20260815/998104',
    date: '2026-08-15T09:00:10.000Z'
  },
  {
    id: 'TXN-9988105',
    bookingId: 'BUS-2026-10005',
    customerId: 'USR-CUST-005',
    customerName: 'Kavita Sundaram',
    amount: 881,
    paymentMethod: 'DEMO_CARD',
    paymentStatus: 'SUCCESS',
    transactionRef: 'CARD/DEMO/20260825/551105',
    date: '2026-08-25T11:20:15.000Z'
  },
  {
    id: 'TXN-9988106',
    bookingId: 'BUS-2026-10006',
    customerId: 'USR-CUST-001',
    customerName: 'Rajesh Sharma',
    amount: 780,
    paymentMethod: 'DEMO_UPI',
    paymentStatus: 'REFUNDED',
    transactionRef: 'UPI/DEMO/20260805/334106',
    date: '2026-08-05T08:30:12.000Z',
    refundedAmount: 663,
    refundDate: '2026-08-08T15:00:00.000Z',
    refundReason: 'Customer requested cancellation (85% refund after 15% policy fee)'
  }
];

export const SEED_TRACKING: BusTracking[] = [
  {
    busId: 'BUS-101',
    scheduleId: 'SCH-001',
    routeId: 'ROT-001',
    busName: 'Garuda Super Luxury Multi-Axle',
    busNumber: 'TS 09 UB 7812',
    sourceCity: 'Guntur',
    destinationCity: 'Hyderabad',
    currentLocationName: 'Suryapet Highway Toll Plaza',
    currentSpeedKmH: 78,
    progressPercent: 62,
    status: 'ON_TIME',
    estimatedArrival: '03:45 AM',
    lastUpdated: 'Just now (GPS active)',
    driverName: 'Ramesh Reddy',
    driverContact: '+91 94411 22998',
    checkpoints: [
      { name: 'NTR Bus Stand Guntur', city: 'Guntur', scheduledTime: '22:30', actualTime: '22:32', status: 'PASSED' },
      { name: 'Autonagar Bypass Guntur', city: 'Guntur', scheduledTime: '22:50', actualTime: '22:55', status: 'PASSED' },
      { name: 'Miryalaguda Crossing', city: 'Miryalaguda', scheduledTime: '00:45', actualTime: '00:43', status: 'PASSED' },
      { name: 'Suryapet Highway Toll', city: 'Suryapet', scheduledTime: '01:50', actualTime: '01:52', status: 'CURRENT', notes: 'Running on schedule at 78 km/h' },
      { name: 'Narketpally Bypass', city: 'Narketpally', scheduledTime: '02:30', status: 'UPCOMING' },
      { name: 'LB Nagar X Roads', city: 'Hyderabad', scheduledTime: '03:15', status: 'UPCOMING' },
      { name: 'MGBS Central Terminal', city: 'Hyderabad', scheduledTime: '03:45', status: 'UPCOMING' }
    ]
  },
  {
    busId: 'BUS-103',
    scheduleId: 'SCH-010',
    routeId: 'ROT-005',
    busName: 'Bharat Star Electric Intercity',
    busNumber: 'KA 01 EK 9021',
    sourceCity: 'Hyderabad',
    destinationCity: 'Bengaluru',
    currentLocationName: 'Kurnool Highway Bypass Rest Halt',
    currentSpeedKmH: 0,
    progressPercent: 42,
    status: 'ON_TIME',
    estimatedArrival: '05:30 AM',
    lastUpdated: '1 min ago (Rest Break)',
    driverName: 'Girish Kumar',
    driverContact: '+91 98860 44321',
    checkpoints: [
      { name: 'Gachibowli ORR', city: 'Hyderabad', scheduledTime: '20:30', actualTime: '20:30', status: 'PASSED' },
      { name: 'MGBS Terminal', city: 'Hyderabad', scheduledTime: '21:00', actualTime: '21:05', status: 'PASSED' },
      { name: 'Jadcherla Toll', city: 'Jadcherla', scheduledTime: '22:45', actualTime: '22:40', status: 'PASSED' },
      { name: 'Kurnool Highway Bypass', city: 'Kurnool', scheduledTime: '00:30', actualTime: '00:32', status: 'CURRENT', notes: 'Scheduled 15-minute bio break at Food Court' },
      { name: 'Anantapur City Entry', city: 'Anantapur', scheduledTime: '02:45', status: 'UPCOMING' },
      { name: 'Hebbal Flyover', city: 'Bengaluru', scheduledTime: '04:45', status: 'UPCOMING' },
      { name: 'Majestic Central', city: 'Bengaluru', scheduledTime: '05:30', status: 'UPCOMING' }
    ]
  }
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-01',
    targetRole: 'CUSTOMER',
    targetUserId: 'USR-CUST-001',
    title: 'Booking Confirmed: BUS-2026-10001',
    message: 'Your seat 2B on Garuda Super Luxury (Guntur to Hyderabad) is confirmed for 10 Sept 2026.',
    type: 'BOOKING',
    read: false,
    createdAt: '2026-09-01T10:15:35.000Z'
  },
  {
    id: 'NOTIF-02',
    targetRole: 'CUSTOMER',
    targetUserId: 'USR-CUST-001',
    title: 'Refund Processed for BUS-2026-10006',
    message: 'Refund of ₹663 has been processed back to your original payment mode.',
    type: 'PAYMENT',
    read: true,
    createdAt: '2026-08-08T15:00:00.000Z'
  },
  {
    id: 'NOTIF-03',
    targetRole: 'CUSTOMER',
    title: 'New Coupon Available: ECOELECTRIC',
    message: 'Get ₹150 flat discount on luxury electric buses across major highways.',
    type: 'OFFER',
    read: false,
    createdAt: '2026-09-02T00:00:00.000Z'
  },
  {
    id: 'NOTIF-04',
    targetRole: 'ADMIN',
    title: 'New Confirmed Booking #BUS-2026-10003',
    message: 'Ananya Reddy booked seat L1 on Bharat Star Electric (Hyderabad to Bengaluru). Amount: ₹1565.',
    type: 'BOOKING',
    read: false,
    createdAt: '2026-09-02T01:10:25.000Z'
  },
  {
    id: 'NOTIF-05',
    targetRole: 'ADMIN',
    title: 'High Occupancy Alert: Route ROT-001',
    message: 'Guntur → Hyderabad night schedule SCH-001 has reached 88% seat occupancy.',
    type: 'ALERT',
    read: false,
    createdAt: '2026-09-02T02:00:00.000Z'
  }
];

export const SEED_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-09-02T02:30:00.000Z',
    userName: 'Vikram Mehta (Admin)',
    userRole: 'ADMIN',
    action: 'LOGIN',
    module: 'AUTH',
    description: 'Admin logged in to operations management console'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-09-02T01:10:20.000Z',
    userName: 'Ananya Reddy',
    userRole: 'CUSTOMER',
    action: 'BOOKING_CREATED',
    module: 'BOOKING',
    description: 'Created booking BUS-2026-10003 for seat L1 (HYD -> BLR) ₹1565'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-09-01T14:30:45.000Z',
    userName: 'Priya Patel',
    userRole: 'CUSTOMER',
    action: 'BOOKING_CREATED',
    module: 'BOOKING',
    description: 'Created booking BUS-2026-10002 for seats L2, L11 (GNT -> HYD) ₹2320'
  },
  {
    id: 'LOG-004',
    timestamp: '2026-09-01T10:15:30.000Z',
    userName: 'Rajesh Sharma',
    userRole: 'CUSTOMER',
    action: 'BOOKING_CREATED',
    module: 'BOOKING',
    description: 'Created booking BUS-2026-10001 for seat 2B (GNT -> HYD) ₹857'
  },
  {
    id: 'LOG-005',
    timestamp: '2026-08-30T16:00:00.000Z',
    userName: 'Vikram Mehta (Admin)',
    userRole: 'ADMIN',
    action: 'OFFER_CREATED',
    module: 'OFFER',
    description: 'Added promo offer ECOELECTRIC with discount value ₹150'
  }
];
