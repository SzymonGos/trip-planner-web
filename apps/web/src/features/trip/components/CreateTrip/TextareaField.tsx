import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { TInputFieldProps } from './InputField';
import { TFormValuesProps } from './CreateTripFormContainer';

type TTextareaFieldProps = TInputFieldProps<TFormValuesProps>;

export const TextareaField = ({ control, label, name, placeholder }: TTextareaFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-base">{label}</FormLabel>
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            value={field.value as string}
            maxLength={350}
            rows={3}
            className="md:text-base !border-[0.5px] focus-visible:ring-0 border-tp-gray-100 focus:border focus:border-tp-gray-200 shadow-none"
          />
        </FormControl>
        <FormMessage className="text-base" />
      </FormItem>
    )}
  />
);
