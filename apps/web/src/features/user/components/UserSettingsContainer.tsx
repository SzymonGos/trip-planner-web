'use client';

import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { UserSettings } from './UserSettings';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSettingsSchema } from '../helpers/formValidation';
import { z } from 'zod';
import { DeleteAccountContainer } from './DeleteAccountContainer';
import { useMutation } from '@tanstack/react-query';
import { updateCurrentUserMutation } from '../server/actions/updateCurrentUserMutation';
import type { TUpdateUserMutation } from '../types/types';

type TFormValuesProps = z.infer<typeof userSettingsSchema> & {
  profileImage?: File;
};

export const UserSettingsContainer = () => {
  const { user } = useAuthenticatedUser();
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: TUpdateUserMutation) => {
      const token = await getToken();

      return updateCurrentUserMutation(token, data.body, data.profileImage);
    },
  });

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      useFormReturn.reset({
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user, useFormReturn]);

  const handleOnSubmit = async (data: any) => {
    try {
      let profileImage = data.profileImage;
      if (profileImage && !(profileImage instanceof File)) {
        profileImage = undefined;
      }
      await mutateAsync({
        body: {
          username: data.username,
        },
        profileImage,
      });
      if (data.username && clerkUser) {
        await clerkUser.update({
          username: data.username,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);
  const hasChanges = useFormReturn.formState.isDirty;

  const handleImageChange = (file: File) => {
    useFormReturn.setValue('profileImage', file, { shouldDirty: true });
  };

  return (
    <>
      <UserSettings
        user={user}
        useFormReturn={useFormReturn}
        onSubmit={handleSubmitCallback}
        isLoading={isPending}
        hasChanges={hasChanges}
        onImageChange={handleImageChange}
      />
      <DeleteAccountContainer />
    </>
  );
};
