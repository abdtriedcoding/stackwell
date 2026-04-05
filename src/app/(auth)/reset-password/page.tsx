import { Suspense } from 'react';
import { ResetPasswordView } from '@/features/auth/views';
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
      <ResetPasswordView />
    </Suspense>
  );
}
