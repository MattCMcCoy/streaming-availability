'use client';

import Image from 'next/image';
import Link from 'next/link';

import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

interface ReviewProps {
  comment: {
    id: string;
    createdAt: Date;
    message: string;
    mid: number;
    createdById: string;
    header: string;
  };
}

export function Review({ comment }: ReviewProps) {
  const {
    data: user,
    isLoading: userIsLoading,
    isError,
    error
  } = api.user.getUser.useQuery({ userId: comment.createdById });

  if (userIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    toast({
      title: 'Error Fetching Review!',
      description: error?.message,
      color: 'red'
    });

    return null;
  }

  return (
    <div className="flex flex-row">
      <div className="relative mt-2 h-10 w-10 rounded-full border border-streamingpurple pl-10">
        {user.image && (
          <Image
            src={user.image}
            draggable={false}
            alt=""
            fill
            sizes="100% 100%"
            aria-label="movie poster"
            className="rounded-full"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <p className="line-clamp-3 pl-3 font-bold text-white">
          {comment.header}
        </p>
        <div className="flex flex-row space-x-2 pl-3">
          <div className="text-sm hover:text-streamingpurple hover:underline">
            <Link
              href={$path({
                route: '/profile/[uid]',
                routeParams: { uid: user.id }
              })}
            >
              {user.name}
            </Link>
          </div>
          <div className="text-sm text-gray-300/25">
            {moment(comment.createdAt.toDateString()).format('MMMM Do YYYY')}
          </div>
        </div>
        <p className="ml-3 line-clamp-3 text-white">{comment.message}</p>
      </div>
    </div>
  );
}
