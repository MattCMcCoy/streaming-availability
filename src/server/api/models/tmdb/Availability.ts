import { z, type ZodType } from 'zod';

export const WatchProvidersInputSchema = z.number();

export interface ProviderDetail {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export const ProviderDetailSchema = z.object({
  logo_path: z.string(),
  provider_id: z.number(),
  provider_name: z.string(),
  display_priority: z.number()
}) satisfies ZodType<ProviderDetail>;

export interface CountryAvailability {
  link: string;
  buy?: ProviderDetail[];
  rent?: ProviderDetail[];
  flatrate?: ProviderDetail[];
}

export const CountryAvailabilitySchema = z.object({
  link: z.string(),
  buy: z.array(ProviderDetailSchema).optional(),
  rent: z.array(ProviderDetailSchema).optional(),
  flatrate: z.array(ProviderDetailSchema).optional()
}) satisfies ZodType<CountryAvailability>;

export interface MovieAvailability {
  id: number;
  results: Record<string, CountryAvailability>;
}

export const MovieAvailabilitySchema = z.object({
  id: z.number(),
  results: z.record(z.string(), CountryAvailabilitySchema)
}) satisfies ZodType<MovieAvailability>;
