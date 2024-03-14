'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as Separator from '@radix-ui/react-separator';
import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

import { FollowButton } from '../../../follow-button';

export function FollowingList({ userId }: { userId: string }) {
  const router = useRouter();
  const {
    data: following,
    isLoading: followingIsLoading,
    error
  } = api.follow.following.useQuery({ userId });

  if (!userId) {
    router.push('/login');

    toast({
      title:
        'Looks like you are not signed in, please sign in to view your profile.',
      variant: 'destructive'
    });

    return null;
  }

  if (error) {
    toast({
      title: `Error: ${error.message}`,
      variant: 'destructive'
    });

    router.back();
  }

  if (followingIsLoading) return <div>Loading...</div>;

  if (!following) return <div>No followers found</div>;

  return (
    <div>
      {following.map((follow) => (
        <div key={follow.id} className="text-white">
          <BuildFollowListing follow={follow} sessionUser={userId} />
          <Separator.Root className="my-8 h-1 w-full bg-white/15" />
        </div>
      ))}
    </div>
  );
}

function BuildFollowListing({
  follow,
  sessionUser
}: {
  follow: {
    id: string;
    createdAt: Date;
    followerId: string;
    followingId: string;
  };
  sessionUser: string;
}) {
  const { data: user, isLoading: userIsLoading } = api.user.getUser.useQuery({
    userId: follow.followerId
  });

  console.log('user', JSON.stringify(user, null, 2));

  if (userIsLoading) return <div>Loading...</div>;

  if (!user) {
    toast({
      title: `User not found: ${follow.followerId}`,
      description: 'This user does not exist.',
      color: 'red'
    });
    return null;
  }

  return (
    <div className="ml-10 mt-5 flex flex-row items-center align-middle">
      <div className="relative my-auto h-20 w-20 rounded-lg">
        {user.image && (
          <Image
            src={user.image}
            alt=""
            fill
            sizes="100% 100%"
            className="self-center rounded-full"
          />
        )}
      </div>
      <div>
        <h2 className="ml-5 text-2xl text-white hover:text-streamingpurple hover:underline">
          <Link
            href={$path({
              route: '/profile/[uid]',
              routeParams: { uid: user.id }
            })}
          >
            {user.name}
          </Link>
        </h2>
        <h3 className="ml-5 text-lg text-white/20">
          Started Following On {moment(follow.createdAt).format('MMMM Do YYYY')}
        </h3>
      </div>
      <div className="ml-auto mr-10">
        <FollowButton userId={sessionUser} followId={follow.followerId} />
      </div>
    </div>
  );
}
