import { authRouter } from '~/server/api/routers/auth';
import { postRouter } from '~/server/api/routers/post';
import { watchmodeRouter } from '~/server/api/routers/watchmode';
import { createTRPCRouter } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  watchMode: watchmodeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
