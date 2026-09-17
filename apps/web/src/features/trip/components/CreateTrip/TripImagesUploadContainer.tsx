'use client';

import React, { useRef, ChangeEvent, FC } from 'react';
import { TripImagesUpload } from './TripImagesUpload';
import { TTripImageFormValueProps } from '../../hooks/useTripFormSync';
import { useFormContext, useWatch } from 'react-hook-form';
import { MAX_TRIP_IMAGES, type TTripFormValues } from '../../helpers/formValidation';

export type TTripImagesUploadContainerProps = {
  className?: string;
  disabled?: boolean;
  defaultImages?: TTripImageFormValueProps[];
  canAddMoreImages?: boolean;
};

export const TripImagesUploadContainer: FC<TTripImagesUploadContainerProps> = ({
  className,
  disabled,
  canAddMoreImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, getValues, setValue } = useFormContext<TTripFormValues>();

  const images =
    useWatch({
      control,
      name: 'images',
    }) ?? [];

  const handleAddImages = () => {
    if (disabled || !canAddMoreImages) return;

    fileInputRef.current?.click();
  };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const selectedFiles = Array.from(event.target.files ?? []);

    const currentImages = getValues('images') ?? [];

    const remainingSlots = MAX_TRIP_IMAGES - currentImages.length;

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      setValue('images', [...currentImages, ...filesToAdd], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }

    event.target.value = '';
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, imageIndex) => imageIndex !== index);

    setValue('images', updatedImages, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <TripImagesUpload
      className={className}
      disabled={disabled}
      fileInputRef={fileInputRef}
      images={images}
      onAddImages={handleAddImages}
      onFilesChange={handleFilesChange}
      onRemove={handleRemove}
      canAddMoreImages={canAddMoreImages}
    />
  );
};
