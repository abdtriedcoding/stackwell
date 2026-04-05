import { Suspense } from 'react';
import { VerifyEmailView } from '@/features/auth/views';
import { Spinner } from '@/components/ui/spinner';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      }
    >
      <VerifyEmailView />
    </Suspense>
  );
}
