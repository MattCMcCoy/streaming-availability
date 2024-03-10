'use client';

import * as Separator from '@radix-ui/react-separator';
import { api } from '~/trpc/react';

import { Review } from './review';

interface ReviewSectionProps {
  movieId: number;
}

export function ReviewSection({ movieId }: ReviewSectionProps) {
  const comments = api.comment.getCommentsByMovieId.useQuery({
    movieId: movieId
  });

  return (
    <div className="mx-auto mt-2 flex flex-col text-white">
      {comments.data?.map((comment, index) => (
        <>
          <Review key={index} comment={comment} />
          <Separator.Root className="my-8 h-1 w-full bg-white/15" />
        </>
      ))}
    </div>
  );
}
