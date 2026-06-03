import React, { FC } from 'react';
import { UserProfileDetails } from '../UserProfileDetails';

type TripCardUserDetailsProps = {
  username: string;
  profileImageId?: string;
};

export const TripCardUserDetails: FC<TripCardUserDetailsProps> = ({ username, profileImageId }) => (
  <div className="absolute group/user top-2 left-2 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md transition-all duration-300 group-hover:bg-white/90 z-20">
    <UserProfileDetails
      username={username}
      profileImageId={profileImageId || ''}
      className="group-hover/user:text-gray-900"
    />
  </div>
);
