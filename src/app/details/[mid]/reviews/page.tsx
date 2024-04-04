import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { getServerAuthSession } from '~/server/auth';

import { Route, type RouteType } from './routeType';
import { UserReviews } from './user-reviews';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams, searchParams }: PageProps) {
  const session = await getServerAuthSession();
  return (
    <UserReviews
      mid={routeParams.mid}
      type={searchParams.type ?? 'user'}
      session={session}
    />
  );
}

export default withParamValidation(Page, Route);
