import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldValues, Path } from 'react-hook-form';

export type TInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  hasError?: boolean;
};

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  hasError,
}: TInputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-base">{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            className="py-6 md:text-base !border-[0.5px] focus-visible:ring-0 border-tp-gray-100 focus:border focus:border-tp-gray-200 shadow-none"
            hasError={hasError}
          />
        </FormControl>
        <FormMessage className="text-base" />
      </FormItem>
    )}
  />
);
