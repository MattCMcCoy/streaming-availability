import { z, type ZodType } from 'zod';

export interface Response {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const ZodMovieOutputModel = z.array(
  z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number()
  })
) satisfies ZodType<Movie[]>;

export const DiscoverMovieInputModel = z.object({
  certification: z.string().optional().nullable(),
  certification_gte: z.string().optional().nullable(),
  certification_lte: z.string().optional().nullable(),
  certification_country: z.string().optional().nullable(),
  include_adult: z.boolean().optional().default(false),
  include_video: z.boolean().optional().default(false),
  language: z.string().optional().nullable(),
  page: z.number().optional().default(1),
  primary_release_year: z.number().optional().nullable(),
  primary_release_date_gte: z.date().optional().nullable(),
  primary_release_date_lte: z.date().optional().nullable(),
  release_date_gte: z.date().optional().nullable(),
  release_date_lte: z.date().optional().nullable(),
  region: z.string().optional().nullable(),
  sort_by: z
    .enum([
      'original_title.asc',
      'original_title.desc',
      'primary_release_date.asc',
      'primary_release_date.desc',
      'vote_average.asc',
      'vote_average.desc',
      'vote_count.asc',
      'vote_count.desc',
      'title.asc',
      'title.desc',
      'popularity.asc',
      'popularity.desc',
      'revenue.asc',
      'revenue.desc'
    ])
    .optional()
    .nullable()
    .default('popularity.desc'),
  vote_average_gte: z.number().optional().nullable(),
  vote_average_lte: z.number().optional().nullable(),
  vote_count_gte: z.number().optional().nullable(),
  vote_count_lte: z.number().optional().nullable(),
  with_cast: z.string().optional().nullable(),
  with_companies: z.string().optional().nullable(),
  with_crew: z.string().optional().nullable(),
  with_genres: z.string().optional().nullable(),
  with_keywords: z.string().optional().nullable(),
  with_original_language: z.string().optional().nullable(),
  with_people: z.string().optional().nullable(),
  with_release_type: z.string().optional().nullable(),
  with_runtime_gte: z.number().optional().nullable(),
  with_runtime_lte: z.number().optional().nullable(),
  with_watch_providers: z.string().optional().nullable(),
  watch_region: z.string().optional().nullable(),
  with_origin_country: z.string().optional().nullable(),
  without_companies: z.string().optional().nullable(),
  without_genres: z.string().optional().nullable(),
  without_keywords: z.string().optional().nullable(),
  without_watch_providers: z.string().optional().nullable(),
  year: z.number().optional().nullable()
});

export const SpecialDiscoverMovieInputModel = z.object({
  language: z.string().optional().nullable(),
  page: z.number().optional().nullable(),
  region: z.string().optional().nullable()
});
