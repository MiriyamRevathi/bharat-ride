import { describe, it, expect } from 'vitest';
import { RouteOptimizationService } from '../../src/services/routeOptimizationService';

describe('RouteOptimizationService', () => {
  const service = RouteOptimizationService.getInstance();

  it('should calculate optimized route waypoints', async () => {
    const result = await service.processOperation1({ origin: 'Mumbai', destination: 'Pune' });
    expect(result.success).toBe(true);
    expect(result.data.key).toBeDefined();
  });
});
