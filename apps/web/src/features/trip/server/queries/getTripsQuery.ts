import { apiClient } from '@/lib/api/apiClient';
import { TripResponse, type TripSlice } from '../../types/types';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const getTripsQuery = async (page: number) =>
  apiClient<TripSlice>(`${TRIP_ENDPOINTS.base}?page=${page}&size=10&sort=createdAt,desc&sort=id,desc`, {
    next: {
      revalidate: 60,
    },
  });
