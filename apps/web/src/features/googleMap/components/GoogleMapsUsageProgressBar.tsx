import React, { FC } from 'react';
import cx from 'classnames';
import { formatDate } from '../../trip/helpers/formatDate';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { USER_GOOGLE_MAPS_ROUTE_LIMIT } from '@/lib/config';

type TGoogleMapsUsageProgressBarProps = {
  currentUsage: number;
  usagePercentage: number;
  resetDate?: string;
};

export const GoogleMapsUsageProgressBar: FC<TGoogleMapsUsageProgressBarProps> = ({
  currentUsage,
  usagePercentage,
  resetDate,
}) => (
  <div className="text-xs text-gray-500 flex flex-col items-start">
    <div className="flex items-center gap-2">
      <span className="font-medium">
        {currentUsage}/{USER_GOOGLE_MAPS_ROUTE_LIMIT} routes
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="size-4 text-gray-400 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">
            Each time you create a route <span className="font-semibold">(origin → destination)</span>, it counts as 1
            usage. You have <span className="font-semibold">{USER_GOOGLE_MAPS_ROUTE_LIMIT}</span> free routes per month.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
    <div className="w-[90px] h-[6px] bg-gray-200 rounded-full mt-1">
      <div
        className={cx('h-[6px] rounded-full transition-all duration-300', {
          'bg-red-500': usagePercentage >= 80,
          'bg-yellow-500': usagePercentage >= 60 && usagePercentage < 80,
          'bg-green-500': usagePercentage < 60,
        })}
        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
      />
    </div>

    {resetDate && (
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-gray-400">Reset on: {formatDate(resetDate)}</span>
      </div>
    )}
  </div>
);
