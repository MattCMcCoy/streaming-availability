'use client';

import { useRouter } from 'next/navigation';

import { type Session } from 'next-auth';

import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

import { EditProfileForm } from './profile-form';

export function EditProfile({ session }: { session: Session | null }) {
  const router = useRouter();
  const data = api.user.getUser.useQuery({ userId: session?.user?.id ?? '' });

  if (!session) {
    router.push('/login');

    toast({
      title:
        'Looks like you are not signed in, please sign in to view your profile.',
      variant: 'destructive'
    });

    return null;
  }

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.error ?? !data.data) {
    return (
      <div className="text-xl text-white">
        Error: {data.error?.message ?? 'Sign in to edit your profile'}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5 flex w-[60vw] flex-col text-xl font-bold text-white">
      <EditProfileForm user={data.data} />
    </div>
  );
}
