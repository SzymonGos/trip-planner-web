'use client';

import { useEffect, useState } from 'react';
import { IPAPI_URL } from '@/lib/config';

export type TLocationCoordsProps = {
  lat: number;
  lng: number;
};

const initialLocation = { lat: null, lng: null };

export const useUserGeolocation = () => {
  const [location, setLocation] = useState<TLocationCoordsProps | null>(() => {
    if (typeof window !== 'undefined') {
      const cachedLocation = localStorage.getItem('userLocation');
      return cachedLocation ? JSON.parse(cachedLocation) : initialLocation;
    }
    return initialLocation;
  });

  const getUserLocation = async () => {
    try {
      const cashedLocation = localStorage.getItem('userLocation');
      if (cashedLocation) {
        setLocation(JSON.parse(cashedLocation));
        return;
      }

      const response = await fetch(IPAPI_URL);
      const data = await response.json();

      const newLocation = { lat: data.latitude, lng: data.longitude };
      localStorage.setItem('userLocation', JSON.stringify(newLocation));
      setLocation(newLocation);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { location };
};
