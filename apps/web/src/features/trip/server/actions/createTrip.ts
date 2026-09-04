import { apiClient } from '@/lib/api/apiClient';
import type { TCreateTripRequest } from '../../types/types';
import { TRIP_ENDPOINTS } from '../../constants/tripEndpoints';

export const createTrip = async (token: string, body: TCreateTripRequest) => {
  const formData = new FormData();
  const tripImages = body?.images;

  formData.append(
    'request',
    new Blob([JSON.stringify(body)], {
      type: 'application/json',
    }),
  );

  if (tripImages) {
    tripImages?.forEach((image) => {
      formData.append('images', image);
    });
  }

  return apiClient<TCreateTripRequest>(TRIP_ENDPOINTS.base, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
