'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { UserSettings } from './UserSettings';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSettingsSchema } from '../helpers/formValidation';
import { z } from 'zod';
import { DeleteAccountContainer } from './DeleteAccountContainer';

type TFormValuesProps = z.infer<typeof userSettingsSchema> & {
  profileImage?: File;
};

export const UserSettingsContainer = () => {
  const { authUserId } = useAuthenticatedUser();
  const { user: clerkUser } = useUser();

  console.log(authUserId);

  // get user api

  // update user api

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  // useEffect(() => {
  //   if (data?.user) {
  //     useFormReturn.reset({
  //       username: data.user.username || '',
  //       email: data.user.email || '',
  //     });
  //   }
  // }, [data?.user, useFormReturn]);

  const handleOnSubmit = async (data) => {
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

      // update user
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
        user={{}}
        useFormReturn={useFormReturn}
        onSubmit={handleSubmitCallback}
        isLoading={false}
        hasChanges={hasChanges}
        onImageChange={handleImageChange}
      />
      <DeleteAccountContainer />
    </>
  );
};
