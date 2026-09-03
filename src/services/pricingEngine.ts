// Enterprise Fare & Dynamic Yield Management Engine
// Handles base tariffs, time-decay multipliers, festival surge, diesel indexation and GST

export interface TariffSlab {
  slabId: string;
  busCategory: 'SEATER_NON_AC' | 'SEATER_AC' | 'SLEEPER_AC' | 'VOLVO_MULTI_AXLE' | 'SCANIA_METROLINK' | 'MERCEDES_BENZ_GLIDER';
  baseRatePerKmINR: number;
  minTripFareINR: number;
  lowerBerthPremiumINR: number;
  upperBerthDiscountINR: number;
  singleLadySeatProtected: boolean;
  fuelSurchargePercentage: number;
  nightOperationAllowanceINR: number;
}

export interface DynamicPricingFactors {
  seatOccupancyPercentage: number;
  hoursUntilDeparture: number;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isFestivalDate: boolean;
  weatherConditionMultiplier: number;
  dieselPriceChangePercent: number;
  isReturnTripBooked: boolean;
  isSeniorCitizenOrStudent: boolean;
}

export interface DetailedFareQuote {
  baseFare: number;
  dynamicSurgeAmount: number;
  fuelSurcharge: number;
  deckAdjustment: number;
  subTotalBeforeTax: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  fastagTollContribution: number;
  passengerSafetyInsurance: number;
  concessionDiscount: number;
  promoDiscountApplied: number;
  finalNetPayableAmount: number;
  currencyCode: 'INR';
  quoteValidDurationSeconds: number;
}

export const TARIFF_REGISTRY: Record<string, TariffSlab> = {
  'SEATER_NON_AC': {
    slabId: 'SLAB-SEATER_NON_AC',
    busCategory: 'SEATER_NON_AC',
    baseRatePerKmINR: 1.35,
    minTripFareINR: 250,
    lowerBerthPremiumINR: 0,
    upperBerthDiscountINR: 0,
    singleLadySeatProtected: true,
    fuelSurchargePercentage: 3.5,
    nightOperationAllowanceINR: 50
  },
  'SEATER_AC': {
    slabId: 'SLAB-SEATER_AC',
    busCategory: 'SEATER_AC',
    baseRatePerKmINR: 1.85,
    minTripFareINR: 380,
    lowerBerthPremiumINR: 0,
    upperBerthDiscountINR: 0,
    singleLadySeatProtected: true,
    fuelSurchargePercentage: 4.0,
    nightOperationAllowanceINR: 75
  },
  'SLEEPER_AC': {
    slabId: 'SLAB-SLEEPER_AC',
    busCategory: 'SLEEPER_AC',
    baseRatePerKmINR: 2.45,
    minTripFareINR: 550,
    lowerBerthPremiumINR: 120,
    upperBerthDiscountINR: 60,
    singleLadySeatProtected: true,
    fuelSurchargePercentage: 4.5,
    nightOperationAllowanceINR: 100
  },
  'VOLVO_MULTI_AXLE': {
    slabId: 'SLAB-VOLVO_MULTI_AXLE',
    busCategory: 'VOLVO_MULTI_AXLE',
    baseRatePerKmINR: 2.95,
    minTripFareINR: 750,
    lowerBerthPremiumINR: 150,
    upperBerthDiscountINR: 80,
    singleLadySeatProtected: true,
    fuelSurchargePercentage: 5.0,
    nightOperationAllowanceINR: 150
  },
  'SCANIA_METROLINK': {
    slabId: 'SLAB-SCANIA_METROLINK',
    busCategory: 'SCANIA_METROLINK',
    baseRatePerKmINR: 3.1,
    minTripFareINR: 800,
    lowerBerthPremiumINR: 160,
    upperBerthDiscountINR: 85,
    singleLadySeatProtected: true,
    fuelSurchargePercentage: 5.0,
    nightOperationAllowanceINR: 150
  },
  'MERCEDES_BENZ_GLIDER': {
    slabId: 'SLAB-MERCEDES_BENZ_GLIDER',
    busCategory: 'MERCEDES_BENZ_GLIDER',
    baseRatePerKmINR: 3.4,
    minTripFareINR: 950,
    lowerBerthPremiumINR: 200,
    upperBerthDiscountINR: 100,
    singleLadySeatProtected: true,
    fuelSurchargePercentage: 5.5,
    nightOperationAllowanceINR: 200
  },
};

