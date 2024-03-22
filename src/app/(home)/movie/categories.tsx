'use client';

import React from 'react';

import { type Session } from 'next-auth';

import moment from 'moment';
import { ScrollToTopButton } from '~/app/lib/components/scroll-top';
import { type Movie } from '~/server/api/models/tmdb/Movie';
import { api } from '~/trpc/react';

import { MovieCarousel } from './carousel';

export function Categories({ session }: { session: Session | null }) {
  const { data: starredMovieIds } = api.star.getStarsByUserId.useQuery({
    userId: session?.user.id ?? ''
  });
  const { data: starredMovies } = api.tmdb.getStarredMovieCards.useQuery(
    starredMovieIds?.map((s) => s.mid) ?? []
  );
  const { data: trendingMovies } = api.tmdb.trending.useQuery({});
  const { data: newMovies } = api.tmdb.discover.useQuery({
    sort_by: 'primary_release_date.desc',
    watch_region: 'US',
    region: 'US',
    page: 1,
    language: 'en-US',
    vote_count_gte: 50,
    primary_release_date_lte: moment().format('YYYY-MM-DD'),
    release_date_lte: moment().format('YYYY-MM-DD'),
    with_watch_monetization_types: 'flatrate'
  });

  const { data: popularMovies } = api.tmdb.discover.useQuery({
    language: 'en-US',
    page: 1,
    region: 'US',
    sort_by: 'popularity.desc',
    watch_region: 'US',
    with_watch_monetization_types: 'flatrate'
  });

  return (
    <>
      <Category title="Your Starred Movies" data={starredMovies ?? []} />
      <Category title="Trending" data={trendingMovies ?? []} />
      <Category title="Popular" data={popularMovies ?? []} />
      <Category title="New" data={newMovies ?? []} />
      <ScrollToTopButton />
    </>
  );
}

interface CategoryProps {
  title: string;
  data: Movie[];
  needsAuth?: boolean;
}

function Category(props: CategoryProps) {
  return (
    <div className="items-center justify-center self-center align-middle font-sans text-3xl font-bold text-white">
      {props.title}
      <MovieCarousel data={props.data} needsAuth={props.needsAuth} />
    </div>
  );
}
