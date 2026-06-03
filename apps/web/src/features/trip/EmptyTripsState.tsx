'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getTripPlannerUrl } from '@/features/trip/helpers/getTripPlannerUrl';

type TEmptyTripsStateProps = {
  authUserId: string;
};

export const EmptyTripsState: FC<TEmptyTripsStateProps> = ({ authUserId }) => (
  <div className="flex flex-col items-center justify-center pt-8 px-4 text-center">
    <div className="bg-gray-50 rounded-lg p-8 max-w-md w-full">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">No trips shared yet</h3>
        <p className="text-gray-600 text-sm leading-relaxed">Check back later for travel adventures!</p>
        {authUserId && (
          <Link href={getTripPlannerUrl()}>
            <Button className="mt-5 py-6 text-sm bg-tp-primary">Start planning</Button>
          </Link>
        )}
      </div>
    </div>
  </div>
);
