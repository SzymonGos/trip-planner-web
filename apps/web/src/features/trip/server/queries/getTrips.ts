import { apiClient } from '@/lib/api/apiClient';
import { TripResponse } from '../../types/types';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const getTrips = async (options?: RequestInit) =>
  apiClient<TripResponse[]>(TRIP_ENDPOINTS.base, {
    cache: options?.cache,
  });
