'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { type Session } from 'next-auth';

import * as Separator from '@radix-ui/react-separator';
import { $path } from 'next-typesafe-url';
import { Drawer, DrawerTrigger } from '~/app/lib/components/drawer';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

import { Review } from './review';
import { ReviewForm } from './review-form';

export function UserReviews({
  mid,
  type,
  session
}: {
  mid: number;
  type: string;
  session: Session | null;
}) {
  const { data: user } = api.user.getUser.useQuery({
    userId: session?.user.id ?? ''
  });
  const router = useRouter();
  const movieDetails = api.tmdb.details.useQuery(mid);
  const comments = api.comment.getCommentsByMovieId.useQuery({
    movieId: mid,
    type: type.toUpperCase()
  });

  if (movieDetails.isLoading) {
    return <div>Loading...</div>;
  }

  if (movieDetails.error) {
    return <div>Error: {movieDetails.error.message}</div>;
  }

  if (!movieDetails.data) {
    router.push('/');
    toast({
      title: 'Movie details not found, try again later.',
      color: 'red'
    });
    return null;
  }

  return (
    <div className="mx-auto mt-5 w-fit items-center">
      <div className=" mb-5 w-[70vw] border-b border-streaminggold text-white">
        <div className="inline-block border-streaminggold pb-3 text-xl hover:text-streamingpurple hover:underline">
          <Link
            href={$path({
              route: '/details/[mid]',
              routeParams: { mid: movieDetails.data.id }
            })}
          >
            {movieDetails.data.title}
          </Link>
        </div>
        <div className="flex flex-row">
          <div className="text-3xl font-semibold">
            {`${type.charAt(0).toUpperCase()}${type.substring(1)}`} Reviews
          </div>
          <Drawer>
            {user?.role === type.toUpperCase() && (
              <DrawerTrigger asChild>
                <div className="ml-auto hover:cursor-pointer hover:text-streamingpurple hover:underline">
                  Add a review
                </div>
              </DrawerTrigger>
            )}
            <ReviewForm movieId={mid} session={session} />
          </Drawer>
        </div>
      </div>
      <div className="mx-auto mb-5 w-[60vw]">
        <div className="mx-auto mt-2 flex flex-col text-white">
          {comments.data?.map((comment, index) => (
            <>
              <Review key={index} comment={comment} session={session} />
              <Separator.Root className="my-8 h-1 w-full bg-white/15" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
