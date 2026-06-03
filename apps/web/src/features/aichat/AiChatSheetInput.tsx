import React, { FC } from 'react';
import { SendIcon } from '@/components/Icons/SendIcon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { SignInButton } from '@/components/SignIn/SignInButton';

type TAiChatSheetInputProps = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  onSendMessage: () => void;
  authUserId: string;
};

export const AiChatSheetInput: FC<TAiChatSheetInputProps> = ({
  inputRef,
  inputValue,
  onInputChange,
  onKeyPress,
  isLoading,
  onSendMessage,
  authUserId,
}) => {
  if (!authUserId) {
    return (
      <div className="flex items-center justify-center p-4 text-center w-full">
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="relative">
      <Textarea
        name="ai-chat-input"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="What do you need help with?"
        className="min-h-[80px] max-h-[200px] px-4 py-3 pr-12 pb-12 !border-[0.5px] focus-visible:ring-0 border-tp-gray-100 focus:border focus:border-tp-gray-200 shadow-none text-base [&_[data-radix-sheet-handle]]:hidden resize-none"
        disabled={isLoading}
        data-testid="ai-chat-input"
      />

      <Button
        onClick={onSendMessage}
        disabled={!inputValue.trim() || isLoading}
        size="icon"
        className="absolute bottom-3 right-3 h-10 w-10 bg-zinc-400 hover:bg-zinc-500 text-white rounded-md transition-all duration-200 disabled:opacity-50"
        data-testid="send-button"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon data-testid="send-icon" />}
      </Button>
    </div>
  );
};
