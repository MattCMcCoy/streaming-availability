import moment from 'moment';
import { env } from '~/env';
import { buildURL } from '~/utils/api';

import {
  DiscoverMovieInputModel,
  type Response,
  SpecialDiscoverMovieInputModel,
  ZodMovieOutputModel
} from '../models/tmdb';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const tmdbRouter = createTRPCRouter({
  discover: publicProcedure
    .input(DiscoverMovieInputModel)
    .output(ZodMovieOutputModel)
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
        vote_count_gte: input.vote_count_gte,
        vote_count_lte: input.vote_count_lte,
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

      const body = (await res.json()) as Response;

      return body.results;
    }),
  nowplaying: publicProcedure
    .input(SpecialDiscoverMovieInputModel)
    .output(ZodMovieOutputModel)
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

      const body = (await res.json()) as Response;

      return body.results;
    }),

  popular: publicProcedure
    .input(SpecialDiscoverMovieInputModel)
    .output(ZodMovieOutputModel)
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular`, {
        api_key: env.TMDB_API_KEY,
        language: input.language,
        page: input.page,
        region: input.region
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as Response;

      return body.results;
    }),

  topRated: publicProcedure
    .input(SpecialDiscoverMovieInputModel)
    .output(ZodMovieOutputModel)
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/movie/top_rated`, {
        api_key: env.TMDB_API_KEY,
        language: input.language,
        page: input.page,
        region: input.region
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as Response;

      return body.results;
    }),

  upcoming: publicProcedure
    .input(SpecialDiscoverMovieInputModel)
    .output(ZodMovieOutputModel)
    .query(async ({ input }) => {
      const url = buildURL(`${env.NEXT_PUBLIC_TMDB_API_URL}/movie/upcoming`, {
        api_key: env.TMDB_API_KEY,
        language: input.language,
        page: input.page,
        region: input.region
      });

      const res = await fetch(url, { method: 'Get' });

      const body = (await res.json()) as Response;

      return body.results;
    })
});
