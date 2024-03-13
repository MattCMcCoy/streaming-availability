'use client';

import Link from 'next/link';

import * as Separator from '@radix-ui/react-separator';
import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { toast } from '~/app/lib/components/toast/use-toast';
import { ServerImage } from '~/app/lib/server-image';
import { api } from '~/trpc/react';

export function MovieReview({
  comment
}: {
  comment: {
    id: string;
    createdAt: Date;
    header: string;
    message: string;
    mid: number;
    createdById: string;
  };
}) {
  const {
    data: movie,
    isLoading: movieIsLoading,
    isError: movieIsError
  } = api.tmdb.details.useQuery(comment.mid);

  if (movieIsLoading) {
    return <div>Loading...</div>;
  }

  if (movieIsError || !movie) {
    toast({
      title: `Failed to load movie with id ${comment.mid}`,
      color: 'red'
    });

    return null;
  }

  return (
    <>
      <div className="flex flex-row pt-2">
        <div className="relative h-40 w-24">
          <ServerImage src={movie.poster_path ?? movie.backdrop_path ?? ''} />
        </div>
        <div className="pl-5">
          <div className="pb-3 font-serif text-2xl font-bold text-white hover:text-streamingpurple">
            <Link
              href={$path({
                route: '/details/[mid]',
                routeParams: { mid: movie.id }
              })}
            >
              <h1 className="w-[30vw] border-b border-streamingpurple">
                {movie.title}
              </h1>
            </Link>
          </div>
          <div className="font-sans text-white">
            <div className="flex flex-row items-baseline space-x-5">
              <h1 className="text-xl font-semibold">{comment.header}</h1>
              <h2 className="text-white/20">
                {moment(comment.createdAt).format('MMMM Do YYYY')}
              </h2>
            </div>

            <p>{comment.message}</p>
          </div>
        </div>
      </div>
      <Separator.Root className="my-8 h-1 w-full bg-white/15" />
    </>
  );
}
