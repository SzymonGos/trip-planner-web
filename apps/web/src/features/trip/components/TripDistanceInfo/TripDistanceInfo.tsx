import { FC } from 'react';
import { GoogleMapsUsageProgressBar } from '@/features/googleMap/components/GoogleMapsUsageProgressBar';

type TripDistanceInfoProps = {
  distance: string;
  duration: string;
  currentRouteCount: number;
  usagePercentage: number;
  resetDate: string;
};

export const TripDistanceInfo: FC<TripDistanceInfoProps> = ({
  distance,
  duration,
  currentRouteCount,
  usagePercentage,
  resetDate,
}) => (
  <div className="absolute z-40 p-4 flex items-center top-[86px] w-full bg-tp-white-100 border-b border-tp-gray-100">
    <div className="flex flex-col md:flex-row basis-1/3 gap-2">
      <GoogleMapsUsageProgressBar
        currentUsage={currentRouteCount}
        usagePercentage={usagePercentage}
        resetDate={resetDate}
      />
    </div>
    <div className="flex flex-row md:flex-col basis-2/3 gap-2 text-xs md:text-base">
      <div className="flex flex-col md:flex-row basis-1/2 gap-2">
        Distance:
        <div className="font-semibold">{distance || '-'}</div>
      </div>
      <div className="flex flex-col md:flex-row basis-1/2 gap-2">
        Estimated Duration: <div className="font-semibold">{duration || '-'}</div>
      </div>
    </div>
  </div>
);
