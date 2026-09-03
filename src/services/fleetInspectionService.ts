// 50-Point Pre-Trip Vehicle Fitness & Safety Inspection System
export interface InspectionCheckItem {
  checkId: string;
  systemCategory: 'BRAKES_TIRES' | 'ELECTRICAL_LIGHTS' | 'ENGINE_FLUIDS' | 'SAFETY_EQUIPMENT' | 'CABIN_COMFORT' | 'DOCUMENTS';
  checkTitle: string;
  standardTolerance: string;
  isCriticalFailure: boolean;
  inspectorRole: 'CHIEF_MECHANIC' | 'DRIVER_CAPTAIN' | 'SAFETY_AUDITOR';
}

export const VEHICLE_INSPECTION_CHECKLIST: InspectionCheckItem[] = [
  {
    checkId: 'CHK-BRK-01',
    systemCategory: 'BRAKES_TIRES',
    checkTitle: 'Pneumatic Dual Circuit Air Pressure',
    standardTolerance: 'Must maintain 8.5 to 10.0 bar operating pressure with zero drop over 5 mins',
    isCriticalFailure: true,
    inspectorRole: 'DRIVER_CAPTAIN'
  },
  {
    checkId: 'CHK-BRK-02',
    systemCategory: 'BRAKES_TIRES',
    checkTitle: 'ABS / EBS Warning Lamp Sequence',
    standardTolerance: 'Must illuminate on ignition and extinguish within 3 seconds of engine crank',
    isCriticalFailure: true,
    inspectorRole: 'DRIVER_CAPTAIN'
  },
  {
    checkId: 'CHK-BRK-03',
    systemCategory: 'BRAKES_TIRES',
    checkTitle: 'Steer Axle Tyre Tread Depth',
    standardTolerance: 'Minimum 4.5mm uniform tread depth across all grooves, no cuts or bulges',
    isCriticalFailure: true,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-BRK-04',
    systemCategory: 'BRAKES_TIRES',
    checkTitle: 'Drive Axle Dual Wheel Lug Nut Torque',
    standardTolerance: 'Torqued to manufacturer spec 600 Nm using calibrated torque wrench',
    isCriticalFailure: true,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-BRK-05',
    systemCategory: 'BRAKES_TIRES',
    checkTitle: 'Retarder / Telma Auxiliary Brake Function',
    standardTolerance: 'Multi-stage electromagnetic retarder engages smoothly on stalk pull',
    isCriticalFailure: false,
    inspectorRole: 'DRIVER_CAPTAIN'
  },
  {
    checkId: 'CHK-ELC-01',
    systemCategory: 'ELECTRICAL_LIGHTS',
    checkTitle: 'Bi-Xenon / LED High & Low Beam Headlamps',
    standardTolerance: 'Both sides functional with clean lenses and correct vertical alignment',
    isCriticalFailure: true,
    inspectorRole: 'DRIVER_CAPTAIN'
  },
  {
    checkId: 'CHK-ELC-02',
    systemCategory: 'ELECTRICAL_LIGHTS',
    checkTitle: 'LED Daytime Running Lamps & Fog Lamps',
    standardTolerance: 'All LEDs operational, amber fog lamps working for mist conditions',
    isCriticalFailure: false,
    inspectorRole: 'DRIVER_CAPTAIN'
  },
  {
    checkId: 'CHK-ELC-03',
    systemCategory: 'ELECTRICAL_LIGHTS',
    checkTitle: 'High-Mounted Rear Brake Light & Turn Indicators',
    standardTolerance: 'Hazard lights flash synchronously at 90 pulses per minute',
    isCriticalFailure: true,
    inspectorRole: 'DRIVER_CAPTAIN'
  },
  {
    checkId: 'CHK-ELC-04',
    systemCategory: 'ELECTRICAL_LIGHTS',
    checkTitle: 'Passenger Individual Berth USB Outlets',
    standardTolerance: 'Minimum 5.1V at 2.4A on random 10-point test sample',
    isCriticalFailure: false,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-ELC-05',
    systemCategory: 'ELECTRICAL_LIGHTS',
    checkTitle: 'AIS-140 GPS Tracker GSM Signal & Satellite Lock',
    standardTolerance: 'Minimum 8 visible satellites, green telemetry heartbeat to cloud server',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-ENG-01',
    systemCategory: 'ENGINE_FLUIDS',
    checkTitle: '15W-40 CI-4 Diesel Engine Oil Level',
    standardTolerance: 'Dipstick level strictly between MIN and MAX marks, no frothing',
    isCriticalFailure: true,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-ENG-02',
    systemCategory: 'ENGINE_FLUIDS',
    checkTitle: 'Ethylene Glycol Coolant Reservoir Level',
    standardTolerance: 'Cold level at full line, anti-freeze concentration at 50%',
    isCriticalFailure: true,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-ENG-03',
    systemCategory: 'ENGINE_FLUIDS',
    checkTitle: 'DEF / AdBlue SCR Fluid Level',
    standardTolerance: 'Minimum 80% tank capacity filled to prevent power derate',
    isCriticalFailure: true,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-ENG-04',
    systemCategory: 'ENGINE_FLUIDS',
    checkTitle: 'Power Steering Hydraulic Fluid',
    standardTolerance: 'Fluid clear red without burnt odor, reservoir at level',
    isCriticalFailure: false,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-ENG-05',
    systemCategory: 'ENGINE_FLUIDS',
    checkTitle: 'Fuel Filter Water Separator Sediment Bowl',
    standardTolerance: 'Clean, transparent glass bowl drained of any water accumulation',
    isCriticalFailure: true,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-SFT-01',
    systemCategory: 'SAFETY_EQUIPMENT',
    checkTitle: 'Tungsten Glass Break Safety Hammers',
    standardTolerance: 'All 4 hammers present in secured brackets with tamper evident seals',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-SFT-02',
    systemCategory: 'SAFETY_EQUIPMENT',
    checkTitle: 'Dry Chemical Powder (DCP) Fire Extinguishers',
    standardTolerance: '2x 6kg extinguishers with pressure gauge needles in the green zone',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-SFT-03',
    systemCategory: 'SAFETY_EQUIPMENT',
    checkTitle: 'Engine Bay Fire Detection & Suppression System',
    standardTolerance: 'Thermal sensing cable pressurized, zero trouble codes on dash panel',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-SFT-04',
    systemCategory: 'SAFETY_EQUIPMENT',
    checkTitle: 'Emergency Roof Escape Hatches & Locks',
    standardTolerance: 'Both front and rear hatches unlatch freely with manual push',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-SFT-05',
    systemCategory: 'SAFETY_EQUIPMENT',
    checkTitle: 'Driver Breathalyzer Zero BAC Verification',
    standardTolerance: 'Driver alcohol test reading exactly 0.000 mg/L before boarding',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-SFT-06',
    systemCategory: 'SAFETY_EQUIPMENT',
    checkTitle: 'Speed Governor Calibration Certificate',
    standardTolerance: 'Electronic governor locked to maximum 80 km/h as per MoRTH mandate',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-CAB-01',
    systemCategory: 'CABIN_COMFORT',
    checkTitle: 'Dual Carrier AC Compressor Cooling',
    standardTolerance: 'Cabin temperature pulls down to 21°C within 15 minutes of idle',
    isCriticalFailure: false,
    inspectorRole: 'CHIEF_MECHANIC'
  },
  {
    checkId: 'CHK-CAB-02',
    systemCategory: 'CABIN_COMFORT',
    checkTitle: 'Berth Sanitization & Fresh Bedroll Linen',
    standardTolerance: 'All 36 berths vacuumed, fresh sanitized bedsheet and pillow cover placed',
    isCriticalFailure: false,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-CAB-03',
    systemCategory: 'CABIN_COMFORT',
    checkTitle: 'Emergency Window Glass Clear Visibility',
    standardTolerance: 'Zero unauthorized tint films, safety signage visible in 3 languages',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-DOC-01',
    systemCategory: 'DOCUMENTS',
    checkTitle: 'All India Tourist Permit (AITP) Validity',
    standardTolerance: 'Original digitized permit active on Vahan portal',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-DOC-02',
    systemCategory: 'DOCUMENTS',
    checkTitle: 'Comprehensive Commercial Vehicle Insurance',
    standardTolerance: 'Third-party passenger liability active, policy copy inside glovebox',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-DOC-03',
    systemCategory: 'DOCUMENTS',
    checkTitle: 'Pollution Under Control (PUC) Certificate',
    standardTolerance: 'Valid online PUC QR code showing smoke opacity below 50 HSU',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
  {
    checkId: 'CHK-DOC-04',
    systemCategory: 'DOCUMENTS',
    checkTitle: 'Vehicle Fitness Certificate (Form 38)',
    standardTolerance: 'Valid RTO fitness endorsement with intact chassis stamping',
    isCriticalFailure: true,
    inspectorRole: 'SAFETY_AUDITOR'
  },
];

export interface InspectionReportResult {
  busId: string;
  inspectorId: string;
  passedCount: number;
  failedCount: number;
  isFitForCommercialService: boolean;
  defectsLog: string[];
  timestamp: string;
}

export function conductPreTripFitnessAudit(
  busId: string,
  inspectorId: string,
  failedItemIds: string[]
): InspectionReportResult {
  const criticalFails = VEHICLE_INSPECTION_CHECKLIST.filter(
    item => failedItemIds.includes(item.checkId) && item.isCriticalFailure
  );

  const defectsLog = VEHICLE_INSPECTION_CHECKLIST
    .filter(item => failedItemIds.includes(item.checkId))
    .map(item => `[${item.systemCategory}] ${item.checkTitle}: Failed tolerance (${item.standardTolerance})`);

  return {
    busId,
    inspectorId,
    passedCount: VEHICLE_INSPECTION_CHECKLIST.length - failedItemIds.length,
    failedCount: failedItemIds.length,
    isFitForCommercialService: criticalFails.length === 0,
    defectsLog,
    timestamp: new Date().toISOString()
  };
}
