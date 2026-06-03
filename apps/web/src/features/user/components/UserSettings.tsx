'use client';

import React from 'react';
import { User } from 'tp-graphql-types';
import { Form } from '@/components/ui/form';
import { InputField } from '@/features/trip/components/CreateTrip/InputField';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { userSettingsSchema } from '../helpers/formValidation';
import { ProfileImageUpload } from './ProfileImageUpload';
import { Loader2 } from 'lucide-react';
import { ResetIcon } from '@/components/Icons/ResetIcon';

type TFormValuesProps = z.infer<typeof userSettingsSchema>;

type UserSettingsProps = {
  user?: User;
  useFormReturn: UseFormReturn<TFormValuesProps>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  hasChanges: boolean;
  onImageChange: (file: File) => void;
};

export const UserSettings = ({
  user,
  useFormReturn,
  onSubmit,
  isLoading,
  hasChanges,
  onImageChange,
}: UserSettingsProps) => (
  <Form {...useFormReturn}>
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center gap-6 mb-8">
        <ProfileImageUpload defaultValue={user?.profileImage?.id} onFileChange={onImageChange} />
      </div>
      <InputField<TFormValuesProps>
        control={useFormReturn.control}
        name="username"
        label="Username"
        placeholder="Enter your username"
        hasError={!!useFormReturn.formState.errors.username}
      />
      <InputField<TFormValuesProps>
        control={useFormReturn.control}
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        hasError={!!useFormReturn.formState.errors.email}
      />
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading || !hasChanges}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => useFormReturn.reset()}
          disabled={!hasChanges}
          className="!px-3"
        >
          <ResetIcon />
        </Button>
      </div>
    </form>
  </Form>
);
