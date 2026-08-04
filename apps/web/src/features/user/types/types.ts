import type { TripResponse } from '@/features/trip/types/types';

export type TCreateUserRequest = {
  clerkId: string;
  email: string;
  username: string;
};

export type TCurrentUserResponse = {
  id: number;
};

export type TUserResponse = {
  id: number;
  username: string;
  createdAt: string;
  trips: TripResponse[];
};
