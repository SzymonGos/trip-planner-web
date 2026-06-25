import { apiClient } from '@/lib/api/apiClient';
import { Trip } from '../../types/types';

export const getTrips = async (options?: RequestInit) =>
  apiClient<Trip[]>('/api/trips', {
    cache: options?.cache,
  });
