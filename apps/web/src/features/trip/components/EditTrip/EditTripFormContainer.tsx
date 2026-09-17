'use client';

import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTripForm } from '../CreateTrip/CreateTripForm';
import { TAutocompleteProps } from '../CreateTrip/CreateTripFormContainer';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { tripSchema, type TTripFormValues } from '../../helpers/formValidation';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { Toaster, toast } from 'sonner';
import { getTripUrl } from '../../helpers/getTripUrl';
import { revalidateTripPages } from '../../server/actions/revalidateTrip';
import { Breadcrumb } from '@/features/breadcrumb/Breadcrumb';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';
import { TripLoader } from '../TripLoader';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTripByIdQuery } from '../../server/queries/getTripByIdQuery';
import { updateTrip } from '../../server/actions/updateTrip';
import { useAuth } from '@clerk/nextjs';
import type { TripResponse, TUpdateTripMutation } from '../../types/types';

type TEditTripFormContainerProps = {
  id: number;
};

export const EditTripFormContainer: FC<TEditTripFormContainerProps> = ({ id }) => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections, distanceInfo, getDistance } =
    useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const { isLoaded } = useGoogleMapLoader();
  const { getToken } = useAuth();

  const { data: trip } = useQuery({
    queryKey: ['trip', id],
    queryFn: () => getTripByIdQuery(id),
  });

  const { mutateAsync } = useMutation<TripResponse, Error, TUpdateTripMutation>({
    mutationFn: async (data) => {
      const token = await getToken();

      return updateTrip(trip.id, token, data.body, data.images);
    },
  });

  const useFormReturn = useForm<TTripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: '',
      description: '',
      origin: '',
      destination: '',
      status: 'PLANNING',
      images: [],
      distanceMeters: 0,
      estimatedDurationSeconds: 0,
    },
  });

  useEffect(() => {
    if (!trip) return;

    useFormReturn.reset({
      title: trip.title,
      description: trip.description ?? '',
      origin: trip.origin,
      destination: trip.destination,
      status: trip.status,
      images: [],
      distanceMeters: trip.distanceMeters,
      estimatedDurationSeconds: trip.estimatedDurationSeconds,
    });

    setDirectionsValue({
      origin: trip.origin,
      destination: trip.destination,
    });
  }, [trip, useFormReturn, setDirectionsValue]);

  const handlePlaceSelect = (autocompleteInstance: TAutocompleteProps, fieldName: 'origin' | 'destination') => {
    const place = autocompleteInstance?.getPlace();
    if (!place) return;
    if (place && place.formatted_address) {
      useFormReturn.setValue(fieldName, place.formatted_address);

      const newDirectionsValue: TDirectionsValueProps = {
        ...directionsValue,
        [fieldName]: place.formatted_address,
      };

      setDirectionsValue(newDirectionsValue);
    }
  };

  const handleOnSubmit: SubmitHandler<TTripFormValues> = async (data) => {
    try {
      const { images, ...body } = data;
      await mutateAsync({
        body,
        images,
      });
      await revalidateTripPages(trip?.id);
      useFormReturn.reset(data);
      toast.success(`Trip "${data?.title.trim().slice(0, 15)}..." updated successfully!`);
    } catch (e) {
      toast.error('Failed to update trip. Please try again.');
      console.error(e.message);
    }
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    const fetchDistance = async () => {
      if (directionsValue.origin && directionsValue.destination) {
        const originStr = JSON.stringify(directionsValue.origin);

        const destinationStr = JSON.stringify(directionsValue.destination);

        getDistance(originStr, destinationStr).catch((error) => {
          console.error('Error fetching distance:', error);
        });
      }
    };
    fetchDistance();
  }, [directionsValue.origin, directionsValue.destination, getDistance]);

  useEffect(() => {
    const currentStatus = useFormReturn.watch('status');
    const currentImages = useFormReturn.watch('images');

    if (currentStatus === 'PLANNING' && currentImages && currentImages.length > 0) {
      useFormReturn.setValue('images', []);
    }
  }, [useFormReturn.watch('status')]);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue.origin as string, { shouldDirty: true });
    useFormReturn.setValue('destination', directionsValue.destination as string, { shouldDirty: true });
  }, [directionsValue, useFormReturn]);

  if (!isLoaded) return <TripLoader type="edit" />;

  return (
    <div className="relative pt-24 pb-10">
      <Breadcrumb items={[{ label: trip?.title, href: getTripUrl(trip?.id) }, { label: 'Edit' }]} />
      <div className="px-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-semibold">Edit Trip</h1>
        </div>
        <Toaster position="top-center" richColors duration={2000} />
        <CreateTripForm
          useForm={useFormReturn}
          onSubmit={handleSubmitCallback}
          onReset={handleClearDirections}
          setDirectionsValue={setDirectionsValue}
          handlePlaceSelect={handlePlaceSelect}
          originAutocomplete={originAutocomplete}
          destinationAutocomplete={destinationAutocomplete}
          setOriginAutocomplete={setOriginAutocomplete}
          setDestinationAutocomplete={setDestinationAutocomplete}
          isEditing
          authUserId={authUserId}
          tripId={trip?.id}
          tripTitle={trip?.title}
          existingImages={trip?.tripImages}
        />
      </div>
    </div>
  );
};
