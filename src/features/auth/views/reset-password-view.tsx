'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { AuthCard, OTPInput, PasswordField } from '@/features/auth/components';
import { resetPasswordSchema } from '@/features/auth/validation/schemas';
import type { ResetPasswordFormData } from '@/features/auth/validation/schemas';
import { authClient } from '@/lib/auth-client';
import { maskEmail } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export function ResetPasswordView() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const maskedEmail = maskEmail(email);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  if (!email) {
    return (
      <AuthCard title="Invalid reset request">
        <div className="flex flex-col gap-6 text-center">
          <p className="text-sm text-muted-foreground">
            This password reset request is invalid. Please request a new one.
          </p>
          <Link href={ROUTES.FORGOT_PASSWORD} className="text-sm text-primary hover:underline">
            Request new reset
          </Link>
        </div>
      </AuthCard>
    );
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    await authClient.emailOtp.resetPassword(
      {
        email,
        otp: data.otp,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success('Password reset successfully');
          setIsSubmitted(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Failed to reset password');
        },
      },
    );
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <AuthCard title="Password reset successful">
        <div className="flex flex-col gap-6 text-center">
          <p className="text-sm text-muted-foreground">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <Link href={ROUTES.SIGN_IN} className="text-sm text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      description={`Enter the 6-digit code sent to ${maskedEmail} and your new password`}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <OTPInput name="otp" disabled={isLoading} />

          <PasswordField
            name="password"
            label="New Password"
            placeholder="Create a new password"
            disabled={isLoading}
          />

          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            disabled={isLoading}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
