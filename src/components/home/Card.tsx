import Image from 'next/image';
import Link from 'next/link';

import { CircularProgress } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/react';
import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { env } from '~/env';
import { type Movie } from '~/server/api/models/tmdb/Movie';
import { api } from '~/utils/api';

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
        route: '/details/[did]',
        routeParams: { did: props.data.id }
      })}
    >
      <div className="relative border border-streaminggold overflow-hidden w-[72vw] sm:w-[36vw] md:w-[34vw] lg:w-[36vw] xl:w-[25.8vw] 2xl:w-[22.8vw] h-96 rounded-xl">
        {props.data.poster_path ?? props.data.backdrop_path ? (
          <Image
            src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${props.data.backdrop_path ?? props.data.poster_path}`}
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
          <div className="absolute mt-auto flex bottom-5 z-20 pl-5 font-sans  flex-col">
            <div className="text-3xl text-white font-bold font-sans w-80">
              {props.data.title}
            </div>
            <div className="text-white text-lg mt-[-8px]">
              {moment(props.data.release_date).format('MMMM Do YYYY')}
            </div>
          </div>
          <div className="pl-2 pt-2">
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
        <div className="absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_40.82%,rgba(0,0,0,0.00)_81.44%)] rounded-lg" />
      </div>
      <div className="flex flex-row pt-2 space-x-1 space-y-1 flex-wrap w-[72vw] sm:w-[36vw] md:w-[34vw] lg:w-[36vw] xl:w-[25.8vw] 2xl:w-[22.8vw]">
        {watchProviders?.results.US?.flatrate?.map((provider, index) => {
          return (
            <Tooltip
              key={index}
              content={provider.provider_name}
              className="dark text-white"
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
