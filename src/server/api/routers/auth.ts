import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        username: z.string(),
        imageURL: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: {
          email: input.email
        }
      });

      if (exists) {
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

  signin: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email
        }
      });

      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(
        input.password,
        user.password ?? ''
      );

      if (!passwordMatch) {
        return null;
      }

      return user;
    })
});
