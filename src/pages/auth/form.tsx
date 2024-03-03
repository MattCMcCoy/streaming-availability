'use client';

import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { toast } from '~/components/ui/use-toast';

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

export function InputForm({ csrfToken }: { csrfToken: string | undefined }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
    signIn('email', {
      email: data.email,
      redirect: true
    })
      .then((res) => {
        if (res?.ok) {
          toast({
            title: 'Check your email',
            description: 'We have sent you a link to sign in'
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(error, null, 2)}
              </code>
            </pre>
          )
        });
      });
  }

  return (
    <Form {...form}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <form
        method="post"
        action="/api/auth/callback/credentials"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-52"
      >
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
          disabled
          className="text-white w-full bg-[hsl(280,100%,70%)] hover:bg-[#e0a1ff] font-semibold text-md"
          type="submit"
        >
          Log In / Sign Up
        </Button>
      </form>
    </Form>
  );
}
