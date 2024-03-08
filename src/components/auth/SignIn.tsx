'use client';

import { type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .min(8, 'This is not a valid password.')
});

interface SignInProps {
  form: UseFormReturn<
    {
      email: string;
      password: string;
    },
    undefined
  >;
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export default function SignIn({ form, onSubmit }: SignInProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    className="border border-white bg-transparent text-white"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  className="border border-white bg-transparent text-white"
                  placeholder="password123"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="text-white w-full hover:bg-streamingpurple font-semibold mt-8"
          type="submit"
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Log In / Sign Up
        </Button>
      </Form>
    </form>
  );
}
