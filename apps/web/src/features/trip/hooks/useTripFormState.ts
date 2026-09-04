'use client';

import { useTripFormContext } from '../contexts/TripFormContext';

export const useTripFormState = () => {
  const { isEditing, formStatus, isSubmitting, hasChanges, handleSubmit, handleReset } = useTripFormContext();

  const isCompleted = formStatus === 'COMPLETED';
  const isPlanning = formStatus === 'PLANNING';
  const canAddImages = isCompleted;

  return {
    isEditing,
    formStatus,
    isSubmitting,
    hasChanges,
    isCompleted,
    isPlanning,
    canAddImages,
    handleSubmit,
    handleReset,
  };
};
