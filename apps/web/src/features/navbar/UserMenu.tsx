'use client';

import { SignOutButton, useAuth } from '@clerk/nextjs';
import React, { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQuery } from '@apollo/client';
import { getUserIdByClerkIdQuery } from '@/features/user/server/db/getUserIdByClerkIdQuery';
import { SettingsIcon } from '@/components/Icons/SettingsIcon';
import { UserIcon } from '@/components/Icons/UserIcon';
import { UsernameTrigger } from './UsernameTrigger';
import { SignOutIcon } from '@/components/Icons/SignOutIcon';
import Link from 'next/link';
import { getUserProfileUrl } from '@/features/user/helpers/getUserProfileUrl';
import { getUserSettingsUrl } from '@/features/user/helpers/getUserSettingsUrl';

type TUserMenuProps = {
  userName: string;
  clerkId: string;
};

export const UserMenu: FC<TUserMenuProps> = ({ userName, clerkId }) => {
  const { sessionId } = useAuth();

  const { data } = useQuery(getUserIdByClerkIdQuery, {
    variables: {
      clerkId: clerkId,
    },
  });

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UsernameTrigger userName={userName} profileImageId={data?.user?.profileImage?.id} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem asChild>
            <Link href={getUserProfileUrl(userName)} className="cursor-pointer flex items-center gap-2 text-sm">
              <UserIcon className="!w-5 !h-5" />
              My Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={getUserSettingsUrl()} className="cursor-pointer flex items-center gap-2 text-sm">
              <SettingsIcon className="!w-5 !h-5" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton signOutOptions={{ sessionId }}>
              <div className="flex items-center gap-2">
                <SignOutIcon className="size-5" />
                Sign out
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
