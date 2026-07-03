import { apiClient } from '@/lib/api/apiClient';
import { USER_ENDPOINTS } from '../../constants/userEndpoints';

export const createUser = async (body: TCreateUserRequest) =>
  apiClient<TCreateUserRequest>(USER_ENDPOINTS.base, {
    method: 'POST',
    body,
  });
