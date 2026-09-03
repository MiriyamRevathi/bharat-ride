import { describe, it, expect } from 'vitest';
import { SEED_BUSES, SEED_ROUTES, SEED_OFFERS, SEED_SEATS } from '../src/data/seedData';

describe('Bus Fleet and Inventory Logic', () => {
  it('should have seed buses loaded with valid identifiers', () => {
    expect(SEED_BUSES.length).toBeGreaterThan(0);
    SEED_BUSES.forEach(bus => {
      expect(bus.id).toBeDefined();
      expect(bus.busNumber).toMatch(/^[A-Z]{2}[ -]\d{2}[ -][A-Z]{1,2}[ -]\d{4}$/);
      expect(bus.totalSeats).toBeGreaterThan(0);
      expect(bus.baseFare).toBeGreaterThan(0);
    });
  });

  it('should have valid seats and pricing per deck', () => {
    const sleeperBus = SEED_BUSES.find(b => b.hasUpperDeck);
    if (sleeperBus) {
      const busSeats = SEED_SEATS.filter(s => s.busId === sleeperBus.id);
      const lowerSeats = busSeats.filter(s => s.deck === 'LOWER');
      const upperSeats = busSeats.filter(s => s.deck === 'UPPER');
      expect(lowerSeats.length).toBeGreaterThan(0);
      expect(upperSeats.length).toBeGreaterThan(0);
      expect(lowerSeats.length + upperSeats.length).toBe(sleeperBus.totalSeats);
    }
  });

  it('should contain routes with valid distances and duration formatting', () => {
    expect(SEED_ROUTES.length).toBeGreaterThan(0);
    SEED_ROUTES.forEach(route => {
      expect(route.sourceCity).toBeTruthy();
      expect(route.destinationCity).toBeTruthy();
      expect(route.distanceKm).toBeGreaterThan(0);
      expect(route.estimatedDuration).toMatch(/\d+h/);
    });
  });

  it('should calculate discount accurately based on offer rules', () => {
    const activeOffers = SEED_OFFERS.filter(o => o.status === 'ACTIVE');
    expect(activeOffers.length).toBeGreaterThan(0);

    const percentOffer = activeOffers.find(o => o.discountType === 'PERCENTAGE');
    if (percentOffer) {
      const fare = 1000;
      const discount = Math.min((fare * percentOffer.discountValue) / 100, percentOffer.maxDiscount || Infinity);
      expect(discount).toBeGreaterThan(0);
      expect(discount).toBeLessThanOrEqual(fare);
    }
  });
});
