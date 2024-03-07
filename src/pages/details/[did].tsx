'use client';

import Image from 'next/image';

import { useSession } from 'next-auth/react';

import { Link, User } from '@nextui-org/react';
import { type DynamicRoute } from 'next-typesafe-url';
import { useRouteParams } from 'next-typesafe-url/pages';
import { z } from 'zod';
import { AuthShowcase } from '~/auth/AuthShowcase';
import { TopNav } from '~/components/topnav';
import { env } from '~/env';
import { api } from '~/utils/api';

const Route = {
  routeParams: z.object({
    did: z.number()
  })
} satisfies DynamicRoute;

export type RouteType = typeof Route;

export default function MovieDetails() {
  const { data: sessionData } = useSession();
  const routeParams = useRouteParams(Route.routeParams);

  const { data, isLoading, isError, error } = api.tmdb.details.useQuery(
    routeParams.data?.did ?? -1
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !sessionData) {
    return <div>Error: {JSON.stringify(error?.message)}</div>;
  }

  return (
    <>
      <div className="flex">
        <TopNav />
        <div className="ml-auto mr-10">
          <AuthShowcase />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex ml-auto shadow-streaminggold shadow-2xl border border-streaminggold bg-streamingpurple/10 p-10 rounded h-fit w-fit">
          <div className="w-[20vw] bg-slate-700 rounded-lg my-auto h-[30vh] mr-5 relative">
            {data.poster_path ?? data.backdrop_path ? (
              <Image
                src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${data.poster_path ?? data.backdrop_path}`}
                draggable={false}
                alt=""
                fill
                sizes="100% 100%"
                aria-label="movie poster"
                className="rounded-lg"
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className="pt-10 w-[20vw] border-b h-fit border-streaminggold">
              <div className="text-3xl text-white">{data.title}</div>
            </div>
            <div className="pt-10 w-[20vw] h-fit">
              <div className="text-white text-xl">{data.overview}</div>
            </div>
          </div>
        </div>
        <div className="text-white bg-streamingpurple/5 rounded-3xl w-[20vw] ml-24 mr-10 h-[60vh]">
          <div className="flex flex-col m-3 rounded-lg bg-black-300 h-fit bg-streamingpurple/15">
            <div className="p-3">
              <User
                name={sessionData.user.name}
                description={
                  <Link
                    href="https://twitter.com/jrgarciadev"
                    size="sm"
                    color="secondary"
                  >
                    @{sessionData.user.name}
                  </Link>
                }
                avatarProps={{
                  src: sessionData.user.image ?? ''
                }}
              />
            </div>
            <div className="p-2 bg-streamingpurple/20 rounded-lg m-1">
              10/10 Movie NGL
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
