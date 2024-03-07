import { createTRPCRouter } from '~/server/api/trpc';

import { authRouter } from './routers/auth';
import { commentRouter } from './routers/comment';
import { tmdbRouter } from './routers/tmdb';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  tmdb: tmdbRouter,
  comment: commentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
