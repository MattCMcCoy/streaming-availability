import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';

import MovieDetails from './details';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  return <MovieDetails mid={routeParams.mid} />;
}

export default withParamValidation(Page, Route);
