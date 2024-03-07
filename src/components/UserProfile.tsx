import Image from 'next/image';

import { api } from '~/utils/api';

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
      <div className="relative h-10 w-10 mt-2 rounded-full border-streamingpurple border">
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
      <div className="flex flex-col min-w-0">
        <div className="flex flex-row">
          <div className="pl-2">{user.name}</div>
          <div className="pl-1 text-gray-300/25">@{user.name}</div>
        </div>
        <div className="p-2 bg-streamingpurple/20 rounded-lg m-1 border-streamingpurple block border w-72 line-clamp-3 overflow-hidden">
          <p className="text-white line-clamp-3">{comment.message}</p>
        </div>
      </div>
    </div>
  );
}
