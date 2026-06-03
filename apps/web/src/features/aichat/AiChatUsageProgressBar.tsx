import React, { FC } from 'react';
import cx from 'classnames';

import { formatDate } from '../trip/helpers/formatDate';
import { USER_AI_CHAT_LIMIT } from '@/lib/config';

type TAiChatUsageProgressBarProps = {
  currentUsage: number;
  usagePercentage: number;
  resetDate?: string;
};

export const AiChatUsageProgressBar: FC<TAiChatUsageProgressBarProps> = ({
  currentUsage,
  usagePercentage,
  resetDate,
}) => (
  <div data-testid="progressbar" className={cx('text-xs text-gray-500 flex flex-col items-start mt-4')}>
    <span className="font-medium">
      {currentUsage}/{USER_AI_CHAT_LIMIT} messages
    </span>
    <div className="w-[90px] h-[6px] bg-gray-200 rounded-full mt-1">
      <div
        data-testid="progressbar-fill"
        className={cx('h-[6px] rounded-full transition-all duration-300', {
          'bg-red-500': usagePercentage >= 80,
          'bg-yellow-500': usagePercentage >= 60 && usagePercentage < 80,
          'bg-green-500': usagePercentage < 60,
        })}
        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
      />
    </div>
    {resetDate && <span className="text-xs text-gray-400 mt-1">Reset on: {formatDate(resetDate)}</span>}
  </div>
);
