import { describe, it, expect } from 'vitest';

describe('Passenger Validation and Cancellation Policies', () => {
  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePincode = (pin: string) => /^\d{6}$/.test(pin);

  it('validates 10-digit Indian mobile numbers correctly', () => {
    expect(validatePhone('9876543210')).toBe(true);
    expect(validatePhone('8123456789')).toBe(true);
    expect(validatePhone('7000000000')).toBe(true);
    expect(validatePhone('6300000000')).toBe(true);
    expect(validatePhone('5123456789')).toBe(false);
    expect(validatePhone('987654321')).toBe(false);
    expect(validatePhone('98765432101')).toBe(false);
    expect(validatePhone('abcdefghij')).toBe(false);
  });

  it('validates passenger email formatting', () => {
    expect(validateEmail('passenger@example.com')).toBe(true);
    expect(validateEmail('john.doe+bus@domain.co.in')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
  });

  it('validates Indian 6-digit postal PIN codes', () => {
    expect(validatePincode('560001')).toBe(true);
    expect(validatePincode('110001')).toBe(true);
    expect(validatePincode('5600')).toBe(false);
    expect(validatePincode('5600012')).toBe(false);
  });

  it('computes graduated cancellation refund slabs', () => {
    const calculateRefund = (hoursBeforeDeparture: number, totalFare: number) => {
      if (hoursBeforeDeparture >= 24) return { percent: 90, refund: totalFare * 0.9 };
      if (hoursBeforeDeparture >= 12) return { percent: 75, refund: totalFare * 0.75 };
      if (hoursBeforeDeparture >= 4) return { percent: 50, refund: totalFare * 0.5 };
      return { percent: 0, refund: 0 };
    };

    const fare = 1200;
    expect(calculateRefund(30, fare).percent).toBe(90);
    expect(calculateRefund(30, fare).refund).toBe(1080);

    expect(calculateRefund(18, fare).percent).toBe(75);
    expect(calculateRefund(18, fare).refund).toBe(900);

    expect(calculateRefund(8, fare).percent).toBe(50);
    expect(calculateRefund(8, fare).refund).toBe(600);

    expect(calculateRefund(2, fare).percent).toBe(0);
    expect(calculateRefund(2, fare).refund).toBe(0);
  });
});
