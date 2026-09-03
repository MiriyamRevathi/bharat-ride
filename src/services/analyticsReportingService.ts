// Enterprise Fleet Performance & Commercial Yield Analytics
export interface CorridorRevenueMetric {
  corridorId: string;
  totalTripsOperated: number;
  averageSeatOccupancyPercent: number;
  totalRevenueINR: number;
  costPerKilometerINR: number;
  revenuePerAvailableSeatKmINR: number;
  onTimeDeparturePercentage: number;
  customerNetPromoterScore: number;
}

export function computeFleetCommercialMetrics(
  totalKilometersRun: number,
  totalSeatsCapacity: number,
  totalSeatsBooked: number,
  grossTicketRevenueINR: number,
  fuelExpensesINR: number,
  tollExpensesINR: number,
  driverWagesINR: number
): {
  occupancyRatePercent: number;
  totalOperatingCostsINR: number;
  grossOperatingProfitINR: number;
  operatingMarginPercent: number;
  revPAS_INR: number;
} {
  const occupancy = totalSeatsCapacity > 0 ? (totalSeatsBooked / totalSeatsCapacity) * 100 : 0;
  const operatingCosts = fuelExpensesINR + tollExpensesINR + driverWagesINR + Math.round(totalKilometersRun * 4.5); // 4.5 INR/km maintenance reserve
  const profit = grossTicketRevenueINR - operatingCosts;
  const margin = grossTicketRevenueINR > 0 ? (profit / grossTicketRevenueINR) * 100 : 0;
  const totalSeatKm = totalSeatsCapacity * totalKilometersRun;
  const revPAS = totalSeatKm > 0 ? (grossTicketRevenueINR / totalSeatKm) : 0;

  return {
    occupancyRatePercent: Number(occupancy.toFixed(1)),
    totalOperatingCostsINR: operatingCosts,
    grossOperatingProfitINR: profit,
    operatingMarginPercent: Number(margin.toFixed(1)),
    revPAS_INR: Number(revPAS.toFixed(3))
  };
}
