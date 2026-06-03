import React, { FC } from 'react';

type TTripTimelineProps = {
  origin: string;
  destination: string;
};

export const TripTimeline: FC<TTripTimelineProps> = ({ origin, destination }) => (
  <div className="mt-12 mb-8 relative">
    <div className="absolute left-[8px] top-4 bottom-4 w-0.5 border-l-4 border-dashed border-gray-500" />
    <div className="space-y-12">
      <div className="flex items-start gap-4">
        <div className="w-5 h-5 border-[6px] border-gray-800 rounded-full flex items-center justify-center flex-shrink-0 relative z-10" />
        <div>
          <p className="text-sm text-gray-600 font-medium">Origin</p>
          <div className="text-gray-900">{origin}</div>
        </div>
      </div>
      <div className="flex items-end gap-4">
        <div className="w-5 h-5 border-[6px] border-gray-800 rounded-full flex items-center justify-center flex-shrink-0 relative z-10" />
        <div>
          <div className="text-sm text-gray-600 font-medium">Destination</div>
          <div className="text-gray-900">{destination}</div>
        </div>
      </div>
    </div>
  </div>
);
