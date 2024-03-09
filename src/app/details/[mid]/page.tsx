import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { AuthShowcase } from '~/app/(auth)/AuthShowcase';
import { Nav } from '~/app/Nav';

import MovieDetails from './details';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  return (
    <div className="flex flex-col">
      <div className="mt-3 flex w-[100vw] flex-row pr-5 align-middle">
        <div className="mr-auto">
          <Nav />
        </div>
        <AuthShowcase />
      </div>
      <MovieDetails mid={routeParams.mid} />;
    </div>
  );
}

export default withParamValidation(Page, Route);
