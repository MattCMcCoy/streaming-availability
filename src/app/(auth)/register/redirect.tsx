'use client';

import { useRouter } from 'next/navigation';

export default function Redirect() {
  const router = useRouter();

  router.push('/');

  return (
    <div className="items-center justify-center text-3xl text-white">
      Redirecting...
    </div>
  );
}
