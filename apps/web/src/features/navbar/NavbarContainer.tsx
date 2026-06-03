'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Navbar } from './Navbar';

export const NavbarContainer = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Navbar userName={null} clerkId={null} />;
  }

  return <Navbar userName={user?.username} clerkId={user?.id} />;
};
