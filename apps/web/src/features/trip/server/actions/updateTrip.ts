import { apiClient } from '@/lib/api/apiClient';
import type { TripResponse, TUpdateTripMutation, TUpdateTripRequest } from '../../types/types';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const updateTrip = async (id: number, token: string, body: TUpdateTripRequest, images: File[]) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify(body)], {
      type: 'application/json',
    }),
  );

  images.forEach((image) => {
    formData.append('images', image);
  });

  return apiClient<TripResponse>(TRIP_ENDPOINTS.tripById(id), {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
