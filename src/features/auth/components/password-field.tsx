'use client';

import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { PasswordInput } from './password-input';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function PasswordField({ name, label, ...props }: PasswordFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <PasswordInput
            {...field}
            id={field.name}
            name={field.name}
            aria-invalid={fieldState.invalid}
            {...props}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
