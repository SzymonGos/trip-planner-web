import { FC } from 'react';
import { GoogleMapsUsageProgressBar } from '@/features/googleMap/components/GoogleMapsUsageProgressBar';
import { formatDuration } from '../../helpers/formatDuration';
import { formatDistance } from '../../helpers/formatDistance';

type TripDistanceInfoProps = {
  distanceMeters: number;
  estimatedDurationSeconds: number;
  currentRouteCount: number;
  usagePercentage: number;
  resetDate: string;
  googleMapsMaxLimit: number;
};

export const TripDistanceInfo: FC<TripDistanceInfoProps> = ({
  distanceMeters = 0,
  estimatedDurationSeconds = 0,
  currentRouteCount,
  usagePercentage,
  resetDate,
  googleMapsMaxLimit,
}) => (
  <div className="absolute z-40 p-4 flex items-center top-[86px] w-full bg-tp-white-100 border-b border-tp-gray-100">
    <div className="flex flex-col md:flex-row basis-1/3 gap-2">
      <GoogleMapsUsageProgressBar
        currentUsage={currentRouteCount}
        usagePercentage={usagePercentage}
        resetDate={resetDate}
        googleMapsMaxLimit={googleMapsMaxLimit}
      />
    </div>
    <div className="flex flex-row md:flex-col basis-2/3 gap-2 text-xs md:text-base">
      <div className="flex flex-col md:flex-row basis-1/2 gap-2">
        Distance:
        <div className="font-semibold">{distanceMeters > 0 ? formatDistance(distanceMeters) : '-'}</div>
      </div>
      <div className="flex flex-col md:flex-row basis-1/2 gap-2">
        Estimated Duration:{' '}
        <div className="font-semibold">
          {estimatedDurationSeconds > 0 ? formatDuration(estimatedDurationSeconds) : '-'}
        </div>
      </div>
    </div>
  </div>
);
