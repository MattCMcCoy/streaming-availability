import Image from 'next/image';
import Link from 'next/link';

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
        route: '/details/[mid]',
        routeParams: { mid: props.data.id }
      })}
    >
      <div className="relative h-96 w-[30vw] overflow-hidden rounded-xl border border-streaminggold md:w-[20vw] lg:w-[14vw]">
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
      </div>
    </Link>
  );
}
