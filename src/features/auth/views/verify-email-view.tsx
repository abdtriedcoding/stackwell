'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { AuthCard, OTPInput } from '@/features/auth/components';
import { verifyEmailSchema } from '@/features/auth/validation/schemas';
import type { VerifyEmailFormData } from '@/features/auth/validation/schemas';
import type { VerificationLoadingState } from '@/features/auth/types';
import { authClient } from '@/lib/auth-client';
import { maskEmail } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export function VerifyEmailView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const maskedEmail = maskEmail(email);
  const [loadingState, setLoadingState] = useState<VerificationLoadingState>('idle');
  const isLoading = loadingState !== 'idle';

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
    },
  });

  if (!email) {
    return (
      <AuthCard title="Invalid verification">
        <div className="flex flex-col gap-6 text-center">
          <p className="text-sm text-muted-foreground">
            Please sign up first to verify your email.
          </p>
          <Link href="/sign-up" className="text-sm text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </AuthCard>
    );
  }

  const onSubmit = async (data: VerifyEmailFormData) => {
    setLoadingState('verifying');
    await authClient.emailOtp.verifyEmail(
      {
        email,
        otp: data.otp,
      },
      {
        onSuccess: () => {
          toast.success('Email verified successfully');
          router.push(ROUTES.HOME);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Invalid verification code');
        },
      },
    );
    setLoadingState('idle');
  };

  const handleResend = async () => {
    if (email) {
      setLoadingState('resending');
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'email-verification',
      });
      toast.success('Verification code sent');
      setLoadingState('idle');
    }
  };

  return (
    <AuthCard
      title="Verify your email"
      description={`Enter the 6-digit code sent to ${maskedEmail}`}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <OTPInput name="otp" disabled={isLoading} />

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {loadingState === 'verifying' ? 'Verifying...' : 'Verify'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isLoading}
            >
              {loadingState === 'resending' ? 'Sending...' : 'Resend OTP'}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already verified?{' '}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
