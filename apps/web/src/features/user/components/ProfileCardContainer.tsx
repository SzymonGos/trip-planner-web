import React from 'react';
import { ProfileCard } from './ProfileCard';
import { formatDate } from '@/features/trip/helpers/formatDate';
import { ProfileCardLoader } from './ProfileCardLoader';
// import { formatDate } from '@/features/trip/helpers/formatDate';
// import { ProfileCardLoader } from './ProfileCardLoader';

type ProfileCardContainerProps = {
  username: string;
  createdAt: string;
  isOwnProfile: boolean;
  profileImage: any;
  isLoading: boolean;
};

export const ProfileCardContainer = ({
  username,
  profileImage,
  createdAt,
  isOwnProfile,
  isLoading,
}: ProfileCardContainerProps) => {
  const memberSince = formatDate(createdAt);

  if (isLoading) return <ProfileCardLoader />;

  return (
    <ProfileCard
      profileImage={profileImage}
      username={username}
      isOwnProfile={isOwnProfile}
      memberSince={memberSince}
    />
  );
};
