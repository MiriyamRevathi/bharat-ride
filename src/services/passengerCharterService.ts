// Passenger Rights Charter, Delay Compensations & Refund Slabs
export interface CancellationRefundCalculation {
  originalFareINR: number;
  hoursBeforeScheduledDeparture: number;
  refundPercentage: number;
  cancellationFeeINR: number;
  netRefundPayableINR: number;
  refundMode: 'INSTANT_ORIGINAL_SOURCE' | 'BHARAT_BUS_WALLET';
  walletBonusINR: number;
}

export function computePassengerCancellationRefund(
  originalFareINR: number,
  hoursBeforeScheduledDeparture: number,
  preferWalletCredit: boolean = false
): CancellationRefundCalculation {
  let refundPercentage = 0;
  if (hoursBeforeScheduledDeparture >= 24) {
    refundPercentage = 90; // 10% deduction
  } else if (hoursBeforeScheduledDeparture >= 12) {
    refundPercentage = 75; // 25% deduction
  } else if (hoursBeforeScheduledDeparture >= 4) {
    refundPercentage = 50; // 50% deduction
  } else {
    refundPercentage = 0; // Non-refundable under 4 hours
  }

  const netRefund = Math.round((originalFareINR * refundPercentage) / 100);
  const cancellationFee = originalFareINR - netRefund;
  const walletBonus = preferWalletCredit && netRefund > 0 ? Math.round(netRefund * 0.05) : 0;

  return {
    originalFareINR,
    hoursBeforeScheduledDeparture,
    refundPercentage,
    cancellationFeeINR: cancellationFee,
    netRefundPayableINR: netRefund + walletBonus,
    refundMode: preferWalletCredit ? 'BHARAT_BUS_WALLET' : 'INSTANT_ORIGINAL_SOURCE',
    walletBonusINR: walletBonus
  };
}

export interface DelayCompensationAssessment {
  delayMinutesAtDestination: number;
  isDelayEligibleForCompensation: boolean;
  compensationVoucherValueINR: number;
  complimentaryMealTokenEligible: boolean;
  apologyMessage: string;
}

export function assessTripDelayCompensation(delayMinutes: number, ticketFare: number): DelayCompensationAssessment {
  if (delayMinutes >= 180) {
    return {
      delayMinutesAtDestination: delayMinutes,
      isDelayEligibleForCompensation: true,
      compensationVoucherValueINR: Math.round(ticketFare * 0.30),
      complimentaryMealTokenEligible: true,
      apologyMessage: 'We deeply apologize for the delay over 3 hours due to unexpected highway congestion. A 30% discount voucher has been credited to your account.'
    };
  } else if (delayMinutes >= 90) {
    return {
      delayMinutesAtDestination: delayMinutes,
      isDelayEligibleForCompensation: true,
      compensationVoucherValueINR: Math.round(ticketFare * 0.15),
      complimentaryMealTokenEligible: false,
      apologyMessage: 'We sincerely apologize for the delay over 90 minutes. A 15% discount voucher has been credited to your account.'
    };
  }
  return {
    delayMinutesAtDestination: delayMinutes,
    isDelayEligibleForCompensation: false,
    compensationVoucherValueINR: 0,
    complimentaryMealTokenEligible: false,
    apologyMessage: 'Trip completed within standard allowable traffic buffer.'
  };
}
