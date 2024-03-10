'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Chip } from '@nextui-org/react';
import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

import { ServerImage } from './ServerImage';

export default function MovieDetails({ mid }: { mid: number }) {
  const router = useRouter();
  const movieDetails = api.tmdb.details.useQuery(mid);

  if (movieDetails.isLoading) {
    return <div>Loading...</div>;
  }

  if (movieDetails.error) {
    return <div>Error: {movieDetails.error.message}</div>;
  }

  if (!movieDetails.data) {
    router.push('/');
    toast({
      title: 'Movie details not found, try again later.',
      color: 'red'
    });
    return null;
  }

  return (
    <div className="flex h-[90vh] w-full flex-col items-center">
      <div className="h-fit pt-3 lg:w-[80vw]">
        <div className="float-right text-white hover:text-streamingpurple hover:underline">
          <Link
            href={$path({
              route: '/details/[mid]/reviews',
              routeParams: { mid: movieDetails.data.id }
            })}
          >
            User reviews
          </Link>
        </div>
        <div className="mt-10 border-b border-streaminggold text-4xl font-bold text-white">
          {movieDetails.data.title}
        </div>
        <div className="mr-auto mt-2 w-[80vw]">
          <div className="text-xl text-white">
            {`${moment(movieDetails.data.release_date).format('YYYY')} •
            ${movieDetails.data.runtime} mins`}
          </div>
          <div className="mt-2 space-x-2 text-xl text-white">
            {movieDetails.data.genres.map((genre, index) => (
              <Chip color="primary" className="mt-1 outline" key={index}>
                {genre.name}
              </Chip>
            ))}
          </div>
          <div className="flex flex-row">
            <div className="relative my-auto mr-5 mt-5 hidden h-[40vh] rounded-lg md:block lg:w-[380px]">
              <ServerImage
                src={
                  movieDetails.data.poster_path ??
                  movieDetails.data.backdrop_path ??
                  ''
                }
              />
            </div>
            {movieDetails.data.videos?.results.find(
              (video) => video.type == 'Trailer'
            ) && (
              <iframe
                frameBorder="0"
                seamless
                className="mt-5 h-[40vh] w-[90vw] max-w-[800px] lg:w-[60vw]"
                allowFullScreen
                src={`https://youtube.com/embed/${
                  movieDetails.data.videos?.results.find(
                    (video) => video.type == 'Trailer'
                  )?.key
                }`}
              />
            )}
          </div>
          <div className="mr-auto h-fit pt-5 lg:w-[50vw]">
            <div className="text-xl text-white">
              {movieDetails.data.overview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
