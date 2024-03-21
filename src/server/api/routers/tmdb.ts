import moment from 'moment';
import { z } from 'zod';
import { env } from '~/env';

import {
  type MovieAvailability,
  MovieAvailabilitySchema,
  WatchProvidersInputSchema
} from '../models/tmdb/Availability';
import {
  type MovieDetail,
  MovieDetailsInputSchema,
  MovieDetailsSchema
} from '../models/tmdb/Details';
import {
  type DiscoverMovie,
  DiscoverMovieInputSchema,
  type Movie,
  MovieSchema,
  SpecialDiscoverMovieInputSchema
} from '../models/tmdb/Movie';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { buildURL } from '../utils/utils';

export const tmdbRouter = createTRPCRouter({
  discover: publicProcedure
    .input(DiscoverMovieInputSchema)
    .output(MovieSchema)
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie`, {
        api_key: env.TMDB_API_KEY,
        certification: input.certification,
        'certification.gte': input.certification_gte,
        'certification.lte': input.certification_lte,
        certification_country: input.certification_country,
        include_adult: `${input.include_adult}`,
        include_video: `${input.include_video}`,
        language: input.language,
        page: input.page,
        primary_release_year: input.primary_release_year,
        'primary_release_date.gte':
          input.primary_release_date_gte &&
          moment(input.primary_release_date_gte).format('YYYY-MM-DD'),
        'primary_release_date.lte':
          input.primary_release_date_lte &&
          moment(input.primary_release_date_lte).format('YYYY-MM-DD'),
        'release_date.gte':
          input.release_date_gte &&
          moment(input.release_date_gte).format('YYYY-MM-DD'),
        'release_date.lte':
          input.release_date_lte &&
          moment(input.release_date_lte).format('YYYY-MM-DD'),
        region: input.region,
        sort_by: input.sort_by,
        vote_average_gte: input.vote_average_gte,
        vote_average_lte: input.vote_average_lte,
        'vote_count.gte': input.vote_count_gte,
        'vote_count.lte': input.vote_count_lte,
        with_cast: input.with_cast,
        with_companies: input.with_companies,
        with_crew: input.with_crew,
        with_genres: input.with_genres,
        with_keywords: input.with_keywords,
        with_original_language: input.with_original_language,
        with_people: input.with_people,
        with_release_type: input.with_release_type,
        with_runtime_gte: input.with_runtime_gte,
        with_runtime_lte: input.with_runtime_lte,
        with_watch_monetization_types: input.with_watch_monetization_types,
        with_watch_providers: input.with_watch_providers,
        watch_region: input.watch_region,
        with_origin_country: input.with_origin_country,
        without_companies: input.without_companies,
        without_genres: input.without_genres,
        without_keywords: input.without_keywords,
        without_watch_providers: input.without_watch_providers,
        year: input.year
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as DiscoverMovie;

      return body.results;
    }),

  nowplaying: publicProcedure
    .input(SpecialDiscoverMovieInputSchema)
    .output(MovieSchema)
    .query(async ({ input }) => {
      const url = buildURL(
        `${env.NEXT_PUBLIC_TMDB_API_URL}/movie/now_playing`,
        {
          api_key: env.TMDB_API_KEY,
          language: input.language,
          page: input.page,
          region: input.region
        }
      );

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as DiscoverMovie;

      return body.results;
    }),

  popular: publicProcedure
    .input(SpecialDiscoverMovieInputSchema)
    .output(MovieSchema)
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular`, {
        api_key: env.TMDB_API_KEY,
        language: input.language,
        page: input.page,
        region: input.region
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as DiscoverMovie;

      return body.results;
    }),

  topRated: publicProcedure
    .input(SpecialDiscoverMovieInputSchema)
    .output(MovieSchema)
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/movie/top_rated`, {
        api_key: env.TMDB_API_KEY,
        language: input.language,
        page: input.page,
        region: input.region
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as DiscoverMovie;

      return body.results;
    }),

  trending: publicProcedure
    .input(SpecialDiscoverMovieInputSchema)
    .output(MovieSchema)
    .query(async ({ input }) => {
      const url = buildURL(
        `${env.NEXT_PUBLIC_TMDB_API_URL}/trending/movie/day`,
        {
          api_key: env.TMDB_API_KEY,
          language: input.language,
          page: input.page,
          region: input.region
        }
      );

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as DiscoverMovie;

      return body.results;
    }),

  watchProviders: publicProcedure
    .input(WatchProvidersInputSchema)
    .output(MovieAvailabilitySchema)
    .query(async ({ input }) => {
      const url = buildURL(
        `${env.NEXT_PUBLIC_TMDB_API_URL}/movie/${input}/watch/providers`,
        {
          api_key: env.TMDB_API_KEY
        }
      );

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as MovieAvailability;

      return body;
    }),

  details: publicProcedure
    .input(MovieDetailsInputSchema)
    .output(MovieDetailsSchema.nullable())
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/movie/${input}`, {
        api_key: env.TMDB_API_KEY,
        append_to_response: 'watch%2Fproviders,videos,release_dates'
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as MovieDetail;

      const isMovieDetails = MovieDetailsSchema.safeParse(body);

      if (isMovieDetails.success) {
        return body;
      }

      return null;
    }),

  getStarredMovieCards: protectedProcedure
    .input(z.array(MovieDetailsInputSchema))
    .query(async ({ input }) => {
      const movies = await Promise.all(
        input.map(async (mid) => {
          const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/movie/${mid}`, {
            api_key: env.TMDB_API_KEY
          });

          const res = await fetch(url, { method: 'Get' });

          const body = (await res.json()) as MovieDetail;

          return {
            id: body.id,
            adult: body.adult,
            backdrop_path: body.backdrop_path,
            genre_ids: body.genres.map((genre) => genre.id),
            original_language: body.original_language,
            original_title: body.original_title,
            overview: body.overview,
            popularity: body.popularity,
            poster_path: body.poster_path,
            release_date: body.release_date,
            title: body.title,
            video: body.video,
            vote_average: body.vote_average,
            vote_count: body.vote_count
          } as Movie;
        })
      );

      const isMovieSchema = MovieSchema.safeParse(movies);

      if (isMovieSchema.success) {
        return isMovieSchema.data;
      }

      return null;
    }),

  search: publicProcedure
    .input(z.string())
    .output(MovieSchema)
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/search/movie`, {
        api_key: env.TMDB_API_KEY,
        query: input
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as DiscoverMovie;

      return body.results;
    })
});
