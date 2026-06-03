'use client';

import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService, Marker } from '@react-google-maps/api';
import { TLocationCoordsProps, useUserGeolocation } from '@/hooks/useGeolocation';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { useGoogleMapLoader } from '../hooks/useGoogleMapLoader';
import { customMapStyle } from '../hooks/mapStyles';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouteUsage } from '../hooks/useRouteUsage';
import { useAuthenticatedUser } from '../../user/hooks/useAuthenticatedUser';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { customMarkerIcon } from '../utils/customMarkerIcon';
import { USER_GOOGLE_MAPS_ROUTE_LIMIT } from '@/lib/config';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter: TLocationCoordsProps = {
  lat: 53,
  lng: 9,
};

type TGoogleMapsProps = {
  canEdit?: boolean;
  shouldCountRoutes?: boolean;
};

export const GoogleMaps: FC<TGoogleMapsProps> = ({ canEdit = true, shouldCountRoutes = false }) => {
  const { authUserId } = useAuthenticatedUser();
  const { incrementRouteCount, canCreateRoute } = useRouteUsage(authUserId);
  const router = useRouter();
  const [originCoords, setOriginCoords] = useState<TLocationCoordsProps | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<TLocationCoordsProps | null>(null);

  const {
    directionsValue,
    setDirectionsValue,
    directionsResult,
    setDirectionsResult,
    directionsRendererRef,
    getDistance,
  } = useGoogleMapsDirections();
  const { isLoaded } = useGoogleMapLoader();
  const { location } = useUserGeolocation();

  useEffect(() => {
    if (directionsResult) {
      const route = directionsResult.routes[0];
      if (route) {
        const leg = route.legs[0];
        if (leg) {
          const originLat = leg.start_location.lat();
          const originLng = leg.start_location.lng();
          setOriginCoords({ lat: originLat, lng: originLng });

          const destLat = leg.end_location.lat();
          const destLng = leg.end_location.lng();
          setDestinationCoords({ lat: destLat, lng: destLng });
        }
      }
    }
  }, [directionsResult]);

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!canEdit || !e.latLng) return;

      if (!authUserId) {
        toast('Please login to create a route.', {
          action: { label: 'Login', onClick: () => router.push('/sign-in') },
        });
        return;
      }

      if (authUserId && shouldCountRoutes && !canCreateRoute) {
        toast.error(
          `Route limit reached! You've used ${USER_GOOGLE_MAPS_ROUTE_LIMIT} routes this month. Please wait until reset.`,
        );
        return;
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const address = results[0].formatted_address;
          if (!directionsValue.origin) {
            setDirectionsValue({ ...directionsValue, origin: address });
          } else if (!directionsValue.destination) {
            setDirectionsValue({ ...directionsValue, destination: address });
          } else {
            setDirectionsValue({ origin: address, destination: '', waypoints: [] });
          }
        }
      });
    },
    [directionsValue, setDirectionsValue, canEdit, authUserId, shouldCountRoutes, canCreateRoute, router],
  );

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === 'OK' && result !== null) {
        setDirectionsResult(result);
        if (directionsValue.origin && directionsValue.destination) {
          const originStr =
            typeof directionsValue.origin === 'string'
              ? directionsValue.origin
              : JSON.stringify(directionsValue.origin);

          const destinationStr =
            typeof directionsValue.destination === 'string'
              ? directionsValue.destination
              : JSON.stringify(directionsValue.destination);

          getDistance(originStr, destinationStr);

          if (shouldCountRoutes) {
            incrementRouteCount(originStr, destinationStr);
          }
        } else {
          console.log('Missing origin or destination:', {
            origin: directionsValue.origin,
            destination: directionsValue.destination,
          });
        }
      } else {
        console.error('Directions request failed:', status);
      }
    },
    [setDirectionsResult, directionsValue, getDistance, incrementRouteCount],
  );

  const onDirectionsLoad = useCallback(
    (directionsRenderer: google.maps.DirectionsRenderer) => {
      directionsRendererRef.current = directionsRenderer;
    },
    [directionsRendererRef],
  );

  const center = useMemo(() => (location?.lat && location?.lng ? location : defaultCenter), [location]);

  const directionsServiceOptions = useMemo<google.maps.DirectionsRequest>(
    () => ({
      destination: directionsValue.destination,
      origin: directionsValue.origin,
      travelMode: 'DRIVING' as google.maps.TravelMode,
    }),
    [directionsValue.origin, directionsValue.destination],
  );

  if (!isLoaded) return <Skeleton className="h-full w-full" />;

  return (
    <GoogleMap
      zoom={10}
      mapContainerStyle={mapContainerStyle}
      center={center}
      onClick={onMapClick}
      options={{
        styles: customMapStyle,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }}
    >
      {directionsValue.origin && directionsValue.destination && (
        <DirectionsService options={directionsServiceOptions} callback={directionsCallback} />
      )}
      {directionsResult && (
        <DirectionsRenderer
          directions={directionsResult}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#059669',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            },
            draggable: false,
          }}
          onLoad={onDirectionsLoad}
        />
      )}
      {originCoords && <Marker position={originCoords} icon={customMarkerIcon('#059669')} />}
      {destinationCoords && <Marker position={destinationCoords} icon={customMarkerIcon('#065F46')} />}
    </GoogleMap>
  );
};
