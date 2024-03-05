export interface TitlesList {
  id: number;
  title: string;
  year: number;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
  type: string;
}

export interface AutoCompleteSearch {
  name: string;
  relevance: number;
  type: string;
  id: number;
  year: number;
  result_type: string;
  tmdb_id: number;
  tmdb_type: string;
  image_url: string;
}
