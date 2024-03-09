import { type Movie } from '~/server/api/models/tmdb/Movie';

import { MovieCarousel } from './MovieCarousel';

export interface MovieCategoryProps {
  title: string;
  data: Movie[];
}

export function MovieCategory(props: MovieCategoryProps) {
  return (
    <div className="items-center justify-center self-center align-middle font-sans text-3xl font-bold text-white">
      {props.title}
      <MovieCarousel data={props.data} />
    </div>
  );
}
