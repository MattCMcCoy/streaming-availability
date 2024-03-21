import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const starRouter = createTRPCRouter({
  getStarsByMovieId: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .query(async ({ ctx, input }) => {
      const stars = await ctx.db.star.findMany({
        where: { mid: input.movieId }
      });

      return stars;
    }),

  getStarsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const stars = await ctx.db.star.findMany({
        where: { staredById: input.userId }
      });

      return stars;
    }),

  starMovie: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
        userId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.userId }
      });

      if (!exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User does not exist'
        });
      }

      const star = await ctx.db.star.create({
        data: {
          mid: input.movieId,
          staredById: input.userId
        }
      });

      return star;
    }),

  unstarMovie: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
        userId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.userId }
      });

      if (!exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User does not exist'
        });
      }

      const star = await ctx.db.star.delete({
        where: {
          staredBy_mid: {
            mid: input.movieId,
            staredById: input.userId
          }
        }
      });

      return star;
    })
});
