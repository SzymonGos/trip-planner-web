'use client';

import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { useJsApiLoader } from '@react-google-maps/api';
import { LIBRARIES } from './utils';

export const useGoogleMapLoader = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });
  return { isLoaded };
};
