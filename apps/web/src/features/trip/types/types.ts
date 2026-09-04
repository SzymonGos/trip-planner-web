export type TripStatus = 'PLANNING' | 'COMPLETED';

export type TripResponse = {
  id: number;
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: TripStatus;
  estimatedDuration?: string;
  createdAt: string;
  creatorId: number;
  tripImages: TripImagesResponse[];
};

export type TripImagesResponse = {
  id: number;
  publicId: string;
};

export type TCreateTripRequest = {
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: TripStatus;
  images?: File[];
};
