export type TripStatus = 'PLANNED' | 'COMPLETED';

export type Trip = {
  id: number;
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: TripStatus;
  estimatedDuration?: string;
  createdAt: string;
  creatorId?: number;
};
