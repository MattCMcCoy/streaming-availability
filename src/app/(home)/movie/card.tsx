import Image from 'next/image';
import Link from 'next/link';

import { CircularProgress } from '@nextui-org/react';
import { $path } from 'next-typesafe-url';
import { env } from '~/env';
import { type Movie } from '~/server/api/models/tmdb/Movie';
import { api } from '~/trpc/react';

interface CardProps {
  data: Movie;
}

export function Card(props: CardProps) {
  const { data: watchProviders } = api.tmdb.watchProviders.useQuery(
    props.data.id
  );

  return (
    <Link
      href={$path({
        route: '/details/[mid]',
        routeParams: { mid: props.data.id }
      })}
    >
      <div className="relative h-96 w-[45vw] overflow-hidden rounded-xl border border-streaminggold md:w-[28vw] lg:w-[21.5vw] xl:w-[18vw] 2xl:w-[14vw]">
        {props.data.poster_path ?? props.data.backdrop_path ? (
          <Image
            src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${props.data.poster_path ?? props.data.backdrop_path}`}
            draggable={false}
            alt=""
            fill
            sizes="100% 100%"
            aria-label="movie poster"
            className="rounded-lg"
          />
        ) : (
          <div className="absolute left-5 top-10 w-fit text-wrap text-center text-white">
            {props.data.title}
          </div>
        )}
        <div className="group absolute h-full w-full rounded-lg hover:bg-black/60">
          <div className="invisible flex w-[30vw] flex-col flex-wrap space-y-1 pl-1 pt-2 group-hover:visible md:w-[20vw] lg:w-[14vw]">
            {watchProviders?.results.US?.flatrate?.map((provider, index) => {
              return (
                <Image
                  key={index}
                  src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${provider.logo_path}`}
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              );
            })}
            <div className="absolute bottom-5 right-5 z-10 pl-2 pt-2">
              <CircularProgress
                classNames={{
                  svg: 'w-16 h-16 drop-shadow-md',
                  indicator: 'stroke-streamingpurple',
                  track: 'stroke-white/10',
                  value: 'text-lg text-white'
                }}
                value={props.data.vote_average * 10}
                strokeWidth={3}
                showValueLabel={true}
                aria-label="movie rating"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
