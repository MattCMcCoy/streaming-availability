import Image from 'next/image';

import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { Nav } from '~/app/(nav)/navbar';
import { Button } from '~/app/lib/components/button';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';

import { FollowButton } from '../follow-button';
import { Reviews } from './reviews';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  const session = await getServerAuthSession();
  const user = await api.user.getUser.query({
    userId: routeParams.uid
  });
  const userFollowers = await api.follow.followers.query({
    userId: routeParams.uid
  });
  const userFollowing = await api.follow.following.query({
    userId: routeParams.uid
  });
  const userReviews = await api.comment.getCommentsByUserId.query({
    userId: routeParams.uid
  });

  return (
    <div>
      <div>
        <Nav />
        <div className="mt-5 flex flex-row">
          <div className="ml-48">
            <div className="mx-auto flex w-[60vw] flex-row">
              <div className="flex flex-col">
                {user?.image && (
                  <Image
                    src={user?.image}
                    alt=""
                    width={90}
                    height={90}
                    className="mx-auto self-baseline rounded-full"
                  />
                )}
                <Button
                  className="mr-2 mt-3 w-full bg-transparent text-white"
                  variant="outline"
                  disabled
                >
                  Following: {userFollowing?.length}
                </Button>
                <Button
                  className="mt-3 w-full bg-transparent text-white"
                  variant="outline"
                  disabled
                >
                  Followers: {userFollowers?.length}
                </Button>
                <Button
                  className="mt-3 w-full bg-transparent text-white"
                  variant="outline"
                  disabled
                >
                  Reviews: {userReviews?.length}
                </Button>
              </div>
              <div className="ml-5 self-center">
                <h1 className="flex w-[60vw] flex-row border-b border-streaminggold text-3xl font-bold text-white">
                  {user?.name}
                  <div className="mb-1 ml-auto mr-3">
                    <FollowButton
                      followId={routeParams.uid}
                      userId={session?.user.id ?? ''}
                    />
                  </div>
                </h1>
                <Reviews userId={routeParams.uid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withParamValidation(Page, Route);
