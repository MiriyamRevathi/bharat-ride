// Bus Amenities & Equipment Catalog
export interface BusAmenitySpecification {
  amenityId: string;
  category: 'COMFORT' | 'SAFETY' | 'CONNECTIVITY' | 'HYGIENE' | 'ENTERTAINMENT';
  name: string;
  description: string;
  iconName: string;
  isStandardAcrossFleet: boolean;
  maintenanceCheckIntervalDays: number;
  regulatoryMandate?: string;
}

export const BUS_AMENITIES_CATALOG: BusAmenitySpecification[] = [
  {
    amenityId: 'AMEN-WIFI',
    category: 'CONNECTIVITY',
    name: 'High-Speed 5G WiFi',
    description: 'Seamless passenger connectivity across national expressway corridors',
    iconName: 'Wifi',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 7,
  },
  {
    amenityId: 'AMEN-USBC',
    category: 'CONNECTIVITY',
    name: '65W USB-C PD & USB-A Ports',
    description: 'Fast charging sockets at every individual passenger berth and seat',
    iconName: 'Zap',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 3,
  },
  {
    amenityId: 'AMEN-GPS',
    category: 'SAFETY',
    name: 'AIS-140 Certified GPS Telemetry',
    description: 'Real-time satellite tracking with dual-SIM GSM failover connected to state command center',
    iconName: 'Navigation',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 1,
    regulatoryMandate: 'AIS-140 MoRTH Mandate'
  },
  {
    amenityId: 'AMEN-PANIC',
    category: 'SAFETY',
    name: 'Emergency SOS Panic Switches',
    description: 'Illuminated emergency buttons on every window pillar linked directly to PCR 112',
    iconName: 'AlertCircle',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 1,
    regulatoryMandate: 'CMVR Rule 125H'
  },
  {
    amenityId: 'AMEN-HAMMER',
    category: 'SAFETY',
    name: 'Tungsten Glass-Break Hammers',
    description: 'Four emergency exit hammers positioned adjacent to designated breakable windows',
    iconName: 'Shield',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 1,
    regulatoryMandate: 'AIS-052 Bus Code'
  },
  {
    amenityId: 'AMEN-FIRE',
    category: 'SAFETY',
    name: 'Automated Engine Fire Suppression',
    description: 'Thermal sensor and aerosol suppression system in the rear engine compartment',
    iconName: 'Flame',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 30,
    regulatoryMandate: 'AIS-135'
  },
  {
    amenityId: 'AMEN-BLANKET',
    category: 'HYGIENE',
    name: 'UV-Sanitized Fleece Blankets',
    description: 'Individually heat-sealed fresh blankets distributed on all overnight sleeper services',
    iconName: 'PackageCheck',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 1,
  },
  {
    amenityId: 'AMEN-WATER',
    category: 'HYGIENE',
    name: 'BIS-Certified Packaged Mineral Water',
    description: 'Complimentary 500ml sealed mineral water bottle for every confirmed passenger',
    iconName: 'Droplet',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 1,
    regulatoryMandate: 'FSSAI Standards'
  },
  {
    amenityId: 'AMEN-AIRSUSP',
    category: 'COMFORT',
    name: 'Electronically Controlled Air Suspension',
    description: 'Multi-stage ECAS air bellows dampening expressway road vibration and body roll',
    iconName: 'Activity',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 15,
  },
  {
    amenityId: 'AMEN-CALF',
    category: 'COMFORT',
    name: 'Memory Foam Seats with Calf Support',
    description: 'Ergonomic semi-sleeper seats with 135-degree recline and extendable calf rest',
    iconName: 'Armchair',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 14,
  },
  {
    amenityId: 'AMEN-AC',
    category: 'COMFORT',
    name: 'Dual-Compressor Climate Control',
    description: 'Individual adjustable air vents with HEPA pollen filtration ensuring 21-degree cabin temp',
    iconName: 'Wind',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 7,
  },
  {
    amenityId: 'AMEN-LIGHT',
    category: 'COMFORT',
    name: 'Individual Directional Reading Lights',
    description: 'Warm LED reading spotlight positioned to avoid disturbing co-passengers',
    iconName: 'Sun',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 7,
  },
  {
    amenityId: 'AMEN-CCTV',
    category: 'SAFETY',
    name: 'Night-Vision Cabin CCTV Cameras',
    description: '360-degree security monitoring with 30-day secure onboard black-box DVR storage',
    iconName: 'Video',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 1,
    regulatoryMandate: 'MHA Women Safety Guidelines'
  },
  {
    amenityId: 'AMEN-FIRSTAID',
    category: 'SAFETY',
    name: 'Comprehensive Trauma First Aid Kit',
    description: 'Bandages, burn dressings, antiseptic solution, ORS packets, and basic OTC analgesics',
    iconName: 'PlusSquare',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 7,
    regulatoryMandate: 'CMVR Section 138'
  },
  {
    amenityId: 'AMEN-LUGGAGE',
    category: 'COMFORT',
    name: 'Pneumatic Lock Baggage Hold',
    description: 'Spacious 12-cubic-meter under-floor luggage bay with RFID tag security matching',
    iconName: 'Luggage',
    isStandardAcrossFleet: true,
    maintenanceCheckIntervalDays: 7,
  },
];

export function getAmenitiesForCategory(category: string): BusAmenitySpecification[] {
  return BUS_AMENITIES_CATALOG.filter(a => a.category === category);
}
