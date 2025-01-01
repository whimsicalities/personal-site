import { expect, test, vi } from 'vitest';
import decayStats from '../../src/statDecay/decayStats';
import { PET_STATS } from '../../src/PET_STATS';

test('Decays stats when they are above 0', async () => {
    const mockRedisClient: any = {
        get: vi.fn(() => 1), // fake return 1 as stat value
        decr: vi.fn(),
    };
    const mockIo: any = {
        emit: vi.fn(),
    };
    await decayStats(mockRedisClient, mockIo);
    expect(mockRedisClient.decr).toHaveBeenCalledTimes(PET_STATS.length);
});

test('Does not decay stats when they are 0', async () => {
    const mockRedisClient: any = {
        get: vi.fn(() => 0), // fake return 0 as stat value
        decr: vi.fn(),
    };
    const mockIo: any = {
        emit: vi.fn(),
    };
    await decayStats(mockRedisClient, mockIo);
    expect(mockRedisClient.decr).not.toHaveBeenCalled();
});