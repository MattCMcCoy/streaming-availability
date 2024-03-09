'use client';

import { api } from '~/trpc/react';

import { MovieCategory } from './MovieCategory';

export function MovieCategories() {
  const { data: trendingMovies } = api.tmdb.trending.useQuery({});
  const { data: nowPlayingMovies } = api.tmdb.nowplaying.useQuery({});
  const { data: popularMovies } = api.tmdb.popular.useQuery({});
  const { data: topRatedMovies } = api.tmdb.topRated.useQuery({});

  return (
    <>
      <MovieCategory title="Now Playing" data={nowPlayingMovies ?? []} />

      <MovieCategory title="Trending" data={trendingMovies ?? []} />
      <MovieCategory title="Popular" data={popularMovies ?? []} />
      <MovieCategory
        title="Top Rated Of All Time"
        data={topRatedMovies ?? []}
      />
    </>
  );
}
