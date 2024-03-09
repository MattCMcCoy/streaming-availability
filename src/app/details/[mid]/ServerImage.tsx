import Image from 'next/image';

import { env } from '~/env';

export function ServerImage({ src }: { src: string }) {
  return (
    <Image
      src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${src}`}
      draggable={false}
      alt=""
      fill
      sizes="100% 100%"
      aria-label="movie poster"
      className="rounded-lg"
    />
  );
}
