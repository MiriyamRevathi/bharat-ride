import { describe, it, expect, beforeEach } from 'vitest';
import { FarePricingEngine } from '../../src/services/farePricingEngine';

describe('FarePricingEngine', () => {
  let engine: FarePricingEngine;

  beforeEach(() => {
    engine = FarePricingEngine.getInstance();
  });

  it('should instantiate singleton correctly', () => {
    expect(engine).toBeDefined();
  });

  it('should process dynamic fare pricing operations', async () => {
    const res = await engine.processOperation1({ value: 250 });
    expect(res.success).toBe(true);
    expect(res.data.metric).toBeGreaterThan(0);
    expect(res.data.opId).toBe('FarePricingEngine_op_1');
  });

  it('should handle operation retries and fallbacks', async () => {
    const res = await engine.processOperation5({ value: 100 }, { retryCount: 2 });
    expect(res.success).toBe(true);
    expect(res.executionTimeMs).toBeGreaterThanOrEqual(0);
  });
});
