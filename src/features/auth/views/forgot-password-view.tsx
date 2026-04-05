'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { AuthCard, FormField } from '@/features/auth/components';
import { forgotPasswordSchema } from '@/features/auth/validation/schemas';
import type { ForgotPasswordFormData } from '@/features/auth/validation/schemas';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/lib/routes';

export function ForgotPasswordView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    await authClient.emailOtp.requestPasswordReset(
      {
        email: data.email,
      },
      {
        onSuccess: () => {
          router.push(ROUTES.resetPassword(data.email));
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Failed to send reset code');
        },
      },
    );
    setIsLoading(false);
  };

  return (
    <AuthCard
      title="Forgot your password?"
      description="Enter your email to receive reset instructions"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isLoading}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send reset code'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
