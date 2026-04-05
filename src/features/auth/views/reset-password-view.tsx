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
import type { ResetPasswordLoadingState } from '@/features/auth/types';
import { authClient } from '@/lib/auth-client';
import { maskEmail } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export function ResetPasswordView() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const maskedEmail = maskEmail(email);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingState, setLoadingState] = useState<ResetPasswordLoadingState>('idle');
  const isLoading = loadingState !== 'idle';

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
    setLoadingState('submitting');
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
    setLoadingState('idle');
  };

  const handleResend = async () => {
    setLoadingState('resending');
    await authClient.emailOtp.sendVerificationOtp(
      { email, type: 'forget-password' },
      {
        onSuccess: () => {
          toast.success('Reset code sent successfully');
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message || 'Failed to send reset code');
        },
      },
    );
    setLoadingState('idle');
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
          <OTPInput
            name="otp"
            disabled={isLoading}
            resendButton={
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResend}
                disabled={isLoading}
              >
                {loadingState === 'resending' ? 'Sending...' : 'Resend code'}
              </Button>
            }
          />

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
            {loadingState === 'submitting' ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
