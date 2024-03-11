'use client';

import { type Movie } from '~/server/api/models/tmdb/Movie';
import { api } from '~/trpc/react';

import { MovieCarousel } from './carousel';

export function Categories() {
  const { data: trendingMovies } = api.tmdb.trending.useQuery({});
  const { data: nowPlayingMovies } = api.tmdb.nowplaying.useQuery({});
  const { data: popularMovies } = api.tmdb.popular.useQuery({});
  const { data: topRatedMovies } = api.tmdb.topRated.useQuery({});

  return (
    <>
      <Category title="Now Playing" data={nowPlayingMovies ?? []} />

      <Category title="Trending" data={trendingMovies ?? []} />
      <Category title="Popular" data={popularMovies ?? []} />
      <Category title="Top Rated Of All Time" data={topRatedMovies ?? []} />
    </>
  );
}

interface CategoryProps {
  title: string;
  data: Movie[];
}

function Category(props: CategoryProps) {
  return (
    <div className="items-center justify-center self-center align-middle font-sans text-3xl font-bold text-white">
      {props.title}
      <MovieCarousel data={props.data} />
    </div>
  );
}
