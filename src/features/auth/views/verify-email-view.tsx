'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { AuthCard, OTPInput } from '@/features/auth/components';
import { verifyEmailSchema } from '@/features/auth/validation/schemas';
import type { VerifyEmailFormData } from '@/features/auth/validation/schemas';

export function VerifyEmailView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setIsLoading(true);
    console.log(data.otp);
    setIsLoading(false);
    router.push('/');
  };

  const handleResend = () => {
    console.log('resend otp');
  };

  return (
    <AuthCard title="Verify your email" description="Enter the 6-digit code sent to your email">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <OTPInput name="otp" />

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Resend OTP'}
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
