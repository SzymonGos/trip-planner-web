'use client';

import { useTripFormContext } from '../contexts/TripFormContext';

export const useTripImages = () => {
  const {
    existingImages,
    newImages,
    handleExistingImagesRemove,
    handleNewImagesChange,
    handleNewImagesAdd,
    maxTotalImages,
    formStatus,
  } = useTripFormContext();

  const totalImages = existingImages.length + newImages.length;
  const canAddMore = totalImages < maxTotalImages;
  const remainingSlots = maxTotalImages - totalImages;

  return {
    existingImages,
    newImages,
    handleExistingImagesRemove,
    handleNewImagesChange,
    handleNewImagesAdd,
    maxTotalImages,
    totalImages,
    canAddMore,
    remainingSlots,
    formStatus,
  };
};
