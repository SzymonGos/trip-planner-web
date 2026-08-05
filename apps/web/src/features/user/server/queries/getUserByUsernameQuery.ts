import { apiClient } from '@/lib/api/apiClient';
import { USER_ENDPOINTS } from '../../constants/userEndpoints';
import type { TUserResponse } from '../../types/types';

export const getUserByUsernameQuery = async (username: string) =>
  apiClient<TUserResponse>(`${USER_ENDPOINTS.username}/${username}`, {
    next: {
      revalidate: 300,
    },
  });
