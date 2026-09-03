import { describe, it, expect } from 'vitest';
import { CurrencyFormatter } from '../../src/utils/currencyFormatter';

describe('CurrencyFormatter', () => {
  const formatter = CurrencyFormatter.getInstance();

  it('should format currency amounts correctly', async () => {
    const result = await formatter.processOperation1({ amount: 1500, currency: 'INR' });
    expect(result.success).toBe(true);
  });
});
