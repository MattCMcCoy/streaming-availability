'use client';

import { type Session } from 'next-auth';

import { api } from '~/trpc/react';

import { CommentSection } from './comment/CommentSection';
import { ServerImage } from './ServerImage';

export default function MovieDetails({
  mid,
  session
}: {
  mid: number;
  session: Session | null;
}) {
  const movieDetails = api.tmdb.details.useQuery(mid);

  if (movieDetails.isLoading) {
    return <div>Loading...</div>;
  }

  if (movieDetails.error) {
    return <div>Error: {movieDetails.error.message}</div>;
  }

  if (!movieDetails.data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col lg:h-fit lg:flex-row">
      <div className="flex h-fit w-fit flex-col items-center rounded border-streaminggold p-10 lg:ml-auto lg:flex-row lg:border lg:bg-streamingpurple/10">
        <div className="relative my-auto mr-5 h-[30vh] w-[75vw] rounded-lg lg:w-[20vw] lg:bg-slate-700">
          <ServerImage
            src={
              movieDetails.data.poster_path ??
              movieDetails.data.backdrop_path ??
              ''
            }
          />
        </div>
        <div>
          <div className="h-fit border-b border-streaminggold pt-10 lg:w-[20vw]">
            <div className="text-3xl text-white">{movieDetails.data.title}</div>
          </div>
          <div className="h-fit pt-10 lg:w-[20vw]">
            <div className="text-xl text-white">
              {movieDetails.data.overview}
            </div>
          </div>
        </div>
      </div>
      <CommentSection movieId={movieDetails.data.id} session={session} />
    </div>
  );
}
