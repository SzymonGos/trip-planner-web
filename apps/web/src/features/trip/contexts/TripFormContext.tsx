'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { TTripImageFormValueProps } from '../hooks/useTripFormSync';

export type TripFormContextTypeProps = {
  isEditing: boolean;
  existingImages: TTripImageFormValueProps[];
  newImages: File[];
  handleExistingImagesRemove: (imageId: string) => void;
  handleNewImagesChange: (files: File[]) => void;
  handleNewImagesAdd: (files: File[]) => void;
  maxTotalImages: number;
  formStatus: 'planning' | 'completed';
  isSubmitting: boolean;
  hasChanges: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
  tripId?: string;
};

const defaultContextValue: TripFormContextTypeProps = {
  isEditing: false,
  existingImages: [],
  newImages: [],
  handleExistingImagesRemove: () => {},
  handleNewImagesChange: () => {},
  handleNewImagesAdd: () => {},
  maxTotalImages: 5,
  formStatus: 'planning',
  isSubmitting: false,
  hasChanges: false,
  handleSubmit: () => {},
  handleReset: () => {},
  tripId: undefined,
};

export const TripFormContext = createContext<TripFormContextTypeProps>(defaultContextValue);

export type TripFormProviderProps = {
  children: ReactNode;
  value: TripFormContextTypeProps;
};

export const TripFormProvider: React.FC<TripFormProviderProps> = ({ children, value }) => (
  <TripFormContext.Provider value={value}>{children}</TripFormContext.Provider>
);

export const useTripFormContext = () => useContext(TripFormContext);
