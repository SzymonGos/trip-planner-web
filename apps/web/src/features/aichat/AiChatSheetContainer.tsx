'use client';

import React, { useReducer, useCallback } from 'react';
import { AiChatSheet } from './AiChatSheet';
import { chatReducer, initialState } from './helpers/chatReducer';
import { CHAT_API_URL, USER_AI_CHAT_LIMIT } from '@/lib/config';
import { useAuthenticatedUser } from '../user/hooks/useAuthenticatedUser';
import { useMutation, useQuery } from '@apollo/client';
import { updateUserChatUsageMutationQuery } from './server/actions/updateUserChatUsageMutationQuery';
import { getUserUsageQuery } from './server/db/getUserUsageQuery';
import { Toaster, toast } from 'sonner';

export const AiChatSheetContainer = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { authUserId } = useAuthenticatedUser();
  const { data: userData, refetch } = useQuery(getUserUsageQuery, {
    variables: { id: authUserId },
    skip: !authUserId,
  });
  const [updateUserUsage] = useMutation(updateUserChatUsageMutationQuery);
  const currentUsage = userData?.user?.aiChatUsageCount || 0;
  const usagePercentage = Math.round((currentUsage / USER_AI_CHAT_LIMIT) * 100);

  const trackMesssageCount = useCallback(async () => {
    if (!authUserId) return;
    try {
      const currentCount = userData?.user?.aiChatUsageCount || 0;
      const newCount = currentCount + 1;
      await updateUserUsage({
        variables: {
          updateUserWhere: { id: authUserId },
          data: { aiChatUsageCount: newCount },
        },
      });
      await refetch();
    } catch (error) {
      console.error('Failed to update message count:', error);
    }
  }, [authUserId, updateUserUsage, userData?.user?.aiChatUsageCount, refetch]);

  const handleSendMessage = useCallback(async () => {
    if (!state.inputValue.trim() || state.isLoading) return;
    if (currentUsage >= USER_AI_CHAT_LIMIT) {
      toast.error('AI chat limit reached. Please wait for reset.', {
        position: 'top-center',
        duration: 2000,
      });
      dispatch({ type: 'SET_ERROR', payload: 'AI chat limit reached. Please wait for reset.' });
      return;
    }
    const messageContent = state.inputValue.trim();
    dispatch({ type: 'SEND_MESSAGE', payload: messageContent });
    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageContent }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      dispatch({ type: 'AI_RESPONSE', payload: data.response });
      await trackMesssageCount();
    } catch (err) {
      console.error('Chat API error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, [state.inputValue, state.isLoading, trackMesssageCount, currentUsage]);

  const handleInputChange = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT', payload: value });
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <>
      <Toaster position="top-center" richColors duration={2000} />
      <AiChatSheet
        messages={state.messages}
        inputValue={state.inputValue}
        isLoading={state.isLoading}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        authUserId={authUserId}
        currentUsage={currentUsage}
        usagePercentage={usagePercentage}
        resetDate={userData?.user?.aiChatUsageResetDate}
      />
    </>
  );
};
