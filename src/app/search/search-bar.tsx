'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { $path } from 'next-typesafe-url';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '../lib/components/form';
import { Input } from '../lib/components/input';

const FormSchema = z.object({
  search: z.string()
});

export function SearchBar() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: ''
    }
  });

  return (
    <div className="flex flex-row items-center space-x-2">
      <Form {...form}>
        <div>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-[60vw] rounded-full border border-white bg-transparent text-white md:w-[40vw]"
                    placeholder="Search for a movie!"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
      <Link
        href={$path({
          route: '/search',
          searchParams: {
            title: form.getValues().search
          }
        })}
      >
        <div className="rounded-full bg-transparent font-semibold text-white hover:text-streamingpurple">
          <SearchIcon />
        </div>
      </Link>
    </div>
  );
}
