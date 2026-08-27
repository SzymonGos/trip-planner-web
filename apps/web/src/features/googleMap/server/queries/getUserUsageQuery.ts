import { apiClient } from '@/lib/api/apiClient';
import type { TUsageResponse } from '../../types/types';
import { USER_ENDPOINTS } from '@/features/user/constants/userEndpoints';

export const getUserUsageQuery = async (token: string) =>
  apiClient<TUsageResponse>(USER_ENDPOINTS.usage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
