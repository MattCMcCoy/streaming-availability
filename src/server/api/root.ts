import { createTRPCRouter } from '~/server/api/trpc';

import { authRouter } from './routers/auth';
import { tmdbRouter } from './routers/external-routers/tmdb';
import { watchmodeRouter } from './routers/external-routers/watchmode';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  watchMode: watchmodeRouter,
  tmdb: tmdbRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
