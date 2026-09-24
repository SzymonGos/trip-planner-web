'use client';

import React, { FC } from 'react';
import { TripImagesUploadContainer } from './TripImagesUploadContainer';
import { useFormContext, useWatch } from 'react-hook-form';
import { MAX_TRIP_IMAGES, type TTripFormValues } from '../../helpers/formValidation';
import { TripImagesDisplay } from './TripImagesDisplay';
import type { TripImagesResponse } from '../../types/types';

export type TTripImagesManagerProps = {
  disabled?: boolean;
  existingImages?: TripImagesResponse[];
  onExistingImageRemove?: (imageId: number) => void;
};

export const TripImagesManager: FC<TTripImagesManagerProps> = ({
  onExistingImageRemove,
  disabled,
  existingImages = [],
}) => {
  const { control } = useFormContext<TTripFormValues>();

  const images =
    useWatch({
      control,
      name: 'images',
    }) ?? [];

  const canAddMoreImages = images.length + existingImages.length < MAX_TRIP_IMAGES;

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <TripImagesDisplay images={existingImages} disabled={disabled} onExistingImageRemove={onExistingImageRemove} />

      <TripImagesUploadContainer disabled={disabled} canAddMoreImages={canAddMoreImages} />
    </div>
  );
};
