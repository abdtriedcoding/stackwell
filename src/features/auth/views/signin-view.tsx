'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AuthCard, GoogleButton, FormField, PasswordField } from '@/features/auth/components';
import { signInSchema } from '@/features/auth/validation/schemas';
import type { SignInFormData } from '@/features/auth/validation/schemas';

export function SignInView() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <AuthCard title="Welcome back">
      <div className="flex flex-col gap-6">
        <GoogleButton />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <p className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or continue with</span>
          </p>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />

            <div className="flex flex-col gap-2">
              <PasswordField name="password" label="Password" placeholder="Enter your password" />
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </FormProvider>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
