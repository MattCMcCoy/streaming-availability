import Image from 'next/image';

import { AuthShowcase } from '~/auth/AuthShowcase';
import { TopNav } from '~/components/topnav';
import { env } from '~/env';
import { useSafeParams } from '~/navigation';
import { api } from '~/utils/api';

export default function MovieDetails() {
  const { did } = useSafeParams('details');

  const { data, isLoading, isError } = api.tmdb.details.useQuery(did);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }
  return (
    <>
      <div className="flex">
        <TopNav />
        <div className="ml-auto mr-10">
          <AuthShowcase />
        </div>
      </div>
      <div className="flex flex-1 border h-[90vh] items-center">
        <div className="absolute top-40 left-10 w-[20vw] h-[40vh]">
          {data.poster_path ? (
            <Image
              src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${data.poster_path}`}
              alt=""
              fill
              sizes="100% 100%"
              aria-label="movie poster"
              className="rounded-lg"
            />
          ) : data.backdrop_path ? (
            <Image
              src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${data.backdrop_path}`}
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
      </div>
    </>
  );
}
