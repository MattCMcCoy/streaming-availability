import { z, type ZodType } from 'zod';

export const MovieDetailsInputSchema = z.number();

interface Genre {
  id: number;
  name: string;
}

const GenreSchema = z.object({
  id: z.number(),
  name: z.string()
}) satisfies ZodType<Genre>;

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

const ProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string()
}) satisfies ZodType<ProductionCompany>;

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string()
}) satisfies ZodType<ProductionCountry>;

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

const SpokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string()
}) satisfies ZodType<SpokenLanguage>;

interface Provider {
  logo_path: string | null;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

const ProviderSchema = z.object({
  logo_path: z.string().nullable(),
  provider_id: z.number(),
  provider_name: z.string(),
  display_priority: z.number()
}) satisfies ZodType<Provider>;

type WatchProviders = {
  results: Record<
    string,
    {
      link: string;
      buy?: Provider[];
      rent?: Provider[];
      flatrate?: Provider[];
    }
  >;
};

const WatchProvidersSchema = z.object({
  results: z.record(
    z.object({
      link: z.string(),
      buy: z.array(ProviderSchema).optional(),
      rent: z.array(ProviderSchema).optional(),
      flatrate: z.array(ProviderSchema).optional()
    })
  )
}) satisfies ZodType<WatchProviders>;

interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

const CollectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable()
}) satisfies ZodType<Collection>;

interface Video {
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }[];
}

const VideoSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      iso_639_1: z.string(),
      iso_3166_1: z.string(),
      key: z.string(),
      name: z.string(),
      site: z.string(),
      size: z.number(),
      type: z.string()
    })
  )
}) satisfies ZodType<Video>;

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection?: Collection | null; // Could be another interface representing a collection
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  'watch/providers'?: WatchProviders | null;
  videos: Video | null;
}

export const MovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: CollectionSchema.nullable().optional(),
  budget: z.number(),
  genres: z.array(GenreSchema),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(ProductionCompanySchema),
  production_countries: z.array(ProductionCountrySchema),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(SpokenLanguageSchema),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  'watch/providers': WatchProvidersSchema.nullable().optional(),
  videos: VideoSchema.nullable()
}) satisfies ZodType<MovieDetail>;
