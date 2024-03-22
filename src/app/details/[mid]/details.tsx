'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { type Session } from 'next-auth';

import { Chip } from '@nextui-org/react';
import { Link1Icon } from '@radix-ui/react-icons';
import { Star } from 'lucide-react';
import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

import { ServerImage } from '../../lib/server-image';

export default function MovieDetails({
  mid,
  session
}: {
  mid: number;
  session: Session | null;
}) {
  const router = useRouter();
  const getStarsUtils = api.useUtils().star.getStarsByMovieId;
  const movieDetails = api.tmdb.details.useQuery(mid);
  const { mutate: starMovie } = api.star.starMovie.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Movie starred!',
        color: 'green'
      });

      await getStarsUtils.refetch({ movieId: mid });
    }
  });
  const { mutate: unstarMovie } = api.star.unstarMovie.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Movie unstarred!',
        color: 'green'
      });

      await getStarsUtils.refetch({ movieId: mid });
    }
  });

  const { data: stars } = api.star.getStarsByMovieId.useQuery({ movieId: mid });

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
    <div className="mx-auto flex h-[90vh] w-[98vw] items-center lg:mx-0 lg:w-[60vw] xl:flex-row">
      <div className="invisible relative mt-5 h-[60vh] rounded-lg shadow-lg shadow-streamingpurple lg:visible lg:ml-5 lg:mr-5 lg:w-[380px]">
        <ServerImage
          src={
            movieDetails.data.poster_path ??
            movieDetails.data.backdrop_path ??
            ''
          }
        />
      </div>
      <div className="ml-5 h-fit w-[90vw] lg:ml-auto lg:w-[30vw]">
        <div className="border-b border-streaminggold lg:w-[60vw]">
          {stars?.find((star) => star.staredById === session?.user.id) ? (
            <Star
              onClick={() =>
                unstarMovie({
                  movieId: mid,
                  userId: session?.user.id ?? ''
                })
              }
              className="float-right h-10 w-6  text-streaminggold hover:text-white/20"
            />
          ) : (
            <Star
              onClick={() =>
                starMovie({
                  movieId: mid,
                  userId: session?.user.id ?? ''
                })
              }
              className="float-right h-10 w-6 text-white/20 hover:text-streaminggold"
            />
          )}
          <div className="mt-10 text-4xl font-bold text-white">
            {movieDetails.data.title}
          </div>
          <div className="right-28 float-right flex flex-row items-center justify-end self-end text-white">
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
        </div>

        <div className="mr-auto mt-2 w-[90vw] lg:w-[60vw]">
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
