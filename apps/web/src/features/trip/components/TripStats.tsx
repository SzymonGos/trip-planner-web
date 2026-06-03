import React, { FC } from 'react';
import cx from 'classnames';
import { formatDate } from '@/features/trip/helpers/formatDate';
import { formatDuration } from '@/features/trip/helpers/formatDuration';
import { CalendarIcon } from '@/components/Icons/CalendarIcon';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { MapPinIcon } from '@/components/Icons/MapPinIcon';

type TTripStatsProps = {
  distance: string;
  estimatedDuration: string;
  createdAt: string;
  iconSize?: string;
  className?: string;
};

export const TripStats: FC<TTripStatsProps> = ({
  distance,
  estimatedDuration,
  createdAt,
  iconSize = 'w-4 h-4',
  className,
}) => (
  <div className={cx('flex items-center text-xs text-gray-700 gap-4 font-semibold', className)}>
    <span className="flex items-center gap-1">
      <MapPinIcon className={iconSize} />
      {distance}
    </span>

    <span className="flex items-center gap-1">
      <ClockIcon className={iconSize} />
      {formatDuration(estimatedDuration)}
    </span>

    <span className="flex items-center gap-1">
      <CalendarIcon className={iconSize} />
      {formatDate(createdAt)}
    </span>
  </div>
);
