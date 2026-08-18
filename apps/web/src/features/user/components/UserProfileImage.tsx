import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';

type TUserProfileImageProfileProps = {
  id: string;
};

export const UserProfileImage: FC<TUserProfileImageProfileProps> = ({ id }) => (
  <>
    {id ? (
      <CldImage
        src={id}
        width={150}
        height={150}
        className="w-[150px] h-[150px] rounded-full object-cover"
        alt="User profile"
      />
    ) : (
      <div className="h-[150px] w-[150px] rounded-full bg-gray-300" />
    )}
  </>
);
