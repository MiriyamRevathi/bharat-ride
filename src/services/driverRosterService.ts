// Driver Hours of Service (HOS) & Fatigue Management System
export interface DriverDutyRecord {
  driverId: string;
  driverName: string;
  currentShiftStartTimestamp: number;
  continuousDrivingMinutes: number;
  accumulatedWeeklyDutyHours: number;
  lastMandatoryRestEndTimestamp: number;
  isNightShiftActive: boolean;
  breathalyzerLogScore: number;
}

export interface HOSComplianceAudit {
  driverId: string;
  isCompliant: boolean;
  violations: string[];
  remainingDrivingMinutesPermitted: number;
  isCoDriverRequired: boolean;
  nextMandatoryRestMinutes: number;
}

export function auditDriverHoursOfService(record: DriverDutyRecord, tripDistanceKm: number): HOSComplianceAudit {
  const violations: string[] = [];

  // 1. Continuous Driving Limit (Max 4.5 hours = 270 minutes without 45 min break)
  if (record.continuousDrivingMinutes > 270) {
    violations.push('Exceeded maximum continuous driving limit of 4.5 hours without mandatory 45-minute rest interval');
  }

  // 2. Weekly Duty Limit (Max 54 hours per 7 days)
  if (record.accumulatedWeeklyDutyHours >= 54) {
    violations.push('Driver has exhausted statutory weekly duty cap of 54 hours across 7 rolling days');
  }

  // 3. Mandatory Rest Period between shifts (minimum 11 consecutive hours)
  const now = Date.now();
  const hoursSinceLastRest = (now - record.lastMandatoryRestEndTimestamp) / (1000 * 60 * 60);
  if (hoursSinceLastRest < 11 && record.currentShiftStartTimestamp === now) {
    violations.push('Driver has not completed statutory 11-hour consecutive rest between successive shifts');
  }

  // 4. Breathalyzer Check (Strict zero tolerance)
  if (record.breathalyzerLogScore > 0) {
    violations.push('CRITICAL: Positive blood alcohol concentration detected on digital breathalyzer');
  }

  // 5. Co-Driver Rule for Long Haul Trips (> 400 km or > 8 hours)
  const isCoDriverRequired = tripDistanceKm > 400 || (record.isNightShiftActive && tripDistanceKm > 300);
  const remainingMins = Math.max(0, 270 - record.continuousDrivingMinutes);

  return {
    driverId: record.driverId,
    isCompliant: violations.length === 0,
    violations,
    remainingDrivingMinutesPermitted: remainingMins,
    isCoDriverRequired,
    nextMandatoryRestMinutes: record.continuousDrivingMinutes > 240 ? 45 : 0
  };
}

export function calculateDriverTripBatta(
  totalDistanceKm: number,
  tripHours: number,
  isNightShift: boolean
): { baseBattaINR: number; nightAllowanceINR: number; kmIncentiveINR: number; totalCompensationINR: number } {
  const baseBatta = 600; // Base daily allowance
  const nightAllowance = isNightShift ? 350 : 0;
  const kmIncentive = totalDistanceKm > 300 ? Math.round((totalDistanceKm - 300) * 1.5) : 0;
  return {
    baseBattaINR: baseBatta,
    nightAllowanceINR: nightAllowance,
    kmIncentiveINR: kmIncentive,
    totalCompensationINR: baseBatta + nightAllowance + kmIncentive
  };
}
