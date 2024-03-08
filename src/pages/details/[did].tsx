'use client';

import Image from 'next/image';

import { type DynamicRoute } from 'next-typesafe-url';
import { useRouteParams } from 'next-typesafe-url/pages';
import { z } from 'zod';
import { AuthShowcase } from '~/components/auth/AuthShowcase';
import { CommentSection } from '~/components/details/CommentSection';
import { TopNav } from '~/components/topnav';
import { env } from '~/env';
import { api } from '~/utils/api';

const Route = {
  routeParams: z.object({
    did: z.number()
  })
} satisfies DynamicRoute;

export type RouteType = typeof Route;

export default function MovieDetails() {
  const routeParams = useRouteParams(Route.routeParams);

  const movieDetails = api.tmdb.details.useQuery(routeParams.data?.did ?? -1);

  if (movieDetails.isLoading) {
    return <div>Loading...</div>;
  }

  if (movieDetails.isError || !movieDetails.data) {
    return <div>Error: {JSON.stringify(movieDetails.error)}</div>;
  }

  return (
    <>
      <div className="flex">
        <TopNav />
        <div className="ml-auto mr-10">
          <AuthShowcase />
        </div>
      </div>
      <div className="flex h-[90vh] flex-col lg:h-fit lg:flex-row">
        <div className="flex h-fit w-fit flex-col items-center rounded border-streaminggold p-10 lg:ml-auto lg:flex-row lg:border lg:bg-streamingpurple/10">
          <div className="relative my-auto mr-5 h-[30vh] w-[75vw] rounded-lg lg:w-[20vw] lg:bg-slate-700">
            {(movieDetails.data.poster_path ??
              movieDetails.data.backdrop_path) && (
              <Image
                src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${movieDetails.data.poster_path ?? movieDetails.data.backdrop_path}`}
                draggable={false}
                alt=""
                fill
                sizes="100% 100%"
                aria-label="movie poster"
                className="rounded-lg"
              />
            )}
          </div>
          <div>
            <div className="h-fit border-b border-streaminggold pt-10 lg:w-[20vw]">
              <div className="text-3xl text-white">
                {movieDetails.data.title}
              </div>
            </div>
            <div className="h-fit pt-10 lg:w-[20vw]">
              <div className="text-xl text-white">
                {movieDetails.data.overview}
              </div>
            </div>
          </div>
        </div>
        <CommentSection movieId={movieDetails.data.id} />
      </div>
    </>
  );
}
