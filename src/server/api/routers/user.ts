import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId }
      });

      return user;
    })
});
