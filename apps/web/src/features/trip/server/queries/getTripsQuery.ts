import { apiClient } from '@/lib/api/apiClient';
import { TripResponse } from '../../types/types';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const getTripsQuery = async () =>
  apiClient<TripResponse[]>(TRIP_ENDPOINTS.base, {
    next: {
      revalidate: 60,
    },
  });
