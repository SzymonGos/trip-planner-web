'use client';

import React, { FC, useState } from 'react';
import { GoogleMapsContainer } from '../googleMap/components/GoogleMapsContainer';
import cx from 'classnames';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type TripPageLayoutContainerProps = {
  children: React.ReactNode;
};

export const TripPageLayoutContainer: FC<TripPageLayoutContainerProps> = ({ children }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <div className="grid grid-cols-4 lg:grid-cols-12">
        <div
          className={cx('w-full col-span-full lg:col-span-4 xl:col-span-3 border-r border-tp-gray-100', {
            'hidden lg:block': showMap,
          })}
        >
          <ScrollArea className="h-dvh">{children}</ScrollArea>
        </div>

        <div
          className={cx('relative w-full h-dvh col-span-full lg:col-span-8 xl:col-span-9', {
            block: showMap,
            'hidden lg:block': !showMap,
          })}
        >
          <GoogleMapsContainer />
        </div>
      </div>

      <div
        className={cx('fixed bottom-12 right-6 lg:hidden z-50', {
          '!right-16': showMap,
        })}
      >
        <Button
          onClick={() => setShowMap(!showMap)}
          variant="outline"
          className="bg-white hover:bg-gray-50 text-gray-700 rounded-md p-3 shadow-lg border border-gray-200 transition-colors"
          aria-label={showMap ? 'Show form' : 'Show map'}
        >
          {showMap ? (
            <span className="text-sm font-medium">Form</span>
          ) : (
            <span className="text-sm font-medium">Map</span>
          )}
        </Button>
      </div>
    </>
  );
};
