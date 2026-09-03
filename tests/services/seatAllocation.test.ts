import { describe, it, expect } from 'vitest';
import { SeatAllocationAlgorithm } from '../../src/services/seatAllocationAlgorithm';

describe('SeatAllocationAlgorithm', () => {
  const algo = SeatAllocationAlgorithm.getInstance();

  it('should initialize seat recommendation engine', () => {
    expect(algo).toBeDefined();
  });

  it('should execute seat assignment algorithm', async () => {
    const result = await algo.processOperation1({ busId: 'BUS_EXPRESS_101', totalPassengers: 4 });
    expect(result.success).toBe(true);
    expect(result.data.status).toBeDefined();
  });
});
