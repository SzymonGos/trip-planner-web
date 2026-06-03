import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TripCardMaskWave } from './TripCardMaskWave';

export const TripCardLoader = () => (
  <div className="relative rounded-md border-[0.5px] border-gray-300 bg-zinc-100 overflow-hidden">
    <div className="relative w-full">
      <Skeleton className="w-full h-48" />
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-20 h-4" />
      </div>
      <TripCardMaskWave />
    </div>
    <div className="pt-4 pb-4 px-6 flex flex-col h-48">
      <Skeleton className="w-3/4 h-6 mb-2" />
      <div className="space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="mt-auto flex gap-4">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-24 h-4" />
      </div>
    </div>
  </div>
);
