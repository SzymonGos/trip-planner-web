import type { TTripFormValues } from '../helpers/formValidation';

export type TripStatus = 'PLANNING' | 'COMPLETED';

type TTripCreatorResponse = {
  id: number;
  username: string;
  profileImagePublicId: string | null;
};

export type TripResponse = {
  id: number;
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: TripStatus;
  distanceMeters: number;
  estimatedDurationSeconds?: number;
  createdAt: string;
  creator: TTripCreatorResponse;
  tripImages: TripImagesResponse[];
};

export type TripImagesResponse = {
  id: number;
  publicId: string;
};

export type TCreateTripRequest = TTripFormValues;
