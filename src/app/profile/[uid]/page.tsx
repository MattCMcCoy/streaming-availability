import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';

import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  return <div className="text-xl text-white">Profile of {routeParams.uid}</div>;
}

export default withParamValidation(Page, Route);
