import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { AuthShowcase } from '~/app/(auth)/AuthShowcase';
import { Nav } from '~/app/Nav';
import { getServerAuthSession } from '~/server/auth';

import MovieDetails from './details';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  const session = await getServerAuthSession();
  return (
    <div className="flex h-[100vh] flex-col ">
      <div className="mt-3 flex w-[100vw] flex-row pr-5 align-middle">
        <div className="mr-auto">
          <Nav />
        </div>
        <AuthShowcase />
      </div>
      <div className="mt-5">
        <MovieDetails mid={routeParams.mid} session={session} />;
      </div>
    </div>
  );
}

export default withParamValidation(Page, Route);
