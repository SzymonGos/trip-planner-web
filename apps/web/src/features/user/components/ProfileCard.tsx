'use client';

import React, { FC } from 'react';
import { User as TUser } from 'tp-graphql-types';
import { UserProfileImage } from './UserProfileImage';
import { SettingsIcon } from '@/components/Icons/SettingsIcon';
import Link from 'next/link';

type ProfileCardProps = {
  user: TUser;
  isOwnProfile: boolean;
  memberSince: string;
};

export const ProfileCard: FC<ProfileCardProps> = ({ user, isOwnProfile, memberSince }) => (
  <div className="bg-tp-white-100 rounded-lg p-6 border h-fit sticky top-[88px]">
    {isOwnProfile && (
      <Link
        href="/user/settings"
        className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <SettingsIcon className="!w-6 !h-6" />
      </Link>
    )}
    <div className="flex flex-col items-center">
      <UserProfileImage id={user?.profileImage?.id} />

      <div className="text-center mt-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[22px] leading-10 font-bold text-tp-gray-300π">{user?.username}</h3>
        </div>

        <div className="w-fit px-3 py-1 mt-2 inline-flex self-center rounded-md text-sm font-medium bg-gray-100 text-gray-800">
          Member
        </div>
      </div>

      <div className="w-full mt-6 space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">Member since</div>
          <div className="text-gray-900 font-medium">{memberSince}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-600">Role</div>
          <div className="text-gray-900 font-medium">Traveler</div>
        </div>
      </div>
    </div>
  </div>
);
