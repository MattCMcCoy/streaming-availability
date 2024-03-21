'use client';

import { api } from '~/trpc/react';

import { Card } from '../(home)/movie/card';

export function SearchResults({ title }: { title: string }) {
  const { data } = api.tmdb.search.useQuery(title);

  return (
    <div className="mx-auto mb-10  mt-10 flex w-[90vw] flex-row flex-wrap overflow-hidden">
      {data?.map((movie) => (
        <div key={movie.id} className="pb-2 pr-2">
          <Card data={movie} />
        </div>
      ))}
    </div>
  );
}
