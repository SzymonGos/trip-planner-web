import { apiClient } from '@/lib/api/apiClient';
import { TripResponse } from '../../types/types';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const getTripByIdQuery = async (id: number) => apiClient<TripResponse>(TRIP_ENDPOINTS.tripById(id));
