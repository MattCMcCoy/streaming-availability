'use client';

import { useContext } from 'react';

import { useRouter } from 'next/navigation';

import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Toaster } from '~/app/components/ui/toaster';

import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { SignInContext } from '../context';
import { GetSignInStatus } from '../utils';

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

export default function LogInForm() {
  const context = useContext(SignInContext);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  context.email = form.getValues().email;
  context.password = form.getValues().password;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { emailExists, emailMatchesPassword } = await GetSignInStatus({
      email: data.email,
      password: data.password
    });

    if (emailExists && emailMatchesPassword) {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });
      router.push('/');
      return;
    }

    if (!emailExists) {
      console.log('Email not found');
      context.email = data.email;
      context.password = data.password;
      router.push('/register');
      return;
    }

    form.setError('password', { message: 'Password is not correct' });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Toaster />
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
          className="mt-8 w-full font-semibold text-white hover:bg-streamingpurple"
          type="submit"
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Log In / Sign Up
        </Button>
      </Form>
    </form>
  );
}
