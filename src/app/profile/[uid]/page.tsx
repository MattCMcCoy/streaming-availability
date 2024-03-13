import Image from 'next/image';

import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { Nav } from '~/app/(nav)/navbar';
import { api } from '~/trpc/server';

import { Reviews } from './reviews';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  const user = await api.user.getUser.query({
    userId: routeParams.uid
  });

  return (
    <div>
      <div>
        <Nav />
        <div className="mt-5 flex flex-row">
          <div className="ml-48">
            <div className="mx-auto flex w-[60vw] flex-row">
              {user?.image && (
                <Image
                  src={user?.image}
                  alt=""
                  width={90}
                  height={90}
                  className="self-baseline rounded-full"
                />
              )}
              <div className="ml-5 self-center">
                <h1 className="w-[60vw] border-b border-streaminggold text-3xl font-bold text-white">
                  {user?.name}
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
