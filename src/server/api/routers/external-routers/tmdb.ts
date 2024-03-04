import { z } from 'zod';
import { buildURL } from '~/utils/api';

import { createTRPCRouter, publicProcedure } from '../../trpc';

export const tmdbRouter = createTRPCRouter({
  nowplaying: publicProcedure
    .input(
      z.object({
        language: z.string().optional().nullable(),
        page: z.number().optional().nullable(),
        region: z.string().optional().nullable()
      })
    )
    .query(async ({ input }) => {
      const url = buildURL(`${process.env.TMDB_API_URL}/movie/now_playing`, {
        api_key: process.env.TMDB_API_KEY,
        language: input.language,
        page: input.page,
        region: input.region
      });
      console.log(url);
    })
});
