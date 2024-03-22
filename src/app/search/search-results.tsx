'use client';

import { api } from '~/trpc/react';

import { Card } from '../(home)/movie/card';

export function SearchResults({ title }: { title: string }) {
  const { data } = api.tmdb.search.useQuery(title);

  return (
    <div className="mx-auto mb-10  mt-10 w-[90vw]  overflow-hidden">
      <div className="text-md mb-5 text-white/20">
        Showing Results for {`"${title}"`}...
      </div>
      <div className="flex flex-row flex-wrap">
        {data?.map((movie) => (
          <div key={movie.id} className="pb-2 pr-2">
            <Card data={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
