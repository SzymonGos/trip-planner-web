'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Navbar } from './Navbar';
import { useAuthenticatedUser } from '../user/hooks/useAuthenticatedUser';

export const NavbarContainer = () => {
  const { isLoaded } = useUser();

  const { user } = useAuthenticatedUser();

  if (!isLoaded) {
    return <Navbar userName={null} />;
  }

  return <Navbar userName={user?.username} profileImage={user?.profileImagePublicId} />;
};
