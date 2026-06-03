'use client';

import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTripForm } from '../CreateTrip/CreateTripForm';
import { TAutocompleteProps, TFormValuesProps } from '../CreateTrip/CreateTripFormContainer';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { tripSchema } from '../../helpers/formValidation';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { useMutation } from '@apollo/client';
import { updateTripMutationQuery } from '../../server/actions/updateTripMutationQuery';
import { Trip as TTrip } from 'tp-graphql-types';
import { TripFormProvider } from '../../contexts/TripFormProvider';
import { Toaster, toast } from 'sonner';
import { getTripUrl } from '../../helpers/getTripUrl';
import { useReadQuery, QueryRef } from '@apollo/client';
import { revalidateTripPages } from '../../server/actions/revalidateTrip';
import { Breadcrumb } from '@/features/breadcrumb/Breadcrumb';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';
import { TripLoader } from '../TripLoader';

type TEditTripFormContainerProps = {
  queryRef: QueryRef<{ trip: TTrip }>;
};

export const EditTripFormContainer: FC<TEditTripFormContainerProps> = ({ queryRef }) => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections, distanceInfo, getDistance } =
    useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const { isLoaded } = useGoogleMapLoader();

  const [updateTripMutation, { loading }] = useMutation(updateTripMutationQuery);

  const { data } = useReadQuery(queryRef);
  const trip = data?.trip;

  const defaultValues = {
    title: trip?.title,
    origin: trip?.origin,
    destination: trip?.destination,
    status: (trip?.status as 'planning' | 'completed') || 'planning',
    description: trip?.description,
    images:
      trip?.tripImages?.map((tripImage) => ({
        id: tripImage.id,
        image: {
          id: tripImage.image?.id,
          filename: tripImage.image?.filename,
        },
      })) || [],
    distance: trip?.distance,
    estimatedDuration: trip?.estimatedDuration,
  };

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(tripSchema),
    defaultValues,
  });
  const { isDirty } = useFormReturn.formState;

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

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = async (data) => {
    try {
      const newFiles = (data.images || []).filter((img): img is File => img instanceof File);
      const updateData: {
        title: string;
        origin: string;
        destination: string;
        distance?: string;
        estimatedDuration?: string;
        description?: string;
        status: 'planning' | 'completed';
        tripImages?: { create: { image: File }[] };
      } = {
        title: data.title,
        origin: data.origin,
        destination: data.destination,
        distance: distanceInfo?.distance,
        estimatedDuration: distanceInfo?.duration,
        description: data.description,
        status: data.status,
      };

      if (newFiles.length > 0) {
        updateData.tripImages = {
          create: newFiles.map((file) => ({ image: file })),
        };
      }

      await updateTripMutation({
        variables: {
          where: { id: trip?.id },
          data: updateData,
        },
      });
      await revalidateTripPages(trip?.id);
      useFormReturn.reset(data);
      toast.success(`Trip "${data.title.trim().slice(0, 15)}..." updated successfully!`);
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

    if (currentStatus === 'planning' && currentImages && currentImages.length > 0) {
      useFormReturn.setValue('images', []);
    }
  }, [useFormReturn.watch('status')]);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue.origin as string, { shouldDirty: true });
    useFormReturn.setValue('destination', directionsValue.destination as string, { shouldDirty: true });
  }, [directionsValue, useFormReturn]);

  if (!isLoaded) return <TripLoader type="edit" />;

  return (
    <TripFormProvider
      useForm={useFormReturn}
      isEditing={true}
      onSubmit={handleSubmitCallback}
      onReset={handleClearDirections}
      tripId={trip.id}
      isSubmitting={loading}
      hasChanges={isDirty}
    >
      <div className="relative pt-24 pb-10">
        <Breadcrumb items={[{ label: trip.title, href: getTripUrl(trip.id) }, { label: 'Edit' }]} />
        <div className="px-5">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-3xl font-semibold">Edit Trip</h1>
          </div>
          <Toaster position="top-center" richColors duration={2000} />
          <CreateTripForm
            useForm={useFormReturn}
            setDirectionsValue={setDirectionsValue}
            handlePlaceSelect={handlePlaceSelect}
            originAutocomplete={originAutocomplete}
            destinationAutocomplete={destinationAutocomplete}
            setOriginAutocomplete={setOriginAutocomplete}
            setDestinationAutocomplete={setDestinationAutocomplete}
            isEditing={true}
            authUserId={authUserId}
            tripId={trip?.id}
            tripTitle={trip?.title}
          />
        </div>
      </div>
    </TripFormProvider>
  );
};
