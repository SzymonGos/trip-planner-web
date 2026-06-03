'use client';

import { createContext, useContext, useMemo, useRef, useState, useCallback, RefObject } from 'react';
import { initialDirections, TDirectionsValueProps } from './constants';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';

export type TDistanceMatrixResult = {
  distance: string;
  duration: string;
};

type TDirectionsContextProps = {
  directionsValue: TDirectionsValueProps;
  setDirectionsValue: (value: TDirectionsValueProps) => void;
  handleClearDirections: () => void;
  directionsResult: google.maps.DirectionsResult | null;
  setDirectionsResult: (result: google.maps.DirectionsResult | null) => void;
  directionsRendererRef: RefObject<google.maps.DirectionsRenderer | null>;
  distanceInfo: TDistanceMatrixResult | null;
  getDistance: (origin: string, destination: string) => Promise<TDistanceMatrixResult | null>;
};

const DirectionsContext = createContext<TDirectionsContextProps>({} as TDirectionsContextProps);

export const DirectionsProvider = ({ children }) => {
  const [directionsValue, setDirectionsValue] = useState<TDirectionsValueProps>(initialDirections);
  const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);
  const [distanceInfo, setDistanceInfo] = useState<TDistanceMatrixResult | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const { isLoaded } = useGoogleMapLoader();

  const getDistance = useCallback(
    async (origin: string, destination: string): Promise<TDistanceMatrixResult | null> => {
      if (!isLoaded) return null;

      try {
        const service = new google.maps.DistanceMatrixService();
        const response = await service.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        });

        if (response.rows[0]?.elements[0]?.status === 'OK') {
          const element = response.rows[0].elements[0];
          const result = {
            distance: element.distance.text,
            duration: element.duration.text,
          };
          setDistanceInfo(result);
          return result;
        }
      } catch (error) {
        console.error('Error getting distance matrix:', error);
      }
    },
    [isLoaded],
  );

  const handleClearDirections = useCallback(() => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
    setDirectionsValue(initialDirections);
    setDirectionsResult(null);
    setDistanceInfo(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      directionsValue,
      setDirectionsValue,
      handleClearDirections,
      directionsResult,
      setDirectionsResult,
      directionsRendererRef,
      distanceInfo,
      getDistance,
    }),
    [directionsValue, directionsResult, handleClearDirections, distanceInfo, getDistance],
  );

  return <DirectionsContext.Provider value={contextValue}>{children}</DirectionsContext.Provider>;
};

export const useGoogleMapsDirections = () => useContext(DirectionsContext);
