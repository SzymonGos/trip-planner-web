'use client';

import React from 'react';
import { ProfileCard } from './ProfileCard';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
// import { formatDate } from '@/features/trip/helpers/formatDate';
// import { ProfileCardLoader } from './ProfileCardLoader';

type ProfileCardContainerProps = {
  userId: string;
};

export const ProfileCardContainer = ({ userId }: ProfileCardContainerProps) => {
  console.log(userId);
  // user api

  const user = { id: '' };
  const { authUserId } = useAuthenticatedUser();
  const isOwnProfile = authUserId === user?.id;
  const memberSince = '';

  // if (loading) return <ProfileCardLoader />;

  return <ProfileCard user={user} isOwnProfile={isOwnProfile} memberSince={memberSince} />;
};
