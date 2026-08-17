import { apiClient } from '@/lib/api/apiClient';
import type { TUpdateUserRequest } from '../../types/types';
import { USER_ENDPOINTS } from '../../constants/userEndpoints';

export const updateCurrentUserMutation = async (token: string, body: TUpdateUserRequest, profileImage?: File) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify(body)], {
      type: 'application/json',
    }),
  );

  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  return apiClient<TUpdateUserRequest>(USER_ENDPOINTS.me, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};
