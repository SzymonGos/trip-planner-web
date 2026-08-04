import { apiClient } from '@/lib/api/apiClient';
import { USER_ENDPOINTS } from '../../constants/userEndpoints';
import type { TCurrentUserResponse } from '../../types/types';

export const getCurrentUserId = async (token: string) =>
  apiClient<TCurrentUserResponse>(USER_ENDPOINTS.me, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
