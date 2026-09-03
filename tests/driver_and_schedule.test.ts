import { describe, it, expect } from 'vitest';
import { SEED_DRIVERS, SEED_SCHEDULES } from '../src/data/seedData';

describe('Driver Rostering and Schedule Management', () => {
  it('should ensure all drivers have valid license numbers and mobile phones', () => {
    expect(SEED_DRIVERS.length).toBeGreaterThan(0);
    SEED_DRIVERS.forEach(driver => {
      expect(driver.driver_id).toBeDefined();
      expect(driver.name).toBeTruthy();
      expect(driver.license_number).toBeTruthy();
      expect(driver.phone).toBeTruthy();
    });
  });

  it('should verify driver status is valid', () => {
    SEED_DRIVERS.forEach(driver => {
      expect(driver.status).toBeTruthy();
    });
  });

  it('should have valid departure and arrival time sequences in schedules', () => {
    expect(SEED_SCHEDULES.length).toBeGreaterThan(0);
    SEED_SCHEDULES.forEach(sch => {
      expect(sch.departureTime).toMatch(/\d{1,2}:\d{2}/);
      expect(sch.arrivalTime).toMatch(/\d{1,2}:\d{2}/);
      expect(sch.fareMultiplier).toBeGreaterThan(0);
    });
  });
});
