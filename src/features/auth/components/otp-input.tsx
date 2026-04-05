'use client';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { OTPInputProps } from '@/features/auth/types';

export function OTPInput({ name, disabled = false, resendButton }: OTPInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor={field.name}>Enter OTP</FieldLabel>
            {resendButton}
          </div>
          <InputOTP
            id={field.name}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            disabled={disabled}
            value={field.value}
            onChange={field.onChange}
          >
            <InputOTPGroup className="w-full justify-center">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  aria-invalid={fieldState.invalid}
                  className="flex-1 h-12 text-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
