import { createNavigationConfig } from 'next-safe-navigation';
import { z } from 'zod';

export const { routes, useSafeParams, useSafeSearchParams } =
  createNavigationConfig((defineRoute) => ({
    home: defineRoute('/'),
    login: defineRoute('/login'),
    details: defineRoute('/details/[did]', {
      params: z.object({
        did: z.coerce.number()
      })
    })
  }));
