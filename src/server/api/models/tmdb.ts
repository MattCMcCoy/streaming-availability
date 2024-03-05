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

export interface MovieAvailability {
  id: number;
  results: Record<string, CountryAvailability>;
}

export interface CountryAvailability {
  link: string;
  buy?: ProviderDetail[];
  rent?: ProviderDetail[];
  flatrate?: ProviderDetail[];
}

export interface ProviderDetail {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
