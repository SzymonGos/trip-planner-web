'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { CloudinaryImage_File, UserUpdateArgs } from 'tp-graphql-types';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { UserSettings } from './UserSettings';
import { useQuery, useMutation } from '@apollo/client';
import { getUserDataQuery } from '../server/db/getUserDataQuery';
import { updateUserMutationQuery } from '../server/actions/updateUserMutationQuery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSettingsSchema } from '../helpers/formValidation';
import { z } from 'zod';
import { DeleteAccountContainer } from './DeleteAccountContainer';

type TFormValuesProps = z.infer<typeof userSettingsSchema> & {
  profileImage?: CloudinaryImage_File | File;
};

export const UserSettingsContainer = () => {
  const { authUserId } = useAuthenticatedUser();
  const { user: clerkUser } = useUser();

  const { data } = useQuery(getUserDataQuery, {
    variables: {
      id: authUserId,
    },
  });

  const [updateUserMutation, { loading: updateUserMutationLoading }] = useMutation(updateUserMutationQuery);

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  useEffect(() => {
    if (data?.user) {
      useFormReturn.reset({
        username: data.user.username || '',
        email: data.user.email || '',
      });
    }
  }, [data?.user, useFormReturn]);

  const handleOnSubmit = async (data: UserUpdateArgs['data']) => {
    try {
      if (data.username && clerkUser) {
        await clerkUser.update({
          username: data.username,
        });
      }
      let profileImage = data.profileImage;
      if (profileImage && !(profileImage instanceof File)) {
        profileImage = undefined;
      }
      await updateUserMutation({
        variables: {
          where: { id: authUserId },
          data: {
            ...data,
            profileImage,
          },
        },
      });
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
        user={data?.user}
        useFormReturn={useFormReturn}
        onSubmit={handleSubmitCallback}
        isLoading={updateUserMutationLoading}
        hasChanges={hasChanges}
        onImageChange={handleImageChange}
      />
      <DeleteAccountContainer />
    </>
  );
};
