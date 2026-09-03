// Live AIS-140 GPS Telemetry & Sensor Packet Simulator
export interface GPSTelemetryPacket {
  packetSequence: number;
  busId: string;
  timestampISO: string;
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  headingDegrees: number;
  currentSpeedKmph: number;
  engineRPM: number;
  coolantTempCelsius: number;
  fuelLevelPercentage: number;
  isIgnitionOn: boolean;
  isAirConditionerEngaged: boolean;
  isOverspeedAlertActive: boolean;
  isHarshBrakingDetected: boolean;
  gsmSignalBars: 1 | 2 | 3 | 4 | 5;
}

export function generateTelemetrySimulationPacket(
  busId: string,
  prevPacket?: GPSTelemetryPacket,
  originCoords: [number, number] = [17.3850, 78.4867],
  destCoords: [number, number] = [12.9716, 77.5946],
  progressPercent: number = 0.5
): GPSTelemetryPacket {
  const lat = originCoords[0] + (destCoords[0] - originCoords[0]) * progressPercent;
  const lng = originCoords[1] + (destCoords[1] - originCoords[1]) * progressPercent;
  const baseSpeed = progressPercent >= 0.95 || progressPercent <= 0.05 ? 25 : 78;
  const jitter = Math.sin(Date.now() / 1000) * 4;
  const speed = Math.max(0, Math.min(80, Math.round(baseSpeed + jitter)));
  const seq = (prevPacket?.packetSequence || 1000) + 1;

  return {
    packetSequence: seq,
    busId,
    timestampISO: new Date().toISOString(),
    latitude: Number(lat.toFixed(5)),
    longitude: Number(lng.toFixed(5)),
    altitudeMeters: 512,
    headingDegrees: 185,
    currentSpeedKmph: speed,
    engineRPM: speed > 0 ? 1450 + Math.round(speed * 10) : 650,
    coolantTempCelsius: 86,
    fuelLevelPercentage: Math.max(15, Math.round(85 - progressPercent * 50)),
    isIgnitionOn: true,
    isAirConditionerEngaged: true,
    isOverspeedAlertActive: speed > 80,
    isHarshBrakingDetected: false,
    gsmSignalBars: 4
  };
}
