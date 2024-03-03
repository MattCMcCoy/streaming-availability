import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  register: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        username: z.string(),
        imageURL: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.db.user.findUnique({
        where: {
          email: input.email
        }
      });

      if (exist) {
        return new NextResponse('User already exists', { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.username,
          image: input.imageURL
        }
      });

      return user;
    }),

  signin: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      console.log('signing in user', input.email);
      const user = ctx.db.user.findUnique({
        where: {
          email: input.email,
          password: await bcrypt.hash(input.password, 10)
        }
      });

      return user;
    })
});
