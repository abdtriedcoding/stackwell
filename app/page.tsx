import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image src="/logo.svg" alt="Stackwell logo" width={100} height={20} priority />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Stackwell
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Agency management platform with zero seat tax. Scale your team without scaling your
            software bill.
          </p>
        </div>
        <Button
          nativeButton={false}
          size="lg"
          render={
            <Link href="https://x.com/abdtriedcoding" target="_blank">
              Follow the build →
            </Link>
          }
        />
      </main>
    </div>
  );
}
