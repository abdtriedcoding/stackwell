'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AuthCard, GoogleButton, FormField, PasswordField } from '@/features/auth/components';
import { signUpSchema } from '@/features/auth/validation/schemas';
import type { SignUpFormData } from '@/features/auth/validation/schemas';

export function SignUpView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
    router.push('/verify-email');
  };

  return (
    <AuthCard title="Create an account" description="Enter your details to get started">
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
            <FormField name="name" label="Name" placeholder="Enter your name" />

            <FormField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />

            <PasswordField name="password" label="Password" placeholder="Create a password" />

            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </FormProvider>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
