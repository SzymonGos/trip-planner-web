import round from 'lodash/round';

export const formatDistance = (distanceMeters: number): string => {
  const distanceKilometers = round(distanceMeters / 1000, 1);

  return `${distanceKilometers.toLocaleString()} km`;
};
