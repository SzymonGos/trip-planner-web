export type TripStatus = 'planned' | 'completed';

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
  url: string;
  publicId: string;
};
