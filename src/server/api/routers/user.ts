import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId }
      });

      return user;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        data: z.object({
          name: z.string(),
          email: z.string(),
          image: z.string(),
          password: z.string().optional()
        })
      })
    )
    .output(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        email: z.string().nullable(),
        password: z.string().nullable(),
        emailVerified: z
          .date()
          .transform((d) => new Date(d))
          .nullable(),
        image: z.string().nullable()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const account = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: { accounts: true }
      });

      if (!account && !input.data.password) {
        throw new Error('Password is required.');
      }

      const user = await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          name: input.data.name,
          email: input.data.email,
          image: input.data.image,
          password: input.data.password
        }
      });

      return user;
    })
});
