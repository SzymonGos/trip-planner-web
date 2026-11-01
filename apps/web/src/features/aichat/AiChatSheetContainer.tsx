'use client';

import React, { useReducer, useCallback, useEffect, useState, type FC } from 'react';
import { useAuth } from '@clerk/nextjs';
import { AiChatSheet } from './AiChatSheet';
import { chatReducer, initialState } from './helpers/chatReducer';
import { useAuthenticatedUser } from '../user/hooks/useAuthenticatedUser';
import { sendAiChatMessage } from './server/actions/sendAiChatMessage';
import { Toaster, toast } from 'sonner';

type TAIChatUsage = {
  aiChatUsageCount: number;
  aiChatMaxLimit: number;
  aiChatUsageResetDate: string;
};

export const AiChatSheetContainer: FC<TAIChatUsage> = ({ aiChatMaxLimit, aiChatUsageCount, aiChatUsageResetDate }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [currentUsage, setCurrentUsage] = useState(aiChatUsageCount);

  const { authUserId } = useAuthenticatedUser();
  const { getToken } = useAuth();

  useEffect(() => {
    setCurrentUsage(aiChatUsageCount);
  }, [aiChatUsageCount]);

  const usagePercentage = aiChatMaxLimit > 0 ? Math.round((currentUsage / aiChatMaxLimit) * 100) : 0;

  const handleSendMessage = useCallback(async () => {
    if (!state.inputValue.trim() || state.isLoading) return;

    if (currentUsage >= aiChatMaxLimit) {
      toast.error('AI chat limit reached. Please wait for reset.');

      dispatch({
        type: 'SET_ERROR',
        payload: 'AI chat limit reached. Please wait for reset.',
      });

      return;
    }

    const messageContent = state.inputValue.trim();

    dispatch({
      type: 'SEND_MESSAGE',
      payload: messageContent,
    });

    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication required');
      }

      const data = await sendAiChatMessage(messageContent, token);

      dispatch({
        type: 'AI_RESPONSE',
        payload: data.response,
      });

      setCurrentUsage(data.usageCount);
    } catch (err) {
      console.error('Chat API error:', err);

      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';

      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage,
      });
    }
  }, [state.inputValue, state.isLoading, currentUsage, aiChatMaxLimit, getToken]);

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
        resetDate={aiChatUsageResetDate}
        aiChatMaxLimit={aiChatMaxLimit}
      />
    </>
  );
};
