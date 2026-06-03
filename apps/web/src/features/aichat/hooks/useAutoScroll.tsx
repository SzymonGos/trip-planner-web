import { TMessageProps } from '@/features/aichat/AiChatSheet';
import { useEffect, useRef } from 'react';

export const useAutoScroll = (messages: TMessageProps[], isLoading: boolean) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (messages.length > 0) {
      scrollToBottom();
    }

    if (isLoading) {
      scrollToBottom();
    }
  }, [messages.length, isLoading]);

  return messagesEndRef;
};
