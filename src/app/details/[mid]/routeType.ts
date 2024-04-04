import { type DynamicRoute } from 'next-typesafe-url';
import { z } from 'zod';

export const Route = {
  routeParams: z.object({
    mid: z.number()
  })
} satisfies DynamicRoute;

export type RouteType = typeof Route;
