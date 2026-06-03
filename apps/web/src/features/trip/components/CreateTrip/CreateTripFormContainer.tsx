'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { useMutation } from '@apollo/client';
import { createTripMutationQuery } from '../../server/actions/createTripMutationQuery';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema } from '../../helpers/formValidation';
import { useRouter } from 'next/navigation';
import { getTripUrl } from '../../helpers/getTripUrl';
import { getUserTripsQuery } from '@/features/user/server/db/getUserTripsQuery';
import { getTripsQuery } from '../../server/db/getTripsQuery';
import { TripFormProvider } from '../../contexts/TripFormProvider';
import { TTripImageFormValueProps } from '../../hooks/useTripFormSync';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';
import { TripLoader } from '../TripLoader';

export type TFormValuesProps = {
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: 'planning' | 'completed';
  images?: (File | TTripImageFormValueProps)[];
} & z.infer<typeof tripSchema>;

export type TAutocompleteProps = google.maps.places.Autocomplete | null;

export const CreateTripFormContainer = () => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections, distanceInfo } = useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const router = useRouter();
  const { isLoaded: isMapLoaded } = useGoogleMapLoader();

  const [createTripMutation, { loading }] = useMutation(createTripMutationQuery);

  const defaultValues = {
    title: '',
    description: '',
    origin: '',
    destination: '',
    status: 'planning' as const,
    images: [],
  };

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(tripSchema),
    defaultValues,
  });

  const handlePlaceSelect = (autocompleteInstance: TAutocompleteProps, fieldName: 'origin' | 'destination') => {
    const place = autocompleteInstance?.getPlace();
    if (!place) return;
    if (place && place.formatted_address) {
      useFormReturn.setValue(fieldName, place.formatted_address);

      const newDirectionsValue = {
        ...directionsValue,
        [fieldName]: place.formatted_address,
      };

      setDirectionsValue(newDirectionsValue);
    }
  };

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = async (data) => {
    try {
      const files = (data.images || []).filter((img): img is File => img instanceof File);
      const tripImages = files.map((file) => ({ image: file }));
      const createTripResponse = await createTripMutation({
        variables: {
          data: {
            title: data.title,
            description: data.description,
            origin: data.origin,
            destination: data.destination,
            status: data.status,
            tripImages: {
              create: tripImages,
            },
            creator: {
              connect: {
                id: authUserId,
              },
            },
            distance: distanceInfo.distance,
            estimatedDuration: distanceInfo.duration,
          },
        },
        refetchQueries: [{ query: getTripsQuery }, { query: getUserTripsQuery }],
      });

      const tripId = createTripResponse?.data?.createTrip?.id;
      useFormReturn.reset();
      handleClearDirections();
      router?.push(getTripUrl(tripId));
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleClearForm = () => {
    useFormReturn.reset();
    handleClearDirections();
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue.origin as string);
    useFormReturn.setValue('destination', directionsValue.destination as string);
  }, [directionsValue, useFormReturn]);

  useEffect(() => {
    handleClearDirections();
  }, []);

  useEffect(() => {
    const currentStatus = useFormReturn.watch('status');
    const currentImages = useFormReturn.watch('images');

    if (currentStatus === 'planning' && currentImages && currentImages.length > 0) {
      useFormReturn.setValue('images', []);
    }
  }, [useFormReturn.watch('status')]);

  if (!isMapLoaded) return <TripLoader type="edit" />;

  return (
    <TripFormProvider
      useForm={useFormReturn}
      isEditing={false}
      onSubmit={handleSubmitCallback}
      onReset={handleClearForm}
    >
      <div className="pt-28 pb-10">
        <h1 className="mb-5 text-3xl font-semibold">Plan your trip</h1>
        <CreateTripForm
          useForm={useFormReturn}
          setDirectionsValue={setDirectionsValue}
          handlePlaceSelect={handlePlaceSelect}
          originAutocomplete={originAutocomplete}
          destinationAutocomplete={destinationAutocomplete}
          setOriginAutocomplete={setOriginAutocomplete}
          setDestinationAutocomplete={setDestinationAutocomplete}
          authUserId={authUserId}
          loading={loading}
        />
      </div>
    </TripFormProvider>
  );
};
