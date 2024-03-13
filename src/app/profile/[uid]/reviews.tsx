'use client';

import { api } from '~/trpc/react';

import { MovieReview } from './movie-review';

interface ExternalProfileProps {
  userId: string;
}

export function Reviews({ userId }: ExternalProfileProps) {
  const { data: comments, isLoading: commentsIsLoading } =
    api.comment.getCommentsByUserId.useQuery({ userId: userId });

  if (commentsIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            <MovieReview comment={comment} />
          </div>
        );
      })}
    </div>
  );
}
