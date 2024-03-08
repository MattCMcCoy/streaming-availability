'use client';

import Image from 'next/image';

import { type DynamicRoute } from 'next-typesafe-url';
import { useRouteParams } from 'next-typesafe-url/pages';
import { z } from 'zod';
import { AuthShowcase } from '~/auth/AuthShowcase';
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
      <div className="flex lg:flex-row flex-col">
        <div className="items-center flex flex-col lg:flex-row lg:ml-auto lg:shadow-streaminggold shadow-2xl border border-streaminggold bg-streamingpurple/10 p-10 rounded h-fit w-fit">
          <div className="lg:w-[20vw] w-[75vw] bg-slate-700 rounded-lg my-auto h-[30vh] mr-5 relative">
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
            <div className="pt-10 lg:w-[20vw] border-b h-fit border-streaminggold">
              <div className="text-3xl text-white">
                {movieDetails.data.title}
              </div>
            </div>
            <div className="pt-10 lg:w-[20vw] h-fit">
              <div className="text-white text-xl">
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
