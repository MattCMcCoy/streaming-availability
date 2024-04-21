import { NextResponse } from 'next/server';

import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        header: z.string().min(1, {
          message: 'You must type something to be able to send!'
        }),
        message: z.string().min(1, {
          message: 'You must type something to be able to send!'
        }),
        movieId: z.number(),
        createdById: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.createdById }
      });

      if (!exists) {
        return new NextResponse('User does not exist', { status: 400 });
      }

      const comment = await ctx.db.comment.create({
        data: {
          header: input.header,
          message: input.message,
          rating: 0,
          mid: input.movieId,
          createdById: input.createdById
        }
      });

      return comment;
    }),

  getCommentsByMovieId: publicProcedure
    .input(z.object({ movieId: z.number(), type: z.string() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: { mid: input.movieId }
      });

      const userIds = comments.map((comment) => comment.createdById);

      const users = await ctx.db.user.findMany({
        where: { id: { in: userIds }, role: input.type }
      });

      const filtered = comments.filter((comment) =>
        users.find((user) => user.id === comment.createdById)
      );

      return filtered;
    }),

  getCommentsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: { createdById: input.userId }
      });

      return comments;
    })
});
