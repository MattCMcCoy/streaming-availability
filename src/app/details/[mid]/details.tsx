'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Chip } from '@nextui-org/react';
import { Link1Icon } from '@radix-ui/react-icons';
import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

import { ServerImage } from '../../lib/server-image';

export default function MovieDetails({ mid }: { mid: number }) {
  const router = useRouter();
  const movieDetails = api.tmdb.details.useQuery(mid);

  if (movieDetails.isLoading) {
    return <div>Loading...</div>;
  }

  if (movieDetails.error) {
    router.push('/');
    toast({
      title: 'Movie details not found, try again later.',
      description: movieDetails.error.message,
      color: 'red'
    });
    return null;
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
    <div className="flex h-[90vh] w-[60vw] items-center xl:flex-row">
      <div className="relative ml-5 mr-5 mt-5 h-[60vh] rounded-lg shadow-lg shadow-streamingpurple lg:w-[380px]">
        <ServerImage
          src={
            movieDetails.data.poster_path ??
            movieDetails.data.backdrop_path ??
            ''
          }
        />
      </div>
      <div className="ml-auto h-fit w-[90vw] lg:w-[30vw]">
        <div className="absolute right-28 float-right flex flex-row items-center justify-end self-end text-white">
          <Link
            className=" hover:text-streamingpurple hover:underline"
            href={$path({
              route: '/details/[mid]/reviews',
              routeParams: { mid: movieDetails.data.id }
            })}
          >
            User reviews
          </Link>
          {movieDetails.data.homepage && (
            <>
              <Link1Icon className="mx-2" />
              <Link
                className="hover:text-streamingpurple hover:underline"
                href={movieDetails.data.homepage}
                target="_blank"
              >
                Homepage
              </Link>
            </>
          )}
        </div>
        <div className="mt-10 w-[60vw] border-b border-streaminggold text-4xl font-bold text-white">
          {movieDetails.data.title}
        </div>
        <div className="mr-auto mt-2 w-[60vw]">
          <div className="text-xl text-white">
            {`${moment(movieDetails.data.release_date).format('YYYY')} •
            ${movieDetails.data.runtime} mins • ${movieDetails.data.release_dates?.results?.find((r) => r.iso_3166_1 == 'US')?.release_dates.find((rd) => rd.certification != '')?.certification ?? 'NR'}`}
          </div>
          <div className="mt-2 space-x-2 text-xl text-white">
            {movieDetails.data.genres.map((genre, index) => (
              <Chip color="primary" className="mt-1 outline" key={index}>
                {genre.name}
              </Chip>
            ))}
          </div>
          <div className="flex flex-row">
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
            <div className="text-2xl font-bold text-white">Overview:</div>
            <div className="text-xl text-white">
              {movieDetails.data.overview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
