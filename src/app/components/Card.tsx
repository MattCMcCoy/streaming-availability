import Image from 'next/image';
import Link from 'next/link';

import { CircularProgress } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/react';
import moment from 'moment';
import { env } from '~/env';
import { api } from '~/trpc/react';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface CardProps {
  data: Movie;
}

export function Card(props: CardProps) {
  const { data: watchProviders } = api.tmdb.watchProviders.useQuery(
    props.data.id
  );

  return (
    <Link href={`/details/${props.data.id}`}>
      <div className="relative h-96 w-[72vw] overflow-hidden rounded-xl border border-streaminggold sm:w-[36vw] md:w-[34vw] lg:w-[36vw] xl:w-[25.8vw] 2xl:w-[22.8vw]">
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
          <></>
        )}
        <div className="w-[100vw]">
          <div className="absolute bottom-5 z-20 mt-auto flex flex-col pl-5  font-sans">
            <div className="w-80 font-sans text-3xl font-bold text-white">
              {props.data.title}
            </div>
            <div className="mt-[-8px] text-lg text-white">
              {moment(props.data.release_date).format('MMMM Do YYYY')}
            </div>
          </div>
          <div className="absolute bottom-5 right-5 z-10 pl-2 pt-2">
            <CircularProgress
              classNames={{
                svg: 'w-16 h-16 drop-shadow-md',
                indicator: 'stroke-green-500',
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
        <div className="absolute h-full w-full rounded-lg bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_40.82%,rgba(0,0,0,0.00)_81.44%)]" />
      </div>
      <div className="flex w-[72vw] flex-row flex-wrap space-x-1 space-y-1 pt-2 sm:w-[36vw] md:w-[34vw] lg:w-[36vw] xl:w-[25.8vw] 2xl:w-[22.8vw]">
        {watchProviders?.results.US?.flatrate?.map((provider, index) => {
          return (
            <Tooltip
              key={index}
              content={provider.provider_name}
              className="text-white dark"
            >
              <Image
                src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${provider.logo_path}`}
                alt=""
                width={50}
                height={50}
                className="rounded-lg"
              />
            </Tooltip>
          );
        })}
      </div>
    </Link>
  );
}
