import { type InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { AuthShowcase } from '~/app/(auth)/AuthShowcase';
import { Nav } from '~/app/navbar';
import { getServerAuthSession } from '~/server/auth';

import { Route, type RouteType } from './routeType';
import { UserReviews } from './user-reviews';

type PageProps = InferPagePropsType<RouteType>;

async function Page({ routeParams }: PageProps) {
  const session = await getServerAuthSession();
  return (
    <div>
      <div className="mt-5 flex flex-row">
        <Nav />
        <div className="ml-auto mr-5">
          <AuthShowcase />
        </div>
      </div>

      <UserReviews mid={routeParams.mid} session={session} />
    </div>
  );
}

export default withParamValidation(Page, Route);
