import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { getServerAuthSession } from '~/server/auth';

import MovieDetails from './details';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  const session = await getServerAuthSession();
  return <MovieDetails mid={routeParams.mid} session={session} />;
}

export default withParamValidation(Page, Route);
