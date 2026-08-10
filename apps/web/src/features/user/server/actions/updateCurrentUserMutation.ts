import { apiClient } from '@/lib/api/apiClient';
import type { TUpdateUserRequest } from '../../types/types';
import { USER_ENDPOINTS } from '../../constants/userEndpoints';

export const updateCurrentUserMutation = async (token: string, body: TUpdateUserRequest) =>
  apiClient<TUpdateUserRequest>(USER_ENDPOINTS.me, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
