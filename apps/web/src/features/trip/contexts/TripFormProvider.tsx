'use client';

import React, { useState, useCallback, ReactNode, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TripFormContext, TripFormContextTypeProps } from './TripFormContext';
import { TFormValuesProps } from '../components/CreateTrip/CreateTripFormContainer';
import { TTripImageFormValueProps } from '../hooks/useTripFormSync';

type TTripFormProviderProps = {
  children: ReactNode;
  useForm: UseFormReturn<TFormValuesProps>;
  isEditing?: boolean;
  onSubmit: () => void;
  onReset: () => void;
  isSubmitting?: boolean;
  tripId?: string;
  hasChanges?: boolean;
};

export const TripFormProvider: React.FC<TTripFormProviderProps> = ({
  children,
  useForm,
  isEditing = false,
  onSubmit,
  onReset,
  isSubmitting = false,
  tripId,
  hasChanges = false,
}) => {
  const [newImages, setNewImages] = useState<File[]>([]);

  const currentImages = useForm.watch('images') || [];
  const formStatus = useForm.watch('status') as 'planning' | 'completed';

  const existingImages = currentImages.filter((img): img is TTripImageFormValueProps => !(img instanceof File));

  const handleExistingImagesRemove = useCallback(
    (imageId: string) => {
      const updatedImages = currentImages.filter((img) => {
        if (img instanceof File) return true;
        return img.id !== imageId;
      });
      useForm.setValue('images', updatedImages, { shouldDirty: true });
    },
    [currentImages, useForm],
  );

  const handleNewImagesChange = useCallback(
    (files: File[]) => {
      setNewImages(files);
      const updatedImages = [...existingImages, ...files];
      useForm.setValue('images', updatedImages, { shouldDirty: true });
    },
    [existingImages, useForm],
  );

  const handleNewImagesAdd = useCallback(
    (files: File[]) => {
      const updatedNewImages = [...newImages, ...files];
      setNewImages(updatedNewImages);
      const updatedImages = [...existingImages, ...updatedNewImages];
      useForm.setValue('images', updatedImages, { shouldDirty: true });
    },
    [existingImages, newImages, useForm],
  );

  const contextValue: TripFormContextTypeProps = useMemo(
    () => ({
      isEditing,
      existingImages,
      newImages,
      handleExistingImagesRemove,
      handleNewImagesChange,
      handleNewImagesAdd,
      maxTotalImages: 5,
      formStatus,
      isSubmitting,
      hasChanges,
      handleSubmit: onSubmit,
      handleReset: onReset,
      tripId,
    }),
    [
      isEditing,
      existingImages,
      newImages,
      handleExistingImagesRemove,
      handleNewImagesChange,
      handleNewImagesAdd,
      formStatus,
      isSubmitting,
      hasChanges,
      onSubmit,
      onReset,
      tripId,
    ],
  );

  return <TripFormContext.Provider value={contextValue}>{children}</TripFormContext.Provider>;
};
