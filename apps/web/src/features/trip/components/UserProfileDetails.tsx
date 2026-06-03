import { getCloudinaryImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';
import { cx } from 'class-variance-authority';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import React, { FC } from 'react';

type TUserProfileDetailsProps = {
  username: string;
  profileImageId: string;
  className?: string;
  imageSize?: string;
  textSize?: string;
  truncate?: boolean;
};

export const UserProfileDetails: FC<TUserProfileDetailsProps> = ({
  username,
  profileImageId,
  className,
  imageSize = 'w-[25px] h-[25px]',
  textSize = 'text-xs',
  truncate = false,
}) => (
  <div className={cx('flex relative items-center gap-2', className)}>
    <Link href={`/user/${username}`} className="cursor-pointer absolute inset-0 w-full h-full z-20" />
    {profileImageId ? (
      <CldImage
        src={getCloudinaryImageSrc(profileImageId)}
        width={100}
        height={100}
        className={cx(imageSize, 'rounded-full object-cover')}
        alt={`${username}'s profile`}
      />
    ) : (
      <div
        className={cx(
          imageSize,
          'rounded-full bg-gray-300 border flex items-center justify-center text-gray-500 text-xs font-bold',
        )}
      />
    )}
    <p
      className={cx('font-semibold text-gray-700 max-w-[80px]', textSize, {
        truncate: truncate,
      })}
    >
      {username}
    </p>
  </div>
);
