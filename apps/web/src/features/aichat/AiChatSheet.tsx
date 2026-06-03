'use client';

import { FC, useRef, useState } from 'react';
import { MessageCircle, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import cx from 'classnames';
import { AiChatSheetEmptyState } from './AiChatSheetEmptyState';
import { AiChatSheetMessage } from './AiChatSheetMessage';
import { AiChatLoading } from './AiChatLoading';
import { AiChatSheetInput } from './AiChatSheetInput';
import { AiChatUsageProgressBar } from './AiChatUsageProgressBar';
import { useAutoScroll } from '@/features/aichat/hooks/useAutoScroll';

export type TMessageProps = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

type TAiChatSheetProps = {
  messages: TMessageProps[];
  inputValue: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  authUserId: string;
  currentUsage: number;
  usagePercentage: number;
  resetDate?: string;
};

export const AiChatSheet: FC<TAiChatSheetProps> = ({
  messages,
  inputValue,
  isLoading,
  onInputChange,
  onSendMessage,
  onKeyPress,
  authUserId,
  currentUsage,
  usagePercentage,
  resetDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useAutoScroll(messages, isLoading);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="fixed bottom-12 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-[200px] right-[10px] h-10 w-10 rounded-md bg-zinc-500 hover:bg-zinc-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          >
            <MessageCircle className="!size-6 animate-pulse" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className={cx('flex flex-col transition-all duration-200 !border-l-0 focus:!ring-0 bg-tp-white-100 w-full', {
            'w-screen !max-w-full': isExpanded,
          })}
        >
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:flex h-8 w-8"
                  title={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                Trip Planner
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 flex flex-col min-h-0">
            <div
              className={cx('flex-1 overflow-y-auto space-y-4', {
                'lg:w-[780px] mx-auto': isExpanded,
              })}
            >
              {messages.length === 0 && <AiChatSheetEmptyState />}

              {messages.map((message) => (
                <AiChatSheetMessage key={message.id} id={message.id} content={message.content} role={message.role} />
              ))}

              {isLoading && <AiChatLoading />}

              <div ref={messagesEndRef} />
            </div>

            <div
              className={cx('flex-shrink-0 transition-transform duration-200', {
                'w-full md:w-[780px] mx-auto': isExpanded,
              })}
            >
              <AiChatSheetInput
                inputRef={inputRef}
                inputValue={inputValue}
                onInputChange={onInputChange}
                onKeyPress={onKeyPress}
                isLoading={isLoading}
                onSendMessage={onSendMessage}
                authUserId={authUserId}
              />
              {authUserId && (
                <AiChatUsageProgressBar
                  currentUsage={currentUsage}
                  usagePercentage={usagePercentage}
                  resetDate={resetDate}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
