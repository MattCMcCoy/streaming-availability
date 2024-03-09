import { type DynamicLayout } from 'next-typesafe-url';
import { z } from 'zod';

export const Route = {
  routeParams: z.object({
    mid: z.number()
  })
} satisfies DynamicLayout;

export type RouteType = typeof Route;
