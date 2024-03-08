'use client';

import { MovieCategory } from '~/components/home/MovieCategory';
import { api } from '~/utils/api';

import { AuthShowcase } from '../components/auth/AuthShowcase';

export default function Home() {
  const { data: trendingMovies } = api.tmdb.trending.useQuery({});
  const { data: nowPlayingMovies } = api.tmdb.nowplaying.useQuery({});
  const { data: popularMovies } = api.tmdb.popular.useQuery({});
  const { data: topRatedMovies } = api.tmdb.topRated.useQuery({});
  return (
    <div id="home">
      <div className="flex flex-col items-end gap-2 pr-10">
        <AuthShowcase />
      </div>
      <main className="flex max-h-screen flex-col">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <h1 className="inline-block bg-gradient-to-r from-streamingpurple via-streaminggold to-white bg-clip-text text-center text-5xl font-extrabold text-transparent">
            Popcorn Streaming
          </h1>
          <div className="flex flex-grow flex-col space-y-5 pb-20">
            <MovieCategory title="Now Playing" data={nowPlayingMovies ?? []} />

            <MovieCategory title="Trending" data={trendingMovies ?? []} />
            <MovieCategory title="Popular" data={popularMovies ?? []} />
            <MovieCategory
              title="Top Rated Of All Time"
              data={topRatedMovies ?? []}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

//             <MovieCategory title="Popular With Friends" data={[]} />

//          <MovieCategory title="Your Favorites" data={[]} />
