import { ALL_HIGHWAY_CORRIDORS, INDIAN_CITIES_REGISTRY, HighwayCorridorDefinition, CityTransitHub } from '../constants/indianCitiesCorridors';

export interface RouteWayPoint {
  order: number;
  pointName: string;
  latitude: number;
  longitude: number;
  distanceFromOriginKm: number;
  estimatedMinutesFromOrigin: number;
  isTollPlaza: boolean;
  isRestStop: boolean;
  tollAmountINR?: number;
}

export interface CorridorAnalytics {
  corridorId: string;
  originCity: string;
  destCity: string;
  totalDistanceKm: number;
  approxTollExpensesINR: number;
  carbonFootprintKgPerPassenger: number;
  recommendedStopsCount: number;
  ghatSectionRiskLevel: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH';
}

export function getCorridorAnalytics(sourceCityId: string, destCityId: string): CorridorAnalytics | null {
  const corr = ALL_HIGHWAY_CORRIDORS.find(c => c.sourceCityId === sourceCityId && c.destinationCityId === destCityId);
  if (!corr) return null;
  const origin = INDIAN_CITIES_REGISTRY[sourceCityId]?.cityName || sourceCityId;
  const dest = INDIAN_CITIES_REGISTRY[destCityId]?.cityName || destCityId;
  return {
    corridorId: corr.corridorId,
    originCity: origin,
    destCity: dest,
    totalDistanceKm: corr.totalDistanceKm,
    approxTollExpensesINR: corr.averageTollChargeINR,
    carbonFootprintKgPerPassenger: Math.round(corr.totalDistanceKm * 0.042),
    recommendedStopsCount: corr.approvedRestStops.length,
    ghatSectionRiskLevel: corr.terrainClassification === 'GHAT_MOUNTAINOUS' ? 'HIGH' : 'LOW'
  };
}

export function interpolateCorridorWaypoints(corridorId: string): RouteWayPoint[] {
  const corr = ALL_HIGHWAY_CORRIDORS.find(c => c.corridorId === corridorId);
  if (!corr) return [];
  const origin = INDIAN_CITIES_REGISTRY[corr.sourceCityId];
  const dest = INDIAN_CITIES_REGISTRY[corr.destinationCityId];
  if (!origin || !dest) return [];

  const points: RouteWayPoint[] = [];
  const totalSteps = 10;
  for (let i = 0; i <= totalSteps; i++) {
    const fraction = i / totalSteps;
    const lat = origin.latitude + (dest.latitude - origin.latitude) * fraction;
    const lng = origin.longitude + (dest.longitude - origin.longitude) * fraction;
    const dist = Math.round(corr.totalDistanceKm * fraction);
    const mins = Math.round(corr.typicalDrivingMinutes * fraction);
    const isToll = i > 0 && i < totalSteps && i % 3 === 0;
    const isRest = i === 5;
    points.push({
      order: i + 1,
      pointName: i === 0 ? origin.cityName : i === totalSteps ? dest.cityName : isRest ? 'Highway Rest Stop Oasis' : isToll ? `Toll Plaza Gate #${i}` : `Highway Waypoint #${i}`,
      latitude: Number(lat.toFixed(4)),
      longitude: Number(lng.toFixed(4)),
      distanceFromOriginKm: dist,
      estimatedMinutesFromOrigin: mins,
      isTollPlaza: isToll,
      isRestStop: isRest,
      tollAmountINR: isToll ? 95 : undefined
    });
  }
  return points;
}
