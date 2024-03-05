import { type Movie } from '~/server/api/models/tmdb';

import { MovieCarousel } from './carousel';

export interface MovieCategoryProps {
  title: string;
  data: Movie[];
}

export function MovieCategory(props: MovieCategoryProps) {
  return (
    <div className="text-white text-3xl font-bold font-sans items-center justify-center align-middle self-center">
      {props.title}
      <MovieCarousel data={props.data} />
    </div>
  );
}
