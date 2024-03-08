import { type DynamicRoute } from 'next-typesafe-url';
import { z } from 'zod';

const Route = {
  routeParams: z.object({
    uid: z.number()
  })
} satisfies DynamicRoute;

export type RouteType = typeof Route;

export default function Profile() {
  return <div>Profile</div>;
}
