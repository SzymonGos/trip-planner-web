'use client';

import React, { FC } from 'react';
// import { TripImagesDisplay } from './TripImagesDisplay';
import { TripImagesUploadContainer } from './TripImagesUploadContainer';
import { useFormContext, useWatch } from 'react-hook-form';
import type { TFormValuesProps } from './CreateTripFormContainer';
import { MAX_TRIP_IMAGES } from '../../helpers/formValidation';

export type TTripImagesManagerProps = {
  disabled?: boolean;
};

export const TripImagesManager: FC<TTripImagesManagerProps> = ({ disabled }) => {
  const { control } = useFormContext<TFormValuesProps>();

  const images =
    useWatch({
      control,
      name: 'images',
    }) ?? [];

  const canAddMore = images.length < MAX_TRIP_IMAGES;

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {/* todo: edit trip update */}
      {/* <TripImagesDisplay images={images} disabled={disabled} /> */}

      <TripImagesUploadContainer disabled={disabled} canAddMore={canAddMore} />
    </div>
  );
};
