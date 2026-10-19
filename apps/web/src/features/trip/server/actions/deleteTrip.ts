import { apiClient } from '@/lib/api/apiClient';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const deleteTrip = async (id: number, token: string): Promise<void> =>
  apiClient<void>(TRIP_ENDPOINTS.tripById(id), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
