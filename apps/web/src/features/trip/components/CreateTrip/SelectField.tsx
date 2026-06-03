import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control, FieldValues, Path } from 'react-hook-form';

export type TSelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
};

export const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: TSelectFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-base">{label}</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="py-6 md:text-base !border-[0.5px] focus-visible:ring-0 border-tp-gray-100 focus:border focus:border-tp-gray-200 shadow-none">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage className="text-base" />
      </FormItem>
    )}
  />
);
