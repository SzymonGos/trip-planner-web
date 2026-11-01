import { apiClient } from '../../../../lib/api/apiClient';

export type TAiChatResponse = {
  response: string;
  usageCount: number;
  maxLimit: number;
};

export const sendAiChatMessage = async (message: string, token: string) =>
  apiClient<TAiChatResponse>('/api/ai-chat', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: { message },
  });
