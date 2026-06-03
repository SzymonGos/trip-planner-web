'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuth, useClerk } from '@clerk/nextjs';
import { deleteUserMutationQuery } from '../server/actions/deleteUserMutationQuery';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { DeleteAccount } from './DeleteAccount';

export const DeleteAccountContainer = () => {
  const { userId: clerkId } = useAuth();
  const { authUserId } = useAuthenticatedUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { signOut } = useClerk();

  const [deleteUserMutation] = useMutation(deleteUserMutationQuery);

  const handleDeleteAccount = async () => {
    if (!clerkId || !authUserId) {
      console.error('Missing user ID');
      return;
    }

    try {
      setIsDeleting(true);
      const clerkResponse = await fetch(`/api/user/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerkId }),
      });
      if (!clerkResponse.ok) {
        throw new Error('Failed to delete user from Clerk');
      }
      await deleteUserMutation({
        variables: {
          where: { id: authUserId },
          data: {
            isDeleted: true,
            deletedAt: new Date().toISOString(),
          },
        },
      });

      await signOut({ redirectUrl: '/' });
      setIsOpen(false);
      setIsDeleting(false);
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <DeleteAccount
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleDeleteAccount={handleDeleteAccount}
      isDeleting={isDeleting}
    />
  );
};
