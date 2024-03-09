'use client';

import Image from 'next/image';

import { api } from '~/trpc/react';

interface UserProfileProps {
  comment: {
    id: string;
    createdAt: Date;
    message: string;
    mid: number;
    createdById: string;
  };
}

export function UserProfile({ comment }: UserProfileProps) {
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
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex flex-row">
      <div className="relative mt-2 h-10 w-10 rounded-full border border-streamingpurple">
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
        <div className="flex flex-row">
          <div className="pl-2">{user.name}</div>
          <div className="pl-1 text-gray-300/25">@{user.name}</div>
        </div>
        <div className="m-1 line-clamp-3 block w-72 overflow-hidden rounded-lg border border-streamingpurple bg-streamingpurple/20 p-2">
          <p className="line-clamp-3 text-white">{comment.message}</p>
        </div>
      </div>
    </div>
  );
}
