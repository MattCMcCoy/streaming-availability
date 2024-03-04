import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

const WATCHMODE_API_URL = 'https://api.watchmode.com';

export const watchmodeRouter = createTRPCRouter({
  autocompleteSearch: publicProcedure
    .input(
      z.object({
        search_value: z.string(),
        search_type: z.number()
      })
    )
    .query(async ({ input }) => {
      const url = `${WATCHMODE_API_URL}/v1/autocomplete-search/?apiKey=${process.env.WATCHMODE_API_KEY}&search_value=${input.search_value}&search_type=${input.search_type}`;

      const res = await fetch(url, { method: 'Get' });

      return res.json();
    })
});
