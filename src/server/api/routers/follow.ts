import { NextResponse } from 'next/server';

import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const followRouter = createTRPCRouter({
  follow: protectedProcedure
    .input(
      z.object({
        follower: z.string(),
        following: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.follower }
      });

      const existsFollow = await ctx.db.user.findUnique({
        where: { id: input.following }
      });

      if (!exists || !existsFollow) {
        return new NextResponse('User does not exist', { status: 400 });
      }

      const follow = await ctx.db.follow.create({
        data: {
          followerId: input.following,
          followingId: input.follower
        }
      });

      return follow;
    }),

  unfollow: protectedProcedure
    .input(
      z.object({
        following: z.string(),
        follower: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.follower }
      });

      const existsFollow = await ctx.db.user.findUnique({
        where: { id: input.following }
      });

      if (!exists || !existsFollow) {
        return new NextResponse('User does not exist', { status: 400 });
      }

      const getFollow = await ctx.db.follow.findFirst({
        where: {
          followerId: input.following,
          followingId: input.follower
        }
      });

      if (!getFollow) {
        return new NextResponse('Follow does not exist', { status: 400 });
      }

      const follow = await ctx.db.follow.delete({
        where: {
          id: getFollow.id
        }
      });

      return follow;
    }),

  isFollowing: protectedProcedure
    .input(z.object({ follower: z.string(), following: z.string() }))
    .query(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.follower }
      });

      const existsFollow = await ctx.db.user.findUnique({
        where: { id: input.following }
      });

      if (!exists || !existsFollow) {
        return new NextResponse('User does not exist', { status: 400 });
      }

      const getFollow = await ctx.db.follow.findFirst({
        where: {
          followerId: input.following,
          followingId: input.follower
        }
      });

      return !!getFollow;
    }),

  following: protectedProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.userId }
      });

      if (!exists) {
        return null;
      }

      const following = await ctx.db.follow.findMany({
        where: {
          followingId: input.userId
        }
      });

      return following;
    }),

  followers: protectedProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { id: input.userId }
      });

      if (!exists) {
        return null;
      }

      const followers = await ctx.db.follow.findMany({
        where: {
          followerId: input.userId
        }
      });

      return followers;
    })
});
