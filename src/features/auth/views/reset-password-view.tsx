'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { AuthCard, PasswordField } from '@/features/auth/components';
import { resetPasswordSchema } from '@/features/auth/validation/schemas';
import type { ResetPasswordFormData } from '@/features/auth/validation/schemas';

export function ResetPasswordView() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthCard title="Password reset successful">
        <div className="flex flex-col gap-6 text-center">
          <p className="text-sm text-muted-foreground">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <Link href="/sign-in" className="text-sm text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset your password" description="Enter your new password below">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <PasswordField name="password" label="New Password" placeholder="Create a new password" />

          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Resetting password...' : 'Reset password'}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
