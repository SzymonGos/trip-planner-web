'use client';

import React, { FC } from 'react';
import { TAutocompleteProps, TFormValuesProps } from './CreateTripFormContainer';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { InputField } from './InputField';
import { Autocomplete } from '@react-google-maps/api';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { TextareaField } from './TextareaField';
import { SelectField } from './SelectField';
import { TripImagesManager } from './TripImagesManager';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useTripFormState } from '../../hooks/useTripFormState';
import { useTripImages } from '../../hooks/useTripImages';
import { CreateTripFormActions } from './CreateTripFormActions';

type TCreateTripFormProps = {
  useForm: UseFormReturn<TFormValuesProps>;
  setDirectionsValue: (value: TDirectionsValueProps) => void;
  handlePlaceSelect: (autocompleteInstance: TAutocompleteProps, fieldName: 'origin' | 'destination') => void;
  originAutocomplete: TAutocompleteProps;
  destinationAutocomplete: TAutocompleteProps;
  setOriginAutocomplete: (value: TAutocompleteProps) => void;
  setDestinationAutocomplete: (value: TAutocompleteProps) => void;
  isEditing?: boolean;
  authUserId: string;
  tripId?: string;
  tripTitle?: string;
  loading?: boolean;
};

export const CreateTripForm: FC<TCreateTripFormProps> = ({
  useForm,
  handlePlaceSelect,
  setDestinationAutocomplete,
  setOriginAutocomplete,
  originAutocomplete,
  destinationAutocomplete,
  isEditing = false,
  authUserId,
  tripId,
  tripTitle,
  loading,
}) => {
  const { canAddImages, handleSubmit, handleReset, isSubmitting, hasChanges } = useTripFormState();
  const { existingImages } = useTripImages();

  return (
    <Form {...useForm}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <InputField
            control={useForm.control}
            hasError={!!useForm.formState.errors.title}
            name="title"
            label="Title"
            placeholder="Trip Title"
          />
          <TextareaField control={useForm.control} name="description" label="Description" placeholder="Description" />
        </div>
        <div className="mt-10 flex flex-col gap-6">
          <Autocomplete
            onLoad={(autocomplete) => setOriginAutocomplete(autocomplete)}
            onPlaceChanged={() => handlePlaceSelect(originAutocomplete, 'origin')}
          >
            <InputField
              control={useForm.control}
              hasError={!!useForm.formState.errors.origin}
              name="origin"
              label="Origin"
              placeholder="Start Route"
            />
          </Autocomplete>
          <Autocomplete
            onLoad={(autocomplete) => setDestinationAutocomplete(autocomplete)}
            onPlaceChanged={() => handlePlaceSelect(destinationAutocomplete, 'destination')}
          >
            <InputField
              control={useForm.control}
              hasError={!!useForm.formState.errors.origin}
              name="destination"
              label="Destination"
              placeholder="End Route"
            />
          </Autocomplete>
          <SelectField
            control={useForm.control}
            name="status"
            label="Status"
            placeholder="Select status"
            options={[
              { label: 'Planning', value: 'planning' },
              { label: 'Completed', value: 'completed' },
            ]}
          />
          <div className="mt-2 w-fit">
            {!canAddImages ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <TripImagesManager disabled />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Change status to <b>Completed</b> to add images
                </TooltipContent>
              </Tooltip>
            ) : (
              <TripImagesManager images={existingImages} />
            )}
          </div>
        </div>
        <CreateTripFormActions
          authUserId={authUserId}
          isSubmitting={isSubmitting || loading}
          isEditing={isEditing}
          hasChanges={hasChanges}
          handleReset={handleReset}
          tripId={tripId}
          tripTitle={tripTitle}
        />
      </form>
    </Form>
  );
};
