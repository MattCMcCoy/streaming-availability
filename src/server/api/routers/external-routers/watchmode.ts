import { z } from 'zod';
import { buildURL } from '~/utils/api';

import type { AutoCompleteSearch, TitlesList } from '../../models/watchmode';
import { createTRPCRouter, publicProcedure } from '../../trpc';

export const watchmodeRouter = createTRPCRouter({
  autocompleteSearch: publicProcedure
    .input(
      z.object({
        search_value: z.string(),
        search_type: z.number().optional().nullable()
      })
    )
    .query(async ({ input }) => {
      const url = buildURL(
        `${process.env.WATCHMODE_API_URL}/autocomplete-search/`,
        {
          apiKey: process.env.WATCHMODE_API_KEY,
          search_value: input.search_value,
          search_type: input.search_type
        }
      );

      console.log(url);
      const res = await fetch('url', { method: 'Get' });

      const body = (await res.json()) as AutoCompleteSearch[];

      return body;
    }),
  listTitles: publicProcedure
    .input(
      z.object({
        types: z.array(z.string()).nullable().optional(),
        regions: z.array(z.string()).nullable().optional(),
        source_types: z.array(z.string()).nullable().optional(),
        source_ids: z.array(z.string()).nullable().optional(),
        genres: z.array(z.string()).nullable().optional(),
        network_ids: z.array(z.string()).nullable().optional(),
        sort_by: z
          .enum([
            'relevance_desc',
            'relevance_asc',
            'popularity_desc',
            'popularity_asc',
            'release_date_desc',
            'title_desc',
            'title_asc'
          ])
          .nullable()
          .optional(),
        release_date_start: z.number().nullable().optional(),
        release_date_end: z.number().nullable().optional(),
        page: z.number().nullable().optional(),
        limit: z.number().nullable().optional()
      })
    )
    .query(async ({ input }) => {
      const url = buildURL(`${process.env.WATCHMODE_API_URL}/v1/list-titles/`, {
        apiKey: process.env.WATCHMODE_API_KEY,
        types: input.types?.join(','),
        regions: input.regions?.join(','),
        source_types: input.source_types?.join(','),
        source_ids: input.source_ids?.join(','),
        genres: input.genres?.join(','),
        network_ids: input.network_ids?.join(','),
        sort_by: input.sort_by,
        release_date_start: input.release_date_start,
        release_date_end: input.release_date_end,
        page: input.page,
        limit: input.limit
      });

      console.log(url);

      const res = await fetch('url', { method: 'Get' });

      const body = (await res.json()) as TitlesList[];

      return body;
    })
});
