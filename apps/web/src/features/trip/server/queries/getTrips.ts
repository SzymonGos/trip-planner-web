import { apiClient } from '@/lib/api/apiClient';
import { Trip } from '../../types/types';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const getTrips = async (options?: RequestInit) =>
  apiClient<Trip[]>(TRIP_ENDPOINTS.base, {
    cache: options?.cache,
  });
