import { useEffect, useRef, useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { debounce } from 'lodash';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';

export type TTripImageFormValueProps = {
  id: string;
  image: {
    id: string;
    filename: string;
  };
};

export type TFormValuesProps = {
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: 'planning' | 'completed';
  images?: (File | TTripImageFormValueProps)[];
};

type TUseTripFormSyncProps = {
  useFormReturn: UseFormReturn<TFormValuesProps>;
};

type TUseTripFormSyncReturn = {
  isDistanceLoading: boolean;
};

export const useTripFormSync = ({ useFormReturn }: TUseTripFormSyncProps): TUseTripFormSyncReturn => {
  const { directionsValue, getDistance } = useGoogleMapsDirections();
  const [isDistanceLoading, setIsDistanceLoading] = useState(false);

  const isMountedRef = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchDistance = useCallback(
    debounce(async (origin: string, destination: string) => {
      if (!isMountedRef.current) return;

      setIsDistanceLoading(true);

      try {
        const originStr = typeof origin === 'string' ? origin : JSON.stringify(origin);
        const destinationStr = typeof destination === 'string' ? destination : JSON.stringify(destination);

        await getDistance(originStr, destinationStr);
      } catch (error) {
        if (isMountedRef.current) {
          console.error('Error fetching distance:', error);
        }
      } finally {
        if (isMountedRef.current) {
          setIsDistanceLoading(false);
        }
      }
    }, 500),
    [getDistance],
  );

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue.origin as string);
    useFormReturn.setValue('destination', directionsValue.destination as string);
  }, [directionsValue, useFormReturn]);

  useEffect(() => {
    if (!isMountedRef.current) return;

    if (directionsValue.origin && directionsValue.destination) {
      const originStr =
        typeof directionsValue.origin === 'string' ? directionsValue.origin : JSON.stringify(directionsValue.origin);
      const destinationStr =
        typeof directionsValue.destination === 'string'
          ? directionsValue.destination
          : JSON.stringify(directionsValue.destination);

      debouncedFetchDistance(originStr, destinationStr);
    }
  }, [directionsValue.origin, directionsValue.destination, debouncedFetchDistance]);

  useEffect(
    () => () => {
      isMountedRef.current = false;
      debouncedFetchDistance.cancel();
    },
    [debouncedFetchDistance],
  );

  return {
    isDistanceLoading,
  };
};
