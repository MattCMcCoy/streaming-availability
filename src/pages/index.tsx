'use client';

import moment from 'moment';
import { GiPopcorn } from 'react-icons/gi';
import { MovieCategory } from '~/components/movie/category';
import { api } from '~/utils/api';

import { AuthShowcase } from '../auth/AuthShowcase';

export default function Home() {
  const { data: comingSoon } = api.tmdb.discover.useQuery({
    primary_release_date_gte: new Date(moment(Date.now()).format('YYYY-MM-DD')),
    sort_by: 'primary_release_date.asc'
  });
  const { data: nowPlaying } = api.tmdb.nowplaying.useQuery({});
  const { data: popularMovies } = api.tmdb.popular.useQuery({});
  const { data: topRatedMovies } = api.tmdb.topRated.useQuery({});
  return (
    <div id="home">
      <div className=" flex flex-col items-end gap-2 pr-10">
        <AuthShowcase />
      </div>
      <main className="flex max-h-screen flex-col">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <GiPopcorn size={80} color="white" />
          <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-streamingpurple via-[#c6c0ca] to-white inline-block text-transparent bg-clip-text">
            Popcorn Streaming
          </h1>
          <div className="flex flex-grow flex-col space-y-5 pb-20">
            <MovieCategory title="Now Playing" data={nowPlaying ?? []} />
            <MovieCategory title="Whats Popular With Friends" data={[]} />
            <MovieCategory title="Up and Coming" data={comingSoon ?? []} />
            <MovieCategory title="Whats Popular" data={popularMovies ?? []} />
            <MovieCategory
              title="Top Rated Of All Time"
              data={topRatedMovies ?? []}
            />
            <MovieCategory title="Your Favorites" data={[]} />
          </div>
        </div>
      </main>
    </div>
  );
}
