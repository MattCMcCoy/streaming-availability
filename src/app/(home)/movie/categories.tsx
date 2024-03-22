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
  const { data: starredMovies, isLoading: starredMoviesIsLoading } =
    api.tmdb.getStarredMovieCards.useQuery(
      starredMovieIds?.map((s) => s.mid) ?? []
    );
  const { data: trendingMovies, isLoading: trendingMoviesIsLoading } =
    api.tmdb.trending.useQuery({});
  const { data: newMovies, isLoading: newMoviesIsLoading } =
    api.tmdb.discover.useQuery({
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

  const { data: popularMovies, isLoading: popularMoviesIsLoading } =
    api.tmdb.discover.useQuery({
      language: 'en-US',
      page: 1,
      region: 'US',
      sort_by: 'popularity.desc',
      watch_region: 'US',
      with_watch_monetization_types: 'flatrate'
    });

  return (
    <>
      <Category
        title="Your Starred Movies"
        data={starredMovies ?? null}
        session={session}
        needsAuth={true}
        isLoading={starredMoviesIsLoading}
      />
      <Category
        title="Trending"
        data={trendingMovies}
        isLoading={trendingMoviesIsLoading}
      />
      <Category
        title="Popular"
        data={popularMovies}
        isLoading={popularMoviesIsLoading}
      />
      <Category title="New" data={newMovies} isLoading={newMoviesIsLoading} />
      <ScrollToTopButton />
    </>
  );
}

interface CategoryProps {
  title: string;
  data: Movie[] | null | undefined;
  needsAuth?: boolean;
  session?: Session | null;
  isLoading?: boolean;
}

function Category(props: CategoryProps) {
  return (
    <div className="font-sans">
      <div className="self-start border-b border-streaminggold text-3xl font-bold text-white">
        {props.title}
      </div>
      {props.data ?? props.isLoading ? (
        <MovieCarousel data={props.data ?? []} />
      ) : props.session?.user ? (
        <div className="text-lg text-white/20">
          You havent starred any movies
        </div>
      ) : (
        <div className="text-lg text-white/20">Sign in to star movies</div>
      )}
    </div>
  );
}
