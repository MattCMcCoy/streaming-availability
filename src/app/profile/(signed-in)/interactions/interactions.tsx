'use client';

import Link from 'next/link';

import { $path } from 'next-typesafe-url';
import { ServerImage } from '~/app/lib/server-image';
import { api } from '~/trpc/react';

export function Interactions({ userID }: { userID: string }) {
  const {
    data: interactions,
    isLoading: interactionsIsLoading,
    error
  } = api.comment.getCommentsByUserId.useQuery({ userId: userID });

  if (interactionsIsLoading) return <div>Loading...</div>;
  if (!interactions) return <div>No interactions</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {interactions.map((interaction) => {
        return (
          <BuildInteraction key={interaction.id} interaction={interaction} />
        );
      })}
    </div>
  );
}

function BuildInteraction({
  interaction
}: {
  interaction: {
    id: string;
    createdAt: Date;
    header: string;
    message: string;
    mid: number;
    createdById: string;
  };
}) {
  const { data: movieDetails } = api.tmdb.details.useQuery(interaction.mid);
  return (
    <div className="flex flex-row pt-5 text-xl text-white">
      <div className="relative h-32 w-20 rounded-xl">
        <ServerImage src={movieDetails?.poster_path ?? ''} />
      </div>
      <div className="pl-5">
        <div className="mb-2 w-[20vw] border-b border-streamingpurple text-2xl font-semibold hover:text-streamingpurple">
          <Link
            href={$path({
              route: '/details/[mid]',
              routeParams: { mid: interaction.mid }
            })}
          >
            {movieDetails?.title}
          </Link>
        </div>
        <div>{interaction.header}</div>
        <div>{interaction.message}</div>
      </div>
    </div>
  );
}
