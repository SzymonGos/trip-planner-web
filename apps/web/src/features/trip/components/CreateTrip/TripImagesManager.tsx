'use client';

import React, { FC } from 'react';
import { TripImagesDisplay } from './TripImagesDisplay';
import { useTripImages } from '../../hooks/useTripImages';
import { TripImagesUploadContainer } from './TripImagesUploadContainer';
import { useTripFormContext } from '../../contexts/TripFormContext';
import { TTripImageFormValueProps } from '../../hooks/useTripFormSync';

export type TTripImagesManagerProps = {
  disabled?: boolean;
  images?: TTripImageFormValueProps[];
};

export const TripImagesManager: FC<TTripImagesManagerProps> = ({ disabled, images = [] }) => {
  const { canAddMore } = useTripImages();
  const { tripId } = useTripFormContext();

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <TripImagesDisplay images={images} disabled={disabled} tripId={tripId} />

      <TripImagesUploadContainer disabled={disabled} canAddMore={canAddMore} />
    </div>
  );
};