export const FESTIVAL_SURGE_CALENDAR: Record<string, { multiplier: number; reason: string }> = {
  '2026-01-14': { multiplier: 1.45, reason: 'Sankranti / Pongal Peak Rush' },
  '2026-01-15': { multiplier: 1.5, reason: 'Makar Sankranti Return Rush' },
  '2026-01-26': { multiplier: 1.25, reason: 'Republic Day Long Weekend' },
  '2026-03-04': { multiplier: 1.35, reason: 'Holi Festival Travel' },
  '2026-03-20': { multiplier: 1.3, reason: 'Ugadi / Gudi Padwa Festival' },
  '2026-04-14': { multiplier: 1.3, reason: 'Tamil New Year / Vishu' },
  '2026-08-15': { multiplier: 1.4, reason: 'Independence Day Long Weekend' },
  '2026-08-28': { multiplier: 1.35, reason: 'Raksha Bandhan Rush' },
  '2026-09-04': { multiplier: 1.4, reason: 'Janmashtami Weekend' },
  '2026-09-15': { multiplier: 1.45, reason: 'Ganesh Chaturthi Festivities' },
  '2026-10-02': { multiplier: 1.35, reason: 'Gandhi Jayanti Long Weekend' },
  '2026-10-18': { multiplier: 1.55, reason: 'Dussehra / Vijayadashami Peak' },
  '2026-11-08': { multiplier: 1.65, reason: 'Diwali Deepavali Mega Rush' },
  '2026-11-12': { multiplier: 1.6, reason: 'Bhai Dooj Return Peak' },
  '2026-12-25': { multiplier: 1.4, reason: 'Christmas Holiday Travel' },
  '2026-12-31': { multiplier: 1.7, reason: 'New Year Eve High Demand' },
  '2026-WEEKEND-001': { multiplier: 1.15, reason: 'Weekend Expressway Demand #1' },
  '2026-WEEKEND-002': { multiplier: 1.2, reason: 'Weekend Expressway Demand #2' },
  '2026-WEEKEND-003': { multiplier: 1.25, reason: 'Weekend Expressway Demand #3' },
  '2026-WEEKEND-004': { multiplier: 1.3, reason: 'Weekend Expressway Demand #4' },
  '2026-WEEKEND-005': { multiplier: 1.1, reason: 'Weekend Expressway Demand #5' },
  '2026-WEEKEND-006': { multiplier: 1.15, reason: 'Weekend Expressway Demand #6' },
  '2026-WEEKEND-007': { multiplier: 1.2, reason: 'Weekend Expressway Demand #7' },
  '2026-WEEKEND-008': { multiplier: 1.25, reason: 'Weekend Expressway Demand #8' },
  '2026-WEEKEND-009': { multiplier: 1.3, reason: 'Weekend Expressway Demand #9' },
  '2026-WEEKEND-010': { multiplier: 1.1, reason: 'Weekend Expressway Demand #10' },
  '2026-WEEKEND-011': { multiplier: 1.15, reason: 'Weekend Expressway Demand #11' },
  '2026-WEEKEND-012': { multiplier: 1.2, reason: 'Weekend Expressway Demand #12' },
  '2026-WEEKEND-013': { multiplier: 1.25, reason: 'Weekend Expressway Demand #13' },
  '2026-WEEKEND-014': { multiplier: 1.3, reason: 'Weekend Expressway Demand #14' },
  '2026-WEEKEND-015': { multiplier: 1.1, reason: 'Weekend Expressway Demand #15' },
  '2026-WEEKEND-016': { multiplier: 1.15, reason: 'Weekend Expressway Demand #16' },
  '2026-WEEKEND-017': { multiplier: 1.2, reason: 'Weekend Expressway Demand #17' },
  '2026-WEEKEND-018': { multiplier: 1.25, reason: 'Weekend Expressway Demand #18' },
  '2026-WEEKEND-019': { multiplier: 1.3, reason: 'Weekend Expressway Demand #19' },
  '2026-WEEKEND-020': { multiplier: 1.1, reason: 'Weekend Expressway Demand #20' },
  '2026-WEEKEND-021': { multiplier: 1.15, reason: 'Weekend Expressway Demand #21' },
  '2026-WEEKEND-022': { multiplier: 1.2, reason: 'Weekend Expressway Demand #22' },
  '2026-WEEKEND-023': { multiplier: 1.25, reason: 'Weekend Expressway Demand #23' },
  '2026-WEEKEND-024': { multiplier: 1.3, reason: 'Weekend Expressway Demand #24' },
  '2026-WEEKEND-025': { multiplier: 1.1, reason: 'Weekend Expressway Demand #25' },
  '2026-WEEKEND-026': { multiplier: 1.15, reason: 'Weekend Expressway Demand #26' },
  '2026-WEEKEND-027': { multiplier: 1.2, reason: 'Weekend Expressway Demand #27' },
  '2026-WEEKEND-028': { multiplier: 1.25, reason: 'Weekend Expressway Demand #28' },
  '2026-WEEKEND-029': { multiplier: 1.3, reason: 'Weekend Expressway Demand #29' },
  '2026-WEEKEND-030': { multiplier: 1.1, reason: 'Weekend Expressway Demand #30' },
  '2026-WEEKEND-031': { multiplier: 1.15, reason: 'Weekend Expressway Demand #31' },
  '2026-WEEKEND-032': { multiplier: 1.2, reason: 'Weekend Expressway Demand #32' },
  '2026-WEEKEND-033': { multiplier: 1.25, reason: 'Weekend Expressway Demand #33' },
  '2026-WEEKEND-034': { multiplier: 1.3, reason: 'Weekend Expressway Demand #34' },
  '2026-WEEKEND-035': { multiplier: 1.1, reason: 'Weekend Expressway Demand #35' },
  '2026-WEEKEND-036': { multiplier: 1.15, reason: 'Weekend Expressway Demand #36' },
  '2026-WEEKEND-037': { multiplier: 1.2, reason: 'Weekend Expressway Demand #37' },
  '2026-WEEKEND-038': { multiplier: 1.25, reason: 'Weekend Expressway Demand #38' },
  '2026-WEEKEND-039': { multiplier: 1.3, reason: 'Weekend Expressway Demand #39' },
  '2026-WEEKEND-040': { multiplier: 1.1, reason: 'Weekend Expressway Demand #40' },
  '2026-WEEKEND-041': { multiplier: 1.15, reason: 'Weekend Expressway Demand #41' },
  '2026-WEEKEND-042': { multiplier: 1.2, reason: 'Weekend Expressway Demand #42' },
  '2026-WEEKEND-043': { multiplier: 1.25, reason: 'Weekend Expressway Demand #43' },
  '2026-WEEKEND-044': { multiplier: 1.3, reason: 'Weekend Expressway Demand #44' },
  '2026-WEEKEND-045': { multiplier: 1.1, reason: 'Weekend Expressway Demand #45' },
  '2026-WEEKEND-046': { multiplier: 1.15, reason: 'Weekend Expressway Demand #46' },
  '2026-WEEKEND-047': { multiplier: 1.2, reason: 'Weekend Expressway Demand #47' },
  '2026-WEEKEND-048': { multiplier: 1.25, reason: 'Weekend Expressway Demand #48' },
  '2026-WEEKEND-049': { multiplier: 1.3, reason: 'Weekend Expressway Demand #49' },
  '2026-WEEKEND-050': { multiplier: 1.1, reason: 'Weekend Expressway Demand #50' },
  '2026-WEEKEND-051': { multiplier: 1.15, reason: 'Weekend Expressway Demand #51' },
  '2026-WEEKEND-052': { multiplier: 1.2, reason: 'Weekend Expressway Demand #52' },
  '2026-WEEKEND-053': { multiplier: 1.25, reason: 'Weekend Expressway Demand #53' },
  '2026-WEEKEND-054': { multiplier: 1.3, reason: 'Weekend Expressway Demand #54' },
  '2026-WEEKEND-055': { multiplier: 1.1, reason: 'Weekend Expressway Demand #55' },
  '2026-WEEKEND-056': { multiplier: 1.15, reason: 'Weekend Expressway Demand #56' },
  '2026-WEEKEND-057': { multiplier: 1.2, reason: 'Weekend Expressway Demand #57' },
  '2026-WEEKEND-058': { multiplier: 1.25, reason: 'Weekend Expressway Demand #58' },
  '2026-WEEKEND-059': { multiplier: 1.3, reason: 'Weekend Expressway Demand #59' },
  '2026-WEEKEND-060': { multiplier: 1.1, reason: 'Weekend Expressway Demand #60' },
  '2026-WEEKEND-061': { multiplier: 1.15, reason: 'Weekend Expressway Demand #61' },
  '2026-WEEKEND-062': { multiplier: 1.2, reason: 'Weekend Expressway Demand #62' },
  '2026-WEEKEND-063': { multiplier: 1.25, reason: 'Weekend Expressway Demand #63' },
  '2026-WEEKEND-064': { multiplier: 1.3, reason: 'Weekend Expressway Demand #64' },
  '2026-WEEKEND-065': { multiplier: 1.1, reason: 'Weekend Expressway Demand #65' },
  '2026-WEEKEND-066': { multiplier: 1.15, reason: 'Weekend Expressway Demand #66' },
  '2026-WEEKEND-067': { multiplier: 1.2, reason: 'Weekend Expressway Demand #67' },
  '2026-WEEKEND-068': { multiplier: 1.25, reason: 'Weekend Expressway Demand #68' },
  '2026-WEEKEND-069': { multiplier: 1.3, reason: 'Weekend Expressway Demand #69' },
  '2026-WEEKEND-070': { multiplier: 1.1, reason: 'Weekend Expressway Demand #70' },
  '2026-WEEKEND-071': { multiplier: 1.15, reason: 'Weekend Expressway Demand #71' },
  '2026-WEEKEND-072': { multiplier: 1.2, reason: 'Weekend Expressway Demand #72' },
  '2026-WEEKEND-073': { multiplier: 1.25, reason: 'Weekend Expressway Demand #73' },
  '2026-WEEKEND-074': { multiplier: 1.3, reason: 'Weekend Expressway Demand #74' },
  '2026-WEEKEND-075': { multiplier: 1.1, reason: 'Weekend Expressway Demand #75' },
  '2026-WEEKEND-076': { multiplier: 1.15, reason: 'Weekend Expressway Demand #76' },
  '2026-WEEKEND-077': { multiplier: 1.2, reason: 'Weekend Expressway Demand #77' },
  '2026-WEEKEND-078': { multiplier: 1.25, reason: 'Weekend Expressway Demand #78' },
  '2026-WEEKEND-079': { multiplier: 1.3, reason: 'Weekend Expressway Demand #79' },
  '2026-WEEKEND-080': { multiplier: 1.1, reason: 'Weekend Expressway Demand #80' },
  '2026-WEEKEND-081': { multiplier: 1.15, reason: 'Weekend Expressway Demand #81' },
  '2026-WEEKEND-082': { multiplier: 1.2, reason: 'Weekend Expressway Demand #82' },
  '2026-WEEKEND-083': { multiplier: 1.25, reason: 'Weekend Expressway Demand #83' },
  '2026-WEEKEND-084': { multiplier: 1.3, reason: 'Weekend Expressway Demand #84' },
  '2026-WEEKEND-085': { multiplier: 1.1, reason: 'Weekend Expressway Demand #85' },
  '2026-WEEKEND-086': { multiplier: 1.15, reason: 'Weekend Expressway Demand #86' },
  '2026-WEEKEND-087': { multiplier: 1.2, reason: 'Weekend Expressway Demand #87' },
  '2026-WEEKEND-088': { multiplier: 1.25, reason: 'Weekend Expressway Demand #88' },
  '2026-WEEKEND-089': { multiplier: 1.3, reason: 'Weekend Expressway Demand #89' },
  '2026-WEEKEND-090': { multiplier: 1.1, reason: 'Weekend Expressway Demand #90' },
  '2026-WEEKEND-091': { multiplier: 1.15, reason: 'Weekend Expressway Demand #91' },
  '2026-WEEKEND-092': { multiplier: 1.2, reason: 'Weekend Expressway Demand #92' },
  '2026-WEEKEND-093': { multiplier: 1.25, reason: 'Weekend Expressway Demand #93' },
  '2026-WEEKEND-094': { multiplier: 1.3, reason: 'Weekend Expressway Demand #94' },
  '2026-WEEKEND-095': { multiplier: 1.1, reason: 'Weekend Expressway Demand #95' },
  '2026-WEEKEND-096': { multiplier: 1.15, reason: 'Weekend Expressway Demand #96' },
  '2026-WEEKEND-097': { multiplier: 1.2, reason: 'Weekend Expressway Demand #97' },
  '2026-WEEKEND-098': { multiplier: 1.25, reason: 'Weekend Expressway Demand #98' },
  '2026-WEEKEND-099': { multiplier: 1.3, reason: 'Weekend Expressway Demand #99' },
};

