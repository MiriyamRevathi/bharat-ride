import { describe, it, expect } from 'vitest';
import { GeoCalculators } from '../../src/utils/geoCalculators';

describe('GeoCalculators', () => {
  const geo = GeoCalculators.getInstance();

  it('should perform distance calculation queries', async () => {
    const result = await geo.processOperation1({ lat1: 18.5204, lon1: 73.8567, lat2: 19.0760, lon2: 72.8777 });
    expect(result.success).toBe(true);
  });
});
