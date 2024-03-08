import Image from 'next/image';
import Link from 'next/link';

import { CircularProgress } from '@nextui-org/react';
import moment from 'moment';
import { $path } from 'next-typesafe-url';
import { env } from '~/env';
import { type Movie } from '~/server/api/models/tmdb/Movie';

interface CardProps {
  data: Movie;
}

export function Card(props: CardProps) {
  return (
    <Link
      href={$path({
        route: '/details/[did]',
        routeParams: { did: props.data.id }
      })}
    >
      <div className="relative border border-streaminggold overflow-hidden w-[75vw] sm:w-[37vw] md:w-[36vw] xl:w-[26vw] 2xl:w-[23vw] h-96 rounded-xl">
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
    </Link>
  );
}