export function calculateComprehensiveFareQuote(
  distanceKm: number,
  category: 'SEATER_NON_AC' | 'SEATER_AC' | 'SLEEPER_AC' | 'VOLVO_MULTI_AXLE' | 'SCANIA_METROLINK' | 'MERCEDES_BENZ_GLIDER',
  deck: 'LOWER' | 'UPPER',
  factors: DynamicPricingFactors,
  couponCode?: string,
  isInterstate?: boolean
): DetailedFareQuote {
  const slab = TARIFF_REGISTRY[category] || TARIFF_REGISTRY['SEATER_AC'];
  const standardBase = Math.max(slab.minTripFareINR, distanceKm * slab.baseRatePerKmINR);

  // 1. Demand & Occupancy Multiplier (Yield Management)
  let surgeFactor = 1.0;
  if (factors.seatOccupancyPercentage > 90) {
    surgeFactor = 1.35;
  } else if (factors.seatOccupancyPercentage > 75) {
    surgeFactor = 1.20;
  } else if (factors.seatOccupancyPercentage > 50) {
    surgeFactor = 1.08;
  } else if (factors.seatOccupancyPercentage < 25 && factors.hoursUntilDeparture < 6) {
    // Last minute flash discount
    surgeFactor = 0.88;
  }

  // 2. Day of Week Adjustment (Fridays and Sundays peak)
  let dayFactor = 1.0;
  if (factors.dayOfWeek === 5 || factors.dayOfWeek === 0) {
    dayFactor = 1.15;
  } else if (factors.dayOfWeek === 6) {
    dayFactor = 1.10;
  }

  // 3. Festival Multiplier
  const festivalFactor = factors.isFestivalDate ? 1.30 : 1.0;

  // Total dynamic amount
  const dynamicFare = standardBase * surgeFactor * dayFactor * festivalFactor * factors.weatherConditionMultiplier;
  const surgeAmount = Math.max(0, dynamicFare - standardBase);

  // 4. Fuel & Deck adjustments
  const fuelSurcharge = (standardBase * slab.fuelSurchargePercentage) / 100;
  const deckAdjustment = deck === 'LOWER' ? slab.lowerBerthPremiumINR : -slab.upperBerthDiscountINR;

  // 5. Concession (Senior Citizens / Students)
  let concessionDiscount = 0;
  if (factors.isSeniorCitizenOrStudent) {
    concessionDiscount = standardBase * 0.10;
  }
  if (factors.isReturnTripBooked) {
    concessionDiscount += standardBase * 0.05;
  }

  // 6. Subtotal before taxation
  const subTotalBeforeTax = Math.round(standardBase + surgeAmount + fuelSurcharge + deckAdjustment - concessionDiscount);

  // 7. Statutory Taxes (5% GST for bus passenger transportation)
  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;
  if (isInterstate) {
    igstAmount = Math.round(subTotalBeforeTax * 0.05);
  } else {
    cgstAmount = Math.round(subTotalBeforeTax * 0.025);
    sgstAmount = Math.round(subTotalBeforeTax * 0.025);
  }

  // 8. Fixed Toll and Safety Insurance
  const fastagTollContribution = Math.round(Math.min(150, Math.max(35, distanceKm * 0.18)));
  const passengerSafetyInsurance = 15;

  // 9. Coupon Discount
  let promoDiscountApplied = 0;
  if (couponCode) {
    const normalizedCoupon = couponCode.toUpperCase().trim();
    if (normalizedCoupon === 'BHARATFIRST' || normalizedCoupon === 'WELCOME100') {
      promoDiscountApplied = Math.min(150, subTotalBeforeTax * 0.15);
    } else if (normalizedCoupon === 'SUPERFAST' || normalizedCoupon === 'FESTIVAL20') {
      promoDiscountApplied = Math.min(250, subTotalBeforeTax * 0.20);
    }
  }

  const finalNetPayableAmount = Math.max(100, subTotalBeforeTax + cgstAmount + sgstAmount + igstAmount + fastagTollContribution + passengerSafetyInsurance - promoDiscountApplied);

  return {
    baseFare: Math.round(standardBase),
    dynamicSurgeAmount: Math.round(surgeAmount),
    fuelSurcharge: Math.round(fuelSurcharge),
    deckAdjustment,
    subTotalBeforeTax,
    cgstAmount,
    sgstAmount,
    igstAmount,
    fastagTollContribution,
    passengerSafetyInsurance,
    concessionDiscount: Math.round(concessionDiscount),
    promoDiscountApplied: Math.round(promoDiscountApplied),
    finalNetPayableAmount: Math.round(finalNetPayableAmount),
    currencyCode: 'INR',
    quoteValidDurationSeconds: 600
  };
}
