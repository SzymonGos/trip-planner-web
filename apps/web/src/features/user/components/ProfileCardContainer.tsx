'use client';

import React from 'react';
import { ProfileCard } from './ProfileCard';
import { useQuery } from '@apollo/client';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { formatDate } from '@/features/trip/helpers/formatDate';
import { getUserDataQuery } from '../server/db/getUserDataQuery';
import { ProfileCardLoader } from './ProfileCardLoader';

type ProfileCardContainerProps = {
  userId: string;
};

export const ProfileCardContainer = ({ userId }: ProfileCardContainerProps) => {
  const { data, loading } = useQuery(getUserDataQuery, {
    variables: {
      id: userId,
    },
  });
  const user = data?.user;
  const { authUserId } = useAuthenticatedUser();
  const isOwnProfile = authUserId === user?.id;
  const memberSince = formatDate(data?.user?.createdAt);

  if (loading) return <ProfileCardLoader />;

  return <ProfileCard user={user} isOwnProfile={isOwnProfile} memberSince={memberSince} />;
};
